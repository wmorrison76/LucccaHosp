# Production Management – Future Development Roadmap

Scope: End‑to‑end flow BEO → Production Timeline → Prep Sheets (by division) → Scheduling/Staff Assessment → Plating + Daily Operational Checks, with measurable Prep Efficiency.

1) Prep Efficiency Metrics
- Define KPIs: on‑time completion %, station bottlenecks, average task duration variance, rework rate, waste %, cart transit time, plating throughput.
- Telemetry: timestamps for task start/finish, station, assignee; cart scan events; exceptions. Persist to DB for trend lines.
- Dashboards: daily score, 7/30‑day trends, alerts when thresholds breached.

2) BEO → Production Timeline
- Parse BEO items into tasks with durations, dependencies, lead/lag (prepDaysAdvance). Use recipe metadata (prep/cook minutes, equipment, skill level).
- Auto schedule tasks across days leading to event; enforce station capacity and equipment constraints.
- What‑if mode to shift events and recompute critical path.

3) Prep Sheets Generation (by division)
- Divisions: Garde Manger (cold), Hot Line, Butcher, Saucier, Pastry, Stewarding.
- Per division sheets contain: tasks, quantities, ingredients pick, yields, station/equipment, start/finish targets, responsible staff.
- Export/print, digital sign‑off, and real‑time status updates.

4) Cart Tracker Workflow
- Create carts from prep sheets; barcode/QR per cart. Track “packed → en route → delivered → plated → cleared”.
- Cost roll‑up per cart for COGS traceability; exceptions and temperature checks.

5) Scheduling & Staff Assessment
- Skills matrix per employee (roles, level, certifications, history). Constraint‑based assignment engine.
- Auto‑suggest staffing per station based on workload; support swaps, overtime limits, breaks, compliance.
- Availability calendar and shift templates; publish to Personal Calendar.

6) Plating Coordination
- Plate map per event/course, station tasks, garnish lanes, pass timing. Takt time planner and plate counts in waves.
- Live “fire” board integration with timing cues from timeline.

7) Daily Operational Checks
- Morning huddles checklist; HACCP checks (temps, sanitation); end‑of‑day reconciliation (leftovers, waste, returns).
- Non‑conformance capture with photos and corrective actions.

8) Integrations
- Echo CRM: pipeline → event data → BEO seeding; sync status; revenue tie‑in.
- Calendar sync (ICS/Google); Inventory/purchasing (vendor prices, receiving); POS for consumption feedback.

9) Data Model & Persistence
- Events, Tasks, Stations, Carts, Assignments, Telemetry, KPIs. Versioned BEO links. Soft deletes and audit log.

10) UI/UX Milestones
- Production Timeline view (Gantt), Prep Sheets view (per division), Schedule view (now added), Cart Tracker board, Plating Board, Efficiency dashboard.

Milestone Plan
- M1: Task engine + Prep Sheets (divisions) + Schedule view with skills matching.
- M2: Cart Tracker + Telemetry + Efficiency KPIs dashboard.
- M3: Plating tools + Echo CRM and Calendar sync + Purchasing hooks.

Notes
- Security: role‑based permissions; audit trail.
- Offline first for kitchen tablets.
