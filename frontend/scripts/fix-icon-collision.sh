#!/usr/bin/env bash
set -euo pipefail
echo "🔎 resolving duplicate TrendingUp imports (react-icons ➜ lucide-react)…"
node scripts/fix-icon-collision.mjs
rm -rf node_modules/.vite 2>/dev/null || true
echo "🚀 restarting dev (force)…"
npm run dev -- --force
