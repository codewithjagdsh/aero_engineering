import { createHash } from "node:crypto";

type JsonObject = Record<string, unknown>;
export type InboxEvent = { accountId: string; eventKey: string; customerId: string | null; payload: JsonObject };
const isObject = (v: unknown): v is JsonObject => typeof v === "object" && v !== null && !Array.isArray(v);

// Message IDs deduplicate retried deliveries; hashes cover non-message events.
export function extractEvents(payload: unknown, accountId: string): InboxEvent[] {
  if (!isObject(payload) || payload.object !== "instagram" || !Array.isArray(payload.entry)) {
    throw new Error("Invalid Instagram event envelope");
  }
  const result: InboxEvent[] = [];
  for (const entry of payload.entry) {
    if (!isObject(entry) || String(entry.id) !== accountId) continue;
    for (const kind of ["messaging", "changes"] as const) {
      const events = entry[kind];
      if (events === undefined) continue;
      if (!Array.isArray(events)) throw new Error("Invalid event list");
      for (const event of events) {
        if (!isObject(event)) throw new Error("Invalid event");
        const message = isObject(event.message) ? event.message : null;
        const sender = isObject(event.sender) ? event.sender : null;
        const customerId = typeof sender?.id === "string" ? sender.id : null;
        const eventKey = kind === "messaging" && typeof message?.mid === "string"
          ? `message:${message.mid}`
          : `${kind}:${createHash("sha256").update(JSON.stringify(event)).digest("hex")}`;
        result.push({ accountId, eventKey, customerId, payload: { kind, event } });
      }
    }
  }
  return result;
}

type Dependencies = {
  accountId: string;
  persist: (events: InboxEvent[]) => Promise<void>;
};
export async function receiveEvents(body: Buffer, dependencies: Dependencies): Promise<number> {
  let payload: unknown;
  try { payload = JSON.parse(body.toString("utf8")); } catch { return 400; }
  let events: InboxEvent[];
  try { events = extractEvents(payload, dependencies.accountId); } catch { return 400; }
  if (!events.length) return 200;
  try { await dependencies.persist(events); return 200; } catch { return 503; }
}
