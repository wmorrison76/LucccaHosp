export type ApiResponse<T=unknown> = { ok: true; data: T } | { ok: false; error: string };
export const ok = <T,>(data: T): ApiResponse<T> => ({ ok: true, data });
export const fail = (error: string): ApiResponse => ({ ok: false, error });
