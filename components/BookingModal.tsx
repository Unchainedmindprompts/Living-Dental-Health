"use client";

import { useEffect, useMemo, useState } from "react";

const REASONS = [
  "Cleaning & Exam",
  "New Patient",
  "Whitening",
  "Smile Consult",
  "Emergency",
  "Something Else",
];

const TIMES = ["8:00a", "10:00a", "1:00p", "3:00p"];

function nextWeekdays(count: number): Date[] {
  const out: Date[] = [];
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  while (out.length < count) {
    d.setDate(d.getDate() + 1);
    const dow = d.getDay();
    if (dow !== 0 && dow !== 6) out.push(new Date(d));
  }
  return out;
}

function fmtDay(d: Date) {
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

export default function BookingModal({
  open,
  onClose,
  initialReason,
}: {
  open: boolean;
  onClose: () => void;
  initialReason?: string;
}) {
  const [step, setStep] = useState(0);
  const [reason, setReason] = useState<string | undefined>(initialReason);
  const [day, setDay] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const days = useMemo(() => nextWeekdays(10), []);

  useEffect(() => {
    if (open) {
      setReason(initialReason);
      setStep(initialReason ? 1 : 0);
      setDay(null);
      setTime(null);
      setName("");
      setPhone("");
      setEmail("");
      setNotes("");
      setConfirmed(false);
    }
  }, [open, initialReason]);

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

  if (!open) return null;

  const canNextFromStep0 = !!reason;
  const canNextFromStep1 = !!day && !!time;

  const submit = async () => {
    setSubmitting(true);
    try {
      await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reason,
          day: day?.toISOString(),
          time,
          name,
          phone,
          email,
          notes,
        }),
      });
    } catch {
      // soft-fail; we still show the confirmation. real impl will surface errors.
    }
    setSubmitting(false);
    setConfirmed(true);
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-charcoal/50 px-4 py-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Book a visit"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[640px] overflow-hidden bg-cream shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-rule px-8 py-5">
          <span className="eyebrow">Book a visit</span>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="text-[22px] leading-none text-charcoal"
          >
            ×
          </button>
        </div>

        <div className="flex items-center gap-2 px-8 pt-6">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`h-[6px] flex-1 ${
                i <= step && !confirmed ? "bg-sage" : "bg-rule"
              } ${confirmed ? "bg-sage" : ""}`}
            />
          ))}
        </div>

        <div className="px-8 py-8">
          {confirmed ? (
            <div className="py-6">
              <p className="eyebrow mb-4">Confirmed</p>
              <h3 className="font-serif-italic text-[34px] leading-tight text-charcoal">
                Thanks, {name || "friend"} — we'll reach out to confirm your{" "}
                {time} on {day ? fmtDay(day) : ""}.
              </h3>
              <p className="mt-5 text-warm-gray">
                If you don't hear from us within one business day, call us at{" "}
                <a href="tel:+15415505311" className="text-sage underline">
                  (541) 550-5311
                </a>
                .
              </p>
              <button
                onClick={onClose}
                className="mt-8 bg-sage px-6 py-3 text-[12px] tracking-[0.28em] uppercase text-cream-soft hover:bg-sage-deep"
              >
                Close
              </button>
            </div>
          ) : step === 0 ? (
            <>
              <p className="eyebrow mb-3">Step one</p>
              <h3 className="font-serif-italic text-[34px] leading-tight text-charcoal">
                What brings you in?
              </h3>
              <div className="mt-6 flex flex-wrap gap-2">
                {REASONS.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setReason(r)}
                    className={`border px-4 py-2 text-[13px] transition-colors ${
                      reason === r
                        ? "border-sage bg-sage text-cream-soft"
                        : "border-line text-charcoal hover:border-sage"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </>
          ) : step === 1 ? (
            <>
              <p className="eyebrow mb-3">Step two</p>
              <h3 className="font-serif-italic text-[34px] leading-tight text-charcoal">
                Pick a day & time.
              </h3>
              <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-5">
                {days.map((d) => {
                  const selected = day?.toDateString() === d.toDateString();
                  return (
                    <button
                      key={d.toISOString()}
                      type="button"
                      onClick={() => setDay(d)}
                      className={`border px-3 py-2 text-[12px] transition-colors ${
                        selected
                          ? "border-sage bg-sage text-cream-soft"
                          : "border-line text-charcoal hover:border-sage"
                      }`}
                    >
                      {fmtDay(d)}
                    </button>
                  );
                })}
              </div>
              <div className="mt-5 grid grid-cols-4 gap-2">
                {TIMES.map((t) => {
                  const selected = time === t;
                  return (
                    <button
                      key={t}
                      type="button"
                      disabled={!day}
                      onClick={() => setTime(t)}
                      className={`border px-3 py-2 text-[12px] transition-colors disabled:opacity-50 ${
                        selected
                          ? "border-sage bg-sage text-cream-soft"
                          : "border-line text-charcoal hover:border-sage"
                      }`}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              <p className="eyebrow mb-3">Step three</p>
              <h3 className="font-serif-italic text-[34px] leading-tight text-charcoal">
                A few details.
              </h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-1 text-[12px] uppercase tracking-[0.2em] text-warm-gray">
                  Name
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border border-line bg-ivory px-3 py-2 text-[14px] normal-case tracking-normal text-charcoal focus:border-sage focus:outline-none"
                  />
                </label>
                <label className="flex flex-col gap-1 text-[12px] uppercase tracking-[0.2em] text-warm-gray">
                  Phone
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="border border-line bg-ivory px-3 py-2 text-[14px] normal-case tracking-normal text-charcoal focus:border-sage focus:outline-none"
                  />
                </label>
                <label className="flex flex-col gap-1 text-[12px] uppercase tracking-[0.2em] text-warm-gray sm:col-span-2">
                  Email
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-line bg-ivory px-3 py-2 text-[14px] normal-case tracking-normal text-charcoal focus:border-sage focus:outline-none"
                  />
                </label>
                <label className="flex flex-col gap-1 text-[12px] uppercase tracking-[0.2em] text-warm-gray sm:col-span-2">
                  Notes (optional)
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="border border-line bg-ivory px-3 py-2 text-[14px] normal-case tracking-normal text-charcoal focus:border-sage focus:outline-none"
                  />
                </label>
              </div>
            </>
          )}
        </div>

        {!confirmed && (
          <div className="flex items-center justify-between border-t border-rule px-8 py-5">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="text-[12px] uppercase tracking-[0.28em] text-warm-gray disabled:opacity-30"
            >
              Back
            </button>
            {step < 2 ? (
              <button
                type="button"
                onClick={() => setStep((s) => s + 1)}
                disabled={
                  (step === 0 && !canNextFromStep0) ||
                  (step === 1 && !canNextFromStep1)
                }
                className="bg-sage px-6 py-3 text-[12px] uppercase tracking-[0.28em] text-cream-soft hover:bg-sage-deep disabled:opacity-40"
              >
                Continue
              </button>
            ) : (
              <button
                type="button"
                onClick={submit}
                disabled={!name || !phone || submitting}
                className="bg-sage px-6 py-3 text-[12px] uppercase tracking-[0.28em] text-cream-soft hover:bg-sage-deep disabled:opacity-40"
              >
                {submitting ? "Sending…" : "Request visit"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
