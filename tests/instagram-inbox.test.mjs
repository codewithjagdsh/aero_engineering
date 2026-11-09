import test from 'node:test';
import assert from 'node:assert/strict';
import { extractEvents, receiveEvents } from '../src/app/api/instagram/webhook/inbox.ts';
const event = {sender:{id:'customer'}, message:{mid:'m1',text:'வணக்கம்'}};
const payload = {object:'instagram',entry:[{id:'account',messaging:[event]}]};

test('extracts Tamil messages and uses a stable retry deduplication key', () => {
  const first = extractEvents(payload,'account');
  assert.equal(first.length,1);
  assert.equal(first[0].eventKey,'message:m1');
  assert.equal(first[0].customerId,'customer');
  assert.deepEqual(extractEvents(payload,'account'),first);
  assert.equal(extractEvents(payload,'other').length,0);
});
test('does not acknowledge before durable persistence finishes', async () => {
  let release;
  let complete=false;
  const barrier = new Promise(resolve => {release=resolve});
  const pending = receiveEvents(Buffer.from(JSON.stringify(payload)),{accountId:'account',persist:async()=>{await barrier}}).then(s=>{complete=true;return s});
  await Promise.resolve();
  assert.equal(complete,false);
  release();
  assert.equal(await pending,200);
});
test('database failure stays retryable; malformed payloads never reach database', async () => {
  assert.equal(await receiveEvents(Buffer.from(JSON.stringify(payload)),{accountId:'account',persist:async()=>{throw Error('db')}}),503);
  const persist=async()=>{throw Error('must not run')};
  assert.equal(await receiveEvents(Buffer.from('invalid'),{accountId:'account',persist}),400);
  assert.equal(await receiveEvents(Buffer.from('{}'),{accountId:'account',persist}),400);
});
test('stores changes and message edits with distinct stable keys', () => {
  const p={object:'instagram',entry:[{id:'account',changes:[{field:'comments',value:{id:'c1'}}],messaging:[{message_edit:{mid:'m1',text:'edit'}}]}]};
  const events=extractEvents(p,'account');
  assert.equal(events.length,2);
  assert.notEqual(events[0].eventKey,events[1].eventKey);
});
