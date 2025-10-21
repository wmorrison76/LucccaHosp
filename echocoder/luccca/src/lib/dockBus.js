
// src/lib/dockBus.js
// Simple pub/sub bus for dock events (minimize/restore).
const listeners = new Set();
export function onDock(cb){ listeners.add(cb); return () => listeners.delete(cb); }
export function emitDock(evt){ for(const cb of [...listeners]) cb(evt); }
