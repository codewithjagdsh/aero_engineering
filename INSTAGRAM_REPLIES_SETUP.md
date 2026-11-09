# Aero Engineering — DM enquiry replies (tester pilot)

This update adds a deterministic English/Tamil enquiry assistant. It does not use an AI service or publish posts. Replies are OFF by default and require an explicit list of permitted test customer IDs.

## 1. Database update

In Neon SQL Editor on the existing main / neondb database, run the entire contents of `migrations/003_instagram_replies.sql`. This adds an outbox, a worker lease, and a function used to fence concurrent workers. Existing inbox, conversations, and leads remain.

## 2. Upload the code

Create a branch `instagram-replies` from the latest `main`. Extract the ZIP and upload its CONTENTS at the repository root, preserving src/, migrations/, and tests/. Do not upload the enclosing ZIP folder. Review the PR diff: this update replaces the webhook route and adds files; it does not replace package.json or tsconfig.json. Create the PR, wait for Vercel Preview Ready/checks, then merge into main. The pilot stays disabled until step 3.

## 3. Vercel Production variables

Keep existing DATABASE_URL, INSTAGRAM_ACCOUNT_ID, INSTAGRAM_ACCESS_TOKEN, META_APP_SECRET and INSTAGRAM_VERIFY_TOKEN. Do not put actual secrets in GitHub or chat.

Add:

| Key | Value |
| --- | --- |
| INSTAGRAM_BOT_ENABLED | `false` until all setup is complete, then `true` |
| INSTAGRAM_BOT_TEST_CUSTOMER_IDS | Your personal account's customer_id from the SQL below, as digits. Multiple testers: comma-separated IDs. No wildcard. |
| INSTAGRAM_BOT_START_AT | Current UTC time in ISO format, e.g. output of `date -u +%Y-%m-%dT%H:%M:%SZ`. Messages before this time are ignored. Use your actual activation time, not an example date. |
| INSTAGRAM_WORKER_SECRET | Generate privately with `openssl rand -hex 32`; store as a Secret. Used only for manual worker recovery. |

Find the TEST SENDER ID from your known test message, NOT your business account ID:

```sql
SELECT id, customer_id,
       payload->'event'->'message'->>'text' AS message,
       created_at
FROM instagram_inbox
ORDER BY id DESC LIMIT 10;
```

Your business account ID 17841409604435764 stays in INSTAGRAM_ACCOUNT_ID. Do not use it as the test customer ID.

Set BOT_ENABLED to true and redeploy Production after saving every variable. Check the Instagram token has instagram_business_manage_messages permission. Keep Meta messages subscription and aeroeng.in account webhook subscription enabled as used in the successful inbox test. Do not subscribe extra fields for this pilot.

## 4. Send a NEW message after deployment

From the accepted personal tester account, send `Hi`. The bot should identify itself and ask which product you need. Then answer each question separately:

1. `1` (Goods Lift) or `2` (Dumbwaiter)
2. `Madurai, Tamil Nadu`
3. `500 kg` (or `not sure`)
4. `3` (or `not sure`)
5. Your name
6. Your consenting contact number, or `skip`

Tamil text or `Tamil` switches to Tamil. `English` switches back. The opening message welcomes the customer; resend the product choice when asked even if the first message already named a product. Quotes/prices/technical questions requiring a person should use `human`. `human`, `price`, or `stop` pauses the conversation and provides the business contact. There is NO staff notification integration yet: the customer is directed to call/WhatsApp and the database flags handover.

## 5. Verify

```sql
SELECT id, status, last_error,
       payload->'event'->'message'->>'text' AS message
FROM instagram_inbox ORDER BY id DESC LIMIT 10;

SELECT id, inbox_id, status, error_code, provider_message_id
FROM instagram_outbox ORDER BY id DESC LIMIT 10;

SELECT product, city, capacity, floors, contact_name, status
FROM instagram_leads ORDER BY updated_at DESC LIMIT 10;
```

`completed` inbox means planned/processed, NOT delivered. `sent` outbox plus provider_message_id means Meta accepted the reply, not a read receipt. `collecting` leads are partial; `new` means enquiry questions completed; `handover` requires a person. City stores the customer's combined city/state answer. Space/state-specific fields are not separately collected in this version. No installation or price promises are made.

