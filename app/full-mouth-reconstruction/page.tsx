import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import {
  fullMouthReconstructionPageSchema,
  sanitizeJsonLd,
} from "@/lib/schema";

const SAGE = "#6B7C5C";
const SAGE_LABEL = "#9CAF88";

export const metadata: Metadata = {
  title: "Full Mouth Reconstruction — Living Dental Health, Bend",
  description:
    "Full mouth reconstruction in Bend, Oregon with Dr. Andy Engel. Over 4,000 CE hours and precision planning that protects your bite, jaw, and oral health.",
};

// PLACEHOLDER COPY — structured to show layout. Replace with Andy's voice once layout is approved.
const PHASES = [
  {
    id: "diagnosis",
    heading: "Comprehensive Diagnosis",
    body:
      "Every reconstruction begins long before any treatment. Dr. Engel performs a complete evaluation of every tooth, the surrounding bone, the gums, and — critically — the bite. Diagnosis is supported by in-house CBCT 3D imaging — a cone-beam CT scan that produces a true three-dimensional model of the teeth, jaw, and bone, well beyond what a flat panoramic X-ray can show. He maps how the upper and lower teeth meet, where wear patterns came from, and what the rebuild needs to do for the mouth to function properly again. [PLACEHOLDER: Andy's voice on the diagnostic process.]",
    detail:
      "full mouth evaluation · bite analysis · in-house CBCT 3D imaging · written treatment plan",
  },
  {
    id: "planning",
    heading: "Precision Planning",
    body:
      "This is where reconstruction succeeds or fails. Andy maps the final result first — the exact bite, the tooth proportions, the muscle and joint relationships — and reverse-engineers the work from there. A reconstruction without this step is a series of procedures hoping to add up. With it, every implant, crown, and graft has a single coordinated target. [PLACEHOLDER: Andy's voice on the planning step and why it's the difference.]",
    detail:
      "reverse-engineered from the bite · coordinated multi-procedure plan · written and reviewed with you",
  },
  {
    id: "implants-grafting",
    heading: "Implants & Grafting",
    body:
      "For patients missing teeth or with bone loss, structural work comes first. Dr. Engel places implants and performs bone and tissue grafting in-house — work that many practices refer out. Keeping the work under one roof means the same dentist who planned the rebuild executes the foundation. [PLACEHOLDER: Andy's voice on his surgical training and what makes in-house grafting different.]",
    detail:
      "dental implants · bone grafting · tissue grafting · all performed in-house",
  },
  {
    id: "crowns-veneers",
    heading: "Crowns & Veneers",
    body:
      "Once the foundation is set, the visible smile is rebuilt with crowns and veneers designed to match the planned bite and your facial proportions. Andy designs each piece to function correctly first, look right second — the order matters, and getting the order wrong is how patients end up with cosmetic work that breaks down within a few years. [PLACEHOLDER: Andy's voice on materials, ceramicists, and the design process.]",
    detail:
      "porcelain crowns · veneers · designed to the planned bite · long-lasting materials",
  },
  {
    id: "bite-calibration",
    heading: "Bite Calibration",
    body:
      "This is the step that separates a real reconstruction from cosmetic dentistry that looks good for a year and causes problems for a decade. A poorly calibrated bite can cause TMJ pain, chronic headaches, speech changes, and difficulty chewing. Andy spends real time here, in multiple short appointments, refining how the teeth meet until the entire system is in balance. [PLACEHOLDER: Andy's voice on how he calibrates and how patients can tell when it's right.]",
    detail:
      "TMJ-aware adjustment · multi-visit refinement · the precision step that protects your investment",
  },
  {
    id: "long-term",
    heading: "Long-Term Maintenance",
    body:
      "A well-done reconstruction can last decades — but it needs maintenance the way any precision system does. Dr. Engel and the hygiene team see reconstruction patients on a tailored schedule, watch for early signs of trouble, and make small adjustments before they become problems. [PLACEHOLDER: Andy's voice on the recall schedule, nightguards, and what patients should watch for.]",
    detail:
      "tailored recall schedule · nightguard if needed · early adjustments before issues",
  },
];

const CONCERNS = [
  "Severely worn or ground-down teeth",
  "Multiple missing teeth",
  "Past dental work that's failing",
  "TMJ pain or chronic headaches",
  "Speech difficulties from past reconstruction",
  "Difficulty chewing",
  "Bone loss in the upper or lower jaw",
  "Low confidence in your smile",
];

