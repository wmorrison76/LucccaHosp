export interface KPI { id: string; label: string; value: number; unit?: string; trend?: 'up'|'down'|'flat'; }
export type KPISet = Record<string, KPI>;
