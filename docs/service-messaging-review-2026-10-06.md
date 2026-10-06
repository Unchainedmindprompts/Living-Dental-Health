# Cosmetic and implant messaging review — October 6, 2026

## Scope and base

Draft review only: two service pages and their shared schema. Vercel deployment `6gNqLStzJeaRYTkQKqkMYCXJNUEu` showed Production / Current, livingdentalhealth.com, branch `claude/connect-environment-image-R2F7h`, and commit `bf7e2c74f2fe685fd9a2172fa22f29898fa0dacb` before branching. No production promotion is part of this change.

## Source-to-copy provenance

- `content/articles/starting-the-new-year-with-a-confident-smile.md`: conversation about needs/goals/wishes and examination before recommendations; not everyone needs veneers; optional diagnostic wax-up to discuss appearance and bite. Applied to cosmetic hero, intro, three-step planning section and preview FAQ. Omitted the old 30-minute duration pending confirmation.
- `content/articles/two-solutions-for-achieving-your-perfect-smile.md`: color versus shape concerns, custom veneer planning, lab communication and wax-up made from existing teeth. Applied to treatment-choice paragraph and wax-up explanation; linked naturally. No universal whitening superiority or guaranteed outcome carried forward.
- `content/articles/the-benefits-of-cosmetic-dentistry-and-how-it-can-improve-your-smile-and-confidence.md`: individualized choices and price points, honest consultation. Applied to discussion of scope/cost and the patient-priorities block. No employment, social, immune, or affordability promises carried forward.
- `content/articles/dental-implants-because-having-teeth-is-in-style.md`: Andy's in-house planning/placement/restoration, imaging, impression/surgical-guide workflow, and final crown color/shape/function. Applied to implant planning and restoration sections. Imaging remains clinically indicated and guide use is a case-specific discussion. This older article is a provenance source, not a newly promoted patient link, because its broad clinical claims need review.
- `content/articles/dental-implants-vs-dental-bridges-filling-the-gap-in-your-smile.md`: individual candidacy and alternatives, conditional grafting, healing of months or longer, temporary-tooth questions, itemized full-treatment costs, risks and maintenance. Applied across implant stages and two new FAQs; linked directly. General implant information cross-checked against the FDA source already cited by that article: https://www.fda.gov/medical-devices/dental-devices/dental-implants-what-you-should-know .
- Existing `/before-and-after#case-01` supports the cosmetic wax-up case link. Existing veneer and crown evidence cards retained. No cosmetic gallery case is described as an implant case.

## Clinical review flags for Dr. Engel

Confirm the current impression/surgical-guide workflow and which cases use it; the draft describes the published approach and asks patients how it applies to them. Confirm any specific temporary-tooth options, follow-up cadence, appointment duration, or sedation regimen before adding them: none is promised here. Cosmetic follow-up is phrased as a question for the patient's plan, not an invented practice protocol.

The older implant article still contains permanent-result, universal-candidacy, success-rate, fixed recovery, sedation, and comparative-provider claims. The older bone-graft article still implies all missing teeth require grafting and gives broad recovery claims. These articles remain outside this two-page edit; their claims were not imported. Consider a separate clinical review before promoting them further. Existing credentials are retained, not newly verified.

## Schema audit

Audited `/cosmetic-dentistry` and `/dental-implants` using `.claude/skills/schema-audit/SKILL.md`. Cosmetic FAQs now share one data array between visible HTML and JSON-LD, retaining all three existing entries and adding two. Implant FAQs already shared data and add two entries. Updated cosmetic metadata and schema description together; removed the unsupported most-dentists-refer-out comparison from cosmetic copy and its procedure description together. Preserved canonical entities, procedure IDs, names, provider references, case evidence and appointment routes. No review quotations or new credentials added. Neutralized an implant image alt that implied an undocumented patient result.

Validation before push: production build and TypeScript passed; schema guard passed (93 definitions, 196 references, 73 article references; no duplicate/dangling IDs, host/type errors). Built HTML audit: one H1 per target page; all 11 FAQ pairs match visible text exactly; all 25 unique internal links and fragments resolve in built output; doctor is Person, practice is Dentist. `git diff --check` clean. Contact page, API and tracking source unchanged. No form submitted.

`npm run lint` cannot complete: the existing repo has no ESLint configuration/dependency and opens Next.js's first-run setup prompt. The build's type validation passed; this is not a claim of a lint pass. Dependency installation also reports existing security advisories, including the pinned Next.js version; dependency upgrades are outside this copy-only PR.
