import type { Metadata } from "next";
import Nav from "@/components/Nav";
import { contactPageSchema, sanitizeJsonLd } from "@/lib/schema";

const SAGE = "#6B7C5C";
const SAGE_LABEL = "#9CAF88";
const FOREST = "#2C3B2D";

export const metadata: Metadata = {
  title: "Contact — Living Dental Health",
  description:
    "Phone, email, address, and hours for Living Dental Health in Bend, Oregon.",
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(sanitizeJsonLd(contactPageSchema)),
        }}
      />
      <main
        className="min-h-screen text-charcoal"
        style={{ backgroundColor: "#F5F0E8" }}
      >
        <Nav />

        {/* push content below the fixed utility + main nav (36 + 64 = 100px) */}
        <div className="h-[100px]" aria-hidden />

        {/* HEADER */}
        <section className="mx-auto max-w-[1320px] px-6 pt-12 pb-12 text-center sm:pt-20 sm:pb-16">
          <p
            className="font-inter text-[11px] font-light uppercase tracking-widest"
            style={{ color: SAGE }}
          >
            — get in touch —
          </p>
          <h1 className="mt-6 font-serif text-[56px] leading-[1.02] text-charcoal sm:text-[88px] md:text-[112px]">
            Let&rsquo;s{" "}
            <span className="font-serif-italic">talk.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-[620px] font-inter text-[16px] font-light leading-[1.7] text-warm-gray sm:text-[18px]">
            We&rsquo;re not a click-to-book practice. We&rsquo;re a call-us,
            know-your-name practice. Reach out and we&rsquo;ll find a time that
            works.
          </p>
        </section>

        {/* PHONE — the focal point */}
        <section className="mx-auto max-w-[1320px] px-6 pb-20 text-center sm:pb-28">
          <a
            href="tel:+15415505311"
            aria-label="Call Living Dental Health at (541) 550-5311"
            className="group inline-block"
          >
            <p
              className="font-inter text-[11px] font-light uppercase tracking-widest transition-colors"
              style={{ color: SAGE_LABEL }}
            >
              — tap to call —
            </p>
            <p
              className="mt-4 font-serif text-[44px] leading-none text-charcoal transition-colors duration-300 sm:text-[72px] md:text-[88px] lg:text-[104px]"
              style={{ letterSpacing: "-0.01em" }}
            >
              <span className="transition-colors group-hover:text-[#2C3B2D]">
                (541) 550&#8209;5311
              </span>
            </p>
          </a>
        </section>

        {/* EMAIL · ADDRESS · HOURS */}
        <section className="mx-auto max-w-[1320px] px-6 pb-20 sm:pb-24">
          <div
            className="mx-auto grid max-w-[960px] gap-10 border-t pt-12 sm:grid-cols-3 sm:gap-8 sm:pt-14"
            style={{ borderColor: "rgba(28,26,23,0.18)" }}
          >
            <div className="text-center">
              <p
                className="font-inter text-[11px] font-light uppercase tracking-widest"
                style={{ color: SAGE }}
              >
                Email
              </p>
              <a
                href="mailto:info@livingdentalhealth.com"
                className="mt-4 inline-block font-serif-italic text-[20px] leading-tight text-charcoal transition-colors hover:text-[#2C3B2D] sm:text-[22px]"
              >
                info@livingdentalhealth.com
              </a>
            </div>

            <div className="text-center">
              <p
                className="font-inter text-[11px] font-light uppercase tracking-widest"
                style={{ color: SAGE }}
              >
                Visit
              </p>
              <address className="mt-4 font-serif-italic text-[20px] not-italic leading-[1.35] text-charcoal sm:text-[22px]">
                930 SW Yates Dr
                <br />
                Bend, OR 97702
              </address>
            </div>

            <div className="text-center">
              <p
                className="font-inter text-[11px] font-light uppercase tracking-widest"
                style={{ color: SAGE }}
              >
                Hours
              </p>
              <dl className="mx-auto mt-4 inline-grid grid-cols-[auto_auto] gap-x-6 gap-y-1.5 font-inter text-[14px] font-light">
                <dt className="text-warm-gray text-left">Mon</dt>
                <dd className="text-charcoal text-right">Closed</dd>
                <dt className="text-warm-gray text-left">Tue&ndash;Thu</dt>
                <dd className="text-charcoal text-right">8a&ndash;5p</dd>
                <dt className="text-warm-gray text-left">Fri</dt>
                <dd className="text-charcoal text-right">8a&ndash;1p</dd>
                <dt className="text-warm-gray text-left">Sat&ndash;Sun</dt>
                <dd className="text-charcoal text-right">Closed</dd>
              </dl>
            </div>
          </div>
        </section>

        {/* FOOTER NOTE */}
        <section className="mx-auto max-w-[1320px] px-6 pb-24 text-center sm:pb-32">
          <p
            className="mx-auto max-w-[520px] font-inter text-[13px] font-light leading-[1.7] sm:text-[14px]"
            style={{ color: FOREST }}
          >
            New patients welcome. For dental emergencies during business hours,
            call us directly.
          </p>
        </section>
      </main>
    </>
  );
}
