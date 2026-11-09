// Run separately with a local PGlite package: PGLITE_MODULE=/absolute/path/to/pglite/dist/index.js node --experimental-strip-types --test tests/instagram-worker.integration.mjs
// No production credentials or external sends; real PostgreSQL semantics via PGlite.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { processInbox } from '../src/lib/instagram/worker.ts';
const { PGlite }=await import(process.env.PGLITE_MODULE??'@electric-sql/pglite');
function adapter(db){
 const sql=(strings,...values)=>{
  const query=strings.reduce((s,part,i)=>s+part+(i<values.length?'$'+(i+1):''),'');
  // Lazy tagged SQL as in Neon's transaction API.
  const item={query,values,then(resolve,reject){return db.query(query,values).then(r=>r.rows).then(resolve,reject)}};
  return item;
 };
 sql.transaction=async(items)=>{await db.exec('BEGIN');try{const result=[];for(const item of items)result.push((await db.query(item.query,item.values)).rows);await db.exec('COMMIT');return result;}catch(e){await db.exec('ROLLBACK');throw e}};
 return sql;
}
test('durable worker completes lead, deduplicates, ignores echoes and stops uncertain sends',async()=>{
 const db=new PGlite();try{
 await db.exec(await readFile(new URL('./fixtures/instagram-existing-schema.sql',import.meta.url),'utf8'));
 const migration=await readFile(new URL('../migrations/003_instagram_replies.sql',import.meta.url),'utf8');
 await db.exec(migration);await db.exec(migration);
 Object.assign(process.env,{INSTAGRAM_BOT_ENABLED:'true',INSTAGRAM_ACCOUNT_ID:'456',INSTAGRAM_ACCESS_TOKEN:'fake',DATABASE_URL:'fake',INSTAGRAM_BOT_TEST_CUSTOMER_IDS:'123,789',INSTAGRAM_BOT_START_AT:new Date(Date.now()-10000).toISOString()});
 const sent=[];const deps={sqlFactory:()=>adapter(db),send:async(a,t,c,body)=>{sent.push({c,body});return {status:'sent',messageId:'sent-'+sent.length}}};
 let tick=Date.now()-5000;
 async function enqueue(mid,text,customer='123',extra={}){
 const payload={kind:'messaging',event:{sender:{id:customer},recipient:{id:'456'},timestamp:++tick,message:{mid,text,...extra}}};
 await db.query(`INSERT INTO instagram_inbox(account_id,event_key,customer_id,payload) VALUES('456',$1,$2,$3) ON CONFLICT DO NOTHING`,['message:'+mid,customer,JSON.stringify(payload)]);
 }
 for(const [i,text] of ['Hi','1','Madurai Tamil Nadu','500 kg','3','Jag','9894794567'].entries())await enqueue(String(i),text);
 assert.equal((await processInbox(deps)).state,'ok');assert.equal(sent.length,7);
 const lead=(await db.query('SELECT * FROM instagram_leads')).rows[0];assert.equal(lead.product,'Goods Lift');assert.equal(lead.phone,'+919894794567');assert.equal(lead.status,'new');
 await enqueue('0','Hi');await processInbox(deps);assert.equal(sent.length,7);
 await enqueue('echo','outgoing','123',{is_echo:true});await processInbox(deps);assert.equal(sent.length,7);
 await enqueue('human','human');await processInbox(deps);assert.equal(sent.length,8);
 await enqueue('paused','hello');await processInbox(deps);assert.equal(sent.length,8);
 await enqueue('unknown','hello','789');
 await processInbox({...deps,send:async()=>({status:'unknown',code:'timeout'})});
 assert.equal((await db.query("SELECT status FROM instagram_outbox WHERE customer_id='789'")).rows[0].status,'unknown');
 await enqueue('blocked','1','789');await processInbox(deps);assert.equal(sent.length,8);
 assert.equal((await db.query("SELECT status FROM instagram_inbox WHERE event_key='message:blocked'")).rows[0].status,'failed');
 // Fencing rejects stale owners, preventing partial state/outbox commits.
 await db.query("INSERT INTO instagram_worker_locks VALUES('456','other',NOW()+INTERVAL '120 seconds')");
 assert.equal((await processInbox(deps)).state,'busy');
 await assert.rejects(db.query("SELECT instagram_assert_worker('456','wrong')"));
 }finally{await db.close()}
});
