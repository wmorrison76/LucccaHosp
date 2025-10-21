import type { Command } from "../core/types";

const reg = new Map<string, Command>();

export function register(cmd: Command){ reg.set(cmd.id, cmd); }
export function unregister(id: string){ reg.delete(id); }
export function all(): Command[]{ return Array.from(reg.values()); }
export function find(query: string): Command[]{
  const q = query.trim().toLowerCase();
  if (!q) return all();
  return all().filter(c => c.title.toLowerCase().includes(q) || (c.keywords ?? []).some(k => k.toLowerCase().includes(q)));
}
