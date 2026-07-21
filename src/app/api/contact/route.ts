import { NextResponse } from "next/server";
import { site } from "@/lib/site";

export const runtime = "nodejs";

/**
 * Simple in-memory rate limit. Adequate for a single-instance marketing
 * site; move to Upstash/Redis if you ever run more than one instance.
 */
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

function str(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many enquiries from this connection. Please email us directly." },
      { status: 429 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real users never fill this field.
  if (str(body.company_website)) {
    return NextResponse.json({ ok: true });
  }

  const name = str(body.name);
  const email = str(body.email);
  const message = str(body.message);
  const company = str(body.company);
  const phone = str(body.phone);

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Please provide your name, email and a short message." },
      { status: 400 },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json({ error: "That email address doesn't look right." }, { status: 400 });
  }

  if (message.length > 5000) {
    return NextResponse.json({ error: "That message is too long." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? site.contact.email;
  const from = process.env.CONTACT_FROM_EMAIL;

  // Never pretend an enquiry was delivered when it wasn't — the visitor
  // gets told to email directly instead of assuming we'll be in touch.
  if (!apiKey || !from) {
    console.error(
      "[contact] Email is not configured. Set RESEND_API_KEY and CONTACT_FROM_EMAIL. Enquiry received from:",
      email,
    );
    return NextResponse.json(
      {
        error: `Our contact form isn't available right now. Please email us directly at ${site.contact.email}.`,
      },
      { status: 503 },
    );
  }

  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Company", company || "—"],
    ["Phone", phone || "—"],
  ];

  const html = `
    <h2>New enquiry via ${site.domain}</h2>
    <table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
      ${rows
        .map(
          ([label, value]) =>
            `<tr><td style="color:#666">${label}</td><td><strong>${escapeHtml(value)}</strong></td></tr>`,
        )
        .join("")}
    </table>
    <h3>Message</h3>
    <p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap">${escapeHtml(message)}</p>
  `;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Enquiry from ${name}${company ? ` · ${company}` : ""}`,
        html,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("[contact] Resend rejected the request:", res.status, detail);
      return NextResponse.json(
        { error: `We couldn't send that. Please email us directly at ${site.contact.email}.` },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] Failed to send:", error);
    return NextResponse.json(
      { error: `We couldn't send that. Please email us directly at ${site.contact.email}.` },
      { status: 502 },
    );
  }
}
