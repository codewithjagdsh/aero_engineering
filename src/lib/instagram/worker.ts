import { randomUUID } from 'node:crypto';
import { neon } from '@neondatabase/serverless';
import { initial, incoming, planReply, type Conversation } from './flow.ts';
import { sendText } from './send.ts';
export async function processInbox(dependencies: { sqlFactory?: typeof neon; send?: typeof sendText } = {}) {
  const env=process.env;
  if(env.INSTAGRAM_BOT_ENABLED!=='true')return {state:'disabled'};
  const account=env.INSTAGRAM_ACCOUNT_ID, token=env.INSTAGRAM_ACCESS_TOKEN, url=env.DATABASE_URL;
  // Deliberately require explicit customer IDs during the pilot. No wildcard.
  const allowed=(env.INSTAGRAM_BOT_TEST_CUSTOMER_IDS??'').split(',').map(s=>s.trim()).filter(s=>/^\d+$/.test(s));
  const since=Date.parse(env.INSTAGRAM_BOT_START_AT??'');
  if(!account||!token||!url||!allowed.length||!Number.isFinite(since))return {state:'configuration_required'};
  const sql=(dependencies.sqlFactory ?? neon)(url),owner=randomUUID(),deadline=Date.now()+40000;
  const acquired=await sql`INSERT INTO instagram_worker_locks(account_id,owner,expires_at)
    VALUES(${account},${owner},NOW()+INTERVAL '120 seconds')
    ON CONFLICT(account_id) DO UPDATE SET owner=EXCLUDED.owner,expires_at=EXCLUDED.expires_at
    WHERE instagram_worker_locks.expires_at<NOW() RETURNING owner`;
  if(!acquired.length)return {state:'busy'};
  let processed=0;
  try {
    // If the previous invocation died after starting a send, delivery is uncertain.
    // Never automatically resend such messages or progress that conversation.
    await sql.transaction([
      sql`SELECT instagram_assert_worker(${account},${owner})`,
      sql`UPDATE instagram_outbox SET status='unknown',error_code='interrupted_send',updated_at=NOW()
          WHERE account_id=${account} AND status='sending'`,
    ]);
    const flush=async()=>{
      const rows=await sql`SELECT * FROM instagram_outbox WHERE account_id=${account} AND status='pending' ORDER BY id LIMIT 1`;
      if(!rows.length)return false;
      const row=rows[0];
      const conversation=await sql`SELECT human_handover FROM instagram_conversations WHERE account_id=${account} AND customer_id=${row.customer_id}`;
      // A manually paused customer must never receive queued replies. A final
      // handover acknowledgement is allowed only as the direct planned reply.
      const event=await sql`SELECT payload FROM instagram_inbox WHERE id=${row.inbox_id}`;
      const msg=incoming(event[0]?.payload,account);
      if(!allowed.includes(row.customer_id)||!msg||msg.timestamp<since ||
         (conversation[0]?.human_handover && !/human|agent|person|call|price|pricing|quote|quotation|cost|stop|unsubscribe|pause|விலை|மனித|அழைக்க|நிறுத்து/i.test(msg.text))) {
        await sql.transaction([sql`SELECT instagram_assert_worker(${account},${owner})`,sql`UPDATE instagram_outbox SET status='cancelled',updated_at=NOW() WHERE id=${row.id}`]);return true;
      }
      await sql.transaction([
        sql`SELECT instagram_assert_worker(${account},${owner})`,
        sql`UPDATE instagram_outbox SET status='sending',updated_at=NOW() WHERE id=${row.id} AND status='pending'`,
      ]);
      const result=await (dependencies.send ?? sendText)(account,token,row.customer_id,row.body);
      await sql.transaction([
        sql`SELECT instagram_assert_worker(${account},${owner})`,
        sql`UPDATE instagram_outbox SET status=${result.status},provider_message_id=${result.messageId??null},error_code=${result.code??null},updated_at=NOW() WHERE id=${row.id} AND status='sending'`,
      ]);
      return true;
    };
    // Drain only a bounded batch; new webhooks or the protected process endpoint resume it.
    for(let i=0;i<25&&Date.now()<deadline;i++) {
      if(await flush())continue;
      const rows=await sql`SELECT * FROM instagram_inbox WHERE account_id=${account} AND status='pending' ORDER BY id LIMIT 1`;
      if(!rows.length)break;
      const row=rows[0],msg=incoming(row.payload,account);
      const blocked=msg?await sql`SELECT id FROM instagram_outbox WHERE account_id=${account} AND customer_id=${msg.customerId} AND status IN ('unknown','failed') LIMIT 1`:[];
      // Mark subsequent events for manual review; do not continue that conversation.
      if(blocked.length){
        await sql.transaction([sql`SELECT instagram_assert_worker(${account},${owner})`,sql`UPDATE instagram_inbox SET status='failed',last_error='outbox_needs_review' WHERE id=${row.id}`]);continue;
      }
      if(!msg||msg.timestamp<since||!allowed.includes(msg.customerId)) {
        await sql.transaction([sql`SELECT instagram_assert_worker(${account},${owner})`,sql`UPDATE instagram_inbox SET status='completed',processed_at=NOW(),last_error='ignored_non_test_or_stale_event' WHERE id=${row.id}`]);processed++;continue;
      }
      const existing=await sql`SELECT language,stage,details,human_handover,last_customer_message_at FROM instagram_conversations WHERE account_id=${account} AND customer_id=${msg.customerId}`;
      // Ignore reordered older messages rather than using them as the next answer.
      if(existing[0]?.last_customer_message_at && new Date(existing[0].last_customer_message_at).getTime()>=msg.timestamp){
        await sql.transaction([sql`SELECT instagram_assert_worker(${account},${owner})`,sql`UPDATE instagram_inbox SET status='completed',processed_at=NOW(),last_error='ignored_old_timestamp' WHERE id=${row.id}`]);continue;
      }
      const plan=planReply(existing.length?existing[0] as Conversation:initial(),msg.text),c=plan.conversation,d=c.details;
      const queries=[
        sql`SELECT instagram_assert_worker(${account},${owner})`,
        sql`INSERT INTO instagram_conversations(account_id,customer_id,language,stage,details,human_handover,last_customer_message_at)
          VALUES(${account},${msg.customerId},${c.language},${c.stage},${JSON.stringify(d)}::jsonb,${c.human_handover},${new Date(msg.timestamp).toISOString()})
          ON CONFLICT(account_id,customer_id) DO UPDATE SET language=EXCLUDED.language,stage=EXCLUDED.stage,details=EXCLUDED.details,human_handover=EXCLUDED.human_handover,last_customer_message_at=EXCLUDED.last_customer_message_at,updated_at=NOW()`,
        sql`UPDATE instagram_inbox SET status='completed',processed_at=NOW(),attempts=attempts+1 WHERE id=${row.id}`,
      ];
      if(plan.saveLead)queries.push(sql`INSERT INTO instagram_leads(account_id,customer_id,product,city,capacity,floors,contact_name,phone,status)
        VALUES(${account},${msg.customerId},${d.product??null},${d.city??null},${d.capacity??null},${d.floors??null},${d.contact_name??null},${d.phone??null},${c.human_handover?'handover':c.stage==='complete'?'new':'collecting'})
        ON CONFLICT(account_id,customer_id) DO UPDATE SET product=EXCLUDED.product,city=EXCLUDED.city,capacity=EXCLUDED.capacity,floors=EXCLUDED.floors,contact_name=EXCLUDED.contact_name,phone=EXCLUDED.phone,status=EXCLUDED.status,updated_at=NOW()`);
      if(plan.reply)queries.push(sql`INSERT INTO instagram_outbox(inbox_id,account_id,customer_id,body) VALUES(${row.id},${account},${msg.customerId},${plan.reply}) ON CONFLICT(inbox_id) DO NOTHING`);
      await sql.transaction(queries);processed++;
    }
    return {state:'ok',processed};
  }finally{
    await sql`DELETE FROM instagram_worker_locks WHERE account_id=${account} AND owner=${owner}`;
  }
}
export async function runWorkerSafely() {
  try { const result=await processInbox();console.info('instagram_worker',result.state);return result; }
  catch { console.error('instagram_worker_failed');return {state:'error'}; }
}
