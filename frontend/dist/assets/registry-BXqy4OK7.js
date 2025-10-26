import "./index-DfBvRGLH.js";
const DEFAULT_WIDGETS = [
  /* Sales & Revenue */
  mk(
    "sales-net",
    "Net Sales (Trend)",
    "Sales & Revenue",
    "Real-time and historical net sales. Choose daily/weekly/monthly.",
    "$",
    { base: 48e3 }
  ),
  mk(
    "splh",
    "Sales per Labor Hour",
    "Sales & Revenue",
    "Revenue generated per hour of labor.",
    "$/hr",
    { base: 245 }
  ),
  mk(
    "avg-check",
    "Average Check Size",
    "Sales & Revenue",
    "Average amount spent per customer/table.",
    "$",
    { base: 34 }
  ),
  mk(
    "sales-by-item",
    "Sales by Item",
    "Sales & Revenue",
    "Top sellers and underperformers by menu item.",
    "",
    { base: 1200 }
  ),
  mk(
    "sales-by-channel",
    "Sales by Channel",
    "Sales & Revenue",
    "Dine-in vs online vs delivery vendors.",
    "",
    { base: 1e4 }
  ),
  /* Cost & Profitability */
  mk(
    "food-cost-pct",
    "Food Cost %",
    "Cost & Profitability",
    "Food cost as % of sales; aims to target band.",
    "%",
    { base: 28 }
  ),
  mk(
    "labor-cost-pct",
    "Labor %",
    "Cost & Profitability",
    "Labor as % of sales.",
    "%",
    { base: 27 }
  ),
  mk(
    "gp-per-item",
    "Gross Profit / Item",
    "Cost & Profitability",
    "Margin per dish for pricing & promos.",
    "$",
    { base: 9 }
  ),
  mk(
    "vendor-spend",
    "Vendor Spend & Variance",
    "Cost & Profitability",
    "Compare ordered vs received amounts.",
    "$",
    { base: 22e3 }
  ),
  mk(
    "waste",
    "Waste & Spoilage",
    "Cost & Profitability",
    "Track food waste by type/quantity/reason.",
    "",
    { base: 25 }
  ),
  /* Operations & Efficiency */
  mk(
    "table-turn",
    "Table Turnover Rate",
    "Operations & Efficiency",
    "Turns per table per period.",
    "x",
    { base: 3.2 }
  ),
  mk(
    "serve-time",
    "Average Serving Time",
    "Operations & Efficiency",
    "Avg minutes from order to food out.",
    "min",
    { base: 14 }
  ),
  mk(
    "peaks",
    "Peak Hours & Staffing",
    "Operations & Efficiency",
    "Busy periods to optimize schedules.",
    "",
    { base: 100 }
  ),
  mk(
    "inv-turn",
    "Inventory Turnover",
    "Operations & Efficiency",
    "How fast inventory is used/replaced.",
    "x",
    { base: 4.6 }
  ),
  mk(
    "inv-levels",
    "Real-time Inventory Levels",
    "Operations & Efficiency",
    "Up-to-the-minute stock for key items.",
    "units",
    { base: 900 }
  ),
  /* Customer Experience */
  mk(
    "csat",
    "Customer Satisfaction (CSAT)",
    "Customer Experience",
    "Post-meal survey score.",
    "/100",
    { base: 86 }
  ),
  mk(
    "nps",
    "Net Promoter Score (NPS)",
    "Customer Experience",
    "Likelihood to recommend.",
    "",
    { base: 42 }
  ),
  mk(
    "reviews",
    "Online Reviews & Ratings",
    "Customer Experience",
    "Yelp/Google/TripAdvisor monitoring.",
    "★",
    { base: 4.3 }
  ),
  mk(
    "repeat",
    "Repeat Customer Rate",
    "Customer Experience",
    "Percent of returning guests.",
    "%",
    { base: 28 }
  ),
  mk(
    "loyalty",
    "Loyalty Engagement",
    "Customer Experience",
    "Enrollments, redemptions, lift.",
    "",
    { base: 1200 }
  ),
  /* Employee Performance */
  mk(
    "emp-perf",
    "Employee Performance",
    "Employee Performance",
    "Sales per server, ticket times, feedback.",
    "",
    { base: 100 }
  ),
  mk(
    "labor-breakdown",
    "Labor Cost by Role",
    "Employee Performance",
    "Cost by employee/job title.",
    "$",
    { base: 18500 }
  ),
  mk(
    "sched-vs-actual",
    "Scheduled vs Actual Hours",
    "Employee Performance",
    "Variance & overtime control.",
    "hrs",
    { base: 820 }
  ),
  mk(
    "esat",
    "Employee Satisfaction (ESAT)",
    "Employee Performance",
    "Internal survey score.",
    "/100",
    { base: 79 }
  ),
  mk(
    "training",
    "Training & Compliance",
    "Employee Performance",
    "Certifications up to date.",
    "%",
    { base: 92 }
  )
];
const WIDGET_TEMPLATES = [
  { id: "styleController", title: "Style Controller", category: "Design", template: "bigNumber", help: "Global shadows, radii, tabs, accent & themes + text sizes.", unit: "", sim: { base: 1 } },
  { id: "globalCalendar", title: "Global Calendar", category: "Scheduling", template: "valuePlusSpark", help: "Upcoming BEO/REO events with status, covers, time.", unit: "", sim: { base: 1 } },
  {
    id: "tpl-net-sales",
    title: "Net Sales (Trend)",
    category: "Sales & Revenue",
    template: "valuePlusSpark",
    unit: "$",
    help: "Track net sales over time with a sparkline.",
    sim: { base: 48e3 }
  },
  {
    id: "tpl-food-cost",
    title: "Food Cost %",
    category: "Cost & Profitability",
    template: "valuePlusSpark",
    unit: "%",
    help: "Food cost as a percent of sales.",
    sim: { base: 28 }
  },
  {
    id: "tpl-table-turn",
    title: "Table Turns",
    category: "Operations & Efficiency",
    template: "valuePlusSpark",
    unit: "x",
    help: "Turns per table to maximize capacity.",
    sim: { base: 3.1 }
  },
  {
    id: "tpl-pepperoni",
    title: "Pepperoni Slices / Day",
    category: "Inventory",
    template: "valuePlusSpark",
    unit: "slices",
    help: "Projected run-out vs on-hand (Echo example).",
    sim: { base: 4200 }
  }
];
function mk(id, title, category, help, unit = "", sim = { base: 1e3 }) {
  return {
    id,
    title,
    category,
    help,
    unit,
    refreshMs: 8e3,
    template: "valuePlusSpark",
    sim,
    formatValue: unit === "$" ? (v) => "$" + Number(v).toLocaleString() : unit === "%" ? (v) => Number(v).toFixed(1) + "%" : void 0
  };
}
export {
  DEFAULT_WIDGETS,
  WIDGET_TEMPLATES
};
