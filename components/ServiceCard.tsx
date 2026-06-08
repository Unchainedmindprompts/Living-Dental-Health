import Image from "next/image";
import Link from "next/link";

type Item = { label: string; meta: string };

export default function ServiceCard({
  title,
  items,
  image,
  imageAlt,
  href,
}: {
  title: string;
  items: Item[];
  image: string;
  imageAlt: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="service-card group flex w-full flex-col overflow-hidden text-left"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream-deep">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>

      <div className="service-card-body flex flex-col items-start gap-5 px-5 pt-6 pb-6 sm:gap-6 sm:px-7 sm:pt-7 sm:pb-8">
        <h3
          className="font-serif-italic text-[28px] leading-[1.05] sm:text-[34px]"
          style={{ color: "#F5F0E8" }}
        >
          {title}
        </h3>

        <ul
          className="w-full divide-y border-t"
          style={{ borderColor: "rgba(245,240,232,0.15)" }}
        >
          {items.map((it) => (
            <li
              key={it.label}
              className="flex items-baseline justify-between gap-4 py-3 text-[14px]"
              style={{ borderColor: "rgba(245,240,232,0.15)" }}
            >
              <span style={{ color: "#F5F0E8" }}>{it.label}</span>
              <span
                className="text-[12px]"
                style={{ color: "rgba(245,240,232,0.6)" }}
              >
                {it.meta}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}
