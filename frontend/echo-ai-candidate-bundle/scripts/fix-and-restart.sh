#!/usr/bin/env bash
set -e

ROOT="$(pwd)"
echo "▶️ Fix pack starting at: $ROOT"

if [ ! -f package.json ]; then
  echo "❌ Run this from your project root (where package.json lives)."
  exit 1
fi

# --- 0) helper: maybe write a file only if missing ---
maybe_write() {
  local file="$1"
  local content="$2"
  if [ ! -f "$file" ]; then
    mkdir -p "$(dirname "$file")"
    printf "%s\n" "$content" > "$file"
    echo "✅ created $file"
  else
    echo "ℹ️ exists: $file"
  fi
}

# --- 1) Fix duplicate declaration in EmailIntegration.tsx (rename type/interface to EmailService) ---
if [ -f "src/modules/crm/client/components/EmailIntegration.tsx" ]; then
  node - <<'NODE'
const fs = require('fs');
const p = "src/modules/crm/client/components/EmailIntegration.tsx";
let s = fs.readFileSync(p, 'utf8');
const before = s;

// rename type/interface names "EmailIntegration" (not the component function)
s = s.replace(/\binterface\s+EmailIntegration\b/g, 'interface EmailService');
s = s.replace(/\btype\s+EmailIntegration\b/g, 'type EmailService');

// generics / annotations / arrays
s = s.replace(/<\s*EmailIntegration\s*>/g, '<EmailService>');
s = s.replace(/<\s*EmailIntegration\s*\[\s*\]>/g, '<EmailService[]>');
s = s.replace(/:\s*EmailIntegration(\s*[\]|,;})])/g, ': EmailService$1');

// variable/class identifiers colliding with component name
s = s.replace(/\bconst\s+EmailIntegration\s*=/g, 'const EmailIntegrationModel =');
s = s.replace(/\blet\s+EmailIntegration\s*=/g, 'let EmailIntegrationModel =');
s = s.replace(/\bclass\s+EmailIntegration\b/g, 'class EmailIntegrationModel');

if (s !== before) {
  fs.writeFileSync(p, s);
  console.log('✅ Patched duplicate type/interface/vars in', p);
} else {
  console.log('ℹ️ No duplicate pattern changes needed in', p);
}
NODE
else
  echo "ℹ️ EmailIntegration.tsx not found; skipping duplicate fix"
fi

# --- 2) Sanitize stray lines accidentally pasted into .tsx/.jsx (absolute paths, vite logs, codeframe lines) ---
node - <<'NODE'
const fs = require('fs');
const path = require('path');

const exts = new Set(['.tsx','.jsx']);
function* walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const f = path.join(dir, name);
    const st = fs.statSync(f);
    if (st.isDirectory()) {
      if (name === 'node_modules' || name.startsWith('.')) continue;
      yield* walk(f);
    } else if (exts.has(path.extname(f))) {
      yield f;
    }
  }
}

let changedCount = 0;
for (const file of walk('src')) {
  let txt = fs.readFileSync(file, 'utf8');
  const orig = txt;

  // drop any line that looks like an absolute /Users/... path or [plugin:vite...] noise
  txt = txt
    .split('\n')
    .filter(line =>
      !/^\/Users\//.test(line) &&
      !/^\[plugin:vite/.test(line) &&
      !/^> +\d+ \|/.test(line) &&
      !/^\s*\^+\s*$/.test(line))
    .join('\n');

  if (txt !== orig) {
    fs.writeFileSync(file, txt);
    console.log('🧹 cleaned', file);
    changedCount++;
  }
}
console.log(`🧽 sanitation complete. Files changed: ${changedCount}`);
NODE

# --- 3) Ensure CSS import target exists to satisfy @import "./backboard.skin.css" ---
maybe_write "src/backboard.skin.css" "/* skin placeholder to satisfy @import; customize as needed */\n:root{}\n"

# --- 4) Ensure lib/hooks stubs that pages expect ---
maybe_write "src/lib/weather-notification-service.ts" "$(cat <<'TS'
// @ts-nocheck
export type Severity = 'info' | 'watch' | 'advisory' | 'warning' | 'emergency';
export interface WeatherAlert {
  id: string; title: string; message: string; severity: Severity;
  startsAt: Date; endsAt?: Date; location?: { lat:number; lng:number; name?: string }; source?: string;
}
type Listener = (alerts: WeatherAlert[]) => void;

class WeatherNotificationService {
  private listeners = new Set<Listener>();
  private poll:any=null; private last:WeatherAlert[]=[];
  subscribe(cb:Listener){ this.listeners.add(cb); if(this.last.length) cb(this.last); return ()=>this.listeners.delete(cb); }
  private emit(a:WeatherAlert[]){ this.last=a; this.listeners.forEach(cb=>cb(a)); }
  async getAlerts(){ const now=new Date(), in2h=new Date(now.getTime()+2*60*60*1000);
    return [
      {id:'wx-heat', title:'Heat Advisory', message:'High temps this afternoon.', severity:'advisory', startsAt:now, endsAt:in2h, source:'MockWX'},
      {id:'wx-storm', title:'Thunderstorm Watch', message:'Storms possible after 5pm.', severity:'watch', startsAt:now, source:'MockWX'}
    ];
  }
  async refreshOnce(){ const a=await this.getAlerts(); this.emit(a); return a; }
  startPolling(ms=60000){ if(this.poll) return; this.refreshOnce(); this.poll=setInterval(()=>this.refreshOnce(), ms); }
  stopPolling(){ if(this.poll){ clearInterval(this.poll); this.poll=null; } }
}
export const weatherNotificationService = new WeatherNotificationService();
export default weatherNotificationService;
TS
)"

