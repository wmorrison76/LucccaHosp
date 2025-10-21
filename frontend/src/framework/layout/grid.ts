export interface Rect { x:number; y:number; w:number; h:number; }
export function intersects(a:Rect,b:Rect){ return !(a.x + a.w < b.x || b.x + b.w < a.x || a.y + a.h < b.y || b.y + b.h < a.y); }
export function centerlines(r:Rect){ return { cx: r.x + r.w/2, cy: r.y + r.h/2 }; }
