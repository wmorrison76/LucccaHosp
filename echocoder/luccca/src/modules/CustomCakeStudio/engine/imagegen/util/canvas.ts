export function cloneCanvas(src: HTMLCanvasElement): HTMLCanvasElement {
  const c = document.createElement('canvas'); c.width = src.width; c.height = src.height
  c.getContext('2d')!.drawImage(src, 0, 0)
  return c
}

export function blankCanvas(w:number,h:number, fill?:string): HTMLCanvasElement {
  const c = document.createElement('canvas'); c.width=w; c.height=h
  const ctx = c.getContext('2d')!
  if (fill){ ctx.fillStyle = fill; ctx.fillRect(0,0,w,h) } else { ctx.clearRect(0,0,w,h) }
  return c
}

export default cloneCanvas;
