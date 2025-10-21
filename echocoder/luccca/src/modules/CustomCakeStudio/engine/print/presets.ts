import type { Unit } from './units'

export type PrintPreset = {
  id: string
  name: string
  width: number
  height: number
  units: Unit
  dpi: number
  bleed: number
  margin: number
  notes?: string
}

export const PRINT_PRESETS: PrintPreset[] = [
  { id: 'letter', name: 'US Letter 8.5×11 in', width: 8.5, height: 11, units: 'in', dpi: 300, bleed: 0.125, margin: 0.25 },
  { id: 'a4', name: 'A4 210×297 mm', width: 210, height: 297, units: 'mm', dpi: 300, bleed: 3, margin: 5 },
  { id: 'photo-8x10', name: 'Photo 8×10 in', width: 8, height: 10, units: 'in', dpi: 300, bleed: 0.125, margin: 0.25 },
  { id: 'square-12', name: 'Square 12×12 in', width: 12, height: 12, units: 'in', dpi: 300, bleed: 0.125, margin: 0.25 },
  { id: 'sheet-cake-12x18', name: 'Sheet Cake 12×18 in', width: 12, height: 18, units: 'in', dpi: 300, bleed: 0.125, margin: 0.25, notes: 'Popular sheet cake size' },
  { id: 'round-cake-8', name: 'Round Cake 8 in (artboard)', width: 8, height: 8, units: 'in', dpi: 300, bleed: 0.0, margin: 0.25, notes: 'Use circular mask for topper cut' },
  { id: 'cupcake-toppers-letter', name: 'Cupcake Toppers (Letter sheet)', width: 8.5, height: 11, units: 'in', dpi: 300, bleed: 0.125, margin: 0.25, notes: 'Arrange circles; print & punch' }
]

export default PRINT_PRESETS;
