import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import {
  sedationDentistryPageSchema,
  sanitizeJsonLd,
} from "@/lib/schema";

const SAGE = "#6B7C5C";
const SAGE_LABEL = "#9CAF88";

export const metadata: Metadata = {
  title:
    "Sedation Dentistry — Living Dental Health, Bend Oregon",
  description:
    "Mild oral sedation with Halcion for anxious patients and oral surgery visits at Living Dental Health in Bend, Oregon. Calm pace, gentle approach, fully out of your system in about 24 hours.",
};

// PLACEHOLDER COPY — structured to show layout. Andy's voice fills the gaps.
const PHASES = [
  {
    id: "halcion",
    heading: "Halcion: Mild Oral Sedation",
    body:
      "Halcion is the brand name for triazolam — a mild oral sedative taken as a single pill before your appointment. You arrive at the office already deeply relaxed. Unlike IV sedation or general anesthesia, you stay conscious and responsive throughout the visit. It's a gentle option for patients who would benefit from taking the edge off. [PLACEHOLDER: Andy's voice on why he chose Halcion specifically.]",
    detail:
      "oral pill · taken before the visit · mild · conscious sedation",
  },
  {
    id: "experience",
    heading: "A Genuinely Nice Experience",
    body:
      "Halcion is genuinely nice — that's how Dr. Engel describes it. You feel relaxed, time softens, and the appointment passes quickly. In fact, many patients become so relaxed they end up taking a cozy nap in the chair. You're aware enough to respond if needed; calm enough that the visit doesn't feel like one. [PLACEHOLDER: Andy's voice on what patients commonly report.]",
    detail:
      "deeply relaxed · light sleep is common · awake and responsive",
  },
  {
    id: "calm-pace",
    heading: "A Calm Pace First, Always",
    body:
      "Sedation isn't our default — it's one tool. Most patients don't actually need a sedative. They need a dentist who doesn't rush, a team that doesn't make them feel judged, and an office that's quiet rather than clinical. That's how every visit at Living Dental Health is run, sedation or no sedation. [PLACEHOLDER: Andy's voice on the practice culture and how the team approaches anxious patients.]",
    detail:
      "unhurried care · no judgment · sedation only when it makes sense",
  },
  {
    id: "twenty-four-hours",
    heading: "Out of Your System by Tomorrow",
    body:
      "Halcion is short-acting. It's generally cleared from your system within about 24 hours of the dose, so you're back to yourself the next day. You will need a responsible adult to drive you to and from the appointment and stay with you for the rest of the day — that's the standard of care for any oral sedation. [PLACEHOLDER: Andy's voice on aftercare specifics.]",
    detail:
      "~24-hour clearance · no driving same day · ride home required",
  },
];

const CONCERNS = [
  "I get anxious just thinking about the dentist",
  "I've been putting off care I know I need",
  "Past dental experiences were painful or rushed",
  "I'm scheduled for oral surgery",
  "I have a strong gag reflex",
  "It's hard for me to sit still for long procedures",
  "I want a calmer experience but I'm not sure I need sedation",
  "I don't want to be 'out' for hours",
];

const FAQ = [
  {
    q: "What is Halcion and how does it work?",
    a: "Halcion is the brand name for triazolam, a mild oral sedative in the benzodiazepine class. You take it as a pill before your appointment so you arrive already relaxed. You stay conscious and can respond to instructions, but most patients feel calm enough to rest comfortably — many end up taking a cozy nap in the chair.",
  },
  {
    q: "How long does Halcion stay in my system?",
    a: "Halcion is short-acting and generally clears your body within about 24 hours. You'll feel like yourself by the next day. Don't drive, operate machinery, or make important decisions for the rest of the day after taking it.",
  },
  {
    q: "Will I need someone to drive me home?",
    a: "Yes. Because Halcion is active for several hours after the appointment, every patient who takes oral sedation needs a responsible adult to drive them to and from Living Dental Health and stay with them for the rest of the day.",
  },
];

