import test from 'node:test';
import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import { GET, POST } from '../src/app/api/instagram/webhook/route.ts';

test('webhook verifies only configured matching challenges', async () => {
  delete process.env.INSTAGRAM_VERIFY_TOKEN;
  assert.equal((await GET(new Request('https://example.com'))).status, 503);
  process.env.INSTAGRAM_VERIFY_TOKEN = 'test-verify';
  const valid = new Request('https://example.com?hub.mode=subscribe&hub.verify_token=test-verify&hub.challenge=123');
  assert.equal(await (await GET(valid)).text(), '123');
  assert.equal((await GET(new Request('https://example.com?hub.mode=subscribe&hub.verify_token=wrong&hub.challenge=123'))).status,403);
});
test('forged deliveries fail; authenticated deliveries are not silently discarded', async () => {
  process.env.META_APP_SECRET = 'test-secret';
  const body = JSON.stringify({object:'instagram',entry:[]});
  const send = signature => POST(new Request('https://example.com',{method:'POST',body,headers:{'x-hub-signature-256':signature}}));
  assert.equal((await send('sha256=bad')).status,403);
  const signature = 'sha256=' + createHmac('sha256','test-secret').update(body).digest('hex');
  assert.equal((await send(signature)).status,503);
  assert.equal((await POST(new Request('https://example.com',{method:'POST',body:body+' ',headers:{'x-hub-signature-256':signature}}))).status,403);
});
