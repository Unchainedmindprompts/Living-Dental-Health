import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import { implantsSurgeryPageSchema, sanitizeJsonLd } from "@/lib/schema";

const SAGE = "#6B7C5C";
const SAGE_LABEL = "#9CAF88";

export const metadata: Metadata = {
  title: "Implants & Oral Surgery — Living Dental Health, Bend Oregon",
  description:
    "Dental implants, bone and tissue grafting, wisdom teeth, and extractions — all performed in-house by Dr. Andy Engel in Bend, Oregon. Advanced surgical training, no referrals to outside specialists.",
};

const SERVICES = [
  {
    id: "implants",
    heading: "Dental Implants",
    body:
      "A dental implant is the closest thing dentistry has to a natural tooth. A titanium post is placed directly into the jawbone, fuses with the bone over time, and supports a custom crown that looks and functions like the real thing. Dr. Engel places and restores implants entirely in-house — from the initial consultation through the final crown. Single tooth or full arch, the process stays with one doctor who knows your case.",
    detail:
      "single → full arch · placed and restored in-house · titanium post · custom crown",
    imageAlt:
      "Patient smiling after dental implant treatment at Living Dental Health Bend Oregon",
  },
  {
    id: "bone-grafting",
    heading: "Bone & Tissue Grafting",
    body:
      "Successful implants require adequate bone density. When bone loss has occurred — through tooth loss, gum disease, or time — grafting rebuilds the foundation before implant placement. Unlike most general dentists in Central Oregon, Dr. Engel performs bone and tissue grafting himself. No separate specialist, no additional referral, no starting over with someone who doesn’t know your history.",
    detail:
      "in-house · implant prep · bone and tissue · advanced training OHSU",
    imageAlt:
      "Patient consultation about bone and tissue grafting at Living Dental Health Bend Oregon",
  },
  {
    id: "wisdom-teeth",
    heading: "Wisdom Teeth",
    body:
      "Wisdom teeth removal is one of the most common surgical procedures Dr. Engel performs. Whether one tooth or all four, impacted or straightforward, extractions are handled in-office under local anesthesia. Patients are seen promptly and given clear post-op instructions so recovery is as smooth as possible.",
    detail:
      "local anesthesia · single or all four · impacted and straightforward · post-op care included",
    imageAlt:
      "Patient after wisdom teeth removal at Living Dental Health Bend Oregon",
  },
  {
    id: "extractions",
    heading: "Dental Extractions",
    body:
      "When a tooth cannot be saved, removal is sometimes the healthiest option. Dr. Engel performs extractions with the same care and precision as any procedure in his practice — and always discusses replacement options, including implants, at the time of extraction so patients leave with a clear plan forward.",
    detail:
      "gentle technique · same-day planning · implant discussion included · local anesthesia",
    imageAlt:
      "Patient smiling after a dental extraction at Living Dental Health Bend Oregon",
  },
];

export default function ImplantsSurgeryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(sanitizeJsonLd(implantsSurgeryPageSchema)),
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
            <li style={{ color: SAGE }}>Implants &amp; Surgery</li>
          </ol>
        </nav>

        {/* HEADER */}
        <section className="mx-auto max-w-[1320px] px-6 pt-8 pb-12 text-center sm:pt-12 sm:pb-16">
          <p
            className="font-inter text-[11px] font-light uppercase tracking-widest"
            style={{ color: SAGE }}
          >
            &mdash; implants &amp; surgery &mdash;
          </p>
          <h1 className="mt-5 font-serif text-[36px] leading-[1.05] text-charcoal sm:mt-6 sm:text-[58px] md:text-[72px]">
            Everything in-house.{" "}
            <span className="font-serif-italic">Nothing referred out.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-[660px] font-inter text-[16px] font-light leading-[1.7] text-warm-gray sm:mt-8 sm:text-[18px]">
            Most general dentists send you to an oral surgeon. Dr. Engel does
            it himself — implants, extractions, wisdom teeth, and bone and
            tissue grafting. One dentist, one relationship, one roof.
          </p>
        </section>

        {/* INTRO */}
        <section className="mx-auto max-w-[1320px] px-6 pb-16 sm:pb-20">
          <div
            className="mx-auto max-w-[720px] border-t pt-12 sm:pt-14"
            style={{ borderColor: "rgba(28,26,23,0.18)" }}
          >
            <p className="font-inter text-[15px] font-light leading-[1.75] text-charcoal-soft sm:text-[16px]">
              Dr. Andrew Engel completed advanced surgical training at Oregon
              Health Sciences University specifically in oral surgery and full
              mouth reconstruction. In 28 years of practice in Bend, he has
              built a surgical skill set that most general dentists simply
              don&rsquo;t have — which means his patients never get handed off
              to a stranger for the hard part.
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
                    0{i + 1} &nbsp;/&nbsp; 04
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
                    className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-dashed bg-cream-deep"
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
              Have questions about{" "}
              <span className="font-serif-italic">implants?</span>
            </h2>
            <p className="mx-auto mt-5 max-w-[480px] font-inter text-[15px] font-light leading-[1.7] text-warm-gray sm:text-[16px]">
              The best next step is a conversation. Call us and Dr. Engel will
              walk you through your options personally — no pressure, no hard
              sell.
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
