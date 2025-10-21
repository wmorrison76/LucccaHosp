export async function createPaymentIntent({ invoiceId, amount }:{invoiceId:string, amount:number}){
  const base = import.meta.env.VITE_API_BASE;
  const r = await fetch(`${base}/payments/intent`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ invoiceId, amount })
  });
  if(!r.ok) throw new Error(await r.text());
  return r.json(); // { clientSecret, provider }
}
