---
name: schema-audit
description: |
  MUST be invoked any time visible content on a page changes — headings, hero
  copy, FAQs, reviews, credentials, tenure claims, founding dates, team rosters,
  trust rows, intro paragraphs, alt text of images that include readable text,
  or any factual statement. The site's SEO and business strategy depend on the
  schema.org entity graph in lib/schema.ts staying consistent with what is
  rendered on the page AND with the canonical entities (#business, #doctor,
  #website, #blog). Run this skill BEFORE staging the commit, not after — if
  drift is found, fix it in the same commit so schema and HTML never diverge.
---

# Schema Audit

Run this audit any time a page in `/app/**/page.tsx` changes. The goal is to
guarantee three things are true at all times:

1. **Schema-visible word-for-word alignment** on user-visible content where
   schema mirrors the page (FAQs, Reviews, page name/headline, descriptions).
2. **Factual consistency** between visible claims and schema properties
   (founding years, tenure, credentials, team members, awards).
3. **Entity graph integrity** — every `@id` resolves, prominent people/places
   are present in the page's `@graph`, and cross-page references stay valid.

## Procedure

### Step 1 — Identify what changed

```
git diff --name-only HEAD
```

For each modified `app/**/page.tsx` file, note:
- which page it is (route)
- what visible content changed (headings, paragraphs, FAQs, lists,
  trust rows, credentials, dates, image alt text)

### Step 2 — Open the matching schema

Schemas live in `/lib/schema.ts`. The page imports a named export, for example:

| Page route | Schema export |
|---|---|
| `/` | `homeSchema` |
| `/about` | `aboutPageSchema` |
| `/team` | `teamPageSchema` |
| `/cosmetic-dentistry` | `cosmeticDentistryPageSchema` |
| `/full-mouth-reconstruction` | `fullMouthReconstructionPageSchema` |
| `/general-dentistry` | `generalDentistryPageSchema` |
| `/implants-surgery` | `implantsSurgeryPageSchema` |
| `/oral-cancer-screening` | `oralCancerScreeningPageSchema` |
| `/patient-info` | `patientInfoPageSchema` |
| `/sedation-dentistry` | `sedationDentistryPageSchema` |
| `/contact` | `contactPageSchema` |
| `/articles` and `/articles/[slug]` | `blogSchema`, `articleSchema(...)` |

Open the matching export. Identify which graph nodes touch the content you
changed (BreadcrumbList, WebPage/AboutPage/MedicalWebPage, FAQPage, Review,
Person, MedicalProcedure, etc.).

### Step 3 — Run the seven checks

For each modified page, walk this checklist. Anything that fails MUST be
fixed before committing.

**Check 1 — Page name / headline**
Schema `name` (and `headline` if present) should describe what the page is
about. If the H1 changes meaningfully, update `name`.

**Check 2 — Description / meta**
Schema `description` and the Next.js `metadata.description` should both
describe what's actually on the page. After major copy rewrites, re-read
both and confirm they still match.

**Check 3 — FAQ schema-visible alignment (the most failure-prone check)**
Every `Question` in a `FAQPage` schema must match a visibly rendered
question on the page **word-for-word**, including punctuation, contractions,
em-dashes, and capitalization. Same rule for the `Answer.text`. Per Google
guidance, mismatches are a structured-data violation. Verify each Q/A pair
by reading them side-by-side, not skimming.

**Check 4 — Reviews**
Every `Review.reviewBody` in schema must appear on the page as a visible
quote, attributed to the same `author.name`. Word-for-word.

**Check 5 — Factual consistency**
Cross-check all schema facts against the page:
- `foundingDate` for the business (LDH = 2013)
- `alumniOf` / `hasCredential` for the doctor (OHSU 1998, UO chem minor,
  1,000+ CE hours)
- Tenure phrases ("28 years," "since 1998") — confirm whether attached to
  Dr. Engel or the practice; they are NOT interchangeable
- Award entities (CommunityVotes 2025 + 2026 Platinum) — schema and trust
  bar must match year-for-year
- Team roster Person entities — every visible team card must have a
  matching Person node, and vice versa
- Service / MedicalProcedure entities — every prominent service listed in
  the page body should have a matching entity, and no entity should refer
  to a service that's no longer offered

**Check 6 — Entity graph integrity**
- Every `@id` reference (`{ "@id": "..." }`) must resolve to a node that
  exists somewhere in the site's schema graph
- Canonical entities (`#business`, `#doctor`, `#website`, `#blog`) should
  be referenced consistently across pages
- If a page prominently describes a Person (e.g., Dr. Engel on the team
  page), that Person should be in the page's `@graph` either inline or as
  an `@id` reference to the canonical node

**Check 7 — Alt text of images that contain readable text**
If a hero image has baked-in text, the `alt` attribute must include that
text (WCAG requirement for images-of-text). After swapping a hero image,
re-read the alt to confirm.

### Step 4 — Run the build

```
npm run build
```

A successful production build doesn't catch schema-visible drift, but it
catches syntax errors and broken imports in `lib/schema.ts`. Run it before
committing.

### Step 5 — Report findings

In the chat reply, list:
- Pages audited
- Drift found (with file:line and the mismatch)
- Drift fixed in the same commit
- Anything left as a known gap (and why)

If no drift was found, say so explicitly — silence is not the same as
confirmation.

## Things to never do

- Never push a page edit without running this audit
- Never invent FAQ entries, review quotes, awards, or credentials for
  schema purposes — schema must mirror real visible content
- Never edit schema without re-reading the matching page text alongside it
- Never assume two facts that "look similar" are the same fact ("28 years
  in Bend" attached to Dr. Engel is NOT the same as the practice being 28
  years old — LDH = 2013)
- Never swap a shared image file (e.g., `/public/cosmetic-hero.webp`)
  without first grepping for every page that references it
