#!/usr/bin/env bash
set -euo pipefail
echo "🔧 finish-line starting…"

# --- 0) ensure dev deps for Tailwind pipe ---
need=false
[ -d node_modules/tailwindcss ] || need=true
[ -d node_modules/postcss ] || need=true
[ -d node_modules/autoprefixer ] || need=true
if $need; then
  npm i -D tailwindcss postcss autoprefixer
fi

# --- 1) Tailwind/PostCSS config (idempotent) ---
if ! ls tailwind.config.* >/dev/null 2>&1; then
  cat > tailwind.config.ts <<'TS'
import type { Config } from "tailwindcss";
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx,css,html}",
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
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary:{ DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        destructive:{ DEFAULT:"hsl(var(--destructive))", foreground:"hsl(var(--destructive-foreground))" },
        muted:{ DEFAULT:"hsl(var(--muted))", foreground:"hsl(var(--muted-foreground))" },
        accent:{ DEFAULT:"hsl(var(--accent))", foreground:"hsl(var(--accent-foreground))" },
        popover:{ DEFAULT:"hsl(var(--popover))", foreground:"hsl(var(--popover-foreground))" },
        card:{ DEFAULT:"hsl(var(--card))", foreground:"hsl(var(--card-foreground))" },
      },
      borderRadius: { lg: "var(--radius)", md: "calc(var(--radius) - 2px)", sm: "calc(var(--radius) - 4px)" },
    },
  },
  plugins: [],
} satisfies Config;
TS
  echo "✅ tailwind.config.ts"
fi

if [ ! -f postcss.config.cjs ]; then
  cat > postcss.config.cjs <<'CJS'
module.exports = { plugins: { tailwindcss: {}, autoprefixer: {} } };
CJS
  echo "✅ postcss.config.cjs"
fi

mkdir -p src
[ -f src/backboard.skin.css ] || echo "/* fallback to satisfy @import if referenced */" > src/backboard.skin.css

# Ensure src/index.css has layers + tokens + border-border
if [ ! -f src/index.css ] || ! grep -q "@tailwind base;" src/index.css; then
  cat > src/index.css <<'CSS'
@tailwind base;
@tailwind components;
@tailwind utilities;

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
  echo "✅ src/index.css"
fi

CRM_CSS="src/modules/crm/client/global.css"
if [ -f "$CRM_CSS" ] && ! grep -q "@tailwind base;" "$CRM_CSS"; then
  tmp="$CRM_CSS.tmp.$$"; { echo "@tailwind base;"; echo "@tailwind components;"; echo "@tailwind utilities;"; cat "$CRM_CSS"; } > "$tmp"
  mv "$tmp" "$CRM_CSS"
  echo "✅ fixed Tailwind directives in $CRM_CSS"
fi

# --- 2) tsconfig paths -> src ---
if [ -f tsconfig.json ]; then
  node - <<'NODE'
const fs=require('fs');const p='tsconfig.json';
const j=JSON.parse(fs.readFileSync(p,'utf8'));
j.compilerOptions=j.compilerOptions||{};
j.compilerOptions.baseUrl='.';
j.compilerOptions.paths=j.compilerOptions.paths||{};
j.compilerOptions.paths['@/*']=['./src/*'];
j.compilerOptions.paths['@shared/*']=['./src/shared/*'];
fs.writeFileSync(p,JSON.stringify(j,null,2)+'\n');
console.log('✅ tsconfig.json paths ensured');
NODE
fi

# --- 3) Vite: restrict dependency scan to root index.html to stop pauses ---
if [ -f vite.config.ts ]; then
  node - <<'NODE'
