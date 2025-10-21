# PATCH_NOTES.md – Cake Designer Patch V1

## Scope
CD-01 → CD-10 upgraded to precision level 1e-5, zero-tolerance for jitter/glitches at UI math layer.

## Changes
- Introduced `precisionUtils.ts` with `EPS=1e-5`, `approxEqual`, `clampPrecision`.
- Hardened `CakeTextureEngine` with error handling & typed keys.
- Replaced stub orbit logic with real `@react-three/drei` OrbitControls wrapper.
- Added `CakeScene.tsx` to wire controls, rig, and auto-rotation in a real scene.
- Tests for core math & controllers. Storybook for UI UX validation.

## Next Patch (V2) – Proposed
- GPU shader authoring for frosting microstructure normal/bump maps.
- Memory/disposal patterns for textures/materials.
- A11y audits and keyboard control for camera rig.
- E2E tests with Playwright to validate overview/rotate flows in real browser.

