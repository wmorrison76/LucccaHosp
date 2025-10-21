export async function linkProject({ eventId, spaceId }:{eventId:string, spaceId:string}){
  const base = import.meta.env.VITE_API_BASE;
  const r = await fetch(`${base}/floorplans/link`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ eventId, spaceId }) });
  if(!r.ok) throw new Error(await r.text());
  return r.json(); // { projectId, scenarios: [] }
}

export async function getSeatCounts({ projectId, scenario }:{projectId:string, scenario:string}){
  // provider call happens server-side; this client just fetches cached counts
  const base = import.meta.env.VITE_API_BASE;
  const r = await fetch(`${base}/floorplans/seat-counts?projectId=${encodeURIComponent(projectId)}&scenario=${encodeURIComponent(scenario)}`);
  if(!r.ok) throw new Error(await r.text());
  return r.json(); // { seats, scenario }
}