const fs=require('fs');const path='vite.config.ts';
let s=fs.readFileSync(path,'utf8');
if(!/optimizeDeps\s*:\s*{/.test(s)){
  s=s.replace(/defineConfig\(\(\)\s*=>\s*\(\{/, m=>m+"\n  optimizeDeps: { entries: ['index.html'] },");
}else{
  s=s.replace(/optimizeDeps\s*:\s*\{[\s\S]*?\}/, 'optimizeDeps: { entries: [\\'index.html\\'] }');
}
if(!/build:\s*\{/.test(s)){
  s=s.replace(/defineConfig\(\(\)\s*=>\s*\(\{/, m=>m+"\n  build: { rollupOptions: { input: 'index.html' } },");
}
fs.writeFileSync(path,s);
console.log('✅ vite.config.ts: optimizeDeps.entries locked to index.html');
NODE
fi

# --- 4) Forwarders for @components/* used by CRM pages (safe if exist) ---
mk_forward(){ local name="$1" target="$2" ; local f="src/components/${name}.tsx"
if [ ! -f "$f" ]; then
  mkdir -p src/components
  printf '%s\n' "// auto-forward" "export { default } from \"${target}\";" "export * from \"${target}\";" > "$f"
  echo "➡️  forwarder created: $f -> $target"
fi
}
mk_forward ResizeObserverErrorBoundary "@/modules/crm/client/components/ResizeObserverErrorBoundary"
mk_forward SalesPipeline "@/modules/crm/client/components/SalesPipeline"
mk_forward DailyTodos "@/modules/crm/client/components/DailyTodos"
mk_forward LeadQualification "@/modules/crm/client/components/LeadQualification"
mk_forward EmailIntegration "@/modules/crm/client/components/EmailIntegration"
mk_forward FollowUpAutomation "@/modules/crm/client/components/FollowUpAutomation"
mk_forward CustomerLifecycle "@/modules/crm/client/components/CustomerLifecycle"
mk_forward AISalesAssistant "@/modules/crm/client/components/AISalesAssistant"
mk_forward WeatherTracker "@/modules/crm/client/components/WeatherTracker"
mk_forward WeatherTrackerSimple "@/modules/crm/client/components/WeatherTrackerSimple"
mk_forward WeatherRadarMap "@/modules/crm/client/components/WeatherRadarMap"
mk_forward WeatherNotificationPopup "@/modules/crm/client/components/WeatherNotificationPopup"

# --- 5) Minimal stubs for libs/hooks often imported ---
stub(){ f="$1"; shift; [ -f "$f" ] || { mkdir -p "$(dirname "$f")"; printf '%s\n' "$@" > "$f"; echo "🧩 stub: $f"; }; }
stub src/lib/weather-notification-service.ts \
'export type WeatherAlert={id?:string;title:string;message:string;severity?: "info"|"watch"|"warning"|"emergency"};' \
'type Listener=(a:WeatherAlert)=>void; const L=new Set<Listener>();' \
'export const weatherNotificationService={subscribe(cb:Listener){L.add(cb);return()=>L.delete(cb);},notify(a:WeatherAlert){for(const cb of L) cb(a);}};' \
'export default weatherNotificationService;'
stub src/lib/event-location-utils.ts \
'export const toLatLng=(x:any)=>x?.lat&&x?.lng?{lat:+x.lat,lng:+x.lng}:{lat:0,lng:0};' \
'export const getCityFromEvent=(e:any)=>e?.location?.city||e?.city||"Unknown";'
stub src/hooks/use-toast.ts \
'export function useToast(){ return { toast: (_opts:any)=>{} }; } export default useToast;'
stub src/hooks/use-mobile.ts \
"import {useEffect,useState} from 'react';export default function useMobile(b=768){const[m,s]=useState(false);useEffect(()=>{const q=window.matchMedia(\`(max-width:\${b}px)\`);const on=()=>s(q.matches);on();q.addEventListener?.('change',on);return()=>q.removeEventListener?.('change',on);},[b]);return m;}"

# --- 6) Auto-create stubs for ANY unresolved @ / @shared alias imports ---
node - <<'NODE'
const fs=require('fs'),path=require('path');
const exts=['.tsx','.ts','.jsx','.js'];
const ROOT='src';
const alias={'@':path.join(process.cwd(),'src'),'@shared':path.join(process.cwd(),'src','shared')};
function* walk(dir){ for(const e of fs.readdirSync(dir,{withFileTypes:true})){ const p=path.join(dir,e.name); if(e.isDirectory()) yield* walk(p); else if(/\.(t|j)sx?$/.test(p)) yield p; } }
function resolveAlias(spec){
  const hit=Object.keys(alias).find(a=>spec===a||spec.startsWith(a+'/')); if(!hit) return null;
  const rel=spec.slice(hit.length).replace(/^\//,'');
  return path.join(alias[hit],rel);
}
function ensureFile(p,guess){
  if(fs.existsSync(p)) return false;
  fs.mkdirSync(path.dirname(p),{recursive:true});
  if(guess==='component'){ fs.writeFileSync(p,`export default function ${path.basename(p,path.extname(p)).replace(/[^A-Za-z0-9_]/g,'_')}(){ return null }\n`); }
  else if(guess==='hook'){ fs.writeFileSync(p,`export default function ${path.basename(p,'.ts').replace(/^use/,'use') }(){ return {} as any }\n`); }
  else if(guess==='types'){ fs.writeFileSync(p,`// types stub\nexport {};\n`); }
  else { fs.writeFileSync(p,`// stub\nexport {};\n`); }
  return true;
}
let created=0;
for(const file of walk(ROOT)){
  const text=fs.readFileSync(file,'utf8');
  const specs=[...text.matchAll(/from\s+['"]([^'"]+)['"]/g),...text.matchAll(/import\(\s*['"]([^'"]+)['"]\s*\)/g)].map(m=>m[1]);
  for(const s of specs){
    const tgt=resolveAlias(s); if(!tgt) continue;
    // Try file.tsx/.ts/.jsx/.js, or index.*
    let hit=null;
    for(const e of exts){ if(fs.existsSync(tgt+e)){ hit=tgt+e; break; } }
    if(!hit){
      for(const e of exts){ if(fs.existsSync(path.join(tgt,'index'+e))){ hit=path.join(tgt,'index'+e); break; } }
    }
    if(hit) continue;
    // create stub with a best-guess shape
    let guess='lib';
    if(/components?\//i.test(tgt)) guess='component';
    else if(/hooks?\//i.test(tgt)) guess='hook';
    else if(/shared\/.*-types$/i.test(tgt) || /\/types$/i.test(tgt)) { guess='types'; }
    const out = tgt + (guess==='component' ? '.tsx' : '.ts');
    if(ensureFile(out,guess)) { created++; console.log('🆕 stubbed', path.relative(process.cwd(), out)); }
  }
}
console.log(created?`✅ created ${created} stub(s)`:'ℹ️ no new stubs needed');
NODE

# --- 7) Sanitize stray error lines that broke TSX/JSX ---
node - <<'NODE'
const fs=require('fs'),path=require('path');
function* walk(dir){ for(const e of fs.readdirSync(dir,{withFileTypes:true})){ const p=path.join(dir,e.name); if(e.isDirectory()) yield* walk(p); else if(/\.(t|j)sx?$|\.css$|\.html$/.test(p)) yield p; } }
for(const f of walk('src')){
  let s=fs.readFileSync(f,'utf8'); const b=s;
  s=s.replace(/^(\[plugin:[^\n]*\].*\n)+/g,'');
  s=s.replace(/^\/Users\/[^\n]*\n/g,'');
  if(b!==s){ fs.writeFileSync(f,s); console.log('🧹 sanitized', f); }
}
NODE

# --- 8) Patch EmailIntegration dup (robust idempotent) ---
if [ -f src/modules/crm/client/components/EmailIntegration.tsx ]; then
  node - <<'NODE'
const fs=require('fs');const p='src/modules/crm/client/components/EmailIntegration.tsx';
let s=fs.readFileSync(p,'utf8'),b=s;
s=s.replace(/\btype\s+EmailIntegration\b/g,'type EmailService');
s=s.replace(/\binterface\s+EmailIntegration\b/g,'interface EmailService');
s=s.replace(/<\s*EmailIntegration(\s*[\[>])/g,'<EmailService$1');
s=s.replace(/:\s*EmailIntegration(\s*[\]|,;})])/g,': EmailService$1');
s=s.replace(/\bconst\s+EmailIntegration\s*=/g,'const EmailIntegrationModel =');
s=s.replace(/\blet\s+EmailIntegration\s*=/g,'let EmailIntegrationModel =');
s=s.replace(/\bclass\s+EmailIntegration\b/g,'class EmailIntegrationModel');
s=s.replace(/export\s+default\s+function\s+EmailIntegration\s*\(/,'export default function EmailIntegrationView(');
s=s.replace(/export\s+default\s+EmailIntegration\s*;/,'export default EmailIntegrationView;');
if(s!==b){ fs.writeFileSync(p,s); console.log('✅ patched EmailIntegration duplicate'); }
else{ console.log('ℹ️ EmailIntegration already OK'); }
NODE
fi

# --- 9) Clear vite cache & start dev ---
rm -rf node_modules/.vite 2>/dev/null || true
echo "🚀 starting dev (force)…"
npm run dev -- --force
