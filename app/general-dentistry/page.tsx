import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import { generalDentistryPageSchema, sanitizeJsonLd } from "@/lib/schema";

const SAGE = "#6B7C5C";
const SAGE_LABEL = "#9CAF88";

export const metadata: Metadata = {
  title: "General Dentistry — Living Dental Health, Bend Oregon",
  description:
    "Cleanings, exams, fillings, crowns, and bridges in Bend, Oregon. Foundational care from Dr. Andy Engel with in-house digital X-rays and 3D CBCT imaging.",
};

const SERVICES = [
  {
    id: "cleanings",
    heading: "Cleanings & Exams",
    body:
      "A professional cleaning does what brushing and flossing can’t — remove built-up tartar, check for early signs of decay, and give Dr. Engel a chance to catch small problems before they become expensive ones. We recommend visits every six months. Most appointments run about 60 minutes. Digital X-rays and, when needed, in-house 3D CBCT imaging mean we can catch what flat X-rays would miss — without sending you to a separate imaging center.",
    detail: "60 min · digital x-rays + 3D CBCT in-house · ages 12 and up",
    image: "/patient-cleanings.webp",
    imageAlt:
      "Patient smiling after dental cleaning at Living Dental Health Bend Oregon",
  },
  {
    id: "fillings",
    heading: "Dental Fillings",
    body:
      "When decay happens, tooth-colored composite fillings restore the tooth to full function without the silver. They bond directly to the tooth structure, look natural, and are completed in a single visit.",
    detail: "tooth-colored composite · single visit · no metal",
    image: "/patient-fillings.webp",
    imageAlt:
      "Man smiling after dental filling at Living Dental Health Bend Oregon",
  },
  {
    id: "crowns",
    heading: "Dental Crowns",
    body:
      "A crown fully covers a damaged or weakened tooth, restoring its shape, strength, and appearance. Dr. Engel uses crowns to protect teeth after root canals, repair cracked teeth, or anchor a dental bridge. Custom-fitted and natural looking.",
    detail:
      "porcelain or ceramic · custom fitted · protects and restores",
    image: "/patient-crowns.webp",
    imageAlt:
      "Woman smiling after dental crown at Living Dental Health Bend Oregon",
  },
  {
    id: "bridges",
    heading: "Dental Bridges",
    body:
      "A bridge fills the gap left by a missing tooth using the surrounding teeth as anchors. It restores your bite, prevents neighboring teeth from shifting, and looks completely natural. A reliable, non-surgical option for tooth replacement.",
    detail:
      "fixed restoration · natural appearance · prevents shifting",
    image: "/patient-bridges.webp",
    imageAlt:
      "Man smiling after dental bridge at Living Dental Health Bend Oregon",
  },
  {
    id: "dentures",
    heading: "Dentures",
    body:
      "Whether you need a full or partial denture, Dr. Engel custom fits every appliance to your mouth for comfort and function. We also work with implant-supported dentures for patients who want a more permanent solution.",
    detail:
      "full and partial · implant-supported options · custom fitted",
    image: "/patient-dentures.webp",
    imageAlt:
      "Woman smiling after dentures at Living Dental Health Bend Oregon",
  },
];

