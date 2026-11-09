export type Details = Partial<Record<'product'|'city'|'capacity'|'floors'|'contact_name'|'phone', string>>;
export type Conversation = { language: 'en'|'ta'; stage: string; details: Details; human_handover: boolean };
export type Plan = { conversation: Conversation; reply: string|null; saveLead: boolean };
const contact = 'WhatsApp / Call: +91 9894794567\nEmail: toaeroeng@gmail.com';
const questions = {
  en: {
    product: 'Do you need a goods lift or a dumbwaiter? Reply 1 for Goods Lift or 2 for Dumbwaiter.',
    city: 'Which city and state is the installation in?',
    capacity: 'What lifting capacity do you need (in kg)? You can say “not sure”.',
    floors: 'How many floors/stops should the lift serve? You can say “not sure”.',
    contact_name: 'What is your name?',
    phone: 'Please share your Indian mobile number if you agree to Aero Engineering contacting you about this enquiry. Reply “skip” to continue without a number.',
  },
  ta: {
    product: 'உங்களுக்கு Goods Lift வேண்டுமா அல்லது Dumbwaiter வேண்டுமா? Goods Lift — 1; Dumbwaiter — 2.',
    city: 'லிஃப்ட் நிறுவ வேண்டிய நகரம் மற்றும் மாநிலம் என்ன?',
    capacity: 'எத்தனை கிலோ எடை தூக்கும் திறன் வேண்டும்? தெரியாவிட்டால் “தெரியாது” எனக் கூறலாம்.',
    floors: 'எத்தனை மாடிகள் / நிறுத்தங்கள் தேவை? தெரியாவிட்டால் “தெரியாது” எனக் கூறலாம்.',
    contact_name: 'உங்கள் பெயர் என்ன?',
    phone: 'இந்த விசாரணை குறித்து Aero Engineering தொடர்புகொள்ள சம்மதித்தால் உங்கள் இந்திய மொபைல் எண்ணைப் பகிரவும். எண்ணைப் பகிர விரும்பாவிட்டால் “skip” எனக் கூறவும்.',
  },
};
export function initial(): Conversation { return {language:'en',stage:'welcome',details:{},human_handover:false}; }
export function mobile(text: string): string|null {
  const digits = text.replace(/[\s()+-]/g,'');
  const local = digits.startsWith('91') && digits.length === 12 ? digits.slice(2) : digits;
  return /^[6-9]\d{9}$/.test(local) ? '+91'+local : null;
}
export function planReply(previous: Conversation, input: string): Plan {
  const c: Conversation = {...previous, details:{...previous.details}};
  const text = input.trim().slice(0,1000), lower = text.toLowerCase();
  if (c.human_handover) return {conversation:c,reply:null,saveLead:false};
  if (/^(stop|unsubscribe|pause|நிறுத்து)$/i.test(text)) {
    c.human_handover=true; c.stage='paused';
    return {conversation:c,reply:c.language==='ta'?'தானியங்கி பதில்கள் நிறுத்தப்பட்டன.\n'+contact:'Automatic replies are paused. You can contact our team directly:\n'+contact,saveLead:true};
  }
  if (/\b(human|agent|person|call|price|pricing|quote|quotation|cost)\b/i.test(text) || /விலை|மனித|அழைக்க/.test(text)) {
    c.human_handover=true;c.stage='handover';
    return {conversation:c,reply:c.language==='ta'?'விலை மற்றும் விரிவான விவரங்களுக்கு எங்கள் குழுவை நேரடியாகத் தொடர்புகொள்ளவும். இந்த உரையாடல் மனித உதவிக்காகக் குறிக்கப்பட்டுள்ளது.\n'+contact:'For pricing or detailed help, please contact our team directly. I have marked this conversation for human assistance.\n'+contact,saveLead:true};
  }
  const tamil = /[\u0B80-\u0BFF]/.test(text) || /^(tamil|தமிழ்)$/i.test(text);
  if(tamil)c.language='ta';
  if(/^english$/i.test(text))c.language='en';
  if(c.stage==='welcome') {
    c.stage='product';
    return {conversation:c,reply:(c.language==='ta'?'வணக்கம்! நான் Aero Engineering-ன் தானியங்கி உதவியாளர். உங்கள் லிஃப்ட் விசாரணையைப் பதிவு செய்ய உதவுகிறேன்.':'Welcome to Aero Engineering! I’m the automated enquiry assistant. You can reply in English or Tamil. Type “human” for our team or “stop” to pause.')+'\n\n'+questions[c.language].product,saveLead:false};
  }
  if(/^(english|tamil|தமிழ்)$/i.test(text) && c.stage in questions.en) return {conversation:c,reply:questions[c.language][c.stage as keyof typeof questions.en],saveLead:false};
  if(c.stage==='complete') return {conversation:c,reply:c.language==='ta'?'உங்கள் விசாரணை ஏற்கனவே பதிவு செய்யப்பட்டுள்ளது. மேலும் உதவிக்கு “human” எனக் கூறவும்.':'Your enquiry is already saved. Type “human” for further help.',saveLead:false};
  const stages = ['product','city','capacity','floors','contact_name','phone'] as const;
  const stage = c.stage as typeof stages[number];
  if(!stages.includes(stage))return {conversation:c,reply:null,saveLead:false};
  let answer = text.slice(0,200);
  if(stage==='product') {
    if(lower==='1'||/goods|சரக்கு/.test(lower))answer='Goods Lift';
    else if(lower==='2'||/dumbwaiter|dumb waiter|உணவு/.test(lower))answer='Dumbwaiter';
    else return {conversation:c,reply:questions[c.language].product,saveLead:false};
  }
  if(stage==='phone') {
    if(/^(skip|வேண்டாம்)$/i.test(text))answer='';
    else {const number=mobile(text);if(!number)return {conversation:c,reply:c.language==='ta'?'சரியான 10 இலக்க இந்திய மொபைல் எண்ணை உள்ளிடவும் அல்லது “skip” எனக் கூறவும்.':'Please enter a valid 10-digit Indian mobile number, or reply “skip”.',saveLead:false};answer=number;}
  } else if(!answer) return {conversation:c,reply:questions[c.language][stage],saveLead:false};
  c.details[stage]=answer;
  const next=stages[stages.indexOf(stage)+1];c.stage=next??'complete';
  return {conversation:c,saveLead:true,reply:next?questions[c.language][next]:(c.language==='ta'?'நன்றி! உங்கள் விசாரணை பதிவு செய்யப்பட்டது. விலை அல்லது நிறுவல் தேதியை உறுதிப்படுத்த எங்கள் குழுவைத் தொடர்புகொள்ளவும்.\n':'Thank you! Your enquiry is saved. Please contact our team to confirm pricing and installation timing.\n')+contact};
}
export type Incoming = {customerId:string;text:string;timestamp:number};
export function incoming(payload: unknown, accountId: string, now=Date.now()): Incoming|null {
  if(!payload||typeof payload!=='object')return null;
  const p=payload as {kind?:string;event?:Record<string,unknown>};
  if(p.kind!=='messaging'||!p.event)return null;
  const e=p.event, m=e.message as Record<string,unknown>|undefined;
  const sender=e.sender as {id?:unknown}|undefined, recipient=e.recipient as {id?:unknown}|undefined;
  if(!m||m.is_echo||m.is_deleted||m.is_unsupported||typeof m.mid!=='string'||typeof m.text!=='string'||!m.text.trim())return null;
  if(typeof sender?.id!=='string'||!/^[0-9]+$/.test(sender.id)||sender.id===accountId||String(recipient?.id)!==accountId)return null;
  const timestamp=Number(e.timestamp);
  // Instagram messaging timestamps are milliseconds. Never answer old/future events.
  if(!Number.isFinite(timestamp)||timestamp<=0||timestamp>now+60000||now-timestamp>=24*60*60*1000)return null;
  return {customerId:sender.id,text:m.text,timestamp};
}
