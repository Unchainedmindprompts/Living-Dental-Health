"use client";

import { useEffect, useState } from "react";

type Link = { label: string; href: string };

const SERVICES: Link[] = [
  { label: "General Dentistry", href: "#" },
  { label: "Cosmetic Dentistry", href: "#" },
  { label: "Implants & Surgery", href: "#" },
];

const ABOUT: Link[] = [
  { label: "Home", href: "/" },
  { label: "Meet Dr. Engel", href: "#" },
  { label: "Our Philosophy", href: "#" },
  { label: "The Team", href: "#" },
  { label: "Smile Gallery", href: "#" },
];

const PATIENT: Link[] = [
  { label: "New Patients", href: "#" },
  { label: "Insurance & Financing", href: "#" },
  { label: "Post-Op Instructions", href: "#" },
  { label: "Contact", href: "/contact" },
];

const COLUMNS: { label: string; items: Link[] }[] = [
  { label: "Services", items: SERVICES },
  { label: "About", items: ABOUT },
  { label: "Patient Info", items: PATIENT },
];

const SAGE = "#6B7C5C";
const SAGE_DEEP = "#556649";
const SAGE_LABEL = "#9CAF88";
const CREAM = "#F5F0E8";
const FOREST = "#2C3B2D";
const CHARCOAL = "#1C1A17";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      setRevealed(false);
      return;
    }
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => setRevealed(true), 60);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      {/* UTILITY BAR */}
      <div
        className="fixed inset-x-0 top-0 z-50 flex h-9 items-center justify-between px-4 font-inter text-[11px] font-light uppercase tracking-widest sm:px-6"
        style={{ backgroundColor: SAGE, color: CREAM }}
      >
        <a
          href="/"
          className="whitespace-nowrap transition-opacity hover:opacity-70"
        >
          Living Dental Health <span className="opacity-60">·</span> Bend, OR
        </a>
        <nav
          aria-label="Quick links"
          className="hidden items-center gap-5 md:flex"
        >
          <a href="#" className="transition-opacity hover:opacity-70">
            Smile Gallery
          </a>
          <span aria-hidden className="opacity-40">
            |
          </span>
          <a
            href="tel:5415505311"
            className="transition-opacity hover:opacity-70"
          >
            Call
          </a>
          <span aria-hidden className="opacity-40">
            |
          </span>
          <a href="/contact" className="transition-opacity hover:opacity-70">
            Contact
          </a>
        </nav>
        <span className="hidden whitespace-nowrap sm:inline">
          Open Today <span className="opacity-60">·</span> 8A–5P
        </span>
      </div>

      {/* MAIN NAV BAR */}
      <div className="fixed inset-x-0 top-9 z-40 flex h-16 items-center justify-between px-4 sm:px-6">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="group flex items-center gap-3 font-inter text-[12px] font-light uppercase tracking-widest"
          style={{ color: CHARCOAL }}
        >
          <span
            aria-hidden
            className="relative flex h-[14px] w-[22px] flex-col items-start justify-between"
          >
            <span className="block h-px w-full origin-left bg-current transition-all duration-300 ease-out group-hover:w-[80%]" />
            <span className="block h-px w-[70%] origin-left bg-current transition-all duration-300 ease-out group-hover:w-full" />
            <span className="block h-px w-full origin-left bg-current transition-all duration-300 ease-out group-hover:w-[80%]" />
          </span>
          <span>Menu</span>
        </button>

        <a
          href="/contact"
          className="rounded-full px-5 py-2 font-inter text-[12px] font-normal uppercase tracking-[0.2em] transition-colors"
          style={{ backgroundColor: SAGE, color: CREAM }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = SAGE_DEEP)
          }
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = SAGE)}
        >
          Contact
        </a>
      </div>

      {/* FULL-SCREEN OVERLAY */}
      <div
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        className={`fixed inset-0 z-[60] transition-opacity duration-300 ease-out ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        style={{ backgroundColor: FOREST }}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
          className="absolute right-4 top-6 z-10 flex items-center gap-3 font-inter text-[12px] font-light uppercase tracking-widest transition-opacity hover:opacity-70 sm:right-8 sm:top-8"
          style={{ color: CREAM }}
        >
          <span
            aria-hidden
            className="relative inline-block h-[18px] w-[18px]"
          >
            <span className="absolute left-1/2 top-1/2 block h-px w-[22px] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-current" />
            <span className="absolute left-1/2 top-1/2 block h-px w-[22px] -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-current" />
          </span>
          <span>Close</span>
        </button>

        {/* Columns */}
        <div
          className="grid h-full grid-cols-1 content-center gap-y-12 overflow-y-auto px-6 pb-32 pt-24 sm:px-12 md:grid-cols-3 md:gap-x-12 md:px-20 md:pt-28 lg:px-28"
        >
          {COLUMNS.map((col, idx) => (
            <div
              key={col.label}
              style={{
                opacity: revealed ? 1 : 0,
                transform: revealed ? "translateY(0)" : "translateY(10px)",
                transition:
                  "opacity 500ms ease-out, transform 500ms ease-out",
                transitionDelay: revealed ? `${300 + idx * 100}ms` : "0ms",
              }}
            >
              <p
                className="mb-6 font-inter text-[11px] font-light uppercase tracking-widest"
                style={{ color: SAGE_LABEL }}
              >
                {col.label}
              </p>
              <ul className="space-y-3">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="group relative inline-block font-serif text-[32px] font-light leading-[1.1] sm:text-[38px] md:text-[42px]"
                      style={{ color: CREAM }}
                    >
                      <span className="relative inline-block">
                        {item.label}
                        <span
                          aria-hidden
                          className="pointer-events-none absolute -bottom-1 left-0 block h-px w-0 transition-[width] duration-300 ease-out group-hover:w-full"
                          style={{ backgroundColor: CREAM }}
                        />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div
          className="absolute inset-x-0 bottom-0 flex flex-col items-start justify-between gap-3 px-6 pb-6 sm:flex-row sm:items-end sm:px-12 sm:pb-8 md:px-20 lg:px-28"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 500ms ease-out, transform 500ms ease-out",
            transitionDelay: revealed ? "600ms" : "0ms",
          }}
        >
          <div
            className="font-inter text-[12px] font-light leading-[1.6]"
            style={{ color: SAGE_LABEL }}
          >
            <p>930 SW Yates Drive · Bend, OR 97702</p>
            <p>(541) 550-5311</p>
          </div>
          <p
            className="font-serif text-[20px] italic"
            style={{ color: CREAM }}
          >
            Est. 1998
          </p>
        </div>
      </div>
    </>
  );
}
