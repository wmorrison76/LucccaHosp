import { useBEOStore } from '../stores/beoStore';
import type { BEODocument } from '../types/beo';
import type { CalendarEvent } from '../stores/beoStore';
import { scaleBEORecipes } from './recipe-scaling';

export type Division = 'garde_manger' | 'hot_line' | 'butcher' | 'saucier' | 'pastry' | 'stewarding';

export interface PrepTask {
  menuItemId: string;
  recipeId: string;
  title: string;
  quantity: number;
  estMinutes: number;
  notes?: string;
}

export interface DivisionSheet {
  division: Division;
  tasks: PrepTask[];
  totalMinutes: number;
}

function mapCategoryToDivision(cat?: string): Division {
  const c = (cat||'').toLowerCase();
  if (c.includes('salad') || c.includes('cold') || c.includes('garde')) return 'garde_manger';
  if (c.includes('entree') || c.includes('hot') || c.includes('grill') || c.includes('line')) return 'hot_line';
  if (c.includes('butcher') || c.includes('protein')) return 'butcher';
  if (c.includes('sauce') || c.includes('saucier')) return 'saucier';
  if (c.includes('dessert') || c.includes('pastry')) return 'pastry';
  return 'hot_line';
}

export function generateDivisionSheets(beo: BEODocument): DivisionSheet[] {
  const comp = scaleBEORecipes(beo);
  const byDivision: Record<Division, PrepTask[]> = {
    garde_manger: [], hot_line: [], butcher: [], saucier: [], pastry: [], stewarding: []
  };
  for (const item of beo.menu.items || []) {
    const r = item.recipe; if (!r) continue;
    const division = mapCategoryToDivision(item.category);
    const est = (r.prepTimeMinutes ?? 30) + (r.cookTimeMinutes ?? 0);
    const qty = Math.max(1, Math.ceil((beo.event.guaranteed || 0) / Math.max(1, r.yield || 1)));
    byDivision[division].push({ menuItemId: item.id, recipeId: r.id, title: item.name || r.name, quantity: qty, estMinutes: est });
  }
  return (Object.keys(byDivision) as Division[]).map(div => ({
    division: div,
    tasks: byDivision[div],
    totalMinutes: byDivision[div].reduce((s,t)=> s + t.estMinutes, 0)
  })).filter(d => d.tasks.length>0);
}

export function estimatePrepEfficiencyForDate(events: CalendarEvent[], beos: Record<string, BEODocument>, dateISO: string): { score: number; stationLoads: { division: Division; minutes: number }[] } {
  const todays = events.filter(e => e.date === dateISO && !!e.beoId);
  let minutes = 0; const loads: Record<Division, number> = { garde_manger:0, hot_line:0, butcher:0, saucier:0, pastry:0, stewarding:0 };
  for (const ev of todays) {
    const b = ev.beoId ? beos[ev.beoId] : undefined; if(!b) continue;
    const sheets = generateDivisionSheets(b);
    for (const s of sheets) { minutes += s.totalMinutes; loads[s.division] = (loads[s.division]||0) + s.totalMinutes; }
  }
  // Heuristic: assume 8h capacity per cook per station (3 cooks/station baseline)
  const baselineCapacity = 3 * 8 * 60; // minutes
  const stationLoads = (Object.keys(loads) as Division[]).map(d => ({ division: d, minutes: loads[d] }));
  const avgUtil = stationLoads.length ? stationLoads.reduce((s,l)=> s + Math.min(1, l.minutes / baselineCapacity), 0) / stationLoads.length : 0;
  const score = Math.round((1 - Math.min(1, avgUtil)) * 100);
  return { score, stationLoads };
}

export default generateDivisionSheets;
