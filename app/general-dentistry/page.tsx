import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import { generalDentistryPageSchema, sanitizeJsonLd } from "@/lib/schema";

const SAGE = "#6B7C5C";
const SAGE_LABEL = "#9CAF88";

export const metadata: Metadata = {
  title: "General Dentistry — Living Dental Health, Bend Oregon",
  description:
    "Cleanings, exams, fillings, crowns, bridges, and dentures at Living Dental Health. Dr. Andy Engel has provided foundational dental care to Bend, Oregon families for 28 years.",
};

const SERVICES = [
  {
    id: "cleanings",
    heading: "Cleanings & Exams",
    body:
      "A professional cleaning does what brushing and flossing can’t — remove built-up tartar, check for early signs of decay, and give Dr. Engel a chance to catch small problems before they become expensive ones. We recommend visits every six months. Most appointments run about 60 minutes.",
    detail: "60 min · digital x-rays on-site · ages 12 and up",
    imageAlt:
      "Hygienist at Living Dental Health performing a cleaning and exam in Bend, Oregon",
  },
  {
    id: "fillings",
    heading: "Dental Fillings",
    body:
      "When decay happens, tooth-colored composite fillings restore the tooth to full function without the silver. They bond directly to the tooth structure, look natural, and are completed in a single visit.",
    detail: "tooth-colored composite · single visit · no metal",
    imageAlt:
      "Tooth-colored composite filling being placed at Living Dental Health",
  },
  {
    id: "crowns",
    heading: "Dental Crowns",
    body:
      "A crown fully covers a damaged or weakened tooth, restoring its shape, strength, and appearance. Dr. Engel uses crowns to protect teeth after root canals, repair cracked teeth, or anchor a dental bridge. Custom-fitted and natural looking.",
    detail:
      "porcelain or ceramic · custom fitted · protects and restores",
    imageAlt:
      "Custom porcelain crown fitting at Living Dental Health in Bend, Oregon",
  },
  {
    id: "bridges",
    heading: "Dental Bridges",
    body:
      "A bridge fills the gap left by a missing tooth using the surrounding teeth as anchors. It restores your bite, prevents neighboring teeth from shifting, and looks completely natural. A reliable, non-surgical option for tooth replacement.",
    detail:
      "fixed restoration · natural appearance · prevents shifting",
    imageAlt: "Dental bridge restoration at Living Dental Health",
  },
  {
    id: "dentures",
    heading: "Dentures",
    body:
      "Whether you need a full or partial denture, Dr. Engel custom fits every appliance to your mouth for comfort and function. We also work with implant-supported dentures for patients who want a more permanent solution.",
    detail:
      "full and partial · implant-supported options · custom fitted",
    imageAlt:
      "Custom denture fitting at Living Dental Health in Bend, Oregon",
  },
];

