import type { AppEvent } from "./types";

type Handler = (e: AppEvent) => void;
const listeners = new Map<string, Set<Handler>>();
const sticky = new Map<string, AppEvent>();

export function emit(e: AppEvent){
  const ls = listeners.get(e.type);
  if (e.sticky) sticky.set(e.type, e);
  if (!ls) return;
  for (const fn of Array.from(ls)) { try { fn(e); } catch (err) { console.warn("[bus] handler error", err); } }
}

export function on(type: string, fn: Handler, opts: { replaySticky?: boolean } = { replaySticky: true }){
  let set = listeners.get(type);
  if (!set) { set = new Set(); listeners.set(type, set); }
  set.add(fn);
  if (opts.replaySticky && sticky.has(type)) {
    try { fn(sticky.get(type)!); } catch {}
  }
  return () => { set!.delete(fn); if (set!.size === 0) listeners.delete(type); };
}
