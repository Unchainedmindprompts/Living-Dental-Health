import Image from "next/image";
import BookingProvider from "@/components/BookingProvider";
import TopNav from "@/components/TopNav";
import StickyBook from "@/components/StickyBook";
import ServiceCard from "@/components/ServiceCard";

const SERVICES = [
  {
    index: "i.",
    title: "Preventive Dentistry",
    reason: "Cleaning & Exam",
    items: [
      { label: "Cleanings & Exams", meta: "60 min" },
      { label: "Digital X-Rays", meta: "on-site" },
      { label: "Sealants & Fluoride", meta: "as needed" },
    ],
  },
  {
    index: "ii.",
    title: "Cosmetic Dentistry",
    reason: "Smile Consult",
    items: [
      { label: "Whitening", meta: "in-office" },
      { label: "ClearCorrect", meta: "clear aligners" },
      { label: "Smile Makeover", meta: "consult" },
    ],
  },
  {
    index: "iii.",
    title: "Oral Surgery",
    reason: "Something Else",
    items: [
      { label: "Wisdom Teeth", meta: "local anesth." },
      { label: "Dental Implants", meta: "single → full" },
      { label: "Bone & Tissue Grafting", meta: "advanced" },
    ],
  },
];

const CREDS = [
  { label: "Doctorate", value: "OHSU School of Dentistry, 1998" },
  { label: "Undergraduate", value: "Univ. of Oregon · Gen. Science" },
  { label: "Advanced Training", value: "Full-Mouth Reconstruction" },
  { label: "Also Trained In", value: "Implants · ClearCorrect · Grafting" },
];

const TRUST = [
  { top: "4.9 ★★★★★", bottom: "210 Google Reviews" },
  { top: "25+", bottom: "Years in Practice" },
  { top: "✓ Yes", bottom: "Accepting New Patients" },
  { top: "In-Office", bottom: "Dental Savings Plan" },
];

