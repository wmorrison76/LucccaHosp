export type BlendMode =
  | 'normal'|'multiply'|'screen'|'overlay'|'darken'|'lighten'|'difference'|'exclusion'|'hard-light'|'soft-light'|'hue'|'saturation'|'color'|'luminosity'

export type Transform = { x:number; y:number; scale:number; rotation:number }

export type LayerAdjust = {
  brightness?: number // -1..1
  contrast?: number   // -1..1
  saturation?: number // -1..1
  hue?: number        // -180..180
  invert?: boolean
}

export interface BaseLayer {
  id: string
  name: string
  type: 'raster'|'text'
  visible: boolean
  locked: boolean
  opacity: number
  blendMode: BlendMode
  transform: Transform
  adjust?: LayerAdjust

  // NEW: mask support
  maskEnabled?: boolean
  maskInverted?: boolean
  maskSrc?: string // persisted PNG data URL of mask (grayscale); white=reveal, black=hide
}

export interface RasterLayer extends BaseLayer {
  type: 'raster'
  src?: string
}

export interface TextLayer extends BaseLayer {
  type: 'text'
  text: string
  font: string
  size: number
  weight: number
  align: 'left'|'center'|'right'
}

export type Layer = RasterLayer | TextLayer

export interface Project {
  id: string
  canvas: { width:number; height:number; dpi:number; background:'transparent'|'white'|'black' }
  layers: Layer[]
  assets: Record<string, any>
}
