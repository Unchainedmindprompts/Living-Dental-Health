import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import { articlesPageSchema, sanitizeJsonLd } from "@/lib/schema";
import { formatDate, getAllArticles, type ArticleMeta } from "@/lib/articles";

const SAGE = "#6B7C5C";
const SAGE_LABEL = "#9CAF88";

export const metadata: Metadata = {
  title: "Articles — Living Dental Health, Bend Oregon",
  description:
    "Practical dental health information from Dr. Andy Engel and the Living Dental Health team in Bend, Oregon — 28 years of experience, written down.",
};

function ArticleCard({ slug, title, datePublished, excerpt, featuredImage }: ArticleMeta) {
  return (
    <Link
      href={`/articles/${slug}`}
      className="service-card group flex w-full flex-col overflow-hidden text-left"
    >
      {featuredImage ? (
        <div className="aspect-[16/10] w-full overflow-hidden bg-cream-deep">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={featuredImage}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col gap-3 px-7 pt-6 pb-7">
        <p className="eyebrow">{formatDate(datePublished)}</p>
        <h2 className="font-serif-italic text-[25px] leading-[1.12] text-charcoal sm:text-[28px]">
          {title}
        </h2>
        <p className="line-clamp-3 font-inter text-[14px] font-light leading-[1.7] text-charcoal-soft sm:text-[15px]">
          {excerpt}
        </p>
        <span
          className="mt-auto inline-flex items-center gap-2 pt-2 font-inter text-[12px] uppercase tracking-[0.18em]"
          style={{ color: SAGE }}
        >
          Read more
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path
              d="M3 11L11 3M11 3H4.5M11 3V9.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </Link>
  );
}

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(sanitizeJsonLd(articlesPageSchema)),
        }}
      />
      <main
        className="min-h-screen text-charcoal"
        style={{ backgroundColor: "#F5F0E8" }}
      >
        <Nav />
        <div className="h-[100px]" aria-hidden />

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mx-auto max-w-[1320px] px-6 pt-4">
          <ol className="flex items-center gap-2 font-inter text-[11px] font-light uppercase tracking-widest text-warm-gray">
            <li>
              <Link href="/" className="transition-colors hover:text-charcoal">
                Home
              </Link>
            </li>
            <li aria-hidden style={{ color: SAGE_LABEL }}>
              /
            </li>
            <li style={{ color: SAGE }}>Articles</li>
          </ol>
        </nav>

        {/* HEADER */}
        <section className="mx-auto max-w-[1320px] px-6 pt-8 pb-10 text-center sm:pt-12">
          <p
            className="font-inter text-[11px] font-light uppercase tracking-widest"
            style={{ color: SAGE }}
          >
            &mdash; articles &mdash;
          </p>
          <h1 className="mt-5 font-serif text-[40px] leading-[1.05] text-charcoal sm:mt-6 sm:text-[64px] md:text-[80px]">
            Dental health, <span className="font-serif-italic">explained.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-[620px] font-inter text-[16px] font-light leading-[1.7] text-warm-gray sm:text-[18px]">
            Practical information from Dr. Andy Engel and the Living Dental
            Health team. 28 years of experience, written down.
          </p>
        </section>

        {/* GRID / EMPTY STATE */}
        <section className="mx-auto max-w-[1320px] px-6 pt-6 pb-24 sm:pt-10 sm:pb-32">
          {articles.length > 0 ? (
            <div className="mx-auto grid max-w-[1200px] gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((a) => (
                <ArticleCard key={a.slug} {...a} />
              ))}
            </div>
          ) : (
            <div
              className="mx-auto max-w-[600px] border p-10 text-center sm:p-12"
              style={{
                borderColor: "rgba(28,26,23,0.18)",
                backgroundColor: "#FBF8F2",
              }}
            >
              <p
                className="font-inter text-[11px] font-light uppercase tracking-widest"
                style={{ color: SAGE }}
              >
                Coming soon
              </p>
              <h2 className="mt-4 font-serif-italic text-[30px] leading-[1.1] text-charcoal sm:text-[36px]">
                Articles coming soon
              </h2>
              <p className="mx-auto mt-4 max-w-[440px] font-inter text-[15px] font-light leading-[1.7] text-charcoal-soft sm:text-[16px]">
                Dr. Engel will be sharing insights on dental health, implants,
                cosmetic dentistry, and what it means to take care of your smile
                for life.
              </p>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
