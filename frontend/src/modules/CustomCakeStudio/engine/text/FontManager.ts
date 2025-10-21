import type { FontEntry, FontSource } from './types'

const REG: Record<string, FontEntry> = {}

function makeId(name:string, style?:string, weight?:string|number){ return `${name}::${style||'normal'}::${weight||'400'}` }

export function listFonts(): FontEntry[] { return Object.values(REG) }

export function registerFont(src: FontSource): FontEntry {
  const id = makeId(src.name, src.style, src.weight)
  if (REG[id]) return REG[id]
  const entry: FontEntry = { id, status: 'idle', ...src }
  REG[id] = entry
  return entry
}

async function loadViaFontFace(e: FontEntry){
  if (!e.url) { e.status = 'error'; e.error = 'No URL'; return e }
  try {
    // @ts-ignore
    const ff = new FontFace(e.name, `url(${e.url})`, { style: e.style||'normal', weight: String(e.weight||'400') })
    await ff.load()
    ;(document as any).fonts?.add(ff)
    e.status = 'loaded'
    return e
  } catch (err:any){
    e.status = 'error'
    e.error = err?.message || 'FontFace failed'
    return e
  }
}

function injectCSSFace(e: FontEntry){
  if (!e.url) return
  const css = `@font-face{ font-family: '${e.name}'; src: url('${e.url}') format('woff2'); font-weight: ${e.weight||'400'}; font-style: ${e.style||'normal'}; font-display: swap; }`
  const tag = document.createElement('style')
  tag.setAttribute('data-ccs-font', e.id)
  tag.textContent = css
  document.head.appendChild(tag)
  e.status = 'loaded'
}

export async function ensureLoaded(name:string, style?:string, weight?:string|number){
  const id = makeId(name, style, weight)
  const e = REG[id] || registerFont({ name, style, weight })
  if (e.status === 'loaded') return e
  e.status = 'loading'
  if ('FontFace' in window){
    return await loadViaFontFace(e)
  } else {
    injectCSSFace(e)
    return e
  }
}

export default listFonts;
