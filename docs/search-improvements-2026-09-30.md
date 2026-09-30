# Search and appointment-request improvements — September 30, 2026

Prepared against production/default branch `claude/connect-environment-image-R2F7h` at `736eca0a324136948cf75d6265b9d44bb7b22ce3`. This is a review branch; it does not itself publish to the production domain.

## Changes

- Restored `/teeth-whitening` and `/clear-correct-braces` as dedicated pages, removed their broad cosmetic-page redirects, added canonical/social metadata, breadcrumbs, visible FAQs and matching JSON-LD. Existing procedure IDs remain stable and now link to the dedicated pages.
- Added implants, whitening and ClearCorrect to navigation; added a direct implant link on the homepage and relevant consultation links in three existing articles.
- Made six service H1s explicit about service and Bend. Added page-specific social metadata to those pages. Added cost/timing discussion to the implant page without inventing prices.
- Removed duplicate article H1s, shortened article SEO titles without changing their editorial titles, and stopped assigning every static sitemap URL the build date. Three substantively expanded articles have actual September 30 modification dates.
- Made footer labels clickable and replaced the dead accessibility anchor with a useful accessibility-contact page.
- Aligned individualized imaging and sedation-recovery copy with schema. Removed unsupported whitening guarantees and a universal aligner timeline. Removed the stale fax number and the extra 2026 Gold award from machine-readable surfaces so awards match the three visible awards.
- Contact requests now fail visibly if email transport is missing or rejects the request. Provider acceptance, not inbox delivery or booking confirmation, is required for success. No submission payload is logged. Added size/type/origin validation, HTML escaping, a honeypot, and a client duplicate-submit guard.

## Schema audit

Audited homepage, contact, cosmetic dentistry, general dentistry, implants/surgery, dental implants, full mouth reconstruction, sedation, oral cancer screening, both new cosmetic service pages, accessibility, and changed articles. Accessibility carries the shared business/NAP graph; it does not need a medical-procedure entity. Article titles remain the visible editorial titles in Article schema even where shorter metadata titles are used.

Drift fixed in `lib/schema.ts`: service WebPage names now reflect changed H1s; general-dentistry imaging FAQ and sedation recovery FAQ match the updated visible answers; sedation descriptions no longer guarantee 24-hour clearance. Whitening/ClearCorrect FAQs use the same data as their rendered pages. Business awards now match visible evidence. Canonical person/business types and existing procedure IDs were preserved.

Validation: production build and TypeScript checks pass; schema guard passes with 93 definitions, 196 references, and 73 article entity references. Rendered audit covers all 75 content pages, confirms one H1 per page, and checks 217 FAQ pairs against rendered text with zero mismatches. Contact transport tests cover invalid/malformed/oversized requests, missing transport, provider errors and exceptions, accepted requests, and escaping. Tests use a mock transport and send no email.

## Configuration still needed

- Verify production `RESEND_API_KEY`, verified `CONTACT_FROM_EMAIL`, and intended `CONTACT_TO_EMAIL`. Their real values were not read or changed. A separately authorized test request should confirm actual mailbox receipt after deployment. The new missing-configuration behavior is deliberately a clear phone fallback, not a false success.
- `ldh:conversion` browser events expose only `{ event }`, with names `phone_click`, `appointment_request_click`, and `contact_request_sent`. These are provider-neutral hooks, not active GA4/Ads measurement. Connect an approved analytics destination and decide the appropriate data/consent configuration before enabling third-party tracking. No form contents, email, phone, query parameters, or patient details are included in these hooks.
- Honeypot and validation are basic protections, not a distributed spam-rate-limiting service.
- New/changed clinical copy is an editorial draft for Dr. Engel's review; this work does not assert that he has reviewed it. Practice-specific ClearCorrect credentials and services are retained from the existing site; no new price, credential, outcome, or availability is invented.
- Search rankings and search-volume forecasts are not measured by this build. Search Console/indexing and business-profile work are separate account-side steps.
