export const degNorm = (deg: number) => ((deg % 360) + 360) % 360
export const clamp = (v:number, lo:number, hi:number) => Math.max(lo, Math.min(hi, v))

export default degNorm;
