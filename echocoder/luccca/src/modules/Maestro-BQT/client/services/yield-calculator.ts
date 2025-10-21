export type PrepKey = string;

export interface YieldPrep {
  name: string;
  yieldPercent: number; // finished weight / raw weight
  densityLbPerGallon?: number; // for volume conversions when finished is volumetric
}

export interface YieldItem {
  id: string;
  name: string;
  preps: Record<PrepKey, YieldPrep>;
}

export interface YieldCatalog {
  [id: string]: YieldItem;
}

// Baseline catalog. Extendable at runtime by merging user data.
export const BASE_YIELD_CATALOG: YieldCatalog = {
  cabbage: {
    id: 'cabbage',
    name: 'Cabbage, Green',
    preps: {
      shaved_1_8: { name: 'Shaved 1/8"', yieldPercent: 0.86, densityLbPerGallon: 2.2 },
      shaved_1_4: { name: 'Shaved 1/4"', yieldPercent: 0.84, densityLbPerGallon: 2.0 },
      diced_small: { name: 'Diced Small', yieldPercent: 0.82, densityLbPerGallon: 2.1 },
    }
  },
  carrot: {
    id: 'carrot',
    name: 'Carrot',
    preps: {
      peeled: { name: 'Peeled', yieldPercent: 0.88, densityLbPerGallon: 6.0 },
      julienne: { name: 'Julienne', yieldPercent: 0.85, densityLbPerGallon: 5.0 },
      shredded: { name: 'Shredded', yieldPercent: 0.84, densityLbPerGallon: 3.8 },
    }
  },
  onion: {
    id: 'onion',
    name: 'Onion, Yellow',
    preps: {
      peeled: { name: 'Peeled', yieldPercent: 0.9, densityLbPerGallon: 6.5 },
      diced_small: { name: 'Diced Small', yieldPercent: 0.88, densityLbPerGallon: 5.5 },
      sliced: { name: 'Sliced', yieldPercent: 0.9, densityLbPerGallon: 4.8 },
    }
  },
  pineapple: {
    id: 'pineapple',
    name: 'Pineapple',
    preps: {
      cleaned: { name: 'Cleaned', yieldPercent: 0.55 },
      spears: { name: 'Spears', yieldPercent: 0.53 },
      diced: { name: 'Diced', yieldPercent: 0.52 },
    }
  },
  watermelon: {
    id: 'watermelon',
    name: 'Watermelon',
    preps: {
      cleaned: { name: 'Cleaned', yieldPercent: 0.5 },
      cubes: { name: 'Cubes', yieldPercent: 0.5 },
    }
  },
  apple: {
    id: 'apple',
    name: 'Apple',
    preps: {
      peeled_cored: { name: 'Peeled & Cored', yieldPercent: 0.82 },
      slices: { name: 'Sliced', yieldPercent: 0.8 },
      diced: { name: 'Diced', yieldPercent: 0.79 },
    }
  }
};

export type QtyUnit = 'lb' | 'kg' | 'oz' | 'g' | 'gallon' | 'gal' | 'qt' | 'liter' | 'l' | 'each';

export interface YieldCalcInput {
  itemId: string; // from catalog
  prepKey: PrepKey;
  finishedQty: number;
  finishedUnit: QtyUnit; // weight or volume
}

export interface YieldCalcResult {
  finishedWeightLb: number;
  rawWeightLb: number;
  rawQtyByUnit: { unit: 'lb' | 'kg'; qty: number };
}

function toLb(qty: number, unit: QtyUnit, densityLbPerGallon?: number): number {
  switch (unit) {
    case 'lb': return qty;
    case 'kg': return qty * 2.20462;
    case 'oz': return qty / 16;
    case 'g': return qty * 0.00220462;
    case 'gallon':
    case 'gal': return (densityLbPerGallon || 8.0) * qty;
    case 'qt': return (densityLbPerGallon || 8.0) * (qty / 4);
    case 'liter':
    case 'l': return (densityLbPerGallon || 8.0) * (qty * 0.264172);
    case 'each': return qty; // fallback
    default: return qty;
  }
}

export function calculateRawFromFinished(catalog: YieldCatalog, input: YieldCalcInput): YieldCalcResult {
  const item = catalog[input.itemId];
  if (!item) throw new Error('Yield item not found');
  const prep = item.preps[input.prepKey];
  if (!prep) throw new Error('Yield prep not found');

  const finishedWeightLb = toLb(input.finishedQty, input.finishedUnit, prep.densityLbPerGallon);
  const rawWeightLb = finishedWeightLb / Math.max(0.01, prep.yieldPercent);
  return {
    finishedWeightLb,
    rawWeightLb,
    rawQtyByUnit: { unit: 'kg', qty: Number((rawWeightLb / 2.20462).toFixed(2)) }
  };
}

export function mergeYieldCatalog(base: YieldCatalog, extra?: YieldCatalog): YieldCatalog {
  if (!extra) return base;
  const out: YieldCatalog = { ...base };
  for (const [id, item] of Object.entries(extra)) {
    const existing = out[id];
    if (!existing) { out[id] = item; continue; }
    out[id] = { ...existing, preps: { ...existing.preps, ...item.preps } };
  }
  return out;
}

export default BASE_YIELD_CATALOG;
