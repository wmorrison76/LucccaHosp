
import React, { useEffect, useRef } from 'react'
import { Stage, Layer, Image as KImage, Rect } from 'react-konva'
import Konva from 'konva'
import { useStudioStore } from '@/engine/store/useStudioStore'

export function StageCanvas(){
  const ref = useRef<Konva.Stage>(null)
  const project = useStudioStore(s=>s.project)

  // Ensure at least one layer exists
  useEffect(()=>{
    if (project.layers.length === 0){
      useStudioStore.getState().addRasterLayer('Base')
    }
  }, [project.layers.length])

  return (
    <div className="flex-1 overflow-auto bg-gray-950 flex items-center justify-center">
      <div className="bg-checker p-6">
        <Stage
          ref={ref}
          width={project.canvas.width}
          height={project.canvas.height}
          className="shadow-2xl ring-1 ring-gray-800 bg-transparent">
          {/* Artboard background (transparent look) */}
          <Layer listening={false}>
            <Rect x={0} y={0} width={project.canvas.width} height={project.canvas.height} fillEnabled={false} />
          </Layer>

          {/* Draw layers (placeholder) */}
          <Layer>
            {/* TODO: raster/vector/text drawing dispatch */}
          </Layer>
        </Stage>
      </div>
    </div>
  )
}
