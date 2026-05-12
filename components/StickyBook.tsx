"use client";

import { useBooking } from "./BookingProvider";

export default function StickyBook() {
  const { open } = useBooking();
  return (
    <button
      type="button"
      onClick={() => open()}
      className="fixed bottom-4 right-4 z-40 flex items-center gap-2 rounded-full bg-sage p-2 text-[11px] uppercase tracking-[0.22em] text-cream-soft shadow-lg transition-colors hover:bg-sage-deep sm:bottom-6 sm:right-6 sm:gap-3 sm:py-3 sm:pl-5 sm:pr-3 sm:text-[12px] sm:tracking-[0.28em]"
      aria-label="Book a visit"
    >
      <span className="hidden pl-3 sm:inline">Book a visit</span>
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cream-soft text-sage transition-transform sm:h-8 sm:w-8">
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
