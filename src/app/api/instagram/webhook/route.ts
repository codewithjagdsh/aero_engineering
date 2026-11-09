import { createHmac, timingSafeEqual } from "node:crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function reply(text: string, status = 200) {
  return new Response(text, { status, headers: { "Content-Type": "text/plain", "Cache-Control": "no-store" } });
}

export async function GET(request: Request) {
  const expected = process.env.INSTAGRAM_VERIFY_TOKEN;
  if (!expected) return reply("Webhook is not configured", 503);
  const query = new URL(request.url).searchParams;
  const token = query.get("hub.verify_token") ?? "";
  const a = Buffer.from(token);
  const b = Buffer.from(expected);
  if (query.get("hub.mode") !== "subscribe" || a.length !== b.length || !timingSafeEqual(a, b)) {
    return reply("Forbidden", 403);
  }
  const challenge = query.get("hub.challenge");
  return challenge ? reply(challenge) : reply("Missing challenge", 400);
}

export async function POST(request: Request) {
  const secret = process.env.META_APP_SECRET;
  if (!secret) return reply("Webhook is not configured", 503);
  const signature = request.headers.get("x-hub-signature-256") ?? "";
  if (!/^sha256=[a-f0-9]{64}$/i.test(signature)) return reply("Forbidden", 403);
  const body = Buffer.from(await request.arrayBuffer());
  if (body.length > 1024 * 1024) return reply("Payload too large", 413);
  const expected = createHmac("sha256", secret).update(body).digest();
  const received = Buffer.from(signature.slice(7), "hex");
  if (!timingSafeEqual(expected, received)) return reply("Forbidden", 403);
  // Do not acknowledge and discard customer messages. Add a durable inbox
  // and retry-safe worker before enabling the account webhook subscription.
  return reply("Message processing is not enabled yet", 503);
}
