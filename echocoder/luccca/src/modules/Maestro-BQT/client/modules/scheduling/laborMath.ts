import { minutes } from './time';

export type RoleKey = 'garde_manger' | 'hot_kitchen' | 'butcher' | 'saucier' | 'steward' | 'banquet_captain' | 'server' | 'bartender';

export interface HeadcountRule { role: RoleKey; basePer100Guests: number; min: number; max?: number; multiplier?: number; }

const DEFAULT_RULES: HeadcountRule[] = [
  { role: 'garde_manger', basePer100Guests: 1.2, min: 1 },
  { role: 'hot_kitchen', basePer100Guests: 1.6, min: 1 },
  { role: 'butcher', basePer100Guests: 0.4, min: 0 },
  { role: 'saucier', basePer100Guests: 0.6, min: 0 },
  { role: 'steward', basePer100Guests: 0.8, min: 1 },
  { role: 'banquet_captain', basePer100Guests: 0.6, min: 1 },
  { role: 'server', basePer100Guests: 4.0, min: 2 },
  { role: 'bartender', basePer100Guests: 0.8, min: 1 },
];

export interface RequiredHeadcount { role: RoleKey; required: number; reason: string; eventId: string; date: string; start: string; end: string; }

export function estimateHeadcountForEvent(ev: import('../../stores/beoStore').CalendarEvent, rules: HeadcountRule[] = DEFAULT_RULES): RequiredHeadcount[] {
  const guests = Math.max(0, ev.guestCount || (ev as any).guests || 0);
  const factor = guests / 100;
  const date = (ev as any).date || (ev as any).start?.slice(0,10) || new Date().toISOString().slice(0,10);
  const start = (ev as any).start?.slice(11,16) || (ev as any).time || '16:00';
  const end = (ev as any).end?.slice(11,16) || '22:00';
  return rules.map(r => ({
    role: r.role,
    required: Math.max(r.min, Math.ceil(r.basePer100Guests * factor * (r.multiplier || 1))),
    reason: `${guests} guests × ${r.basePer100Guests}/100`,
    eventId: ev.id,
    date,
    start,
    end,
  }));
}

export function mergeRequirements(reqs: RequiredHeadcount[]): Record<string, number> {
  return reqs.reduce((acc, r) => { const key = `${r.date}|${r.role}`; acc[key] = (acc[key]||0) + r.required; return acc; }, {} as Record<string, number>);
}

export function shiftMinutes(start: string, end: string): number { return minutes(end) - minutes(start); }

export default estimateHeadcountForEvent;
