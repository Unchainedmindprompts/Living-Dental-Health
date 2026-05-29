#!/usr/bin/env node
/**
 * Living Dental Health — WordPress → Markdown, from a saved export file.
 *
 * Sibling of migrate.mjs. Use this when you already have the raw WordPress
 * API response saved to disk (e.g. exported from a browser) and the machine
 * running this can't reach the live site. It does NOT fetch anything and does
 * NOT download images — inline <img> and featured-image URLs are kept pointing
 * at the live site (resolved to absolute https), so they still render.
 *
 *     node migrate-from-file.mjs <path-to-export.json>
 *
 * Writes ONLY to:
 *   - content/articles/{slug}.md
 *   - migration/migration-report.md
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import TurndownService from "turndown";
import { gfm } from "turndown-plugin-gfm";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");

const SITE_ORIGIN = "https://livingdentalhealth.com";
const OUT_REPORT = path.join(__dirname, "migration-report.md");
const OUT_CONTENT = path.join(REPO_ROOT, "content", "articles");

const INPUT = process.argv[2];
if (!INPUT) {
  console.error("Usage: node migrate-from-file.mjs <path-to-export.json>");
  process.exit(1);
}

// ---------------------------------------------------------------- helpers

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

// Some old posts contain raw Divi page-builder shortcodes instead of HTML.
// Keep the image, drop the wrapper tags. Divi attributes are quoted with
// curly quotes that may be literal chars OR HTML entities (&#8221; etc.).
function normalizeQuotes(s) {
  return s.replace(/&#822[01];|&#824[23];|&quot;|&#34;|[“”‘’]/g, '"');
}
function stripDiviShortcodes(h) {
  h = h.replace(/\[et_pb_image\b([^\]]*)\]/gi, (_, attrs) => {
    const a = normalizeQuotes(attrs);
    const src = a.match(/\bsrc="([^"]+)"/i);
    if (!src) return "";
    const alt = a.match(/\balt="([^"]*)"/i);
    return `<p><img src="${resolveUrl(src[1])}" alt="${alt ? alt[1] : ""}"></p>`;
  });
  return h.replace(/\[\/?et_pb_[a-z_]+\b[^\]]*\]/gi, "");
}

function preprocessHtml(html) {
  let h = stripDiviShortcodes(html);
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
    (_, src) => `<p><a href="${resolveUrl(src)}">${resolveUrl(src)}</a></p>`
  );
  // Keep <img> remote, but resolve protocol-relative / root-relative URLs to absolute.
  h = h.replace(/<img\b[^>]*>/gi, (tag) => {
    const m = tag.match(/\bsrc=["']([^"']+)["']/i);
    if (!m) return tag;
    const abs = resolveUrl(m[1]);
    return abs === m[1] ? tag : tag.replace(m[0], `src="${abs}"`);
  });
  return h;
}

function cleanMarkdown(md) {
  return (
    md
      .replace(/<!--\s*\/?wp:[\s\S]*?-->/g, "")
      .replace(/[ \t]+\n/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim() + "\n"
  );
}

// ---------------------------------------------------------------- main

async function main() {
  await fs.mkdir(OUT_CONTENT, { recursive: true });

  const posts = JSON.parse(await fs.readFile(INPUT, "utf8"));
  if (!Array.isArray(posts)) throw new Error("Expected the export to be a JSON array of posts.");
  console.log(`Loaded ${posts.length} posts from ${INPUT}`);

  const usedSlugs = new Set();
  const report = { total: 0, dates: [], duplicates: [], suspicious: [] };

  for (const post of posts) {
    const title = decodeEntities(post?.title?.rendered || "Untitled");
    let slug = post?.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    if (usedSlugs.has(slug)) {
      let i = 2;
      let candidate = `${slug}-${i}`;
      while (usedSlugs.has(candidate)) candidate = `${slug}-${++i}`;
      report.duplicates.push({ original: slug, renamed: candidate });
      slug = candidate;
    }
    usedSlugs.add(slug);

    // featured image — keep the remote URL (resolved to absolute)
    const media = post?._embedded?.["wp:featuredmedia"];
    const featuredUrl =
      Array.isArray(media) && media[0]?.source_url ? resolveUrl(media[0].source_url) : "";

    const html = post?.content?.rendered || "";
    const body = cleanMarkdown(td.turndown(preprocessHtml(html)));

    const fm = frontmatter({
      title,
      slug: post?.slug || slug,
      datePublished: post?.date || "",
      dateModified: post?.modified || "",
      excerpt: stripHtml(post?.excerpt?.rendered || ""),
      featuredImage: featuredUrl,
      status: "migrated-as-is",
    });

    await fs.writeFile(path.join(OUT_CONTENT, `${slug}.md`), fm + body);

    report.total++;
    if (post?.date) report.dates.push(post.date);
    const reasons = [];
    if (body.trim().length < 15) reasons.push("empty/near-empty body");
    if (/<!--\s*wp:/.test(body)) reasons.push("leftover wp: block comment");
    const unescaped = body.replace(/\\/g, "");
    if (/\[\/?(caption|gallery|embed|audio|video|playlist|et_pb_|vc_|fusion_|su_|contact-form-7|gravityform)/i.test(unescaped))
      reasons.push("leftover shortcode");
    if (/\|/.test(body) && !/\|[\s:-]*-{3,}/.test(body))
      reasons.push("possible broken table (pipes, no separator row)");
    if (reasons.length) report.suspicious.push({ slug, reasons });
  }

  const dates = report.dates.sort();
  const lines = [
    "# WordPress → Markdown migration report (from saved export)",
    "",
    `Generated: ${new Date().toISOString()}`,
    `Source file: ${INPUT}`,
    "",
    `- **Articles migrated:** ${report.total}`,
    `- **Date range:** ${dates[0] || "n/a"} → ${dates[dates.length - 1] || "n/a"}`,
    `- **Articles flagged for review:** ${report.suspicious.length}`,
    `- **Duplicate slugs renamed:** ${report.duplicates.length}`,
    "",
    "_Images were left pointing at the live site (not downloaded). Localize them at deploy time if desired._",
    "",
  ];

  lines.push("## Duplicate slugs (renamed)", "");
  if (!report.duplicates.length) lines.push("_None._", "");
  else for (const d of report.duplicates) lines.push(`- \`${d.original}\` → \`${d.renamed}\``);
  lines.push("");

  lines.push("## Articles flagged for manual review", "");
  if (!report.suspicious.length) lines.push("_None._", "");
  else for (const s of report.suspicious) lines.push(`- \`${s.slug}.md\` — ${s.reasons.join("; ")}`);
  lines.push("");

  await fs.writeFile(OUT_REPORT, lines.join("\n"));

  console.log(`\nDone. ${report.total} articles → content/articles/`);
  console.log(`Flagged for review: ${report.suspicious.length} | Duplicate slugs: ${report.duplicates.length}`);
  console.log("See migration/migration-report.md for details.");
}

main().catch((e) => {
  console.error("Migration failed:", e);
  process.exit(1);
});
