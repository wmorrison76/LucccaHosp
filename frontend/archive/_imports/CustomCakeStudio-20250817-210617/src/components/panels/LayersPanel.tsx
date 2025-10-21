
import React, { useState } from 'react'
import { useStudioStore } from '@/engine/store/useStudioStore'

export function LayersPanel(){
  const layers = useStudioStore(s=>s.project.layers)
  const active = useStudioStore(s=>s.activeLayerId)
  const setActive = useStudioStore(s=>s.setActiveLayer)
  const toggle = useStudioStore(s=>s.toggleLayerVisibility)
  const rename = useStudioStore(s=>s.renameLayer)

  return (
    <div className="p-2 text-sm space-y-2">
      <button
        onClick={()=>useStudioStore.getState().addRasterLayer('Raster Layer')}
        className="px-2 py-1 bg-gray-800 rounded hover:bg-gray-700 text-xs">+ Raster Layer</button>
      <ul className="space-y-1">
        {layers.map(l => (
          <li key={l.id} className={`flex items-center gap-2 px-2 py-1 rounded ${active===l.id?'bg-gray-800':'hover:bg-gray-800'}`}>
            <button onClick={()=>toggle(l.id)} className="text-xs w-6">{l.visible? '👁' : '🚫'}</button>
            <button onClick={()=>setActive(l.id)} className="flex-1 text-left">
              {l.name}
            </button>
            <button onClick={()=>{
              const n = prompt('Rename layer', l.name); if (n) rename(l.id,n)
            }} className="text-xs">✏️</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
