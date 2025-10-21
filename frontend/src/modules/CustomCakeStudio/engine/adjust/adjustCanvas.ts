import type { RasterLayer, Project } from '../types'
import { getSurfaceForLayer } from '../raster/RasterSurface'

type Adjust = {
  brightness?: number // -1..1
  contrast?: number   // -1..1
  saturation?: number // -1..1
  hue?: number        // -180..180
  invert?: boolean
}

function clamp(v:number, lo:number, hi:number){ return Math.max(lo, Math.min(hi, v)) }

function rgbToHsl(r:number,g:number,b:number){
  r/=255; g/=255; b/=255
  const max = Math.max(r,g,b), min = Math.min(r,g,b)
  let h=0, s=0, l=(max+min)/2
  if (max!==min){
    const d = max-min
    s = l>0.5 ? d/(2-max-min) : d/(max+min)
    switch(max){
      case r: h = (g-b)/d + (g<b?6:0); break
      case g: h = (b-r)/d + 2; break
      case b: h = (r-g)/d + 4; break
    }
    h/=6
  }
  return [h,s,l] as [number, number, number]
}

function hslToRgb(h:number,s:number,l:number){
  let r:number, g:number, b:number
  if (s===0){ r=g=b=l }
  else {
    const hue2rgb=(p:number,q:number,t:number)=>{
      if (t<0) t+=1; if (t>1) t-=1
      if (t<1/6) return p+(q-p)*6*t
      if (t<1/2) return q
      if (t<2/3) return p+(q-p)*(2/3 - t)*6
      return p
    }
    const q = l<0.5 ? l*(1+s) : l+s - l*s
    const p = 2*l - q
    r = hue2rgb(p,q,h+1/3)
    g = hue2rgb(p,q,h)
    b = hue2rgb(p,q,h-1/3)
  }
  return [Math.round(r*255), Math.round(g*255), Math.round(b*255)] as [number, number, number]
}

function applyAdjustmentsToImageData(data: ImageData, adj: Adjust){
  const br = clamp(adj.brightness ?? 0, -1, 1)
  const ct = clamp(adj.contrast ?? 0, -1, 1)
  const st = clamp(adj.saturation ?? 0, -1, 1)
  const hu = clamp(adj.hue ?? 0, -180, 180)
  const inv = !!adj.invert

  const cf = (259*(ct*255 + 255)) / (255*(259 - ct*255)) // contrast factor
  const len = data.data.length
  for (let i=0; i<len; i+=4){
    let r = data.data[i], g = data.data[i+1], b = data.data[i+2]
    const a = data.data[i+3]

    // brightness
    if (br !== 0){
      const d = 255*br
      r = r + d; g = g + d; b = b + d
    }
    // contrast
    if (ct !== 0){
      r = cf*(r-128)+128
      g = cf*(g-128)+128
      b = cf*(b-128)+128
    }
    // saturation & hue via HSL
    if (st !== 0 || hu !== 0){
      let [h,s,l] = rgbToHsl(r,g,b)
      s = clamp(s*(1+st), 0, 1)
      if (hu !== 0){
        h = (h + (hu/360)) % 1
        if (h<0) h+=1
      }
      ;[r,g,b] = hslToRgb(h,s,l)
    }
    // invert
    if (inv){
      r = 255 - r; g = 255 - g; b = 255 - b
    }

    data.data[i]   = clamp(Math.round(r), 0, 255)
    data.data[i+1] = clamp(Math.round(g), 0, 255)
    data.data[i+2] = clamp(Math.round(b), 0, 255)
    data.data[i+3] = a
  }
}

const _cache = new WeakMap<HTMLCanvasElement, { key: string, out: HTMLCanvasElement }>()

export function getAdjustedSurface(layer: RasterLayer, project: Project): HTMLCanvasElement {
  const base = getSurfaceForLayer(layer, project)
  const adj = layer.adjust || {}
  const key = JSON.stringify([adj.brightness||0, adj.contrast||0, adj.saturation||0, adj.hue||0, !!adj.invert, base.width, base.height])
  const entry = _cache.get(base)
  if (entry && entry.key === key) return entry.out

  if (!adj.brightness && !adj.contrast && !adj.saturation && !adj.hue && !adj.invert){
    // passthrough
    return base
  }
  const out = document.createElement('canvas')
  out.width = base.width; out.height = base.height
  const octx = out.getContext('2d')!
  octx.drawImage(base, 0, 0)
  const img = octx.getImageData(0, 0, out.width, out.height)
  applyAdjustmentsToImageData(img, adj as Adjust)
  octx.putImageData(img, 0, 0)
  _cache.set(base, { key, out })
  return out
}

export default getAdjustedSurface;
