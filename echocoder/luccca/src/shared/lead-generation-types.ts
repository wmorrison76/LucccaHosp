export interface LeadSource { id: string; name: string; active: boolean; }
export interface Lead { id: string; name: string; email?: string; phone?: string; sourceId?: string; score?: number; }
export const defaultLeadSources: LeadSource[] = [
  { id: 'web', name: 'Website', active: true },
  { id: 'ref', name: 'Referral', active: true },
];
