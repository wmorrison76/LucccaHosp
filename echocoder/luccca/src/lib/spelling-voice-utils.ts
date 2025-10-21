// @ts-nocheck
export const sanitizeInput = (s:string)=> (s||'').replace(/\s+/g,' ').trim();
export const toTitleCase = (s:string)=> sanitizeInput(s).toLowerCase().replace(/\b\w/g, m=>m.toUpperCase());
export const stripDiacritics = (s:string)=> s.normalize('NFD').replace(/\p{Diacritic}+/gu,'');
