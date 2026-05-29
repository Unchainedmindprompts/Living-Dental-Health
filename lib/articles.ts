import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

export type ArticleMeta = {
  slug: string;
  title: string;
  datePublished: string;
  dateModified: string;
  excerpt: string;
  featuredImage: string;
};

function metaFrom(slug: string, data: Record<string, unknown>): ArticleMeta {
  return {
    slug,
    title: String(data.title ?? ""),
    datePublished: String(data.datePublished ?? ""),
    dateModified: String(data.dateModified ?? ""),
    excerpt: String(data.excerpt ?? ""),
    featuredImage: String(data.featuredImage ?? ""),
  };
}

export function getArticleSlugs(): string[] {
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getAllArticles(): ArticleMeta[] {
  return getArticleSlugs()
    .map((slug) => {
      const raw = fs.readFileSync(path.join(ARTICLES_DIR, `${slug}.md`), "utf8");
      return metaFrom(slug, matter(raw).data);
    })
    .sort((a, b) => b.datePublished.localeCompare(a.datePublished));
}

function imageFilename(url: string): string {
  return (url.split("?")[0].split("/").pop() || "").toLowerCase();
}

// Some posts repeat their featured image as the first thing in the body.
// Since the article page already shows it as a banner, drop the duplicate.
function dropLeadingFeaturedImage(content: string, featured: string): string {
  const trimmed = content.replace(/^\s+/, "");
  const m = /^!\[[^\]]*\]\(\s*([^)\s]+)[^)]*\)\s*/.exec(trimmed);
  if (!m) return content;
  if (imageFilename(m[1]) === imageFilename(featured)) {
    return trimmed.slice(m[0].length);
  }
  return content;
}

export function getArticle(
  slug: string
): { meta: ArticleMeta; html: string } | null {
  const file = path.join(ARTICLES_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  const meta = metaFrom(slug, data);
  const body = dropLeadingFeaturedImage(content, meta.featuredImage);
  const html = marked.parse(body, { async: false }) as string;
  return { meta, html };
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function formatDate(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  if (!m) return "";
  const [, y, mo, d] = m;
  return `${MONTHS[parseInt(mo, 10) - 1]} ${parseInt(d, 10)}, ${y}`;
}
