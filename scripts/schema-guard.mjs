#!/usr/bin/env node
// schema-guard — launch gate for the Living Dental Health entity graph.
//
// Fails the build/commit if the entity graph drifts on any of:
//   1. Duplicate @id definitions            (one canonical node per @id)
//   2. Dangling @id references              ({ "@id": ... } with no definition)
//   3. Person-vs-business type              (#doctor must be Person; business
//                                            types only on #business)
//   4. www host leak on canonical surfaces  (apex is canonical; www 301s to it)
//   5. Article entity references            (article about/mentions @ids must
//                                            resolve to a node defined in schema)
//
// Pure Node (no deps). Exits 1 on any failure so it can gate prebuild + husky.
// The wp-content article images (waiting on asset localization) live in
// content/**.md and are intentionally OUT of scope for the www check.

import fs from "node:fs";
import path from "node:path";

const SCHEMA_FILE = "lib/schema.ts";
const failures = [];
const fail = (m) => failures.push(m);

// ─────────────────────────────────────────────────────────────────────────
// Brace-matching parser for lib/schema.ts.
// Collects @id definitions (object with @type + @id) and pure references
// (object with @id only). Resolves the `${input.slug}` template and the
// `url` local const so those are not mistaken for dangling refs.
// ─────────────────────────────────────────────────────────────────────────
const src = fs.readFileSync(SCHEMA_FILE, "utf8");
const frames = [];
const defs = []; // { id, line, type }
const refs = []; // { id, line }
let line = 1,
  i = 0;
const n = src.length;

function readString(q) {
  i++;
  while (i < n) {
    const c = src[i];
    if (c === "\n") line++;
    if (c === "\\") {
      i += 2;
      continue;
    }
    if (q === "`" && c === "$" && src[i + 1] === "{") {
      i += 2;
      let d = 1;
      while (i < n && d) {
        if (src[i] === "{") d++;
        else if (src[i] === "}") d--;
        i++;
      }
      continue;
    }
    i++;
    if (c === q) break;
  }
}
function readRawValue() {
  const s = i;
  if (src[i] === '"' || src[i] === "`") {
    readString(src[i]);
    return src.slice(s, i);
  }
  let id = "";
  while (i < n && /[A-Za-z0-9_.]/.test(src[i])) id += src[i++];
  return id;
}
function readArrayRaw() {
  const s = i;
  let d = 1;
  i++;
  while (i < n && d) {
    if (src[i] === "[") d++;
    else if (src[i] === "]") d--;
    else if (src[i] === "\n") line++;
    i++;
  }
  return src.slice(s, i);
}
function normId(raw) {
  let v = raw;
  if (v.startsWith('"') || v.startsWith("`")) v = v.slice(1, -1);
  v = v.replace(
    /\$\{url\}/g,
    "https://livingdentalhealth.com/articles/${input.slug}"
  );
  if (v === "url") v = "https://livingdentalhealth.com/articles/${input.slug}";
  v = v.replace(/\$\{(input\.slug|meta\.slug|slug)\}/g, "${SLUG}");
  return v;
}
function keyFollowedByColon(after) {
  let j = after;
  while (j < n && /\s/.test(src[j])) j++;
  return src[j] === ":" ? j + 1 : -1;
}

while (i < n) {
  const c = src[i];
  if (c === "\n") {
    line++;
    i++;
    continue;
  }
  if (c === "/" && src[i + 1] === "/") {
    while (i < n && src[i] !== "\n") i++;
    continue;
  }
  if (c === "/" && src[i + 1] === "*") {
    i += 2;
    while (i < n && !(src[i] === "*" && src[i + 1] === "/")) {
      if (src[i] === "\n") line++;
      i++;
    }
    i += 2;
    continue;
  }
  if (c === "`" || c === "'") {
    readString(c);
    continue;
  }
  if (c === '"') {
    if (src.startsWith('"@type"', i)) {
      const col = keyFollowedByColon(i + 7);
      if (col >= 0) {
        const fr = frames[frames.length - 1];
        i = col;
        while (i < n && /\s/.test(src[i])) {
          if (src[i] === "\n") line++;
          i++;
        }
        const rawType = src[i] === "[" ? readArrayRaw() : readRawValue();
        if (fr) {
          fr.hasType = true;
          fr.type = rawType;
        }
        continue;
      }
      readString('"');
      continue;
    }
    if (src.startsWith('"@id"', i)) {
      const col = keyFollowedByColon(i + 5);
      if (col >= 0) {
        const fr = frames[frames.length - 1];
        i = col;
        while (i < n && /\s/.test(src[i])) {
          if (src[i] === "\n") line++;
          i++;
        }
        const raw = readRawValue();
        if (fr && raw) {
          fr.id = normId(raw);
          fr.line = line;
        }
        continue;
      }
      readString('"');
      continue;
    }
    readString('"');
    continue;
  }
  if (c === "{") {
    frames.push({ hasType: false, id: null, type: "", line });
    i++;
    continue;
  }
  if (c === "}") {
    const f = frames.pop();
    if (f && f.id)
      (f.hasType ? defs : refs).push(
        f.hasType ? { id: f.id, line: f.line, type: f.type } : { id: f.id, line: f.line }
      );
    i++;
    continue;
  }
  i++;
}

