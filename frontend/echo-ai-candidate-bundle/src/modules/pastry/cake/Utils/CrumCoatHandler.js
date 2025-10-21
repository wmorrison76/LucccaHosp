// src/modules/pastry/cake/utils/CrumbCoatHandler.js

export const ensureCrumbCoatLayer = (layers) => {
  const hasCrumbCoat = layers.some(
    (layer) => layer.type === "crumb_coat" || layer.notes?.toLowerCase().includes("crumb coat")
  );

  if (hasCrumbCoat) return layers;

  // Auto-insert crumb coat at bottom if not present
  const crumbLayer = {
    id: Date.now() + "-crumb",
    type: "crumb_coat",
    flavor: "Neutral",
    notes: "Base crumb coat to seal layers before final finish",
    decoration: "",
  };

  return [crumbLayer, ...layers];
};
