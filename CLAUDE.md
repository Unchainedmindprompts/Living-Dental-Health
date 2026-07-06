# Living Dental Health — Working Notes for Claude

## Hard rule — schema audit on every page change

The site's SEO and business strategy are built around the schema.org entity
graph in `lib/schema.ts`. Before staging a commit that touches any of the
following, you MUST invoke the `schema-audit` skill and resolve any drift
in the same commit:

- `/app/**/page.tsx` (visible content, headings, hero copy, FAQ blocks,
  reviews, credentials, trust rows, alt text on text-bearing images)
- `/lib/schema.ts`
- `/content/articles/*.md` (when the change affects title, metadata, or
  the rendered article body)

This is non-negotiable. Silent drift between visible HTML and structured
data has already caused real production problems on this site; the skill
exists specifically to catch it before push.

## Project facts that must stay consistent across pages

These facts appear in multiple places (visible copy + schema). They are
NOT interchangeable — verify which one a sentence is referring to before
editing.

- **Dr. Andrew W. Engel — 28 years practicing dentistry in Bend** (since
  1998 at Century Dental Group, then founded Living Dental Health in 2013)
- **Living Dental Health — founded 2013** (the practice tenure, NOT the
  dentist tenure)
- **OHSU School of Dentistry, 1998** (Dr. Engel's DMD)
- **University of Oregon, B.S. General Science with Chemistry Minor**
  (Dr. Engel's undergrad)
- **1,000+ hours continuing education** in smile design, cosmetic
  dentistry, and full mouth reconstruction
- **Trained alongside a prosthodontist** during his advanced training —
  learned occlusion / bite architecture at the chair, on real cases.
  He is NOT a prosthodontist and is NOT board-certified in
  prosthodontics; never claim the specialty, and never add
  "Prosthodontics" to the #doctor `medicalSpecialty`. The phrasing is
  always "trained alongside" / "worked directly alongside."
- **CommunityVotes Bend Dental Hygiene Clinic — Platinum Winner, 2025 +
  2026**
- **Address:** 930 SW Yates Dr, Bend OR 97702
- **Phone:** (541) 550-5311
- **Hours:** Tue–Thu 8AM–5PM, Fri 8AM–1PM
- **New patients:** accepting ages 12 and up
- **4.9 ★ · 211 Google reviews** (update as the count grows)

## Shared image files — grep before overwriting

Several page-level hero images are referenced by more than one page as a
placeholder. Before overwriting a file in `/public/`, run:

```
grep -rn "<filename>" app/ components/
```

If more than one page references the file, either (a) save the new image
under a NEW filename and point only the requested page at it, or (b)
duplicate the old file under a dedicated filename for the other pages
BEFORE overwriting the shared one.

## Branch

Active development on `claude/build-homepage-v1Eye`. Push only to that
branch unless explicitly told otherwise.
