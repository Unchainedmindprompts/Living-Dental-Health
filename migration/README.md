# WordPress → Markdown migration

One-off tool to copy every article from the live WordPress site
(`livingdentalhealth.com`) into this project as clean markdown.

## Run it (on your machine, not the Claude sandbox)

This must run somewhere with open internet — the Claude Code sandbox
blocks outbound requests to `livingdentalhealth.com`, so run it locally:

```bash
cd migration
npm install
node migrate.mjs
```

Requires **Node 18+** (uses the built-in `fetch`).

## What it does

- `GET`s the public WordPress REST API (read-only — it never changes the
  live site) and saves the raw response to `migration/raw-export.json`.
- Converts each post's HTML body to markdown with **turndown** (+ GFM
  tables), stripping Gutenberg `wp:` block comments, inline styles,
  classes, empty wrappers, `[caption]`/`[embed]` shortcodes, and oEmbed
  iframes (the embed URL is kept as a link).
- Downloads each featured image and every inline `<img>` to
  `public/images/articles/{slug}/` and rewrites the paths.
- Writes one file per article to `content/articles/{slug}.md` with
  frontmatter: `title`, `slug`, `datePublished`, `dateModified`,
  `excerpt`, `featuredImage`, `status: "migrated-as-is"`.
- Duplicate slugs are written as `{slug}-2.md` (logged, never overwritten).
- Writes `migration/migration-report.md`: article count, date range, any
  failed image downloads, and any conversions flagged for review.

## What it does NOT do

- Does not modify the live WordPress site (read-only).
- Does not modify any project files outside `content/`,
  `public/images/`, and `migration/`.
- Does not commit to git or deploy — review the output, then commit when
  you're happy.

## Note on rendering

These markdown files are an **import for review**. The `/articles` page
doesn't render them yet — wiring a markdown/MDX route to display them is a
separate step.
