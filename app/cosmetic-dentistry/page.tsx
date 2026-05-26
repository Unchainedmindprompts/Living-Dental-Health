import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import { cosmeticDentistryPageSchema, sanitizeJsonLd } from "@/lib/schema";

const SAGE = "#6B7C5C";
const SAGE_LABEL = "#9CAF88";

export const metadata: Metadata = {
  title: "Cosmetic Dentistry — Living Dental Health, Bend Oregon",
  description:
    "Teeth whitening, porcelain veneers, dental bonding, ClearCorrect, smile design, and full mouth reconstruction with Dr. Andy Engel in Bend, Oregon. 28 years of aesthetic training, a listening-first approach, and no upsell.",
};

const SERVICES = [
  {
    id: "whitening",
    heading: "Teeth Whitening",
    body:
      "Professional whitening delivers results that over-the-counter products simply can’t match. In a single visit Dr. Engel can brighten your smile several shades using a controlled, safe process. Fast, effective, and one of the most affordable ways to transform your appearance.",
    detail:
      "professional-grade · single visit · immediate results · safe and controlled",
    imageAlt:
      "Patient with a brighter smile after professional teeth whitening at Living Dental Health Bend Oregon",
  },
  {
    id: "veneers",
    heading: "Porcelain Veneers",
    body:
      "Veneers are ultra-thin porcelain shells custom-crafted to cover the front surface of your teeth. They correct chips, discoloration, gaps, and uneven shapes — permanently. Dr. Engel designs each veneer to complement your facial features and natural tooth color. The result looks like your best smile, not someone else’s.",
    detail:
      "custom crafted · permanent · porcelain · covers chips, gaps, discoloration",
    imageAlt:
      "Patient smiling with porcelain veneers at Living Dental Health Bend Oregon",
  },
  {
    id: "bonding",
    heading: "Dental Bonding",
    body:
      "Bonding is an alternative to veneers for teeth that are chipped, cracked, discolored, or misaligned. A tooth-colored resin is applied and sculpted directly onto the tooth, then polished to a natural finish — often in a single visit. Mercury-free, conservative, and effective for targeted cosmetic corrections.",
    detail:
      "single visit · mercury-free · tooth-colored resin · conservative option",
    imageAlt:
      "Patient after dental bonding treatment at Living Dental Health Bend Oregon",
  },
  {
    id: "clearcorrect",
    heading: "ClearCorrect",
    body:
      "Dr. Engel chose ClearCorrect specifically because it was developed by the founders of Invisalign — who left to build a product they believed was better. We agree. Custom-fitted clear aligners gradually shift your teeth with no metal, no wires, and no adjustments. Remove them for meals, wear them through your day, and get on with your life. Dr. Engel manages the entire process in-house.",
    detail:
      "certified provider · clear aligners · removable · 12–18 months · in-house management",
    imageAlt:
      "Patient holding ClearCorrect clear aligners at Living Dental Health Bend Oregon",
  },
  {
    id: "smile-design",
    heading: "Smile Design",
    body:
      "Smile design is the planning process behind a complete cosmetic transformation. Before any procedure begins, Dr. Engel evaluates your teeth, gums, bite, and facial proportions to map out a result that works harmoniously. It may combine whitening, veneers, bonding, crowns, or ClearCorrect into a single coordinated plan. He won’t recommend a single procedure until he fully understands what you want and what will actually work for your face.",
    detail:
      "comprehensive planning · multi-treatment · customized · consultation required",
    imageAlt:
      "Dr. Andy Engel planning a smile design with a patient at Living Dental Health Bend Oregon",
  },
  {
    id: "reconstruction",
    heading: "Full Mouth Reconstruction",
    body:
      "Full mouth reconstruction addresses both function and aesthetics at the highest level of complexity. For patients with significant damage, bone loss, missing teeth, or severe bite issues, Dr. Engel draws on his advanced OHSU training to rebuild the entire mouth — structurally and cosmetically. Procedures may include implants, bone grafting, crowns, veneers, and orthodontia, all coordinated by one doctor who knows your full history. This is the case most dentists refer out. Dr. Engel does it here.",
    detail:
      "advanced OHSU training · in-house grafting · implants and crowns · most complex cases accepted",
    imageAlt:
      "Patient after full mouth reconstruction at Living Dental Health Bend Oregon",
  },
];

