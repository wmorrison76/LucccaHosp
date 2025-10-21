export const getJSON = (k, fallback=null) => {
  try { return JSON.parse(localStorage.getItem(k) ?? 'null') ?? fallback; }
  catch { return fallback; }
}
export const setJSON = (k, v) => {
  try { localStorage.setItem(k, JSON.stringify(v)); } catch {}
}

export default getJSON;
