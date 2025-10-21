export interface MenuItem { id: string; name: string; price: number; category?: string; tags?: string[]; }
export interface Menu { id: string; name: string; items: MenuItem[]; }
export const defaultMenu: Menu = { id: 'default', name: 'Default Menu', items: [] };
