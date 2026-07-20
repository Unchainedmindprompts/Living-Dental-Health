import { NextResponse } from "next/server";
import { Resend } from "resend";

// Contact form handler.
//
// Sends each submission to the front desk via Resend. Set these in the
// Vercel project's Environment Variables (Settings → Environment Variables):
//   RESEND_API_KEY      — your Resend API key (starts with "re_")
//   CONTACT_TO_EMAIL    — optional; where leads go (default below)
//   CONTACT_FROM_EMAIL  — optional; a verified-domain sender (default below)
//
// Until RESEND_API_KEY is set, the handler safely no-ops (logs the lead and
// returns ok) so the form never errors before email is wired up.
type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "info@livingdentalhealth.com";
const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL ||
  "Living Dental Health <noreply@livingdentalhealth.com>";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(req: Request) {
  let body: ContactPayload;
  try {
    body = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const phone = (body.phone || "").trim();
  const message = (body.message || "").trim();

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "A valid email address is required." },
      { status: 422 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;

  // No key yet → don't error the visitor; log so the lead isn't lost in dev.
  if (!apiKey) {
    console.log("[contact-request:no-email-transport]", {
      name,
      email,
      phone,
      message,
      receivedAt: new Date().toISOString(),
    });
    return NextResponse.json({ ok: true });
  }

  const resend = new Resend(apiKey);

  const lines = [
    `Name: ${name || "(not provided)"}`,
    `Email: ${email}`,
    `Phone: ${phone || "(not provided)"}`,
    "",
    "Message:",
    message || "(no message)",
  ];

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      replyTo: email,
      subject: `New website inquiry${name ? ` from ${name}` : ""}`,
      text: lines.join("\n"),
      html: `
        <h2>New website inquiry</h2>
        <p><strong>Name:</strong> ${escapeHtml(name) || "(not provided)"}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone) || "(not provided)"}</p>
        <p><strong>Message:</strong><br>${
          escapeHtml(message).replace(/\n/g, "<br>") || "(no message)"
        }</p>
      `,
    });

    if (error) {
      console.error("[contact-request:resend-error]", error);
      return NextResponse.json(
        { error: "Could not send your message. Please call us instead." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact-request:exception]", err);
    return NextResponse.json(
      { error: "Could not send your message. Please call us instead." },
      { status: 502 }
    );
  }
}
