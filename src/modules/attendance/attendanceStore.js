const K = (s)=> `lu-attendance:${s}`;

export function loadPunches(){ try { return JSON.parse(localStorage.getItem(K("punches"))||"{}"); } catch { return {}; } }
export function savePunches(data){ localStorage.setItem(K("punches"), JSON.stringify(data)); }

export function recordPunch({ empId, dateISO, inHM=null, outHM=null }) {
  const all = loadPunches();
  all[dateISO] = all[dateISO] || {};
  all[dateISO][empId] = all[dateISO][empId] || { punches: [] };
  all[dateISO][empId].punches.push({ in: inHM, out: outHM, ts: Date.now() });
  savePunches(all);
  return all;
}
