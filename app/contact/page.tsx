import type { Metadata } from "next";
import Nav from "@/components/Nav";
import ContactForm from "@/components/ContactForm";
import { contactPageSchema, sanitizeJsonLd } from "@/lib/schema";

const SAGE = "#6B7C5C";
const CREAM = "#F5F0E8";
const LABEL = "rgba(245,240,232,0.72)";
const SOFT = "rgba(245,240,232,0.85)";
const RULE = "rgba(245,240,232,0.18)";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: "Contact — Living Dental Health",
  description:
    "Phone, email, address, and hours for Living Dental Health in Bend, Oregon — plus a quick form to get in touch.",
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
        className="min-h-screen"
        style={{ backgroundColor: SAGE, color: CREAM }}
      >
        <Nav />

        {/* push content below the fixed utility + main nav (36 + 64 = 100px) */}
        <div className="h-[100px]" aria-hidden />

        {/* HEADER */}
        <section className="mx-auto max-w-[1320px] px-6 pt-12 pb-12 text-center sm:pt-20 sm:pb-14">
          <p
            className="font-inter text-[11px] font-light uppercase tracking-widest"
            style={{ color: LABEL }}
          >
            — get in touch —
          </p>
          <h1
            className="mt-6 font-serif text-[56px] leading-[1.02] sm:text-[88px] md:text-[112px]"
            style={{ color: CREAM }}
          >
            Let&rsquo;s <span className="font-serif-italic">talk.</span>
          </h1>
          <p
            className="mx-auto mt-8 max-w-[620px] font-inter text-[16px] font-light leading-[1.7] sm:text-[18px]"
            style={{ color: SOFT }}
          >
            We&rsquo;re not a click-to-book practice. We&rsquo;re a call-us,
            know-your-name practice. Drop us a line and we&rsquo;ll find a time
            that works.
          </p>
        </section>

        {/* FORM */}
        <section className="mx-auto max-w-[1320px] px-6 pb-16 sm:pb-20">
          <ContactForm />
        </section>

        {/* OR CALL */}
        <section className="mx-auto max-w-[1320px] px-6 pb-20 text-center sm:pb-24">
          <p
            className="font-inter text-[11px] font-light uppercase tracking-widest"
            style={{ color: LABEL }}
          >
            — or call —
          </p>
          <a
            href="tel:+15415505311"
            aria-label="Call Living Dental Health at (541) 550-5311"
            className="mt-4 inline-block font-serif text-[34px] leading-none transition-opacity hover:opacity-80 sm:text-[44px]"
            style={{ color: CREAM, letterSpacing: "-0.01em" }}
          >
            (541) 550&#8209;5311
          </a>
        </section>

        {/* EMAIL · VISIT · HOURS */}
        <section className="mx-auto max-w-[1320px] px-6 pb-20 sm:pb-24">
          <div
            className="mx-auto grid max-w-[960px] gap-10 border-t pt-12 sm:grid-cols-3 sm:gap-8 sm:pt-14"
            style={{ borderColor: RULE }}
          >
            <div className="text-center">
              <p
                className="font-inter text-[11px] font-light uppercase tracking-widest"
                style={{ color: LABEL }}
              >
                Email
              </p>
              <a
                href="mailto:info@livingdentalhealth.com"
                className="mt-4 inline-block font-serif-italic text-[20px] leading-tight transition-opacity hover:opacity-80 sm:text-[22px]"
                style={{ color: CREAM }}
              >
                info@livingdentalhealth.com
              </a>
            </div>

            <div className="text-center">
              <p
                className="font-inter text-[11px] font-light uppercase tracking-widest"
                style={{ color: LABEL }}
              >
                Visit
              </p>
              <address
                className="mt-4 font-serif-italic text-[20px] not-italic leading-[1.35] sm:text-[22px]"
                style={{ color: CREAM }}
              >
                930 SW Yates Dr
                <br />
                Bend, OR 97702
              </address>
            </div>

            <div className="text-center">
              <p
                className="font-inter text-[11px] font-light uppercase tracking-widest"
                style={{ color: LABEL }}
              >
                Hours
              </p>
              <dl
                className="mx-auto mt-4 inline-grid grid-cols-[auto_auto] gap-x-6 gap-y-1.5 font-inter text-[14px] font-light"
                style={{ color: CREAM }}
              >
                <dt className="text-left" style={{ color: LABEL }}>
                  Mon
                </dt>
                <dd className="text-right">Closed</dd>
                <dt className="text-left" style={{ color: LABEL }}>
                  Tue&ndash;Thu
                </dt>
                <dd className="text-right">8a&ndash;5p</dd>
                <dt className="text-left" style={{ color: LABEL }}>
                  Fri
                </dt>
                <dd className="text-right">8a&ndash;1p</dd>
                <dt className="text-left" style={{ color: LABEL }}>
                  Sat&ndash;Sun
                </dt>
                <dd className="text-right">Closed</dd>
              </dl>
            </div>
          </div>
        </section>

        {/* FOOTER NOTE */}
        <section className="mx-auto max-w-[1320px] px-6 pb-24 text-center sm:pb-32">
          <p
            className="mx-auto max-w-[520px] font-inter text-[13px] font-light leading-[1.7] sm:text-[14px]"
            style={{ color: SOFT }}
          >
            New patients welcome. For dental emergencies during business hours,
            please call us directly.
          </p>
        </section>
      </main>
    </>
  );
}