export default function SedationDentistryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            sanitizeJsonLd(sedationDentistryPageSchema)
          ),
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
            <li style={{ color: SAGE }}>Sedation Dentistry</li>
          </ol>
        </nav>

        {/* HERO */}
        <div className="relative">
          <div className="px-6 pt-6 pb-10 text-center lg:absolute lg:inset-0 lg:z-10 lg:flex lg:items-center lg:py-0 lg:text-left">
            <div className="mx-auto w-full max-w-[1320px] lg:px-6">
              <div className="lg:max-w-[560px]">
                <p
                  className="font-inter text-[11px] font-light uppercase tracking-widest"
                  style={{ color: SAGE }}
                >
                  &mdash; sedation &amp; comfort &mdash;
                </p>
                <h1 className="mt-5 font-serif text-[40px] leading-[1.05] text-charcoal sm:text-[56px] lg:text-[64px]">
                  A calmer{" "}
                  <span className="font-serif-italic">way through.</span>
                </h1>
                <p className="mx-auto mt-5 max-w-[560px] font-inter text-[15px] font-light leading-[1.7] text-warm-gray sm:text-[17px] lg:mx-0 lg:max-w-[460px]">
                  Mild oral sedation with Halcion, used selectively, alongside
                  a calm and unhurried approach that&rsquo;s standard at
                  Living Dental Health. You arrive relaxed, the visit passes
                  quickly, and you&rsquo;re back to yourself by tomorrow.
                </p>
              </div>
            </div>
          </div>

          <div className="relative h-[380px] w-full overflow-hidden sm:h-[460px] lg:h-[55vh] lg:min-h-[560px] lg:max-h-[760px]">
            {/* PLACEHOLDER IMAGE — patient-info-hero shows a relaxed patient chatting with Dr. Andy and a team member; swap when a dedicated sedation photo exists */}
            <Image
              src="/patient-info-hero.webp"
              alt="Dr. Andy Engel and a team member chatting with a relaxed patient at Living Dental Health in Bend, Oregon"
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

        {/* INTRO — the "calm pace first" philosophy */}
        <section className="mx-auto max-w-[1320px] px-6 pb-16 sm:pb-20">
          <div
            className="mx-auto max-w-[720px] border-t pt-12 sm:pt-14"
            style={{ borderColor: "rgba(28,26,23,0.18)" }}
          >
            <p className="font-inter text-[15px] font-light leading-[1.75] text-charcoal-soft sm:text-[16px]">
              Dental anxiety is real. So is the relief of finding a practice
              that actually slows down. At Living Dental Health, sedation
              isn&rsquo;t a default &mdash; it&rsquo;s one tool we offer when
              it makes sense. For many patients, what genuinely helps is a
              calm pace, a team that doesn&rsquo;t make you feel rushed or
              judged, and a dentist who explains what&rsquo;s happening
              before it happens. When something more is helpful, Dr. Engel
              uses Halcion, a mild oral sedative he describes as
              &ldquo;genuinely nice.&rdquo; [PLACEHOLDER: Andy&rsquo;s voice
              on the practice&rsquo;s approach to anxious patients.]
            </p>
          </div>
        </section>

        {/* PHASES — 2-up mocha panel grid */}
        <section className="mx-auto max-w-[1320px] px-6 pb-20 sm:pb-24">
          <div className="mx-auto grid max-w-[1100px] gap-4 sm:gap-6 md:grid-cols-2">
            {PHASES.map((s, i) => (
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
                  0{i + 1} &nbsp;/&nbsp; 0{PHASES.length}
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

        {/* COMMON CONCERNS */}
        <section className="mx-auto max-w-[1320px] px-6 pb-20 sm:pb-24">
          <div
            className="mx-auto max-w-[1100px] border-t pt-12 sm:pt-14"
            style={{ borderColor: "rgba(28,26,23,0.18)" }}
          >
            <h2 className="font-serif text-[32px] leading-[1.05] text-charcoal sm:text-[44px]">
              If any of this sounds{" "}
              <span className="font-serif-italic">like you</span>
            </h2>
            <ul className="mt-8 grid gap-x-12 gap-y-4 sm:grid-cols-2">
              {CONCERNS.map((c) => (
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

        {/* TRUST BLOCK — no rush, no judgment */}
        <section className="mx-auto max-w-[1320px] px-6 pb-20 sm:pb-24">
          <div
            className="mx-auto max-w-[860px] p-10 text-center sm:p-16"
            style={{ backgroundColor: SAGE, color: "#F5F0E8" }}
          >
            <h2 className="font-serif text-[36px] leading-[1.05] sm:text-[52px]">
              No rush.{" "}
              <span className="font-serif-italic">No judgment.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-[620px] font-inter text-[15px] font-light leading-[1.75] sm:text-[16px]">
              If it&rsquo;s been years since your last visit, or if past
              dental work was rough on you, you&rsquo;re welcome here. The
              team takes time to learn what you&rsquo;ve been through and
              what would help you feel comfortable. Sedation is part of
              that toolkit when it&rsquo;s appropriate. So is going slowly,
              explaining each step, and never making you feel rushed.
              [PLACEHOLDER: Andy&rsquo;s voice on what patients should
              expect from a first visit when they&rsquo;re anxious.]
            </p>
          </div>
        </section>

        {/* RELATED — bridge to oral surgery / implants */}
        <section className="mx-auto max-w-[1320px] px-6 pb-20 sm:pb-24">
          <div
            className="mx-auto max-w-[720px] border-t pt-12 sm:pt-14"
            style={{ borderColor: "rgba(28,26,23,0.18)" }}
          >
            <h2 className="font-serif text-[28px] leading-[1.05] text-charcoal sm:text-[36px]">
              Coming in for{" "}
              <span className="font-serif-italic">oral surgery?</span>
            </h2>
            <p className="mt-6 font-inter text-[15px] font-light leading-[1.75] text-charcoal-soft sm:text-[16px]">
              Halcion is a common addition to oral surgery procedures at
              Living Dental Health &mdash; wisdom teeth removal, dental
              implants, tissue and bone grafting. Dr. Engel will discuss
              whether sedation is appropriate during your consultation and
              what to expect on the day of surgery.{" "}
              <Link
                href="/implants-surgery"
                className="underline underline-offset-4 transition-opacity hover:opacity-70"
                style={{ color: SAGE }}
              >
                Implants &amp; surgery details →
              </Link>
            </p>
          </div>
        </section>

        {/* FAQ */}
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
              Let&rsquo;s{" "}
              <span className="font-serif-italic">make a plan.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-[480px] font-inter text-[15px] font-light leading-[1.7] text-warm-gray sm:text-[16px]">
              Call to talk through what would help you feel comfortable.
              Whether you need sedation, a calmer pace, or just someone
              who&rsquo;ll listen first &mdash; you&rsquo;re welcome here.
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
