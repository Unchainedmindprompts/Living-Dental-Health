import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";

const SAGE = "#6B7C5C";
const SAGE_LABEL = "#9CAF88";

export const metadata: Metadata = {
  title: "Meet the Team — Living Dental Health, Bend Oregon",
  description:
    "Meet Dr. Andy Engel and the Living Dental Health team in Bend, Oregon. Twenty-eight years of personalized dental care, the same faces, and a commitment to knowing every patient by name.",
};

const CREDENTIALS = [
  "Doctor of Dental Medicine, OHSU 1998",
  "Advanced training: Full Mouth Reconstruction",
  "Advanced training: Oral Surgery",
  "Advanced training: Implants & Bone Grafting",
  "Certified ClearCorrect Provider",
  "Founder, Living Dental Health 2013",
  "28 years serving Bend, Oregon",
  "Accepting patients ages 12 and up",
];

const FUN_FACTS = [
  "Skis moguls at Mt. Bachelor",
  "Motorsports enthusiast",
  "Corgi dad (Murphy)",
  "Almost chose the Olympics over dentistry",
];

const TEAM: {
  name: string;
  role: string;
  bio: string;
  image?: string;
  imageAlt?: string;
}[] = [
  {
    name: "Samantha Gassman",
    role: "Office Manager",
    bio: "Samantha keeps Living Dental Health running smoothly. From scheduling to insurance to making sure every patient feels welcome the moment they walk in, she’s the steady hand behind the front office. [Full bio coming soon]",
    image: "/team-samantha.webp",
    imageAlt:
      "Samantha Gassman, Office Manager at Living Dental Health in Bend, Oregon",
  },
  {
    name: "Francie Engel",
    role: "Operations Administrator",
    bio: "Francie handles operations behind the scenes at Living Dental Health. [Full bio coming soon]",
    image: "/team-francie.webp",
    imageAlt:
      "Francie Engel, Operations Administrator at Living Dental Health in Bend, Oregon",
  },
  {
    name: "Nicole Tarpey",
    role: "Dental Hygienist",
    bio: "Nicole is one of the gentle, detail-oriented hygienists who make cleanings at Living Dental Health something patients actually look forward to. [Full bio coming soon]",
    image: "/team-nicole.webp",
    imageAlt:
      "Nicole Tarpey, Dental Hygienist at Living Dental Health in Bend, Oregon",
  },
  {
    name: "Sacha Lodge",
    role: "Dental Hygienist",
    bio: "Sacha brings warmth and a steady hand to every cleaning and periodontal visit. [Full bio coming soon]",
    image: "/team-sacha.webp",
    imageAlt:
      "Sacha Lodge, Dental Hygienist at Living Dental Health in Bend, Oregon",
  },
  {
    name: "Christy Spencer",
    role: "Dental Assistant",
    bio: "Christy works chairside with Dr. Andy, making sure every procedure runs smoothly and every patient feels comfortable from start to finish. [Full bio coming soon]",
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

        {/* HEADER */}
        <section className="mx-auto max-w-[1320px] px-6 pt-8 pb-10 text-center sm:pt-12">
          <p
            className="font-inter text-[11px] font-light uppercase tracking-widest"
            style={{ color: SAGE }}
          >
            &mdash; the people behind your smile &mdash;
          </p>
          <h1 className="mt-5 font-serif text-[44px] leading-[1.02] text-charcoal sm:mt-6 sm:text-[72px] md:text-[88px]">
            Meet the <span className="font-serif-italic">team.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-[600px] font-inter text-[16px] font-light leading-[1.7] text-warm-gray sm:text-[18px]">
            Twenty-eight years in Bend. The same faces, the same care, the
            same commitment to knowing you by name.
          </p>
          <p className="mt-7 font-inter text-[12px] font-light uppercase tracking-[0.2em] text-charcoal-soft">
            28 years in Bend <span style={{ color: SAGE_LABEL }}>·</span> 4.9
            ★ <span style={{ color: SAGE_LABEL }}>·</span> 211 Google reviews
          </p>
        </section>

        {/* HERO — placeholder (warm editorial team / office photo) */}
        <div
          className="relative flex h-[320px] w-full items-center justify-center overflow-hidden border-y border-dashed bg-cream-deep md:h-[480px]"
          style={{ borderColor: SAGE_LABEL }}
        >
          <div className="px-6 text-center">
            <p
              className="font-inter text-[10px] font-light uppercase tracking-[0.32em]"
              style={{ color: SAGE }}
            >
              Hero photo placeholder
            </p>
            <p className="mx-auto mt-3 max-w-[460px] font-serif-italic text-[15px] leading-[1.45] text-warm-gray">
              Warm editorial team or office photo &mdash; full-bleed (to be
              generated)
            </p>
          </div>
        </div>

        {/* HOW WE WORK */}
        <section className="mx-auto max-w-[1320px] px-6 pt-16 pb-16 sm:pt-20 sm:pb-20">
          <div className="mx-auto max-w-[720px] text-center">
            <h2 className="font-serif text-[32px] leading-[1.05] text-charcoal sm:text-[44px]">
              How we <span className="font-serif-italic">work</span>
            </h2>
            <p className="mt-6 font-inter text-[15px] font-light leading-[1.8] text-charcoal-soft sm:text-[17px]">
              Dr. Engel is a bit of a detective. He listens first, asks
              questions, and spends time understanding your goals before
              recommending anything. No cookie-cutter treatment plans. No
              procedures you didn’t ask for. Just honest, personalized care
              from a team that wants to know you on a first-name basis — and
              say hi when they see you at Mt. Bachelor.
            </p>
          </div>
        </section>

        {/* DR. ANDY ENGEL */}
        <section className="mx-auto max-w-[1320px] px-6 pb-20 sm:pb-24">
          <div
            className="mx-auto max-w-[1100px] border-t pt-12 sm:pt-14"
            style={{ borderColor: "rgba(28,26,23,0.18)" }}
          >
            <div className="grid gap-10 lg:grid-cols-[auto_1fr] lg:items-start lg:gap-16">
              <div className="relative mx-auto aspect-[4/5] w-full max-w-[340px] overflow-hidden rounded-xl bg-cream-deep sm:max-w-[400px] lg:mx-0 lg:w-[400px]">
                <Image
                  src="/dr-andy.webp"
                  alt="Dr. Andy Engel DMD founder of Living Dental Health Bend Oregon"
                  fill
                  sizes="(min-width: 1024px) 400px, (min-width: 640px) 400px, 340px"
                  className="object-cover object-center"
                />
              </div>

              <div>
                <p
                  className="font-inter text-[11px] font-light uppercase tracking-widest"
                  style={{ color: SAGE }}
                >
                  Meet your dentist
                </p>
                <h2 className="mt-4 font-serif text-[32px] leading-[1.05] text-charcoal sm:text-[44px]">
                  Dr. Andrew W. <span className="font-serif-italic">Engel</span>
                  , DMD
                </h2>
                <p className="mt-2 font-inter text-[13px] font-light uppercase tracking-[0.18em] text-warm-gray">
                  Known to patients as Dr. Andy
                </p>

                <div className="mt-6 space-y-5 font-inter text-[15px] font-light leading-[1.75] text-charcoal-soft sm:text-[16px]">
                  <p>
                    Dr. Andy grew up in Boise, Idaho before his family
                    relocated to Oregon in 1988. He knew he wanted to be a
                    dentist in the eighth grade — he loved fixing things and
                    wanted to help people. That combination led him straight
                    to Oregon Health Sciences University, where he graduated
                    early and pursued advanced training in full mouth
                    reconstruction, oral surgery, implants, ClearCorrect, and
                    tissue and bone grafting.
                  </p>
                  <p>
                    He moved to Bend in 1998, helped establish Century Dental
                    Group, then founded Living Dental Health in 2013 to
                    fulfill a lifelong goal of building something of his own.
                    In 28 years of practice he has become one of Central
                    Oregon’s most trusted dentists for complex cases — the
                    kind most general dentists refer out. Dr. Andy does them
                    here.
                  </p>
                  <p>
                    His approach is simple: listen first, never rush a patient
                    through a decision, and build a relationship that lasts.
                    His dream patient is a good communicator — someone he can
                    work with as a team and wave to around town.
                  </p>
                  <p>
                    When he’s not in the office you might find him skiing
                    moguls at Mt. Bachelor, out on one of his motorcycles, or
                    at home with wife Francie, son Sean, daughters Ally and
                    Rhone, and Murphy the Corgi.
                  </p>
                </div>

                {/* Credentials */}
                <div
                  className="mt-10 border-t pt-8"
                  style={{ borderColor: "rgba(28,26,23,0.14)" }}
                >
                  <p
                    className="font-inter text-[11px] font-light uppercase tracking-widest"
                    style={{ color: SAGE }}
                  >
                    Credentials
                  </p>
                  <ul className="mt-5 grid gap-x-10 gap-y-3 sm:grid-cols-2">
                    {CREDENTIALS.map((c) => (
                      <li
                        key={c}
                        className="flex items-baseline gap-3 font-inter text-[14px] font-light text-charcoal-soft sm:text-[15px]"
                      >
                        <span
                          aria-hidden
                          className="text-[11px]"
                          style={{ color: SAGE }}
                        >
                          ✦
                        </span>
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Fun facts */}
                <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
                  {FUN_FACTS.map((f) => (
                    <li
                      key={f}
                      className="font-serif-italic text-[15px]"
                      style={{ color: SAGE }}
                    >
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
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
                <div key={m.name}>
                  {m.image ? (
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-cream-deep">
                      <Image
                        src={m.image}
                        alt={m.imageAlt ?? m.name}
                        fill
                        sizes="(min-width: 640px) 50vw, 100vw"
                        className="object-cover object-center"
                      />
                    </div>
                  ) : (
                    <div
                      className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-xl border border-dashed bg-cream-deep"
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
                  <h3 className="mt-5 font-serif text-[24px] leading-tight text-charcoal sm:text-[28px]">
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
                  className="flex flex-col gap-5 border-l-2 bg-cream p-7"
                  style={{ borderColor: SAGE }}
                >
                  <span
                    className="font-inter text-[12px] tracking-[0.2em]"
                    style={{ color: SAGE }}
                  >
                    ★★★★★
                  </span>
                  <blockquote className="font-serif-italic text-[19px] leading-[1.4] text-charcoal">
                    “{r.quote}”
                  </blockquote>
                  <figcaption className="mt-auto font-inter text-[12px] font-light uppercase tracking-[0.16em] text-warm-gray">
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
  );
}
