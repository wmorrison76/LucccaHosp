
import React from 'react'
import { useStudioStore } from '@/engine/store/useStudioStore'

const tools: { id:any; label:string; key:string }[] = [
  { id:'move', label:'Move', key:'V' },
  { id:'marquee', label:'Marquee', key:'M' },
  { id:'lasso', label:'Lasso', key:'L' },
  { id:'wand', label:'Wand', key:'W' },
  { id:'quick', label:'Quick', key:'A' },
  { id:'brush', label:'Brush', key:'B' },
  { id:'eraser', label:'Eraser', key:'E' },
  { id:'shape', label:'Shape', key:'U' },
  { id:'text', label:'Text', key:'T' },
  { id:'eyedropper', label:'Eyedropper', key:'I' },
  { id:'hand', label:'Hand', key:'H' },
  { id:'zoom', label:'Zoom', key:'Z' },
]

export function LeftToolbar(){
  const activeTool = useStudioStore(s=>s.activeTool)
  const setTool = useStudioStore(s=>s.setTool)

  return (
    <div className="w-12 bg-gray-900 border-r border-gray-800 flex flex-col items-center py-2 gap-2">
      {tools.map(t => (
        <button key={t.id}
          onClick={()=>setTool(t.id)}
          className={`w-9 h-9 rounded-md text-[10px] flex items-center justify-center
           ${activeTool===t.id ? 'bg-gray-700' : 'bg-gray-800 hover:bg-gray-700'} `}
          title={`${t.label} (${t.key})`}>
          {t.key}
        </button>
      ))}
    </div>
  )
}
