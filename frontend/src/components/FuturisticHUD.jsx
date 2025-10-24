import React, { useState, useEffect, useRef, useMemo } from 'react';
import * as RND_NS from 'react-rnd';
const Rnd = RND_NS.Rnd ?? RND_NS.default ?? RND_NS;

import {
  Plus, X, Pin, PinOff, Settings, RotateCcw, Zap, Eye, EyeOff,
  TrendingUp, AlertTriangle, Activity, BarChart3, Clock, Users,
  DollarSign, ChefHat, Smartphone, Video, MapPin, Wind
} from 'lucide-react';

const LS_KEY = 'luccca:hud:config:v1';
const LS_WIDGETS = 'luccca:hud:widgets:v1';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// WIDGET REGISTRY - Define all available widgets
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const WIDGET_REGISTRY = {
  // AI Financial Module
  'ai-cpa': {
    name: 'Master CPA AI',
    icon: DollarSign,
    color: '#00d9ff',
    category: 'AI Finance',
    size: { w: 2, h: 1.5 },
    description: 'AI-powered financial analysis with 10-day trend prediction',
  },
  'ai-operations': {
    name: 'Operations AI',
    icon: Activity,
    color: '#00ff88',
    category: 'AI Operations',
    size: { w: 2, h: 1.5 },
    description: 'Real-time kitchen & service monitoring with predictions',
  },
  'ai-chef': {
    name: 'Chef Expert AI',
    icon: ChefHat,
    color: '#ffc844',
    category: 'AI Expert',
    size: { w: 1.5, h: 1.5 },
    description: 'Master chef & pastry chef guidance & recommendations',
  },

  // Real-Time Operations
  'orders-live': {
    name: 'Live Orders',
    icon: Zap,
    color: '#ff4d7d',
    category: 'Operations',
    size: { w: 1.5, h: 1.5 },
    description: 'Table orders, guest info, kitchen status',
  },
  'kpi-covers': {
    name: "Today's Covers",
    icon: Users,
    color: '#00d9ff',
    category: 'KPIs',
    size: { w: 1, h: 1 },
    description: 'Guest count with trending',
  },
  'kpi-revenue': {
    name: 'Revenue',
    icon: DollarSign,
    color: '#4dff9e',
    category: 'KPIs',
    size: { w: 1, h: 1 },
    description: 'Real-time revenue tracking',
  },
  'kpi-labor': {
    name: 'Labor Cost %',
    icon: Users,
    color: '#00ff88',
    category: 'KPIs',
    size: { w: 1, h: 1 },
    description: 'Labor cost percentage vs target',
  },
  'kpi-food': {
    name: 'Food Cost %',
    icon: BarChart3,
    color: '#ff6b4d',
    category: 'KPIs',
    size: { w: 1, h: 1 },
    description: 'Food cost percentage vs target',
  },

  // Monitoring & Insights
  'cctv-kitchen': {
    name: 'Kitchen View',
    icon: Video,
    color: '#b84dff',
    category: 'CCTV',
    size: { w: 1.5, h: 1.5 },
    description: 'Kitchen CCTV feed & activity',
  },
  'cctv-dining': {
    name: 'Dining Room',
    icon: MapPin,
    color: '#4dbaff',
    category: 'CCTV',
    size: { w: 1.5, h: 1.5 },
    description: 'Dining room CCTV & guest engagement',
  },
  'alerts-anomaly': {
    name: 'Smart Alerts',
    icon: AlertTriangle,
    color: '#ff6b4d',
    category: 'Alerts',
    size: { w: 1.5, h: 1 },
    description: 'AI-detected anomalies & red flags',
  },
  'trends-forecast': {
    name: 'Predictive Trends',
    icon: TrendingUp,
    color: '#00ff88',
    category: 'Analytics',
    size: { w: 2, h: 1 },
    description: '10-day trend forecast & patterns',
  },

  // Communications & Insights
  'comms-ai': {
    name: 'AI Communications',
    icon: Smartphone,
    color: '#ffc844',
    category: 'AI',
    size: { w: 1.5, h: 1.5 },
    description: 'AI-powered communication insights',
  },
  'schedule-staff': {
    name: 'Staff Schedule',
    icon: Clock,
    color: '#4dbaff',
    category: 'Operations',
    size: { w: 1.5, h: 1 },
    description: 'Live staff scheduling & breaks',
  },
  'inventory-status': {
    name: 'Inventory',
    icon: Wind,
    color: '#00d9ff',
    category: 'Operations',
    size: { w: 1.5, h: 1 },
    description: 'Real-time inventory levels',
  },
};

