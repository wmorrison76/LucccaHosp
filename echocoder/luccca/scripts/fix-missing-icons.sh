#!/usr/bin/env bash
set -euo pipefail
echo "🔎 fixing missing icon bindings (FaTrendingUp -> TrendingUp)…"
node scripts/fix-missing-icons.mjs
rm -rf node_modules/.vite 2>/dev/null || true
echo "🚀 restarting dev (force)…"
npm run dev -- --force
