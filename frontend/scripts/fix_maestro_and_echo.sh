#!/usr/bin/env bash
set -euo pipefail

cd "$(pwd)"

P_MODULE="src/modules/Maestro-BQT"
P_CLIENT="$P_MODULE/client"
F_WRAPPER_NEW="$P_MODULE/MaestroAppPanel.tsx"
F_WRAPPER_OLD="$P_MODULE/nova-lab-App.tsx"
F_APP="$P_CLIENT/App.tsx"
F_VITE_ROOT="vite.config.ts"
F_PKG="package.json"
F_TW_TS="tailwind.config.ts"
F_TW_JS="tailwind.config.js"

backup(){ [[ -f "$1" ]] && cp "$1" "$1.bak.$(date +%Y%m%d-%H%M%S)"; }

mkdir -p "$P_MODULE"

if [[ -f "$F_WRAPPER_NEW" ]]; then backup "$F_WRAPPER_NEW"; fi
cat > "$F_WRAPPER_NEW" <<'TSX'
import React from "react";
import "./client/global.css";
import App from "./client/App";
export default function MaestroBqtPanel(props: any) {
  return <div className="h-full w-full overflow-auto"><App {...props} /></div>;
}
TSX

if [[ -f "$F_WRAPPER_OLD" ]]; then backup "$F_WRAPPER_OLD"; fi
cat > "$F_WRAPPER_OLD" <<'TS'
export { default } from "./MaestroAppPanel";
TS

if [[ -f "$F_APP" ]]; then
  backup "$F_APP"
  sed -i '' '/react-dom\/client/d' "$F_APP" 2>/dev/null || true
  sed -i '' '/createRoot\s*}/d'     "$F_APP" 2>/dev/null || true
  sed -i '' '/createRoot\s*(.*)\.render\s*(\s*<App\s*\/>\s*)\s*;*/d' "$F_APP" 2>/dev/null || true
  sed -i '' '/createRoot\s*(.*)/d'  "$F_APP" 2>/dev/null || true
fi

if [[ -f "src/echo/Echobackboard.jsx" ]]; then backup "src/echo/Echobackboard.jsx"; rm -f "src/echo/Echobackboard.jsx"; fi
if [[ -f "src/board/oldEchobackboard.jsx" ]]; then backup "src/board/oldEchobackboard.jsx"; rm -f "src/board/oldEchobackboard.jsx"; fi

if [[ -f "$F_VITE_ROOT" ]]; then backup "$F_VITE_ROOT"; fi
cat > "$F_VITE_ROOT" <<'VITE'
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      maestro: path.resolve(__dirname, "src/modules/Maestro-BQT/client"),
    },
  },
  server: { host: true, port: 5173 },
});
VITE

if [[ -f "$F_PKG" ]]; then
  node - <<'NODE'
const fs=require('fs');const p='package.json';
const j=JSON.parse(fs.readFileSync(p,'utf8'));
j.scripts=j.scripts||{};
if(!j.scripts.dev) j.scripts.dev='vite';
if(!j.scripts.build) j.scripts.build='vite build';
let echoCfg='';
const {execSync}=require('child_process');
try {
  const out=execSync("find src -maxdepth 5 -type f -name 'vite.config.*' | grep -i echo | head -n1",{stdio:['ignore','pipe','ignore']}).toString().trim();
  if(out) echoCfg=out;
} catch {}
if(echoCfg){
  j.scripts['dev:echo']=`vite --config ${echoCfg}`;
  j.scripts['build:echo']=`vite build --config ${echoCfg}`;
}
fs.writeFileSync(p, JSON.stringify(j,null,2));
console.log('package.json updated. echo config:', echoCfg||'(not found)');
NODE
fi

TW="";
if [[ -f "$F_TW_TS" ]]; then TW="$F_TW_TS"; fi
if [[ -z "$TW" && -f "$F_TW_JS" ]]; then TW="$F_TW_JS"; fi
if [[ -n "$TW" ]]; then
  cp "$TW" "$TW.bak.$(date +%Y%m%d-%H%M%S)"
  if ! grep -q "src/modules" "$TW"; then
    awk 'BEGIN{added=0} {print} /content *: *\[/ && !added {print "    \"./src/modules/**/*.{js,jsx,ts,tsx}\","; added=1}' "$TW" > "$TW.tmp" && mv "$TW.tmp" "$TW"
  fi
fi

echo "OK"
