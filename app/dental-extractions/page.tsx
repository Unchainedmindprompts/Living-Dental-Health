import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import {
  dentalExtractionsFaq,
  dentalExtractionsPageSchema,
  sanitizeJsonLd,
} from "@/lib/schema";

const SAGE = "#6B7C5C";
const SAGE_LABEL = "#9CAF88";

const PAGE_TITLE = "Dental Extractions in Bend, Oregon | Living Dental Health";
const PAGE_DESCRIPTION =
  "Dr. Andy Engel evaluates and performs dental extractions in Bend, Oregon when removal is clinically appropriate. Learn what to expect, when a tooth may need removal, and how post-operative care is handled.";
const HERO_IMAGE = "https://livingdentalhealth.com/fmr-hero.webp";
const HERO_IMAGE_ALT =
  "Dr. Andy Engel in conversation with a patient at Living Dental Health in Bend, Oregon";

export const metadata: Metadata = {
  alternates: { canonical: "/dental-extractions" },
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: "https://livingdentalhealth.com/dental-extractions",
    images: [
      {
        url: HERO_IMAGE,
        alt: HERO_IMAGE_ALT,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [HERO_IMAGE],
  },
};

const SECTIONS = [
  {
    id: "when-is-a-dental-extraction-needed",
    heading: "When is a dental extraction needed?",
    body:
      "Extraction may be considered when a tooth is severely damaged, fractured, infected, non-restorable, problematic, or otherwise cannot be predictably preserved. Removal is not automatically the first choice. Dr. Engel decides after an individual examination.",
    detail: "preserve when appropriate · remove when necessary · individual evaluation",
  },
  {
    id: "how-dr-engel-evaluates-a-tooth",
    heading: "How Dr. Engel evaluates a tooth before removal",
    body:
      "He reviews the condition of the tooth, the surrounding bone and tissues, symptoms, whether the tooth can be restored, signs of infection or disease, and neighboring teeth. Imaging is used when clinically appropriate. CBCT is a supporting 3D option when additional information would be useful.",
    detail: "tooth and surrounding tissues · restorability · imaging when appropriate",
    links: [
      {
        href: "/implants-surgery#cbct-imaging",
        label: "CBCT imaging at Living Dental Health →",
      },
    ],
  },
  {
    id: "what-happens-during-an-extraction",
    heading: "What happens during an extraction?",
    body:
      "When extraction is appropriate and can be handled in the office, Dr. Engel performs the procedure at Living Dental Health with local anesthesia. Not every case is treated in the office. Some complex situations may require a referral.",
    detail: "local anesthesia · in-office when appropriate · referral when needed",
  },
  {
    id: "what-happens-after-a-tooth-is-removed",
    heading: "What happens after a tooth is removed?",
    body:
      "Dr. Engel provides individualized post-operative instructions. Replacement options may be discussed depending on the tooth's location, function, your oral health, and your goals. An implant may be considered when appropriate; not every extraction leads to one.",
    detail: "individualized instructions · replacement when appropriate",
    links: [
      {
        href: "/patient-info/post-op",
        label: "Post-operative instructions →",
      },
      {
        href: "/dental-implants",
        label: "Dental implants →",
      },
    ],
  },
];

export default function DentalExtractionsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(sanitizeJsonLd(dentalExtractionsPageSchema)),
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
            <li style={{ color: SAGE }}>Dental Extractions</li>
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
                  &mdash; dental extractions &mdash;
                </p>
                <h1 className="mt-5 font-serif text-[36px] leading-[1.05] text-charcoal sm:text-[52px] lg:text-[60px]">
                  Dental Extractions in Bend, Oregon
                </h1>
                <p className="mx-auto mt-5 max-w-[560px] font-inter text-[15px] font-light leading-[1.7] text-charcoal-soft sm:text-[17px] lg:mx-0 lg:max-w-[440px]">
                  Dr. Engel evaluates and performs dental extractions at
                  Living Dental Health in Bend, Oregon when a tooth cannot
                  be predictably preserved or removal is otherwise
                  clinically appropriate. Care begins with an examination
                  and imaging when needed so he can determine whether
                  extraction, another treatment, or referral is the right
                  next step.
                </p>
                <Link
                  href="/contact"
                  className="mt-6 inline-block rounded-full px-7 py-3 font-inter text-[12px] uppercase tracking-[0.24em] transition-colors sm:mt-8"
                  style={{ backgroundColor: SAGE, color: "#F5F0E8" }}
                >
                  Request a Dental Extraction Evaluation
                </Link>
              </div>
            </div>
          </div>

          <div className="relative h-[380px] w-full overflow-hidden sm:h-[460px] lg:h-[55vh] lg:min-h-[560px] lg:max-h-[760px]">
            <Image
              src="/fmr-hero.webp"
              alt={HERO_IMAGE_ALT}
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
              Not every damaged tooth needs to be removed. Dr. Engel reviews
              the tooth, surrounding bone and tissues, symptoms, and whether
              it can be predictably preserved before discussing extraction,
              another treatment, or referral.
            </p>
            <p className="mt-6 font-inter text-[15px] font-light leading-[1.75] text-charcoal-soft sm:text-[16px]">
              Dr. Engel has practiced dentistry in Bend since 1998.{" "}
              <Link
                href="/about"
                className="underline underline-offset-4 transition-opacity hover:opacity-70"
                style={{ color: SAGE }}
              >
                Meet Dr. Engel →
              </Link>
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
                {"links" in s &&
                  s.links?.map((link) => (
                    <p key={link.href} className="mt-4">
                      <Link
                        href={link.href}
                        className="font-inter text-[14px] font-light underline underline-offset-4 transition-opacity hover:opacity-70 sm:text-[15px]"
                        style={{ color: SAGE }}
                      >
                        {link.label}
                      </Link>
                    </p>
                  ))}
                <p className="mt-5 font-inter text-[12px] font-light uppercase tracking-[0.18em] text-warm-gray sm:text-[13px]">
                  {s.detail}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* RELATED */}
        <section className="mx-auto max-w-[1320px] px-6 pb-20 sm:pb-24">
          <div
            className="mx-auto max-w-[720px] border-t pt-12 sm:pt-14"
            style={{ borderColor: "rgba(28,26,23,0.18)" }}
          >
            <h2 className="font-serif text-[28px] leading-[1.05] text-charcoal sm:text-[36px]">
              Related{" "}
              <span className="font-serif-italic">care</span>
            </h2>
            <p className="mt-6 font-inter text-[15px] font-light leading-[1.75] text-charcoal-soft sm:text-[16px]">
              A missing tooth may sometimes be replaced with a dental
              implant when appropriate.{" "}
              <Link
                href="/dental-implants"
                className="underline underline-offset-4 transition-opacity hover:opacity-70"
                style={{ color: SAGE }}
              >
                Dental implants →
              </Link>
            </p>
            <p className="mt-5 font-inter text-[15px] font-light leading-[1.75] text-charcoal-soft sm:text-[16px]">
              Wisdom teeth are one specific type of dental extraction.{" "}
              <Link
                href="/wisdom-teeth-removal"
                className="underline underline-offset-4 transition-opacity hover:opacity-70"
                style={{ color: SAGE }}
              >
                Wisdom teeth removal →
              </Link>
            </p>
            <p className="mt-5 font-inter text-[15px] font-light leading-[1.75] text-charcoal-soft sm:text-[16px]">
              Three-dimensional imaging may support planning when it is
              clinically appropriate.{" "}
              <Link
                href="/implants-surgery#cbct-imaging"
                className="underline underline-offset-4 transition-opacity hover:opacity-70"
                style={{ color: SAGE }}
              >
                CBCT imaging →
              </Link>
            </p>
            <p className="mt-5 font-inter text-[15px] font-light leading-[1.75] text-charcoal-soft sm:text-[16px]">
              Extractions are part of the broader surgical care offered at
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
              {dentalExtractionsFaq.map((item) => (
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
              <span className="font-serif-italic">tooth</span>
            </h2>
            <p className="mx-auto mt-5 max-w-[480px] font-inter text-[15px] font-light leading-[1.75] text-warm-gray sm:text-[16px]">
              Request an evaluation so Dr. Engel can determine whether the
              tooth can be preserved, should be removed, or whether another
              treatment or referral may be more appropriate.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-block rounded-full px-7 py-3 font-inter text-[12px] uppercase tracking-[0.24em] transition-colors"
                style={{ backgroundColor: SAGE, color: "#F5F0E8" }}
              >
                Request a Dental Extraction Evaluation
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
