"use client";

import { useEffect } from "react";

const links = [
  { num: "01", label: "Home", href: "#top" },
  { num: "02", label: "Services", href: "#services" },
  { num: "03", label: "Meet Dr. Andy", href: "#dentist" },
  { num: "04", label: "Smile Gallery", href: "#gallery" },
  { num: "05", label: "New Patients", href: "#new-patients" },
  { num: "06", label: "Contact", href: "tel:+15415505311" },
];

export default function MobileDrawer({
  open,
  onClose,
  onBook,
}: {
  open: boolean;
  onClose: () => void;
  onBook: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <>
      <div
        aria-hidden={!open}
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-charcoal/40 transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        role="dialog"
        aria-label="Site navigation"
        className={`fixed inset-y-0 left-0 z-50 flex w-[86vw] max-w-[420px] flex-col bg-cream text-charcoal shadow-2xl transition-transform duration-500 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-7 pt-7">
          <span className="eyebrow">Menu</span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="text-charcoal text-[22px] leading-none"
          >
            ×
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 px-7 pt-10">
          {links.map((l) => (
            <a
              key={l.num}
              href={l.href}
              onClick={onClose}
              className="group flex items-baseline gap-5 border-b border-rule py-4"
            >
              <span className="eyebrow w-8 text-warm-gray">{l.num}</span>
              <span className="font-serif-italic text-[32px] leading-none text-charcoal group-hover:text-sage transition-colors">
                {l.label}
              </span>
            </a>
          ))}
        </nav>

        <div className="px-7 pb-8 pt-6">
          <button
            type="button"
            onClick={onBook}
            className="flex w-full items-center justify-between bg-sage px-5 py-4 text-cream-soft transition-colors hover:bg-sage-deep"
          >
            <span className="tracking-[0.28em] uppercase text-[12px]">
              Book a visit
            </span>
            <span aria-hidden>→</span>
          </button>
        </div>
      </aside>
    </>
  );
}
