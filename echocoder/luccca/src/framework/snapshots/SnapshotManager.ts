import { loadJSON, saveJSON } from "../core/storage";
export interface Snapshot<T = unknown> { id: string; name: string; at: number; payload: T; }
const KEY = "snap:list:v1";
function uid(){ return Math.random().toString(36).slice(2,8) + "-" + Date.now().toString(36); }
export class SnapshotManager<T=unknown> {
  list(): Snapshot<T>[] { return loadJSON<Snapshot<T>[]>(KEY, []); }
  save(name:string, payload:T): Snapshot<T>{ const s={ id:uid(), name, at:Date.now(), payload }; const next=[s,...this.list()].slice(0,200); saveJSON(KEY, next); return s; }
  load(id:string){ return this.list().find(s=>s.id===id); }
  diff(a:T,b:T){ try{ return JSON.stringify(b,null,2).split("\n").filter(line => !JSON.stringify(a,null,2).includes(line)); } catch { return []; } }
}
