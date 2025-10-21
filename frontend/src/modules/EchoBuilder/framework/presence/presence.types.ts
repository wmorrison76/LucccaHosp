export interface PresenceUser {
  id: string;
  name?: string;
  color?: string;
  avatarUrl?: string;
}

export interface Cursor {
  x: number; y: number; ts: number;
}

export interface PresenceState {
  self: PresenceUser;
  others: Record<string, { user: PresenceUser; cursor?: Cursor; following?: string | null }>;
}
