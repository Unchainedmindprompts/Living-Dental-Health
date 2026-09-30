import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";
const MAX_BYTES = 16_384;
const limits = {
  name: 100,
  email: 254,
  phone: 40,
  message: 3000,
  website: 200,
};
type ContactPayload = Record<keyof typeof limits, string>;
const failure = (error: string, status: number) =>
  NextResponse.json({ error }, { status });
const unavailable =
  "Online requests are temporarily unavailable. Please call (541) 550-5311.";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: Request) {
  const origin = req.headers.get("origin");
  if (origin && origin !== new URL(req.url).origin)
    return failure("Invalid request origin.", 403);
  if (!req.headers.get("content-type")?.includes("application/json"))
    return failure("JSON is required.", 415);
  if (Number(req.headers.get("content-length")) > MAX_BYTES)
    return failure("Request is too large.", 413);

  let input: unknown;
  try {
    const reader = req.body?.getReader();
    if (!reader) return failure("Invalid request.", 400);
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BYTES) {
        await reader.cancel();
        return failure("Request is too large.", 413);
      }
      chunks.push(value);
    }
    input = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return failure("Invalid JSON.", 400);
  }
  if (!input || typeof input !== "object" || Array.isArray(input))
    return failure("Invalid request.", 400);
  const body = {} as ContactPayload;
  for (const [key, limit] of Object.entries(limits)) {
    const value = (input as Record<string, unknown>)[key] ?? "";
    if (typeof value !== "string" || value.length > limit)
      return failure("Please check your form fields.", 422);
    body[key as keyof ContactPayload] = value.trim();
  }
  const { name, email, phone, message, website } = body;
  if (website)
    return failure("Unable to submit this request. Please call us.", 422);
  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    /[\r\n]/.test(name + email + phone)
  )
    return failure("A valid email address is required.", 422);

  // Never log patient contact details or report success without a delivery transport.
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return failure(unavailable, 503);
  try {
    const { data, error } = await new Resend(apiKey).emails.send({
      from:
        process.env.CONTACT_FROM_EMAIL ||
        "Living Dental Health <noreply@livingdentalhealth.com>",
      to: [process.env.CONTACT_TO_EMAIL || "info@livingdentalhealth.com"],
      replyTo: email,
      subject: "New website appointment request",
      text: [
        `Name: ${name || "(not provided)"}`,
        `Email: ${email}`,
        `Phone: ${phone || "(not provided)"}`,
        "",
        "Message:",
        message || "(no message)",
      ].join("\n"),
      html: `<h2>New website appointment request</h2><p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Phone:</strong> ${escapeHtml(phone)}</p><p><strong>Message:</strong><br>${escapeHtml(message).replace(/\n/g, "<br>")}</p>`,
    });
    if (error || !data?.id) return failure(unavailable, 502);
    return NextResponse.json({ ok: true });
  } catch {
    return failure(unavailable, 502);
  }
}
