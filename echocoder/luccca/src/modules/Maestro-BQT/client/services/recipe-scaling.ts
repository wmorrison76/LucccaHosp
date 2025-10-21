import type { BEODocument, RecipeIngredient } from "../types/beo";

export interface ScaledIngredient extends RecipeIngredient {
  scaledAmount: number;
}

export interface ScaledMenuItem {
  menuItemId: string;
  recipeId: string;
  multiplier: number;
  ingredients: ScaledIngredient[];
}

export interface PrepScheduleResult {
  date: string; // YYYY-MM-DD
  items: {
    menuItemId: string;
    recipeId: string;
    targetQuantity: number;
    estimatedTimeMinutes: number;
  }[];
}

export interface BEOComputation {
  scaled: ScaledMenuItem[];
  prepSchedules: PrepScheduleResult[];
}

const addDays = (date: string, days: number) => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

export function scaleBEORecipes(beo: BEODocument): BEOComputation {
  const guests = beo.event.guaranteed || beo.event.expected || 0;
  const scaled: ScaledMenuItem[] = [];

  for (const item of beo.menu.items || []) {
    const r = item.recipe;
    if (!r || !r.ingredients || !Array.isArray(r.ingredients) || !r.yield || r.yield <= 0) continue;
    const servingsPerBatch = r.yield;
    const multiplier = Math.ceil(guests / servingsPerBatch);
    const ingredients: ScaledIngredient[] = r.ingredients.map((ing) => ({
      ...ing,
      scaledAmount: Number((ing.amount * multiplier).toFixed(4)),
    }));
    scaled.push({ menuItemId: item.id, recipeId: r.id, multiplier, ingredients });
  }

  // Build a naive prep schedule based on recipe.prepDaysAdvance
  const byDate: Record<string, PrepScheduleResult> = {};
  for (const item of beo.menu.items || []) {
    const r = item.recipe;
    if (!r || !r.id) continue;
    const dayOffset = -(r.prepDaysAdvance ?? 0); // negative means before the event
    const prepDay = addDays(beo.event.date, dayOffset);
    const est = (r.prepTimeMinutes ?? 30) + (r.cookTimeMinutes ?? 0);
    const target = Math.max(1, Math.ceil((beo.event.guaranteed || 0) / Math.max(1, r.yield || 1)));
    if (!byDate[prepDay]) byDate[prepDay] = { date: prepDay, items: [] };
    byDate[prepDay].items.push({ menuItemId: item.id, recipeId: r.id, targetQuantity: target, estimatedTimeMinutes: est });
  }

  const prepSchedules = Object.values(byDate).sort((a, b) => a.date.localeCompare(b.date));
  return { scaled, prepSchedules };
}

export default scaleBEORecipes;
