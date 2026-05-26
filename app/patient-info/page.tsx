import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import { patientInfoPageSchema, sanitizeJsonLd } from "@/lib/schema";

const SAGE = "#6B7C5C";
const SAGE_LABEL = "#9CAF88";

export const metadata: Metadata = {
  title: "New Patients — Living Dental Health, Bend Oregon",
  description:
    "Everything new patients need to know before a first visit to Living Dental Health in Bend, Oregon — what to bring, scheduling, insurance and financing, our in-office dental plan, and our financial policy.",
};

const FAQ = [
  {
    q: "Is Living Dental Health accepting new patients?",
    a: "Yes. Living Dental Health welcomes new patients at 930 SW Yates Dr, Bend OR 97702. Call (541) 550-5311 to schedule your first visit.",
  },
  {
    q: "What should I bring to my first dental appointment at Living Dental Health?",
    a: "Bring any recent dental x-rays, a list of current medications, your insurance card, and completed forms if applicable. A parent or guardian must accompany patients under 18.",
  },
  {
    q: "Does Living Dental Health accept dental insurance?",
    a: "Yes. Living Dental Health is in-network with multiple dental insurance plans and accepts out-of-network patients as well.",
  },
  {
    q: "What if I don't have dental insurance?",
    a: "Living Dental Health offers an in-office dental plan for patients without insurance, covering preventive care and more comprehensive treatment options. Call (541) 550-5311 to learn more.",
  },
  {
    q: "Does Living Dental Health offer financing?",
    a: "Yes. CareCredit financing is available for larger treatment plans. Most major credit cards are also accepted.",
  },
];

const numberClass =
  "font-inter text-[11px] font-light uppercase tracking-widest";
const headingClass =
  "mt-4 font-serif text-[32px] leading-[1.05] text-charcoal sm:text-[44px] md:text-[52px]";
const bodyClass =
  "font-inter text-[15px] font-light leading-[1.75] text-charcoal-soft sm:text-[16px]";
const sectionClass =
  "mx-auto max-w-[1320px] scroll-mt-[120px] px-6 pb-20 sm:pb-24";
const innerClass = "mx-auto max-w-[1100px] border-t pt-12 sm:pt-14";
const ruleStyle = { borderColor: "rgba(28,26,23,0.18)" };
const ctaButtonClass =
  "mt-8 inline-block rounded-full px-7 py-3 font-inter text-[12px] uppercase tracking-[0.24em] transition-colors";

