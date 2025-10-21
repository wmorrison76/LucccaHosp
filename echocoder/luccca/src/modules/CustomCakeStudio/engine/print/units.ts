export type Unit = 'px'|'in'|'mm'

export const INCH_TO_MM = 25.4

export function inToPx(inches:number, dpi:number){ return inches * dpi }
export function pxToIn(px:number, dpi:number){ return px / dpi }

export function mmToPx(mm:number, dpi:number){ return (mm / INCH_TO_MM) * dpi }
export function pxToMm(px:number, dpi:number){ return (px / dpi) * INCH_TO_MM }

export function convertLength(val:number, from:Unit, to:Unit, dpi:number){
  if (from===to) return val
  if (from==='px' && to==='in') return pxToIn(val, dpi)
  if (from==='px' && to==='mm') return pxToMm(val, dpi)
  if (from==='in' && to==='px') return inToPx(val, dpi)
  if (from==='in' && to==='mm') return val * INCH_TO_MM
  if (from==='mm' && to==='px') return mmToPx(val, dpi)
  if (from==='mm' && to==='in') return val / INCH_TO_MM
  return val
}

export default INCH_TO_MM;
