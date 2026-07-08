import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import {
  beforeAndAfterPageSchema,
  sanitizeJsonLd,
} from "@/lib/schema";

const SAGE = "#6B7C5C";
const SAGE_LABEL = "#9CAF88";

export const metadata: Metadata = {
  alternates: { canonical: "/before-and-after" },
  title: "The Work — Before & After Cases | Living Dental Health, Bend Oregon",
  description:
    "Real before-and-after dental work from Dr. Andy Engel at Living Dental Health in Bend, Oregon. Cosmetic dentistry, smile design, and full mouth reconstruction cases — planned and finished in-house.",
};

type Case = {
  number: string;
  procedure: string;
  concern?: string;
  solution?: string;
  note?: string;
  image: string;
  alt: string;
};

const CASES: Case[] = [
  {
    number: "01",
    procedure: "Porcelain Veneers",
    concern:
      "Broken and chipped teeth that had yellowed and greyed over time. The patient wanted a fuller, wider smile.",
    solution:
      "Digital photography, a diagnostic wax-up, and cosmetic smile design, finished with porcelain veneers on the upper teeth — for a brighter, broader, natural-looking smile.",
    image: "/case-01.webp",
    alt: "Before and after porcelain veneers by Dr. Andy Engel at Living Dental Health in Bend, Oregon — Case 01",
  },
  {
    number: "02",
    procedure: "Full Mouth Reconstruction",
    concern:
      "Chipped and worn teeth throughout. The patient had also been sucking on Reese's peanut butter cups daily, leading to uncontrolled cavities across the entire mouth.",
    solution:
      "Digital photography, a diagnostic wax-up, and cosmetic smile design. A full mouth reconstruction, completed with a combination of porcelain crowns and veneers to restore both function and aesthetics.",
    image: "/case-02.webp",
    alt: "Before and after full mouth reconstruction by Dr. Andy Engel at Living Dental Health in Bend, Oregon — Case 02",
  },
  {
    number: "03",
    procedure: "Porcelain Crowns",
    concern:
      "Broken, chipped teeth that had worn down over the years — shorter than they used to be. The patient wanted a healthy, natural-looking smile.",
    solution:
      "Digital photography, a diagnostic wax-up, and cosmetic smile design, rebuilt with porcelain crowns.",
    image: "/case-03.webp",
    alt: "Before and after porcelain crowns by Dr. Andy Engel at Living Dental Health in Bend, Oregon — Case 03",
  },
  {
    number: "04",
    procedure: "Porcelain Crowns",
    concern:
      "The patient's front teeth were too large and mismatched in color, while the side teeth were too small and left gaps. They had consulted other offices but never felt comfortable moving forward.",
    solution:
      "Cosmetic smile design, a diagnostic wax-up, and digital photography, finished with porcelain crowns on the upper teeth.",
    image: "/case-04.webp",
    alt: "Before and after porcelain crowns by Dr. Andy Engel at Living Dental Health in Bend, Oregon — Case 04",
  },
  {
    number: "05",
    procedure: "Full Mouth Reconstruction",
    concern:
      "Broken, ground-down teeth with decay throughout both the upper and lower arches.",
    solution:
      "A full mouth reconstruction restoring both arches with porcelain crowns.",
    image: "/case-05.webp",
    alt: "Before and after full mouth reconstruction by Dr. Andy Engel at Living Dental Health in Bend, Oregon — Case 05",
  },
  {
    number: "06",
    procedure: "Crowns & Veneers",
    concern:
      "Mismatched teeth and old yellow composite fillings she found unsightly. She was embarrassed to smile and hesitant to show her teeth.",
    solution:
      "Digital photography, cosmetic smile design, and a diagnostic wax-up, then a combination of crowns and veneers on the upper teeth to meet her aesthetic and functional goals — with special attention to tissue health, symmetry, and phonetics.",
    image: "/case-06.webp",
    alt: "Before and after crowns and veneers by Dr. Andy Engel at Living Dental Health in Bend, Oregon — Case 06",
  },
];

