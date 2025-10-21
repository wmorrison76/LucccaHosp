const NAMESPACE = "lu";
export function storageKey(key: string){ return `${NAMESPACE}:${key}`; }
export function saveJSON<T>(key: string, value: T){
  try { localStorage.setItem(storageKey(key), JSON.stringify(value)); } catch {}
}
export function loadJSON<T>(key: string, fallback: T): T {
  try { const raw = localStorage.getItem(storageKey(key)); return raw ? JSON.parse(raw) as T : fallback; }
  catch { return fallback; }
}
export function remove(key: string){ try { localStorage.removeItem(storageKey(key)); } catch {} }
