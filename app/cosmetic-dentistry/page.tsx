import CareEvidence from "@/components/CareEvidence";
import { withCareEvidence } from "@/lib/schema";
import type { Metadata } from "next";
import { serviceMetadata } from "@/lib/metadata";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import { cosmeticDentistryFaq, cosmeticDentistryPageSchema, sanitizeJsonLd } from "@/lib/schema";

const SAGE = "#6B7C5C";
const SAGE_LABEL = "#9CAF88";

export const metadata: Metadata = {
  ...serviceMetadata("/cosmetic-dentistry", "Cosmetic Dentistry in Bend, Oregon | Living Dental Health", "Explore cosmetic dentistry in Bend with Dr. Andy Engel: a listening-first consultation, whitening and veneer options, and thoughtful smile planning.", "/cosmetic-hero.webp"),
  alternates: { canonical: "/cosmetic-dentistry" },
  title: "Cosmetic Dentistry in Bend, Oregon | Living Dental Health",
  description:
    "Explore cosmetic dentistry in Bend with Dr. Andy Engel: a listening-first consultation, whitening and veneer options, and thoughtful smile planning.",
};

const SERVICES = [
  {
    id: "veneers",
    heading: "Porcelain Veneers",
    body:
      "Veneers are ultra-thin porcelain shells custom-crafted to cover the front surface of your teeth. They can improve the appearance of chipped, discolored, uneven, or spaced teeth. Dr. Engel designs each veneer to complement your facial features and natural tooth color. The result looks like your best smile, not someone else’s.",
    detail:
      "custom crafted · porcelain · tailored to your smile",
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
      "Dr. Engel has provided clear aligner therapy since 2001 and is a certified ClearCorrect provider. ClearCorrect uses a series of custom-fitted, removable aligners to gradually shift teeth without metal brackets or wires. Patients remove them for meals and wear them as directed throughout the day. Dr. Engel plans and manages the entire process in-house.",
    detail:
      "clear aligner therapy since 2001 · certified provider · removable · individualized timing · in-house",
    imageAlt:
      "Patient holding ClearCorrect clear aligners at Living Dental Health Bend Oregon",
  },
  {
    id: "smile-design",
    heading: "Smile Design",
    body:
      "Dr. Engel has practiced cosmetic dentistry since 1999. Smile design is the planning process behind a complete cosmetic transformation. Before any procedure begins, he evaluates your teeth, gums, bite, and facial proportions to map out a result that works harmoniously. It may combine whitening, veneers, bonding, crowns, or ClearCorrect into a single coordinated plan. He won’t recommend a single procedure until he fully understands what you want and what will actually work for your face.",
    detail:
      "comprehensive planning · multi-treatment · customized · consultation required",
    imageAlt:
      "Dr. Andy Engel planning a smile design with a patient at Living Dental Health Bend Oregon",
  },
  {
    id: "whitening",
    heading: "Teeth Whitening",
    body:
      "Professional whitening and custom bleaching options can help brighten natural teeth. Dr. Engel considers your goals, sensitivity, and existing dental work before recommending a plan. Results vary, and whitening does not change the color of crowns, veneers, or tooth-colored fillings.",
    detail:
      "custom bleaching · individualized planning · professional guidance",
    imageAlt:
      "Patient with a brighter smile after professional teeth whitening at Living Dental Health Bend Oregon",
  },
  {
    id: "reconstruction",
    heading: "Full Mouth Reconstruction",
    body:
      "Full mouth reconstruction addresses both function and aesthetics at the highest level of complexity. For patients with significant damage, bone loss, missing teeth, or severe bite issues, Dr. Engel draws on his advanced OHSU training to rebuild the entire mouth — structurally and cosmetically. Procedures may include implants, bone grafting, crowns, veneers, and orthodontia, all coordinated by one doctor who knows your full history. The combination and sequence depend on your examination and treatment goals.",
    detail:
      "advanced OHSU training · in-house grafting · implants and crowns · individualized treatment planning",
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

export default function CosmeticDentistryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(sanitizeJsonLd(withCareEvidence(cosmeticDentistryPageSchema, "cosmetic"))),
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

        {/* HERO — headline overlaid on the photo's negative space (desktop),
            stacked above the photo (mobile). Single H1, repositioned by CSS. */}
        <div className="relative">
          <div className="px-6 pt-6 pb-10 text-center lg:absolute lg:inset-0 lg:z-10 lg:flex lg:items-center lg:py-0 lg:text-left">
            <div className="mx-auto w-full max-w-[1320px] lg:px-6">
              <div className="lg:max-w-[540px]">
                <p
                  className="font-inter text-[11px] font-light uppercase tracking-widest"
                  style={{ color: SAGE }}
                >
                  &mdash; cosmetic dentistry &mdash;
                </p>
                <h1 className="mt-5 font-serif text-[40px] leading-[1.05] text-charcoal sm:text-[56px] lg:text-[54px]">
                  Cosmetic Dentistry in Bend, Oregon
                </h1>
                <p className="mt-4 font-serif-italic text-[22px] text-charcoal-soft">Your smile, redesigned.</p>
                <p className="mx-auto mt-5 max-w-[560px] font-inter text-[15px] font-light leading-[1.7] text-charcoal-soft sm:text-[17px] lg:mx-0 lg:max-w-[440px]">
                  What would you like to change about your smile — and what
                  would you like to keep? Dr. Andy Engel starts by listening,
                  then helps you explore whitening, veneers, or a more involved
                  plan that fits your teeth and your goals.
                </p>
              </div>
            </div>
          </div>

          <div className="relative h-[380px] w-full overflow-hidden sm:h-[460px] lg:h-[55vh] lg:min-h-[560px] lg:max-h-[760px]">
            <Image
              src="/cosmetic-hero.webp"
              alt="A confident patient with a bright smile in the operatory at Living Dental Health in Bend, Oregon"
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
              You do not need to arrive knowing which procedure to ask for.
              Tell Dr. Engel what you notice in photos, what feels different
              when you smile, or which tooth has been bothering you. He has
              practiced dentistry in Bend since 1998, and his cosmetic
              consultations bring your priorities together with an examination
              of your mouth and teeth.
            </p>
          </div>
        </section>

        <div className="mx-auto flex max-w-[1100px] flex-wrap gap-4 px-6 pb-10">
          <Link href="/teeth-whitening" className="rounded-full border border-sage px-6 py-3 text-sage">Explore teeth whitening</Link>
          <Link href="/clear-correct-braces" className="rounded-full border border-sage px-6 py-3 text-sage">Explore ClearCorrect aligners</Link>
          <Link href="/contact" className="rounded-full bg-sage px-6 py-3 text-cream">Request a cosmetic consultation</Link>
        </div>
        <section className="mx-auto max-w-[1100px] px-6 pb-16 sm:pb-20" aria-labelledby="smile-planning">
          <p className="font-inter text-[11px] uppercase tracking-widest text-sage">From conversation to a considered plan</p>
          <h2 id="smile-planning" className="mt-3 font-serif text-[32px] leading-tight sm:text-[44px]">A smile that still feels like you</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="font-serif text-[25px]">Start with what matters to you</h3>
              <p className="mt-3 font-inter text-[15px] font-light leading-[1.75] text-charcoal-soft">Dr. Engel asks about your needs, goals, and wishes, then looks at your teeth before making recommendations. A small change may be enough; a smile makeover does not automatically mean a full set of veneers.</p>
              <Link href="/articles/starting-the-new-year-with-a-confident-smile" className="mt-4 inline-block text-sage underline underline-offset-4">How the cosmetic consultation works</Link>
            </div>
            <div>
              <h3 className="font-serif text-[25px]">Compare the ways to get there</h3>
              <p className="mt-3 font-inter text-[15px] font-light leading-[1.75] text-charcoal-soft">Color, shape, spacing, and worn dental work call for different conversations. Whitening may address staining; veneers, bonding, crowns, or aligners may be considered for other concerns. Discuss the scope and cost of the options before choosing.</p>
              <Link href="/articles/two-solutions-for-achieving-your-perfect-smile" className="mt-4 inline-block text-sage underline underline-offset-4">Whitening and veneers: what each can change</Link>
            </div>
            <div>
              <h3 className="font-serif text-[25px]">Make the plan easier to picture</h3>
              <p className="mt-3 font-inter text-[15px] font-light leading-[1.75] text-charcoal-soft">For veneer and other cosmetic plans where it is useful, a diagnostic wax-up models proposed changes on a copy of your teeth. It gives you something concrete to discuss and helps Dr. Engel and the lab plan appearance and bite together.</p>
              <Link href="/before-and-after#case-01" className="mt-4 inline-block text-sage underline underline-offset-4">See wax-up planning in a real veneer case</Link>
            </div>
          </div>
          <p className="mt-8 max-w-[760px] font-inter text-[15px] font-light leading-[1.75] text-charcoal-soft">Before moving forward, bring questions about the number of visits, any changes to your natural teeth, and how to care for the result. Ask which follow-up visits your plan will need. A wax-up helps guide the conversation; individual results vary.</p>
        </section>
        <CareEvidence kind="cosmetic" awards={false} />

        {/* SERVICE SECTIONS — 2-up mocha panel grid */}
        <section className="mx-auto max-w-[1320px] px-6 pb-20 sm:pb-24">
          <div className="mx-auto grid max-w-[1100px] gap-4 sm:gap-6 md:grid-cols-2">
            {SERVICES.map((s, i) => (
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
                  0{i + 1} &nbsp;/&nbsp; 06
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
              Your priorities belong in the treatment plan. Tell Dr. Engel
              what you hope to change, what concerns you about treatment, and
              what your budget needs to cover. The goal is to understand your
              options together and choose a next step you feel comfortable with.
              <Link href="/articles/the-benefits-of-cosmetic-dentistry-and-how-it-can-improve-your-smile-and-confidence" className="mt-5 block underline underline-offset-4">Read about choosing care around your goals</Link>
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
              {cosmeticDentistryFaq.map((item) => (
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

        {/* SECONDARY IMAGE */}
        <section className="mx-auto max-w-[1320px] px-6 pb-20 sm:pb-24">
          <div className="relative h-[360px] w-full overflow-hidden rounded-xl bg-cream-deep">
            <Image
              src="/cosmetic-secondary.webp"
              alt="Woman with a bright, confident smile after cosmetic dentistry at Living Dental Health in Bend, Oregon"
              fill
              sizes="(min-width: 1320px) 1320px, 100vw"
              className="object-cover object-[75%_center] sm:object-center"
            />
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
              the options for your teeth and what to expect — no pressure,
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
