import { timingSafeEqual } from 'node:crypto';
import { runWorkerSafely } from '../../../../lib/instagram/worker.ts';
export const runtime='nodejs';
export const dynamic='force-dynamic';
export const maxDuration=60;
export async function POST(request:Request) {
  const secret=process.env.INSTAGRAM_WORKER_SECRET;
  const actual=Buffer.from(request.headers.get('authorization')??''),expected=Buffer.from(`Bearer ${secret}`);
  if(!secret||secret.length<32||actual.length!==expected.length||!timingSafeEqual(actual,expected))return new Response('Forbidden',{status:403});
  const result=await runWorkerSafely();
  return Response.json(result,{status:result.state==='error'?503:200,headers:{'Cache-Control':'no-store'}});
}
