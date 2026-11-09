# Phase 2: durable Instagram inbox

This update saves signed webhook events into the instagram_inbox table created
in Neon. It does NOT send replies, create leads, or publish posts yet.

## Upload and deploy

Create a new branch from the latest main: instagram-inbox.
Upload the CONTENTS of this update at the repository root, preserving paths.
package.json, package-lock.json, tsconfig.json and the webhook route replace their
previous versions. The two inbox files and this guide are new.

Required Production variables: DATABASE_URL, INSTAGRAM_ACCOUNT_ID,
META_APP_SECRET, INSTAGRAM_VERIFY_TOKEN. Keep all secrets server-only.
The existing Instagram access token is reserved for the later reply worker.

Open a pull request. After Vercel checks pass, merge and confirm the production
build is Ready. Do not enable account subscriptions yet.

## Test before processing customer messages

In Meta's webhook fields, use Test beside messages. A synthetic test may carry a
sample account ID: the receiver intentionally ignores accounts other than the
configured INSTAGRAM_ACCOUNT_ID. A successful synthetic test alone does not
prove Neon persistence.

For an actual signed event for the configured account, check in Neon:

SELECT id, account_id, event_key, status, created_at
FROM instagram_inbox ORDER BY id DESC LIMIT 10;

Do not send message payloads or customer identifiers in screenshots. Rows remain
pending until the reply worker is implemented. No background worker is included.
Duplicate delivery of a message ID must leave one inbox row. DB failures return
503 so Meta can retry. Other accounts are ignored. Invalid signatures return 403.

Tests: node --experimental-strip-types --test tests/instagram-inbox.test.mjs tests/instagram-webhook.test.mjs

The current tests cover signature security, challenges, event parsing, account
filtering, stable keys, delayed acknowledgement and simulated storage failure.
They do not establish a live Neon connection or prove Meta delivery.

Do not expose Neon Data API access or put DATABASE_URL in client code.
