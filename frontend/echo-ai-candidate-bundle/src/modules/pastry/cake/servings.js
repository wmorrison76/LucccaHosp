// src/modules/pastry/cake/utils/servings.js
// 🍰 Standardized bakery math: servings, tier suggestions, and time plans

// Servings per tier assume a "standard cake height" of ~4" (torted)
// Numbers are industry-ish averages (tight party slices); adjust to your shop.
const SERVINGS_ROUND = {
  4:  8,  5: 10, 6: 12, 7: 16, 8: 20,
  9:  24, 10: 28, 11: 36, 12: 40,
  14: 58, 16: 72,
};
const SERVINGS_SQUARE = {
  4:  12, 5: 18, 6:  24, 7:  30, 8:  40,
  9:  50, 10: 60, 11: 75, 12: 90,
  14: 116, 16: 145,
};
// Simple sheet-portion counts (single-tier slabs, 2" tall per sheet half, double for 4")
const SERVINGS_SHEET = { quarter: 24, half: 54, full: 108 };

export const STANDARD_TIER_HEIGHT_IN = 4;

/** scale servings for non-standard tier heights (linear by height) */
export function scaleServings(base, heightIn = STANDARD_TIER_HEIGHT_IN) {
  return Math.round(base * (heightIn / STANDARD_TIER_HEIGHT_IN));
}

/** return servings for a single tier */
export function servingsForTier({ shape = "round", size, heightIn = STANDARD_TIER_HEIGHT_IN }) {
  if (shape === "square") return scaleServings(SERVINGS_SQUARE[size] || 0, heightIn);
  if (shape === "sheet")  return scaleServings(SERVINGS_SHEET[size] || 0, heightIn);
  return scaleServings(SERVINGS_ROUND[size] || 0, heightIn);
}

/** suggest up to N tiers that meet or exceed target guests with minimal excess */
export function suggestTiers({ guests, shape = "round", maxTiers = 4, minGap = 2 }) {
  const pool = Object.keys(shape === "square" ? SERVINGS_SQUARE : SERVINGS_ROUND)
    .map((n) => Number(n))
    .sort((a,b) => a - b);

  // brute-force combos up to maxTiers, respecting min size gaps so tiers step down nicely
  let best = null;
  function search(startIdx, current, used) {
    const total = current.reduce((sum, t) => sum + servingsForTier(t), 0);
    if (total >= guests) {
      if (!best || (total < best.total)) best = { tiers: [...current], total };
      return;
    }
    if (current.length >= maxTiers) return;

    for (let i = startIdx; i < pool.length; i++) {
      const size = pool[i];
      if (current.length > 0) {
        const last = current[current.length - 1].size;
        if (last - size < minGap) continue; // keep a visible “step”
      }
      current.push({ shape, size, heightIn: STANDARD_TIER_HEIGHT_IN });
      search(i - 1, current, used);
      current.pop();
    }
  }
  // Start from largest sizes downward to meet big parties
  search(pool.length - 1, [], new Set());
  return best ? best.tiers : [];
}

/** explode a single cake 'layer' into torted sublayers */
export function expandTorted(layer) {
  const { type, heightIn = 1, torte = 1 } = layer; // torte=1 means no split
  if (type !== "cake" || torte <= 1) return [ { ...layer } ];
  const slabH = heightIn / torte;
  const parts = [];
  for (let i = 0; i < torte; i++) {
    parts.push({ ...layer, part: i + 1, heightIn: slabH });
    if (i < torte - 1) {
      // implicit filling/icing seam between torted slabs (visual only)
      parts.push({ type: "filling-internal", heightIn: 0.1, flavor: layer.fillingBetween || "buttercream" });
    }
  }
  return parts;
}

/** naive time planner; scale by total area & layers */
export function estimateTimePlan({ tiers = [] }) {
  // pan area for rounds; squares approximated by pi*(d/2)^2 with d sized to match servings
  const areaFor = (shape, size) => {
    if (shape === "square") return size * size;
    if (shape === "sheet")  return size === "full" ? 18*26 : size === "half" ? 13*18 : 9*13;
    // round
    return Math.PI * Math.pow(size/2, 2);
  };
  const totalArea = tiers.reduce((a, t) => a + areaFor(t.shape, t.size), 0);
  const areaFactor = Math.max(1, totalArea / (Math.PI * Math.pow(8, 2))); // normalized to a 8" round

  const bake   = Math.round(35 * areaFactor);  // minutes
  const cool   = Math.round(60 * areaFactor);
  const torte  = Math.round(10 * tiers.length);
  const fill   = Math.round(8  * tiers.length);
  const crumb  = Math.round(12 * tiers.length);
  const ice    = Math.round(18 * tiers.length);
  const decor  = Math.round(20 + 12 * tiers.length);
  return { bake, cool, torte, fill, crumb, ice, decor, total: bake+cool+torte+fill+crumb+ice+decor };
}
