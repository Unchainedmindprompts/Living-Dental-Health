import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/articles";

// Canonical host is the BARE APEX (www 301-redirects to it). Every URL here,
// the schema.org @id graph, robots host/sitemap, and metadataBase all agree
// on this base.
const BASE = "https://livingdentalhealth.com";

type Entry = MetadataRoute.Sitemap[number];

function toDate(iso: string, fallback: Date): Date {
  if (!iso) return fallback;
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? fallback : d;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static routes. Homepage carries the trailing slash to match the schema
  // root (…com/); interior routes have none (Next `trailingSlash: false`).
  const staticRoutes: Array<[string, number, Entry["changeFrequency"]]> = [
    ["/", 1, "monthly"],
    ["/cosmetic-dentistry", 0.9, "monthly"],
    ["/general-dentistry", 0.9, "monthly"],
    ["/implants-surgery", 0.9, "monthly"],
    ["/dental-implants", 0.8, "monthly"],
    ["/bone-grafting", 0.8, "monthly"],
    ["/wisdom-teeth-removal", 0.8, "monthly"],
    ["/full-mouth-reconstruction", 0.8, "monthly"],
    ["/sedation-dentistry", 0.8, "monthly"],
    ["/oral-cancer-screening", 0.8, "monthly"],
    ["/before-and-after", 0.7, "monthly"],
    ["/about", 0.7, "monthly"],
    ["/team", 0.7, "monthly"],
    ["/patient-info", 0.6, "monthly"],
    ["/patient-info/post-op", 0.4, "yearly"],
    ["/contact", 0.6, "yearly"],
    ["/articles", 0.6, "weekly"],
    ["/privacy", 0.3, "yearly"],
  ];

  const staticEntries: Entry[] = staticRoutes.map(
    ([path, priority, changeFrequency]) => ({
      url: path === "/" ? `${BASE}/` : `${BASE}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
    })
  );

  const articleEntries: Entry[] = getAllArticles().map((a) => ({
    url: `${BASE}/articles/${a.slug}`,
    lastModified: toDate(a.dateModified || a.datePublished, now),
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...staticEntries, ...articleEntries];
}