export default function GeneralDentistryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(sanitizeJsonLd(generalDentistryPageSchema)),
        }}
      />
      <main
        className="min-h-screen text-charcoal"
        style={{ backgroundColor: "#F5F0E8" }}
      >
        <Nav />
        <div className="h-[100px]" aria-hidden />

        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mx-auto max-w-[1320px] px-6 pt-4"
        >
          <ol className="flex items-center gap-2 font-inter text-[11px] font-light uppercase tracking-widest text-warm-gray">
            <li>
              <Link
                href="/"
                className="transition-colors hover:text-charcoal"
              >
                Home
              </Link>
            </li>
            <li aria-hidden style={{ color: SAGE_LABEL }}>
              /
            </li>
            <li style={{ color: SAGE }}>General Dentistry</li>
          </ol>
        </nav>

        {/* HEADER */}
        <section className="mx-auto max-w-[1320px] px-6 pt-8 pb-12 text-center sm:pt-12 sm:pb-16">
          <p
            className="font-inter text-[11px] font-light uppercase tracking-widest"
            style={{ color: SAGE }}
          >
            &mdash; general dentistry &mdash;
          </p>
          <h1 className="mt-5 font-serif text-[40px] leading-[1.05] text-charcoal sm:mt-6 sm:text-[64px] md:text-[80px]">
            Your foundation for a{" "}
            <span className="font-serif-italic">healthy life.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-[640px] font-inter text-[16px] font-light leading-[1.7] text-warm-gray sm:mt-8 sm:text-[18px]">
            Most dental problems are preventable. We see patients every six
            months not because it&rsquo;s routine &mdash; because it works.
            28 years of Bend smiles started with a cleaning.
          </p>
        </section>

        {/* INTRO */}
        <section className="mx-auto max-w-[1320px] px-6 pb-16 sm:pb-20">
          <div
            className="mx-auto max-w-[720px] border-t pt-12 sm:pt-14"
            style={{ borderColor: "rgba(28,26,23,0.18)" }}
          >
            <p className="font-inter text-[15px] font-light leading-[1.75] text-charcoal-soft sm:text-[16px]">
              At Living Dental Health, general dentistry is the foundation of
              everything we do. Dr. Engel takes the time to understand your
              full oral health picture before recommending any treatment. No
              upselling, no unnecessary procedures. Just honest, thorough
              care for patients 12 and up.
            </p>
          </div>
        </section>

        {/* SERVICE SECTIONS — alternating */}
        {SERVICES.map((s, i) => (
          <section
            key={s.id}
            id={s.id}
            className="mx-auto max-w-[1320px] scroll-mt-[120px] px-6 pb-20 sm:pb-24"
          >
            <div
              className="mx-auto max-w-[1100px] border-t pt-12 sm:pt-14"
              style={{ borderColor: "rgba(28,26,23,0.18)" }}
            >
              <div
                className={`flex flex-col gap-10 lg:items-center lg:gap-16 ${
                  i % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
                }`}
              >
                {/* Text column */}
                <div className="lg:flex-1">
                  <p
                    className="font-inter text-[11px] font-light uppercase tracking-widest"
                    style={{ color: SAGE }}
                  >
                    0{i + 1} &nbsp;/&nbsp; 05
                  </p>
                  <h2 className="mt-4 font-serif text-[32px] leading-[1.05] text-charcoal sm:text-[44px] md:text-[52px]">
                    {s.heading}
                  </h2>
                  <p className="mt-6 font-inter text-[15px] font-light leading-[1.75] text-charcoal-soft sm:text-[16px]">
                    {s.body}
                  </p>
                  <p className="mt-6 font-inter text-[13px] font-light uppercase tracking-[0.18em] text-warm-gray sm:text-[14px]">
                    {s.detail}
                  </p>
                </div>

                {/* Image placeholder column */}
                <div className="lg:flex-1">
                  <div
                    className="relative aspect-[4/3] w-full overflow-hidden border border-dashed bg-cream-deep"
                    style={{ borderColor: SAGE_LABEL }}
                  >
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
                      <p
                        className="font-inter text-[10px] font-light uppercase tracking-[0.32em]"
                        style={{ color: SAGE }}
                      >
                        Photo placeholder
                      </p>
                      <p className="max-w-[320px] font-serif-italic text-[14px] leading-[1.45] text-warm-gray">
                        {s.imageAlt}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* CTA */}
        <section className="mx-auto max-w-[1320px] px-6 pb-24 sm:pb-32">
          <div
            className="mx-auto max-w-[720px] border-t pt-14 text-center sm:pt-16"
            style={{ borderColor: "rgba(28,26,23,0.18)" }}
          >
            <h2 className="font-serif text-[32px] leading-[1.05] text-charcoal sm:text-[44px]">
              Ready to{" "}
              <span className="font-serif-italic">get started?</span>
            </h2>
            <p className="mx-auto mt-5 max-w-[460px] font-inter text-[15px] font-light leading-[1.7] text-warm-gray sm:text-[16px]">
              New patients are always welcome. Give us a call and we&rsquo;ll
              find a time that works.
            </p>
            <a
              href="tel:5415505311"
              className="mt-8 inline-block rounded-full px-7 py-3 font-inter text-[12px] uppercase tracking-[0.24em] transition-colors"
              style={{ backgroundColor: SAGE, color: "#F5F0E8" }}
            >
              Call (541) 550&#8209;5311
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
