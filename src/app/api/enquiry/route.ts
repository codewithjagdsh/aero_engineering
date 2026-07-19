import nodemailer from "nodemailer";
import { siteConfig } from "@/lib/site-config";

type EnquiryBody = {
  name?: string;
  company?: string;
  phone?: string;
  email?: string;
  requirement?: string;
  message?: string;
};

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export async function POST(request: Request) {
  const body = (await request.json()) as EnquiryBody;

  const name = body.name?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name || !phone || !email || !message) {
    return Response.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const user = process.env.GMAIL_USER?.trim();
  // Gmail shows App Passwords in 4-character groups; spaces must be removed.
  const pass = process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, "");

  if (!user || !pass) {
    console.error(
      "Enquiry email not configured: set GMAIL_USER and GMAIL_APP_PASSWORD in .env.local"
    );
    return Response.json(
      { error: "Email service is not configured" },
      { status: 500 }
    );
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  const rows: Array<[string, string]> = [
    ["Name", name],
    ["Company", body.company?.trim() || "—"],
    ["Phone", phone],
    ["Email", email],
    ["Requirement", body.requirement?.trim() || "—"],
    ["Message", message],
  ];

  const html = `
    <h2>New enquiry from ${escapeHtml(siteConfig.name)} website</h2>
    <table border="0" cellpadding="8" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
      ${rows
        .map(
          ([label, value]) =>
            `<tr><td style="font-weight:bold;vertical-align:top;border:1px solid #ddd">${label}</td><td style="border:1px solid #ddd;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`
        )
        .join("")}
    </table>`;

  try {
    await transporter.sendMail({
      from: `"${siteConfig.name} Website" <${user}>`,
      to: siteConfig.email,
      replyTo: email,
      subject: `New Enquiry: ${body.requirement?.trim() || "General"} — ${name} (${phone})`,
      text: rows.map(([label, value]) => `${label}: ${value}`).join("\n"),
      html,
    });
  } catch (err) {
    console.error("Failed to send enquiry email:", err);
    return Response.json(
      { error: "Failed to send enquiry" },
      { status: 502 }
    );
  }

  return Response.json({ ok: true });
}
