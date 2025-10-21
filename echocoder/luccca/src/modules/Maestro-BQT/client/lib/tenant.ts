export type TenantId = 'default' | 'luccca';

export interface TenantConfig {
  id: TenantId;
  brand: {
    name: string;
    subtitle?: string;
    icon?: 'chef' | 'default';
  };
  themeClass?: string; // CSS class applied to <html> for CSS vars override
}

const DEFAULT_TENANT: TenantConfig = {
  id: 'default',
  brand: { name: 'Maestro', subtitle: 'Banquets', icon: 'chef' },
  themeClass: undefined,
};

const LUCCCA_TENANT: TenantConfig = {
  id: 'luccca',
  brand: { name: 'LUCCCA', subtitle: 'Command Center', icon: 'chef' },
  themeClass: 'tenant-luccca',
};

export function resolveTenantFromEnv(): TenantConfig {
  const raw = (import.meta as any)?.env?.VITE_TENANT as string | undefined;
  const saved = typeof window !== 'undefined' ? localStorage.getItem('tenant:id') || undefined : undefined;
  const id = (raw || saved || 'luccca').toLowerCase() as TenantId;
  switch (id) {
    case 'luccca':
      return LUCCCA_TENANT;
    default:
      return DEFAULT_TENANT;
  }
}

export function applyTenantTheme(doc: Document, tenant: TenantConfig) {
  const root = doc.documentElement;
  const classes = new Set(root.className.split(/\s+/).filter(Boolean));
  // Remove any previous tenant-* classes
  Array.from(classes).forEach((c) => { if (c.startsWith('tenant-')) classes.delete(c); });
  if (tenant.themeClass) classes.add(tenant.themeClass);
  root.className = Array.from(classes).join(' ');
}

export function setActiveTenant(id: TenantId) {
  try { localStorage.setItem('tenant:id', id); } catch {}
}

export const Tenants = {
  default: DEFAULT_TENANT,
  luccca: LUCCCA_TENANT,
};

export default resolveTenantFromEnv;
