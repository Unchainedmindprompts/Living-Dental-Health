import type { MetadataRoute } from "next";

// Robots policy for Living Dental Health.
// Explicitly allows the major AI crawlers in addition to standard search bots
// — without this, several of them default to disallow.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Standard crawlers — full access except API routes.
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      // AI crawlers — explicit allow so we are eligible for citation
      // and answer generation by Anthropic, OpenAI, Perplexity, Google's
      // generative search, Common Crawl, and Cohere.
      {
        userAgent: [
          "ClaudeBot",
          "Claude-Web",
          "anthropic-ai",
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "PerplexityBot",
          "Perplexity-User",
          "Google-Extended",
          "Bingbot",
          "Applebot",
          "Applebot-Extended",
          "cohere-ai",
          "CCBot",
          "Meta-ExternalAgent",
          "FacebookBot",
          "Bytespider",
        ],
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    host: "https://www.livingdentalhealth.com",
    sitemap: "https://www.livingdentalhealth.com/sitemap.xml",
  };
}
