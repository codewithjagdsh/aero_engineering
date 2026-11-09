import { after } from "next/server.js";
import { runWorkerSafely } from "../../../../lib/instagram/worker.ts";
import { createHmac, timingSafeEqual } from "node:crypto";
import { neon } from "@neondatabase/serverless";
import { receiveEvents } from "./inbox.ts";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

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
  const databaseUrl = process.env.DATABASE_URL;
  const accountId = process.env.INSTAGRAM_ACCOUNT_ID;
  if (!databaseUrl || !accountId) return reply("Inbox is not configured", 503);
  const status = await receiveEvents(body, {
    accountId,
    persist: async (events) => {
      const sql = neon(databaseUrl);
      // One statement atomically stores the entire delivery. Never log payloads,
      // database URLs, provider errors, or tokens.
      await sql`
        INSERT INTO instagram_inbox (account_id, event_key, customer_id, payload)
        SELECT account_id, event_key, customer_id, payload
        FROM jsonb_to_recordset(${JSON.stringify(events.map(event => ({
          account_id: event.accountId,
          event_key: event.eventKey,
          customer_id: event.customerId,
          payload: event.payload,
        })))}::jsonb)
        AS incoming(account_id text, event_key text, customer_id text, payload jsonb)
        ON CONFLICT (account_id, event_key) DO NOTHING
      `;
    },
  });
  if (status === 200 && process.env.INSTAGRAM_BOT_ENABLED === "true") {
    after(async () => { await runWorkerSafely(); });
  }
  return reply(status === 200 ? "EVENT_RECEIVED" : "Unable to receive event", status);
}