export default function BeforeAndAfterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(sanitizeJsonLd(beforeAndAfterPageSchema)),
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
            <li style={{ color: SAGE }}>The Work</li>
          </ol>
        </nav>

        {/* HEADER — text-only */}
        <section className="mx-auto max-w-[1320px] px-6 pt-10 pb-10 text-center sm:pt-16 sm:pb-14">
          <p
            className="font-inter text-[11px] font-light uppercase tracking-widest"
            style={{ color: SAGE }}
          >
            &mdash; before &amp; after &mdash;
          </p>
          <h1 className="mx-auto mt-5 font-serif text-[44px] leading-[1.02] text-charcoal sm:mt-6 sm:text-[64px] md:text-[80px]">
            The <span className="font-serif-italic">work.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-[640px] font-inter text-[15px] font-light leading-[1.7] text-charcoal-soft sm:mt-8 sm:text-[17px]">
            Real cases from Dr. Engel&rsquo;s chair. Porcelain veneers,
            crowns, full mouth reconstruction &mdash; every case planned,
            executed, and finished here in Bend.
          </p>
          <p className="mt-6 font-inter text-[12px] font-light uppercase tracking-[0.2em] text-charcoal-soft sm:mt-8">
            Dr. Engel{" "}
            <span style={{ color: SAGE_LABEL }}>&middot;</span> 28 years in
            Bend <span style={{ color: SAGE_LABEL }}>&middot;</span> Cases
            performed in-house
          </p>
        </section>

        {/* CASES GRID */}
        <section className="mx-auto max-w-[1320px] px-6 pb-20 sm:pb-24">
          <div
            className="mx-auto max-w-[1100px] border-t pt-12 sm:pt-14"
            style={{ borderColor: "rgba(28,26,23,0.18)" }}
          >
            <div className="grid gap-x-10 gap-y-16 sm:grid-cols-2">
              {CASES.map((c) => (
                <article
                  key={c.number}
                  id={`case-${c.number}`}
                  className="scroll-mt-[120px]"
                >
                  <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-cream-deep">
                    <Image
                      src={c.image}
                      alt={c.alt}
                      fill
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="object-cover object-center"
                    />
                  </div>
                  <p
                    className="mt-6 font-inter text-[11px] font-light uppercase tracking-widest"
                    style={{ color: SAGE }}
                  >
                    Case {c.number}
                  </p>
                  <p
                    className="mt-2 font-inter text-[12px] font-light uppercase tracking-[0.18em]"
                    style={{ color: SAGE_LABEL }}
                  >
                    {c.procedure}
                  </p>
                  {c.concern || c.solution ? (
                    <div className="mt-4 space-y-4">
                      {c.concern ? (
                        <div>
                          <p className="font-inter text-[10px] font-light uppercase tracking-[0.2em] text-warm-gray">
                            The concern
                          </p>
                          <p className="mt-1 font-inter text-[14px] font-light leading-[1.7] text-charcoal-soft sm:text-[15px]">
                            {c.concern}
                          </p>
                        </div>
                      ) : null}
                      {c.solution ? (
                        <div>
                          <p
                            className="font-inter text-[10px] font-light uppercase tracking-[0.2em]"
                            style={{ color: SAGE }}
                          >
                            The solution
                          </p>
                          <p className="mt-1 font-inter text-[14px] font-light leading-[1.7] text-charcoal-soft sm:text-[15px]">
                            {c.solution}
                          </p>
                        </div>
                      ) : null}
                    </div>
                  ) : (
                    <p className="mt-3 font-serif-italic text-[15px] leading-[1.7] text-warm-gray sm:text-[16px]">
                      {c.note}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-[1320px] px-6 pb-24 sm:pb-32">
          <div
            className="mx-auto max-w-[720px] border-t pt-14 text-center sm:pt-16"
            style={{ borderColor: "rgba(28,26,23,0.18)" }}
          >
            <h2 className="font-serif text-[32px] leading-[1.05] text-charcoal sm:text-[48px]">
              Your case,{" "}
              <span className="font-serif-italic">your plan.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-[520px] font-inter text-[15px] font-light leading-[1.7] text-charcoal-soft sm:text-[16px]">
              Every smile is different. The first step is a conversation &mdash;
              what bothers you, what you want, what&rsquo;s realistic. Dr.
              Engel will walk you through the options before any procedure is
              scheduled.
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
