import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";
import { cosmeticServices, CosmeticServiceKey } from "@/lib/cosmetic-services";
import {
  whiteningPageSchema,
  alignersPageSchema,
  sanitizeJsonLd,
} from "@/lib/schema";

export default function CosmeticServicePage({
  kind,
}: {
  kind: CosmeticServiceKey;
}) {
  const service = cosmeticServices[kind];
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            sanitizeJsonLd(
              kind === "whitening" ? whiteningPageSchema : alignersPageSchema,
            ),
          ),
        }}
      />
      <Nav />
      <main className="min-h-screen bg-cream pb-20 pt-[120px] text-charcoal">
        <nav
          aria-label="Breadcrumb"
          className="mx-auto max-w-[1200px] px-6 text-[12px] text-warm-gray"
        >
          <Link href="/">Home</Link> /{" "}
          <Link href="/cosmetic-dentistry">Cosmetic Dentistry</Link> /{" "}
          {service.label}
        </nav>
        <header className="mx-auto grid max-w-[1200px] items-center gap-8 px-6 py-10 lg:grid-cols-2 lg:gap-14 lg:py-16">
          <div>
            <p className="eyebrow">Living Dental Health · Bend, Oregon</p>
            <h1 className="mt-5 font-serif text-[40px] leading-[1.08] sm:text-[56px]">
              {service.title}
            </h1>
            <p className="mt-6 text-[17px] leading-relaxed text-charcoal-soft">
              {service.intro}
            </p>
            <Link
              href="/contact"
              className="mt-7 inline-block rounded-full bg-sage px-7 py-3.5 text-[13px] text-cream hover:bg-charcoal"
            >
              {service.cta}
            </Link>
            <a
              href="tel:+15415505311"
              className="mt-4 block text-[14px] underline underline-offset-4"
            >
              Call (541) 550-5311
            </a>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <Image
              src={service.image}
              alt={service.imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-right"
            />
          </div>
        </header>
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid gap-5 md:grid-cols-2">
            {service.sections.map((section) => (
              <section
                key={section.heading}
                className="rounded-xl bg-cream-deep p-7 sm:p-9"
              >
                <h2 className="font-serif text-[28px] leading-tight">
                  {section.heading}
                </h2>
                <p className="mt-4 text-[15px] leading-[1.8] text-charcoal-soft">
                  {section.body}
                </p>
                {"link" in section && (
                  <Link
                    className="mt-5 inline-block text-sage underline underline-offset-4"
                    href={section.link.href}
                  >
                    {section.link.label}
                  </Link>
                )}
                {"source" in section && (
                  <a
                    className="mt-5 inline-block text-[13px] text-sage underline underline-offset-4"
                    href={section.source.url}
                  >
                    {section.source.label}
                  </a>
                )}
              </section>
            ))}
          </div>
          <section className="mx-auto max-w-[800px] py-16">
            <h2 className="font-serif text-[34px]">
              Your questions, answered.
            </h2>
            <dl className="mt-7">
              {service.faq.map((f) => (
                <div key={f.q} className="border-t border-rule py-6">
                  <dt>
                    <h3 className="font-serif text-[23px]">{f.q}</h3>
                  </dt>
                  <dd className="mt-3 text-[15px] leading-relaxed text-charcoal-soft">
                    {f.a}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
          <section className="rounded-xl bg-sage p-8 text-cream sm:p-12">
            <h2 className="font-serif text-[34px]">
              Let’s talk about your smile.
            </h2>
            <p className="mt-4 max-w-[700px] leading-relaxed">
              Meet Dr. Andy Engel, explore your options, and decide on a plan
              that makes sense for you. An inquiry is a request; our team will
              contact you to arrange a visit.
            </p>
            <div className="mt-6 flex flex-wrap gap-5">
              <Link
                href="/contact"
                className="rounded-full bg-cream px-7 py-3 text-sage"
              >
                {service.cta}
              </Link>
              <Link
                href="/about"
                className="self-center underline underline-offset-4"
              >
                Meet Dr. Engel
              </Link>
              <Link
                href="/cosmetic-dentistry"
                className="self-center underline underline-offset-4"
              >
                All cosmetic services
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
