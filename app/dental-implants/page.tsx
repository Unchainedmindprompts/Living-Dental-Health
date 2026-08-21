import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import {
  dentalImplantsFaq,
  dentalImplantsPageSchema,
  sanitizeJsonLd,
} from "@/lib/schema";

const SAGE = "#6B7C5C";
const SAGE_LABEL = "#9CAF88";

export const metadata: Metadata = {
  alternates: { canonical: "/dental-implants" },
  title: "Dental Implants in Bend, Oregon | Living Dental Health",
  description:
    "Dr. Andy Engel plans, places, and restores dental implants at Living Dental Health in Bend, Oregon — from consultation and imaging through the final restoration.",
};

const SECTIONS = [
  {
    id: "what-is-a-dental-implant",
    heading: "What a dental implant is",
    body:
      "A dental implant replaces a missing tooth in three parts that work together. A titanium post is placed in the jawbone as an artificial root. As the area heals, the bone and implant integrate. A custom restoration — typically a crown — is then attached so the tooth can look and function as part of your smile. An implant is not the right treatment for every patient or every situation.",
    detail: "implant post · healing and integration · custom restoration",
  },
  {
    id: "when-implants-may-be-considered",
    heading: "When implants may be considered",
    body:
      "Implants may be considered for a missing tooth, a tooth that cannot predictably be saved, several missing teeth, or as part of planning a larger reconstruction. Whether an implant is appropriate is determined after an individual examination of your teeth, bone, and oral health — not from a web page.",
    detail:
      "missing tooth · unsavable tooth · multiple teeth · reconstruction planning",
  },
  {
    id: "treatment-process",
    heading: "The treatment process",
    body:
      "Care typically begins with a consultation and examination. CBCT imaging is used when it is clinically appropriate. Dr. Engel then builds a treatment plan, places the implant, allows time for healing, and completes the final restoration. Healing time and the details of each step depend on the individual case. This page does not quote a single timeline, success rate, or fee.",
    detail:
      "consult · CBCT when appropriate · planning · placement · healing · restoration",
  },
  {
    id: "continuity-of-care",
    heading: "Continuity of care",
    body:
      "Dr. Engel handles implant planning, placement, and restoration within Living Dental Health. The dentist who examines you is the dentist who plans the case and restores it. Some situations may still involve additional care or a referral when that is in the patient's best interest.",
    detail: "planned · placed · restored at Living Dental Health",
  },
];

const WHEN_CONSIDERED = [
  "A missing tooth.",
  "A tooth that cannot predictably be saved.",
  "Multiple missing teeth.",
  "Treatment planning involving a larger reconstruction.",
];

const PROCESS = [
  "Consultation and examination.",
  "CBCT imaging when clinically appropriate.",
  "Treatment planning.",
  "Implant placement.",
  "Healing.",
  "Final restoration.",
];

