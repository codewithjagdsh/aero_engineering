CREATE TABLE instagram_conversations (
 account_id TEXT NOT NULL, customer_id TEXT NOT NULL, language TEXT NOT NULL DEFAULT 'en',
 stage TEXT NOT NULL DEFAULT 'welcome',details JSONB NOT NULL DEFAULT '{}',human_handover BOOLEAN NOT NULL DEFAULT FALSE,
 last_customer_message_at TIMESTAMPTZ,created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),PRIMARY KEY(account_id,customer_id));
CREATE TABLE instagram_inbox (
 id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,account_id TEXT NOT NULL,event_key TEXT NOT NULL,customer_id TEXT,payload JSONB NOT NULL,
 status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','processing','completed','failed')),
 attempts INTEGER NOT NULL DEFAULT 0,available_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),locked_until TIMESTAMPTZ,last_error TEXT,
 created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),processed_at TIMESTAMPTZ,UNIQUE(account_id,event_key));
CREATE TABLE instagram_leads (
 id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,account_id TEXT NOT NULL,customer_id TEXT NOT NULL,product TEXT,city TEXT,state TEXT,capacity TEXT,floors TEXT,available_space TEXT,
 contact_name TEXT,phone TEXT,status TEXT NOT NULL DEFAULT 'new',created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),UNIQUE(account_id,customer_id));