const CONCERNS = [
  "Chipped or cracked teeth",
  "Yellowed or stained teeth",
  "Gaps between teeth",
  "Missing teeth",
  "Worn or short teeth",
  "Crooked or misshapen teeth",
  "Low confidence about your smile",
];

const FAQ = [
  {
    q: "Does Dr. Engel offer cosmetic dentistry in Bend Oregon?",
    a: "Yes. Dr. Andrew Engel at Living Dental Health provides cosmetic dentistry including teeth whitening, porcelain veneers, dental bonding, ClearCorrect clear aligners, smile design, and full mouth reconstruction at 930 SW Yates Dr, Bend OR 97702.",
  },
  {
    q: "What is ClearCorrect and how is it different from Invisalign?",
    a: "ClearCorrect was developed by the founders of Invisalign who left to build a product they believed was better. Dr. Engel is a certified ClearCorrect provider and manages the entire process in-house.",
  },
  {
    q: "Does Living Dental Health offer full mouth reconstruction?",
    a: "Yes. Dr. Engel completed advanced training at Oregon Health Sciences University in full mouth reconstruction and oral surgery. He performs complex reconstructive cases in-house including bone and tissue grafting, implants, crowns, and veneers.",
  },
];

export default function CosmeticDentistryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(sanitizeJsonLd(cosmeticDentistryPageSchema)),
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
            <li style={{ color: SAGE }}>Cosmetic Dentistry</li>
          </ol>
        </nav>

        {/* HEADER */}
        <section className="mx-auto max-w-[1320px] px-6 pt-8 pb-12 text-center sm:pt-12 sm:pb-16">
          <p
            className="font-inter text-[11px] font-light uppercase tracking-widest"
            style={{ color: SAGE }}
          >
            &mdash; cosmetic dentistry &mdash;
          </p>
          <h1 className="mt-5 font-serif text-[40px] leading-[1.05] text-charcoal sm:mt-6 sm:text-[64px] md:text-[80px]">
            Your smile,{" "}
            <span className="font-serif-italic">redesigned.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-[660px] font-inter text-[16px] font-light leading-[1.7] text-warm-gray sm:mt-8 sm:text-[18px]">
            From a single whitening treatment to a complete smile makeover,
            Dr. Engel combines 28 years of aesthetic training with a
            listening-first approach. No cookie-cutter results. No procedures
            you don&rsquo;t want. Just your best smile.
          </p>
        </section>

        {/* HERO — full-bleed placeholder (image to be generated) */}
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
              Cosmetic dentistry hero &mdash; full-bleed smile / lifestyle
              photo (to be generated)
            </p>
          </div>
        </div>

        {/* INTRO */}
        <section className="mx-auto max-w-[1320px] px-6 pb-16 sm:pb-20">
          <div
            className="mx-auto max-w-[720px] border-t pt-12 sm:pt-14"
            style={{ borderColor: "rgba(28,26,23,0.18)" }}
          >
            <p className="font-inter text-[15px] font-light leading-[1.75] text-charcoal-soft sm:text-[16px]">
              Dr. Engel spent years in advanced training specifically in
              aesthetics, full mouth reconstruction, and cosmetic procedures
              — on top of his surgical background. At Living Dental Health,
              cosmetic dentistry starts with a conversation, not a treatment
              plan. He&rsquo;ll spend time understanding your goals before
              recommending anything.
            </p>
          </div>
        </section>

        {/* SERVICE SECTIONS — alternating */}
        {SERVICES.map((s, i) => (
          <section
            key={s.id}
            id={s.id}
            className="mx-auto max-w-[1320px] scroll-mt-[120px] px-6 pb-20 sm:pb-24"
          >
            <div
              className="mx-auto max-w-[1100px] border-t pt-12 sm:pt-14"
              style={{ borderColor: "rgba(28,26,23,0.18)" }}
            >
              <div className="grid gap-6 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
                <div>
                  <p
                    className="font-inter text-[11px] font-light uppercase tracking-widest"
                    style={{ color: SAGE }}
                  >
                    0{i + 1} &nbsp;/&nbsp; 06
                  </p>
                  <h2 className="mt-4 font-serif text-[32px] leading-[1.05] text-charcoal sm:text-[44px] md:text-[52px]">
                    {s.heading}
                  </h2>
                </div>
                <div>
                  <p className="font-inter text-[15px] font-light leading-[1.75] text-charcoal-soft sm:text-[16px]">
                    {s.body}
                  </p>
                  <p className="mt-6 font-inter text-[13px] font-light uppercase tracking-[0.18em] text-warm-gray sm:text-[14px]">
                    {s.detail}
                  </p>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* COMMON CONCERNS */}
        <section className="mx-auto max-w-[1320px] px-6 pb-20 sm:pb-24">
          <div
            className="mx-auto max-w-[1100px] border-t pt-12 sm:pt-14"
            style={{ borderColor: "rgba(28,26,23,0.18)" }}
          >
            <h2 className="font-serif text-[32px] leading-[1.05] text-charcoal sm:text-[44px]">
              Common concerns{" "}
              <span className="font-serif-italic">we solve</span>
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

        {/* TRUST BLOCK — No upsell */}
        <section className="mx-auto max-w-[1320px] px-6 pb-20 sm:pb-24">
          <div
            className="mx-auto max-w-[860px] p-10 text-center sm:p-16"
            style={{ backgroundColor: SAGE, color: "#F5F0E8" }}
          >
            <h2 className="font-serif text-[36px] leading-[1.05] sm:text-[52px]">
              No upsell. <span className="font-serif-italic">Ever.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-[620px] font-inter text-[15px] font-light leading-[1.75] sm:text-[16px]">
              Dr. Engel firmly believes a dentist should never sell you
              procedures you don&rsquo;t want. A cosmetic recommendation only
              comes after spending considerable time learning about you, your
              goals, and what will genuinely serve you best. His dream patient
              is a good communicator — someone he can work with as a team to
              deliver a result they&rsquo;re proud of.
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
              We accept most major insurance plans in-network and provide the
              same quality of care out-of-network. We accept CareCredit
              financing and offer an in-office dental plan for patients
              without insurance. Payment is due at time of service unless
              arrangements are made in advance.
            </p>
          </div>
        </section>

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

        {/* SECONDARY IMAGE — placeholder */}
        <section className="mx-auto max-w-[1320px] px-6 pb-20 sm:pb-24">
          <div
            className="relative flex h-[360px] w-full items-center justify-center overflow-hidden rounded-xl border border-dashed bg-cream-deep"
            style={{ borderColor: SAGE_LABEL }}
          >
            <div className="px-6 text-center">
              <p
                className="font-inter text-[10px] font-light uppercase tracking-[0.32em]"
                style={{ color: SAGE }}
              >
                Photo placeholder
              </p>
              <p className="mt-3 font-serif-italic text-[15px] text-warm-gray">
                Optional secondary image
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-[1320px] px-6 pb-24 sm:pb-32">
          <div
            className="mx-auto max-w-[720px] border-t pt-14 text-center sm:pt-16"
            style={{ borderColor: "rgba(28,26,23,0.18)" }}
          >
            <h2 className="font-serif text-[32px] leading-[1.05] text-charcoal sm:text-[44px]">
              Ready to talk about{" "}
              <span className="font-serif-italic">your smile?</span>
            </h2>
            <p className="mx-auto mt-5 max-w-[480px] font-inter text-[15px] font-light leading-[1.7] text-warm-gray sm:text-[16px]">
              Start with a consultation. Dr. Engel will walk you through
              exactly what&rsquo;s possible and what to expect — no pressure,
              no hard sell.
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
