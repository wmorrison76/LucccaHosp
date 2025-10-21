#!/usr/bin/env bash
set -euo pipefail

mkdir -p src/shared

make_file () {
  local name="$1"
  local file="src/shared/$name.ts"
  if [ -f "$file" ]; then
    echo "↩︎ $file already exists"
    return
  fi

  case "$name" in
    sales-pipeline-types)
cat > "$file" <<'TS'
// Lightweight sales pipeline types + defaults so the CRM UI can compile.

export interface PipelineStage {
  id: string;
  name: string;
  color?: string;
  wipLimit?: number;
}

export interface Deal {
  id: string;
  name: string;
  value: number;              // e.g., USD
  stageId: string;            // matches a PipelineStage.id
  owner?: string;
  probability?: number;       // 0..1
  createdAt?: string;
  updatedAt?: string;
  tags?: string[];
}

export interface SalesPipeline {
  stages: PipelineStage[];
  defaultProbabilities?: Record<string, number>; // by stageId
}

export const defaultHospitalityPipeline: SalesPipeline = {
  stages: [
    { id: 'new',          name: 'New Lead' },
    { id: 'qualified',    name: 'Qualified' },
    { id: 'proposal',     name: 'Proposal' },
    { id: 'negotiation',  name: 'Negotiation' },
    { id: 'won',          name: 'Closed Won' },
    { id: 'lost',         name: 'Closed Lost' },
  ],
  defaultProbabilities: {
    new: 0.05,
    qualified: 0.2,
    proposal: 0.4,
    negotiation: 0.65,
    won: 1.0,
    lost: 0.0,
  },
};

// Helpful aliases some files might import
export const defaultStages = defaultHospitalityPipeline.stages;
TS
      ;;
    time-management-types)
cat > "$file" <<'TS'
// Minimal time management types + defaults
export interface Task { id: string; title: string; status: 'todo'|'doing'|'done'; priority?: 'low'|'medium'|'high'; }
export interface TimeEntry { id: string; taskId?: string; minutes: number; date: string; note?: string; }
export const defaultTasks: Task[] = [
  { id: 't-1', title: 'Call leads', status: 'todo', priority: 'high' },
  { id: 't-2', title: 'Prepare proposal', status: 'doing' },
];
export const defaultTimeEntries: TimeEntry[] = [];
TS
      ;;
    lead-generation-types)
cat > "$file" <<'TS'
export interface LeadSource { id: string; name: string; active: boolean; }
export interface Lead { id: string; name: string; email?: string; phone?: string; sourceId?: string; score?: number; }
export const defaultLeadSources: LeadSource[] = [
  { id: 'web', name: 'Website', active: true },
  { id: 'ref', name: 'Referral', active: true },
];
TS
      ;;
    dashboard-analytics-types)
cat > "$file" <<'TS'
export interface KPI { id: string; label: string; value: number; unit?: string; trend?: 'up'|'down'|'flat'; }
export type KPISet = Record<string, KPI>;
TS
      ;;
    menu-types|menu-digitization-types)
cat > "$file" <<'TS'
export interface MenuItem { id: string; name: string; price: number; category?: string; tags?: string[]; }
export interface Menu { id: string; name: string; items: MenuItem[]; }
export const defaultMenu: Menu = { id: 'default', name: 'Default Menu', items: [] };
TS
      ;;
    mobile-app-types)
cat > "$file" <<'TS'
export interface MobileAppRelease { version: string; platform: 'ios'|'android'; notes?: string; }
TS
      ;;
    pms-integration-types)
cat > "$file" <<'TS'
export interface PMSConfig { provider: 'fidelio'|'opera'|'cloudPMS'|'other'; apiKey?: string; hotelId?: string; }
TS
      ;;
    reputation-management-types)
cat > "$file" <<'TS'
export interface Review { id: string; source: 'google'|'tripadvisor'|'yelp'|'other'; rating: number; comment?: string; date?: string; }
TS
      ;;
    sales-commission-types)
cat > "$file" <<'TS'
export interface CommissionRule { id: string; name: string; percent: number; appliesTo?: string[]; }
TS
      ;;
    ai-ml-types)
cat > "$file" <<'TS'
export interface ModelRun { id: string; model: string; createdAt: string; metrics?: Record<string, number>; }
TS
      ;;
    beo-types)
cat > "$file" <<'TS'
export interface BanquetEventOrder { id: string; client: string; date: string; attendees: number; notes?: string; }
TS
      ;;
    api)
cat > "$file" <<'TS'
export type ApiResponse<T=unknown> = { ok: true; data: T } | { ok: false; error: string };
export const ok = <T,>(data: T): ApiResponse<T> => ({ ok: true, data });
export const fail = (error: string): ApiResponse => ({ ok: false, error });
TS
      ;;
    *)
cat > "$file" <<'TS'
// Generic placeholder module for shared types
export type TODO = Record<string, any>;
export const DEFAULTS: TODO = {};
TS
      ;;
  esac

  echo "✅ created $file"
}

# Create the ones that have been erroring in your repo
LIST=(
  sales-pipeline-types
  time-management-types
  lead-generation-types
  dashboard-analytics-types
  menu-types
  menu-digitization-types
  mobile-app-types
  pms-integration-types
  reputation-management-types
  sales-commission-types
  ai-ml-types
  beo-types
  api
)

for name in "${LIST[@]}"; do
  make_file "$name"
done

# Clear Vite cache (safe) and restart
rm -rf node_modules/.vite 2>/dev/null || true
echo "🚀 restarting dev server..."
npm run dev -- --force
