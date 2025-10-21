# EchoCRM Upgrade Kit v1

Drop-in fixes + scaffolds to stabilize your latest Builder export and unlock the next features.

## What's inside
- `jsconfig.json` → enables `@/*` path aliases across the app.
- `.env.development` → standardizes API base.
- `src/app/ErrorBoundary.jsx` → catches UI crashes.
- `src/lib/logger.ts`, `src/lib/analytics.ts` → consistent logging + analytics.
- `src/api/validate.ts` → zod schemas to validate request payloads.
- `src/routes/GuardedRoute.jsx` → simple RBAC gate.
- `src/services/paymentsClient.ts` → deposit/milestone payment intent client.
- `src/services/prismmClient.ts` → floorplan link + seat counts (server-backed).
- `seed/EchoCRM.Upgrade.v1.yaml` → minimal seed for Builder.

## How to apply
1) Copy `jsconfig.json` to repo root.
2) Copy `src/*` files into your project's `src/` (merge directories).
3) Add `.env.development` and set `VITE_API_BASE` accordingly.
4) Replace brittle `../../` imports with `@/…` as you touch files.
5) Install zod: `npm i zod`.
6) Wrap your root with `<ErrorBoundary>` and start using `log()` and `track()` helpers.

## Next steps
- Server: implement `/payments/intent`, `/floorplans/link` and `/floorplans/seat-counts` endpoints.
- Analytics: route `track()` to your provider (Segment/GA) when ready.
- RBAC: replace `GuardedRoute` with a claim-aware version once auth is live.
