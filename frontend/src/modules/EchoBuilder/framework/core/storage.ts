const NAMESPACE = "lu";

export function storageKey(key: string) { return `${NAMESPACE}:${key}`; }

export function saveJSON<T>(key: string, value: T) {
  try { localStorage.setItem(storageKey(key), JSON.stringify(value)); }
  catch (err) { console.warn("[storage] save failed", err); }
}

export function loadJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(storageKey(key));
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch (err) {
    console.warn("[storage] load failed", err);
    return fallback;
  }
}

export function remove(key: string) {
  try { localStorage.removeItem(storageKey(key)); } catch {}
}

export default storageKey;
