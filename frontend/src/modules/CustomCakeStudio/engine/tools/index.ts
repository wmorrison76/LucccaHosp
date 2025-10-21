import { MoveTool } from './MoveTool'
import { HandTool } from './HandTool'
import { BrushTool } from './BrushTool'
import { EraserTool } from './EraserTool'
import { TextTool } from './TextTool'
import { EyedropperTool } from './EyedropperTool'
import { MarqueeTool } from './MarqueeTool'
import { LassoTool } from './LassoTool'
import { MagicWandTool } from './MagicWandTool'
import { QuickSelectTool } from './QuickSelectTool'
import { PaintBucketTool } from './PaintBucketTool'
import { GradientTool } from './GradientTool'
import { CloneStampTool } from './CloneStampTool'
import { SpotHealingTool } from './SpotHealingTool'
import { MaskBrushTool } from './MaskBrushTool'
import { ZoomTool } from './ZoomTool'
import { CropTool } from './CropTool'
import { PatchTool } from './PatchTool'
import { ShapeTool } from './ShapeTool'
import { PenTool } from './PenTool'
import type { Tool } from './Tool'

export function getTool(id: string): Tool | null {
  switch(id){
    case 'move': return new MoveTool()
    case 'hand': return new HandTool()
    case 'brush': return new BrushTool()
    case 'eraser': return new EraserTool()
    case 'text': return new TextTool()
    case 'eyedropper': return new EyedropperTool()
    case 'marquee': return new MarqueeTool()
    case 'lasso': return new LassoTool()
    case 'wand': return new MagicWandTool()
    case 'quick': return new QuickSelectTool()
    case 'bucket': return new PaintBucketTool()
    case 'gradient': return new GradientTool()
    case 'clone': return new CloneStampTool()
    case 'spothealing': return new SpotHealingTool()
    case 'maskbrush': return new MaskBrushTool()
    case 'zoom': return new ZoomTool()
    case 'crop': return new CropTool()
    case 'patch': return new PatchTool()
    case 'shape': return new ShapeTool()
    case 'pen': return new PenTool()
    default: return null
  }
}

export default getTool;
