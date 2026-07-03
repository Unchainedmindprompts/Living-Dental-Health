# Living Dental Health — Launch-Day Runbook

**Governing rule:** the old WordPress host must stay reachable until every asset
is localized and every redirect is verified. The DNS flip is the point of no
return for anything still hot-linking the old host. So:
**localize → redirect → verify on the Vercel preview FIRST; flip DNS LAST;
decommission WordPress much later.**

---

## Repo-verified amendments (from a live audit of this repo)

1. **Schema logo/images are silently missing — fix in the localization pass.**
   `lib/schema.ts` references `/images/living-dental-health-office.jpg`,
   `/images/living-dental-health-logo.png`, and `/images/dr-andy-engel.jpg`.
   They are **not** wp-content (good), but the files don't exist **and**
   `sanitizeJsonLd` strips them (they match the placeholder-image regex), so
   the Organization/Dentist entity currently ships with **no logo and no
   image** in JSON-LD. During the image pass, grab the real logo + office +
   Dr. Andy headshot from the old WP site, save them, and either name them
   outside the `/images/*.{jpg,png}` placeholder pattern or whitelist them in
   `sanitizeJsonLd` so they survive. (The 6 case `contentUrl`s → `/case-0N.webp`
   are fine: self-hosted, present, not stripped.)

2. **`/privacy` is a net-new build — confirmed no route exists.** No HIPAA page
   either. Do **not** publish AI-drafted legal text. The old WordPress site has
   a real Privacy Policy live now — migrate that exact content. A stub page
   (`app/privacy/page.tsx`, `noindex`) is in place awaiting the real copy; the
   homepage footer link now points at `/privacy`.

3. **Vercel domain config is DONE.** apex = Primary (Production), `www` = 308 →
   apex. The "Invalid Configuration" state is just the expected waiting-for-DNS
   status, not an error. (Box legitimately checked.)

4. **IndexNow needs setup first.** Firing IndexNow requires an API key **and**
   a key file hosted at `livingdentalhealth.com/{key}.txt`. Add "generate
   IndexNow key + host key file" as a sub-step before Phase 2, item 14.

5. **Redirects are unblocked by pasting the redirect map.** The 53 real article
   slugs are extracted and confirmed to have **zero collisions** with top-level
   routes. Paste Section A (old post slugs) + Section B (page→page map) and the
   `vercel.json` edge redirects get generated (trailing-slash sources; 1-hop
   apex, ≤2-hop www) with a source→dest→status table.

---

## Phase 0 — Pre-launch (old WP still live, DNS unchanged)

> Run Claude Code **locally** for anything that must reach the live old host —
> the cloud sandbox is blocked from `livingdentalhealth.com`.

1. **Localize images — LAUNCH BLOCKER.**
   - Download all **125** hot-linked `wp-content` images (53 article
     `featuredImage` + 72 inline body) into `public/images/articles/...`.
   - Rewrite all 125 references to the new local paths.
   - **Also grab the 3 missing schema images** (logo, office, Dr. Andy
     headshot) and fix the sanitize/naming so they survive (amendment 1).
   - `npm run build`, then grep the build for `livingdentalhealth.com/wp-content`
     → must be **0**. Confirm all images render on the preview.

2. **Post-slug diff.** Diff the 53 old post slugs (map Section A) against the 53
   real `/articles` slugs. Flag any old slug with no matching new article →
   assign a manual target.

3. **Implement redirects (301).**
   - Section A (blog posts) as an **explicit allowlist** — never a root catch-all.
   - Section B (pages/services) exactly as mapped.
   - **Collapse hop chains:** write `source` to match the trailing-slash form;
     implement at the Vercel edge (`vercel.json`) so it fires before Next's slash
     normalization. Target: old apex URL → final in 1 hop; old www URL → ≤2.
   - `npm run build`; output a source → destination → status table.

4. **Resolve the four flagged targets:**
   - **Privacy Policy / HIPAA** — real `/privacy` (+ HIPAA notice) page; migrate
     the actual copy from old WP. Never redirect a legal page to the homepage.
   - `/testimonials/` → decide (`/about`, `/`, or `/before-and-after`).
   - `/migraines/` and `/family-dentist-in-bend-or/` → confirm `/general-dentistry`
     (or homepage).

5. **GSC inventory (Mark).** Google Search Console → Pages + top Performance
   URLs. Add anything indexed but not in the Yoast sitemaps: category/tag
   archives, paginated blog (`/blog/page/2/`), `?p=123` IDs, old/renamed slugs.
   Decide each: 301 to a relevant new URL, or `410 Gone`.

6. **Live-200 spot check (Mark).** Sample a dozen old URLs → confirm they still
   return 200 today.

7. **Preview QA.** Full click-through on the Vercel preview; test a sample of
   redirects; re-run the schema/entity-graph audit → still clean, 0 dangling
   refs; confirm `sitemap.xml` renders apex URLs with `lastmod`.

---

## Phase 1 — Cutover (DNS flip)

8. Vercel domains configured: apex = Primary (Production), `www` = 308 → apex. ✓
   (see amendment 3)
9. In Vercel → Domains → `livingdentalhealth.com`, copy the exact **A record**
   (apex) and **CNAME** (`www`).
10. Send IT **only** those two records. Explicit: **do not touch MX or TXT**
    (email keeps working).
11. IT updates DNS.
12. Wait for propagation + Vercel auto-issues SSL; both domains flip to
    **Valid Configuration**.

---

## Phase 2 — Post-launch (same day)

13. **Verify live:** apex serves the new site over HTTPS; `www` 308-redirects to
    apex; sample old URLs 301 to correct new URLs (few hops); article images
    load; **zero** `wp-content` 404s.
14. **Submit `https://livingdentalhealth.com/sitemap.xml`** in GSC + **fire
    IndexNow** (needs key file — amendment 4).
15. URL-inspect a few priority pages in GSC; request indexing.

---

## Phase 3 — Monitor (first 1–2 weeks)

16. Watch GSC Coverage + Crawl Stats for 404 spikes; add redirects for any missed
    old URL.
17. Confirm new URLs move into "Indexed"; old URLs show as "redirected," not
    "error."

---

## Rollback

If launch goes badly: revert DNS (A/CNAME back to the old host). The old
WordPress site is untouched and intact — that's why it stays live.

## Decommission WordPress

**Only after:** images localized, redirects verified live, GSC showing new URLs
indexing with no 404 spike (give it 1–2+ weeks). Keep a full backup of the old
WP + `wp-content` before pulling it down.
