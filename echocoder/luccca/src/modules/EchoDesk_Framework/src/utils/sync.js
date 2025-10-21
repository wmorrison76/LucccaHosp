const channel = new BroadcastChannel('echo-desk')
const listeners = new Set()
channel.onmessage = (ev) => { for (const fn of listeners) fn(ev.data) }
export const SyncAdapter = {
  send: (type, payload) => channel.postMessage({ type, payload, ts: Date.now() }),
  on: (fn) => { listeners.add(fn); return () => listeners.delete(fn) }
}

export default SyncAdapter;
