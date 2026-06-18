import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import {
  oralCancerScreeningPageSchema,
  sanitizeJsonLd,
} from "@/lib/schema";

const SAGE = "#6B7C5C";
const SAGE_LABEL = "#9CAF88";

export const metadata: Metadata = {
  title:
    "Oral Cancer Screening — Living Dental Health, Bend Oregon",
  description:
    "Routine oral cancer screening at every cleaning at Living Dental Health, Bend Oregon. Painless, one minute, and dramatically improves early outcomes.",
};

const PHASES = [
  {
    id: "what-we-look-for",
    heading: "What We Look For",
    body:
      "Dr. Engel and the hygiene team examine your lips, tongue, the inside of your cheeks, the roof and floor of your mouth, your throat, and the lymph nodes in your neck. We're looking for sores that haven't healed, white or red patches, lumps or thickening of tissue, asymmetry, and anything that has changed since your last visit. Most patients don't notice it's happening — it's built into the routine exam. [PLACEHOLDER: Andy's voice on the specific checks he performs.]",
    detail:
      "lips · tongue · cheeks · palate · throat · neck lymph nodes",
  },
  {
    id: "why-early-matters",
    heading: "Why Early Matters",
    body:
      "Oral cancer is one of the most treatable cancers when caught early — and one of the least when caught late. Survival rates for oral and oropharyngeal cancer detected at a localized stage are dramatically higher than for cancer that has already spread. Most patients have no symptoms in the early stages. That's why a one-minute visual exam at every cleaning is one of the highest-leverage things we do. [PLACEHOLDER: Andy's voice on cases he has caught early and why he prioritizes this exam.]",
    detail:
      "early detection saves lives · most early cases have no symptoms",
  },
  {
    id: "what-it-involves",
    heading: "What the Screening Involves",
    body:
      "The exam takes about one to two minutes and is completely painless. It's a careful visual inspection combined with gentle palpation — feeling the tissues in and around your mouth and neck for anything unusual. There are no special tools required, no biopsy, and no preparation. It's part of the same appointment as your cleaning. [PLACEHOLDER: Andy's voice on tools used (e.g., VELscope) if any.]",
    detail:
      "1–2 minutes · painless · visual + palpation · part of every cleaning",
  },
  {
    id: "higher-risk",
    heading: "Who's at Higher Risk",
    body:
      "Tobacco use of any form — cigarettes, cigars, pipes, chew, vaping — is the largest risk factor. Heavy alcohol use, HPV infection, prolonged sun exposure to the lips, and being over age 40 also raise risk. That said, oral cancer can appear in patients with no risk factors at all, which is exactly why we screen every patient at every visit. [PLACEHOLDER: Andy's voice on what he tells higher-risk patients.]",
    detail:
      "tobacco · heavy alcohol · HPV · sun exposure · age 40+",
  },
];

const CONCERNS = [
  "A sore in your mouth that hasn't healed in two weeks",
  "A white or red patch inside the mouth",
  "A lump or thickening in your cheek, lip, or neck",
  "Persistent sore throat or hoarseness",
  "Difficulty chewing or swallowing",
  "Numbness in part of your face or mouth",
  "A bump that bleeds easily and won't go away",
  "Ear pain that comes from one side only",
];

const FAQ = [
  {
    q: "Is oral cancer screening part of a normal dental exam?",
    a: "Yes. At Living Dental Health, oral cancer screening is part of every routine cleaning and exam. Most patients aren't aware it's happening — it's built into the normal visit.",
  },
  {
    q: "What does the dentist look for during an oral cancer screening?",
    a: "Dr. Engel and the hygiene team look for sores that haven't healed, white or red patches, lumps or thickening of tissue, unusual asymmetry, and any changes in the lips, tongue, cheeks, palate, throat, or neck. The exam includes both visual inspection and gentle palpation.",
  },
  {
    q: "Does an oral cancer screening hurt?",
    a: "No. The screening is painless and takes about one to two minutes. It's a visual examination combined with gentle palpation of the tissues in and around the mouth and neck.",
  },
  {
    q: "Who is at higher risk for oral cancer?",
    a: "Tobacco use of any kind, heavy alcohol use, HPV infection, prolonged sun exposure to the lips, and being over age 40 are all risk factors. That said, oral cancer can occur in patients with no risk factors at all, which is why routine screening matters for everyone.",
  },
];

