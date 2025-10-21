import type { DataAdapter } from "../WidgetSDK";
export const localStorageAdapter: DataAdapter = {
  id: "local",
  async get(key: string){ try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : null; } catch { return null; } },
  async set(key: string, value: any){ try { localStorage.setItem(key, JSON.stringify(value)); } catch {} },
};
