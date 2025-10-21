
// src/lib/toastBus.js
const listeners = new Set();
export function onToast(cb){ listeners.add(cb); return () => listeners.delete(cb); }
export function toast(message, opts={}){ for(const cb of [...listeners]) cb({ message, ...opts }); }
