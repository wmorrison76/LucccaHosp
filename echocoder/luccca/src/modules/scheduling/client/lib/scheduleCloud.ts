export async function cloudSaveSchedule(outlet: string, weekStartISO: string, data: unknown){
  try{ await fetch('/api/schedule/upsert', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ outlet, weekStartISO, data }) }); }catch{}
}

export async function cloudGetSchedule(outlet: string, weekStartISO: string){
  try{ const r = await fetch(`/api/schedule/get?outlet=${encodeURIComponent(outlet)}&weekStartISO=${encodeURIComponent(weekStartISO)}`); if(!r.ok) return null; const j = await r.json(); return j?.record || null; }catch{ return null; }
}
