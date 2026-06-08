import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import ServiceCard from "@/components/ServiceCard";
import { formatDate, getAllArticles } from "@/lib/articles";
import { homeSchema, sanitizeJsonLd } from "@/lib/schema";

const SAGE = "#B6C0A6";

const SERVICES = [
  {
    title: "Preventive Dentistry",
    href: "/general-dentistry",
    image: "/service-preventive.webp",
    imageAlt:
      "A dental hygienist at Living Dental Health caring for a patient in the cleaning chair",
    items: [
      { label: "Cleanings & Exams", meta: "60 min" },
      { label: "Digital X-Rays", meta: "on-site" },
      { label: "Sealants & Fluoride", meta: "as needed" },
    ],
  },
  {
    title: "Cosmetic Dentistry",
    href: "/cosmetic-dentistry",
    image: "/service-cosmetic.webp",
    imageAlt:
      "A Living Dental Health patient laughing over coffee in Bend, Oregon",
    items: [
      { label: "Whitening", meta: "in-office" },
      { label: "ClearCorrect", meta: "clear aligners" },
      { label: "Smile Makeover", meta: "consult" },
    ],
  },
  {
    title: "Oral Surgery",
    href: "/implants-surgery",
    image: "/service-implants.webp",
    imageAlt:
      "Dr. Andy Engel consulting with a patient about oral surgery and dental implants",
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
  { top: "28", bottom: "Years in Practice" },
  { top: "✓ Yes", bottom: "Accepting New Patients" },
  { top: "In-Office", bottom: "Dental Savings Plan" },
];

export default function HomePage() {
  const latest = getAllArticles().slice(0, 5);
  const [featured, ...rest] = latest;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(sanitizeJsonLd(homeSchema)),
        }}
      />
      <main id="top" className="min-h-screen bg-cream text-charcoal">
        <Nav />

        {/* HEADER — wordmark */}
        <header className="mx-auto max-w-[1320px] px-6 pt-10 pb-8 text-center sm:pt-14 sm:pb-10">
          <p className="font-serif-italic text-[13px] text-warm-gray sm:text-[15px]">
            — a private dental studio —
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 sm:gap-3">
            <LeafToothMark />
            <h1 className="font-serif text-[32px] leading-none text-charcoal sm:text-[44px] lg:text-[56px]">
              Bend&rsquo;s Dentist Since 1998.
            </h1>
          </div>
          <p className="mx-auto mt-6 max-w-[640px] font-inter text-[15px] font-light leading-[1.7] text-warm-gray sm:mt-8 sm:text-[17px]">
            Some patients have been with us since the beginning. Families,
            neighbors, people we see at the mountain and wave to at
            Phil&rsquo;s Trailhead. If you&rsquo;re looking for a dentist who
            will still know your name in ten years, you&rsquo;ve found him.
          </p>
        </header>

        {/* HERO */}
        <section className="relative">
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream-deep sm:aspect-[3/2] lg:aspect-[16/9] xl:aspect-[1920/900] xl:max-h-[760px]">
            <Image
              src="/hero-couple.webp"
              alt="A relaxed couple smiling in soft Bend, Oregon light"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
          {/* overlaid quote — tablet & desktop only */}
          <div className="pointer-events-none absolute inset-0 hidden sm:block">
            <div className="mx-auto h-full max-w-[1320px] px-6">
              <div className="flex h-full items-center">
                <div className="w-full max-w-[420px] bg-charcoal/90 p-7 backdrop-blur-[2px]">
                  <p
                    className="eyebrow mb-4"
                    style={{ color: "rgba(245,240,232,0.7)" }}
                  >
                    — why it works —
                  </p>
                  <p className="font-serif-italic text-[24px] leading-[1.25] text-cream-soft lg:text-[28px]">
                    “28 years. 4.9 Stars. The same Dentist, the same town, the same commitment.”
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* stacked quote — phone only, sits below the photo so the image isn't covered */}
          <div className="bg-charcoal px-5 py-8 text-center sm:hidden">
            <p
              className="eyebrow mb-3"
              style={{ color: "rgba(245,240,232,0.7)" }}
            >
              — why it works —
            </p>
            <p className="font-serif-italic text-[22px] leading-[1.3] text-cream-soft">
              “28 years. 4.9 Stars. The same Dentist, the same town, the same commitment.”
            </p>
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
                title={s.title}
                items={s.items}
                image={s.image}
                imageAlt={s.imageAlt}
                href={s.href}
              />
            ))}
          </div>
        </section>

        {/* ARTICLES TEASER — contained, 1 featured charcoal card + 3 below */}
        <section
          id="articles-teaser"
          className="mx-auto max-w-[1320px] px-5 py-14 sm:px-6 sm:py-20"
        >
          <div className="text-center">
            <p className="eyebrow">— from the articles —</p>
            <p className="mx-auto mt-5 max-w-[520px] font-serif-italic text-[20px] leading-[1.35] text-charcoal sm:text-[22px]">
              Practical dental health, written down by Dr. Engel.
            </p>
          </div>

          {/* FEATURED ARTICLE — full-image hero with overlaid headline */}
          {featured ? (
            <Link
              href={`/articles/${featured.slug}`}
              className="group relative mt-12 block aspect-[4/3] w-full overflow-hidden rounded-xl sm:mt-14 sm:aspect-[2/1] md:aspect-[1916/821]"
            >
              <Image
                src="/cosmetic-secondary.webp"
                alt=""
                fill
                sizes="(min-width: 1024px) 1320px, 100vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              {/* readability gradient — vertical on mobile, horizontal on desktop */}
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/55 to-charcoal/0 md:bg-gradient-to-r md:from-charcoal/85 md:via-charcoal/45 md:to-transparent"
              />
              {/* text */}
              <div className="absolute inset-0 flex flex-col justify-end p-7 sm:p-10 md:justify-center md:p-14 lg:p-20">
                <div className="max-w-[540px]">
                  <p
                    className="font-inter text-[11px] font-light uppercase tracking-[0.2em]"
                    style={{ color: "#9CAF88" }}
                  >
                    Featured &middot; {formatDate(featured.datePublished)}
                  </p>
                  <h3
                    className="mt-4 font-serif-italic text-[28px] leading-[1.08] transition-opacity group-hover:opacity-95 sm:mt-5 sm:text-[36px] md:text-[44px] lg:text-[52px]"
                    style={{ color: "#F5F0E8" }}
                  >
                    {featured.title}
                  </h3>
                  <p
                    className="mt-4 line-clamp-3 font-inter text-[14px] font-light leading-[1.7] sm:mt-5 sm:text-[15px] md:text-[16px]"
                    style={{ color: "rgba(245,240,232,0.85)" }}
                  >
                    {featured.excerpt}
                  </p>
                  <span
                    className="mt-5 inline-flex items-center gap-2 font-inter text-[12px] uppercase tracking-[0.2em] sm:mt-6 sm:text-[13px]"
                    style={{ color: "#9CAF88" }}
                  >
                    Read featured article
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      aria-hidden
                      className="transition-transform duration-300 ease-out group-hover:translate-x-0.5"
                    >
                      <path
                        d="M3 11L11 3M11 3H4.5M11 3V9.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ) : null}

          {/* 3 SMALLER CARDS BELOW */}
          {rest.length > 0 ? (
            <div className="mt-4 grid gap-4 sm:mt-6 sm:gap-6 md:grid-cols-3">
              {rest.slice(0, 3).map((a) => (
                <Link
                  key={a.slug}
                  href={`/articles/${a.slug}`}
                  className="group flex flex-col rounded-xl bg-[#403328] px-7 py-7 transition-colors hover:bg-[#504233] sm:px-8 sm:py-8"
                >
                  <p
                    className="font-inter text-[11px] font-light uppercase tracking-[0.2em]"
                    style={{ color: "#9CAF88" }}
                  >
                    {formatDate(a.datePublished)}
                  </p>
                  <h3
                    className="mt-4 font-serif-italic text-[20px] leading-[1.18] transition-opacity group-hover:opacity-90 sm:text-[22px]"
                    style={{ color: "#F5F0E8" }}
                  >
                    {a.title}
                  </h3>
                  <p
                    className="mt-3 line-clamp-3 font-inter text-[13px] font-light leading-[1.65] sm:text-[14px]"
                    style={{ color: "rgba(245,240,232,0.72)" }}
                  >
                    {a.excerpt}
                  </p>
                  <span
                    className="mt-auto inline-flex items-center gap-2 pt-5 font-inter text-[11px] uppercase tracking-[0.18em]"
                    style={{ color: "#9CAF88" }}
                  >
                    Read article
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 14 14"
                      fill="none"
                      aria-hidden
                      className="transition-transform duration-300 ease-out group-hover:translate-x-0.5"
                    >
                      <path
                        d="M3 11L11 3M11 3H4.5M11 3V9.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          ) : null}

          <div className="mt-12 text-center sm:mt-14">
            <Link
              href="/articles"
              className="group inline-flex items-center gap-2 font-inter text-[12px] uppercase tracking-[0.2em] transition-opacity hover:opacity-70 sm:text-[13px]"
              style={{ color: SAGE }}
            >
              View all articles
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden
                className="transition-transform duration-300 ease-out group-hover:translate-x-0.5"
              >
                <path
                  d="M3 11L11 3M11 3H4.5M11 3V9.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
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
                  OHSU and has been here ever since — twenty-eight years in the
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

        {/* TRUST BAR — mocha band bridges the cream page to the dark footer */}
        <section
          className="border-y border-line"
          style={{ backgroundColor: "#EAE0CF" }}
        >
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
                "Tue–Thu · 8a–5p",
                "Fri · 8a–1p",
                "Closed Mon / Sat / Sun",
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
      </main>
    </>
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
