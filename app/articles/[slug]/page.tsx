import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import { articlePostSchema, sanitizeJsonLd } from "@/lib/schema";
import { formatDate, getArticle, getArticleSlugs } from "@/lib/articles";

const SAGE = "#6B7C5C";
const SAGE_LABEL = "#9CAF88";

export const dynamicParams = false;

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const article = getArticle(params.slug);
  if (!article) return {};
  const { meta } = article;
  const url = `https://www.livingdentalhealth.com/articles/${meta.slug}`;
  return {
    title: `${meta.title} — Living Dental Health, Bend Oregon`,
    description: meta.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: meta.title,
      description: meta.excerpt,
      url,
      images: meta.featuredImage ? [meta.featuredImage] : undefined,
    },
  };
}

export default function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = getArticle(params.slug);
  if (!article) notFound();
  const { meta, html } = article;

  const schema = articlePostSchema({
    slug: meta.slug,
    title: meta.title,
    excerpt: meta.excerpt,
    datePublished: meta.datePublished,
    dateModified: meta.dateModified,
    featuredImage: meta.featuredImage,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(sanitizeJsonLd(schema)),
        }}
      />
      <main
        className="min-h-screen text-charcoal"
        style={{ backgroundColor: "#F5F0E8" }}
      >
        <Nav />
        <div className="h-[100px]" aria-hidden />

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mx-auto max-w-[760px] px-6 pt-4">
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
                href="/articles"
                className="transition-colors hover:text-charcoal"
              >
                Articles
              </Link>
            </li>
          </ol>
        </nav>

        {/* HEADER */}
        <header className="mx-auto max-w-[760px] px-6 pt-8 sm:pt-10">
          <p className="eyebrow">{formatDate(meta.datePublished)}</p>
          <h1 className="mt-4 font-serif text-[34px] leading-[1.08] text-charcoal sm:text-[46px] md:text-[52px]">
            {meta.title}
          </h1>
        </header>

        {/* FEATURED IMAGE */}
        {meta.featuredImage ? (
          <figure className="mx-auto mt-8 max-w-[1000px] px-6 sm:mt-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={meta.featuredImage}
              alt=""
              className="h-auto w-full rounded-[2px] object-cover"
            />
          </figure>
        ) : null}

        {/* BODY */}
        <article
          className="article-prose mx-auto max-w-[680px] px-6 pb-24 pt-10 sm:pt-12 sm:pb-32"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {/* BACK LINK */}
        <div className="mx-auto max-w-[680px] px-6 pb-28">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 font-inter text-[12px] uppercase tracking-[0.18em] transition-opacity hover:opacity-70"
            style={{ color: SAGE }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path
                d="M11 3L3 11M3 11H9.5M3 11V4.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            All articles
          </Link>
        </div>
      </main>
    </>
  );
}
