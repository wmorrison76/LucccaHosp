// Utility for calculating totals (costs, hours, etc.)
export function calcTotals(items, key) {
  if (!Array.isArray(items) || !key) return 0;
  return items.reduce((acc, item) => {
    const value = parseFloat(item[key]);
    return acc + (isNaN(value) ? 0 : value);
  }, 0);
}
