
import React from 'react'

export function TopBar(){
  return (
    <div className="h-10 flex items-center justify-between px-3 bg-gray-900 border-b border-gray-800">
      <div className="text-xs opacity-80">File  Edit  Image  Layer  Select  Filter  View  Window  Help</div>
      <div className="text-xs opacity-60">Options appear here</div>
    </div>
  )
}
