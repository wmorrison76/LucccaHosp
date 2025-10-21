export type Role = "owner" | "manager" | "staff" | "viewer";

export interface RbacRules {
  role: Role;
  redact?: {
    // map of field paths that should be hidden for this role
    fields: string[];
  };
}