// Default widgets to load on first run
const DEFAULT_WIDGETS = [
  'ai-cpa',
  'ai-operations',
  'orders-live',
  'kpi-covers',
  'kpi-revenue',
  'kpi-labor',
  'kpi-food',
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MAIN HUD COMPONENT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export default function FuturisticHUD() {
  const containerRef = useRef(null);
  const [widgets, setWidgets] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(LS_WIDGETS));
      return saved && Array.isArray(saved) && saved.length > 0 ? saved : DEFAULT_WIDGETS;
    } catch {
      return DEFAULT_WIDGETS;
    }
  });

  const [positions, setPositions] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(LS_KEY)) || {};
    } catch {
      return {};
    }
  });

  const [showSettings, setShowSettings] = useState(false);
  const [z, setZ] = useState(10);
  const [fullscreen, setFullscreen] = useState(true);

  // Persist changes
  useEffect(() => {
    localStorage.setItem(LS_WIDGETS, JSON.stringify(widgets));
  }, [widgets]);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(positions));
  }, [positions]);

  const addWidget = (widgetId) => {
    if (!widgets.includes(widgetId)) {
      setWidgets(w => [...w, widgetId]);
    }
    setShowSettings(false);
  };

  const removeWidget = (widgetId) => {
    setWidgets(w => w.filter(id => id !== widgetId));
  };

  const reset = () => {
    setWidgets(DEFAULT_WIDGETS);
    setPositions({});
  };

  const bringToFront = (id) => {
    setZ(n => n + 1);
  };

  const updatePosition = (id, data) => {
    setPositions(p => ({ ...p, [id]: data }));
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full flex flex-col transition-all duration-300 ${
        fullscreen ? 'overflow-hidden' : 'overflow-auto'
      }`}
      style={{
        background: 'radial-gradient(1400px 700px at 40% -15%, rgba(0, 217, 255, 0.08), transparent 65%), ' +
                    'radial-gradient(1000px 600px at 85% 5%, rgba(255, 77, 125, 0.06), transparent 70%), ' +
                    'linear-gradient(180deg, rgba(15, 28, 42, 0.4) 0%, rgba(10, 20, 35, 0.6) 100%)',
      }}
    >
      {/* HEADER */}
      <HUDHeader
        showSettings={showSettings}
        onToggleSettings={() => setShowSettings(!showSettings)}
        onFullscreen={() => setFullscreen(!fullscreen)}
        onReset={reset}
        fullscreen={fullscreen}
      />

      {/* SETTINGS PANEL */}
      {showSettings && (
        <HUDSettings
          availableWidgets={WIDGET_REGISTRY}
          activeWidgets={widgets}
          onAddWidget={addWidget}
          onRemoveWidget={removeWidget}
          onClose={() => setShowSettings(false)}
        />
      )}

      {/* WIDGETS AREA */}
      <div className="flex-1 relative overflow-auto" style={{ pointerEvents: 'auto' }}>
        <div className="relative w-full h-full" style={{ minHeight: '100%' }}>
          {widgets.map(widgetId => {
            const config = WIDGET_REGISTRY[widgetId];
            if (!config) return null;

            const pos = positions[widgetId] || {
              x: Math.random() * 200,
              y: Math.random() * 100,
              w: 350,
              h: 250,
            };

            return (
              <Rnd
                key={widgetId}
                position={{ x: pos.x, y: pos.y }}
                size={{ width: pos.w, height: pos.h }}
                minWidth={240}
                minHeight={160}
                bounds="parent"
                enableResizing
                onDragStart={() => bringToFront(widgetId)}
                onDragStop={(_, d) => updatePosition(widgetId, { ...pos, x: d.x, y: d.y })}
                onResizeStop={(_, __, ref, ___, p) => {
                  updatePosition(widgetId, {
                    ...pos,
                    x: p.x,
                    y: p.y,
                    w: ref.offsetWidth,
                    h: ref.offsetHeight,
                  });
                }}
                style={{ zIndex: (pos.z || 10) }}
                dragHandleClassName="widget-handle"
              >
                <HUDWidget
                  id={widgetId}
                  config={config}
                  onRemove={() => removeWidget(widgetId)}
                  onBringToFront={() => {
                    bringToFront(widgetId);
                    updatePosition(widgetId, { ...pos, z: z + 1 });
                  }}
                />
              </Rnd>
            );
          })}
        </div>
      </div>

      <style>{`
        .widget-handle { cursor: grab; }
        .widget-handle:active { cursor: grabbing; }
      `}</style>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// HEADER COMPONENT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function HUDHeader({ showSettings, onToggleSettings, onFullscreen, onReset, fullscreen }) {
  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <div
      className="flex-shrink-0 border-b border-cyan-400/20 px-6 py-4 flex items-center justify-between"
      style={{
        background: 'linear-gradient(90deg, rgba(15, 28, 42, 0.8), rgba(10, 20, 35, 0.8))',
        backdropFilter: 'blur(20px)',
      }}
    >
      <div className="flex items-center gap-4">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-black text-cyan-300">🚀</span>
          <h1 className="text-xl font-black bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
            LUCCCA Operations HUD
          </h1>
        </div>
        <div className="text-xs text-cyan-400/60 font-mono border border-cyan-400/20 px-2 py-1 rounded">
          {timeStr}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onReset}
          className="p-2 hover:bg-white/10 rounded transition-all text-cyan-300 hover:text-cyan-100"
          title="Reset layout"
        >
          <RotateCcw size={16} />
        </button>
        <button
          onClick={onToggleSettings}
          className={`p-2 rounded transition-all ${
            showSettings
              ? 'bg-cyan-400/20 text-cyan-200'
              : 'hover:bg-white/10 text-cyan-300 hover:text-cyan-100'
          }`}
          title="Widget settings"
        >
          <Settings size={16} />
        </button>
        <button
          onClick={onFullscreen}
          className="p-2 hover:bg-white/10 rounded transition-all text-cyan-300 hover:text-cyan-100"
          title={fullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
        >
          {fullscreen ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SETTINGS PANEL
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function HUDSettings({ availableWidgets, activeWidgets, onAddWidget, onRemoveWidget, onClose }) {
  const categories = [...new Set(Object.values(availableWidgets).map(w => w.category))].sort();

  return (
    <div
      className="flex-shrink-0 border-b border-cyan-400/20 max-h-[40vh] overflow-auto"
      style={{
        background: 'linear-gradient(90deg, rgba(0, 217, 255, 0.05), rgba(0, 217, 255, 0.02))',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-cyan-300">Available Widgets</h2>
          <button onClick={onClose} className="text-cyan-400/60 hover:text-cyan-300">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          {categories.map(category => (
            <div key={category}>
              <h3 className="text-xs font-bold uppercase text-cyan-400/70 mb-2">{category}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                {Object.entries(availableWidgets)
                  .filter(([_, w]) => w.category === category)
                  .map(([id, widget]) => {
                    const isActive = activeWidgets.includes(id);
                    return (
                      <button
                        key={id}
                        onClick={() =>
                          isActive ? onRemoveWidget(id) : onAddWidget(id)
                        }
                        className={`p-2 rounded border transition-all text-xs font-semibold ${
                          isActive
                            ? 'border-cyan-400/60 bg-cyan-400/20 text-cyan-200'
                            : 'border-cyan-400/20 bg-cyan-400/5 text-cyan-400/70 hover:border-cyan-400/40 hover:bg-cyan-400/10'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {React.createElement(widget.icon, { size: 12 })}
                          {widget.name}
                        </div>
                      </button>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ━━━━━━━━━���━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// WIDGET COMPONENT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function HUDWidget({ id, config, onRemove, onBringToFront }) {
  const Icon = config.icon;

  return (
    <div
      className="w-full h-full rounded-lg overflow-hidden flex flex-col group"
      style={{
        background: 'linear-gradient(135deg, rgba(5, 15, 25, 0.95), rgba(8, 18, 32, 0.92))',
        border: `1.5px solid ${hexToRGBA(config.color, 0.35)}`,
        boxShadow: `0 20px 60px rgba(0, 0, 0, 0.6), 0 0 40px ${hexToRGBA(config.color, 0.25)}, inset 0 1px 0 rgba(255, 255, 255, 0.08)`,
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Glow background */}
      <div
        aria-hidden
        className="absolute -inset-20 rounded-[32px] pointer-events-none"
        style={{
          background: `radial-gradient(350px 200px at 30% 0%, ${hexToRGBA(config.color, 0.25)}, transparent 65%)`,
          filter: 'blur(28px)',
          opacity: 0.7,
        }}
      />

      {/* Toolbar */}
      <div
        className="flex-shrink-0 flex items-center justify-between gap-2 px-3 py-2 border-b widget-handle"
        style={{
          borderBottomColor: hexToRGBA(config.color, 0.2),
          background: `linear-gradient(90deg, ${hexToRGBA(config.color, 0.08)}, ${hexToRGBA(config.color, 0.04)})`,
        }}
      >
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <Icon size={14} style={{ color: config.color, flexShrink: 0 }} />
          <span className="text-xs font-bold tracking-wide opacity-85 uppercase truncate">
            {config.name}
          </span>
        </div>
        <button
          onClick={onRemove}
          className="w-5 h-5 flex items-center justify-center rounded text-xs hover:bg-white/10 transition-all flex-shrink-0"
          style={{ color: 'rgba(255, 255, 255, 0.5)' }}
          title="Close"
        >
          <X size={11} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 flex flex-col justify-between overflow-hidden relative z-0">
        <WidgetContent id={id} config={config} />
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━���━━━━━━━━━━━━━━━━━━━━━━
// WIDGET CONTENT (Dynamic based on widget type)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function WidgetContent({ id, config }) {
  const [data, setData] = useState({});

  useEffect(() => {
    const updateData = () => {
      const now = new Date();
      const baseVal = Math.sin(now.getTime() / 8000) * 10;

      const contentMap = {
        // AI Modules
        'ai-cpa': {
          value: Math.floor(45000 + baseVal * 5000),
          unit: 'Daily Revenue',
          detail: '↑ 8.5% vs 10-day avg',
          metric: '27.3% food cost',
          trend: '↓ 2.1% improvement',
        },
        'ai-operations': {
          value: Math.floor(87 + baseVal * 5),
          unit: '% Efficiency',
          detail: 'Kitchen: 89% | Service: 85%',
          metric: 'Prep time: 12 min avg',
          trend: '⚡ Optimal conditions',
        },
        'ai-chef': {
          value: '🔥 HOT',
          unit: 'Trends',
          detail: 'Pasta dishes trending +23%',
          metric: 'Recommend: Increase pappardelle stock',
          trend: 'Predicted demand �� tomorrow',
        },
        // KPIs
        'kpi-covers': {
          value: Math.floor(1200 + baseVal * 50),
          unit: 'today',
          detail: '↑ 12% vs yesterday',
          metric: 'Peak: 2 PM (234 covers)',
        },
        'kpi-revenue': {
          value: Math.floor(45000 + baseVal * 5000),
          unit: '$',
          detail: '↑ 8.5% vs avg',
          metric: 'Per cover: $37.50',
        },
        'kpi-labor': {
          value: (25.8 + baseVal * 0.3).toFixed(1),
          unit: '%',
          detail: 'Target: 26% ✓',
          metric: '18 staff members scheduled',
        },
        'kpi-food': {
          value: (28.3 + baseVal * 0.5).toFixed(1),
          unit: '%',
          detail: 'Target: 28% ✓',
          metric: 'Waste: 2.1% (↓ 0.3%)',
        },
        // Operations
        'orders-live': {
          value: Math.floor(14 + baseVal * 3),
          unit: 'orders',
          detail: 'Table 23: 2 steaks (VIP)',
          metric: 'Avg wait: 11 min',
          status: '3 ready for pickup',
        },
        'alerts-anomaly': {
          value: Math.floor(2 + Math.abs(baseVal * 0.5)),
          unit: 'alerts',
          detail: 'Station A temp ⚠️ | Stock low 🚨',
          metric: 'All critical: acknowledged',
        },
        'trends-forecast': {
          value: '+15%',
          unit: 'growth',
          detail: '10-day prediction: ↑ 15% covers',
          metric: 'Best day: Thursday predicted',
        },
        'cctv-kitchen': {
          value: '🎥',
          unit: 'Live',
          detail: 'Kitchen CCTV Stream',
          metric: 'Quality: 1080p @ 30fps',
        },
        'cctv-dining': {
          value: '🎥',
          unit: 'Live',
          detail: 'Dining Room CCTV Stream',
          metric: 'Guests: 143 seated | 23 waiting',
        },
        'comms-ai': {
          value: '💬',
          unit: 'Smart',
          detail: 'Guest feedback: 4.8/5 ⭐',
          metric: 'Top compliment: Chef excellence',
        },
        'schedule-staff': {
          value: '18',
          unit: 'staff',
          detail: 'On duty: 16 | On break: 2',
          metric: 'Next break: 3 PM (2 staff)',
        },
        'inventory-status': {
          value: '94%',
          unit: 'stocked',
          detail: 'Critical items: 3 low',
          metric: 'Beef ribeye: 8 portions left',
        },
      };

      setData(contentMap[id] || contentMap['kpi-covers']);
    };

    updateData();
    const interval = setInterval(updateData, 2000);
    return () => clearInterval(interval);
  }, [id]);

  return (
    <div>
      <div className="flex items-baseline gap-2 mb-3">
        <div className="text-3xl md:text-4xl font-black tracking-tight" style={{ color: config.color }}>
          {data.value}
        </div>
        <div className="text-xs font-semibold opacity-60">{data.unit}</div>
      </div>
      <div className="text-xs opacity-60 mb-2">{data.detail}</div>
      {data.metric && <div className="text-xs text-white/40 mb-3">{data.metric}</div>}
      {data.trend && <div className="text-xs text-green-400/80 font-semibold">{data.trend}</div>}
      {data.status && <div className="text-xs text-cyan-300/80 font-semibold">{data.status}</div>}
      <div className="flex items-center justify-between text-[10px] mt-auto pt-2 opacity-50">
        <span className="font-mono">Live</span>
        <span className="inline-block w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: config.color }} />
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// UTILITIES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function hexToRGBA(hex, a) {
  const s = hex.replace('#', '');
  const n = parseInt(s.length === 3 ? s.split('').map(ch => ch + ch).join('') : s, 16);
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  return `rgba(${r},${g},${b},${a})`;
}
