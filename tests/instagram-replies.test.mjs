import test from 'node:test';
import assert from 'node:assert/strict';
import { initial, planReply, incoming, mobile } from '../src/lib/instagram/flow.ts';
import { sendText } from '../src/lib/instagram/send.ts';
import { POST } from '../src/app/api/instagram/process/route.ts';
const step=(c,text)=>planReply(c,text);
test('English enquiry collects product, location, capacity, floors, name and consenting phone',()=>{
 let p=step(initial(),'Hi');assert.equal(p.conversation.stage,'product');
 for(const text of ['1','Madurai, Tamil Nadu','1000 kg','3','Jag','9894794567'])p=step(p.conversation,text);
 assert.equal(p.conversation.stage,'complete');assert.equal(p.conversation.details.phone,'+919894794567');
 assert.equal(p.conversation.details.product,'Goods Lift');assert.equal(p.saveLead,true);
 assert.match(p.reply,/saved/);assert.equal(step(p.conversation,'hello').conversation.stage,'complete');
});
test('Tamil questions, language switches, unknown capacity and skipped phone',()=>{
 let p=step(initial(),'வணக்கம்');assert.equal(p.conversation.language,'ta');
 p=step(p.conversation,'2');assert.match(p.reply,/நகரம்/);
 for(const text of ['சென்னை தமிழ்நாடு','தெரியாது','தெரியாது','ஜெகதீஷ்','skip'])p=step(p.conversation,text);
 assert.equal(p.conversation.stage,'complete');assert.equal(p.conversation.details.phone,'');
 assert.equal(p.conversation.details.product,'Dumbwaiter');
 let c=step(initial(),'hello').conversation;
 assert.equal(step(c,'Tamil').conversation.stage,'product');
 assert.equal(step(c,'English').conversation.language,'en');
});
test('invalid phone and ambiguous product do not advance',()=>{
 assert.equal(step({...initial(),stage:'product'},'whatever').conversation.stage,'product');
 const c={...initial(),stage:'phone'};assert.equal(step(c,'123').conversation.stage,'phone');
 assert.equal(mobile('+91 98947 94567'),'+919894794567');assert.equal(mobile('1234567890'),null);
});
test('price/human and opt-out persist handover and never continue bot',()=>{
 for(const text of ['price please','human','stop','விலை என்ன']){
  const p=step(initial(),text);assert.equal(p.conversation.human_handover,true);assert.equal(p.saveLead,true);
  assert.equal(step(p.conversation,'hello').reply,null);
 }
});
const event=(changes={})=>({kind:'messaging',event:{sender:{id:'123'},recipient:{id:'456'},timestamp:Date.now(),message:{mid:'abc',text:'Hi'},...changes}});
test('only current inbound text for configured account can trigger replies',()=>{
 assert.equal(incoming(event(),'456').customerId,'123');
 for(const e of [event({message:{mid:'a',text:'Hi',is_echo:true}}),event({recipient:{id:'wrong'}}),event({timestamp:Date.now()-86400001}),event({timestamp:Date.now()+100000}),event({message:{mid:'a',attachments:[]}}),{kind:'changes',event:{}}])assert.equal(incoming(e,'456'),null);
});
test('send uses bearer token and scoped recipient; accepted response records message ID',async()=>{
 const result=await sendText('456','private-token','123','Hello',async(url,opts)=>{
  assert.equal(url,'https://graph.facebook.com/v27.0/456/messages');
  assert.equal(opts.headers.Authorization,'Bearer private-token');
  assert.deepEqual(JSON.parse(opts.body),{recipient:{id:'123'},message:{text:'Hello'}});
  return Response.json({message_id:'sent-1'});
 });assert.deepEqual(result,{status:'sent',messageId:'sent-1'});
});
test('ambiguous sends are never represented as successful; known rejections remain failed',async()=>{
 assert.equal((await sendText('a','t','b','hi',async()=>{throw Error('timeout')})).status,'unknown');
 assert.equal((await sendText('a','t','b','hi',async()=>Response.json({}, {status:500}))).status,'unknown');
 assert.equal((await sendText('a','t','b','hi',async()=>Response.json({error:{code:190}},{status:400}))).status,'failed');
});
test('process endpoint requires a long bearer secret and bot defaults disabled',async()=>{
 process.env.INSTAGRAM_WORKER_SECRET='x'.repeat(32);delete process.env.INSTAGRAM_BOT_ENABLED;
 assert.equal((await POST(new Request('https://example.com',{method:'POST'}))).status,403);
 const response=await POST(new Request('https://example.com',{method:'POST',headers:{authorization:'Bearer '+'x'.repeat(32)}}));
 assert.deepEqual(await response.json(),{state:'disabled'});
});
