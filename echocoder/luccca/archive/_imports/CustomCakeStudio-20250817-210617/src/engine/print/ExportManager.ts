
export async function exportPNG(stage: any, pixelRatio = 1) {
  // stage is a Konva Stage; keep alpha for transparent background
  return stage.toDataURL({ pixelRatio })
}
