
import React from 'react'
import { useStudioStore } from '@/engine/store/useStudioStore'

export function PropertiesPanel(){
  const project = useStudioStore(s=>s.project)
  return (
    <div className="p-2 text-xs space-y-2">
      <div>Canvas: {project.canvas.width}×{project.canvas.height} @ {project.canvas.dpi} DPI</div>
      <div>Background: {project.canvas.background}</div>
    </div>
  )
}
