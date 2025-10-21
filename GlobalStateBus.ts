/**
 * LUCCCA | DB-02
 * File: packages/echocore/src/state/GlobalStateBus.ts
 * Created: 2025-07-27 by Window B
 * Depends On: none
 * Exposes: GlobalStateBus, Event types
 * Location Notes: Consumed by dashboard & whiteboard panes
 * Tests: packages/echo-testing/src/state/GlobalStateBus.test.ts
 * ADR: ADR-0002-pane-life-cycle-and-registry.md
 */
type Listener<T> = (payload: T) => void;

export class GlobalStateBus<TEvents extends Record<string, any>> { 
  private listeners: Map<keyof TEvents, Set<Listener<any>>> = new Map();

  on<K extends keyof TEvents>(event: K, fn: Listener<TEvents[K]>) {
    if (!this.listeners.has(event)) this.listeners.set(event, new Set());
    this.listeners.get(event)!.add(fn);
    return () => this.off(event, fn);
  }

  off<K extends keyof TEvents>(event: K, fn: Listener<TEvents[K]>) {
    this.listeners.get(event)?.delete(fn);
  }

  emit<K extends keyof TEvents>(event: K, payload: TEvents[K]) {
    this.listeners.get(event)?.forEach(fn => fn(payload));
  }
}
