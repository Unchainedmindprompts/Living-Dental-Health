import Link from "next/link";
import { formatDate, type ArticleMeta } from "@/lib/articles";

const SAGE_LABEL = "#9CAF88";
const CREAM_SOFT = "#F5F0E8";

export default function ArticleCard({
  slug,
  title,
  datePublished,
  excerpt,
  featuredImage,
}: ArticleMeta) {
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
      <div className="article-card-body flex flex-1 flex-col gap-3 px-7 pt-6 pb-7">
        <p
          className="font-inter text-[11px] font-light uppercase tracking-widest"
          style={{ color: "rgba(245,240,232,0.65)" }}
        >
          {formatDate(datePublished)}
        </p>
        <h3
          className="font-serif-italic text-[25px] leading-[1.12] sm:text-[28px]"
          style={{ color: CREAM_SOFT }}
        >
          {title}
        </h3>
        <p
          className="line-clamp-3 font-inter text-[14px] font-light leading-[1.7] sm:text-[15px]"
          style={{ color: "rgba(245,240,232,0.78)" }}
        >
          {excerpt}
        </p>
        <span
          className="mt-auto inline-flex items-center gap-2 pt-2 font-inter text-[12px] uppercase tracking-[0.18em]"
          style={{ color: SAGE_LABEL }}
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
