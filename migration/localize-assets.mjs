// Localize every remaining asset off the old WordPress host BEFORE the DNS flip.
//
// RUN LOCALLY (the Claude Code cloud sandbox is blocked from
// livingdentalhealth.com by egress policy):
//
//     node migration/localize-assets.mjs
//
// Requires Node 18+ (built-in fetch). Changes URLs/paths only — never touches
// article text, alt, or headings. Nothing is committed; review the diff after.
//
// What it does:
//   1. Downloads all wp-content article images → public/images/articles/<path>
//      and rewrites every reference in content/articles/*.md.
//   2. Downloads the 3 brand/schema images → public/images/brand/ (schema.ts
//      already points here). Headshot URL is pre-filled; set LOGO_URL and
//      OFFICE_URL below (grab them from the old site's header + an
//      office/exterior photo).
//   3. Downloads the Consent/HIPAA PDF → public/documents/.
//   4. Reports four numbers every run: (1) unique files, (2) total references,
//      (3) failed downloads, (4) external WordPress URLs still remaining.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ARTICLES_DIR = path.join(ROOT, "content", "articles");
const PUBLIC = path.join(ROOT, "public");

const WP_RE = /https?:\/\/(?:www\.)?livingdentalhealth\.com\/wp-content\/([^\s"')]+)/gi;

// ── Task 2: brand/schema images. schema.ts references these exact local paths.
const BRAND = [
  {
    // Dr. Andy headshot — URL already referenced in the repo.
    url: "https://livingdentalhealth.com/wp-content/uploads/2021/08/Andrew-W.-Engel-DMD-horiz-web2.jpg",
    dest: "images/brand/dr-andy-engel.jpg",
  },
  {
    // TODO: paste the old site's header LOGO url (usually a .png in wp-content/uploads).
    url: process.env.LOGO_URL || "",
    dest: "images/brand/living-dental-health-logo.png",
  },
  {
    // TODO: paste an office / exterior photo url from the old site.
    url: process.env.OFFICE_URL || "",
    dest: "images/brand/living-dental-health-office.jpg",
  },
];

// ── Task 3: Consent / Insurance / Financial / HIPAA PDF.
const PDF = {
  url: "https://livingdentalhealth.com/wp-content/uploads/2022/12/CONSENT-FOR-SERVICES-INSURANCE-COVERAGE-FINANCIAL-POLICY-HIPAA.pdf",
  dest: "documents/consent-services-insurance-financial-hipaa.pdf",
};

const failed = [];

async function download(url, destAbs) {
  try {
    const res = await fetch(url, { redirect: "follow" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    fs.mkdirSync(path.dirname(destAbs), { recursive: true });
    fs.writeFileSync(destAbs, buf);
    return buf.length;
  } catch (e) {
    failed.push(`${url}  →  ${e.message}`);
    return null;
  }
}

// 1) Collect every distinct wp-content URL across the article bodies + frontmatter.
const mdFiles = fs
  .readdirSync(ARTICLES_DIR)
  .filter((f) => f.endsWith(".md"))
  .map((f) => path.join(ARTICLES_DIR, f));

const urlSet = new Set();
let totalRefs = 0;
for (const file of mdFiles) {
  const text = fs.readFileSync(file, "utf8");
  for (const m of text.matchAll(WP_RE)) {
    urlSet.add(m[0]);
    totalRefs += 1;
  }
}
const urls = [...urlSet];
console.log(
  `Found ${urls.length} distinct wp-content files (${totalRefs} total references) across ${mdFiles.length} articles.`
);

// 2) Download each → public/images/articles/<path-after-wp-content>; record the rewrite.
const rewriteMap = new Map(); // oldUrl -> "/images/articles/<path>"
let downloaded = 0;
for (const url of urls) {
  const rel = url.replace(WP_RE, "$1"); // path after /wp-content/
  const destRel = path.join("images", "articles", rel);
  const size = await download(url, path.join(PUBLIC, destRel));
  if (size != null) {
    downloaded++;
    rewriteMap.set(url, "/" + destRel.split(path.sep).join("/"));
    process.stdout.write(".");
  } else {
    process.stdout.write("x");
  }
}
console.log(`\nDownloaded ${downloaded}/${urls.length} article assets.`);

// 3) Rewrite references — ONLY for URLs that downloaded (failed ones stay visible in grep).
let refsRewritten = 0;
for (const file of mdFiles) {
  let text = fs.readFileSync(file, "utf8");
  let changed = false;
  for (const [oldUrl, local] of rewriteMap) {
    if (text.includes(oldUrl)) {
      text = text.split(oldUrl).join(local);
      refsRewritten += 1;
      changed = true;
    }
  }
  if (changed) fs.writeFileSync(file, text);
}
console.log(`Rewrote references in the markdown (${refsRewritten} file-level replacements).`);

// 4) Brand images (task 2) + PDF (task 3).
for (const b of BRAND) {
  if (!b.url) {
    failed.push(`(MISSING SOURCE URL) ${b.dest} — set LOGO_URL / OFFICE_URL and re-run`);
    continue;
  }
  const size = await download(b.url, path.join(PUBLIC, b.dest));
  console.log(size != null ? `brand ✓ ${b.dest}` : `brand ✗ ${b.dest}`);
}
{
  const size = await download(PDF.url, path.join(PUBLIC, PDF.dest));
  console.log(size != null ? `pdf   ✓ ${PDF.dest}` : `pdf   ✗ ${PDF.dest}`);
}

// 5) Auto-count wp-content/www URLs still present in TEXT sources after rewrite
//    (content/, lib/, app/, docs/ — never public/ binaries or the manifests).
function countRemainingExternal() {
  const EXT_RE = /https?:\/\/(?:www\.)?livingdentalhealth\.com\/wp-content\/[^\s"')]+/gi;
  const SKIP_DIRS = new Set(["node_modules", ".next", ".git", "public", "migration"]);
  const hits = [];
  let n = 0;
  (function walk(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      if (SKIP_DIRS.has(e.name)) continue;
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (/\.(md|ts|tsx|json|txt)$/.test(e.name)) {
        const m = fs.readFileSync(p, "utf8").match(EXT_RE);
        if (m) {
          n += m.length;
          hits.push(`${path.relative(ROOT, p)}: ${m.length}`);
        }
      }
    }
  })(ROOT);
  return { n, hits };
}
const remaining = countRemainingExternal();
const brandOk = BRAND.filter((b) => b.url && fs.existsSync(path.join(PUBLIC, b.dest))).length;
const pdfOk = fs.existsSync(path.join(PUBLIC, PDF.dest)) ? 1 : 0;

// 6) Report — the four numbers, every run.
console.log("\n──────── LOCALIZATION REPORT ────────");
console.log(`1. Unique files needed .......... ${urls.length} wp-content + 3 brand + 1 PDF = ${urls.length + 4}`);
console.log(`2. Total references ............. ${totalRefs} article wp-content + 3 brand + 1 PDF = ${totalRefs + 4}`);
console.log(`3. Failed downloads ............. ${failed.length}`);
console.log(`4. Remaining external WP URLs ... ${remaining.n}  (target: 0)`);
console.log("");
console.log(`   downloaded: ${downloaded}/${urls.length} article files · brand ${brandOk}/3 · pdf ${pdfOk}/1`);
if (failed.length) {
  console.log(`\n   COULD NOT DOWNLOAD (${failed.length}) — these stay as external URLs:`);
  for (const f of failed) console.log("     - " + f);
}
if (remaining.n) {
  console.log(`\n   STILL EXTERNAL after rewrite (fix before launch):`);
  for (const h of remaining.hits) console.log("     - " + h);
} else {
  console.log("\n   ✓ no wp-content/www URLs remain in content/, lib/, app/, docs/.");
}
console.log(
  "\n   Final verification:\n" +
    "     npm run build   (prebuild schema-guard fails on any www leak)\n" +
    "     grep -rn 'livingdentalhealth.com/wp-content' .next || echo 'built HTML clean'\n"
);
console.log(
  "   NOTE: IMG_1739.heic won't render in browsers — convert to .jpg\n" +
    "     (`magick file.heic file.jpg`) and update its reference.\n"
);
