import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import { implantsSurgeryPageSchema, sanitizeJsonLd } from "@/lib/schema";

const SAGE = "#6B7C5C";
const SAGE_LABEL = "#9CAF88";

export const metadata: Metadata = {
  title: "Implants & Oral Surgery — Living Dental Health, Bend",
  description:
    "Dental implants, bone and tissue grafting, wisdom teeth, and in-house CBCT 3D imaging in Bend, Oregon with Dr. Andy Engel. Surgical work handled in-house.",
};

const SERVICES = [
  {
    id: "implants",
    heading: "Dental Implants",
    body:
      "A dental implant is the closest thing dentistry has to a natural tooth. A titanium post is placed directly into the jawbone, fuses with the bone over time, and supports a custom crown that looks and functions like the real thing. Dr. Engel places and restores implants entirely in-house — from the initial consultation through the final crown. Single tooth or full arch, the process stays with one doctor who knows your case.",
    detail:
      "single → full arch · placed and restored in-house · titanium post · custom crown",
    image: "/surgery-implants.webp",
    imageAlt:
      "Patient smiling after dental implant at Living Dental Health Bend Oregon",
  },
  {
    id: "bone-grafting",
    heading: "Bone & Tissue Grafting",
    body:
      "Successful implants require adequate bone density. When bone loss has occurred — through tooth loss, gum disease, or time — grafting rebuilds the foundation before implant placement. Unlike most general dentists in Central Oregon, Dr. Engel performs bone and tissue grafting himself. No separate specialist, no additional referral, no starting over with someone who doesn’t know your history.",
    detail:
      "in-house · implant prep · bone and tissue · advanced training OHSU",
    image: "/surgery-bone-grafting.webp",
    imageAlt:
      "Dr. Andy Engel performing bone grafting procedure at Living Dental Health Bend Oregon",
  },
  {
    id: "wisdom-teeth",
    heading: "Wisdom Teeth",
    body:
      "Wisdom teeth removal is one of the most common surgical procedures Dr. Engel performs. Whether one tooth or all four, impacted or straightforward, extractions are handled in-office under local anesthesia. Patients are seen promptly and given clear post-op instructions so recovery is as smooth as possible.",
    detail:
      "local anesthesia · single or all four · impacted and straightforward · post-op care included",
    image: "/surgery-wisdom-teeth.webp",
    imageAlt:
      "Dental team member welcoming patient at Living Dental Health Bend Oregon",
  },
  {
    id: "extractions",
    heading: "Dental Extractions",
    body:
      "When a tooth cannot be saved, removal is sometimes the healthiest option. Dr. Engel performs extractions with the same care and precision as any procedure in his practice — and always discusses replacement options, including implants, at the time of extraction so patients leave with a clear plan forward.",
    detail:
      "gentle technique · same-day planning · implant discussion included · local anesthesia",
    image: "/surgery-extractions.webp",
    imageAlt:
      "Dr. Andy Engel consulting with patient at Living Dental Health Bend Oregon",
  },
  {
    id: "cbct-imaging",
    heading: "CBCT 3D Imaging",
    body:
      "Most general dentists rely on two-dimensional panoramic X-rays and refer patients out for 3D imaging. Living Dental Health performs cone-beam CT (CBCT) in-house — a true three-dimensional view of the teeth, jaw, sinuses, and surrounding structures. CBCT lets Dr. Engel plan implant placement to the millimeter, evaluate bone density before grafting, locate impacted wisdom teeth precisely, and catch problems a flat image would miss. Same visit, no second appointment, no referral.",
    detail:
      "in-house 3D imaging · implant planning to the millimeter · used for grafting and wisdom teeth · most dentists refer out",
    image: "/surgery-implants.webp",
    imageAlt:
      "CBCT 3D dental imaging at Living Dental Health Bend Oregon",
  },
];

const FAQ = [
  {
    q: "Does Dr. Andy Engel place dental implants in-house?",
    a: "Yes. Dr. Engel places and restores dental implants entirely in-house at Living Dental Health in Bend, Oregon — from the initial CBCT scan and planning through implant placement and the final crown. Patients are not referred to an outside oral surgeon.",
  },
  {
    q: "What is CBCT 3D imaging and why does it matter for dental implants?",
    a: "Cone-beam computed tomography (CBCT) produces a true three-dimensional image of the teeth, jaw, sinuses, and surrounding structures. CBCT lets Dr. Engel plan implant placement to the millimeter, evaluate bone density before grafting, and locate impacted wisdom teeth precisely. Most general dentists in Central Oregon refer patients out for CBCT; Living Dental Health performs it in-house.",
  },
  {
    q: "Does Living Dental Health perform bone and tissue grafting?",
    a: "Yes. Dr. Engel performs bone and tissue grafting in-house. Grafting is often required before an implant can be placed in an area that has lost bone density due to tooth loss, gum disease, or time.",
  },
  {
    q: "Are wisdom teeth extractions handled in the office?",
    a: "Yes. Wisdom teeth removal — one tooth or all four, impacted or straightforward — is one of the most common surgical procedures performed at Living Dental Health, handled in-office under local anesthesia. Patients are seen promptly and given clear post-op care instructions.",
  },
  {
    q: "Will I be referred to an outside specialist for surgery?",
    a: "Most of the surgical work general dentists refer out — implants, bone grafting, tissue grafting, extractions, wisdom teeth — Dr. Engel performs in-house. The exception is endodontics (root canals), which are referred to a trusted endodontist in Bend.",
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
                  &mdash; implants &amp; surgery &mdash;
                </p>
                <h1 className="mt-5 font-serif text-[36px] leading-[1.05] text-charcoal sm:text-[52px] lg:text-[60px]">
                  Surgical work, in-house.{" "}
                  <span className="font-serif-italic">
                    One dentist, one roof.
                  </span>
                </h1>
                <p className="mx-auto mt-5 max-w-[560px] font-inter text-[15px] font-light leading-[1.7] text-charcoal-soft sm:text-[17px] lg:mx-0 lg:max-w-[440px]">
                  Most general dentists send you to an oral surgeon. Dr. Engel
                  does it himself — implants, extractions, wisdom teeth, and
                  bone and tissue grafting. One dentist, one relationship, one
                  roof.
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
            {/* left scrim — keeps the charcoal headline legible over the
                bright wall (desktop only) */}
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
              Dr. Andrew Engel completed advanced surgical training at Oregon
              Health Sciences University specifically in oral surgery and full
              mouth reconstruction. In 28 years of practice in Bend, he has
              built a surgical skill set that most general dentists simply
              don&rsquo;t have — which means his patients rarely get handed
              off to a stranger for the hard part.
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
