import type { AppEvent, Disposer } from "./types";

type Listener = (e: AppEvent) => void;

const target = new EventTarget();
const stickyMap = new Map<string, AppEvent>();

export function emit<T = any>(event: AppEvent<T>) {
  const ev = new CustomEvent("app", { detail: event });
  if (event.sticky) stickyMap.set(event.type, event);
  target.dispatchEvent(ev);
}

export function on(type: string, fn: Listener, replaySticky = true): Disposer {
  const handler = (ev: Event) => {
    const ce = ev as CustomEvent;
    const detail = ce.detail as AppEvent;
    if (detail.type === type) fn(detail);
  };
  target.addEventListener("app", handler as EventListener);
  if (replaySticky && stickyMap.has(type)) {
    queueMicrotask(() => fn(stickyMap.get(type)!));
  }
  return () => target.removeEventListener("app", handler as EventListener);
}

export function clearSticky(type?: string) {
  if (type) stickyMap.delete(type);
  else stickyMap.clear();
}

export default on;
