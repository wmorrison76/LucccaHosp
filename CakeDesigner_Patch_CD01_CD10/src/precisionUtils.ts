/**
 * Precision utilities to guarantee numerical stability @ 1e-5.
 */
export const EPS = 1e-5;

export const approxEqual = (a: number, b: number, eps: number = EPS) =>
  Math.abs(a - b) <= eps;

export const clampPrecision = (v: number, eps: number = EPS) =>
  Math.round(v / eps) * eps;
