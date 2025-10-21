
#!/usr/bin/env bash
set -euo pipefail
OUTDIR="codemap"; mkdir -p "$OUTDIR"

echo "== cloc =="
npx -y cloc . > "$OUTDIR/cloc.txt" || true

echo "== depcheck =="
npx -y depcheck > "$OUTDIR/depcheck.txt" || true

echo "== knip =="
npx -y knip > "$OUTDIR/knip.txt" || true

echo "== madge =="
npx -y madge --extensions ts,tsx,js,jsx src --image "$OUTDIR/madge.png" || true

echo "== dependency-cruiser =="
npx -y dependency-cruiser -T dot -f src > "$OUTDIR/depcruise.dot" || true

echo "Done. See the 'codemap' folder."
