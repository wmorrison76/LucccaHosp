
export type BlendMode = 'normal'|'multiply'|'screen'|'overlay'|'darken'|'lighten'
export type LayerType = 'raster'|'vector'|'text'|'group'|'adjustment'

export interface Transform {
  x: number; y: number; scale: number; rotation: number;
}

export interface BaseLayer {
  id: string;
  name: string;
  type: LayerType;
  visible: boolean;
  locked: boolean;
  opacity: number;
  blendMode: BlendMode;
  transform: Transform;
}

export interface RasterLayer extends BaseLayer {
  type: 'raster';
  bitmap?: ImageBitmap; // loaded at runtime
  src?: string;         // persisted DataURL or path
}

export interface VectorShape { kind: 'rect'|'ellipse'|'path'; data: any }
export interface VectorLayer extends BaseLayer {
  type: 'vector';
  shapes: VectorShape[];
}

export interface TextLayer extends BaseLayer {
  type: 'text';
  text: string;
  font: string;
  size: number;
  weight: number;
  align: 'left'|'center'|'right';
}

export interface Project {
  id: string;
  canvas: { width: number; height: number; dpi: number; background: 'transparent'|'color'; color?: string };
  layers: BaseLayer[];
  assets: Record<string, string>; // id -> DataURL
}
