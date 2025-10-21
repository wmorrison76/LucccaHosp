#!/usr/bin/env bash
set -euo pipefail

COMP_DIR="src/components"
mkdir -p "$COMP_DIR"

make_stub () {
  local name="$1"
  local file="$COMP_DIR/$name.tsx"
  if [[ -f "$file" ]]; then
    echo "↪️  exists: $file"
    return
  fi
  mkdir -p "$(dirname "$file")"
  cat > "$file" <<TSX
import React from 'react';
type Props = { className?: string } & React.HTMLAttributes<HTMLDivElement>;
export default function ${name}({ className, ...rest }: Props) {
  return <div {...rest} className={className}>${name} (stub)</div>;
}
TSX
  echo "✅ created $file"
}

# common CRM components seen in imports
list=(
  SalesPipeline DailyTodos LeadQualification EmailIntegration
  FollowUpAutomation CustomerLifecycle AISalesAssistant
  PipelineDetailsModal PipelineDetailsModalFixed RevenueDetailsModal
  EventsCalendarModal EventDetailModal ContactDetailModal
  BusinessGapAlertModal WeatherTracker WeatherTrackerSimple
  WeatherRadarMap WeatherNotificationPopup SmartInput
  MenuParser EnhancedMenuParser EnhancedBeoGenerator MenuToBeoGenerator
  MenuPerformanceReport ProductivityDashboard TimeTracking ActivityLogger
)

for c in "${list[@]}"; do make_stub "$c"; done

echo "Done. If anything else is missing, run: npm run check:imports"
