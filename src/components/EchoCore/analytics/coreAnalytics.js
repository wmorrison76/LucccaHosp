// File: src/components/EchoCore/analytics/coreAnalytics.js
// Purpose: Core analytics engine with forecasting, trend detection, and summarization utilities for LUCCCA modules

// ---- Forecast Adapter ----
export function forecastAdapter(data = [], key = "value") {
  return data.map((entry, i) => ({
    ...entry,
    forecast: i > 0 ? (entry[key] + data[i - 1][key]) / 2 : entry[key],
  }));
}

// ---- Revenue Summary ----
export function summarizeRevenue(data = []) {
  return data.reduce(
    (acc, entry) => {
      acc.food += entry.food || 0;
      acc.beverage += entry.beverage || 0;
      acc.total += (entry.food || 0) + (entry.beverage || 0);
      return acc;
    },
    { food: 0, beverage: 0, total: 0 }
  );
}

// ---- Labor Cost Summary ----
export function summarizeLabor(data = []) {
  return data.reduce(
    (acc, entry) => {
      acc.hours += entry.hours || 0;
      acc.cost += entry.cost || 0;
      return acc;
    },
    { hours: 0, cost: 0 }
  );
}

// ---- Daily Breakdown ----
export function groupByDate(data = [], dateKey = "date") {
  return data.reduce((acc, entry) => {
    const date = entry[dateKey];
    if (!acc[date]) acc[date] = [];
    acc[date].push(entry);
    return acc;
  }, {});
}

// ---- Trend Detection ----
export function detectTrends(data = [], key = "value") {
  const trends = [];
  for (let i = 1; i < data.length; i++) {
    const prev = data[i - 1][key];
    const current = data[i][key];
    trends.push({
      ...data[i],
      trend: current > prev ? "up" : current < prev ? "down" : "flat",
    });
  }
  return trends;
}

// ---- Dynamic Estimator: How many muffins tomorrow? ----
export function estimateDemand({
  historical = [],
  occupancy = 0.75,
  dayOfWeek = "Sunday",
  weather = "Rain",
  item = "muffin"
} = {}) {
  const relevant = historical.filter(entry => {
    return (
      entry.item === item &&
      entry.dayOfWeek === dayOfWeek &&
      (entry.weather === weather || entry.weather === "Any")
    );
  });

  if (relevant.length === 0) return 0;

  const baseAvg = relevant.reduce((acc, e) => acc + e.unitsSold, 0) / relevant.length;

  // Adjust for occupancy
  const multiplier = 0.5 + occupancy; // ranges from 0.5 to 1.5
  return Math.round(baseAvg * multiplier);
}

// ---- Export Default ----
export default {
  forecastAdapter,
  summarizeRevenue,
  summarizeLabor,
  groupByDate,
  detectTrends,
  estimateDemand,
};
