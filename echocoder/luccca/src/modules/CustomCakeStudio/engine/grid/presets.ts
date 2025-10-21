import type { GridSettings } from './types'

export type GridPreset = {
  id: string
  name: string
  settings: Partial<GridSettings>
}

export const GRID_PRESETS: GridPreset[] = [
  {
    id: 'cupcake-2in-letter',
    name: 'Cupcake toppers 2.0" on Letter',
    settings: {
      units: 'in', shape: 'circle',
      itemWidth: 2.0, itemHeight: 2.0,
      spacingX: 0.25, spacingY: 0.25,
      marginX: 0.5, marginY: 0.5,
      rows: 4, cols: 3
    }
  },
  {
    id: 'cupcake-2_5in-letter',
    name: 'Cupcake toppers 2.5" on Letter',
    settings: {
      units: 'in', shape: 'circle',
      itemWidth: 2.5, itemHeight: 2.5,
      spacingX: 0.25, spacingY: 0.25,
      marginX: 0.5, marginY: 0.5,
      rows: 3, cols: 3
    }
  },
  {
    id: 'round-cake-8in',
    name: 'Round Cake 8" (guide only)',
    settings: {
      units: 'in', shape: 'circle',
      itemWidth: 8.0, itemHeight: 8.0,
      spacingX: 0.0, spacingY: 0.0,
      marginX: 0.0, marginY: 0.0,
      rows: 1, cols: 1
    }
  },
  {
    id: 'sheet-cake-12x18',
    name: 'Sheet Cake 12×18" (guide only)',
    settings: {
      units: 'in', shape: 'rect',
      itemWidth: 12.0, itemHeight: 18.0,
      spacingX: 0.0, spacingY: 0.0,
      marginX: 0.0, marginY: 0.0,
      rows: 1, cols: 1
    }
  }
]

export default GRID_PRESETS;
