import type { Project, RasterLayer, TextLayer } from '../types'
import { getRenderSurface } from '../composite/getRenderSurface'
import type { PrintSettings } from '../store/useStudioStore'
import { convertLength } from './units'

const blendMap: Record<string, GlobalCompositeOperation> = {
  'normal': 'source-over',
  'multiply': 'multiply',
  'screen': 'screen',
  'overlay': 'overlay',
  'darken': 'darken',
  'lighten': 'lighten',
  'difference': 'difference',
  'exclusion': 'exclusion',
  'soft-light': 'soft-light',
  'hard-light': 'hard-light'
}

function renderProjectToCanvas(project: Project): HTMLCanvasElement {
  const c = document.createElement('canvas')
  c.width = project.canvas.width
  c.height = project.canvas.height
  const ctx = c.getContext('2d')!

  for (const L of [...project.layers].reverse()) {
    if (!L.visible || L.opacity===0) continue
    ctx.save()
    ctx.globalAlpha = L.opacity
    ctx.globalCompositeOperation = blendMap[L.blendMode] || 'source-over'
    ctx.translate(L.transform.x, L.transform.y)
    ctx.rotate((L.transform.rotation || 0) * Math.PI/180)
    ctx.scale(L.transform.scale || 1, L.transform.scale || 1)

    if (L.type === 'raster') {
      const surf = getRenderSurface(L as RasterLayer, project)
      ctx.drawImage(surf, 0, 0)
    } else if (L.type === 'text') {
      const T = L as TextLayer
      ctx.fillStyle = '#ffffff'
      ctx.font = `${T.weight>=600?'bold':''} ${T.size || 24}px ${T.font || 'sans-serif'}`
      ctx.textAlign = (T.align as CanvasTextAlign) || 'left'
      ctx.fillText(T.text, 0, 0)
    }
    ctx.restore()
  }
  return c
}

function triggerDownload(dataUrl: string, filename: string){
  const a = document.createElement('a')
  a.href = dataUrl
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
}

function drawCropMarks(ctx: CanvasRenderingContext2D, w:number, h:number, bleedPx:number){
  const len = 24
  ctx.strokeStyle = '#000'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(0, bleedPx); ctx.lineTo(len, bleedPx)
  ctx.moveTo(bleedPx, 0); ctx.lineTo(bleedPx, len); ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(w-len, bleedPx); ctx.lineTo(w, bleedPx)
  ctx.moveTo(w-bleedPx, 0); ctx.lineTo(w-bleedPx, len); ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(0, h-bleedPx); ctx.lineTo(len, h-bleedPx)
  ctx.moveTo(bleedPx, h-len); ctx.lineTo(bleedPx, h); ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(w-len, h-bleedPx); ctx.lineTo(w, h-bleedPx)
  ctx.moveTo(w-bleedPx, h-len); ctx.lineTo(w-bleedPx, h); ctx.stroke()
}

function renderForPrint(project: Project, print: PrintSettings, opts?: { includeBleed?: boolean; includeMarks?: boolean; scale?: number }){
  const scale = opts?.scale || 1
  const bleedPx = opts?.includeBleed ? Math.round(convertLength(print.bleed, print.units, 'px', print.dpi)) : 0

  const inner = renderProjectToCanvas(project)
  const out = document.createElement('canvas')
  out.width = Math.round((project.canvas.width + bleedPx*2) * scale)
  out.height = Math.round((project.canvas.height + bleedPx*2) * scale)
  const ctx = out.getContext('2d')!
  ctx.scale(scale, scale)
  ctx.drawImage(inner, bleedPx, bleedPx)

  if (opts?.includeMarks){
    drawCropMarks(ctx, out.width/scale, out.height/scale, bleedPx)
  }
  return out
}

export const ExportManager = {
  exportPNG(project: Project, filename='export.png'){
    const canvas = renderProjectToCanvas(project)
    const url = canvas.toDataURL('image/png')
    triggerDownload(url, filename)
  },
  exportJPEG(project: Project, quality=0.92, filename='export.jpg'){
    const canvas = renderProjectToCanvas(project)
    const flat = document.createElement('canvas')
    flat.width = canvas.width; flat.height = canvas.height
    const fctx = flat.getContext('2d')!
    fctx.fillStyle = '#ffffff'; fctx.fillRect(0,0,flat.width, flat.height)
    fctx.drawImage(canvas, 0, 0)
    const url = flat.toDataURL('image/jpeg', quality)
    triggerDownload(url, filename)
  },
  exportForPrintPNG(project: Project, print: PrintSettings, opts?: { includeBleed?: boolean; includeMarks?: boolean; scale?: number }, filename='export_print.png'){
    const c = renderForPrint(project, print, opts)
    triggerDownload(c.toDataURL('image/png'), filename)
  },
  exportForPrintJPG(project: Project, print: PrintSettings, opts?: { includeBleed?: boolean; includeMarks?: boolean; scale?: number }, filename='export_print.jpg'){
    const c = renderForPrint(project, print, opts)
    const flat = document.createElement('canvas')
    flat.width = c.width; flat.height = c.height
    const fctx = flat.getContext('2d')!
    fctx.fillStyle = '#ffffff'; fctx.fillRect(0,0,flat.width, flat.height)
    fctx.drawImage(c, 0, 0)
    triggerDownload(flat.toDataURL('image/jpeg', 0.95), filename)
  }
}

export default ExportManager;
