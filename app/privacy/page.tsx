import type { Metadata } from "next";
import Nav from "@/components/Nav";

const SAGE = "#6B7C5C";

export const metadata: Metadata = {
  title: "Privacy Policy — Living Dental Health, Bend Oregon",
  description:
    "How Living Dental Health collects, uses, and protects patient information.",
  // STUB: keep this page out of the index until the REAL, migrated legal copy
  // replaces the placeholder below. Remove `robots` once the actual policy is
  // live so the page can be indexed.
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <main
        className="min-h-screen text-charcoal"
        style={{ backgroundColor: "#F5F0E8" }}
      >
        <Nav />
        <div className="h-[100px]" aria-hidden />

        <section className="mx-auto max-w-[820px] px-6 pt-10 pb-24 sm:pt-16">
          <p
            className="font-inter text-[11px] font-light uppercase tracking-widest"
            style={{ color: SAGE }}
          >
            &mdash; legal &mdash;
          </p>
          <h1 className="mt-5 font-serif text-[40px] leading-[1.05] text-charcoal sm:text-[56px]">
            Privacy <span className="font-serif-italic">Policy</span>
          </h1>

          {/*
            ────────────────────────────────────────────────────────────────
            PLACEHOLDER — DO NOT SHIP AS-IS.

            Replace the block below with Living Dental Health's REAL Privacy
            Policy (and HIPAA Notice of Privacy Practices), migrated verbatim
            from the existing WordPress /privacy page. Never publish
            AI-drafted legal text as the practice's actual policy.

            When the real copy is in place, ALSO remove the `robots: { index:
            false }` line in the metadata above so the page can be indexed.
            ────────────────────────────────────────────────────────────────
          */}
          <div className="mt-8 space-y-5 font-inter text-[15px] font-light leading-[1.75] text-charcoal-soft sm:text-[16px]">
            <p>
              Our full privacy policy for the new site is being finalized. For
              any questions about how Living Dental Health collects, uses, and
              protects your health information, please call{" "}
              <a href="tel:5415505311" className="underline">
                (541) 550&#8209;5311
              </a>{" "}
              or email{" "}
              <a
                href="mailto:info@livingdentalhealth.com"
                className="underline"
              >
                info@livingdentalhealth.com
              </a>
              .
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
