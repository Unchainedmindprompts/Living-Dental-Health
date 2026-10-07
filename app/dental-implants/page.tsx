import CareEvidence from "@/components/CareEvidence";
import { withCareEvidence } from "@/lib/schema";
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

const PAGE_TITLE = "Dental Implants in Bend, Oregon | Living Dental Health";
const PAGE_DESCRIPTION =
  "Dr. Andy Engel plans, places, and restores dental implants at Living Dental Health in Bend, Oregon — from consultation and imaging through the final restoration.";

export const metadata: Metadata = {
  alternates: { canonical: "/dental-implants" },
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: "https://livingdentalhealth.com/dental-implants",
    images: [
      {
        url: "https://livingdentalhealth.com/implants-hero.webp",
        alt: "Dr. Andy Engel providing dental implant care at Living Dental Health in Bend, Oregon",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ["https://livingdentalhealth.com/implants-hero.webp"],
  },
};

const SECTIONS = [
  {
    id: "what-is-a-dental-implant",
    heading: "What a dental implant is",
    body:
      "A dental implant replaces the root portion of a missing tooth. A titanium post is placed in the jawbone and allowed to integrate as the area heals. After healing, a custom restoration — typically a crown for a single missing tooth — is attached to restore appearance and function. An implant is not appropriate for every patient or situation.",
    detail: "implant post · healing and integration · custom restoration",
  },
  {
    id: "when-implants-may-be-considered",
    heading: "When implants may be considered",
    body:
      "Implants may be considered for a missing tooth, a tooth that cannot predictably be saved, several missing teeth, or as part of planning a larger reconstruction. Dr. Engel considers your remaining teeth, bone support, gum health, and medical history. Your priorities, healing needs, timeline, and budget also matter when comparing an implant with a bridge or another option.",
    detail:
      "missing tooth · unsavable tooth · multiple teeth · reconstruction planning",
  },
  {
    id: "treatment-process",
    heading: "Plan the implant and the tooth together",
    body:
      "The final tooth is part of the plan from the beginning. Dr. Engel evaluates the site and uses CBCT imaging when clinically appropriate to assess bone and nearby structures. His planning approach includes impressions and a surgical guide to plan the position of the implant and future crown. Ask how these planning steps apply to your case.",
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

export default function DentalImplantsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(sanitizeJsonLd(withCareEvidence(dentalImplantsPageSchema, "implants"))),
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
                  A missing tooth can leave you with a lot of questions.
                  Dr. Andy Engel helps you understand your options, then plans,
                  places, and restores dental implants at Living Dental Health
                  when an implant is right for your mouth.
                </p>
                <Link
                  href="/contact"
                  className="mt-6 inline-block rounded-full px-7 py-3 font-inter text-[12px] uppercase tracking-[0.24em] transition-colors sm:mt-8"
                  style={{ backgroundColor: SAGE, color: "#F5F0E8" }}
                >
                  Request an Implant Consultation
                </Link>
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
                <p className="mt-5 font-inter text-[12px] font-light uppercase tracking-[0.18em] text-warm-gray sm:text-[13px]">
                  {s.detail}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-[1100px] px-6 pb-16 sm:pb-20" aria-labelledby="implant-stages">
          <p className="font-inter text-[11px] uppercase tracking-widest text-sage">Know what comes next</p>
          <h2 id="implant-stages" className="mt-3 font-serif text-[32px] leading-tight sm:text-[44px]">From placement to your final tooth</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="font-serif text-[25px]">Prepare for the surgical visit</h3>
              <p className="mt-3 font-inter text-[15px] font-light leading-[1.75] text-charcoal-soft">Your plan identifies whether a tooth needs removal or a bone graft is needed, and when those steps fit. Neither applies to every patient. Before placement, discuss anesthesia, any anxiety about treatment, and the recovery instructions for your procedure.</p>
            </div>
            <div>
              <h3 className="font-serif text-[25px]">Allow time for healing</h3>
              <p className="mt-3 font-inter text-[15px] font-light leading-[1.75] text-charcoal-soft">The implant needs time to integrate with the bone before the final restoration. Healing can take several months or longer, particularly when other procedures are involved. Ask what you will wear during that time and how readiness for the next stage will be assessed.</p>
            </div>
            <div>
              <h3 className="font-serif text-[25px]">Restore, then keep caring for it</h3>
              <p className="mt-3 font-inter text-[15px] font-light leading-[1.75] text-charcoal-soft">For a single tooth, a connector called an abutment supports the crown. Dr. Engel plans its color and shape in relation to your other teeth, as well as how it feels and functions. Daily cleaning and professional follow-up remain important; the crown and implant components may need attention over time.</p>
            </div>
          </div>
          <p className="mt-8 max-w-[760px] font-inter text-[15px] font-light leading-[1.75] text-charcoal-soft">An implant involves surgery. Ask Dr. Engel about the risks for your situation, including infection, injury to nearby structures, or an implant not integrating, and how those compare with the alternatives.</p>
          <Link href="/articles/dental-implants-vs-dental-bridges-filling-the-gap-in-your-smile" className="mt-4 inline-block text-sage underline underline-offset-4">Compare implants and bridges, including healing and maintenance</Link>
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
                href="/bone-grafting"
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
              alt="Smiling person outdoors"
              fill
              sizes="(min-width: 1320px) 1320px, 100vw"
              className="object-cover object-center"
            />
          </div>
        </section>

        <section className="mx-auto max-w-[1100px] px-6 pb-16">
          <h2 className="font-serif text-[34px] leading-tight">Planning the cost and timing of your implant care</h2>
          <div className="mt-6 grid gap-8 md:grid-cols-2">
            <div><h3 className="font-serif text-[25px]">What affects the total cost?</h3><p className="mt-3 text-[15px] leading-relaxed text-charcoal-soft">Your plan may include imaging, removal of a tooth, grafting if needed, implant placement, and the final restoration. The number of teeth involved and the condition of your mouth affect the scope. Ask for an itemized estimate that includes any temporary tooth, connector, final crown, and follow-up as well as the surgical steps. Comparing placement fees alone can leave out part of the treatment.</p></div>
            <div><h3 className="font-serif text-[25px]">How do timing and payment fit together?</h3><p className="mt-3 text-[15px] leading-relaxed text-charcoal-soft">Care often takes place in stages, with healing time between them. Dr. Engel explains the proposed sequence after your examination. The practice offers CareCredit for larger treatment plans; the team can discuss available options and help you understand questions to ask your insurer.</p><Link href="/patient-info#insurance" className="mt-4 inline-block text-sage underline underline-offset-4">Insurance and financing information</Link></div>
          </div>
          <p className="mt-7 text-[15px] leading-relaxed text-charcoal-soft">Start by telling us which tooth or teeth concern you, whether you have recent dental records, and what you hope to achieve. We will arrange an examination so you can discuss implants and alternatives with Dr. Engel.</p>
          <Link href="/contact" className="mt-6 inline-block rounded-full bg-sage px-7 py-3 text-cream">Request an implant consultation</Link>
        </section>
        <CareEvidence kind="implants" awards={false} />

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
              Contact Living Dental Health to talk with Dr. Engel about whether
              a dental implant may be appropriate for your situation.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-block rounded-full px-7 py-3 font-inter text-[12px] uppercase tracking-[0.24em] transition-colors"
                style={{ backgroundColor: SAGE, color: "#F5F0E8" }}
              >
                Request an implant consultation
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
