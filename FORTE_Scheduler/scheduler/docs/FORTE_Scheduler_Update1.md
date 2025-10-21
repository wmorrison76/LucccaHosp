# FORTE Scheduler Update 1
Generated 2025-07-28 05:38:01Z

## New Core Modules
- **BanquetForecastEngine.ts** — Reads BEOs, guest counts, menu complexity, and computes prep hour estimates.
- **ProductionPlanner.ts** — Maps production orders (e.g., veal stock) to required prep hours and skill requirements.

## Data Models
- **beoModels.ts** — Defines BEO inputs and forecast output structure.
- **productionModels.ts** — Defines production orders and planning results.

## Next Steps
- Integrate with CRM and BQT modules.
- Implement skill-based scheduling using brigade levels.
- Connect budget tracking for FOH/BOH labor planning.

