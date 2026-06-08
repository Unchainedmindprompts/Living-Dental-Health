import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";

const SAGE = "#B6C0A6";
const SAGE_LABEL = "#9CAF88";
const WARN = "#B5654A";
const RULE = "rgba(28,26,23,0.18)";

export const metadata: Metadata = {
  title: "Post-Op Instructions — Living Dental Health, Bend Oregon",
  description:
    "Recovery instructions after gum and tissue graft surgery, dental implant placement, and surgical tooth extraction at Living Dental Health in Bend, Oregon. Questions after your procedure? Call (541) 550-5311.",
};

function Callout({
  tone = "sage",
  label,
  children,
}: {
  tone?: "sage" | "warn";
  label?: string;
  children: React.ReactNode;
}) {
  const color = tone === "warn" ? WARN : SAGE;
  const bg =
    tone === "warn" ? "rgba(181,101,74,0.07)" : "rgba(107,124,92,0.08)";
  return (
    <div
      className="my-7 border-l-4 p-5 sm:p-6"
      style={{ borderColor: color, backgroundColor: bg }}
    >
      {label && (
        <p
          className="mb-2 font-inter text-[11px] font-normal uppercase tracking-[0.18em]"
          style={{ color }}
        >
          {label}
        </p>
      )}
      <div className="font-inter text-[14px] font-light leading-[1.7] text-charcoal-soft sm:text-[15px]">
        {children}
      </div>
    </div>
  );
}

function SubLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="mt-9 mb-1 font-inter text-[11px] font-light uppercase tracking-widest"
      style={{ color: SAGE }}
    >
      {children}
    </p>
  );
}

function ExpectList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-3">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-baseline gap-3 font-inter text-[15px] font-light leading-[1.6] text-charcoal-soft sm:text-[16px]"
        >
          <span aria-hidden className="text-[11px]" style={{ color: SAGE }}>
            ✦
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

function DoItem({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt
        className="font-inter text-[12px] font-normal uppercase tracking-[0.16em]"
        style={{ color: SAGE }}
      >
        {label}
      </dt>
      <dd className="mt-1 font-inter text-[14px] font-light leading-[1.7] text-charcoal-soft sm:text-[15px]">
        {children}
      </dd>
    </div>
  );
}

const sectionClass =
  "mx-auto max-w-[820px] scroll-mt-[120px] px-6 pb-16 sm:pb-20";
const innerClass = "border-t pt-12 sm:pt-14";
const headingClass =
  "font-serif text-[30px] leading-[1.05] text-charcoal sm:text-[40px]";

const GRAFT_EXPECT = [
  "Some bleeding in saliva is normal for the rest of the day",
  "Moderate discomfort when the anesthetic wears off, which may continue several days",
  "Some swelling and discoloration of the lip or cheek is normal for a few days",
  "Temporary loss of feeling in the gum area is normal",
  "Teeth may feel loose temporarily and may be sensitive to hot and cold",
];

const GRAFT_TODO = [
  "Take all medications as directed. Eat soft foods and drink plenty of fluids before taking pain medication to prevent nausea.",
  "Take two ibuprofen every 3–4 hours to manage swelling. Start before the anesthesia wears off.",
  "Do not spit or use a straw for the first 24–48 hours. After 24–48 hours you may gently rinse with warm salt water — ½ teaspoon salt in 8 oz warm water. Tilt your head side to side and let the water fall out. Do not puff your cheeks.",
  "Do not lift your lip or cheek to look at the area — you could accidentally tear the sutures.",
  "Sleep on the opposite side from your procedure for the first 3 days.",
  "Get plenty of rest. No exercise for 2 days after surgery.",
  "Eat soft, high-protein foods. Drink plenty of water and milk. Avoid hot, spicy, acidic, hard, chewy, or crunchy foods.",
  "Do not smoke after surgery. Smoking is the number one cause of pain and delayed healing.",
  "No alcohol until healing is complete or while taking medication.",
  "Sutures will be removed at your 2-week post-op appointment. Call us if a suture feels loose or breaks.",
];

const IMPLANT_EXPECT = [
  "Some bleeding in saliva is normal for the rest of the day",
  "Numbness from local anesthetic lasts several hours — do not bite, chew, or scratch the numb area",
  "Numbness or tingling can sometimes continue for six weeks or longer — this is normal",
  "Some swelling is expected",
];

