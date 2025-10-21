#!/usr/bin/env bash
set -euo pipefail

echo "▶️ Starting setup..."

# --- sanity check ---
if [ ! -f package.json ]; then
  echo "❌ Run this from your project root (where package.json lives)."
  exit 1
fi

# --- ensure scripts dir ---
mkdir -p scripts

# --- install CommonJS alias checker ---
cat > scripts/check-imports.cjs <<'CJS'
// scripts/check-imports.cjs (CommonJS)
const fs = require('fs');
const path = require('path');

/** Scan aliased imports from tsconfig "paths" and report ones that don't resolve. */
const ROOT = process.cwd();
const tsconfigPath = path.join(ROOT, 'tsconfig.json');
if (!fs.existsSync(tsconfigPath)) {
  console.error('❌ tsconfig.json not found at project root.');
  process.exit(1);
}
const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'));
const baseUrl = (tsconfig.compilerOptions && tsconfig.compilerOptions.baseUrl) || '.';
const paths = (tsconfig.compilerOptions && tsconfig.compilerOptions.paths) || {};

const aliasMap = {};
for (const key of Object.keys(paths)) {
  const values = paths[key];
  if (!Array.isArray(values) || values.length === 0) continue;
  const alias = key.replace(/\/\*$/, '');        // "@/*" -> "@"
  const target = values[0].replace(/\/\*$/, ''); // "src/*" -> "src"
  aliasMap[alias] = path.resolve(ROOT, baseUrl, target);
}
if (!aliasMap['@']) aliasMap['@'] = path.resolve(ROOT, 'src');

const exts = ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs'];

function walk(dir) {
  const out = [];
  try {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, ent.name);
      if (ent.isDirectory()) {
        if (ent.name === 'node_modules' || ent.name === 'dist' || ent.name === '.git') continue;
        out.push(...walk(p));
      } else if (/\.(ts|tsx|js|jsx|mjs|cjs)$/.test(ent.name)) {
        out.push(p);
      }
    }
  } catch {}
  return out;
}

function resolveAliased(spec) {
  const hit = Object.keys(aliasMap).find(a => spec === a || spec.startsWith(a + '/'));
  if (!hit) return '__SKIP__';
  let rel = spec.slice(hit.length);
  if (rel.startsWith('/')) rel = rel.slice(1);
  const base = aliasMap[hit];
  const joined = path.join(base, rel);
  const candidates = [
    joined,
    ...exts.map(e => joined + e),
    ...exts.map(e => path.join(joined, 'index' + e)),
  ];
  return candidates.find(p => fs.existsSync(p)) || null;
}

const srcRoot = aliasMap['@'] || path.join(ROOT, 'src');
const files = walk(srcRoot);
const missing = [];

for (const file of files) {
  const text = fs.readFileSync(file, 'utf8');
  const specs = [
    ...text.matchAll(/from\s+['"]([^'"]+)['"]/g),
    ...text.matchAll(/import\(\s*['"]([^'"]+)['"]\s*\)/g),
  ].map(m => m[1]);

  for (const s of specs) {
    if (!s.startsWith('@')) continue;
    if (!resolveAliased(s)) missing.push({ file: path.relative(ROOT, file), import: s });
  }
}

if (missing.length) {
  console.log('❌ Unresolved aliased imports:');
  for (const m of missing) console.log(`- ${m.import}  <-  ${m.file}`);
  console.log(`\nTotal unresolved: ${missing.length}`);
  process.exit(1);
} else {
  console.log('✅ All aliased imports resolved');
}
CJS

# --- wire npm scripts (check:imports, ensure dev) ---
node - <<'NODE'
const fs = require('fs');
const pkgPath = 'package.json';
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
pkg.scripts ||= {};
pkg.scripts['check:imports'] = 'node scripts/check-imports.cjs';
pkg.scripts['dev'] = pkg.scripts['dev'] || 'vite';
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
console.log('✅ package.json updated: scripts{ check:imports, dev }');
NODE

# --- ensure tsconfig paths exist ---
node - <<'NODE'
const fs = require('fs');
const p = 'tsconfig.json';
if (!fs.existsSync(p)) { console.error('❌ tsconfig.json not found'); process.exit(1); }
const ts = JSON.parse(fs.readFileSync(p, 'utf8'));
ts.compilerOptions ||= {};
ts.compilerOptions.baseUrl ||= '.';
ts.compilerOptions.paths ||= {};
ts.compilerOptions.paths['@/*'] = ts.compilerOptions.paths['@/*'] || ['src/*'];
ts.compilerOptions.paths['@shared/*'] = ts.compilerOptions.paths['@shared/*'] || ['src/shared/*'];
ts.compilerOptions.types = Array.from(new Set([...(ts.compilerOptions.types||[]), 'vite/client', 'node']));
fs.writeFileSync(p, JSON.stringify(ts, null, 2) + '\n');
console.log('✅ tsconfig.json paths ensured: "@/*", "@shared/*"');
NODE

# --- ensure vite env + utils ---
mkdir -p src src/lib
if [ ! -f src/vite-env.d.ts ]; then
  echo '/// <reference types="vite/client" />' > src/vite-env.d.ts
  echo '✅ wrote src/vite-env.d.ts'
fi
if [ ! -f src/lib/utils.ts ]; then
  cat > src/lib/utils.ts <<'TS'
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
TS
  echo '✅ wrote src/lib/utils.ts'
fi

# --- create missing component stubs if not present ---
mkdir -p src/components

[ -f src/components/ResizeObserverErrorBoundary.tsx ] || cat > src/components/ResizeObserverErrorBoundary.tsx <<'TSX'
import { useEffect } from "react";
export function useResizeObserverErrorHandler() {
  useEffect(() => {
    const onError = (e: ErrorEvent) => {
      if (typeof e.message === "string" && e.message.includes("ResizeObserver loop")) e.preventDefault?.();
    };
    window.addEventListener("error", onError);
    return () => window.removeEventListener("error", onError);
  }, []);
}
export default function ResizeObserverErrorBoundary({ children }: { children: React.ReactNode }) {
  useResizeObserverErrorHandler();
  return <>{children}</>;
}
TSX

[ -f src/components/TimeTracking.tsx ] || cat > src/components/TimeTracking.tsx <<'TSX'
export default function TimeTracking() {
  return <div className="p-4 border rounded-lg">Time Tracking (stub)</div>;
}
TSX

[ -f src/components/ProductivityDashboard.tsx ] || cat > src/components/ProductivityDashboard.tsx <<'TSX'
export default function ProductivityDashboard() {
  return <div className="p-4 border rounded-lg">Productivity Dashboard (stub)</div>;
}
TSX

[ -f src/components/ActivityLogger.tsx ] || cat > src/components/ActivityLogger.tsx <<'TSX'
export default function ActivityLogger() {
  return <div className="p-4 border rounded-lg">Activity Logger (stub)</div>;
}
TSX

# --- install @types/node if missing (dev) ---
if ! npm ls @types/node >/dev/null 2>&1; then
  echo '📦 Installing @types/node (dev)...'
  npm i -D @types/node
fi

# --- clear vite cache ---
if [ -d node_modules/.vite ]; then
  echo '🧹 clearing Vite cache...'
  rm -rf node_modules/.vite
fi

# --- run checker (non-fatal) ---
echo '🔎 running alias import checker...'
npm run -s check:imports || true

# --- start dev server ---
echo '🚀 starting dev server...'
npm run dev -- --force
