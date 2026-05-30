import { NextResponse } from "next/server";

// Stub for launch — replace with email transport (Resend / SendGrid / etc.)
// so the front desk receives leads at info@livingdentalhealth.com.
type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: ContactPayload;
  try {
    body = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const email = (body.email || "").trim();
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "A valid email address is required." },
      { status: 422 }
    );
  }

  console.log("[contact-request]", {
    name: (body.name || "").trim(),
    email,
    phone: (body.phone || "").trim(),
    message: (body.message || "").trim(),
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
