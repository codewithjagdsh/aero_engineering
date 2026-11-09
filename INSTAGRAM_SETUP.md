# Aero Engineering Instagram — Phase 1: webhook verification

This package adds ONLY the verification endpoint. It is not a working DM or
publishing bot yet. Website pages are unchanged. No new dependencies.

## Deploy

1. Add src/app/api/instagram/webhook/route.ts to the same path in the GitHub repository.
2. In Vercel Production environment variables add INSTAGRAM_VERIFY_TOKEN: generate
   a random value locally using `openssl rand -hex 32`. Keep it private.
3. Add META_APP_SECRET from Meta App settings > Basic. This is different from the
   Instagram access token. Do not send either secret in chat.
4. Redeploy and confirm Vercel reports Ready.
5. In Meta > Configure webhooks enter the canonical deployed HTTPS address plus
   /api/instagram/webhook as Callback URL. For example, if www.aeroeng.in is the
   canonical host: https://www.aeroeng.in/api/instagram/webhook.
   Use the same INSTAGRAM_VERIFY_TOKEN value for Verify token. Click Verify and save.
   Use a publicly reachable production URL without deployment authentication.
6. Keep account Webhook Subscription OFF and do not subscribe message fields yet.
   POST intentionally returns 503, even for valid signatures, until durable message
   processing exists. Never switch this endpoint to return 200 and drop messages.

## Next implementation phase

- Durable inbox, deduplication by message ID, conversation state and retry-safe worker.
- English/Tamil lead collection: product, city/state, capacity, floors, space, callback.
- Human handover for quotations, technical commitments and complaints.
- Approved-content queue and authenticated publishing; no public publishing endpoint.
- Test against the actual token's API host, permissions and account ownership.
- Verify platform messaging windows and token revocation/expiry behavior.
- Add monitoring, retention/deletion settings, and production hosting plan review.

The Vercel dashboard showed Hobby. Confirm the current commercial-use plan terms
before production use for Aero Engineering; this package does not upgrade any plan.

## Verification

Run `node --experimental-strip-types --test tests/instagram-webhook.test.mjs`.
Run the normal project typecheck and build before deploying.