export default function OralCancerScreeningPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            sanitizeJsonLd(oralCancerScreeningPageSchema)
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
            <li style={{ color: SAGE }}>Oral Cancer Screening</li>
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
                  &mdash; oral cancer screening &mdash;
                </p>
                <h1 className="mt-5 font-serif text-[40px] leading-[1.05] text-charcoal sm:text-[56px] lg:text-[64px]">
                  Early. Painless.{" "}
                  <span className="font-serif-italic">Every visit.</span>
                </h1>
                <p className="mx-auto mt-5 max-w-[560px] font-inter text-[15px] font-light leading-[1.7] text-charcoal-soft sm:text-[17px] lg:mx-0 lg:max-w-[460px]">
                  Oral cancer screening is part of every cleaning and exam at
                  Living Dental Health &mdash; a quick, painless check that
                  most patients don&rsquo;t even realize is happening. When
                  oral cancer is caught early, it&rsquo;s one of the most
                  treatable. When it&rsquo;s missed, it&rsquo;s one of the
                  least.
                </p>
              </div>
            </div>
          </div>

          <div className="relative h-[380px] w-full overflow-hidden sm:h-[460px] lg:h-[55vh] lg:min-h-[560px] lg:max-h-[760px]">
            {/* PLACEHOLDER IMAGE — service-preventive shows a hygienist with a patient in the cleaning chair, which is where screening happens */}
            <Image
              src="/service-preventive.webp"
              alt="A dental hygienist at Living Dental Health caring for a patient in the cleaning chair in Bend, Oregon"
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
              Most cases of oral cancer in their earliest stages have no
              symptoms at all. No pain, no obvious change, nothing the
              patient would notice. That&rsquo;s precisely why a one-minute
              visual exam at every cleaning is one of the most important
              parts of a routine dental visit. Dr. Engel performs an oral
              cancer screening on every patient, every time &mdash; whether
              you&rsquo;re a long-term patient he&rsquo;s known for years
              or you&rsquo;re sitting in his chair for the first time.
              [PLACEHOLDER: Andy&rsquo;s voice on why he never skips this
              step.]
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

        {/* SIGNS TO WATCH FOR */}
        <section className="mx-auto max-w-[1320px] px-6 pb-20 sm:pb-24">
          <div
            className="mx-auto max-w-[1100px] border-t pt-12 sm:pt-14"
            style={{ borderColor: "rgba(28,26,23,0.18)" }}
          >
            <h2 className="font-serif text-[32px] leading-[1.05] text-charcoal sm:text-[44px]">
              Signs worth a{" "}
              <span className="font-serif-italic">closer look</span>
            </h2>
            <p className="mt-6 max-w-[720px] font-inter text-[15px] font-light leading-[1.75] text-charcoal-soft sm:text-[16px]">
              Most of these have nothing to do with cancer &mdash;
              they&rsquo;re common, treatable, and often resolve on their
              own. But any of them that lasts more than two weeks deserves
              a check.
            </p>
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

        {/* TRUST BLOCK */}
        <section className="mx-auto max-w-[1320px] px-6 pb-20 sm:pb-24">
          <div
            className="mx-auto max-w-[860px] p-10 text-center sm:p-16"
            style={{ backgroundColor: SAGE, color: "#F5F0E8" }}
          >
            <h2 className="font-serif text-[36px] leading-[1.05] sm:text-[52px]">
              Every visit.{" "}
              <span className="font-serif-italic">Every time.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-[620px] font-inter text-[15px] font-light leading-[1.75] sm:text-[16px]">
              Oral cancer screening isn&rsquo;t something we charge for
              separately or recommend you add on. It&rsquo;s a built-in
              part of every cleaning and exam at Living Dental Health,
              for every patient, regardless of age or risk profile. One
              minute of careful attention. The kind of preventive work
              that doesn&rsquo;t make the bill bigger but absolutely could
              change a life.
            </p>
          </div>
        </section>

        {/* RELATED — bridge to general dentistry */}
        <section className="mx-auto max-w-[1320px] px-6 pb-20 sm:pb-24">
          <div
            className="mx-auto max-w-[720px] border-t pt-12 sm:pt-14"
            style={{ borderColor: "rgba(28,26,23,0.18)" }}
          >
            <h2 className="font-serif text-[28px] leading-[1.05] text-charcoal sm:text-[36px]">
              Part of your{" "}
              <span className="font-serif-italic">regular cleaning</span>
            </h2>
            <p className="mt-6 font-inter text-[15px] font-light leading-[1.75] text-charcoal-soft sm:text-[16px]">
              The screening happens during the same appointment as your
              cleaning and exam &mdash; no separate visit needed. The
              easiest way to stay on top of it is to keep your every-six-
              months schedule.{" "}
              <Link
                href="/general-dentistry"
                className="underline underline-offset-4 transition-opacity hover:opacity-70"
                style={{ color: SAGE }}
              >
                General dentistry details →
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
              Due for your{" "}
              <span className="font-serif-italic">next cleaning?</span>
            </h2>
            <p className="mx-auto mt-5 max-w-[480px] font-inter text-[15px] font-light leading-[1.7] text-warm-gray sm:text-[16px]">
              Your screening happens at the same visit. If it&rsquo;s been
              a while, no judgment &mdash; just call.
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
