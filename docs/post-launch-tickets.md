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
