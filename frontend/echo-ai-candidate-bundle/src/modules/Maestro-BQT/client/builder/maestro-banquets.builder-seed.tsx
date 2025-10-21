/* ============================================================================
 * Maestro Banquets — (Single-File)
 * One file to register components, define models, theme tokens, and a default
 * /client/builder/maestro-banquets.builder-seed.tsx
 *
 * Requirements:
 *   pnpm install @builder.io/react react-konva konva zustand
 *   Ensure Tailwind (optional) loads CSS vars; see token section comments.
 * ========================================================================== */

import * as React from 'react';
import { useMemo } from 'react';
import { BEOBuilderPanel } from '../components/panels/BEOBuilderPanel';
import { BEOREOEditorPanel } from '../components/panels/BEOREOEditorPanel';
import { MenuRecipePanel } from '../components/panels/MenuRecipePanel';
import { TimelinePanel } from '../components/panels/TimelinePanel';
import { MaestroDashboardPanel } from '../components/panels/MaestroDashboardPanel';
import { SeatingPlannerPanel } from '../components/panels/SeatingPlannerPanel';
import { ExecutionConsolePanel } from '../components/panels/ExecutionConsolePanel';
import { FinancePnlPanel } from '../components/panels/FinancePnlPanel';
import { BeveragePlannerPanel } from '../components/panels/BeveragePlannerPanel';
import { NutritionAllergenPanel } from '../components/panels/NutritionAllergenPanel';
import { SectionPlannerPanel } from '../components/panels/SectionPlannerPanel';
import { FiringOrderPanel } from '../components/panels/FiringOrderPanel';
import { CaptainConsolePanel } from '../components/panels/CaptainConsolePanel';
import { ChefLaunchBoardPanel } from '../components/panels/ChefLaunchBoardPanel';

/* ----------------------------------------------------------------------------
 * 0) Theme Tokens (Apple Light / TRON Dark)
 * ----------------------------------------------------------------------------
 * These tokens are now defined in client/global.css
 * ---------------------------------------------------------------------------- */

/* ----------------------------------------------------------------------------
 * 1) Types (trimmed to essentials used by the seed)
 * ---------------------------------------------------------------------------- */
type ReasonCode =
  | 'kitchen_delay' | 'bar_queue' | 'late_vip' | 'room_flip' | 'vendor_late'
  | 'equipment_issue' | 'weather' | 'floor_congestion' | 'plating_bottleneck'
  | 'speech_overrun' | 'other';

export type PanelType =
  | 'BEOBuilder'
  | 'BEOREOEditor'
  | 'MenuRecipe'
  | 'Timeline'
  | 'MaestroDashboard'
  | 'SeatingPlanner'
  | 'CapacityAnalyzer'
  | 'LayoutDesigner'
  | 'ServiceStyle'
  | 'BeveragePlanner'
  | 'NutritionAllergen'
  | 'Sustainability'
  | 'PurchasingVendors'
  | 'FinancePnlCashflow'
  | 'ExecutionConsole'
  | 'PostEventQAWizard'
  | 'VendorRisk'
  | 'ForecastSignals'
  | 'ExecutiveDashboards'
  | 'SectionPlanner'
  | 'FiringOrder'
  | 'CaptainConsole'
  | 'ChefLaunchBoard';

interface TimelinePhase {
  id: string;
  phase: string;
  plannedAt?: string;
  plannedDurationMin?: number;
  actualAt?: string;
  actualDurationMin?: number;
  varianceMin?: number;
  reason?: ReasonCode;
  notes?: string;
}

interface BanquetEventLite {
  id: string;
  title?: string;
  guestCount?: number;
  serviceStyle?: string;
  timelinePlan?: TimelinePhase[];
  timelineActual?: TimelinePhase[];
}

/* ----------------------------------------------------------------------------
 * 2) Minimal Panel Shell (Apple glass in light / TRON glow in dark)
 * ---------------------------------------------------------------------------- */
