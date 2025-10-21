/**
 * DOM capture utilities: convert any element into a PNG blob without external deps.
 * Works by inlining computed styles and rasterizing via SVG <foreignObject>.
 */
function inlineStyles(orig, clone){
  const win = orig.ownerDocument.defaultView
  const style = win.getComputedStyle(orig)
  const cssText = Array.from(style).map(k => `${k}:${style.getPropertyValue(k)}`).join(';')
  clone.setAttribute('style', cssText)
  // propagate values
  if (orig instanceof HTMLTextAreaElement) clone.value = orig.value
  if (orig instanceof HTMLInputElement) clone.setAttribute('value', orig.value)
  // recurse
  for (let i=0;i<orig.children.length;i++){
    inlineStyles(orig.children[i], clone.children[i])
  }
}
export async function elementToPNGBlob(element, scale=2){
  const rect = element.getBoundingClientRect()
  const w = Math.max(1, Math.floor(rect.width))
  const h = Math.max(1, Math.floor(rect.height))
  const clone = element.cloneNode(true)
  inlineStyles(element, clone)
  const wrapper = document.createElement('div')
  wrapper.setAttribute('xmlns','http://www.w3.org/1999/xhtml')
  wrapper.style.width = w + 'px'
  wrapper.style.height = h + 'px'
  wrapper.style.display = 'block'
  wrapper.style.background = window.getComputedStyle(element).background || 'transparent'
  wrapper.appendChild(clone)

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w*scale}" height="${h*scale}">
  <foreignObject width="100%" height="100%" transform="scale(${scale})">
    ${new XMLSerializer().serializeToString(wrapper)}
  </foreignObject>
</svg>`

  const svgBlob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' })
  const url = URL.createObjectURL(svgBlob)
  const img = new Image()
  const blob = await new Promise((resolve, reject)=>{
    img.onload = () => {
      try{
        const canvas = document.createElement('canvas')
        canvas.width = Math.max(1, Math.floor(img.width))
        canvas.height = Math.max(1, Math.floor(img.height))
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0)
        canvas.toBlob(b => { URL.revokeObjectURL(url); resolve(b) }, 'image/png', 1.0)
      }catch(err){ reject(err) }
    }
    img.onerror = ()=> reject(new Error('Failed to rasterize SVG'))
    img.src = url
  })
  return { blob, width: w*scale, height: h*scale }
}
export async function captureBySelector(selector, scale=2){
  const el = document.querySelector(selector)
  if (!el) throw new Error('Selector not found: ' + selector)
  return await elementToPNGBlob(el, scale)
}
