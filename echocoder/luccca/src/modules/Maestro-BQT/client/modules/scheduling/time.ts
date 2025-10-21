export function startOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = (day === 0 ? -6 : 1) - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0,0,0,0);
  return d;
}
export function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}
export function toISODate(d: Date): string { return d.toISOString().slice(0,10); }
export function fmtDay(d: Date): string { return d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' }); }
export function minutes(hhmm: string): number { const [h,m] = hhmm.split(':').map(Number); return h*60 + (m||0); }
export function hhmm(totalMin: number): string { const h=Math.floor(totalMin/60), m=totalMin%60; return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`; }

export default startOfWeek;
