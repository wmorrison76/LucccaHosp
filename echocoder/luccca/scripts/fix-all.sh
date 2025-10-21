#!/usr/bin/env bash
set -euo pipefail
echo "🔧 Running fix-all…"

ROOT="$(pwd)"

# ---------- 0) Ensure deps ----------
need_install=false
[ -d node_modules/tailwindcss ] || need_install=true
[ -d node_modules/postcss ] || need_install=true
[ -d node_modules/autoprefixer ] || need_install=true
if $need_install; then
  echo "📦 Installing dev deps: tailwindcss postcss autoprefixer…"
  npm i -D tailwindcss postcss autoprefixer
fi

# ---------- 1) Tailwind + PostCSS config (shadcn-friendly) ----------
# Create tailwind.config.ts if none exists
if ! ls tailwind.config.* >/dev/null 2>&1; then
  cat > tailwind.config.ts <<'TS'
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}",
    "./echocrm-merged/**/*.{ts,tsx,js,jsx,html}",
    "./_imports/**/*.{ts,tsx,js,jsx,html}",
    "./src/modules/**/*.{ts,tsx,js,jsx,html}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
} satisfies Config;
TS
  echo "✅ wrote tailwind.config.ts"
fi

# PostCSS config (CJS for Vite compatibility)
if [ ! -f postcss.config.cjs ]; then
  cat > postcss.config.cjs <<'CJS'
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
CJS
  echo "✅ wrote postcss.config.cjs"
fi

# ---------- 2) Ensure src/index.css has proper layers & tokens ----------
mkdir -p src
if [ ! -f src/index.css ]; then
  touch src/index.css
fi

# Replace index.css with a shadcn-compatible base if it's missing tokens or @tailwind
if ! grep -q "@tailwind base;" src/index.css; then
  cat > src/index.css <<'CSS'
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Design tokens (shadcn-style) */
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;

    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;

    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;

    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;

    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;

    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;

    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;

    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;

    --primary: 217.2 91.2% 59.8%;
    --primary-foreground: 222.2 47.4% 11.2%;

    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;

    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;

    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;

    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;

    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 224.3 76.3% 48%;
  }
}

@layer base {
  * { @apply border-border; }
  body { @apply bg-background text-foreground; }
}
CSS
  echo "✅ wrote src/index.css (base + tokens)"
else
  # Ensure tokens exist (if file was minimal)
  if ! grep -q -- "--border:" src/index.css; then
    cat >> src/index.css <<'CSS'

/* Injected design tokens */
@layer base {
  :root { --border: 214.3 31.8% 91.4%; --input: 214.3 31.8% 91.4%; --ring:221.2 83.2% 53.3%; --background:0 0% 100%; --foreground:222.2 84% 4.9%; --radius:.5rem; }
  .dark  { --border:217.2 32.6% 17.5%; --input:217.2 32.6% 17.5%; --ring:224.3 76.3% 48%; --background:222.2 84% 4.9%; --foreground:210 40% 98%; }
}
@layer base {
  * { @apply border-border; }
  body { @apply bg-background text-foreground; }
}
CSS
    echo "🔁 augmented src/index.css with tokens"
  fi
fi

# ---------- 3) CRM global.css: ensure @tailwind directives present ----------
CRM_CSS="src/modules/crm/client/global.css"
if [ -f "$CRM_CSS" ]; then
  if ! grep -q "@tailwind base;" "$CRM_CSS"; then
    # Prepend the three directives
    tmp="$CRM_CSS.tmp.$$"
    { echo "@tailwind base;"; echo "@tailwind components;"; echo "@tailwind utilities;"; cat "$CRM_CSS"; } > "$tmp"
    mv "$tmp" "$CRM_CSS"
    echo "✅ prepended @tailwind directives to $CRM_CSS"
  fi
else
  mkdir -p "$(dirname "$CRM_CSS")"
  cat > "$CRM_CSS" <<'CSS'
@tailwind base;
@tailwind components;
@tailwind utilities;

/* CRM-specific overrides can live here. */
CSS
  echo "✅ created $CRM_CSS"
fi

# ---------- 4) Forwarders & stubs (idempotent) ----------
forward() {
  local name="$1"
  local target="$2"
  local file="src/components/${name}.tsx"
  if [ ! -f "$file" ]; then
    mkdir -p "src/components"
    cat > "$file" <<TS
// auto-forwarded component
export { default } from "${target}";
export * from "${target}";
TS
    echo "➡️ forwarder: $file -> $target"
  fi
}

forward "ResizeObserverErrorBoundary" "@/modules/crm/client/components/ResizeObserverErrorBoundary"
forward "SalesPipeline" "@/modules/crm/client/components/SalesPipeline"
forward "DailyTodos" "@/modules/crm/client/components/DailyTodos"
forward "LeadQualification" "@/modules/crm/client/components/LeadQualification"
forward "EmailIntegration" "@/modules/crm/client/components/EmailIntegration"
forward "FollowUpAutomation" "@/modules/crm/client/components/FollowUpAutomation"
forward "CustomerLifecycle" "@/modules/crm/client/components/CustomerLifecycle"
forward "AISalesAssistant" "@/modules/crm/client/components/AISalesAssistant"
forward "WeatherTracker" "@/modules/crm/client/components/WeatherTracker"
forward "WeatherTrackerSimple" "@/modules/crm/client/components/WeatherTrackerSimple"
forward "WeatherRadarMap" "@/modules/crm/client/components/WeatherRadarMap"
forward "WeatherNotificationPopup" "@/modules/crm/client/components/WeatherNotificationPopup"

