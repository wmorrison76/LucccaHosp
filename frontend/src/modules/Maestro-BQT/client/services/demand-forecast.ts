import { useSignalsStore } from '../stores/signalsStore';
import { useBEOStore } from '../stores/beoStore';
import { useRequisitionStore } from '../stores/requisitionStore';
import { useRecipeStore } from '../stores/recipeStore';
import { useInventoryStore } from '../stores/inventoryStore';

export interface OutletTrafficWindow { outletId: string; outletName?: string; from: string; to: string; expectedGuests: number }
export interface ProductDemand { name: string; unit: string; qty: number; basis: string }
export interface IngredientDemand { inventoryItemId?: string; name: string; unit: string; qty: number; basis: string }

// 15-minute buckets helper
function timeBucketsForDate(dateISO: string){
  const out: string[] = []; const start = new Date(dateISO+'T00:00:00');
  for(let i=0;i<96;i++){ const t = new Date(start.getTime()+i*15*60*1000); out.push(t.toISOString()); }
  return out;
}

export function estimateOutletTraffic(dateISO: string): OutletTrafficWindow[] {
  const signals = useSignalsStore.getState();
  const { events } = useBEOStore.getState();
  const dow = new Date(dateISO).getDay();
  const dowFactor = signals.dayOfWeekFactor[dow] || 1;

  const base = Math.round((signals.occupancy + signals.leisureGuests + signals.offPropertyReservations*0.5) * dowFactor);
  const windows: OutletTrafficWindow[] = [];
  const buckets = timeBucketsForDate(dateISO);
  for(const iso of buckets){
    const t = new Date(iso); const hour = t.getHours();
    let mult = (hour>=7&&hour<=9)?1.4 : (hour>=11&&hour<=13?1.6 : (hour>=17&&hour<=20?1.8:0.6));
    if(signals.moonPhase==='full') mult *= 1.05; // whimsical factor
    const expectedGuests = Math.max(0, Math.round(base * mult * 0.02)); // 2% per bucket as heuristic
    windows.push({ outletId: 'dept-grabgo', outletName: 'Grab & Go', from: iso, to: new Date(t.getTime()+15*60*1000).toISOString(), expectedGuests });
  }

  // Add group business spikes: events within the day boost around their times
  for(const ev of events.filter(e=> e.date === dateISO)){
    const time = (ev as any).time || '12:00';
    const hh = Number(time.slice(0,2));
    for(const w of windows){ const th = new Date(w.from).getHours(); if(Math.abs(th-hh)<=1){ w.expectedGuests += Math.round((ev.guestCount||0)*0.2); } }
  }
  return windows;
}

export function forecastFinishedProductDemand(horizonDays = 7): ProductDemand[] {
  const req = useRequisitionStore.getState();
  const beo = useBEOStore.getState();
  const out: ProductDemand[] = [];
  const add = (name:string, unit:string, qty:number, basis:string)=>{ const key=(name+'|'+unit).toLowerCase(); const f=out.find(x=> (x.name+'|'+x.unit).toLowerCase()===key); if(f) f.qty+=qty; else out.push({ name, unit, qty, basis }); };
  const now = Date.now(); const horizon = now + horizonDays*24*60*60*1000;

  for(const r of req.requisitions){ if(new Date(r.dueAt).getTime()<=horizon){ for(const it of r.items){ add(it.name, it.unit, it.qty, 'requisition'); } } }
  for(const ev of beo.events){ const t=new Date(ev.date).getTime(); if(t<=horizon && ev.beoId){ const b=beo.beos[ev.beoId]; if(!b) continue; for(const mi of b.menu.items||[]){ const r=mi.recipe; if(!r) continue; for(const ing of r.ingredients||[]){ const n=(ing.name||''); if(/glace|stock|sauce|reduction/i.test(n)){ add(n, ing.unit, ing.amount||0, 'beo'); } } } } }
  return out.sort((a,b)=> b.qty-a.qty);
}

export function forecastRawIngredientDemand(horizonDays = 7): IngredientDemand[] {
  const fini = forecastFinishedProductDemand(horizonDays);
  const inv = useInventoryStore.getState();
  const rec = useRecipeStore.getState();
  const out: IngredientDemand[] = [];
  const add = (name:string, unit:string, qty:number, basis:string)=>{ const match=inv.items.find(i=> i.name.toLowerCase().includes(name.toLowerCase())); const key=(name+'|'+unit).toLowerCase(); const f=out.find(x=> (x.name+'|'+x.unit).toLowerCase()===key); if(f){ f.qty+=qty; } else { out.push({ name, unit, qty, basis, inventoryItemId: match?.id }); } };

  for(const p of fini){
    // If a finished product maps to a known recipe id, expand via that recipe; otherwise leave as-is
    const r = rec.recipes[p.name.toLowerCase()] || rec.recipes[p.name];
    if(r){
      const multiplier = Math.max(1, Math.ceil(p.qty / Math.max(1, r.yield||1)));
      for(const ing of r.ingredients||[]){ add(ing.name, ing.unit, (ing.amount||0)*multiplier, `finished:${p.name}`); }
    } else {
      // Assume finished product already in raw terms; skip
    }
  }

  return out.sort((a,b)=> b.qty-a.qty);
}

export function chefInsightsForToday(dateISO: string): string[] {
  const inv = useInventoryStore.getState();
  const raw = forecastRawIngredientDemand(3);
  const tips: string[] = [];
  for(const d of raw.slice(0,6)){
    const onHand = d.inventoryItemId? inv.onHandQty(d.inventoryItemId) : 0;
    if(onHand && onHand > d.qty){ tips.push(`You have ~${onHand} ${d.unit} ${d.name} on hand; predicted need ~${Math.round(d.qty)}. Consider reducing order.`); }
    else if(d.inventoryItemId){ const deficit = Math.max(0, Math.ceil(d.qty - onHand)); if(deficit>0) tips.push(`Predicted need ~${Math.round(d.qty)} ${d.unit} ${d.name}; on hand ~${onHand}. Suggest ordering ${deficit}.`); }
    else { tips.push(`Watch ${d.name}: predicted need ~${Math.round(d.qty)} ${d.unit}. Link to an inventory item to auto-order.`); }
  }
  return tips;
}

export default estimateOutletTraffic;
