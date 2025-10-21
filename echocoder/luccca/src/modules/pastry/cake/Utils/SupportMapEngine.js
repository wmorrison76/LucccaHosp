// src/modules/pastry/cake/utils/SupportMapEngine.js

/**
 * generateSupportMap(layers)
 * Quick heuristic for internal supports based on layer stack.
 * Returns an array of items like:
 *   { tier: number, description: string, risk: 'low'|'medium'|'high' }
 */
export function generateSupportMap(layers = []) {
  const cakeLayers = layers.filter(l => l.type === "cake").length;
  const supportLayers = layers.filter(l => l.type === "support").length;

  // Simple rule-of-thumb:
  // - >=3 cake layers without supports -> high risk
  // - >=3 cake layers with some supports -> medium
  // - else low
  let risk = "low";
  if (cakeLayers >= 3 && supportLayers === 0) risk = "high";
  else if (cakeLayers >= 3) risk = "medium";

  return [
    {
      tier: 1,
      description:
        supportLayers > 0
          ? `Detected ${supportLayers} internal support${supportLayers > 1 ? "s" : ""}.`
          : "No internal supports detected.",
      risk,
    },
  ];
}

export default generateSupportMap;
