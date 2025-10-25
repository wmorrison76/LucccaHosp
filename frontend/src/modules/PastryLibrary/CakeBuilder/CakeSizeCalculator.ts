/**
 * LUCCCA | Cake Size Calculator
 * Professional pastry math for cake sizing based on guest count and shape
 */

import { CakeShape, CakeSizeReference, CakeCalculation } from './types';

/**
 * Standard pastry industry measurements
 * Sources: Wilton cake sizing guidelines, professional pastry standards
 */
const SERVINGS_PER_SLICE = 1; // 1 guest = 1 slice
const SLICE_SIZE_INCHES = 1.5; // Standard slice width on cake circumference
const LAYER_DEPTH_INCHES = 2; // Standard baked layer thickness
const STANDARD_BAKING_TEMP = 350; // Fahrenheit
const STANDARD_COOLING_TIME_PER_LAYER = 30; // minutes (per cake)

/**
 * Standard cake dimensions for different serving counts
 * Based on: 1 guest = 1 slice, slice ≈ 1.5" arc length
 */
const CAKE_SIZE_REFERENCE: Record<number, CakeSizeReference> = {
  6: {
    servings: 6,
    roundDiameter: 6,
    squareDimension: 4,
    sheetDimension: { width: 0, height: 0 }, // N/A
    layerDepth: 2,
    bakedWeight: 12,
  },
  12: {
    servings: 12,
    roundDiameter: 8,
    squareDimension: 6,
    sheetDimension: { width: 0, height: 0 }, // N/A
    layerDepth: 2,
    bakedWeight: 24,
  },
  24: {
    servings: 24,
    roundDiameter: 10,
    squareDimension: 8,
    sheetDimension: { width: 13, height: 9 }, // Quarter sheet
    layerDepth: 2,
    bakedWeight: 48,
  },
  50: {
    servings: 50,
    roundDiameter: 12,
    squareDimension: 10,
    sheetDimension: { width: 18, height: 13 }, // Half sheet
    layerDepth: 2,
    bakedWeight: 96,
  },
  100: {
    servings: 100,
    roundDiameter: 14,
    squareDimension: 12,
    sheetDimension: { width: 26, height: 18 }, // Full sheet
    layerDepth: 2,
    bakedWeight: 192,
  },
};

/**
 * Calculate cake dimensions based on guest count and shape
 */
export function calculateCakeDimensions(guestCount: number, shape: CakeShape): { diameter?: number; squareSide?: number; sheetDimensions?: { width: number; height: number } } {
  // Find closest size reference
  const sizes = Object.keys(CAKE_SIZE_REFERENCE)
    .map(Number)
    .sort((a, b) => a - b);

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
    case 'round':
      return { diameter: reference.roundDiameter };
    case 'square':
      return { squareSide: reference.squareDimension };
    case 'quarter_sheet':
      return { sheetDimensions: { width: 13, height: 9 } };
    case 'half_sheet':
      return { sheetDimensions: { width: 18, height: 13 } };
    case 'full_sheet':
      return { sheetDimensions: { width: 26, height: 18 } };
    default:
      return { diameter: reference.roundDiameter };
  }
}

/**
 * Calculate number of layers needed
 */
export function calculateLayerCount(guestCount: number): number {
  // Professional rule: 1 layer per 12-15 guests (2-layer minimum)
  if (guestCount <= 15) return 2;
  if (guestCount <= 30) return 2;
  if (guestCount <= 50) return 3;
  if (guestCount <= 100) return 4;
  return Math.ceil(guestCount / 25);
}

/**
 * Determine if structural supports (cake boards/columns) are needed
 */
export function calculateSupportsNeeded(diameterInches: number, layerCount: number): boolean {
  // Supports needed if:
  // - More than 4 layers, OR
  // - Diameter > 10 inches with more than 2 layers, OR
  // - Any stacked cake with more than 6 inches diameter + 3+ layers
  return layerCount > 4 || (diameterInches > 10 && layerCount > 2) || (diameterInches >= 6 && layerCount >= 3);
}

/**
 * Estimate baking time based on cake size
 * Source: Standard oven + cake thermometer methods
 */
export function estimateBakingTime(diameterOrSize: number, layerCount: number): number {
  // Base baking time for standard 2" layer: 30-35 minutes
  const baseTime = 35;

  // Adjust by cake size (larger cakes take slightly longer)
  const sizeMultiplier = 1 + (diameterOrSize - 8) * 0.05;

  // Each additional layer (stacked/taller) adds time
  const layerMultiplier = 1 + (layerCount - 1) * 0.1;

  return Math.round(baseTime * sizeMultiplier * layerMultiplier);
}

/**
 * Estimate cooling time (TOTAL, not per layer)
 * Professional standard: Allow full cooling + handling time
 */
export function estimateCoolingTime(layerCount: number): number {
  // 30 minutes per layer + 20 min handling per cake
  return layerCount * STANDARD_COOLING_TIME_PER_LAYER + 20;
}

/**
 * Estimate prep/assembly time
 */
export function estimatePreparationTime(layerCount: number, isComplexDecoration: boolean = false): number {
  // Base: leveling + filling (15 min per layer) + crumb coat (15 min) + final frost (30 min)
  const baseTime = layerCount * 15 + 15 + 30;

  // Complex decorations add time
  const decorationTime = isComplexDecoration ? 45 : 15;

  return baseTime + decorationTime;
}

/**
 * Main calculation function - returns complete CakeCalculation
 */
export function calculateCakeSpecs(
  guestCount: number,
  cakeShape: CakeShape,
  isComplexDecoration: boolean = false
): CakeCalculation {
  const dimensions = calculateCakeDimensions(guestCount, cakeShape);
  const cakeDiameter = dimensions.diameter || dimensions.squareSide || 12; // fallback
  const layerCount = calculateLayerCount(guestCount);
  const supportsNeeded = calculateSupportsNeeded(cakeDiameter, layerCount);

  const bakingTimeMinutes = estimateBakingTime(cakeDiameter, 1); // per layer
  const coolingTimeMinutes = estimateCoolingTime(layerCount);
  const preparationTimeMinutes = estimatePreparationTime(layerCount, isComplexDecoration);

  // Total production time = (baking + cooling) * layers + prep/assembly + decorating
  const totalProductionTimeMinutes = bakingTimeMinutes * layerCount + coolingTimeMinutes + preparationTimeMinutes;

  return {
    cakeDiameter,
    cakeLayers: layerCount,
    supportColumnsNeeded: supportsNeeded,
    estimatedWeight: cakeDiameter * layerCount * 6, // rough estimate: ~6 oz per inch per layer
    estimatedServings: guestCount,
    bakingTimeMinutes,
    coolingTimeMinutes,
    preparationTimeMinutes,
    totalProductionTimeMinutes,
  };
}

/**
 * Estimate cost (optional - can be expanded with ingredient costs)
 */
export function estimateCakeCost(layerCount: number, complexity: 'simple' | 'moderate' | 'complex'): number {
  const baseCost = 50; // Base cost
  const perLayerCost = 15;
  const complexityMultiplier = { simple: 1, moderate: 1.5, complex: 2.5 }[complexity];

  return (baseCost + layerCount * perLayerCost) * complexityMultiplier;
}
