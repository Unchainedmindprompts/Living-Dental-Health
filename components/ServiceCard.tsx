"use client";

import { useBooking } from "./BookingProvider";

type Item = { label: string; meta: string };

export default function ServiceCard({
  index,
  title,
  items,
  reason,
}: {
  index: string;
  title: string;
  items: Item[];
  reason: string;
}) {
  const { open } = useBooking();
  return (
    <button
      type="button"
      onClick={() => open(reason)}
      className="service-card group flex w-full flex-col items-start gap-5 px-5 pt-7 pb-6 text-left sm:gap-7 sm:px-7 sm:pt-9 sm:pb-8"
    >
      <div className="flex w-full items-start justify-between">
        <span className="eyebrow">{index}</span>
        <span className="arrow-disc flex h-10 w-10 items-center justify-center rounded-full border border-line text-charcoal">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
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
    </button>
  );
}
