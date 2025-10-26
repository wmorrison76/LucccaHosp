const STANDARD_COOLING_TIME_PER_LAYER = 30;
const CAKE_SIZE_REFERENCE = {
  6: {
    servings: 6,
    roundDiameter: 6,
    squareDimension: 4,
    sheetDimension: { width: 0, height: 0 },
    // N/A
    layerDepth: 2,
    bakedWeight: 12
  },
  12: {
    servings: 12,
    roundDiameter: 8,
    squareDimension: 6,
    sheetDimension: { width: 0, height: 0 },
    // N/A
    layerDepth: 2,
    bakedWeight: 24
  },
  24: {
    servings: 24,
    roundDiameter: 10,
    squareDimension: 8,
    sheetDimension: { width: 13, height: 9 },
    // Quarter sheet
    layerDepth: 2,
    bakedWeight: 48
  },
  50: {
    servings: 50,
    roundDiameter: 12,
    squareDimension: 10,
    sheetDimension: { width: 18, height: 13 },
    // Half sheet
    layerDepth: 2,
    bakedWeight: 96
  },
  100: {
    servings: 100,
    roundDiameter: 14,
    squareDimension: 12,
    sheetDimension: { width: 26, height: 18 },
    // Full sheet
    layerDepth: 2,
    bakedWeight: 192
  }
};
function calculateCakeDimensions(guestCount, shape) {
  const sizes = Object.keys(CAKE_SIZE_REFERENCE).map(Number).sort((a, b) => a - b);
  let closestSize = sizes[0];
  for (const size of sizes) {
    if (size >= guestCount) {
      closestSize = size;
      break;
    }
  }
  if (guestCount > sizes[sizes.length - 1]) {
    closestSize = sizes[sizes.length - 1];
  }
  const reference = CAKE_SIZE_REFERENCE[closestSize];
  switch (shape) {
    case "round":
      return { diameter: reference.roundDiameter };
    case "square":
      return { squareSide: reference.squareDimension };
    case "quarter_sheet":
      return { sheetDimensions: { width: 13, height: 9 } };
    case "half_sheet":
      return { sheetDimensions: { width: 18, height: 13 } };
    case "full_sheet":
      return { sheetDimensions: { width: 26, height: 18 } };
    default:
      return { diameter: reference.roundDiameter };
  }
}
function calculateLayerCount(guestCount) {
  if (guestCount <= 15) return 2;
  if (guestCount <= 30) return 2;
  if (guestCount <= 50) return 3;
  if (guestCount <= 100) return 4;
  return Math.ceil(guestCount / 25);
}
function calculateSupportsNeeded(diameterInches, layerCount) {
  return layerCount > 4 || diameterInches > 10 && layerCount > 2 || diameterInches >= 6 && layerCount >= 3;
}
function estimateBakingTime(diameterOrSize, layerCount) {
  const baseTime = 35;
  const sizeMultiplier = 1 + (diameterOrSize - 8) * 0.05;
  const layerMultiplier = 1 + (layerCount - 1) * 0.1;
  return Math.round(baseTime * sizeMultiplier * layerMultiplier);
}
function estimateCoolingTime(layerCount) {
  return layerCount * STANDARD_COOLING_TIME_PER_LAYER + 20;
}
function estimatePreparationTime(layerCount, isComplexDecoration = false) {
  const baseTime = layerCount * 15 + 15 + 30;
  const decorationTime = isComplexDecoration ? 45 : 15;
  return baseTime + decorationTime;
}
function calculateCakeSpecs(guestCount, cakeShape, isComplexDecoration = false) {
  const dimensions = calculateCakeDimensions(guestCount, cakeShape);
  const cakeDiameter = dimensions.diameter || dimensions.squareSide || 12;
  const layerCount = calculateLayerCount(guestCount);
  const supportsNeeded = calculateSupportsNeeded(cakeDiameter, layerCount);
  const bakingTimeMinutes = estimateBakingTime(cakeDiameter, 1);
  const coolingTimeMinutes = estimateCoolingTime(layerCount);
  const preparationTimeMinutes = estimatePreparationTime(layerCount, isComplexDecoration);
  const totalProductionTimeMinutes = bakingTimeMinutes * layerCount + coolingTimeMinutes + preparationTimeMinutes;
  return {
    cakeDiameter,
    cakeLayers: layerCount,
    supportColumnsNeeded: supportsNeeded,
    estimatedWeight: cakeDiameter * layerCount * 6,
    // rough estimate: ~6 oz per inch per layer
    estimatedServings: guestCount,
    bakingTimeMinutes,
    coolingTimeMinutes,
    preparationTimeMinutes,
    totalProductionTimeMinutes
  };
}
export {
  calculateCakeSpecs as c
};
