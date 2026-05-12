import { NextResponse } from "next/server";

// TODO: Replace with real provider integration.
// Eventual target: NexHealth or LocalMed for live availability + booking.
// Interim: forward request to email transport (Resend or SendGrid) via
// PRACTICE_EMAIL env var so the front desk receives the lead.

type BookingPayload = {
  reason?: string;
  day?: string;
  time?: string;
  name?: string;
  phone?: string;
  email?: string;
  notes?: string;
};

export async function POST(req: Request) {
  let body: BookingPayload;
  try {
    body = (await req.json()) as BookingPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.name || !body.phone) {
    return NextResponse.json(
      { error: "Name and phone are required." },
      { status: 422 }
    );
  }

  // Server-side log — replace with email transport in production.
  console.log("[booking-request]", {
    reason: body.reason,
    day: body.day,
    time: body.time,
    name: body.name,
    phone: body.phone,
    email: body.email,
    notes: body.notes,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
