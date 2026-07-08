# Post-Launch Tickets

Non-blocking work deliberately deferred until after launch. Each item is
safe to leave as-is for go-live; none affect correctness of the rendered
site or the entity graph.

---

## TICKET P2-1 — Centralize shared scalar constants in `lib/site.ts`

**Priority:** Low (post-launch refactor, no behavior change)
**Status:** Open — deferred by owner during pre-launch audit
**Opened by:** entity-graph audit (2026-07)

### Problem

Several business facts are hardcoded as string literals in multiple
places instead of referencing a single shared constant. Today they are
kept consistent by hand (and by the `schema-audit` skill). Examples of
facts duplicated across `lib/schema.ts` and one or more `app/**/page.tsx`
files and `public/llms.txt`:

- Phone `(541) 550-5311` / `+1-541-550-5311`
- Address `930 SW Yates Dr, Bend, OR 97702`
- Hours `Tue–Thu 8AM–5PM, Fri 8AM–1PM`
- Founding year `2013`, doctor tenure `1998` / `28 years`
- Continuing-education hours `1,000+`
- Aggregate rating `4.9` / review count `211`
- Canonical base URL `https://livingdentalhealth.com`

When one of these changes (e.g. the review count grows), it must be
updated in every location. A missed spot is silent drift.

### Proposed fix

Create `lib/site.ts` as the single source of truth for these scalars:

```ts
export const SITE = {
  baseUrl: "https://livingdentalhealth.com",
  phoneDisplay: "(541) 550-5311",
  phoneE164: "+1-541-550-5311",
  address: {
    street: "930 SW Yates Dr",
    city: "Bend",
    region: "OR",
    postal: "97702",
  },
  foundingYear: "2013",
  doctorSince: "1998",
  ceHours: "1,000+",
  rating: { value: "4.9", count: "211" },
} as const;
```

Then import `SITE` into `lib/schema.ts` and the pages, replacing the
duplicated literals. Visible copy that embeds a fact in a sentence can
interpolate from `SITE`; schema properties reference it directly.

### Why deferred

- Pure refactor — no rendered output changes, so zero launch value and
  non-zero regression risk if done under launch pressure.
- The `schema-audit` skill already catches cross-file drift on these
  facts, so the manual-consistency cost is bounded until this lands.

### Acceptance criteria

- [ ] `lib/site.ts` exists and exports the shared scalars.
- [ ] `lib/schema.ts` and all `app/**/page.tsx` reference `SITE.*` for
      the facts above instead of repeating literals.
- [ ] `npm run build` clean; rendered HTML byte-identical to pre-refactor
      for the affected facts (diff the built `.next/server/app/*.html`).
- [ ] `@id` sweep still reports 0 dangling / 0 duplicate.

---

## TICKET P2-9 — Article `about` → subject map (per-article topical linking)

**Priority:** Low (SEO/AEO enrichment; no rendered-content change)
**Status:** Open — deferred during the launch-gate audit (owner decision)
**Opened by:** entity-graph launch audit (2026-07)

### Problem

The 53 `BlogPosting` nodes (`articlePostSchema`) have `author`, `publisher`,
and `isPartOf` but no `about`. That leaves each article topically
disconnected from the procedure/condition it discusses. It must NOT be set
reflexively to `#business` (that would be wrong — an article about bone
grafts is *about* bone grafting, not about the practice).

### Proposed fix

Build a `slug → subject` map (procedure/condition entity or a
`DefinedTerm`/`MedicalCondition`/`MedicalProcedure` with name + url) and set
`about` on each `BlogPosting` from it. ~53 entries; needs a human pass to
map each article to its real subject. Optionally add `keywords` and
`articleSection` at the same time.

### Acceptance criteria

- [ ] Every `BlogPosting` has an `about` referencing its real subject.
- [ ] No article's `about` is reflexively `#business`.
- [ ] `@id` sweep clean; build clean.

---

## TICKET P2-8 — Publisher `#logo` width/height (blocked on brand asset)

**Priority:** Low (Google Article logo guidance)
**Status:** BLOCKED — brand image assets are not in the repo yet
**Opened by:** entity-graph launch audit (2026-07)

### Problem

Google's Article structured-data guidance recommends the publisher `logo`
`ImageObject` carry `width`/`height`. We cannot set accurate dimensions
because the brand assets are missing (see launch task below): the files
`#logo` and `#business.image` / `#doctor.image` point at do not exist in
`public/images/brand/`. Setting invented dimensions would be fabrication.

### Blocked on — LAUNCH TASK: brand image assets

`public/images/brand/` does not exist. These schema URLs 404 until the real
files are added:

- `/images/brand/living-dental-health-logo.png`  (`#logo`)
- `/images/brand/living-dental-health-office.jpg` (`#business.image`)
- `/images/brand/dr-andy-engel.jpg`               (`#doctor.image`)

This is the same class of task as the wp-content image localization (waiting
on source files). Once the real logo file is added, set `#logo`
`width`/`height` from its actual pixel dimensions and close this ticket.

### Acceptance criteria

- [ ] Brand assets present under `public/images/brand/`.
- [ ] `#logo` has `width`/`height` matching the real file.
- [ ] `@id` sweep clean; build clean.