export default function PatientInfoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(sanitizeJsonLd(patientInfoPageSchema)),
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
              <Link href="/" className="transition-colors hover:text-charcoal">
                Home
              </Link>
            </li>
            <li aria-hidden style={{ color: SAGE_LABEL }}>
              /
            </li>
            <li style={{ color: SAGE }}>New Patients</li>
          </ol>
        </nav>

        {/* HERO — headline overlaid on the photo's negative space (desktop),
            stacked above the photo (mobile). Single H1, repositioned by CSS. */}
        <div className="relative">
          <div className="px-6 pt-6 pb-10 text-center lg:absolute lg:inset-0 lg:z-10 lg:flex lg:items-start lg:pt-16 lg:pb-0 lg:text-left">
            <div className="mx-auto w-full max-w-[1320px] lg:px-6">
              <div className="lg:max-w-[420px]">
                <p
                  className="font-inter text-[11px] font-light uppercase tracking-widest"
                  style={{ color: SAGE }}
                >
                  &mdash; new patients &mdash;
                </p>
                <h1 className="mt-5 font-serif text-[40px] leading-[1.05] text-charcoal sm:text-[56px] lg:text-[54px]">
                  We&rsquo;ve been{" "}
                  <span className="font-serif-italic">expecting you.</span>
                </h1>
                <p className="mx-auto mt-5 max-w-[560px] font-inter text-[15px] font-light leading-[1.7] text-warm-gray sm:text-[17px] lg:mx-0 lg:max-w-[380px]">
                  Whether you haven&rsquo;t seen a dentist in two years or
                  twenty, you&rsquo;ll be treated with respect, never
                  judgment. Here&rsquo;s everything you need to know before
                  your first visit.
                </p>
              </div>
            </div>
          </div>

          <div className="relative h-[320px] w-full overflow-hidden sm:h-[460px] lg:h-[560px]">
            <Image
              src="/patient-info-hero.webp"
              alt="Dr. Andy Engel and a team member chatting with a relaxed patient at Living Dental Health in Bend, Oregon"
              fill
              priority
              sizes="100vw"
              className="object-cover object-right lg:object-center"
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

        <div className="h-16 sm:h-20" aria-hidden />

        {/* SECTION 1 — First visit */}
        <section id="first-visit" className={sectionClass}>
          <div className={innerClass} style={ruleStyle}>
            <div className="grid gap-6 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
              <div>
                <p className={numberClass} style={{ color: SAGE }}>
                  01 &nbsp;/&nbsp; 05
                </p>
                <h2 className={headingClass}>Your first visit</h2>
              </div>
              <div>
                <div className={`${bodyClass} space-y-5`}>
                  <p>
                    Your initial appointment starts with a conversation. Dr.
                    Engel will review your dental history, discuss any
                    concerns, and explain your options clearly before
                    recommending anything. Occasionally treatment can begin the
                    same day. Complex cases may require a second appointment —
                    we&rsquo;ll always tell you upfront what to expect.
                  </p>
                  <p>Please bring the following to your first visit:</p>
                </div>
                <ul className="mt-5 space-y-3">
                  {[
                    "Any recent dental x-rays from a previous dentist",
                    "A list of current medications",
                    "Your insurance card and any completed forms",
                    "A parent or guardian if the patient is under 18",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-baseline gap-3 font-inter text-[15px] font-light text-charcoal-soft sm:text-[16px]"
                    >
                      <span
                        aria-hidden
                        className="text-[11px]"
                        style={{ color: SAGE }}
                      >
                        ✦
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p
                  className="mt-8 p-6 font-inter text-[14px] font-light leading-[1.7] sm:text-[15px]"
                  style={{ backgroundColor: SAGE, color: "#F5F0E8" }}
                >
                  If you have a medical condition such as diabetes, high blood
                  pressure, artificial heart valves or joints, or are on blood
                  thinners or heart medications — please let us know before
                  your appointment. We want to take care of you safely.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2 — Scheduling */}
        <section id="scheduling" className={sectionClass}>
          <div className={innerClass} style={ruleStyle}>
            <div className="grid gap-6 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
              <div>
                <p className={numberClass} style={{ color: SAGE }}>
                  02 &nbsp;/&nbsp; 05
                </p>
                <h2 className={headingClass}>Scheduling your appointment</h2>
              </div>
              <div>
                <div className={`${bodyClass} space-y-5`}>
                  <p>
                    Call us at (541) 550-5311 and we&rsquo;ll get you in as
                    promptly as possible. If you&rsquo;re in pain or have a
                    dental emergency, every effort will be made to see you the
                    same day.
                  </p>
                  <p>
                    We do our best to stay on schedule and respect your time.
                    Occasionally complex procedures or emergency cases cause
                    delays — we appreciate your patience when that happens.
                  </p>
                </div>
                <dl
                  className="mt-8 max-w-[400px] divide-y border-y font-inter text-[14px] sm:text-[15px]"
                  style={{ borderColor: "rgba(28,26,23,0.14)" }}
                >
                  {[
                    ["Tuesday – Thursday", "8:00 AM – 5:00 PM"],
                    ["Friday", "8:00 AM – 1:00 PM"],
                    ["Mon, Sat, Sun", "Closed"],
                  ].map(([day, hrs]) => (
                    <div
                      key={day}
                      className="flex items-baseline justify-between gap-4 py-3"
                      style={{ borderColor: "rgba(28,26,23,0.14)" }}
                    >
                      <dt className="font-light text-warm-gray">{day}</dt>
                      <dd className="text-charcoal">{hrs}</dd>
                    </div>
                  ))}
                </dl>
                <a
                  href="tel:5415505311"
                  className={ctaButtonClass}
                  style={{ backgroundColor: SAGE, color: "#F5F0E8" }}
                >
                  Call (541) 550&#8209;5311
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3 — Insurance & financing */}
        <section id="insurance" className={sectionClass}>
          <div className={innerClass} style={ruleStyle}>
            <div className="grid gap-6 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
              <div>
                <p className={numberClass} style={{ color: SAGE }}>
                  03 &nbsp;/&nbsp; 05
                </p>
                <h2 className={headingClass}>Insurance &amp; financing</h2>
              </div>
              <div className={`${bodyClass} space-y-5`}>
                <p>
                  We believe everyone deserves access to quality dental care
                  regardless of insurance status. We&rsquo;re in-network with a
                  variety of dental plans and provide the same level of care
                  out-of-network.
                </p>
                <p>
                  We accept most major credit cards — Visa, Mastercard,
                  Discover, and American Express — and offer financing through
                  CareCredit for larger treatment plans. Payment is due at time
                  of service unless other arrangements are made in advance.
                </p>
                <p>
                  Your insurance plan is a benefit provided by your employer.
                  We&rsquo;ll help you understand and maximize whatever coverage
                  you have — and we&rsquo;ll always be upfront about costs
                  before any procedure begins.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4 — In-office dental plan */}
        <section id="dental-plan" className={sectionClass}>
          <div className={innerClass} style={ruleStyle}>
            <div className="grid gap-6 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
              <div>
                <p className={numberClass} style={{ color: SAGE }}>
                  04 &nbsp;/&nbsp; 05
                </p>
                <h2 className={headingClass}>
                  No insurance?{" "}
                  <span className="font-serif-italic">No problem.</span>
                </h2>
              </div>
              <div>
                <div className={`${bodyClass} space-y-5`}>
                  <p>
                    We offer an in-office dental plan designed for patients
                    without traditional insurance. Plans range from basic
                    preventive coverage — cleanings, x-rays, and exams — to
                    more comprehensive options for patients who need frequent
                    care.
                  </p>
                  <p>
                    Call us to learn more about which plan makes sense for you.
                  </p>
                </div>
                <a
                  href="tel:5415505311"
                  className={ctaButtonClass}
                  style={{ backgroundColor: SAGE, color: "#F5F0E8" }}
                >
                  Call to learn more
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5 — Financial policy */}
        <section id="financial-policy" className={sectionClass}>
          <div className={innerClass} style={ruleStyle}>
            <div className="grid gap-6 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
              <div>
                <p className={numberClass} style={{ color: SAGE }}>
                  05 &nbsp;/&nbsp; 05
                </p>
                <h2 className={headingClass}>Our financial policy</h2>
              </div>
              <div className={`${bodyClass} space-y-5`}>
                <p>
                  We deliver the finest care at the most reasonable cost.
                  Payment is due at time of service unless prior arrangements
                  have been made. We&rsquo;ll send monthly statements and will
                  work with you if questions arise — most of the time a simple
                  phone call clears things up.
                </p>
                <p>
                  If you have insurance, most carriers respond within four to
                  six weeks. Any remaining balance after insurance pays is your
                  responsibility. We can arrange monthly payment plans when
                  needed — just ask before your procedure begins.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ — visible, mirrors FAQPage schema */}
        <section className="mx-auto max-w-[1320px] px-6 pb-20 sm:pb-24">
          <div
            className="mx-auto max-w-[820px] border-t pt-12 sm:pt-14"
            style={ruleStyle}
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
            style={ruleStyle}
          >
            <h2 className="font-serif text-[32px] leading-[1.05] text-charcoal sm:text-[44px]">
              Ready to become{" "}
              <span className="font-serif-italic">a patient?</span>
            </h2>
            <p className="mx-auto mt-5 max-w-[460px] font-inter text-[15px] font-light leading-[1.7] text-warm-gray sm:text-[16px]">
              New patients are always welcome. Give us a call and we&rsquo;ll
              take it from there.
            </p>
            <a
              href="tel:5415505311"
              className={ctaButtonClass}
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
