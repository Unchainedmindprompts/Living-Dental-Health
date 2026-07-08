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
guarantee four things are true at all times:

1. **Schema-visible word-for-word alignment** on user-visible content where
   schema mirrors the page (FAQs, Reviews, page name/headline, descriptions).
2. **Factual consistency** between visible claims and schema properties
   (founding years, tenure, credentials, team members, awards).
3. **Entity graph integrity** — every `@id` resolves, prominent people/places
   are present in the page's `@graph`, and cross-page references stay valid.
4. **Correct entity typing** — every node's `@type` describes what the entity
   *is*, not what it does. An individual human is always `@type: Person`;
   the practice is the `Dentist`/`LocalBusiness`. See Check 8.

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

### Step 3 — Run the eight checks

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

**Check 8 — Person vs. business type (the entity is what it *is*)**
Every node's `@type` must describe what the entity *is*, not what it does.
The most dangerous failure on a professional-practice site is typing the
**individual human** with the **business** type that describes the practice.

In schema.org, `Dentist` is a subtype of `LocalBusiness` / `MedicalBusiness`
— it models the *office*, not the person. The same trap exists for every
professional practice: `RealEstateAgent`, `Physician`, `Attorney`,
`Accountant`, `Optometrian`, etc. are all business/organization types.

- The **practice** node (`#business`) → the business type
  (`Dentist`, `LocalBusiness`, `MedicalBusiness`).
- The **individual human** node (`#doctor`, `#owner`, `#agent`, …) →
  **always `@type: Person`**. Express their profession with `jobTitle`
  (e.g. `"Dentist"`) and/or `hasOccupation` (an `Occupation` node) — never
  by stamping the person with the `LocalBusiness` subtype.
- Do **not** put business/physician-only properties on a `Person` node.
  `medicalSpecialty`, `openingHoursSpecification`, `priceRange`,
  `aggregateRating`, `areaServed`, `address`(as a business location) belong
  on the practice node. If you need to convey a person's clinical focus,
  use `knowsAbout` on the Person and `medicalSpecialty` on the practice.

Why this is its own check: the `@id` is unique and resolves fine, so the
duplicate-`@id` sweep and the dangling-reference check both pass. The node
is simply the **wrong kind of thing** — a defect only a type-level read
catches. A dentist's own site telling Google the dentist is a medical
*building* is exactly the kind of error that quietly tanks a knowledge
panel. Confirm in the **built** HTML, not just source: `#doctor` must
render `@type: Person`, and only `#business` may carry `@type: Dentist`.

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

## Automated enforcement (schema-guard)

A subset of these checks is enforced automatically by
`scripts/schema-guard.mjs`, so drift cannot reach production:

- **What it checks:** duplicate `@id` definitions, dangling `@id`
  references, person-vs-business typing (`#doctor` must be `Person`;
  business types only on `#business`), and www host leaks on the
  canonical surfaces (`lib/`, `app/`, `public/agent.json`,
  `public/llms.txt`). Article `wp-content` images in `content/**.md`
  are intentionally out of scope (pending asset localization).
- **When it runs:** `prebuild` (before every `next build`, so CI/Vercel
  fails on drift), a Husky `pre-commit` hook (before every commit), and
  it reinstalls on a fresh clone via `prepare: husky`.
- **Run it by hand:** `npm run schema-guard`.

The guard is the mechanical backstop; it does NOT replace this skill.
The schema-visible alignment checks (FAQ/Review word-for-word, factual
consistency, alt text, name/description) still require the human read
described above — run this audit on every page change regardless.

## Accepted exceptions (do NOT flag these as drift)

**Two `#business` nodes in the home page's rendered HTML.**
Every page emits a NAP-only `#business` stub via `app/layout.tsx`
(`napStubSchema` → `businessNapStub`). The home page *additionally*
emits the full `#business` node via `homeSchema` (`businessFull`, which
is `{ ...businessNapStub, ...businessEnrichment }`). So the home page's
combined JSON-LD contains **two nodes sharing `@id`
`https://livingdentalhealth.com/#business`**.

This is intentional and correct, not a duplicate-definition bug:

- Per JSON-LD / schema.org semantics, nodes with the same `@id` are
  merged into one logical entity by consumers, so the graph still
  describes a single business.
- The split exists on purpose: the NAP stub is a real local signal on
  *every* page, while `aggregateRating`, `sameAs`, `award`, and the
  other enrichment live in exactly one place (home) so they are never
  duplicated across the site.
- At the **source** level there is still only one literal `@id: #business`
  (in `businessNapStub`); `businessFull` inherits it via spread. The
  `@id` sweep is source-level and correctly reports 0 duplicate
  definitions.

Do not "fix" this by removing the stub from the home page or by giving
the two nodes different `@id`s. If you are inspecting *rendered* home
HTML and see two `#business` nodes, that is expected.

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
- Never type an individual human with a business type. Dr. Engel is a
  `Person` with `jobTitle`/`hasOccupation` "Dentist" — he is NOT
  `@type: Dentist` (that type is the *practice*). Same trap for any
  `RealEstateAgent`, `Physician`, `Attorney`, etc. (see Check 8)