maybe_write "src/lib/event-location-utils.ts" "$(cat <<'TS'
// @ts-nocheck
export function distanceKm(a:{lat:number;lng:number}, b:{lat:number;lng:number}) {
  const R=6371, dLat=(b.lat-a.lat)*Math.PI/180, dLng=(b.lng-a.lng)*Math.PI/180;
  const s1=Math.sin(dLat/2), s2=Math.sin(dLng/2);
  const c = 2*Math.asin(Math.sqrt(s1*s1 + Math.cos(a.lat*Math.PI/180)*Math.cos(b.lat*Math.PI/180)*s2*s2));
  return +(R*c).toFixed(2);
}
export function pickCityFromEvent(evt:any){ return evt?.location?.city || 'Unknown'; }
export function formatCoords(lat:number,lng:number){ return `${lat.toFixed(3)}, ${lng.toFixed(3)}`; }
TS
)"

maybe_write "src/lib/spelling-voice-utils.ts" "$(cat <<'TS'
// @ts-nocheck
export const sanitizeInput = (s:string)=> (s||'').replace(/\s+/g,' ').trim();
export const toTitleCase = (s:string)=> sanitizeInput(s).toLowerCase().replace(/\b\w/g, m=>m.toUpperCase());
export const stripDiacritics = (s:string)=> s.normalize('NFD').replace(/\p{Diacritic}+/gu,'');
TS
)"

maybe_write "src/lib/dataSources.ts" "$(cat <<'TS'
// @ts-nocheck
export const dataSources = {
  recipes: { find: (q:string)=>[] },
  analytics: { get: (k:string)=>null },
};
export default dataSources;
TS
)"

maybe_write "src/hooks/use-toast.ts" "$(cat <<'TS'
// @ts-nocheck
export type ToastOptions = { title?:string; description?:string; variant?:'default'|'destructive'|'success'|'warning' };
export function useToast(){
  const toast = (opts:ToastOptions)=> { if (typeof window !== 'undefined') console.log('[toast]', opts); };
  return { toast };
}
export function Toaster(){ return null as any; }
TS
)"

maybe_write "src/hooks/use-mobile.ts" "$(cat <<'TS'
// @ts-nocheck
import { useEffect, useState } from 'react';
export default function useMobile(breakpoint=768){
  const [isMobile,setIsMobile]=useState(typeof window!=='undefined'? window.innerWidth<breakpoint : false);
  useEffect(()=>{ const onR=()=>setIsMobile(window.innerWidth<breakpoint);
    window.addEventListener('resize', onR); return ()=>window.removeEventListener('resize', onR);
  },[breakpoint]);
  return isMobile;
}
TS
)"

# --- 5) Make sure the CSS file that @import references exists (already done above), and vite env dts exists ---
maybe_write "src/vite-env.d.ts" "/// <reference types=\"vite/client\" />"

# --- 6) Clear Vite cache and restart dev server ---
rm -rf node_modules/.vite 2>/dev/null || true
echo "🚀 restarting dev server..."
npm run dev -- --force