export const PanelShell: React.FC<{
  title?: string;
  children?: React.ReactNode;
  toolbarRight?: React.ReactNode;
}> = ({ title = 'Panel', children, toolbarRight }) => {
  return (
    <div className="glass-panel-elevated p-6 animate-panel-fade-in neon-glow">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {/* Apple-style dots */}
          <div className="window-controls">
            <div className="window-dot close"></div>
            <div className="window-dot minimize"></div>
            <div className="window-dot maximize"></div>
          </div>
          <h2 className="text-lg font-semibold text-primary">{title}</h2>
        </div>
        <div className="flex items-center gap-2">
          {toolbarRight}
        </div>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};

/* ----------------------------------------------------------------------------
 * 3) Unified Panel (MBQTPanel) — one component handles all panel types
 *    Later you can split each case into a dedicated real component/file.
 * ---------------------------------------------------------------------------- */
export const MBQTPanel: React.FC<{
  eventId?: string;
  roomId?: string;
  panelType: PanelType;
}> = ({ panelType, eventId, roomId }) => {
  const header = useMemo(() => {
    switch (panelType) {
      case 'BEOBuilder': return 'BEO Builder';
      case 'SeatingPlanner': return 'Seating Planner';
      case 'CapacityAnalyzer': return 'Capacity Analyzer';
      case 'LayoutDesigner': return 'Layout Designer';
      case 'ServiceStyle': return 'Service Style';
      case 'BeveragePlanner': return 'Beverage Planner';
      case 'NutritionAllergen': return 'Nutrition & Allergen';
      case 'Sustainability': return 'Sustainability';
      case 'PurchasingVendors': return 'Purchasing & Vendors';
      case 'FinancePnlCashflow': return 'Finance: P&L & Cashflow';
      case 'ExecutionConsole': return 'Execution Timeline';
      case 'PostEventQAWizard': return 'Post-Event QA Wizard';
      case 'VendorRisk': return 'Vendor Risk';
      case 'ForecastSignals': return 'Forecast Signals';
      case 'ExecutiveDashboards': return 'Executive Dashboards';
      default: return 'Panel';
    }
  }, [panelType]);

  // Panel implementation component
  const PanelImplementation: React.FC<{ label: string }> = ({ label }) => (
    <div className="p-8 text-center space-y-6">
      <div className="space-y-2">
        <div className="text-2xl font-semibold text-primary">{label}</div>
        <div className="text-muted-foreground">Advanced Event Management Panel</div>
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto text-sm">
        <div className="p-3 bg-accent/50 rounded-lg">
          <div className="font-medium">Event ID</div>
          <div className="text-muted-foreground">{eventId || 'Global'}</div>
        </div>
        <div className="p-3 bg-accent/50 rounded-lg">
          <div className="font-medium">Room</div>
          <div className="text-muted-foreground">{roomId || 'All Areas'}</div>
        </div>
      </div>

      <div className="max-w-lg mx-auto p-6 glass-panel rounded-lg">
        <h3 className="font-medium mb-3">Panel Features</h3>
        <div className="space-y-2 text-sm text-muted-foreground text-left">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span>Real-time event coordination</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span>GIO precision standards (.00005 accuracy)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span>Integrated BEO management</span>
          </div>
        </div>
      </div>
    </div>
  );

  const ToolbarButton: React.FC<{ children: React.ReactNode; onClick?: () => void }> = ({ children, onClick }) => (
    <button
      onClick={onClick}
      className="px-3 py-1.5 text-sm font-medium rounded-lg bg-panel border border-default hover:bg-accent hover:text-white transition-colors"
    >
      {children}
    </button>
  );

  const toolbarRight = (
    <div className="flex gap-2">
      <ToolbarButton>⚙️</ToolbarButton>
      <ToolbarButton>📊</ToolbarButton>
      <ToolbarButton>💾</ToolbarButton>
    </div>
  );

  // Use specialized panel components for implemented panels
  switch (panelType) {
    case 'BEOBuilder':
      return <BEOBuilderPanel eventId={eventId} />;

    case 'BEOREOEditor':
      return <BEOREOEditorPanel eventId={eventId} />;

    case 'MenuRecipe':
      return <MenuRecipePanel eventId={eventId} />;

    case 'Timeline':
      return <TimelinePanel eventId={eventId} />;

    case 'MaestroDashboard':
      return <MaestroDashboardPanel eventId={eventId} />;

    case 'SeatingPlanner':
      return <SeatingPlannerPanel eventId={eventId} roomId={roomId} />;

    case 'ExecutionConsole':
      return <ExecutionConsolePanel eventId={eventId} />;

    case 'FinancePnlCashflow':
      return <FinancePnlPanel eventId={eventId} />;

    case 'BeveragePlanner':
      return <BeveragePlannerPanel eventId={eventId} />;

    case 'NutritionAllergen':
      return <NutritionAllergenPanel eventId={eventId} />;

    case 'SectionPlanner':
      return <SectionPlannerPanel eventId={eventId} />;

    case 'FiringOrder':
      return <FiringOrderPanel eventId={eventId} />;

    case 'CaptainConsole':
      return <CaptainConsolePanel eventId={eventId} />;

    case 'ChefLaunchBoard':
      return <ChefLaunchBoardPanel eventId={eventId} />;

    default:
      // For unimplemented panels, show the panel implementation
      return (
        <PanelShell title={header} toolbarRight={toolbarRight}>
          <PanelImplementation label={header} />
        </PanelShell>
      );
  }
};

/* ----------------------------------------------------------------------------
 * 4) Theme Toggle Component
 * ---------------------------------------------------------------------------- */
export const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');

  React.useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded-lg bg-panel border border-default hover:bg-accent hover:text-white transition-all duration-300"
    >
      {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
    </button>
  );
};