const FAQ = [
  {
    q: "How often should I get a dental cleaning and exam at Living Dental Health?",
    a: "We recommend a professional cleaning and exam every six months. Most appointments run about 60 minutes and include a routine oral cancer screening at no extra cost.",
  },
  {
    q: "Does Living Dental Health offer digital X-rays and 3D CBCT imaging in-house?",
    a: "Yes. Digital X-rays are taken on-site for every routine exam. For more complex cases, Dr. Engel uses in-house cone-beam CT (CBCT) — a true three-dimensional scan of the teeth, jaw, and sinuses — without referring patients to an outside imaging center.",
  },
  {
    q: "Are tooth-colored fillings safe and how long do they last?",
    a: "Tooth-colored composite fillings are safe, contain no mercury, and bond directly to the tooth structure. With normal care, composite fillings typically last 7 to 10 years or longer.",
  },
  {
    q: "Is Dr. Andy Engel accepting new patients in Bend, Oregon?",
    a: "Yes. Living Dental Health is accepting new patients ages 12 and up. Call (541) 550-5311 to schedule a first visit.",
  },
  {
    q: "What ages do you treat at Living Dental Health?",
    a: "Living Dental Health serves patients ages 12 and up — teens, adults, families, and longtime patients alike. Younger children are referred to a pediatric dentist for age-appropriate care.",
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

        {/* HERO — headline overlaid on the photo's negative space (desktop),
            stacked above the photo (mobile). Single H1, repositioned by CSS. */}
        <div className="relative">
          <div className="px-6 pt-6 pb-10 text-center lg:absolute lg:inset-0 lg:z-10 lg:flex lg:items-center lg:py-0 lg:text-left">
            <div className="mx-auto w-full max-w-[1320px] lg:px-6">
              <div className="lg:max-w-[540px]">
                <p
                  className="font-inter text-[11px] font-light uppercase tracking-widest"
                  style={{ color: SAGE }}
                >
                  &mdash; general dentistry &mdash;
                </p>
                <h1 className="mt-5 font-serif text-[40px] leading-[1.05] text-charcoal sm:text-[56px] lg:text-[64px]">
                  Your foundation for a{" "}
                  <span className="font-serif-italic">healthy life.</span>
                </h1>
                <p className="mx-auto mt-5 max-w-[560px] font-inter text-[15px] font-light leading-[1.7] text-warm-gray sm:text-[17px] lg:mx-0 lg:max-w-[440px]">
                  Most dental problems are preventable. We see patients every
                  six months not because it&rsquo;s routine &mdash; because it
                  works. 28 years of Bend smiles started with a cleaning.
                </p>
              </div>
            </div>
          </div>

          <div className="relative h-[380px] w-full overflow-hidden sm:h-[460px] lg:h-[55vh] lg:min-h-[560px] lg:max-h-[760px]">
            <Image
              src="/general-hero.webp"
              alt="A dental team member welcoming a patient at Living Dental Health in Bend, Oregon"
              fill
              priority
              sizes="100vw"
              className="object-cover object-[74%_center] lg:object-center"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 hidden lg:block"
              style={{
                background:
                  "linear-gradient(to right, rgba(245,240,232,0.94) 0%, rgba(245,240,232,0.74) 32%, rgba(245,240,232,0) 58%)",
              }}
            />
          </div>
        </div>

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

        {/* SERVICE SECTIONS — 2-up mocha panel grid */}
        <section className="mx-auto max-w-[1320px] px-6 pb-20 sm:pb-24">
          <div className="mx-auto grid max-w-[1100px] gap-4 sm:gap-6 md:grid-cols-2">
            {SERVICES.map((s, i) => (
              <article
                key={s.id}
                id={s.id}
                className="rounded-xl px-6 py-8 scroll-mt-[120px] sm:px-8 sm:py-10"
                style={{ backgroundColor: "#EAE0CF" }}
              >
                <p
                  className="font-inter text-[11px] font-light uppercase tracking-widest"
                  style={{ color: SAGE }}
                >
                  0{i + 1} &nbsp;/&nbsp; 05
                </p>
                <h2 className="mt-3 font-serif text-[26px] leading-[1.1] text-charcoal sm:text-[30px] md:text-[34px]">
                  {s.heading}
                </h2>
                <p className="mt-4 font-inter text-[14px] font-light leading-[1.7] text-charcoal-soft sm:text-[15px]">
                  {s.body}
                </p>
                <p className="mt-5 font-inter text-[12px] font-light uppercase tracking-[0.18em] text-warm-gray sm:text-[13px]">
                  {s.detail}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* SECONDARY IMAGE */}
        <section className="mx-auto max-w-[1320px] px-6 pb-20 sm:pb-24">
          <div className="relative h-[360px] w-full overflow-hidden rounded-xl bg-cream-deep">
            <Image
              src="/general-secondary.webp"
              alt="Friends laughing together outside, enjoying healthy active lives in Central Oregon"
              fill
              sizes="(min-width: 1320px) 1320px, 100vw"
              className="object-cover object-center"
            />
          </div>
        </section>

        {/* FAQ — visible, mirrors FAQPage schema */}
        <section className="mx-auto max-w-[1320px] px-6 pb-20 sm:pb-24">
          <div
            className="mx-auto max-w-[820px] border-t pt-12 sm:pt-14"
            style={{ borderColor: "rgba(28,26,23,0.18)" }}
          >
            <h2 className="font-serif text-[28px] leading-[1.05] text-charcoal sm:text-[36px]">
              Common <span className="font-serif-italic">questions</span>
            </h2>
            <dl className="mt-8 space-y-8">
              {FAQ.map((item) => (
                <div
                  key={item.q}
                  className="border-b pb-8"
                  style={{ borderColor: "rgba(28,26,23,0.1)" }}
                >
                  <dt className="font-serif-italic text-[20px] leading-snug text-charcoal sm:text-[22px]">
                    {item.q}
                  </dt>
                  <dd className="mt-3 font-inter text-[15px] font-light leading-[1.75] text-charcoal-soft sm:text-[16px]">
                    {item.a}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

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
