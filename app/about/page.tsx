import type { Metadata } from "next";
import Image from "next/image";
import Nav from "@/components/Nav";

const SAGE = "#6B7C5C";

export const metadata: Metadata = {
  title: "Meet Dr. Andy Engel — Living Dental Health",
  description:
    "Dr. Andrew W. Engel DMD, founder of Living Dental Health in Bend, Oregon. OHSU graduate with advanced training in full mouth reconstruction, oral surgery, dental implants, ClearCorrect, and tissue and bone grafting.",
};

const CREDENTIALS = [
  { label: "Doctor of Dental Medicine", detail: "OHSU, 1998" },
  {
    label: "Advanced training",
    detail: "Full Mouth Reconstruction & Oral Surgery",
  },
  {
    label: "Advanced training",
    detail: "Implants, ClearCorrect, Tissue & Bone Grafting",
  },
  { label: "Founder", detail: "Living Dental Health" },
  { label: "Practice", detail: "28 years serving Bend, Oregon" },
  { label: "New patients", detail: "Accepting ages 12 and up" },
];

export default function AboutPage() {
  return (
    <main
      className="min-h-screen text-charcoal"
      style={{ backgroundColor: "#F5F0E8" }}
    >
      <Nav />
      <div className="h-[100px]" aria-hidden />

      {/* HEADER */}
      <section className="mx-auto max-w-[1320px] px-6 pt-10 pb-10 text-center sm:pt-20 sm:pb-16">
        <p className="font-serif-italic text-[13px] text-warm-gray sm:text-[15px]">
          &mdash; a private dental studio &mdash;
        </p>
        <h1 className="mt-5 font-serif text-[40px] leading-[1.05] text-charcoal sm:mt-6 sm:text-[72px] md:text-[88px]">
          Meet Dr.{" "}
          <span className="font-serif-italic">Andy Engel</span>
        </h1>
        <p className="mx-auto mt-6 max-w-[600px] font-inter text-[16px] font-light leading-[1.6] text-warm-gray sm:mt-8 sm:text-[18px]">
          28 years. One practice. One dentist who knows this town.
        </p>
      </section>

      {/* HEADSHOT + BIO */}
      <section className="mx-auto max-w-[1320px] px-6 pb-20 sm:pb-24">
        <div className="grid gap-10 lg:grid-cols-[auto_1fr] lg:items-start lg:gap-16">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[340px] overflow-hidden bg-cream-deep sm:max-w-[420px] lg:mx-0 lg:w-[420px]">
            <Image
              src="/dr-andy.webp"
              alt="Dr. Andy Engel, founder of Living Dental Health in Bend Oregon"
              fill
              sizes="(min-width: 1024px) 420px, (min-width: 640px) 420px, 340px"
              className="object-cover object-center"
              priority
            />
          </div>

          <div className="max-w-[640px]">
            <p
              className="font-inter text-[11px] font-light uppercase tracking-widest"
              style={{ color: SAGE }}
            >
              The Dentist
            </p>
            <div className="mt-5 space-y-5 font-inter text-[15px] font-light leading-[1.75] text-charcoal-soft sm:text-[16px]">
              <p>
                Dr. Andrew W. Engel grew up in Boise, Idaho before his family
                relocated to Oregon in 1988. An avid athlete from an early
                age, he had his sights set on Olympic mogul skiing at Mt.
                Bachelor &mdash; he decided dentistry was the safer option.
                Bend&rsquo;s loss, his patients&rsquo; gain.
              </p>
              <p>
                He knew he wanted to be a dentist in the eighth grade. He
                loved fixing things &mdash; taking apart toys, putting them
                back together &mdash; and wanted to help people. That
                combination led him straight to Oregon Health Sciences
                University, where he graduated early and pursued advanced
                training in full mouth reconstruction, oral surgery,
                implants, ClearCorrect, and tissue and bone grafting.
              </p>
              <p>
                Dr. Engel moved to Bend in 1998, helped establish Century
                Dental Group, then founded Living Dental Health to fulfill a
                lifelong goal of building something of his own. The name says
                it all &mdash; helping patients address oral health issues so
                they can live healthy, full, active lives in Central Oregon.
              </p>
              <p>
                His approach to patient care is part detective, part
                craftsman. No cookie-cutter treatment plans. He listens
                first, then pulls from a tool belt that most dentists simply
                don&rsquo;t have. His dream patient: a good communicator who
                wants to be involved in their own care &mdash; someone he can
                get to know by name and wave to around town.
              </p>
              <p>
                When he&rsquo;s not in the office, you might find him up at
                Mt. Bachelor skiing with friends, or out on one of his
                motorcycles. His greatest joy is family &mdash; wife Francie,
                son Sean, daughters Ally and Rhone, and Murphy the Corgi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PULL QUOTE */}
      <section className="mx-auto max-w-[1320px] px-6 pb-20 sm:pb-28">
        <div className="mx-auto max-w-[920px] text-center">
          <span
            className="mx-auto block h-px w-14"
            style={{ backgroundColor: SAGE }}
            aria-hidden
          />
          <blockquote className="mt-8 font-serif-italic text-[28px] leading-[1.2] text-charcoal sm:mt-10 sm:text-[40px] md:text-[52px]">
            &ldquo;To Dr. Engel, there is no cookie-cutter approach to
            dentistry.&rdquo;
          </blockquote>
          <span
            className="mx-auto mt-8 block h-px w-14 sm:mt-10"
            style={{ backgroundColor: SAGE }}
            aria-hidden
          />
        </div>
      </section>

      {/* CREDENTIALS */}
      <section className="mx-auto max-w-[1320px] px-6 pb-24 sm:pb-32">
        <div
          className="mx-auto max-w-[960px] border-t pt-12 sm:pt-14"
          style={{ borderColor: "rgba(28,26,23,0.18)" }}
        >
          <p
            className="mb-10 text-center font-inter text-[11px] font-light uppercase tracking-widest"
            style={{ color: SAGE }}
          >
            Credentials
          </p>
          <dl className="grid gap-8 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-10">
            {CREDENTIALS.map((c, i) => (
              <div key={`${c.label}-${i}`}>
                <dt className="font-serif-italic text-[20px] leading-tight text-charcoal sm:text-[22px]">
                  {c.label}
                </dt>
                <dd className="mt-2 font-inter text-[14px] font-light text-warm-gray sm:text-[15px]">
                  {c.detail}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </main>
  );
}
