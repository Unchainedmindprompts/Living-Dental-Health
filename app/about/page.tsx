import type { Metadata } from "next";
import Image from "next/image";
import Nav from "@/components/Nav";

const SAGE = "#6B7C5C";
const SAGE_LABEL = "#9CAF88";

export const metadata: Metadata = {
  title: "Meet Dr. Andy Engel — Living Dental Health",
  description:
    "Dr. Andrew W. Engel, DMD has been caring for Bend, Oregon families since 1998. A graduate of OHSU with advanced training in full mouth reconstruction and oral surgery.",
};

const CREDENTIALS = [
  { label: "Doctor of Dental Medicine", detail: "OHSU, 1998" },
  {
    label: "Advanced training",
    detail: "Full Mouth Reconstruction & Oral Surgery",
  },
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
              alt="Dr. Andy Engel, dentist at Living Dental Health in Bend Oregon"
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
                Dr. Andrew W. Engel has been caring for Bend families since
                1998 &mdash; before the city&rsquo;s growth, through every
                change, and with the same commitment to personalized care he
                started with.
              </p>
              <p>
                A graduate of Oregon Health Sciences University School of
                Dentistry, Dr. Engel completed advanced studies in full mouth
                reconstruction and oral surgery &mdash; training that allows
                him to offer his patients comprehensive care under one roof,
                without referrals to outside specialists.
              </p>
              <p>
                In 28 years of practice, Dr. Engel has become one of Central
                Oregon&rsquo;s most trusted dentists for complex cases
                including dental implants, full mouth reconstruction, and oral
                surgery. His approach is simple: take the time to listen,
                explain every option clearly, and never rush a patient through
                a decision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CREDENTIALS */}
      <section className="mx-auto max-w-[1320px] px-6 pb-20 sm:pb-24">
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
            {CREDENTIALS.map((c) => (
              <div key={c.label}>
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

      {/* PLACEHOLDER · Personal quote */}
      <section className="mx-auto max-w-[1320px] px-6 pb-10 sm:pb-14">
        <div
          className="mx-auto max-w-[720px] border border-dashed p-8 text-center sm:p-12"
          style={{
            borderColor: SAGE_LABEL,
            backgroundColor: "rgba(156,175,136,0.06)",
          }}
        >
          <p
            className="font-inter text-[10px] font-light uppercase tracking-[0.32em]"
            style={{ color: SAGE }}
          >
            Placeholder &middot; Personal quote
          </p>
          <p className="mt-4 font-serif-italic text-[18px] leading-[1.55] text-warm-gray sm:text-[20px]">
            Dr. Engel&rsquo;s philosophy statement in his own voice &mdash;
            something about why he practices the way he does.
          </p>
        </div>
      </section>

      {/* PLACEHOLDER · Hobbies & Bend connection */}
      <section className="mx-auto max-w-[1320px] px-6 pb-10 sm:pb-14">
        <div
          className="mx-auto max-w-[720px] border border-dashed p-8 text-center sm:p-12"
          style={{
            borderColor: SAGE_LABEL,
            backgroundColor: "rgba(156,175,136,0.06)",
          }}
        >
          <p
            className="font-inter text-[10px] font-light uppercase tracking-[0.32em]"
            style={{ color: SAGE }}
          >
            Placeholder &middot; Hobbies &amp; Bend connection
          </p>
          <p className="mt-4 font-serif-italic text-[18px] leading-[1.55] text-warm-gray sm:text-[20px]">
            A short paragraph on Dr. Engel&rsquo;s life outside the office
            &mdash; family, hobbies, why he loves Central Oregon.
          </p>
        </div>
      </section>

      {/* PLACEHOLDER · Team or office photo */}
      <section className="mx-auto max-w-[1320px] px-6 pb-24 sm:pb-32">
        <div
          className="mx-auto flex aspect-[16/9] max-w-[960px] items-center justify-center border border-dashed"
          style={{
            borderColor: SAGE_LABEL,
            backgroundColor: "rgba(156,175,136,0.06)",
          }}
        >
          <div className="text-center">
            <p
              className="font-inter text-[10px] font-light uppercase tracking-[0.32em]"
              style={{ color: SAGE }}
            >
              Placeholder &middot; Team or office photo
            </p>
            <p className="mt-3 font-serif-italic text-[15px] text-warm-gray">
              16:9 image, drops in here.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