/* ----------------------------------------------------------------------------
 * 5) Main Workspace Layout
 * ---------------------------------------------------------------------------- */
export const BanquetsWorkspace: React.FC<{
  panels?: Array<{
    panelType: PanelType;
    eventId?: string;
    roomId?: string;
    x?: number;
    y?: number;
    w?: number;
    h?: number;
  }>;
}> = ({ panels = [] }) => {
  const defaultPanels = panels.length > 0 ? panels : [
    { panelType: 'MaestroDashboard' as PanelType, eventId: 'ev-demo-001' },
    { panelType: 'BEOBuilder' as PanelType, eventId: 'ev-demo-001' },
    { panelType: 'SeatingPlanner' as PanelType, eventId: 'ev-demo-001', roomId: 'rm-01' },
    { panelType: 'ExecutionConsole' as PanelType, eventId: 'ev-demo-001' },
    { panelType: 'FinancePnlCashflow' as PanelType, eventId: 'ev-demo-001' },
  ];

  return (
    <div className="min-h-screen p-6 space-y-6" style={{ background: 'var(--bg)' }}>
      {/* Header */}
      <div className="glass-panel p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-primary">Maestro Banquets</h1>
            <div className="text-sm text-muted">Workspace</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm text-muted">Demo Event: Wedding Reception</div>
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Panel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {defaultPanels.map((panel, index) => (
          <MBQTPanel
            key={`${panel.panelType}-${index}`}
            panelType={panel.panelType}
            eventId={panel.eventId}
            roomId={panel.roomId}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="glass-panel p-4 text-center text-sm text-muted">
        <p>Maestro Banquets — Event Management Platform</p>
        <p className="mt-1">Built with Builder.io, React, and Tailwind CSS</p>
      </div>
    </div>
  );
};

/* ----------------------------------------------------------------------------
 * 6) Builder Component Registration
 * ---------------------------------------------------------------------------- */
Builder.registerComponent(PanelShell, {
  name: 'MBQT:PanelShell',
  inputs: [
    { name: 'title', type: 'string', defaultValue: 'Untitled Panel' },
    { name: 'toolbarRight', type: 'uiBlocks' },
  ],
});

Builder.registerComponent(MBQTPanel, {
  name: 'MBQT:Panel',
  inputs: [
    {
      name: 'panelType',
      type: 'string',
      enum: [
        'BEOBuilder',
        'BEOREOEditor',
        'MenuRecipe',
        'Timeline',
        'MaestroDashboard',
        'SeatingPlanner',
        'CapacityAnalyzer',
        'LayoutDesigner',
        'ServiceStyle',
        'BeveragePlanner',
        'NutritionAllergen',
        'Sustainability',
        'PurchasingVendors',
        'FinancePnlCashflow',
        'ExecutionConsole',
        'PostEventQAWizard',
        'VendorRisk',
        'ForecastSignals',
        'ExecutiveDashboards',
        'SectionPlanner',
        'FiringOrder',
        'CaptainConsole',
        'ChefLaunchBoard',
      ],
      defaultValue: 'BEOBuilder',
      required: true,
    },
    { name: 'eventId', type: 'string' },
    { name: 'roomId', type: 'string' },
  ],
});

Builder.registerComponent(BanquetsWorkspace, {
  name: 'MBQT:Workspace',
  inputs: [
    {
      name: 'panels',
      type: 'list',
      subFields: [
        {
          name: 'panelType',
          type: 'string',
          enum: [
            'BEOBuilder',
            'BEOREOEditor',
            'MenuRecipe',
            'Timeline',
            'MaestroDashboard',
            'SeatingPlanner',
            'CapacityAnalyzer',
            'LayoutDesigner',
            'ServiceStyle',
            'BeveragePlanner',
            'NutritionAllergen',
            'Sustainability',
            'PurchasingVendors',
            'FinancePnlCashflow',
            'ExecutionConsole',
            'PostEventQAWizard',
            'VendorRisk',
            'ForecastSignals',
            'ExecutiveDashboards',
            'SectionPlanner',
            'FiringOrder',
            'CaptainConsole',
            'ChefLaunchBoard',
          ],
        },
        { name: 'eventId', type: 'string' },
        { name: 'roomId', type: 'string' },
        { name: 'x', type: 'number' },
        { name: 'y', type: 'number' },
        { name: 'w', type: 'number' },
        { name: 'h', type: 'number' },
      ],
    },
  ],
});

Builder.registerComponent(ThemeToggle, {
  name: 'MBQT:ThemeToggle',
  inputs: [],
});

/* ----------------------------------------------------------------------------
 * 7) Builder Models (JSON you can import in Builder dashboard if desired)
 *    You can also POST these via Builder API; we export them here for convenience.
 * ---------------------------------------------------------------------------- */
export const BUILDER_MODEL_banquets_workspace = {
  name: 'banquets_workspace',
  kind: 'page',
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'layoutZones',
      type: 'list',
      subFields: [{ name: 'zone', type: 'text' }],
      helperText: 'Topbar, LeftDock, Canvas',
    },
    {
      name: 'defaultPanels',
      type: 'list',
      subFields: [
        { name: 'panelType', type: 'text' },
        { name: 'x', type: 'number' }, { name: 'y', type: 'number' },
        { name: 'w', type: 'number' }, { name: 'h', type: 'number' },
        { name: 'props', type: 'json' },
      ],
    },
    { name: 'theme', type: 'text', enum: ['light', 'dark'], defaultValue: 'light' },
  ],
};

export const BUILDER_MODEL_banquets_panel = {
  name: 'banquets_panel',
  kind: 'data',
  fields: [
    { name: 'panelType', type: 'text', required: true },
    { name: 'props', type: 'json' },
    { name: 'position', type: 'json' }, // {x,y,w,h}
    { name: 'locked', type: 'boolean', defaultValue: false },
  ],
};

export const BUILDER_MODEL_banquets_theme_tokens = {
  name: 'banquets_theme_tokens',
  kind: 'data',
  fields: [
    { name: 'brand', type: 'text' },
    { name: 'lightTokens', type: 'json' },
    { name: 'darkTokens', type: 'json' },
  ],
};

/* ----------------------------------------------------------------------------
 * 8) Default Workspace Content (Builder page content for /banquets)
 * ----------------------------------------------------------------------------
 * After importing the models, you can create a page with this content payload.
 * In your BanquetsWorkspace route, fetch it with builder.get('banquets_workspace', { url:'/banquets' })
 * and render via <BuilderComponent model="banquets_workspace" content={content} />
 * ---------------------------------------------------------------------------- */
export const DEFAULT_WORKSPACE_CONTENT = {
  data: {
    title: 'Maestro Banquets Workspace',
    layoutZones: [{ zone: 'topbar' }, { zone: 'leftdock' }, { zone: 'canvas' }],
    theme: 'light',
    defaultPanels: [
      // x,y,w,h are conceptual (24-col grid). Adjust to your grid system.
      { panelType: 'MaestroDashboard', x: 0, y: 0, w: 24, h: 16, props: { eventId: 'ev-demo-001' } },
      { panelType: 'BEOBuilder', x: 0, y: 16, w: 12, h: 12, props: { eventId: 'ev-demo-001' } },
      { panelType: 'SeatingPlanner', x: 12, y: 0, w: 12, h: 12, props: { eventId: 'ev-demo-001', roomId: 'rm-01' } },
      { panelType: 'ExecutionConsole', x: 0, y: 12, w: 16, h: 10, props: { eventId: 'ev-demo-001' } },
      { panelType: 'FinancePnlCashflow', x: 16, y: 12, w: 8, h: 10, props: { eventId: 'ev-demo-001' } },
      { panelType: 'BeveragePlanner', x: 0, y: 22, w: 12, h: 10, props: { eventId: 'ev-demo-001' } },
      { panelType: 'NutritionAllergen', x: 12, y: 22, w: 12, h: 10, props: { eventId: 'ev-demo-001' } },
      { panelType: 'Sustainability', x: 0, y: 32, w: 12, h: 10, props: { eventId: 'ev-demo-001' } },
      { panelType: 'PurchasingVendors', x: 12, y: 32, w: 12, h: 10, props: { eventId: 'ev-demo-001' } },
      { panelType: 'PostEventQAWizard', x: 0, y: 42, w: 12, h: 10, props: { eventId: 'ev-demo-001' } },
      { panelType: 'ExecutiveDashboards', x: 12, y: 42, w: 12, h: 10, props: {} },
    ],
  },
  blocks: [
    // A very simple "canvas" that drops MBQT panels in a vertical stack.
    {
      '@type': '@builder.io/sdk:Element',
      component: { name: 'Core:Fragment' },
      responsiveStyles: {
        large: { display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px' },
      },
      children: [
        {
          '@type': '@builder.io/sdk:Element',
          component: { name: 'MBQT:Panel' },
          bindings: { 'component.options.panelType': '"BEOBuilder"' },
          options: { panelType: 'BEOBuilder', eventId: 'ev-demo-001' },
        },
        {
          '@type': '@builder.io/sdk:Element',
          component: { name: 'MBQT:Panel' },
          options: { panelType: 'SeatingPlanner', eventId: 'ev-demo-001', roomId: 'rm-01' },
        },
        {
          '@type': '@builder.io/sdk:Element',
          component: { name: 'MBQT:Panel' },
          options: { panelType: 'ExecutionConsole', eventId: 'ev-demo-001' },
        },
        {
          '@type': '@builder.io/sdk:Element',
          component: { name: 'MBQT:Panel' },
          options: { panelType: 'FinancePnlCashflow', eventId: 'ev-demo-001' },
        },
        {
          '@type': '@builder.io/sdk:Element',
          component: { name: 'MBQT:Panel' },
          options: { panelType: 'BeveragePlanner', eventId: 'ev-demo-001' },
        },
        {
          '@type': '@builder.io/sdk:Element',
          component: { name: 'MBQT:Panel' },
          options: { panelType: 'NutritionAllergen', eventId: 'ev-demo-001' },
        },
        {
          '@type': '@builder.io/sdk:Element',
          component: { name: 'MBQT:Panel' },
          options: { panelType: 'Sustainability', eventId: 'ev-demo-001' },
        },
        {
          '@type': '@builder.io/sdk:Element',
          component: { name: 'MBQT:Panel' },
          options: { panelType: 'PurchasingVendors', eventId: 'ev-demo-001' },
        },
        {
          '@type': '@builder.io/sdk:Element',
          component: { name: 'MBQT:Panel' },
          options: { panelType: 'PostEventQAWizard', eventId: 'ev-demo-001' },
        },
        {
          '@type': '@builder.io/sdk:Element',
          component: { name: 'MBQT:Panel' },
          options: { panelType: 'ExecutiveDashboards' },
        },
      ],
    },
  ],
};

/* ----------------------------------------------------------------------------
 * 9) Helper: register everything (call once in app bootstrap)
 * ---------------------------------------------------------------------------- */
export function registerMaestroBanquetsWithBuilder() {
  // This file already called Builder.registerComponent(...) above.
  // You can also push models/content to Builder via API if you wish.
}

/* ----------------------------------------------------------------------------
 * 10) Usage notes
 * ----------------------------------------------------------------------------
 * 1) Import this file in your app startup (e.g., main.tsx or App.tsx):
 *      import { registerMaestroBanquetsWithBuilder } from '@/builder/maestro-banquets.builder-seed';
 *      registerMaestroBanquetsWithBuilder();
 *
 * 2) In your /banquets route component, fetch page content and render:
 *
 *    import { builder } from '@builder.io/react';
 *    builder.init('YOUR_PUBLIC_API_KEY');
 *
 *    export default function BanquetsWorkspace() {
 *      const [content, setContent] = React.useState(null);
 *      React.useEffect(() => {
 *        builder.get('banquets_workspace', { url: '/banquets' }).toPromise().then(setContent);
 *      }, []);
 *      React.useEffect(() => {
 *        document.body.setAttribute('data-theme', (content?.data?.theme ?? 'light'));
 *      }, [content]);
 *      return <BuilderComponent model="banquets_workspace" content={content} />;
 *    }
 *
 * 3) Theme toggle: set [data-theme="light"|"dark"] on <body>.
 *
 * 4) Replace MBQTPanel placeholders with real panel implementations over time.
 *    Keep the Builder registration name ('MBQT:Panel') or add new components
 *    and register them separately as they mature.
 * ---------------------------------------------------------------------------- */