const FAQ = [
  {
    q: "What is full mouth reconstruction?",
    a: "Full mouth reconstruction is a comprehensive process of rebuilding the teeth, bite, and oral function for patients with severe wear, multiple missing teeth, bone loss, or failed past dental work. It commonly combines dental implants, bone and tissue grafting, crowns, veneers, and precise bite calibration into a coordinated treatment plan.",
  },
  {
    q: "Does Dr. Andy Engel perform full mouth reconstruction in Bend, Oregon?",
    a: "Yes. Dr. Andy Engel performs full mouth reconstruction in-house at Living Dental Health in Bend, Oregon. He has completed advanced training at Oregon Health Sciences University and over 4,000 hours of continuing education in smile design, cosmetic dentistry, and full mouth reconstruction.",
  },
  {
    q: "Why does precision matter in full mouth reconstruction?",
    a: "A poorly executed reconstruction can cause TMJ pain, chronic headaches, speech difficulties, and chewing problems. The bite must be calibrated with precision so the new teeth function in harmony with the jaw joints, muscles, and surrounding teeth. This is why Dr. Engel approaches each case as a planning exercise before any treatment begins.",
  },
];

export default function FullMouthReconstructionPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            sanitizeJsonLd(fullMouthReconstructionPageSchema)
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
            <li style={{ color: SAGE }}>Full Mouth Reconstruction</li>
          </ol>
        </nav>

        {/* HERO — the photo has the eyebrow, headline, and supporting copy
            baked into the design on desktop. Overlay text only renders on
            mobile (where the photo is cropped to just Dr. Engel and the
            patient via object-[74%_center]). */}
        <div className="relative">
          <div className="px-6 pt-6 pb-10 text-center lg:hidden">
            <div className="mx-auto w-full max-w-[1320px]">
              <p
                className="font-inter text-[11px] font-light uppercase tracking-widest"
                style={{ color: SAGE }}
              >
                &mdash; full mouth reconstruction &mdash;
              </p>
              <h1 className="mt-5 font-serif text-[40px] leading-[1.05] text-charcoal sm:text-[56px]">
                Built right,{" "}
                <span className="font-serif-italic">the first time.</span>
              </h1>
              <p className="mx-auto mt-5 max-w-[560px] font-inter text-[15px] font-light leading-[1.7] text-charcoal-soft sm:text-[17px]">
                Full mouth reconstruction is a precise endeavor. A poorly
                executed rebuild causes TMJ pain, headaches, speech
                difficulties, and chewing problems &mdash; for life. Dr.
                Engel has spent over 4,000 hours of continuing education
                learning how to do it right.
              </p>
            </div>
          </div>

          <div className="relative h-[380px] w-full overflow-hidden sm:h-[460px] lg:h-[55vh] lg:min-h-[560px] lg:max-h-[760px]">
            <Image
              src="/fmr-hero.webp"
              alt="Dr. Andy Engel in conversation with a patient at Living Dental Health in Bend, Oregon, beside the hero text: Built right, the first time. Full mouth reconstruction is a precise endeavor. A poorly executed rebuild causes TMJ pain, headaches, speech difficulties, and chewing problems — for life. Dr. Engel has spent over 4,000 hours of continuing education learning how to do it right."
              fill
              priority
              sizes="100vw"
              className="object-cover object-[74%_center] lg:object-center"
            />
          </div>
        </div>

        {/* INTRO — the "ground down over 20-30 years" framing */}
        <section className="mx-auto max-w-[1320px] px-6 pb-16 sm:pb-20">
          <div
            className="mx-auto max-w-[720px] border-t pt-12 sm:pt-14"
            style={{ borderColor: "rgba(28,26,23,0.18)" }}
          >
            <p className="font-inter text-[15px] font-light leading-[1.75] text-charcoal-soft sm:text-[16px]">
              Picture a patient who has ground down their teeth over the
              last twenty or thirty years. There&rsquo;s still enough bone
              and there are still enough teeth to rebuild — but the bite
              has shifted, the muscles have adapted around it, and the jaw
              joints have learned to work in a way that isn&rsquo;t
              healthy. Reconstructing that mouth without precision
              doesn&rsquo;t fix the problem. It locks the problem in.
              That&rsquo;s why every full mouth reconstruction at Living
              Dental Health begins as a planning exercise — not a procedure.
            </p>
          </div>
        </section>

        {/* THE TRAINING — prosthodontist mentorship, the page's lead
            credibility proof. Placed after the problem framing and before
            the phases so it earns the walkthrough that follows. */}
        <section className="mx-auto max-w-[1320px] px-6 pb-16 sm:pb-20">
          <div
            className="mx-auto max-w-[820px] border-l-2 pl-6 sm:pl-10"
            style={{ borderColor: SAGE }}
          >
            <p
              className="font-inter text-[11px] font-light uppercase tracking-widest"
              style={{ color: SAGE }}
            >
              &mdash; the training &mdash;
            </p>
            <h2 className="mt-4 font-serif text-[30px] leading-[1.08] text-charcoal sm:text-[40px] md:text-[44px]">
              Trained beside a{" "}
              <span className="font-serif-italic">prosthodontist.</span>
            </h2>
            <div className="mt-6 space-y-5 font-inter text-[15px] font-light leading-[1.75] text-charcoal-soft sm:text-[16px]">
              <p>
                Full mouth reconstruction isn&rsquo;t a single procedure
                &mdash; it&rsquo;s getting the whole system right: how your
                teeth meet, how your bite distributes force, how every crown,
                veneer, and implant works together so the result lasts and
                feels natural instead of merely looking acceptable. It&rsquo;s
                the hardest thing to get right in dentistry, and it&rsquo;s
                where rebuilds most often fail in less experienced hands
                &mdash; a bite that&rsquo;s &ldquo;off,&rdquo; restorations
                that wear out early, work that has to be redone.
              </p>
              <p>
                During his training, Dr. Engel had a rare opportunity: he
                worked directly alongside a prosthodontist &mdash; the
                specialist whose entire focus is rebuilding how the mouth fits
                and functions, from the bite to the full structure of the
                teeth. He learned the discipline the way it&rsquo;s actually
                mastered: not from a textbook, but at the chair, on real cases,
                over countless hours with a specialist who does this every
                day. For you, that means the dentist planning your
                reconstruction understands the full architecture of the bite
                &mdash; the part that determines whether the result holds up
                for decades or starts failing in a few years.
              </p>
            </div>
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
              Who full mouth reconstruction{" "}
              <span className="font-serif-italic">helps</span>
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

        {/* TRUST BLOCK — 4,000 CE hours */}
        <section className="mx-auto max-w-[1320px] px-6 pb-20 sm:pb-24">
          <div
            className="mx-auto max-w-[860px] p-10 text-center sm:p-16"
            style={{ backgroundColor: SAGE, color: "#F5F0E8" }}
          >
            <h2 className="font-serif text-[36px] leading-[1.05] sm:text-[52px]">
              4,000 hours.{" "}
              <span className="font-serif-italic">Then we begin.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-[620px] font-inter text-[15px] font-light leading-[1.75] sm:text-[16px]">
              On top of his OHSU degree and surgical training, Dr. Engel has
              completed over 4,000 hours of continuing education focused
              specifically on smile design, cosmetic dentistry, and full
              mouth reconstruction. For context, most dentists complete
              20&ndash;40 continuing-education hours per year.
              That&rsquo;s the depth of preparation behind every
              reconstruction we do. [PLACEHOLDER: Andy&rsquo;s voice on
              what those 4,000 hours actually taught him and why it matters
              to the patient in the chair.]
            </p>
          </div>
        </section>

        {/* RELATED — bridge to TMJ pillar (when it exists) */}
        <section className="mx-auto max-w-[1320px] px-6 pb-20 sm:pb-24">
          <div
            className="mx-auto max-w-[720px] border-t pt-12 sm:pt-14"
            style={{ borderColor: "rgba(28,26,23,0.18)" }}
          >
            <h2 className="font-serif text-[28px] leading-[1.05] text-charcoal sm:text-[36px]">
              Already living with{" "}
              <span className="font-serif-italic">TMJ symptoms?</span>
            </h2>
            <p className="mt-6 font-inter text-[15px] font-light leading-[1.75] text-charcoal-soft sm:text-[16px]">
              TMJ pain, jaw clicking, and chronic headaches are often the
              direct result of a bite that&rsquo;s out of balance &mdash;
              sometimes from past dental work, sometimes from years of
              grinding, sometimes from injury. The same precision
              principles that govern a full mouth reconstruction apply to
              TMJ treatment. [PLACEHOLDER LINK: TMJ pillar page when
              built.]
            </p>
          </div>
        </section>

        {/* FINANCING */}
        <section className="mx-auto max-w-[1320px] px-6 pb-20 sm:pb-24">
          <div
            className="mx-auto max-w-[720px] border-t pt-12 sm:pt-14"
            style={{ borderColor: "rgba(28,26,23,0.18)" }}
          >
            <h2 className="font-serif text-[28px] leading-[1.05] text-charcoal sm:text-[36px]">
              Insurance &amp;{" "}
              <span className="font-serif-italic">financing</span>
            </h2>
            <p className="mt-6 font-inter text-[15px] font-light leading-[1.75] text-charcoal-soft sm:text-[16px]">
              Full mouth reconstruction is typically planned and phased
              over months, which makes financing manageable. We accept
              most major insurance plans in-network and provide the same
              quality of care out-of-network. We accept CareCredit
              financing and offer an in-office dental plan for patients
              without insurance. [PLACEHOLDER: Andy&rsquo;s voice on how
              reconstructions are phased and what most patients pay.]
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
              Start with a{" "}
              <span className="font-serif-italic">conversation.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-[480px] font-inter text-[15px] font-light leading-[1.7] text-warm-gray sm:text-[16px]">
              Every reconstruction begins with a diagnostic appointment.
              Dr. Engel will walk you through exactly what your case
              involves &mdash; what&rsquo;s realistic, what it takes, and
              what it doesn&rsquo;t. No pressure, no hard sell.
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