# tiny libs/hooks (only if missing)
mkfile(){ local f="$1"; mkdir -p "$(dirname "$f")"; [ -f "$f" ] || touch "$f"; }

if [ ! -f src/lib/weather-notification-service.ts ]; then
  cat > src/lib/weather-notification-service.ts <<'TS'
export type WeatherAlert = { id?: string; title: string; message: string; severity?: 'info'|'watch'|'warning'|'emergency' };
type Listener = (a: WeatherAlert) => void;
const listeners = new Set<Listener>();
export const weatherNotificationService = {
  subscribe(cb: Listener){ listeners.add(cb); return () => listeners.delete(cb); },
  notify(alert: WeatherAlert){ for (const cb of listeners) cb(alert); },
};
export default weatherNotificationService;
TS
  echo "🧩 stub: src/lib/weather-notification-service.ts"
fi

if [ ! -f src/lib/event-location-utils.ts ]; then
  cat > src/lib/event-location-utils.ts <<'TS'
export function toLatLng(input:any){ return input?.lat && input?.lng ? { lat:+input.lat, lng:+input.lng } : { lat:0, lng:0 }; }
export function getCityFromEvent(e:any){ return e?.location?.city || e?.city || 'Unknown'; }
TS
  echo "🧩 stub: src/lib/event-location-utils.ts"
fi

if [ ! -f src/hooks/use-toast.ts ]; then
  cat > src/hooks/use-toast.ts <<'TS'
type ToastOpts = { title?: string; description?: string; variant?: 'default'|'destructive'|'success'|'warning' };
export function useToast(){ return { toast: (_opts: ToastOpts) => {} }; }
export default useToast;
TS
  echo "🧩 stub: src/hooks/use-toast.ts"
fi

if [ ! -f src/hooks/use-mobile.ts ]; then
  cat > src/hooks/use-mobile.ts <<'TS'
import { useEffect, useState } from 'react';
export default function useMobile(breakpoint=768){
  const [isMobile, set] = useState(false);
  useEffect(()=>{ const q=window.matchMedia(`(max-width:${breakpoint}px)`); const on=()=>set(q.matches); on(); q.addEventListener?.('change',on); return ()=>q.removeEventListener?.('change',on); },[breakpoint]);
  return isMobile;
}
TS
  echo "🧩 stub: src/hooks/use-mobile.ts"
fi

# ---------- 5) Patch duplicate 'EmailIntegration' (robust) ----------
EMAIL_P="src/modules/crm/client/components/EmailIntegration.tsx"
if [ -f "$EMAIL_P" ]; then
  node - <<'NODE'
const fs=require('fs'); const p='src/modules/crm/client/components/EmailIntegration.tsx';
if(!fs.existsSync(p)) process.exit(0);
let s=fs.readFileSync(p,'utf8'); const before=s;
// rename type/aliases named EmailIntegration -> EmailService
s = s.replace(/\btype\s+EmailIntegration\b/g, 'type EmailService');
s = s.replace(/\binterface\s+EmailIntegration\b/g, 'interface EmailService');
s = s.replace(/<\s*EmailIntegration\s*(\[|>)/g, (_m, g1)=> '<EmailService'+g1);
s = s.replace(/:\s*EmailIntegration(\s*[\]|,;})])/g, ': EmailService$1');
// variables/classes named EmailIntegration
s = s.replace(/\bconst\s+EmailIntegration\s*=/g, 'const EmailIntegrationModel =');
s = s.replace(/\blet\s+EmailIntegration\s*=/g, 'let EmailIntegrationModel =');
s = s.replace(/\bclass\s+EmailIntegration\b/g, 'class EmailIntegrationModel');
// default export function name
s = s.replace(/export\s+default\s+function\s+EmailIntegration\s*\(/, 'export default function EmailIntegrationView(');
// if there's a "export default EmailIntegration;" style at bottom, fix it too
s = s.replace(/export\s+default\s+EmailIntegration\s*;/, 'export default EmailIntegrationView;');

if(s!==before){ fs.writeFileSync(p,s); console.log('✅ Patched EmailIntegration collisions'); }
else { console.log('ℹ️ EmailIntegration already patched or patterns not found'); }
NODE
fi

# ---------- 6) Sanitize files that accidentally contain error headers or absolute paths ----------
# remove lines starting with: "[plugin:vite:" or absolute paths like "/Users/..." at top of files
node - <<'NODE'
const fs=require('fs'); const path=require('path');
const ROOT='src';
function* walk(dir){ for(const e of fs.readdirSync(dir,{withFileTypes:true})){ const p=path.join(dir,e.name); if(e.isDirectory()) yield* walk(p); else if(/\.(t|j)sx?$|\.css$|\.html$/.test(p)) yield p; } }
for(const file of walk(ROOT)){
  let s=fs.readFileSync(file,'utf8'); const before=s;
  // drop any leading lines that are error headers or absolute path echoes
  s = s.replace(/^(\[plugin:[^\n]*\].*\n)+/g, '');
  s = s.replace(/^\/Users\/[^\n]*\n/g, ''); // stray path line at very top
  // also fix funky "[plugin:vite:react-babel]" blocks inserted mid-file:
  s = s.replace(/\n\[[^\n]*vite[^\n]*\][^\n]*\n/g, '\n');
  if(s!==before){ fs.writeFileSync(file,s); console.log('🧹 sanitized', file); }
}
NODE

# ---------- 7) Clear Vite cache and restart ----------
rm -rf node_modules/.vite 2>/dev/null || true
echo "🚀 restarting dev (force)…"
npm run dev -- --force
