export type EchoOrbEvent = "question" | "answer" | "error" | "ping";
const EVENT_NAME = "echo:orb";

export function emitOrb(e: EchoOrbEvent, detail: any = {}) {
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { type: e, ...detail }}));
}

export function onOrb(handler: (payload: { type: EchoOrbEvent } & Record<string, any>) => void) {
  const fn = (ev: Event) => handler((ev as CustomEvent).detail);
  window.addEventListener(EVENT_NAME, fn as EventListener);
  return () => window.removeEventListener(EVENT_NAME, fn as EventListener);
}