const EXTRACTION_EXPECT = [
  "Light bleeding for the first 3 days is normal",
  "A little blood mixed with saliva looks like a lot — it isn’t",
  "Swelling is normal and typically peaks on day 3",
  "Keep your head elevated on 2 pillows for 3–4 days",
];

export default function PostOpPage() {
  return (
    <main
      className="min-h-screen text-charcoal"
      style={{ backgroundColor: "#F5F0E8" }}
    >
      <Nav />
      <div className="h-[100px]" aria-hidden />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mx-auto max-w-[1320px] px-6 pt-4">
        <ol className="flex flex-wrap items-center gap-2 font-inter text-[11px] font-light uppercase tracking-widest text-warm-gray">
          <li>
            <Link href="/" className="transition-colors hover:text-charcoal">
              Home
            </Link>
          </li>
          <li aria-hidden style={{ color: SAGE_LABEL }}>
            /
          </li>
          <li>
            <Link
              href="/patient-info"
              className="transition-colors hover:text-charcoal"
            >
              New Patients
            </Link>
          </li>
          <li aria-hidden style={{ color: SAGE_LABEL }}>
            /
          </li>
          <li style={{ color: SAGE }}>Post-Op Instructions</li>
        </ol>
      </nav>

      {/* HEADER */}
      <section className="mx-auto max-w-[1320px] px-6 pt-8 pb-10 text-center sm:pt-12">
        <p
          className="font-inter text-[11px] font-light uppercase tracking-widest"
          style={{ color: SAGE }}
        >
          &mdash; post-op instructions &mdash;
        </p>
        <h1 className="mt-5 font-serif text-[40px] leading-[1.05] text-charcoal sm:mt-6 sm:text-[64px] md:text-[76px]">
          Post-Op{" "}
          <span className="font-serif-italic">Instructions</span>
        </h1>
        <p className="mx-auto mt-6 max-w-[620px] font-inter text-[16px] font-light leading-[1.7] text-warm-gray sm:text-[18px]">
          Everything you need to heal comfortably after your procedure. If
          anything feels wrong, call us — don&rsquo;t suffer in silence.
        </p>
      </section>

      {/* TRUST STRIP */}
      <section className="mx-auto max-w-[820px] px-6 pb-12">
        <div
          className="flex flex-col items-center gap-2 p-6 text-center"
          style={{ backgroundColor: SAGE, color: "#F5F0E8" }}
        >
          <p className="font-serif-italic text-[18px] sm:text-[20px]">
            Questions after your procedure? Call us directly.
          </p>
          <a
            href="tel:5415505311"
            className="font-serif text-[28px] leading-none sm:text-[34px]"
          >
            (541) 550&#8209;5311
          </a>
          <p className="font-inter text-[11px] font-light uppercase tracking-[0.18em]">
            Tue–Thu 8AM–5PM &middot; Fri 8AM–1PM
          </p>
        </div>
      </section>

      {/* HERO — placeholder */}
      <div
        className="relative flex h-[300px] w-full items-center justify-center overflow-hidden border-y border-dashed bg-cream-deep md:h-[440px]"
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
            Calm, warm editorial photo &mdash; full-bleed (to be generated)
          </p>
        </div>
      </div>

      {/* UNIVERSAL INTRO */}
      <section className="mx-auto max-w-[820px] px-6 pt-16 pb-12 sm:pt-20">
        <h2 className={headingClass}>
          What to expect in the{" "}
          <span className="font-serif-italic">first 24 hours</span>
        </h2>
        <p className="mt-6 font-inter text-[15px] font-light leading-[1.8] text-charcoal-soft sm:text-[16px]">
          Most of what you’ll feel right after your procedure is completely
          normal. A little blood in your saliva looks like a lot — it isn’t.
          Mild swelling is expected and peaks around day 3. Rest is your best
          medicine. The instructions below are specific to your procedure.
          Read yours carefully and call us if anything feels off.
        </p>

        {/* QUICK NAV */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {[
            ["Gum & Tissue Graft Surgery", "#graft"],
            ["Dental Implant Placement", "#implant"],
            ["Surgical Tooth Extraction", "#extraction"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="rounded-full border px-5 py-2.5 text-center font-inter text-[12px] uppercase tracking-[0.14em] text-charcoal transition-colors hover:bg-cream-deep"
              style={{ borderColor: SAGE }}
            >
              {label}
            </a>
          ))}
        </div>
      </section>

      {/* SECTION 1 — GRAFT */}
      <section id="graft" className={sectionClass}>
        <div className={innerClass} style={{ borderColor: RULE }}>
          <h2 className={headingClass}>Gum &amp; Tissue Graft Surgery</h2>

          <SubLabel>What to expect</SubLabel>
          <ExpectList items={GRAFT_EXPECT} />

          <Callout tone="warn" label="Do not ice this area">
            Icing can move the graft out of place. Take ibuprofen instead to
            manage swelling — two tablets every 3–4 hours.
          </Callout>

          <SubLabel>What to do</SubLabel>
          <ol className="mt-4 space-y-4">
            {GRAFT_TODO.map((step, i) => (
              <li
                key={i}
                className="flex gap-4 font-inter text-[14px] font-light leading-[1.7] text-charcoal-soft sm:text-[15px]"
              >
                <span
                  aria-hidden
                  className="font-serif text-[18px] leading-none"
                  style={{ color: SAGE }}
                >
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>

          <Callout tone="warn" label="Do not brush or floss the treated area">
            For 2 weeks after surgery. Use a manual toothbrush only — no
            electric toothbrush, no Waterpik.
          </Callout>
        </div>
      </section>

      {/* SECTION 2 — IMPLANT */}
      <section id="implant" className={sectionClass}>
        <div className={innerClass} style={{ borderColor: RULE }}>
          <h2 className={headingClass}>Dental Implant Placement</h2>

          <SubLabel>What to expect</SubLabel>
          <ExpectList items={IMPLANT_EXPECT} />

          <Callout label="Ice schedule">
            Apply ice to your cheek for 15 minutes on, 15 minutes off. Continue
            for the first day only.
          </Callout>

          <SubLabel>What to do</SubLabel>
          <dl className="mt-4 space-y-5">
            <DoItem label="Pain">
              Take two Tylenol, Advil, or Nuprin every 3–4 hours. Start before
              the anesthesia wears off. If prescription pain medication was
              prescribed, take as directed. Do not exceed the labeled dose.
            </DoItem>
            <DoItem label="Nausea">
              Take pain medication with soft food and a full glass of water to
              prevent nausea.
            </DoItem>
            <DoItem label="Brushing">
              Do not brush for the first 8 hours. After 8 hours brush gently —
              avoid the surgery area for 3 days.
            </DoItem>
            <DoItem label="Rinsing">
              No rinsing for the first 24 hours. After 24 hours rinse gently
              with: ½ teaspoon salt + ½ teaspoon baking soda + 8 oz warm water.
              Avoid commercial mouthwash.
            </DoItem>
            <DoItem label="Diet">
              Soft foods for the first two days. Drink plenty of water. No
              alcohol for 48 hours.
            </DoItem>
            <DoItem label="Activity">
              Rest for the remainder of the day. Avoid strenuous activity.
            </DoItem>
            <DoItem label="Antibiotics">
              If prescribed, take the full course as directed.
            </DoItem>
          </dl>

          <Callout label="Taking antibiotics?">
            Some antibiotics reduce the effectiveness of birth control pills.
            Use alternate birth control methods for two months.
          </Callout>

          <dl className="space-y-5">
            <DoItem label="Sinus">
              If your sinus was involved, do not blow your nose or play a wind
              instrument for one week.
            </DoItem>
            <DoItem label="Smoking">
              Stop smoking following surgery. Smoking substantially reduces
              implant healing and success.
            </DoItem>
            <DoItem label="Follow-up">
              You may need to return within 14 days for suture removal or a
              healing check.
            </DoItem>
          </dl>
        </div>
      </section>

      {/* SECTION 3 — EXTRACTION */}
      <section id="extraction" className={sectionClass}>
        <div className={innerClass} style={{ borderColor: RULE }}>
          <h2 className={headingClass}>Surgical Tooth Extraction</h2>

          <SubLabel>What to expect</SubLabel>
          <ExpectList items={EXTRACTION_EXPECT} />

          <Callout label="Ice schedule">
            Apply an ice pack to your cheek. 15 minutes on, 15 minutes off for
            the first 24 hours.
          </Callout>

          <SubLabel>What to do</SubLabel>
          <dl className="mt-4 space-y-5">
            <DoItem label="Gauze">
              Keep gauze in place for 20 minutes after your extraction. Replace
              with fresh gauze moistened with water as needed. Remove gauze
              before sleeping.
            </DoItem>
            <DoItem label="Pain">
              Take 500mg Acetaminophen (Tylenol) AND 400mg Ibuprofen (2 × 200mg
              tablets) together every 4–6 hours as needed.
            </DoItem>
            <DoItem label="Eating">
              Soft foods for the first few days — soup, Jello, protein shakes.
              No dairy for the first 24 hours. Progress to normal foods as
              healing allows.
            </DoItem>
            <DoItem label="Brushing">
              Avoid the extraction site for the first 24 hours. After that
              brush surrounding teeth gently. Do not brush or rinse the
              extraction site directly.
            </DoItem>
            <DoItem label="Rinsing">
              After 24 hours rinse gently with saltwater — ½ teaspoon salt in 1
              cup warm water. Rinse after each meal and before bed. Roll water
              gently side to side — do not swish.
            </DoItem>
            <DoItem label="Follow-up">
              We will see you back in 14 days to remove sutures and check
              healing.
            </DoItem>
          </dl>

          <Callout tone="warn" label="What to avoid">
            <ul className="space-y-1.5">
              <li>NO straws — suction dislodges the clot</li>
              <li>
                NO smoking for the first 72 hours — nicotine patches available
                at any pharmacy
              </li>
              <li>NO hard exercise or heavy lifting</li>
              <li>NO forceful spitting or swishing</li>
            </ul>
          </Callout>

          <Callout tone="warn" label="Dry socket warning">
            Dry socket occurs when the clot in the extraction site is
            dislodged, exposing the bone. Signs include throbbing pain and a
            bad taste. Call us immediately if you experience these symptoms.
          </Callout>
        </div>
      </section>

      {/* CALL US IMMEDIATELY */}
      <section className="mx-auto max-w-[820px] px-6 pb-16 sm:pb-20">
        <div
          className="border-2 p-7 sm:p-10"
          style={{ borderColor: SAGE, backgroundColor: "rgba(107,124,92,0.08)" }}
        >
          <h2 className="font-serif text-[26px] leading-[1.05] text-charcoal sm:text-[34px]">
            When to call us{" "}
            <span className="font-serif-italic">right away</span>
          </h2>
          <p className="mt-5 font-inter text-[15px] font-light text-charcoal-soft sm:text-[16px]">
            Call{" "}
            <a
              href="tel:5415505311"
              className="underline"
              style={{ color: SAGE }}
            >
              (541) 550-5311
            </a>{" "}
            immediately if you have:
          </p>
          <ul className="mt-5 space-y-3">
            {[
              "Uncontrollable pain",
              "Severe or excessive bleeding",
              "Fever",
              "Warm swelling appearing several days after your procedure",
              "Rash, itching, or difficulty breathing after taking medication",
              "Throbbing pain and bad taste (possible dry socket)",
            ].map((item) => (
              <li
                key={item}
                className="flex items-baseline gap-3 font-inter text-[15px] font-light leading-[1.6] text-charcoal-soft sm:text-[16px]"
              >
                <span aria-hidden className="text-[11px]" style={{ color: WARN }}>
                  ●
                </span>
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 font-serif-italic text-[16px] leading-[1.5] text-charcoal sm:text-[18px]">
            If it’s after hours and something feels seriously wrong, go to your
            nearest emergency room.
          </p>
        </div>
      </section>

      {/* FOOTER CONTACT */}
      <section className="mx-auto max-w-[820px] px-6 pb-24 sm:pb-32">
        <div
          className="border-t pt-12 text-center sm:pt-14"
          style={{ borderColor: RULE }}
        >
          <div className="space-y-1 font-inter text-[15px] font-light text-charcoal-soft sm:text-[16px]">
            <p>
              <a href="tel:5415505311" className="hover:text-charcoal">
                (541) 550-5311
              </a>
            </p>
            <p>930 SW Yates Dr, Bend, OR 97702</p>
            <p>Tue–Thu 8AM–5PM · Fri 8AM–1PM</p>
          </div>
        </div>
      </section>
    </main>
  );
}
