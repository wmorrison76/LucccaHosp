
import React, { useState } from 'react'
import { LayersPanel } from '@/components/panels/LayersPanel'
import { HistoryPanel } from '@/components/panels/HistoryPanel'
import { PropertiesPanel } from '@/components/panels/PropertiesPanel'

export function RightPanels(){
  const [tab, setTab] = useState<'layers'|'history'|'props'>('layers')
  return (
    <div className="w-80 bg-gray-900 border-l border-gray-800 flex flex-col">
      <div className="h-10 flex">
        {(['layers','history','props'] as const).map(t => (
          <button key={t} onClick={()=>setTab(t)}
            className={`flex-1 text-xs ${tab===t?'bg-gray-800':'bg-gray-900 hover:bg-gray-800'}`}>
            {t.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-auto">
        {tab==='layers' && <LayersPanel/>}
        {tab==='history' && <HistoryPanel/>}
        {tab==='props' && <PropertiesPanel/>}
      </div>
    </div>
  )
}
