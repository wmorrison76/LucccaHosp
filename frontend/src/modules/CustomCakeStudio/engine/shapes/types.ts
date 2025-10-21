export type ShapeKind = 'rect' | 'ellipse' | 'polygon'

export type ShapeProps = {
  kind: ShapeKind
  width?: number
  height?: number
  points?: { x:number;y:number }[]
  fill?: string
  stroke?: string
  strokeWidth?: number
}

export type ShapeLayer = {
  id: string
  type: 'shape'
  name: string
  visible: boolean
  locked: boolean
  opacity: number
  blendMode: string
  transform: { x:number;y:number; scale:number; rotation:number }
  shape: ShapeProps
}