export default function HomePage() {
  return (
    <BookingProvider>
      <main id="top" className="min-h-screen bg-cream text-charcoal">
        <TopNav />

        {/* HEADER — wordmark */}
        <header className="mx-auto max-w-[1320px] px-6 pt-10 pb-8 text-center sm:pt-14 sm:pb-10">
          <p className="font-serif-italic text-[13px] text-warm-gray sm:text-[15px]">
            — a private dental studio —
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 sm:gap-3">
            <LeafToothMark />
            <h1 className="font-serif text-[32px] leading-none text-charcoal sm:text-[44px] lg:text-[56px]">
              Living Dental Health
            </h1>
          </div>
          <div className="mx-auto mt-6 flex max-w-[420px] items-center gap-4">
            <span className="h-px flex-1 bg-line" />
            <span className="eyebrow tracking-[0.32em]">est. 1998</span>
            <span className="h-px flex-1 bg-line" />
          </div>
        </header>

        {/* HERO */}
        <section className="relative">
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream-deep sm:aspect-[3/2] lg:aspect-[16/9] xl:aspect-[1920/900]">
            <Image
              src="/hero-couple.webp"
              alt="A relaxed couple smiling in soft Bend, Oregon light"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
          <div className="pointer-events-none absolute inset-0">
            <div className="mx-auto h-full max-w-[1320px] px-4 sm:px-6">
              <div className="flex h-full items-end sm:items-center">
                <div className="mb-4 w-full max-w-[420px] bg-cream/90 p-5 backdrop-blur-[2px] sm:mb-0 sm:p-7">
                  <p className="eyebrow mb-2 sm:mb-4">— our guiding principle —</p>
                  <p className="font-serif-italic text-[20px] leading-[1.25] text-charcoal sm:text-[24px] lg:text-[28px]">
                    “Focused on customized care, with a gentle touch.”
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TAGLINE BAR */}
        <section className="mx-auto max-w-[1320px] px-5 py-10 text-center sm:px-6 sm:py-16">
          <p className="font-serif-italic text-[13px] text-warm-gray sm:text-[15px]">
            — our practice in three lines —
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 tagline text-charcoal sm:mt-6 sm:gap-x-5">
            <span>Customized Care</span>
            <span className="text-sage">·</span>
            <span>A Gentle Touch</span>
            <span className="text-sage">·</span>
            <span>Your Dentist in Bend</span>
          </div>
        </section>

        <Rule />

        {/* SERVICES */}
        <section id="services" className="mx-auto max-w-[1320px] px-5 py-14 sm:px-6 sm:py-20">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-end lg:gap-12">
            <div>
              <p className="eyebrow mb-3 sm:mb-4">Our Services</p>
              <h2 className="font-serif text-[32px] leading-[1.05] text-charcoal sm:text-[44px] lg:text-[56px]">
                Comprehensive care,{" "}
                <span className="font-serif-italic">under one calm roof.</span>
              </h2>
            </div>
            <p className="max-w-[480px] text-[14px] text-warm-gray sm:text-[15.5px]">
              We see Central Oregonians age 12 and up — families, professionals,
              and longtime neighbors — across the full spectrum of preventive,
              cosmetic, and surgical care. One practice, one team, one
              relationship.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:mt-12 sm:gap-6 md:grid-cols-3">
            {SERVICES.map((s) => (
              <ServiceCard
                key={s.title}
                index={s.index}
                title={s.title}
                items={s.items}
                reason={s.reason}
              />
            ))}
          </div>
        </section>

        <Rule />

        {/* MEET THE DENTIST */}
        <section
          id="dentist"
          className="mx-auto max-w-[1320px] px-5 py-14 sm:px-6 sm:py-20"
        >
          <div className="grid gap-8 lg:grid-cols-[auto_1fr] lg:items-start lg:gap-12">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[320px] overflow-hidden bg-cream-deep sm:max-w-[380px] lg:mx-0 lg:w-[380px]">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-warm-gray">
                <LeafToothMark color="var(--sage-soft)" />
                <p className="eyebrow">Dr. Andy · Portrait</p>
              </div>
              <Image
                src="/dr-andy.webp"
                alt="Dr. Andy Engel, DMD"
                fill
                sizes="(min-width: 1024px) 380px, (min-width: 640px) 380px, 320px"
                className="relative object-cover object-center"
              />
            </div>

            <div>
              <p className="eyebrow mb-3 sm:mb-4">Meet your dentist</p>
              <h2 className="font-serif text-[32px] leading-[1.05] text-charcoal sm:text-[44px] lg:text-[56px]">
                Dr. <span className="font-serif-italic">Andy Engel</span>, DMD
              </h2>
              <p className="mt-3 font-serif-italic text-[15px] text-warm-gray sm:mt-4 sm:text-[18px]">
                — in Bend, Oregon since 1998 · known to patients as Dr. Andy —
              </p>
              <span className="my-5 block h-px w-14 bg-sage sm:my-7" />

              <div className="space-y-5 text-charcoal-soft">
                <p>
                  Andy opened Living Dental Health the year he graduated from
                  OHSU and has been here ever since — a quarter-century in the
                  same chair, on the same block, with many of the same
                  families. The practice grew the way good neighborhoods do:
                  slowly, by referral, around a small team that learned each
                  other's rhythms.
                </p>
                <p>
                  His approach is unhurried and conservative. Cleanings and
                  exams sit at the heart of it; cosmetic refinements and
                  surgical care happen under the same roof when they're the
                  right call. Patients tell us they appreciate being explained
                  to, not pitched at — that's the gentle touch we mean.
                </p>
              </div>

              <dl className="mt-10 grid grid-cols-1 gap-6 border-t border-rule pt-8 sm:grid-cols-2">
                {CREDS.map((c) => (
                  <div key={c.label}>
                    <dt className="eyebrow mb-2">{c.label}</dt>
                    <dd className="text-charcoal">{c.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* TRUST BAR */}
        <section className="border-y border-line">
          <div className="mx-auto grid max-w-[1320px] grid-cols-2 md:grid-cols-4">
            {TRUST.map((t, i) => (
              <div
                key={t.bottom}
                className={`flex flex-col items-center gap-1.5 px-3 py-7 text-center sm:gap-2 sm:px-6 sm:py-10 ${
                  i !== 0 ? "md:border-l md:border-line" : ""
                } ${i % 2 === 1 ? "border-l border-line" : ""} ${
                  i >= 2 ? "border-t border-line md:border-t-0" : ""
                }`}
              >
                <p className="font-serif-italic text-[22px] leading-tight text-charcoal sm:text-[28px] sm:leading-none">
                  {t.top}
                </p>
                <p className="eyebrow text-[10px] sm:text-[11px]">{t.bottom}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-charcoal text-cream-soft">
          <div className="mx-auto grid max-w-[1320px] gap-8 px-5 py-14 sm:px-6 sm:py-20 sm:gap-12 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
            <div>
              <div className="flex items-center gap-3">
                <LeafToothMark color="var(--sage-soft)" />
                <span className="font-serif text-[28px] leading-none">
                  Living Dental Health
                </span>
              </div>
              <p className="mt-5 max-w-[320px] font-serif-italic text-[18px] text-cream-soft/80">
                Customized care, with a gentle touch — your dentist in Bend.
              </p>
            </div>

            <FooterCol
              title="Visit"
              lines={[
                "930 SW Yates Drive",
                "Bend, OR 97702",
              ]}
            />
            <FooterCol
              title="Hours"
              lines={[
                "Mon–Thu · 8a–5p",
                "Fri · 8a–2p",
                "Closed Sat / Sun",
              ]}
            />
            <FooterCol
              title="Practice"
              lines={[
                "About",
                "Services",
                "Smile Gallery",
                "New Patients",
                "(541) 550-5311",
              ]}
              linkLast
            />
          </div>

          <div className="border-t border-cream-soft/15">
            <div className="mx-auto flex max-w-[1320px] flex-col items-start justify-between gap-3 px-6 py-6 text-[12px] text-cream-soft/60 md:flex-row md:items-center">
              <p>© 2026 Living Dental Health, PLLC</p>
              <div className="flex gap-6">
                <a href="#privacy" className="sweep">Privacy</a>
                <a href="#accessibility" className="sweep">Accessibility</a>
                <a href="#hipaa" className="sweep">HIPAA Notice</a>
              </div>
            </div>
          </div>
        </footer>

        <StickyBook />
      </main>
    </BookingProvider>
  );
}

function Rule() {
  return (
    <div className="mx-auto max-w-[1320px] px-6">
      <span className="block h-px w-full bg-rule" />
    </div>
  );
}

function FooterCol({
  title,
  lines,
  linkLast,
}: {
  title: string;
  lines: string[];
  linkLast?: boolean;
}) {
  return (
    <div>
      <p className="eyebrow mb-4 text-sage-soft">{title}</p>
      <ul className="space-y-2 text-[14px] text-cream-soft/85">
        {lines.map((l, i) => {
          const isPhone = linkLast && i === lines.length - 1;
          return (
            <li key={l}>
              {isPhone ? (
                <a className="sweep" href="tel:+15415505311">
                  {l}
                </a>
              ) : (
                <span>{l}</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function LeafToothMark({ color = "var(--sage)" }: { color?: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <path
        d="M11 2c2.5 0 4.5 2 4.5 4.5 0 2-1 3.5-1 5.5 0 1.6.6 3 .6 4.5 0 1.4-.9 2.5-1.9 2.5-1 0-1.7-1.1-2.2-2.5-.5 1.4-1.2 2.5-2.2 2.5-1 0-1.9-1.1-1.9-2.5 0-1.5.6-2.9.6-4.5 0-2-1-3.5-1-5.5C6.5 4 8.5 2 11 2Z"
        stroke={color}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M11 7c1 1.5 1 3 0 4.5"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}
