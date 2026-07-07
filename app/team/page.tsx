import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import { teamPageSchema, sanitizeJsonLd } from "@/lib/schema";

const SAGE = "#6B7C5C";
const SAGE_LABEL = "#9CAF88";

export const metadata: Metadata = {
  alternates: { canonical: "/team" },
  title: "Meet the Team — Living Dental Health, Bend Oregon",
  description:
    "Meet Dr. Andy Engel and the Living Dental Health team in Bend, Oregon. 28 years of personalized care from a team that knows every patient by name.",
};

const TEAM: {
  name: string;
  role: string;
  bio: string;
  image?: string;
  imageAlt?: string;
  imageObjectPosition?: string;
}[] = [
  {
    name: "Dr. Andy Engel",
    role: "Founder & Dentist",
    bio: "Founder of Living Dental Health, caring for Bend families since 1998. OHSU-trained, with over 1,000 hours of continuing education in smile design, cosmetic dentistry, and full mouth reconstruction. Full bio on the Meet Dr. Engel page.",
    image: "/dr-andy.png",
    imageAlt:
      "Dr. Andy Engel DMD, founder of Living Dental Health in Bend, Oregon",
    imageObjectPosition: "center 0%",
  },
  {
    name: "Samantha Gassman",
    role: "Office Manager",
    bio: "Samantha keeps Living Dental Health running smoothly. From scheduling to insurance to making sure every patient feels welcome the moment they walk in, she’s the steady hand behind the front office.",
    image: "/team-samantha.png",
    imageAlt:
      "Samantha Gassman, Office Manager at Living Dental Health in Bend, Oregon",
    imageObjectPosition: "center 20%",
  },
  {
    name: "Francie Engel",
    role: "Operations Administrator",
    bio: "Francie handles operations behind the scenes at Living Dental Health.",
    image: "/team-francie.webp",
    imageAlt:
      "Francie Engel, Operations Administrator at Living Dental Health in Bend, Oregon",
  },
  {
    name: "Nicole Tarpey",
    role: "Dental Hygienist",
    bio: "Nicole is one of the gentle, detail-oriented hygienists who make cleanings at Living Dental Health something patients actually look forward to.",
    image: "/team-nicole.webp",
    imageAlt:
      "Nicole Tarpey, Dental Hygienist at Living Dental Health in Bend, Oregon",
  },
  {
    name: "Sacha Lodge",
    role: "Dental Hygienist",
    bio: "Sacha brings warmth and a steady hand to every cleaning and periodontal visit.",
    image: "/team-sacha.png",
    imageAlt:
      "Sacha Lodge, Dental Hygienist at Living Dental Health in Bend, Oregon",
  },
  {
    name: "Christy Spencer",
    role: "Dental Assistant",
    bio: "Christy works chairside with Dr. Andy, making sure every procedure runs smoothly and every patient feels comfortable from start to finish.",
    image: "/team-christy.webp",
    imageAlt:
      "Christy Spencer, Dental Assistant at Living Dental Health in Bend, Oregon",
  },
];

const REVIEWS = [
  {
    quote: "Great service and treatment, very helpful and kind employees!",
    author: "Dylan McNall",
  },
  {
    quote: "Excellent care and personable, caring staff and dentist!",
    author: "Gail Bollinger",
  },
  {
    quote:
      "It is never a rushed experience, and I appreciate the quality care.",
    author: "Amanda Cardenas",
  },
];

