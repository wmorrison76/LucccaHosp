#!/usr/bin/env bash
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT/frontend"
pnpm i
pnpm add -D concurrently@8 --silent || true
./node_modules/.bin/concurrently -k -n WEB,ECHO \
  "pnpm dev -- --force" \
  "pnpm dev:echo"
