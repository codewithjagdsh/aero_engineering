export type SendResult = {status:'sent'|'failed'|'unknown';messageId?:string;code?:string};
export async function sendText(accountId:string,token:string,customerId:string,text:string,transport:typeof fetch=fetch):Promise<SendResult> {
  try {
    const response=await transport(`https://graph.instagram.com/v27.0/${accountId}/messages`,{
      method:'POST',headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'},
      body:JSON.stringify({recipient:{id:customerId},message:{text}}),signal:AbortSignal.timeout(10000),
    });
    const data=await response.json() as {message_id?:string;error?:{code?:number}};
    if(response.ok&&typeof data.message_id==='string')return {status:'sent',messageId:data.message_id};
    // A timeout/5xx or malformed success can hide an accepted send: do not retry automatically.
    return {status:response.status>=500||response.ok?'unknown':'failed',code:String(data.error?.code??response.status)};
  }catch{return {status:'unknown',code:'network_or_response_error'};}
}