export default function TeamPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(sanitizeJsonLd(teamPageSchema)),
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
            <li style={{ color: SAGE }}>The Team</li>
          </ol>
        </nav>

        {/* HEADER — text-only, no group photo */}
        <section className="mx-auto max-w-[1320px] px-6 pt-10 pb-10 text-center sm:pt-16 sm:pb-14">
          <p
            className="font-inter text-[11px] font-light uppercase tracking-widest"
            style={{ color: SAGE }}
          >
            &mdash; the people behind your smile &mdash;
          </p>
          <h1 className="mx-auto mt-5 font-serif text-[44px] leading-[1.02] text-charcoal sm:mt-6 sm:text-[64px] md:text-[80px]">
            Meet the <span className="font-serif-italic">team.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-[560px] font-inter text-[15px] font-light leading-[1.7] text-warm-gray sm:mt-8 sm:text-[17px]">
            Dr. Engel has been caring for Bend families for twenty-eight
            years. His team brings the same commitment to knowing you by
            name.
          </p>
          <p className="mt-6 font-inter text-[12px] font-light uppercase tracking-[0.2em] text-charcoal-soft sm:mt-8">
            Dr. Engel{" "}
            <span style={{ color: SAGE_LABEL }}>·</span> 28 years in Bend{" "}
            <span style={{ color: SAGE_LABEL }}>·</span> 4.9 ★{" "}
            <span style={{ color: SAGE_LABEL }}>·</span> 211 Google reviews
          </p>
        </section>

        {/* THE TEAM */}
        <section className="mx-auto max-w-[1320px] px-6 pb-20 sm:pb-24">
          <div
            className="mx-auto max-w-[1100px] border-t pt-12 sm:pt-14"
            style={{ borderColor: "rgba(28,26,23,0.18)" }}
          >
            <h2 className="font-serif text-[32px] leading-[1.05] text-charcoal sm:text-[44px]">
              The <span className="font-serif-italic">team</span>
            </h2>
            <div className="mt-10 grid gap-x-10 gap-y-12 sm:grid-cols-2">
              {TEAM.map((m) => (
                <div
                  key={m.name}
                  className="overflow-hidden rounded-xl bg-cream-deep"
                >
                  {m.image ? (
                    <div className="relative aspect-[4/3] w-full">
                      <Image
                        src={m.image}
                        alt={m.imageAlt ?? m.name}
                        fill
                        sizes="(min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                        style={{
                          objectPosition: m.imageObjectPosition ?? "center",
                        }}
                      />
                    </div>
                  ) : (
                    <div
                      className="relative flex aspect-[4/3] w-full items-center justify-center border border-dashed"
                      style={{ borderColor: SAGE_LABEL }}
                    >
                      <p
                        className="font-inter text-[10px] font-light uppercase tracking-[0.32em]"
                        style={{ color: SAGE }}
                      >
                        Photo placeholder
                      </p>
                    </div>
                  )}
                  <div
                    className="px-6 pb-7 pt-6 sm:px-7 sm:pb-8 sm:pt-7"
                    style={{ backgroundColor: "#EAE0CF" }}
                  >
                    <h3 className="font-serif text-[24px] leading-tight text-charcoal sm:text-[28px]">
                      {m.name}
                    </h3>
                    <p
                      className="mt-1 font-inter text-[12px] font-light uppercase tracking-[0.18em]"
                      style={{ color: SAGE }}
                    >
                      {m.role}
                    </p>
                    <p className="mt-3 font-inter text-[14px] font-light leading-[1.7] text-charcoal-soft sm:text-[15px]">
                      {m.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* REVIEWS */}
        <section className="mx-auto max-w-[1320px] px-6 pb-20 sm:pb-24">
          <div
            className="mx-auto max-w-[1100px] border-t pt-12 sm:pt-14"
            style={{ borderColor: "rgba(28,26,23,0.18)" }}
          >
            <h2 className="text-center font-serif text-[32px] leading-[1.05] text-charcoal sm:text-[44px]">
              What patients <span className="font-serif-italic">say</span>
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {REVIEWS.map((r) => (
                <figure
                  key={r.author}
                  className="flex flex-col gap-5 border-l-2 bg-[#1C1A17] p-7"
                  style={{ borderColor: SAGE }}
                >
                  <span
                    className="font-inter text-[12px] tracking-[0.2em]"
                    style={{ color: SAGE }}
                  >
                    ★★★★★
                  </span>
                  <blockquote className="font-serif-italic text-[19px] leading-[1.4] text-cream-soft">
                    “{r.quote}”
                  </blockquote>
                  <figcaption className="mt-auto font-inter text-[12px] font-light uppercase tracking-[0.16em] text-cream-soft/65">
                    {r.author} <span style={{ color: SAGE_LABEL }}>·</span>{" "}
                    Google
                  </figcaption>
                </figure>
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
              Come <span className="font-serif-italic">see us.</span>
            </h2>
            <div className="mt-6 space-y-1 font-inter text-[15px] font-light text-charcoal-soft sm:text-[16px]">
              <p>930 SW Yates Dr, Bend, OR 97702</p>
              <p>Tue–Thu 8AM–5PM · Fri 8AM–1PM</p>
            </div>
            <p className="mx-auto mt-5 max-w-[440px] font-inter text-[14px] font-light leading-[1.7] text-warm-gray">
              New patients welcome. Same-day appointments available — just
              call.
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
