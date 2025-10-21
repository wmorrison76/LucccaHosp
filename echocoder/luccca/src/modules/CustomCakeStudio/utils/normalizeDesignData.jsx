export function normalizeDesignData(d = {}) {
  return {
    // scalars
    base: d.base ?? "vanilla",
    frosting: d.frosting ?? "buttercream",
    tiers: d.tiers ?? 1,
    diameter: d.diameter ?? 8, // inches
    height: d.height ?? 4,     // inches
    color: d.color ?? "#f7e1d7",
    notes: d.notes ?? "",

    // arrays
    fillings: d.fillings ?? [],
    decorations: d.decorations ?? [],
    supports: d.supports ?? [],

    // preserve anything else
    ...d,
  };
}

export default normalizeDesignData;
