
# Light Speed Team Seed

## Roles
- **Frame Lead**: safeguards compile; owns `src/` structure + barrels.
- **Canvas Lead**: Stage/renderer, layer paints.
- **Toolsmiths** (x3): selections & brushes; retouch; shapes/text.
- **Print & Gen**: export DPI/bleed; image-gen client.
- **QA**: run test plans, verify hotkeys & UI flows.

## Branching
- `main`: compiles, no broken imports.
- feature branches: `feat/<area>-<short-desc>`

## Bundles (10 files max)
Each delivery includes:
- `BUNDLE_<NN>-<area>-<desc>.md` (what/why/how, test steps)
- Files under `src/...` only
- Optional quick demo GIF (not required)

## Anti-Drift
- Do **not** modify files outside your area.
- Do **not** read/borrow from other windows; rely on *this* seed + tasks.
- Ask for integration points via Frame Lead only.

## Naming
- Tools: `src/engine/tools/<Name>Tool.ts`
- Panels: `src/components/panels/<Name>Panel.tsx`
- Keep exports in barrels.