export default function DentalImplantsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(sanitizeJsonLd(dentalImplantsPageSchema)),
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
          <ol className="flex flex-wrap items-center gap-2 font-inter text-[11px] font-light uppercase tracking-widest text-warm-gray">
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
            <li>
              <Link
                href="/implants-surgery"
                className="transition-colors hover:text-charcoal"
              >
                Implants &amp; Surgery
              </Link>
            </li>
            <li aria-hidden style={{ color: SAGE_LABEL }}>
              /
            </li>
            <li style={{ color: SAGE }}>Dental Implants</li>
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
                  &mdash; dental implants &mdash;
                </p>
                <h1 className="mt-5 font-serif text-[36px] leading-[1.05] text-charcoal sm:text-[52px] lg:text-[60px]">
                  Dental Implants in Bend, Oregon
                </h1>
                <p className="mx-auto mt-5 max-w-[560px] font-inter text-[15px] font-light leading-[1.7] text-charcoal-soft sm:text-[17px] lg:mx-0 lg:max-w-[440px]">
                  Dr. Engel plans, places, and restores dental implants
                  in-house at Living Dental Health. From the first examination
                  through the final restoration, implant care stays with one
                  dentist who knows your case.
                </p>
              </div>
            </div>
          </div>

          <div className="relative h-[380px] w-full overflow-hidden sm:h-[460px] lg:h-[55vh] lg:min-h-[560px] lg:max-h-[760px]">
            <Image
              src="/implants-hero.webp"
              alt="Dr. Andy Engel performing a procedure with loupes on a patient at Living Dental Health in Bend, Oregon"
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
              Dental implant treatment at Living Dental Health is planned
              around your mouth, not a standard package. Dr. Engel reviews
              whether an implant is appropriate, what imaging is useful, and
              how the restoration should be designed before any surgical step
              begins.
            </p>
          </div>
        </section>

        {/* SERVICE SECTIONS — 2-up mocha panel grid */}
        <section className="mx-auto max-w-[1320px] px-6 pb-20 sm:pb-24">
          <div className="mx-auto grid max-w-[1100px] gap-4 sm:gap-6 md:grid-cols-2">
            {SECTIONS.map((s, i) => (
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
                  0{i + 1} &nbsp;/&nbsp; 0{SECTIONS.length}
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

        {/* WHEN CONSIDERED — scannable list matching other service pages */}
        <section className="mx-auto max-w-[1320px] px-6 pb-20 sm:pb-24">
          <div
            className="mx-auto max-w-[1100px] border-t pt-12 sm:pt-14"
            style={{ borderColor: "rgba(28,26,23,0.18)" }}
          >
            <h2 className="font-serif text-[32px] leading-[1.05] text-charcoal sm:text-[44px]">
              Situations we{" "}
              <span className="font-serif-italic">evaluate</span>
            </h2>
            <p className="mt-6 max-w-[720px] font-inter text-[15px] font-light leading-[1.75] text-charcoal-soft sm:text-[16px]">
              These are common reasons patients ask about implants. Suitability
              is determined after an individual examination.
            </p>
            <ul className="mt-8 grid gap-x-12 gap-y-4 sm:grid-cols-2">
              {WHEN_CONSIDERED.map((c) => (
                <li
                  key={c}
                  className="flex items-baseline gap-3 border-b pb-4 font-inter text-[15px] font-light text-charcoal-soft sm:text-[16px]"
                  style={{ borderColor: "rgba(28,26,23,0.1)" }}
                >
                  <span
                    aria-hidden
                    className="text-[12px]"
                    style={{ color: SAGE }}
                  >
                    ✦
                  </span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* PROCESS STEPS */}
        <section className="mx-auto max-w-[1320px] px-6 pb-20 sm:pb-24">
          <div
            className="mx-auto max-w-[1100px] border-t pt-12 sm:pt-14"
            style={{ borderColor: "rgba(28,26,23,0.18)" }}
          >
            <h2 className="font-serif text-[32px] leading-[1.05] text-charcoal sm:text-[44px]">
              How treatment{" "}
              <span className="font-serif-italic">typically proceeds</span>
            </h2>
            <ol className="mt-8 grid gap-x-12 gap-y-4 sm:grid-cols-2">
              {PROCESS.map((step, i) => (
                <li
                  key={step}
                  className="flex items-baseline gap-3 border-b pb-4 font-inter text-[15px] font-light text-charcoal-soft sm:text-[16px]"
                  style={{ borderColor: "rgba(28,26,23,0.1)" }}
                >
                  <span
                    className="font-inter text-[11px] uppercase tracking-widest"
                    style={{ color: SAGE }}
                  >
                    0{i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* RELATED — bone grafting + hub */}
        <section className="mx-auto max-w-[1320px] px-6 pb-20 sm:pb-24">
          <div
            className="mx-auto max-w-[720px] border-t pt-12 sm:pt-14"
            style={{ borderColor: "rgba(28,26,23,0.18)" }}
          >
            <h2 className="font-serif text-[28px] leading-[1.05] text-charcoal sm:text-[36px]">
              Related{" "}
              <span className="font-serif-italic">treatment</span>
            </h2>
            <p className="mt-6 font-inter text-[15px] font-light leading-[1.75] text-charcoal-soft sm:text-[16px]">
              When there is not enough bone to support an implant, bone
              grafting may be recommended first. Dr. Engel evaluates this
              during planning.{" "}
              <Link
                href="/implants-surgery#bone-grafting"
                className="underline underline-offset-4 transition-opacity hover:opacity-70"
                style={{ color: SAGE }}
              >
                Bone &amp; tissue grafting details →
              </Link>
            </p>
            <p className="mt-5 font-inter text-[15px] font-light leading-[1.75] text-charcoal-soft sm:text-[16px]">
              Dental implants are one part of the surgical care offered at
              Living Dental Health.{" "}
              <Link
                href="/implants-surgery"
                className="underline underline-offset-4 transition-opacity hover:opacity-70"
                style={{ color: SAGE }}
              >
                Implants &amp; Surgery →
              </Link>
            </p>
          </div>
        </section>

        {/* SECONDARY IMAGE */}
        <section className="mx-auto max-w-[1320px] px-6 pb-20 sm:pb-24">
          <div className="relative h-[360px] w-full overflow-hidden rounded-xl bg-cream-deep">
            <Image
              src="/implants-secondary.webp"
              alt="Patient enjoying life with a restored smile after implant and surgical care at Living Dental Health in Bend, Oregon"
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
              {dentalImplantsFaq.map((item) => (
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
              Discuss your{" "}
              <span className="font-serif-italic">implant options</span>
            </h2>
            <p className="mx-auto mt-5 max-w-[480px] font-inter text-[15px] font-light leading-[1.7] text-warm-gray sm:text-[16px]">
              Contact Living Dental Health to talk through whether an implant
              is appropriate for your situation. A submitted message is a
              request, not a booked appointment.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-block rounded-full px-7 py-3 font-inter text-[12px] uppercase tracking-[0.24em] transition-colors"
                style={{ backgroundColor: SAGE, color: "#F5F0E8" }}
              >
                Contact us
              </Link>
              <a
                href="tel:5415505311"
                className="inline-block rounded-full px-7 py-3 font-inter text-[12px] uppercase tracking-[0.24em] transition-colors"
                style={{
                  backgroundColor: "transparent",
                  color: SAGE,
                  boxShadow: `inset 0 0 0 1px ${SAGE}`,
                }}
              >
                Call (541) 550&#8209;5311
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
