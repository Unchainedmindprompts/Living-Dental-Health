"use client";

import { useState } from "react";
import MobileDrawer from "./MobileDrawer";
import { useBooking } from "./BookingProvider";

export default function TopNav() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { open: openBooking } = useBooking();

  return (
    <>
      <div className="w-full bg-sage text-cream-soft">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-6 px-6 py-3 text-[12px] uppercase tracking-[0.18em]">
          <div className="hidden whitespace-nowrap opacity-90 nav:block">
            living dental health · bend, or
          </div>

          <nav className="mx-auto hidden items-center gap-8 nav:flex">
            <a href="#services" className="sweep">Menu</a>
            <a href="#gallery" className="sweep">Smile Gallery</a>
            <a href="tel:+15415505311" className="sweep">Call</a>
            <button
              onClick={() => openBooking()}
              className="sweep"
              type="button"
            >
              Book
            </button>
          </nav>

          <div className="hidden whitespace-nowrap opacity-90 nav:block">
            open today · 8a–5p
          </div>

          {/* Mobile compact bar */}
          <div className="flex w-full items-center justify-between nav:hidden">
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setDrawerOpen(true)}
              className="flex h-8 w-8 flex-col items-center justify-center gap-[5px]"
            >
              <span className="block h-px w-5 bg-cream-soft" />
              <span className="block h-px w-5 bg-cream-soft" />
              <span className="block h-px w-5 bg-cream-soft" />
            </button>
            <span className="whitespace-nowrap text-[11px] opacity-90">
              living dental health
            </span>
            <button
              type="button"
              onClick={() => openBooking()}
              className="sweep text-[11px]"
            >
              Book
            </button>
          </div>
        </div>
      </div>

      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onBook={() => {
          setDrawerOpen(false);
          openBooking();
        }}
      />
    </>
  );
}
