import type { Tool } from './Tool'
import { useStudioStore } from '../store/useStudioStore'
import type { RasterLayer } from '../types'
import { getMaskCanvas, maskStroke } from '../mask/LayerMask'

export const MaskBrushTool: Tool = {
  id: 'maskbrush',
  cursor: 'crosshair',
  onPointerDown(e, { stage }){
    const st = useStudioStore.getState()
    const id = st.activeLayerId; if(!id) return
    const L = st.project.layers.find(l=>l.id===id)
    if (!L || L.type!=='raster') return
    st.setLayerMaskEnabled(id, true)
    const pos = stage?.getPointerPosition?.() || { x:e.evt?.offsetX||0, y:e.evt?.offsetY||0 }
    const reveal = !(e.evt?.altKey || e.evt?.buttons===2)
    maskStroke(L as RasterLayer, st.project, pos.x, pos.y, st.maskBrushSize, reveal)
  },
  onPointerMove(e, { stage }){
    if (!(e.evt?.buttons&1)) return
    const st = useStudioStore.getState()
    const id = st.activeLayerId; if(!id) return
    const L = st.project.layers.find(l=>l.id===id)
    if (!L || L.type!=='raster' || !L.maskEnabled) return
    const pos = stage?.getPointerPosition?.() || { x:e.evt?.offsetX||0, y:e.evt?.offsetY||0 }
    const reveal = !(e.evt?.altKey || e.evt?.buttons===2)
    maskStroke(L as RasterLayer, st.project, pos.x, pos.y, st.maskBrushSize, reveal)
  },
  onPointerUp(){}
}

export default MaskBrushTool;
