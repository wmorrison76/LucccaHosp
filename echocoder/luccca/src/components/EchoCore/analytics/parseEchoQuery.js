// File: src/components/EchoCore/analytics/parseEchoQuery.js
// Purpose: Parses natural language into analytic structures with deep contextual mapping to support LUCCCA's forecasting engine

import coreAnalytics from "./coreAnalytics";
import {
  getWeather,
  getHoliday,
  getMoonPhase,
  getOccupancy,
  getBanquetEvents,
  getRoomRates,
  getPOSData,
  getHistoricalSales,
  getMenuMap,
} from "@/lib/dataSources"; // Ensure these endpoints exist or stub during build

// Natural Language Query Parser
export function parseEchoQuery(nlQuery = "") {
  const lower = nlQuery.toLowerCase();

  const itemMatch = lower.match(/how many ([a-zA-Z\s]+)/i);
  const targetItem = itemMatch?.[1]?.trim() || "item";

  const flags = {
    isBanquet: /banquet|event/.test(lower),
    isGuest: /guest|occupancy|transient/.test(lower),
    isRain: /rain|storm/.test(lower),
    isHoliday: /holiday/.test(lower),
    isMoonPhase: /full moon|new moon|waxing|waning/.test(lower),
    isDayOfWeek: /(monday|tuesday|wednesday|thursday|friday|saturday|sunday)/.test(lower),
    isDate: /\b\d{4}-\d{2}-\d{2}\b/.test(lower),
    isRepeatPattern: /last year|same date|previous years/.test(lower),
    isHighRateGuest: /suite|high rate|premium room/.test(lower),
  };

  return {
    targetItem,
    flags,
    rawQuery: nlQuery,
  };
}

// Deep Forecast Routing Engine
export async function handleForecastQuery(nlQuery) {
  const { targetItem, flags } = parseEchoQuery(nlQuery);

  const [
    weather,
    holidays,
    moonPhase,
    occupancy,
    events,
    rates,
    pos,
    history,
    menuMap,
  ] = await Promise.all([
    getWeather(),
    getHoliday(),
    getMoonPhase(),
    getOccupancy(),
    getBanquetEvents(),
    getRoomRates(),
    getPOSData(),
    getHistoricalSales(),
    getMenuMap(),
  ]);

  const filtered = pos.filter(entry => {
    const matchItem = entry.name?.toLowerCase().includes(targetItem);
    const matchBanquet = !flags.isBanquet || entry.context === "banquet";
    const matchGuest = !flags.isGuest || entry.context === "guest";
    const matchRain = !flags.isRain || entry.weather === "rain";
    const matchHoliday = !flags.isHoliday || holidays.includes(entry.date);
    const matchMoon = !flags.isMoonPhase || moonPhase[entry.date] === "full";
    const matchRate = !flags.isHighRateGuest || rates[entry.guestId] > 1000;
    return matchItem && matchBanquet && matchGuest && matchRain && matchHoliday && matchMoon && matchRate;
  });

  // Cross-link dish substitutions (chicken → chicken variants)
  const correlated = filtered.map(entry => {
    const base = menuMap[entry.name] || entry.name;
    return { ...entry, baseItem: base };
  });

  const forecast = coreAnalytics.forecastAdapter(correlated, "qty");
  const trend = coreAnalytics.detectTrends(forecast, "forecast");
  const summary = coreAnalytics.groupByDate(forecast);

  return {
    forecast,
    trend,
    summary,
    insights: {
      targetItem,
      query: nlQuery,
      guestInfluence: occupancy.overall,
      moonPhase: moonPhase.today,
      eventImpact: events.length,
      historicalMean: history[targetItem]?.avg || 0,
    },
  };
}

export default {
  parseEchoQuery,
  handleForecastQuery,
};
