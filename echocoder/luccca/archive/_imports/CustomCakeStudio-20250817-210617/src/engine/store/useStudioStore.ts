
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { nanoid } from 'nanoid'
import type { Project, BaseLayer, RasterLayer } from '../types'

type ToolId =
  | 'move'|'brush'|'eraser'|'marquee'|'lasso'|'wand'|'quick'|'eyedropper'|'text'|'shape'|'hand'|'zoom'|'crop'|'clone'

interface StudioState {
  project: Project
  activeLayerId: string | null
  activeTool: ToolId
  history: { undo: string[]; redo: string[] } // serialize for now
  setTool: (t: ToolId) => void
  newProject: (w:number,h:number,dpi:number) => void
  addRasterLayer: (name?:string, src?:string) => void
  setActiveLayer: (id:string) => void
  toggleLayerVisibility: (id:string) => void
  renameLayer: (id:string, name:string) => void
}

const emptyProject = (): Project => ({
  id: nanoid(),
  canvas: { width: 1024, height: 1024, dpi: 300, background: 'transparent' },
  layers: [],
  assets: {}
})

export const useStudioStore = create<StudioState>()(immer((set, get) => ({
  project: emptyProject(),
  activeLayerId: null,
  activeTool: 'move',
  history: { undo: [], redo: [] },

  setTool: (t) => set(s => { s.activeTool = t }),

  newProject: (w,h,dpi) => set(s => { s.project = { ...emptyProject(), canvas: { width:w, height:h, dpi, background:'transparent' } } }),

  addRasterLayer: (name='Raster Layer', src) => set(s => {
    const id = nanoid()
    const layer: RasterLayer = {
      id, name, type: 'raster', visible: true, locked: false, opacity: 1, blendMode: 'normal',
      transform: { x:0, y:0, scale:1, rotation:0 }, src
    }
    s.project.layers.unshift(layer)
    s.activeLayerId = id
  }),

  setActiveLayer: (id) => set(s => { s.activeLayerId = id }),

  toggleLayerVisibility: (id) => set(s => {
    const L = s.project.layers.find(l => l.id === id); if (L) L.visible = !L.visible
  }),

  renameLayer: (id, name) => set(s => {
    const L = s.project.layers.find(l => l.id === id); if (L) L.name = name
  }),
})))
