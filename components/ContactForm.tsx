"use client";

import { useState } from "react";

const CREAM = "#F5F0E8";
const SAGE_DEEP = "#95A484";
const CHARCOAL = "#1C1A17";
const FIELD_BORDER = "rgba(28,26,23,0.45)";
const FIELD_BORDER_FOCUS = "rgba(28,26,23,1)";
const LABEL_COLOR = "rgba(28,26,23,0.72)";

type Status = "idle" | "submitting" | "sent" | "error";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg("");

    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus("error");
      setErrorMsg("Please enter a valid email so we can write back.");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email: trimmed, phone, message }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "sent") {
    return (
      <div
        className="mx-auto max-w-[560px] border px-8 py-12 text-center"
        style={{ borderColor: FIELD_BORDER, color: CHARCOAL }}
        role="status"
        aria-live="polite"
      >
        <p
          className="font-inter text-[11px] font-light uppercase tracking-widest"
          style={{ color: LABEL_COLOR }}
        >
          Message sent
        </p>
        <p className="mt-5 font-serif-italic text-[28px] leading-[1.2] sm:text-[32px]">
          Thanks — we&rsquo;ll be in touch.
        </p>
        <p
          className="mx-auto mt-4 max-w-[380px] font-inter text-[14px] font-light leading-[1.7]"
          style={{ color: "rgba(28,26,23,0.8)" }}
        >
          Someone from the front desk will reach out within one business day.
          For anything urgent, please call (541) 550&#8209;5311.
        </p>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="mx-auto max-w-[640px]"
      aria-describedby={errorMsg ? "contact-error" : undefined}
    >
      <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
        <Field
          label="Name"
          name="name"
          value={name}
          onChange={setName}
          autoComplete="name"
          disabled={submitting}
        />
        <Field
          label="Email"
          name="email"
          type="email"
          required
          value={email}
          onChange={setEmail}
          autoComplete="email"
          disabled={submitting}
        />
      </div>
      <div className="mt-5 sm:mt-6">
        <Field
          label="Phone (optional)"
          name="phone"
          type="tel"
          value={phone}
          onChange={setPhone}
          autoComplete="tel"
          disabled={submitting}
        />
      </div>
      <div className="mt-5 sm:mt-6">
        <Field
          label="What's on your mind? (optional)"
          name="message"
          multiline
          value={message}
          onChange={setMessage}
          disabled={submitting}
        />
      </div>

      {errorMsg ? (
        <p
          id="contact-error"
          role="alert"
          className="mt-5 font-inter text-[13px]"
          style={{ color: "#F2D6C0" }}
        >
          {errorMsg}
        </p>
      ) : null}

      <div className="mt-8 flex flex-col items-start gap-4 sm:mt-10 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center rounded-full px-9 py-3.5 font-inter text-[12px] uppercase tracking-[0.2em] transition-colors disabled:cursor-not-allowed disabled:opacity-60 sm:text-[13px]"
          style={{ backgroundColor: "#403328", color: CREAM }}
          onMouseEnter={(e) => {
            if (!submitting) e.currentTarget.style.backgroundColor = "#504233";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#403328";
          }}
        >
          {submitting ? "Sending…" : "Send message"}
        </button>
        <p
          className="font-inter text-[12px] font-light leading-[1.6]"
          style={{ color: LABEL_COLOR }}
        >
          Only email is required. We&rsquo;ll usually reply within one business day.
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  required,
  multiline,
  autoComplete,
  disabled,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  multiline?: boolean;
  autoComplete?: string;
  disabled?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const borderColor = focused ? FIELD_BORDER_FOCUS : FIELD_BORDER;
  const baseInputClass =
    "w-full bg-transparent pb-3 pt-2 font-inter text-[15px] font-light text-charcoal placeholder:text-charcoal/40 focus:outline-none disabled:opacity-60";

  return (
    <label htmlFor={name} className="block">
      <span
        className="block font-inter text-[11px] font-light uppercase tracking-widest"
        style={{ color: LABEL_COLOR }}
      >
        {label}
        {required ? (
          <span aria-hidden style={{ marginLeft: 6, color: CHARCOAL }}>
            *
          </span>
        ) : null}
      </span>
      <div
        className="mt-2 border-b transition-colors"
        style={{ borderColor }}
      >
        {multiline ? (
          <textarea
            id={name}
            name={name}
            rows={4}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            required={required}
            disabled={disabled}
            className={`${baseInputClass} resize-none`}
            style={{ color: CHARCOAL }}
          />
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            required={required}
            disabled={disabled}
            autoComplete={autoComplete}
            className={baseInputClass}
            style={{ color: CHARCOAL }}
          />
        )}
      </div>
    </label>
  );
}
