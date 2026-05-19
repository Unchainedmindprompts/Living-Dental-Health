import Image from "next/image";
import Link from "next/link";

type Item = { label: string; meta: string };

export default function ServiceCard({
  title,
  items,
  image,
  imageAlt,
}: {
  title: string;
  items: Item[];
  image: string;
  imageAlt: string;
}) {
  return (
    <Link
      href="/contact"
      className="service-card group flex w-full flex-col overflow-hidden text-left"
    >
      <div className="relative h-[240px] w-full overflow-hidden bg-cream-deep">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-col items-start gap-5 px-5 pt-6 pb-6 sm:gap-6 sm:px-7 sm:pt-7 sm:pb-8">
        <h3 className="font-serif-italic text-[28px] leading-[1.05] text-charcoal sm:text-[34px]">
          {title}
        </h3>

        <ul className="w-full divide-y divide-rule border-t border-rule">
          {items.map((it) => (
            <li
              key={it.label}
              className="flex items-baseline justify-between gap-4 py-3 text-[14px]"
            >
              <span className="text-charcoal">{it.label}</span>
              <span className="text-warm-gray text-[12px]">{it.meta}</span>
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}
