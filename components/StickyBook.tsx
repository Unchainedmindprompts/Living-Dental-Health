"use client";

import { useBooking } from "./BookingProvider";

export default function StickyBook() {
  const { open } = useBooking();
  return (
    <button
      type="button"
      onClick={() => open()}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3 rounded-full bg-sage py-3 pl-5 pr-3 text-[12px] uppercase tracking-[0.28em] text-cream-soft shadow-lg transition-colors hover:bg-sage-deep"
      aria-label="Book a visit"
    >
      <span>Book a visit</span>
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cream-soft text-sage transition-transform group-hover:rotate-45">
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
    </button>
  );
}
