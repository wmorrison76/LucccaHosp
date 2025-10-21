import { refineClient } from './refineClient'

export async function maskFromSelection(width:number, height:number, polys: Array<Array<{x:number;y:number}>>, feather:number, expand:number): Promise<HTMLCanvasElement> {
  // Uses the workerized refine client from Performance v1
  return await refineClient.refine(width, height, polys, feather, expand)
}
