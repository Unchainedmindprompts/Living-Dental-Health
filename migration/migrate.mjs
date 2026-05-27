#!/usr/bin/env node
/**
 * Living Dental Health — WordPress → Markdown migration (one-off).
 *
 * Run locally (needs open network + Node 18+):
 *     cd migration
 *     npm install
 *     node migrate.mjs
 *
 * Writes ONLY to:
 *   - migration/raw-export.json
 *   - migration/migration-report.md
 *   - content/articles/{slug}.md
 *   - public/images/articles/{slug}/{filename}
 *
 * It does NOT touch the live WordPress site (read-only GET requests),
 * does NOT commit to git, and does NOT deploy.
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import TurndownService from "turndown";
import { gfm } from "turndown-plugin-gfm";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");

const SITE_ORIGIN = "https://livingdentalhealth.com";
const API = `${SITE_ORIGIN}/wp-json/wp/v2/posts`;
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";

const OUT_RAW = path.join(__dirname, "raw-export.json");
const OUT_REPORT = path.join(__dirname, "migration-report.md");
const OUT_CONTENT = path.join(REPO_ROOT, "content", "articles");
const OUT_IMAGES = path.join(REPO_ROOT, "public", "images", "articles");

// ---------------------------------------------------------------- helpers

async function getJson(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": UA, Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`API ${res.status} ${res.statusText} for ${url}`);
  return { res, body: await res.json() };
}

async function fetchAllPosts() {
  const url1 = `${API}?per_page=100&_embed=true&page=1`;
  const { res, body } = await getJson(url1);
  const totalPages = parseInt(res.headers.get("x-wp-totalpages") || "1", 10);
  const all = [...body];
  for (let p = 2; p <= totalPages; p++) {
    const { body: more } = await getJson(
      `${API}?per_page=100&_embed=true&page=${p}`
    );
    all.push(...more);
  }
  return all;
}

function decodeEntities(str = "") {
  return String(str)
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&nbsp;/g, " ")
    .replace(/&hellip;/g, "…")
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/&rsquo;/g, "’")
    .replace(/&lsquo;/g, "‘")
    .replace(/&rdquo;/g, "”")
    .replace(/&ldquo;/g, "“")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function stripHtml(html = "") {
  return decodeEntities(html.replace(/<[^>]+>/g, " "))
    .replace(/\[(?:…|\.\.\.|hellip)\]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function resolveUrl(u) {
  if (!u) return u;
  if (u.startsWith("//")) return "https:" + u;
  if (u.startsWith("/")) return SITE_ORIGIN + u;
  return u;
}

function frontmatter(fields) {
  const lines = ["---"];
  for (const [k, v] of Object.entries(fields)) {
    // JSON.stringify produces a valid YAML double-quoted scalar.
    lines.push(`${k}: ${JSON.stringify(v ?? "")}`);
  }
  lines.push("---", "");
  return lines.join("\n");
}

// ---------------------------------------------------------------- turndown

const td = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
  bulletListMarker: "-",
  emDelimiter: "_",
});
td.use(gfm);
td.remove(["script", "style", "noscript"]);

function collectImgUrls(html) {
  const urls = [];
  const re = /<img\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi;
  let m;
  while ((m = re.exec(html))) urls.push(m[1]);
  return urls;
}

function preprocessHtml(html, imgMap) {
  let h = html;
  // Gutenberg block comments + any other HTML comments
  h = h.replace(/<!--\s*\/?wp:[\s\S]*?-->/g, "");
  h = h.replace(/<!--[\s\S]*?-->/g, "");
  // [caption ...] ... [/caption] — drop the shortcode tags, keep inner content
  h = h.replace(/\[caption[^\]]*\]/gi, "").replace(/\[\/caption\]/gi, "");
  // [embed]URL[/embed] — keep the URL
  h = h.replace(/\[embed[^\]]*\]([\s\S]*?)\[\/embed\]/gi, (_, inner) => ` ${inner.trim()} `);
  // oEmbed / video iframes — keep the underlying URL as a link
  h = h.replace(
    /<iframe\b[^>]*\bsrc=["']([^"']+)["'][^>]*>(?:[\s\S]*?<\/iframe>)?/gi,
    (_, src) => `<p><a href="${src}">${src}</a></p>`
  );
  // Rewrite <img src> to the downloaded local path
  h = h.replace(/<img\b[^>]*>/gi, (tag) => {
    const m = tag.match(/\bsrc=["']([^"']+)["']/i);
    if (!m) return tag;
    const local = imgMap.get(resolveUrl(m[1]));
    return local ? tag.replace(m[0], `src="${local}"`) : tag;
  });
  return h;
}

function cleanMarkdown(md) {
  return (
    md
      .replace(/<!--\s*\/?wp:[\s\S]*?-->/g, "") // safety net
      .replace(/[ \t]+\n/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim() + "\n"
  );
}

// ---------------------------------------------------------------- images

async function downloadImage(rawUrl, slugDir, usedNames) {
  const url = resolveUrl(rawUrl);
  try {
    const res = await fetch(url, { headers: { "User-Agent": UA } });
    if (!res.ok) return { ok: false, url, reason: `HTTP ${res.status}` };
    let name = path.basename(new URL(url).pathname).split("?")[0] || "image";
    if (!path.extname(name)) name += ".img";
    name = name.replace(/[^a-zA-Z0-9._-]/g, "-");
    let finalName = name;
    let i = 2;
    while (usedNames.has(finalName)) {
      const ext = path.extname(name);
      finalName = `${name.slice(0, name.length - ext.length)}-${i}${ext}`;
      i++;
    }
    usedNames.add(finalName);
    await fs.mkdir(slugDir, { recursive: true });
    await fs.writeFile(path.join(slugDir, finalName), Buffer.from(await res.arrayBuffer()));
    return { ok: true, url, file: finalName };
  } catch (e) {
    return { ok: false, url, reason: e.message };
  }
}

// ---------------------------------------------------------------- main

async function main() {
  await fs.mkdir(__dirname, { recursive: true });
  await fs.mkdir(OUT_CONTENT, { recursive: true });
  await fs.mkdir(OUT_IMAGES, { recursive: true });

  console.log("Fetching posts from WordPress…");
  const posts = await fetchAllPosts();
  await fs.writeFile(OUT_RAW, JSON.stringify(posts, null, 2));
  console.log(`Fetched ${posts.length} posts → raw-export.json`);

  const usedSlugs = new Set();
  const report = {
    total: 0,
    dates: [],
    duplicates: [],
    failedImages: [],
    suspicious: [],
  };

  for (const post of posts) {
    const title = decodeEntities(post?.title?.rendered || "Untitled");
    let slug = post?.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    // de-dupe slug → filename
    if (usedSlugs.has(slug)) {
      let i = 2;
      let candidate = `${slug}-${i}`;
      while (usedSlugs.has(candidate)) candidate = `${slug}-${++i}`;
      report.duplicates.push({ original: slug, renamed: candidate });
      slug = candidate;
    }
    usedSlugs.add(slug);

    const slugDir = path.join(OUT_IMAGES, slug);
    const usedNames = new Set();
    const imgMap = new Map(); // resolved remote URL -> local web path

    // featured image
    let featuredWebPath = "";
    const media = post?._embedded?.["wp:featuredmedia"];
    const featuredUrl =
      Array.isArray(media) && media[0]?.source_url ? media[0].source_url : null;
    if (featuredUrl) {
      const r = await downloadImage(featuredUrl, slugDir, usedNames);
      if (r.ok) {
        featuredWebPath = `/images/articles/${slug}/${r.file}`;
        imgMap.set(resolveUrl(featuredUrl), featuredWebPath);
      } else {
        report.failedImages.push({ slug, ...r });
      }
    }

    // inline images
    const html = post?.content?.rendered || "";
    for (const raw of collectImgUrls(html)) {
      const resolved = resolveUrl(raw);
      if (imgMap.has(resolved)) continue;
      const r = await downloadImage(resolved, slugDir, usedNames);
      if (r.ok) imgMap.set(resolved, `/images/articles/${slug}/${r.file}`);
      else report.failedImages.push({ slug, ...r });
    }

    // HTML → markdown
    const body = cleanMarkdown(td.turndown(preprocessHtml(html, imgMap)));

    const fm = frontmatter({
      title,
      slug: post?.slug || slug,
      datePublished: post?.date || "",
      dateModified: post?.modified || "",
      excerpt: stripHtml(post?.excerpt?.rendered || ""),
      featuredImage: featuredWebPath,
      status: "migrated-as-is",
    });

    await fs.writeFile(path.join(OUT_CONTENT, `${slug}.md`), fm + body);

    // bookkeeping + suspicious checks
    report.total++;
    if (post?.date) report.dates.push(post.date);
    const reasons = [];
    if (body.trim().length < 15) reasons.push("empty/near-empty body");
    if (/<!--\s*wp:/.test(body)) reasons.push("leftover wp: block comment");
    if (/\[[a-z][a-z0-9_-]*[^\]]*\]/i.test(body)) reasons.push("leftover shortcode");
    if (/\|/.test(body) && !/\|[\s:-]*-{3,}/.test(body))
      reasons.push("possible broken table (pipes, no separator row)");
    if (reasons.length) report.suspicious.push({ slug, reasons });
  }

  // report
  const dates = report.dates.sort();
  const lines = [
    "# WordPress → Markdown migration report",
    "",
    `Generated: ${new Date().toISOString()}`,
    "",
    `- **Articles migrated:** ${report.total}`,
    `- **Date range:** ${dates[0] || "n/a"} → ${dates[dates.length - 1] || "n/a"}`,
    `- **Failed image downloads:** ${report.failedImages.length}`,
    `- **Articles flagged for review:** ${report.suspicious.length}`,
    `- **Duplicate slugs renamed:** ${report.duplicates.length}`,
    "",
  ];

  lines.push("## Duplicate slugs (renamed)", "");
  if (!report.duplicates.length) lines.push("_None._", "");
  else for (const d of report.duplicates) lines.push(`- \`${d.original}\` → \`${d.renamed}\``);
  lines.push("");

  lines.push("## Failed image downloads", "");
  if (!report.failedImages.length) lines.push("_None._", "");
  else for (const f of report.failedImages) lines.push(`- [${f.slug}] ${f.url} — ${f.reason}`);
  lines.push("");

  lines.push("## Articles flagged for manual review", "");
  if (!report.suspicious.length) lines.push("_None._", "");
  else for (const s of report.suspicious) lines.push(`- \`${s.slug}.md\` — ${s.reasons.join("; ")}`);
  lines.push("");

  await fs.writeFile(OUT_REPORT, lines.join("\n"));

  console.log(`\nDone. ${report.total} articles → content/articles/`);
  console.log(`Failed images: ${report.failedImages.length} | Flagged: ${report.suspicious.length}`);
  console.log("See migration/migration-report.md for details.");
}

main().catch((e) => {
  console.error("Migration failed:", e);
  process.exit(1);
});
