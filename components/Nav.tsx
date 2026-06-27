"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type Link = { label: string; href: string };

const TREATMENTS: Link[] = [
  { label: "General Dentistry", href: "/general-dentistry" },
  { label: "Cosmetic Dentistry", href: "/cosmetic-dentistry" },
  { label: "Implants & Surgery", href: "/implants-surgery" },
  { label: "Full Mouth Reconstruction", href: "/full-mouth-reconstruction" },
  { label: "Sedation Dentistry", href: "/sedation-dentistry" },
  { label: "Oral Cancer Screening", href: "/oral-cancer-screening" },
];

const ABOUT: Link[] = [
  { label: "Meet Dr. Engel", href: "/about" },
  { label: "The Team", href: "/team" },
  { label: "The Work", href: "/before-and-after" },
  { label: "Articles", href: "/articles" },
];

const PATIENT: Link[] = [
  { label: "New Patients", href: "/patient-info" },
  { label: "Insurance & Financing", href: "/patient-info#insurance" },
  { label: "Post-Op Instructions", href: "/patient-info/post-op" },
];

const COLUMNS: { label: string; items: Link[] }[] = [
  { label: "About", items: ABOUT },
  { label: "Treatments", items: TREATMENTS },
  { label: "Patient Info", items: PATIENT },
];

const SAGE = "#6B7C5C";
const SAGE_DEEP = "#556649";
const CREAM = "#F5F0E8";
const CHARCOAL = "#1C1A17";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const pathname = usePathname();
  const onContactPage = pathname === "/contact";

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
        className="fixed inset-x-0 top-0 z-50 flex h-9 items-center justify-between border-b px-4 font-inter text-[11px] font-light uppercase tracking-widest sm:px-6"
        style={{
          backgroundColor: SAGE,
          color: CREAM,
          borderBottomColor: "#95A484",
        }}
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
          className="group flex items-center gap-3 font-inter text-[14px] font-light uppercase tracking-widest sm:gap-4 sm:text-[16px]"
          style={{ color: onContactPage ? CREAM : CHARCOAL }}
        >
          <span
            aria-hidden
            className="relative flex h-[14px] w-[22px] flex-col items-start justify-between sm:h-[20px] sm:w-[32px]"
          >
            <span className="block h-[1.5px] w-full origin-left bg-current transition-all duration-300 ease-out group-hover:w-[80%]" />
            <span className="block h-[1.5px] w-[70%] origin-left bg-current transition-all duration-300 ease-out group-hover:w-full" />
            <span className="block h-[1.5px] w-full origin-left bg-current transition-all duration-300 ease-out group-hover:w-[80%]" />
          </span>
          <span className="hidden sm:inline">Menu</span>
        </button>

        {!onContactPage && (
          <a
            href="/contact"
            className="rounded-full px-3.5 py-1.5 font-inter text-[10px] font-normal uppercase tracking-[0.16em] transition-colors sm:px-5 sm:py-2 sm:text-[12px] sm:tracking-[0.2em]"
            style={{ backgroundColor: SAGE, color: CREAM }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = SAGE_DEEP)
            }
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = SAGE)}
          >
            Contact
          </a>
        )}
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
        style={{ backgroundColor: SAGE }}
      >
        {/* Brand wordmark — top left */}
        <a
          href="/"
          onClick={() => setOpen(false)}
          className="absolute left-4 top-6 z-10 font-serif text-[18px] italic leading-none transition-opacity hover:opacity-70 sm:left-8 sm:top-8 sm:text-[20px]"
          style={{ color: CREAM }}
        >
          Living Dental Health
        </a>

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
          className="grid h-full grid-cols-1 content-center gap-y-12 overflow-y-auto px-6 pb-32 pt-24 sm:px-12 md:grid-cols-3 md:gap-x-12 md:px-20 md:pt-28 lg:grid-cols-3 lg:gap-x-16 lg:px-20 xl:px-28"
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
                style={{ color: "rgba(245,240,232,0.7)" }}
              >
                {col.label}
              </p>
              <ul className="space-y-3">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="group relative inline-block font-serif text-[32px] font-light leading-[1.1] sm:text-[38px] md:text-[40px] lg:text-[30px] xl:text-[34px]"
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

        {/* Contact CTA — centered along the bottom; mirrors the top-bar pill */}
        {!onContactPage && (
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center px-6 pb-16 sm:pb-20"
            style={{
              opacity: revealed ? 1 : 0,
              transform: revealed ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 500ms ease-out, transform 500ms ease-out",
              transitionDelay: revealed ? "700ms" : "0ms",
            }}
          >
            <a
              href="/contact"
              onClick={() => setOpen(false)}
              className="pointer-events-auto inline-flex items-center rounded-full border px-7 py-3 font-inter text-[12px] uppercase tracking-[0.2em] transition-colors sm:px-9 sm:py-3.5 sm:text-[13px]"
              style={{ borderColor: CREAM, color: CREAM }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = CREAM;
                e.currentTarget.style.color = SAGE_DEEP;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = CREAM;
              }}
            >
              Contact
            </a>
          </div>
        )}

        {/* Est. 2013 — bottom right, balances brand top-left */}
        <div
          className="absolute inset-x-0 bottom-0 flex items-end justify-end px-6 pb-6 sm:px-12 sm:pb-8 md:px-20 lg:px-28"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 500ms ease-out, transform 500ms ease-out",
            transitionDelay: revealed ? "600ms" : "0ms",
          }}
        >
          <p
            className="font-serif text-[20px] italic"
            style={{ color: CREAM }}
          >
            Est. 2013
          </p>
        </div>
      </div>
    </>
  );
}
