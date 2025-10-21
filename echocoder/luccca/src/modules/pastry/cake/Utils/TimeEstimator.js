// src/modules/pastry/cake/utils/TimeEstimator.js

/**
 * Detailed kitchen timeline estimation for a stacked cake build.
 *
 * Usage:
 *   const breakdown = estimateBuildBreakdown(layers, {
 *     panShape: 'round' | 'square' | 'sheet',
 *     diameterInches: 10,      // for round/square
 *     sheetSize: 'half',       // 'half' | 'full' (only if panShape === 'sheet')
 *     chillBetweenCoats: true, // include chill after crumb coat
 *     ovens: 1,                // number of ovens available
 *     convection: false        // convection bakes ~10% faster
 *   });
 *   // breakdown: { steps: [{key,label,minutes}], totalMinutes }
 *
 *   // For compatibility with existing code:
 *   const { hours, minutes } = estimateBuildTime(layers, opts);
 */

const DEFAULTS = {
  panShape: "round",          // 'round' | 'square' | 'sheet'
  diameterInches: 10,         // for round/square
  sheetSize: "half",          // 'half' | 'full'
  chillBetweenCoats: true,
  ovens: 1,
  convection: false,
};

/** Basic per-cake timing model (minutes) for a ~10" round, ~1" layer */
function basePerCakeLayerMinutes() {
  return {
    recipePrep: 8,      // scale with batches
    bake: 28,           // per layer
    cool: 45,           // per layer
    torte: 6,           // level/cut per layer
    fill: 5,            // filling per cake-to-cake junction
    crumb: 8,           // crude coat pass
    chill: 20,          // optional chill after crumb
    finalIce: 12,       // final smoothing
    decorBasic: 10,     // simple border/piping pass
  };
}

/** Multiplier based on pan geometry/size */
function shapeSizeFactor(opts) {
  const d = Math.max(4, Number(opts.diameterInches || DEFAULTS.diameterInches));
  if (opts.panShape === "sheet") {
    // Roughly map half/full sheet to 1.6x / 2.3x a 10" round layer worth of work
    return opts.sheetSize === "full" ? 2.3 : 1.6;
  }
  // round/square: scale by area vs 10" round
  const area10Round = Math.PI * Math.pow(10 / 2, 2); // ~78.54
  const areaRound = Math.PI * Math.pow(d / 2, 2);
  let factor = areaRound / area10Round; // scale to area
  if (opts.panShape === "square") factor *= 1.10; // edges/corners add time
  return Math.max(0.6, Math.min(factor, 3.0));
}

/** Bake-time adjustment for convection */
function convectionFactor(opts) {
  return opts.convection ? 0.9 : 1.0; // ~10% faster bakes
}

/** Parallelization benefit from multiple ovens (very rough) */
function ovenParallelFactor(opts, cakeLayerCount) {
  const o = Math.max(1, Number(opts.ovens || 1));
  if (o <= 1 || cakeLayerCount <= 1) return 1.0;
  // diminishing returns (not every layer fits at once)
  return 1 / Math.min(o, cakeLayerCount);
}

/**
 * Returns a detailed step breakdown (minutes) considering pan shape/size and options.
 * We treat each entry with type==='cake' as one baked layer.
 * Each 'filling' between cakes adds fill time (but not bake time).
 */
export function estimateBuildBreakdown(layers = [], options = {}) {
  const opts = { ...DEFAULTS, ...options };
  const per = basePerCakeLayerMinutes();
  const sf = shapeSizeFactor(opts);
  const conv = convectionFactor(opts);

  const cakeCount = layers.filter((l) => l.type === "cake").length;
  const fillingCount = layers.filter((l) => l.type === "filling").length;
  const supportCount = layers.filter((l) => l.type === "support").length;

  // Batches: assume one "recipe prep" batch yields ~2 round layers (heuristic)
  const yieldPerBatch = opts.panShape === "sheet" ? 1 : 2;
  const batches = Math.max(1, Math.ceil(cakeCount / yieldPerBatch));

  // Core phases
  const recipePrep = Math.round(per.recipePrep * batches * sf);
  const bake = Math.round(per.bake * cakeCount * sf * conv * ovenParallelFactor(opts, cakeCount));
  const cool = Math.round(per.cool * cakeCount * sf); // cooling still takes time even if parallel bakes
  const torte = Math.round(per.torte * cakeCount * sf);
  const fill = Math.round(per.fill * Math.max(0, Math.min(fillingCount, Math.max(0, cakeCount - 1))) * sf);
  const crumb = Math.round(per.crumb * Math.max(1, cakeCount) * sf);
  const chill = opts.chillBetweenCoats ? Math.round(per.chill * Math.max(1, cakeCount) * sf) : 0;
  const finalIce = Math.round(per.finalIce * Math.max(1, cakeCount) * sf);
  const decorBasic = Math.round(per.decorBasic * Math.max(1, cakeCount) * sf);

  // Supports add small overhead
  const supports = Math.round((supportCount || 0) * 4);

  // Light cleanup / staging buffer (not per layer)
  const staging = 10;

  const steps = [
    { key: "recipePrep", label: "Prepare recipe / mise en place", minutes: recipePrep },
    { key: "bake",       label: "Bake layers",                    minutes: bake },
    { key: "cool",       label: "Cool layers",                    minutes: cool },
    { key: "torte",      label: "Cut / level (torte) layers",     minutes: torte },
    { key: "fill",       label: "Apply filling between layers",   minutes: fill },
    { key: "supports",   label: "Insert supports / dowels",       minutes: supports },
    { key: "crumb",      label: "Crumb coat",                      minutes: crumb },
    { key: "chill",      label: "Chill after crumb coat",         minutes: chill },
    { key: "finalIce",   label: "Final icing / smoothing",        minutes: finalIce },
    { key: "decorBasic", label: "Basic decoration / borders",     minutes: decorBasic },
    { key: "staging",    label: "Staging / cleanup buffer",       minutes: staging },
  ];

  const totalMinutes = steps.reduce((m, s) => m + s.minutes, 0);

  return { steps, totalMinutes };
}

/**
 * Compatibility wrapper used by QA card.
 * Returns { hours, minutes, totalMinutes }
 */
export function estimateBuildTime(layers = [], opts = {}) {
  const { totalMinutes } = estimateBuildBreakdown(layers, opts);
  return {
    hours: Math.floor(totalMinutes / 60),
    minutes: totalMinutes % 60,
    totalMinutes,
  };
}

/** Tiny helper if you want a pretty string for UI */
export function formatHhMm(totalMinutes) {
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return `${h}h ${m}m`;
}

export default estimateBuildBreakdown;
