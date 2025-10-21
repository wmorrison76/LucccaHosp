export type Role = "owner" | "manager" | "staff" | "viewer";
export interface RbacRules { role: Role; redact?: { fields: string[]; }; }
