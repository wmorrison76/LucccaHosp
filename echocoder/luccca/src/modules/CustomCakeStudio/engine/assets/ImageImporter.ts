import { useStudioStore } from '../store/useStudioStore'
import { readFileAsDataURL } from '../../utils/files'
import type { RasterLayer } from '../types'
import { getSurfaceForLayer } from '../raster/RasterSurface'

function fitToCanvas(imgW:number, imgH:number, canvasW:number, canvasH:number){
  const scale = Math.min(canvasW / imgW, canvasH / imgH, 1)
  const w = Math.round(imgW * scale)
  const h = Math.round(imgH * scale)
  const x = Math.round((canvasW - w)/2)
  const y = Math.round((canvasH - h)/2)
  return { scale, x, y, w, h }
}

async function drawIntoLayer(layer: RasterLayer, dataUrl: string){
  const img = new Image()
  img.src = dataUrl
  await img.decode()
  const store = useStudioStore.getState()
  const surf = getSurfaceForLayer(layer, store.project)
  const ctx = surf.getContext('2d')!
  // fit to canvas (visual import)
  const { w, h } = fitToCanvas(img.naturalWidth, img.naturalHeight, surf.width, surf.height)
  ctx.clearRect(0,0,surf.width,surf.height)
  ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, 0, 0, w, h)
}

export const ImageImporter = {
  async importFile(file: File){
    const dataUrl = await readFileAsDataURL(file)
    return this.importDataUrl(dataUrl, file.name)
  },
  async importUrl(url: string){
    // fetch to dataURL for stability (CORS-safe if same-origin; otherwise fallback to layer src URL)
    try {
      const res = await fetch(url, { mode: 'cors' })
      const blob = await res.blob()
      const dataUrl = await new Promise<string>((resolve)=>{
        const r = new FileReader(); r.onload = ()=>resolve(r.result as string); r.readAsDataURL(blob)
      })
      return this.importDataUrl(dataUrl, url.split('/').pop() || 'Image')
    } catch {
      // Fallback: use URL directly (may taint canvas if cross-origin)
      return this.importDataUrl(url, url.split('/').pop() || 'Image')
    }
  },
  async importDataUrl(dataUrl: string, name='Image'){
    const store = useStudioStore.getState()
    // Create layer with src (kept for persistence); then draw the pixels to surface
    store.addRasterLayer(name, dataUrl)
    const id = store.activeLayerId
    if (!id) return
    const layer = store.project.layers.find(l => l.id === id)
    if (!layer || layer.type!=='raster') return
    await drawIntoLayer(layer as any, dataUrl)
    // center & fit transform
    const img = new Image(); img.src = dataUrl; await img.decode()
    const { scale, x, y } = fitToCanvas(img.naturalWidth, img.naturalHeight, store.project.canvas.width, store.project.canvas.height)
    useStudioStore.getState().updateActiveLayerTransform({ x, y, scale })
    useStudioStore.getState().historyMark('Import Image')
  }
}

export default ImageImporter;
