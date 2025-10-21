import type { Unit } from '../print/units'

export type GridShape = 'circle' | 'rect'

export interface GridSettings {
  enabled: boolean
  snapEnabled: boolean
  showCenters: boolean
  showCutGuides: boolean

  units: Unit
  shape: GridShape
  itemWidth: number   // in units
  itemHeight: number  // in units
  spacingX: number    // in units
  spacingY: number    // in units
  marginX: number     // in units
  marginY: number     // in units
  rows?: number       // optional fixed count
  cols?: number       // optional fixed count
  presetId?: string
}
