#!/usr/bin/env bash
set -euo pipefail
echo "🔧 Applying fixes…"

# helper: create a forwarder so '@/components/Name' points to actual module under CRM
forward() {
  local name="$1"
  local target="$2"
  local file="src/components/${name}.tsx"
  if [ ! -f "$file" ]; then
    mkdir -p "src/components"
    cat > "$file" <<TS
// auto-generated forwarder
export { default } from "${target}";
export * from "${target}";
TS
    echo "✅ forwarder: $file -> $target"
  fi
}

# forwarders for pages importing from "@/components/*"
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
forward "PipelineDetailsModal" "@/modules/crm/client/components/PipelineDetailsModal"
forward "PipelineDetailsModalFixed" "@/modules/crm/client/components/PipelineDetailsModalFixed"
forward "RevenueDetailsModal" "@/modules/crm/client/components/RevenueDetailsModal"
forward "EventsCalendarModal" "@/modules/crm/client/components/EventsCalendarModal"
forward "EventDetailModal" "@/modules/crm/client/components/EventDetailModal"
forward "ContactDetailModal" "@/modules/crm/client/components/ContactDetailModal"
forward "BusinessGapAlertModal" "@/modules/crm/client/components/BusinessGapAlertModal"
forward "SmartInput" "@/modules/crm/client/components/SmartInput"
forward "TimeTracking" "@/modules/crm/client/components/TimeTracking"
forward "ProductivityDashboard" "@/modules/crm/client/components/ProductivityDashboard"
forward "ActivityLogger" "@/modules/crm/client/components/ActivityLogger"
forward "ResizeObserverErrorBoundary" "@/modules/crm/client/components/ResizeObserverErrorBoundary"

# create minimal stubs for missing libs/hooks
mk() { local f="$1"; mkdir -p "$(dirname "$f")"; [ -f "$f" ] || : > "$f"; }

# weather-notification-service
cat > src/lib/weather-notification-service.ts <<'TS'
export type WeatherAlert = { id?: string; title: string; message: string; severity?: 'info'|'watch'|'warning'|'emergency' };
type Listener = (a: WeatherAlert) => void;
const listeners = new Set<Listener>();
export const weatherNotificationService = {
  subscribe(cb: Listener){ listeners.add(cb); return () => listeners.delete(cb); },
  notify(alert: WeatherAlert){ for (const cb of listeners) cb(alert); },
  buildAlert(partial: Partial<WeatherAlert>): WeatherAlert {
    return { id: partial.id ?? String(Date.now()), title: partial.title ?? 'Weather Update', message: partial.message ?? '', severity: partial.severity ?? 'info' };
  },
};
export default weatherNotificationService;
TS

# event-location-utils
cat > src/lib/event-location-utils.ts <<'TS'
export function toLatLng(input: any){ return input?.lat && input?.lng ? { lat:Number(input.lat), lng:Number(input.lng) } : { lat:0, lng:0 }; }
export function getCityFromEvent(e:any){ return e?.location?.city || e?.city || 'Unknown'; }
TS

# hooks
cat > src/hooks/use-toast.ts <<'TS'
type ToastOpts = { title?: string; description?: string; variant?: 'default'|'destructive'|'success'|'warning' };
export function useToast(){ return { toast: (_opts: ToastOpts) => {} }; }
export default useToast;
TS

cat > src/hooks/use-mobile.ts <<'TS'
import { useEffect, useState } from 'react';
export default function useMobile(breakpoint=768){
  const [isMobile, set] = useState(false);
  useEffect(()=>{ const q=window.matchMedia(`(max-width:${breakpoint}px)`); const on=()=>set(q.matches); on(); q.addEventListener?.('change',on); return ()=>q.removeEventListener?.('change',on); },[breakpoint]);
  return isMobile;
}
TS

# ResizeObserverErrorBoundary (used only for a hook in your code)
cat > src/components/ResizeObserverErrorBoundary.tsx <<'TSX'
import React from 'react';
export function useResizeObserverErrorHandler(){ return { onError: (_?:unknown)=>{} }; }
export default function ResizeObserverErrorBoundary({ children }: { children: React.ReactNode }){ return <>{children}</>; }
TSX

# fix "Duplicate declaration 'EmailIntegration'" by renaming the default export's function name
node - <<'NODE'
const fs = require('fs');
const p = 'src/modules/crm/client/components/EmailIntegration.tsx';
if (fs.existsSync(p)) {
  let s = fs.readFileSync(p,'utf8');
  const before = s;
  s = s.replace(/export\s+default\s+function\s+EmailIntegration\s*\(/, 'export default function EmailIntegrationView(');
  // also fix any internal "const EmailIntegration =" collisions
  s = s.replace(/\bconst\s+EmailIntegration\s*=/g, 'const EmailIntegrationModel =');
  s = s.replace(/\blet\s+EmailIntegration\s*=/g, 'let EmailIntegrationModel =');
  if (s !== before) {
    fs.writeFileSync(p, s);
    console.log('✅ Patched duplicate EmailIntegration declarations');
  } else {
    console.log('ℹ️ No change needed in EmailIntegration.tsx');
  }
}
NODE

# make sure index.css has Tailwind base (idempotent)
if [ -f src/index.css ]; then
  grep -q '@tailwind base;' src/index.css || sed -i '' '1s;^;@tailwind base;\n@tailwind components;\n@tailwind utilities;\n;' src/index.css 2>/dev/null || true
fi

# clear Vite cache and restart
rm -rf node_modules/.vite 2>/dev/null || true
echo "🚀 restarting dev…"
npm run dev -- --force