## Processing and recovery

Signed webhooks are durably stored before acknowledging Meta. Next.js `after` starts a bounded worker (up to 25 iterations / about 40s per delivery). An account lease serializes work; conversation updates, lead changes, outbox insertion and inbox completion commit together. Outbox sends are recorded before contacting Meta. Echoes/non-text/stale/non-allowlisted events are marked completed without a reply. There is a strict 24-hour age check immediately before sending. The Meta timestamp must be in milliseconds.

There is no periodic queue scheduler in this package. A normal new delivery kicks the worker; if it crashes, has a busy lease, or hits its batch limit, pending work may wait for another delivery or this protected manual call. For a continuously monitored production service, add a scheduled queue runner before expanding beyond testers.

Run privately in a terminal to resume pending work without putting the secret in browser URLs or chat:

```bash
read -rsp 'Worker secret: ' aero_worker_secret
printf '\n'
curl --fail-with-body --request POST \
  --header "Authorization: Bearer $aero_worker_secret" \
  https://www.aeroeng.in/api/instagram/process
unset aero_worker_secret
```

Expected state: ok, busy, disabled, configuration_required, or error. Look for `instagram_worker_failed` in Vercel if error. Provider bodies and credentials are not logged.

A timeout/5xx/interrupted send is `unknown`: it may have reached Instagram. A definite rejection is `failed`. Neither is automatically resent; subsequent events for that customer become failed/outbox_needs_review. Check the actual DM thread and token permissions before any manual recovery. Never blindly reset unknown sends to pending; that can duplicate replies. A production reconciliation/retry console is not part of this pilot.

## Pause, handover and tester reset

Global pause: set INSTAGRAM_BOT_ENABLED=false and redeploy. An invocation already running may finish; emergency revocation of the token stops API access.

For a conversation already paused by human/stop, the bot stays quiet. Manually handle the enquiry in Instagram. To restart your TEST conversation after testing, pause the bot and wait at least 120 seconds for prior workers, then run this transaction with your tester ID replacing the placeholder:

```sql
BEGIN;
UPDATE instagram_outbox SET status='cancelled', updated_at=NOW()
WHERE customer_id='YOUR_TEST_CUSTOMER_ID' AND status='pending';
UPDATE instagram_conversations
SET stage='welcome',details='{}'::jsonb,human_handover=FALSE,updated_at=NOW()
WHERE account_id='17841409604435764' AND customer_id='YOUR_TEST_CUSTOMER_ID';
COMMIT;
```

Reset only when that customer's outbox has no failed/unknown/sending records needing review. Re-enable/redeploy, then send a fresh Hi. The existing lead is retained until the new flow saves an answer. This reset is for testing, not customer data management.

## Validation and limits

Unit tests cover English/Tamil flow, phone consent/skip, handover/stop, echo/window filters, send responses and worker authentication. The integration test uses a local PGlite PostgreSQL engine with the original schema plus this migration: it tests lead completion, duplicate delivery, handover, uncertain sends and lease fencing. TypeScript and the production build pass. Live sends must still be verified with your token, Meta permissions and deployed Neon instance.

Run the included unit tests:
`node --experimental-strip-types --test tests/instagram-inbox.test.mjs tests/instagram-webhook.test.mjs tests/instagram-replies.test.mjs`

Optional PostgreSQL integration test (PGlite is a TEST-ONLY dependency; do not add it to production):
`npm install --prefix /tmp/aero-db-test --no-package-lock --no-audit --no-fund @electric-sql/pglite`
`PGLITE_MODULE=/tmp/aero-db-test/node_modules/@electric-sql/pglite/dist/index.js node --experimental-strip-types --test tests/instagram-worker.integration.mjs`

No public customer rollout, staff notifications, admin inbox, retention/deletion workflow, scheduled retries or post publishing are included. Before customer rollout, confirm Meta review/access, hosting suitability, queue monitoring and privacy/data retention practices.

Official API reference: https://www.postman.com/meta/instagram/documentation/6yqw8pt/instagram-api
