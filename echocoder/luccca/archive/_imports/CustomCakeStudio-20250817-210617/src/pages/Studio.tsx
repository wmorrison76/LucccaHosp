
import React from 'react'
import { TopBar } from '@/components/layout/TopBar'
import { LeftToolbar } from '@/components/layout/LeftToolbar'
import { RightPanels } from '@/components/layout/RightPanels'
import { StageCanvas } from '@/components/canvas/StageCanvas'

export function Studio(){
  return (
    <div className="w-screen h-screen flex flex-col">
      <TopBar/>
      <div className="flex flex-1">
        <LeftToolbar/>
        <StageCanvas/>
        <RightPanels/>
      </div>
    </div>
  )
}
