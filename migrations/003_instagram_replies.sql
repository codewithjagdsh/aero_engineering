BEGIN;
CREATE TABLE IF NOT EXISTS instagram_worker_locks (
 account_id TEXT PRIMARY KEY, owner TEXT NOT NULL, expires_at TIMESTAMPTZ NOT NULL
);
CREATE TABLE IF NOT EXISTS instagram_outbox (
 id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
 inbox_id BIGINT NOT NULL UNIQUE REFERENCES instagram_inbox(id),
 account_id TEXT NOT NULL, customer_id TEXT NOT NULL, body TEXT NOT NULL,
 status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','sending','sent','failed','unknown','cancelled')),
 provider_message_id TEXT, error_code TEXT,
 created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS instagram_outbox_pending_idx ON instagram_outbox(account_id,status,id);
-- Every state-changing transaction validates and locks the worker lease.
CREATE OR REPLACE FUNCTION instagram_assert_worker(p_account TEXT, p_owner TEXT)
RETURNS void LANGUAGE plpgsql AS $$
DECLARE lock_owner TEXT; lock_expiry TIMESTAMPTZ;
BEGIN
 SELECT owner, expires_at INTO lock_owner, lock_expiry
 FROM instagram_worker_locks WHERE account_id=p_account FOR UPDATE;
 IF lock_owner IS DISTINCT FROM p_owner OR lock_expiry <= clock_timestamp() THEN
  RAISE EXCEPTION 'worker lease expired';
 END IF;
END;
$$;

COMMIT;
