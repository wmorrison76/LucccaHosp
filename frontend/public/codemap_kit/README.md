
# Code Map Kit (JS/TS + React)

Inventory a project, map imports, and list routes.

## Install

From your project root (where `src/` lives):

```bash
# copy files here, then:
npm i -D @babel/parser @babel/traverse fast-glob
```

## Run

```bash
node codemap.mjs .
```

Outputs → `./codemap/`:
- `manifest.json` — per-file metadata (imports, exports, components, hooks, routes, sizes)
- `graph.json` — adjacency edges, entries, orphans
- `graph.dot` — Graphviz graph (render: `dot -Tpng codemap/graph.dot -o codemap/graph.png`)
- `summary.md` — human-readable overview

## Optional extras

`scan.sh` runs additional tools with `npx`:
- **cloc** (line counts) → `codemap/cloc.txt`
- **depcheck** (unused deps) → `codemap/depcheck.txt`
- **knip** (unused files/exports) → `codemap/knip.txt`
- **madge** dep graph image → `codemap/madge.png`
- **dependency-cruiser** DOT → `codemap/depcruise.dot`

> Comment out any step you don't need in `scan.sh`.

## Notes

- Alias `@/` resolves to `src/` by default—edit in `codemap.mjs` if needed.
- Package imports are recorded as module edges but not resolved to files.
- Read-only: it does not modify your codebase.
