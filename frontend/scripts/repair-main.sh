#!/usr/bin/env bash
set -euo pipefail
ROOT="src"
MAIN="$ROOT/main.jsx"

# detect optional EchoCore CSS
HAS_ECHOSTYLE=0
[ -f "$ROOT/components/EchoCore/EchoCoreGlobalStyles.css" ] && HAS_ECHOSTYLE=1

# write a clean main.jsx
cat > "$MAIN" <<'JSX'
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
JSX
if [ $HAS_ECHOSTYLE -eq 1 ]; then
  cat >> "$MAIN" <<'JSX'
import "./components/EchoCore/EchoCoreGlobalStyles.css";
JSX
fi
cat >> "$MAIN" <<'JSX'
// Optional Echo WS hook (won't throw if not running)
import { installEchoHook } from "./echo/echoClient.js";

function boot() {
  try {
    const host = typeof location !== "undefined" ? location.hostname : "localhost";
    installEchoHook?.({ baseUrl: `ws://${host}:9091` });
  } catch (e) {
    console.warn("[Echo] websocket hook skipped:", e?.message || e);
  }

  const el = document.getElementById("root");
  const root = createRoot(el);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot, { once: true });
} else {
  boot();
}
JSX

echo "✅ wrote $MAIN"

# sanity: warn if any other createRoot() calls exist
OTHERS=$(grep -RIl "createRoot(" src | grep -v "$MAIN" || true)
if [ -n "$OTHERS" ]; then
  echo "⚠️  Found additional createRoot() calls:"
  echo "$OTHERS"
fi

# clear Vite cache & restart
rm -rf node_modules/.vite 2>/dev/null || true
echo "🚀 starting dev (force)…"
npm run dev -- --force