// ── Check 1: duplicate @id definitions ──
const defMap = new Map();
for (const d of defs) {
  if (!defMap.has(d.id)) defMap.set(d.id, []);
  defMap.get(d.id).push(d.line);
}
for (const [id, lines] of defMap) {
  if (lines.length > 1)
    fail(`DUPLICATE @id: ${id} defined ${lines.length}x at L${lines.join(", L")}`);
}

// ── Check 2: dangling references ──
// Real @id references are always absolute URLs. A reference built from a
// runtime variable — e.g. `{ "@id": m.id }`, where an enhanced article injects
// a mention target from its frontmatter — is not a static literal and can't be
// resolved here, so it's skipped (same spirit as resolving the `url` local).
const defined = new Set(defMap.keys());
const seen = new Set();
const isStaticIdRef = (id) => id.includes("://");
for (const r of refs) {
  if (!isStaticIdRef(r.id)) continue;
  if (!defined.has(r.id) && !seen.has(r.id)) {
    seen.add(r.id);
    fail(`DANGLING @id ref: ${r.id} (L${r.line}) resolves to no definition`);
  }
}

// ── Check 3: Person-vs-business typing ──
// Business/organization types must appear ONLY on the practice node
// (#business). Individual humans (#doctor/#owner/#agent/…) must be Person.
const BUSINESS_TYPES = [
  "Dentist",
  "LocalBusiness",
  "MedicalBusiness",
  "MedicalOrganization",
  "MedicalClinic",
  "RealEstateAgent",
  "Physician",
  "Attorney",
  "Accountant",
  "LegalService",
];
const HUMAN_ID = /#(doctor|owner|agent|attorney|dentist|physician|founder)$/;
for (const d of defs) {
  const type = d.type || "";
  const isBusinessType = BUSINESS_TYPES.some((t) =>
    new RegExp('"' + t + '"').test(type)
  );
  const isBusinessNode = /#business$/.test(d.id);
  if (isBusinessType && !isBusinessNode)
    fail(
      `WRONG TYPE: node ${d.id} (L${d.line}) carries a business type ${type} — business types belong only on #business`
    );
  if (HUMAN_ID.test(d.id)) {
    if (!/"Person"/.test(type))
      fail(
        `WRONG TYPE: human node ${d.id} (L${d.line}) is ${type || "untyped"}, must be @type "Person"`
      );
    if (isBusinessType)
      fail(
        `WRONG TYPE: human node ${d.id} (L${d.line}) is typed as a business (${type})`
      );
  }
}

// ── Check 4: www host leak on canonical surfaces ──
// Apex is canonical; www 301s to it. Article wp-content images (content/**.md)
// are pending localization and intentionally excluded.
const WWW = /www\.livingdentalhealth\.com/;
function walk(dir, out) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === "node_modules" || e.name === ".next" || e.name === ".git")
      continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.(ts|tsx|mjs|js)$/.test(e.name)) out.push(p);
  }
}
const surfaces = [];
walk("lib", surfaces);
walk("app", surfaces);
for (const extra of ["public/agent.json", "public/llms.txt"])
  if (fs.existsSync(extra)) surfaces.push(extra);
for (const file of surfaces) {
  const text = fs.readFileSync(file, "utf8");
  text.split("\n").forEach((ln, idx) => {
    if (WWW.test(ln))
      fail(`WWW LEAK: ${file}:${idx + 1} references www.livingdentalhealth.com (canonical host is the apex)`);
  });
}

// ── Check 5: article entity references resolve ──
// Enhanced articles point at canonical service/procedure/entity nodes by @id in
// their frontmatter about:/mentions: blocks (e.g. `- id: "…/implants-surgery#implants"`).
// Those refs are injected into JSON-LD at runtime, so Check 2 (which reads only
// lib/schema.ts) cannot see them. Enforce here that every internal @id an article
// references resolves to a node defined in the graph — so the article layer can
// never drift into a dangling reference.
const ARTICLES_DIR = "content/articles";
const INTERNAL_ID = /\bid:\s*["']?(https:\/\/livingdentalhealth\.com[^"'\s]+)/g;
let articleRefCount = 0;
if (fs.existsSync(ARTICLES_DIR)) {
  for (const file of fs.readdirSync(ARTICLES_DIR)) {
    if (!file.endsWith(".md")) continue;
    const txt = fs.readFileSync(path.join(ARTICLES_DIR, file), "utf8");
    // Only the YAML frontmatter carries `id:` entity references.
    const fm = txt.startsWith("---") ? txt.slice(3).split(/\n---/)[0] : "";
    for (const ref of new Set([...fm.matchAll(INTERNAL_ID)].map((m) => m[1]))) {
      articleRefCount++;
      if (!defined.has(ref))
        fail(
          `DANGLING article ref: content/articles/${file} references @id ${ref} — resolves to no node defined in ${SCHEMA_FILE}`
        );
    }
  }
}

// ── Report ──
if (failures.length) {
  console.error("\n✖ schema-guard FAILED — entity graph is not launch-safe:\n");
  for (const m of failures) console.error("  • " + m);
  console.error(
    `\n${failures.length} problem(s). Fix lib/schema.ts (and canonical surfaces) before committing.\n`
  );
  process.exit(1);
}
console.log(
  `✓ schema-guard passed — ${defs.length} @id defs, ${refs.length} refs, ${articleRefCount} article entity refs, 0 duplicate, 0 dangling, types + host clean.`
);
