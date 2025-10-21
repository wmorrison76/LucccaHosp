# Patch 0002 — Telemetry, Contract Tests & Storybook Coverage
**Date:** 2025-07-27

## Scope
1. **Telemetry (SEG-B-OT-01 → 03)**
   - `packages/echocore/src/telemetry/otel.ts` — OpenTelemetry init (traces + metrics, env driven).
   - `packages/echocore/src/telemetry/events.ts` — Strongly typed domain event registry.
   - `packages/echoscope/src/panes/TelemetryConsole/TelemetryConsole.tsx` — Dev pane to view live events.

2. **Contract Tests (first wave)**
   - `CalendarPort` + `GoogleCalendarAdapter`
   - `PaymentGatewayPort` (Stripe/Paddle) — skeleton contract test suite
   - Calendar + Payments contract test harnesses added under `packages/echo-testing/src/contracts/...`

3. **Storybook & A11y**
   - Stories added for `AdaptiveSidebar` and `ReportPreviewPane` with `@storybook/addon-a11y`.
   - Axe checks configured.

4. **Bus Instrumentation**
   - `GlobalStateBus.emit` now emits an OT event span with attributes for event name & payload size.

## Commands
```bash
git checkout -b patch/precision-0002
git apply PATCH_0002_telemetry_tests_storybook.diff
pnpm i
pnpm test
pnpm build
pnpm storybook
```

## Next (Patch 0003)
- RBAC contract tests + e2e Playwright smoke for multi-pane whiteboard flows
- Presence bus + avatar telemetry emitters with span attributes
- Hybrid analytics sync + resilience tests
