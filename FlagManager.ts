/**
 * LUCCCA | DB-03
 * File: packages/echocore/src/flags/FlagManager.ts
 * Created: 2025-07-27 by Window B
 * Depends On: DB-02 GlobalStateBus
 * Exposes: FlagManager
 * Location Notes: Used across app to register / trigger flags (chef flags, OT, etc.)
 * Tests: packages/echo-testing/src/flags/FlagManager.test.ts
 * ADR: ADR-0003-feature-flag-strategy-in-luccca.md
 */
export type Flag = { id: string; type: 'warning' | 'info' | 'critical'; message: string; createdAt: number };

export class FlagManager {
  private flags: Flag[] = [];
  add(flag: Flag) {
    this.flags.push(flag);
    return flag;
  }
  list() {
    return this.flags.slice();
  }
  clear(id?: string) {
    if (!id) this.flags = [];
    else this.flags = this.flags.filter(f => f.id !== id);
  }
}
