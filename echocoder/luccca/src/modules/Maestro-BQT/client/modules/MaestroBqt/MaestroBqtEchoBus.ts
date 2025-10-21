export type MBqtDomainEvent<T=any> = { topic: string; at: string; payload: T };
export type Listener = (e: MBqtDomainEvent)=>void;

export interface MaestroBqtEchoBridge {
  sendIntent(intent: any): void;
  subscribe(topic: string, fn: (e: MBqtDomainEvent)=>void): () => void;
}

export const MaestroBqtEchoBus = (()=> {
  const m = new Map<string, Set<Listener>>();
  return {
    on(topic: string, fn: Listener){ if(!m.has(topic)) m.set(topic, new Set()); m.get(topic)!.add(fn); return ()=>m.get(topic)!.delete(fn); },
    emit(e: MBqtDomainEvent){ m.get(e.topic)?.forEach(fn=>fn(e)); },
  };
})();

export const DefaultMaestroBqtEchoBridge: MaestroBqtEchoBridge = {
  sendIntent: (intent)=> MaestroBqtEchoBus.emit({ topic: 'echo.intent', at: new Date().toISOString(), payload: intent }),
  subscribe: (topic, fn)=> MaestroBqtEchoBus.on(topic, fn),
};

if (typeof window !== 'undefined') {
  // @ts-ignore
  window.MaestroBqtEchoBridge = window.MaestroBqtEchoBridge ?? DefaultMaestroBqtEchoBridge;
}

export default MaestroBqtEchoBus;
