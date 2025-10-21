export function normalizeDesignData(d = {}) {
  return {
    // scalars
    base: d?.base ?? "",
    frosting: d?.frosting ?? "",
    icingTexture: d?.icingTexture ?? "",
    notes: d?.notes ?? "",

    // arrays
    fillings: d?.fillings ?? [],
    tiers: d?.tiers ?? [],
    supports: d?.supports ?? [],
    decorations: d?.decorations ?? [],

    // keep anything else
    ...d,
  };
}
