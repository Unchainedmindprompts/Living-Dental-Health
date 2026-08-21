import type { Metadata } from "next";
import Nav from "@/components/Nav";
import { privacyPageSchema, sanitizeJsonLd } from "@/lib/schema";

const SAGE = "#6B7C5C";

export const metadata: Metadata = {
  title: "Privacy Policy — Living Dental Health, Bend Oregon",
  description:
    "How Living Dental Health collects, uses, and protects patient information.",
  alternates: { canonical: "/privacy" },
};

const h2 =
  "mt-10 font-serif text-[24px] leading-tight text-charcoal sm:text-[28px]";
const p =
  "mt-4 font-inter text-[15px] font-light leading-[1.75] text-charcoal-soft sm:text-[16px]";
const li =
  "font-inter text-[15px] font-light leading-[1.75] text-charcoal-soft sm:text-[16px]";

export default function PrivacyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(sanitizeJsonLd(privacyPageSchema)),
        }}
      />
      <main
        className="min-h-screen text-charcoal"
        style={{ backgroundColor: "#F5F0E8" }}
      >
        <Nav />
        <div className="h-[100px]" aria-hidden />

        <section className="mx-auto max-w-[820px] px-6 pt-10 pb-24 sm:pt-16">
          <p
            className="font-inter text-[11px] font-light uppercase tracking-widest"
            style={{ color: SAGE }}
          >
            &mdash; legal &mdash;
          </p>
          <h1 className="mt-5 font-serif text-[40px] leading-[1.05] text-charcoal sm:text-[56px]">
            Privacy <span className="font-serif-italic">Policy</span>
          </h1>

          <p className={`${p} mt-8`}>
            We&rsquo;re committed to protecting your privacy. Our Privacy Policy
            will walk you through any personal data we may obtain or that you
            provide to us. Please read the following carefully to understand
            our policies regarding your personal data and how we will treat it.
          </p>
          <p className={p}>
            You can review our full{" "}
            <a
              href="/documents/consent-services-insurance-financial-hipaa.pdf"
              className="underline"
            >
              Consent for Services, Insurance Coverage, Financial Policy &amp;
              HIPAA document
            </a>
            .
          </p>

          <h2 className={h2}>Information we may collect from you</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5">
            <li className={li}>
              If you email us or fill out a contact form, we may keep a record
              of that correspondence.
            </li>
            <li className={li}>
              If you contact us, we may keep a record of that correspondence.
            </li>
            <li className={li}>
              We may also ask you to complete surveys that we use for research
              purposes, although you do not have to respond to them.
            </li>
            <li className={li}>
              Details of transactions you initiate through our website and the
              personal information we need to collect to fulfil your orders.
            </li>
            <li className={li}>
              We may track your visits to our site through our website
              analytics. This anonymous data is used to track general traffic
              behaviour.
            </li>
          </ol>

          <h2 className={h2}>Cookies</h2>
          <p className={p}>
            This site has the capability to track cookies which if used would
            help us to distinguish you from other users of our website. This
            helps us to provide you with a great customer experience when you
            browse our website and also allows us to improve our site by
            understanding our users&rsquo; online viewing behaviour.
          </p>

          <h2 className={h2}>Where we store your personal data</h2>
          <p className={p}>
            Once we have received your information, we will use strict
            procedures and security features to try to prevent unauthorised
            access.
          </p>

          <h2 className={h2}>Uses made of the information</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5">
            <li className={li}>
              To provide you with information in the instances where you have
              consented to be contacted for such purposes.
            </li>
            <li className={li}>
              To fulfil any contracts entered into between you and us.
            </li>
            <li className={li}>To notify you about changes to our service.</li>
          </ol>

          <h2 className={h2}>Disclosure of your information</h2>
          <p className={p}>
            Information submitted through this website may be processed by service providers that host the website and transmit contact-form emails on our behalf. We use this information to respond to inquiries, operate and secure the website, and comply with applicable legal requirements.
          </p>

          <h2 className={h2}>Changes to our Privacy Policy</h2>
          <p className={p}>
            This Privacy Policy may be updated from time to time. We encourage
            you to revisit this page on your next visit.
          </p>

          <h2 className={h2}>Contact</h2>
          <p className={p}>
            Please feel free to contact us at the number provided on the
            website if you have any questions, comments or requests regarding
            this Privacy Policy.
          </p>
        </section>
      </main>
    </>
  );
}
