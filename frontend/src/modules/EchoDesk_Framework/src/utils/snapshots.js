export function findCanvas(){
  return document.querySelector(".excalidraw canvas, #root canvas, canvas");
}
export function takeSnapshot(){
  const c=findCanvas(); if(!c) throw new Error("Canvas not found");
  return c.toDataURL("image/png");
}
const KEY="ed_snapshots";
export function listSnapshots(){
  try{ return JSON.parse(localStorage.getItem(KEY)||"[]"); }catch{ return []; }
}
export function saveSnapshot(dataUrl){
  const items=listSnapshots();
  items.unshift({id:crypto.randomUUID(), ts:Date.now(), dataUrl});
  localStorage.setItem(KEY,JSON.stringify(items.slice(0,200))); // keep last 200
}
export function removeSnapshot(id){
  const items=listSnapshots().filter(x=>x.id!==id);
  localStorage.setItem(KEY,JSON.stringify(items));
}

export default findCanvas;
