import { r as reactExports, j as jsxDevRuntimeExports, R as React } from "./index-DfBvRGLH.js";
import { V as Video, R as Rnd$1, a as RND_NS, X } from "./Board-6RvNRUqx.js";
import { c as createLucideIcon, S as Settings } from "./settings-CL5KYzJi.js";
import { C as Clock } from "./clock-BJR8nEFt.js";
import { T as TrendingUp, A as Activity } from "./trending-up-B8JAO1nL.js";
import { T as TriangleAlert } from "./triangle-alert-BirfCPt0.js";
import { C as ChartColumn } from "./chart-column-B8MI0WA5.js";
import { U as Users } from "./users-DPrj24jF.js";
import { D as DollarSign } from "./dollar-sign-Dd2757Ez.js";
import { Z as Zap } from "./zap-D7rSfwrr.js";
import { C as ChefHat } from "./chef-hat-BgZX9Th7.js";
import { R as RotateCcw } from "./rotate-ccw-BtE446Kb.js";
import { E as Eye } from "./eye-D86xk_yZ.js";
/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
      key: "ct8e1f"
    }
  ],
  ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242", key: "151rxh" }],
  [
    "path",
    {
      d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
      key: "13bj9a"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
];
const EyeOff = createLucideIcon("eye-off", __iconNode$3);
/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
];
const MapPin = createLucideIcon("map-pin", __iconNode$2);
/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "14", height: "20", x: "5", y: "2", rx: "2", ry: "2", key: "1yt0o3" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }]
];
const Smartphone = createLucideIcon("smartphone", __iconNode$1);
/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12.8 19.6A2 2 0 1 0 14 16H2", key: "148xed" }],
  ["path", { d: "M17.5 8a2.5 2.5 0 1 1 2 4H2", key: "1u4tom" }],
  ["path", { d: "M9.8 4.4A2 2 0 1 1 11 8H2", key: "75valh" }]
];
const Wind = createLucideIcon("wind", __iconNode);
const Rnd = Rnd$1 ?? void 0 ?? RND_NS;
const LS_KEY = "luccca:hud:config:v1";
const LS_WIDGETS = "luccca:hud:widgets:v1";
const WIDGET_REGISTRY = {
  // AI Financial Module
  "ai-cpa": {
    name: "Master CPA AI",
    icon: DollarSign,
    color: "#00d9ff",
    category: "AI Finance",
    size: { w: 2, h: 1.5 },
    description: "AI-powered financial analysis with 10-day trend prediction"
  },
  "ai-operations": {
    name: "Operations AI",
    icon: Activity,
    color: "#00ff88",
    category: "AI Operations",
    size: { w: 2, h: 1.5 },
    description: "Real-time kitchen & service monitoring with predictions"
  },
  "ai-chef": {
    name: "Chef Expert AI",
    icon: ChefHat,
    color: "#ffc844",
    category: "AI Expert",
    size: { w: 1.5, h: 1.5 },
    description: "Master chef & pastry chef guidance & recommendations"
  },
  // Real-Time Operations
  "orders-live": {
    name: "Live Orders",
    icon: Zap,
    color: "#ff4d7d",
    category: "Operations",
    size: { w: 1.5, h: 1.5 },
    description: "Table orders, guest info, kitchen status"
  },
  "kpi-covers": {
    name: "Today's Covers",
    icon: Users,
    color: "#00d9ff",
    category: "KPIs",
    size: { w: 1, h: 1 },
    description: "Guest count with trending"
  },
  "kpi-revenue": {
    name: "Revenue",
    icon: DollarSign,
    color: "#4dff9e",
    category: "KPIs",
    size: { w: 1, h: 1 },
    description: "Real-time revenue tracking"
  },
  "kpi-labor": {
    name: "Labor Cost %",
    icon: Users,
    color: "#00ff88",
    category: "KPIs",
    size: { w: 1, h: 1 },
    description: "Labor cost percentage vs target"
  },
  "kpi-food": {
    name: "Food Cost %",
    icon: ChartColumn,
    color: "#ff6b4d",
    category: "KPIs",
    size: { w: 1, h: 1 },
    description: "Food cost percentage vs target"
  },
  // Monitoring & Insights
  "cctv-kitchen": {
    name: "Kitchen View",
    icon: Video,
    color: "#b84dff",
    category: "CCTV",
    size: { w: 1.5, h: 1.5 },
    description: "Kitchen CCTV feed & activity"
  },
  "cctv-dining": {
    name: "Dining Room",
    icon: MapPin,
    color: "#4dbaff",
    category: "CCTV",
    size: { w: 1.5, h: 1.5 },
    description: "Dining room CCTV & guest engagement"
  },
  "alerts-anomaly": {
    name: "Smart Alerts",
    icon: TriangleAlert,
    color: "#ff6b4d",
    category: "Alerts",
    size: { w: 1.5, h: 1 },
    description: "AI-detected anomalies & red flags"
  },
  "trends-forecast": {
    name: "Predictive Trends",
    icon: TrendingUp,
    color: "#00ff88",
    category: "Analytics",
    size: { w: 2, h: 1 },
    description: "10-day trend forecast & patterns"
  },
  // Communications & Insights
  "comms-ai": {
    name: "AI Communications",
    icon: Smartphone,
    color: "#ffc844",
    category: "AI",
    size: { w: 1.5, h: 1.5 },
    description: "AI-powered communication insights"
  },
  "schedule-staff": {
    name: "Staff Schedule",
    icon: Clock,
    color: "#4dbaff",
    category: "Operations",
    size: { w: 1.5, h: 1 },
    description: "Live staff scheduling & breaks"
  },
  "inventory-status": {
    name: "Inventory",
    icon: Wind,
    color: "#00d9ff",
    category: "Operations",
    size: { w: 1.5, h: 1 },
    description: "Real-time inventory levels"
  }
};
const DEFAULT_WIDGETS = [
  "ai-cpa",
  "ai-operations",
  "orders-live",
  "kpi-covers",
  "kpi-revenue",
  "kpi-labor",
  "kpi-food"
];
function FuturisticHUD() {
  const containerRef = reactExports.useRef(null);
  const [widgets, setWidgets] = reactExports.useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(LS_WIDGETS));
      return saved && Array.isArray(saved) && saved.length > 0 ? saved : DEFAULT_WIDGETS;
    } catch {
      return DEFAULT_WIDGETS;
    }
  });
  const [positions, setPositions] = reactExports.useState(() => {
    try {
      return JSON.parse(localStorage.getItem(LS_KEY)) || {};
    } catch {
      return {};
    }
  });
  const [showSettings, setShowSettings] = reactExports.useState(false);
  const [z, setZ] = reactExports.useState(10);
  const [fullscreen, setFullscreen] = reactExports.useState(true);
  reactExports.useEffect(() => {
    localStorage.setItem(LS_WIDGETS, JSON.stringify(widgets));
  }, [widgets]);
  reactExports.useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(positions));
  }, [positions]);
  const addWidget = (widgetId) => {
    if (!widgets.includes(widgetId)) {
      setWidgets((w) => [...w, widgetId]);
    }
    setShowSettings(false);
  };
  const removeWidget = (widgetId) => {
    setWidgets((w) => w.filter((id) => id !== widgetId));
  };
  const reset = () => {
    setWidgets(DEFAULT_WIDGETS);
    setPositions({});
  };
  const bringToFront = (id) => {
    setZ((n) => n + 1);
  };
  const updatePosition = (id, data) => {
    setPositions((p) => ({ ...p, [id]: data }));
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "div",
    {
      ref: containerRef,
      className: `relative w-full h-full flex flex-col transition-all duration-300 ${fullscreen ? "overflow-hidden" : "overflow-auto"}`,
      style: {
        background: "radial-gradient(1400px 700px at 40% -15%, rgba(0, 217, 255, 0.08), transparent 65%), radial-gradient(1000px 600px at 85% 5%, rgba(255, 77, 125, 0.06), transparent 70%), linear-gradient(180deg, rgba(15, 28, 42, 0.4) 0%, rgba(10, 20, 35, 0.6) 100%)"
      },
      children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          HUDHeader,
          {
            showSettings,
            onToggleSettings: () => setShowSettings(!showSettings),
            onFullscreen: () => setFullscreen(!fullscreen),
            onReset: reset,
            fullscreen
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/FuturisticHUD.jsx",
            lineNumber: 232,
            columnNumber: 7
          },
          this
        ),
        showSettings && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          HUDSettings,
          {
            availableWidgets: WIDGET_REGISTRY,
            activeWidgets: widgets,
            onAddWidget: addWidget,
            onRemoveWidget: removeWidget,
            onClose: () => setShowSettings(false)
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/FuturisticHUD.jsx",
            lineNumber: 242,
            columnNumber: 9
          },
          this
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex-1 relative overflow-auto", style: { pointerEvents: "auto" }, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative w-full h-full", style: { minHeight: "100%" }, children: widgets.map((widgetId, idx) => {
          const config = WIDGET_REGISTRY[widgetId];
          if (!config) return null;
          const defaultX = 20 + idx % 3 * 380;
          const defaultY = 20 + Math.floor(idx / 3) * 310;
          const defaultW = 360;
          const defaultH = 280;
          const pos = positions[widgetId] || {
            x: defaultX,
            y: defaultY,
            w: defaultW,
            h: defaultH,
            z: 10 + idx
          };
          return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            Rnd,
            {
              position: { x: pos.x, y: pos.y },
              size: { width: pos.w, height: pos.h },
              minWidth: 240,
              minHeight: 160,
              bounds: "parent",
              enableResizing: true,
              onDragStart: () => bringToFront(),
              onDragStop: (_, d) => updatePosition(widgetId, { ...pos, x: d.x, y: d.y }),
              onResizeStop: (_, __, ref, ___, p) => {
                updatePosition(widgetId, {
                  ...pos,
                  x: p.x,
                  y: p.y,
                  w: ref.offsetWidth,
                  h: ref.offsetHeight
                });
              },
              style: { zIndex: pos.z || 10 },
              dragHandleClassName: "widget-handle",
              children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                HUDWidget,
                {
                  id: widgetId,
                  config,
                  onRemove: () => removeWidget(widgetId),
                  onBringToFront: () => {
                    bringToFront();
                    updatePosition(widgetId, { ...pos, z: z + 1 });
                  }
                },
                void 0,
                false,
                {
                  fileName: "/app/code/frontend/src/components/FuturisticHUD.jsx",
                  lineNumber: 294,
                  columnNumber: 17
                },
                this
              )
            },
            widgetId,
            false,
            {
              fileName: "/app/code/frontend/src/components/FuturisticHUD.jsx",
              lineNumber: 272,
              columnNumber: 15
            },
            this
          );
        }) }, void 0, false, {
          fileName: "/app/code/frontend/src/components/FuturisticHUD.jsx",
          lineNumber: 253,
          columnNumber: 9
        }, this) }, void 0, false, {
          fileName: "/app/code/frontend/src/components/FuturisticHUD.jsx",
          lineNumber: 252,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("style", { children: `
        .widget-handle { cursor: grab; }
        .widget-handle:active { cursor: grabbing; }
      ` }, void 0, false, {
          fileName: "/app/code/frontend/src/components/FuturisticHUD.jsx",
          lineNumber: 309,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "/app/code/frontend/src/components/FuturisticHUD.jsx",
      lineNumber: 220,
      columnNumber: 5
    },
    this
  );
}
function HUDHeader({ showSettings, onToggleSettings, onFullscreen, onReset, fullscreen }) {
  const now = /* @__PURE__ */ new Date();
  const timeStr = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "div",
    {
      className: "flex-shrink-0 border-b border-cyan-400/20 px-6 py-4 flex items-center justify-between",
      style: {
        background: "linear-gradient(90deg, rgba(15, 28, 42, 0.8), rgba(10, 20, 35, 0.8))",
        backdropFilter: "blur(20px)"
      },
      children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-baseline gap-2", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-2xl font-black text-cyan-300", children: "🚀" }, void 0, false, {
              fileName: "/app/code/frontend/src/components/FuturisticHUD.jsx",
              lineNumber: 335,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { className: "text-xl font-black bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent", children: "LUCCCA Operations HUD" }, void 0, false, {
              fileName: "/app/code/frontend/src/components/FuturisticHUD.jsx",
              lineNumber: 336,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/components/FuturisticHUD.jsx",
            lineNumber: 334,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-xs text-cyan-400/60 font-mono border border-cyan-400/20 px-2 py-1 rounded", children: timeStr }, void 0, false, {
            fileName: "/app/code/frontend/src/components/FuturisticHUD.jsx",
            lineNumber: 340,
            columnNumber: 9
          }, this)
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/components/FuturisticHUD.jsx",
          lineNumber: 333,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "button",
            {
              onClick: onReset,
              className: "p-2 hover:bg-white/10 rounded transition-all text-cyan-300 hover:text-cyan-100",
              title: "Reset layout",
              children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(RotateCcw, { size: 16 }, void 0, false, {
                fileName: "/app/code/frontend/src/components/FuturisticHUD.jsx",
                lineNumber: 351,
                columnNumber: 11
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/code/frontend/src/components/FuturisticHUD.jsx",
              lineNumber: 346,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "button",
            {
              onClick: onToggleSettings,
              className: `p-2 rounded transition-all ${showSettings ? "bg-cyan-400/20 text-cyan-200" : "hover:bg-white/10 text-cyan-300 hover:text-cyan-100"}`,
              title: "Widget settings",
              children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Settings, { size: 16 }, void 0, false, {
                fileName: "/app/code/frontend/src/components/FuturisticHUD.jsx",
                lineNumber: 362,
                columnNumber: 11
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/code/frontend/src/components/FuturisticHUD.jsx",
              lineNumber: 353,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "button",
            {
              onClick: onFullscreen,
              className: "p-2 hover:bg-white/10 rounded transition-all text-cyan-300 hover:text-cyan-100",
              title: fullscreen ? "Exit fullscreen" : "Enter fullscreen",
              children: fullscreen ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(EyeOff, { size: 16 }, void 0, false, {
                fileName: "/app/code/frontend/src/components/FuturisticHUD.jsx",
                lineNumber: 369,
                columnNumber: 25
              }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Eye, { size: 16 }, void 0, false, {
                fileName: "/app/code/frontend/src/components/FuturisticHUD.jsx",
                lineNumber: 369,
                columnNumber: 48
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/code/frontend/src/components/FuturisticHUD.jsx",
              lineNumber: 364,
              columnNumber: 9
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/components/FuturisticHUD.jsx",
          lineNumber: 345,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "/app/code/frontend/src/components/FuturisticHUD.jsx",
      lineNumber: 326,
      columnNumber: 5
    },
    this
  );
}
function HUDSettings({ availableWidgets, activeWidgets, onAddWidget, onRemoveWidget, onClose }) {
  const categories = [...new Set(Object.values(availableWidgets).map((w) => w.category))].sort();
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "div",
    {
      className: "flex-shrink-0 border-b border-cyan-400/20 max-h-[40vh] overflow-auto",
      style: {
        background: "linear-gradient(90deg, rgba(0, 217, 255, 0.05), rgba(0, 217, 255, 0.02))",
        backdropFilter: "blur(10px)"
      },
      children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-6", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between mb-6", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "text-lg font-bold text-cyan-300", children: "Available Widgets" }, void 0, false, {
            fileName: "/app/code/frontend/src/components/FuturisticHUD.jsx",
            lineNumber: 393,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { onClick: onClose, className: "text-cyan-400/60 hover:text-cyan-300", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(X, { size: 20 }, void 0, false, {
            fileName: "/app/code/frontend/src/components/FuturisticHUD.jsx",
            lineNumber: 395,
            columnNumber: 13
          }, this) }, void 0, false, {
            fileName: "/app/code/frontend/src/components/FuturisticHUD.jsx",
            lineNumber: 394,
            columnNumber: 11
          }, this)
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/components/FuturisticHUD.jsx",
          lineNumber: 392,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-4", children: categories.map((category) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-xs font-bold uppercase text-cyan-400/70 mb-2", children: category }, void 0, false, {
            fileName: "/app/code/frontend/src/components/FuturisticHUD.jsx",
            lineNumber: 402,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2", children: Object.entries(availableWidgets).filter(([_, w]) => w.category === category).map(([id, widget]) => {
            const isActive = activeWidgets.includes(id);
            return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "button",
              {
                onClick: () => isActive ? onRemoveWidget(id) : onAddWidget(id),
                className: `p-2 rounded border transition-all text-xs font-semibold ${isActive ? "border-cyan-400/60 bg-cyan-400/20 text-cyan-200" : "border-cyan-400/20 bg-cyan-400/5 text-cyan-400/70 hover:border-cyan-400/40 hover:bg-cyan-400/10"}`,
                children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-2", children: [
                  React.createElement(widget.icon, { size: 12 }),
                  widget.name
                ] }, void 0, true, {
                  fileName: "/app/code/frontend/src/components/FuturisticHUD.jsx",
                  lineNumber: 420,
                  columnNumber: 25
                }, this)
              },
              id,
              false,
              {
                fileName: "/app/code/frontend/src/components/FuturisticHUD.jsx",
                lineNumber: 409,
                columnNumber: 23
              },
              this
            );
          }) }, void 0, false, {
            fileName: "/app/code/frontend/src/components/FuturisticHUD.jsx",
            lineNumber: 403,
            columnNumber: 15
          }, this)
        ] }, category, true, {
          fileName: "/app/code/frontend/src/components/FuturisticHUD.jsx",
          lineNumber: 401,
          columnNumber: 13
        }, this)) }, void 0, false, {
          fileName: "/app/code/frontend/src/components/FuturisticHUD.jsx",
          lineNumber: 399,
          columnNumber: 9
        }, this)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/FuturisticHUD.jsx",
        lineNumber: 391,
        columnNumber: 7
      }, this)
    },
    void 0,
    false,
    {
      fileName: "/app/code/frontend/src/components/FuturisticHUD.jsx",
      lineNumber: 384,
      columnNumber: 5
    },
    this
  );
}
function HUDWidget({ id, config, onRemove, onBringToFront }) {
  const Icon = config.icon;
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "div",
    {
      className: "w-full h-full rounded-lg overflow-hidden flex flex-col group",
      style: {
        background: "linear-gradient(135deg, rgba(5, 15, 25, 0.95), rgba(8, 18, 32, 0.92))",
        border: `1.5px solid ${hexToRGBA(config.color, 0.35)}`,
        boxShadow: `0 20px 60px rgba(0, 0, 0, 0.6), 0 0 40px ${hexToRGBA(config.color, 0.25)}, inset 0 1px 0 rgba(255, 255, 255, 0.08)`,
        backdropFilter: "blur(12px)"
      },
      children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "div",
          {
            "aria-hidden": true,
            className: "absolute -inset-20 rounded-[32px] pointer-events-none",
            style: {
              background: `radial-gradient(350px 200px at 30% 0%, ${hexToRGBA(config.color, 0.25)}, transparent 65%)`,
              filter: "blur(28px)",
              opacity: 0.7
            }
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/FuturisticHUD.jsx",
            lineNumber: 454,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "div",
          {
            className: "flex-shrink-0 flex items-center justify-between gap-2 px-3 py-2 border-b widget-handle",
            style: {
              borderBottomColor: hexToRGBA(config.color, 0.2),
              background: `linear-gradient(90deg, ${hexToRGBA(config.color, 0.08)}, ${hexToRGBA(config.color, 0.04)})`
            },
            children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-2 min-w-0 flex-1", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Icon, { size: 14, style: { color: config.color, flexShrink: 0 } }, void 0, false, {
                  fileName: "/app/code/frontend/src/components/FuturisticHUD.jsx",
                  lineNumber: 473,
                  columnNumber: 11
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-xs font-bold tracking-wide opacity-85 uppercase truncate", children: config.name }, void 0, false, {
                  fileName: "/app/code/frontend/src/components/FuturisticHUD.jsx",
                  lineNumber: 474,
                  columnNumber: 11
                }, this)
              ] }, void 0, true, {
                fileName: "/app/code/frontend/src/components/FuturisticHUD.jsx",
                lineNumber: 472,
                columnNumber: 9
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "button",
                {
                  onClick: onRemove,
                  className: "w-5 h-5 flex items-center justify-center rounded text-xs hover:bg-white/10 transition-all flex-shrink-0",
                  style: { color: "rgba(255, 255, 255, 0.5)" },
                  title: "Close",
                  children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(X, { size: 11 }, void 0, false, {
                    fileName: "/app/code/frontend/src/components/FuturisticHUD.jsx",
                    lineNumber: 484,
                    columnNumber: 11
                  }, this)
                },
                void 0,
                false,
                {
                  fileName: "/app/code/frontend/src/components/FuturisticHUD.jsx",
                  lineNumber: 478,
                  columnNumber: 9
                },
                this
              )
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/code/frontend/src/components/FuturisticHUD.jsx",
            lineNumber: 465,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex-1 p-4 flex flex-col justify-between overflow-hidden relative z-0", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(WidgetContent, { id, config }, void 0, false, {
          fileName: "/app/code/frontend/src/components/FuturisticHUD.jsx",
          lineNumber: 490,
          columnNumber: 9
        }, this) }, void 0, false, {
          fileName: "/app/code/frontend/src/components/FuturisticHUD.jsx",
          lineNumber: 489,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "/app/code/frontend/src/components/FuturisticHUD.jsx",
      lineNumber: 444,
      columnNumber: 5
    },
    this
  );
}
function WidgetContent({ id, config }) {
  const [data, setData] = reactExports.useState({});
  reactExports.useEffect(() => {
    const updateData = () => {
      const now = /* @__PURE__ */ new Date();
      const baseVal = Math.sin(now.getTime() / 8e3) * 10;
      const contentMap = {
        // AI Modules
        "ai-cpa": {
          value: "$" + Math.floor(45e3 + baseVal * 5e3).toLocaleString(),
          unit: "Daily Revenue",
          detail: "↑ 8.5% vs 10-day avg",
          metric: "27.3% food cost | ↓ 2.1% improvement",
          trend: "10-day ahead: +12% growth predicted"
        },
        "ai-operations": {
          value: Math.floor(87 + baseVal * 5) + "%",
          unit: "Efficiency",
          detail: "Kitchen: 89% | Service: 85%",
          metric: "Prep time: 12 min avg | Status: Optimal",
          trend: "⚡ All stations performing above target"
        },
        "ai-chef": {
          value: "🔥 HOT",
          unit: "Trends",
          detail: "Pasta dishes trending +23%",
          metric: "Recommend: ↑ pappardelle, ↓ salads",
          trend: "Predicted demand surge +18% tomorrow"
        },
        // KPIs
        "kpi-covers": {
          value: Math.floor(1200 + baseVal * 50).toLocaleString(),
          unit: "covers",
          detail: "↑ 12% vs yesterday",
          metric: "Peak: 2-3 PM (234 max)",
          trend: "Forecast: 1,350 tomorrow"
        },
        "kpi-revenue": {
          value: "$" + Math.floor(45e3 + baseVal * 5e3).toLocaleString(),
          unit: "daily",
          detail: "↑ 8.5% vs 10-day avg",
          metric: "Per cover: $37.50 | Check avg: $47.20",
          trend: "On track for +$156K monthly"
        },
        "kpi-labor": {
          value: (25.8 + baseVal * 0.3).toFixed(1) + "%",
          unit: "of revenue",
          detail: "Target: 26% ✓ Within range",
          metric: "18 scheduled | 16 on duty | 2 breaks",
          trend: "Perfect efficiency window 2-4 PM"
        },
        "kpi-food": {
          value: (28.3 + baseVal * 0.5).toFixed(1) + "%",
          unit: "of revenue",
          detail: "Target: 28% ✓ Excellent",
          metric: "Waste: 2.1% (↓ 0.3% improvement)",
          trend: "Best week ever: -3.2% cost improvement"
        },
        // Operations
        "orders-live": {
          value: Math.max(8, Math.floor(14 + baseVal * 3)),
          unit: "active",
          detail: "Table 23: 2 steaks (VIP Guest) | Pri: HIGH",
          metric: "Avg wait: 11 min | Next ready: 2 min",
          status: "3 ready for pickup | 1 comping dessert"
        },
        "alerts-anomaly": {
          value: Math.max(0, Math.floor(2 + Math.abs(baseVal * 0.5))),
          unit: "alerts",
          detail: "Station A temp warning ⚠️ | Stock level 🚨",
          metric: "Status: All acknowledged & managed",
          trend: "No critical issues - all within tolerance"
        },
        "trends-forecast": {
          value: "+15%",
          unit: "growth",
          detail: "10-day prediction: ↑ 15% covers",
          metric: "Best day: Thursday | Low: Monday",
          trend: "Monthly forecast: $412K (↑ $28K)"
        },
        "cctv-kitchen": {
          value: "🎥",
          unit: "Live Feed",
          detail: "Kitchen CCTV Stream Active",
          metric: "4 stations | All busy | Quality: 1080p 30fps",
          trend: "Efficiency: 89% | No bottlenecks detected"
        },
        "cctv-dining": {
          value: "🎥",
          unit: "Live Feed",
          detail: "Dining Room CCTV Stream Active",
          metric: "Seated: 143 guests | Waiting: 23 | Avg: 4.8/5 ⭐",
          trend: "Satisfaction high | Service tempo excellent"
        },
        "comms-ai": {
          value: "💬 4.8/5",
          unit: "⭐",
          detail: "Guest feedback: Excellent | Real-time sentiment",
          metric: 'Top: "Chef excellence" | Issue: "Wait time" 1%',
          trend: "Communication score: +0.3pts vs yesterday"
        },
        "schedule-staff": {
          value: "18",
          unit: "scheduled",
          detail: "On duty: 16 | On break: 2 | Available: 1",
          metric: "Next break: 3 PM (2 staff) | Coverage: 100%",
          trend: "Optimal staffing through 10 PM service"
        },
        "inventory-status": {
          value: "94%",
          unit: "stocked",
          detail: "Inventory levels good | 3 items flagged low",
          metric: "Critical: Beef ribeye 8 portions | Order: YES",
          trend: "Predicted stockout: 6 PM without order"
        }
      };
      setData(contentMap[id] || contentMap["kpi-covers"]);
    };
    updateData();
    const interval = setInterval(updateData, 2e3);
    return () => clearInterval(interval);
  }, [id]);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-baseline gap-2 mb-3", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-3xl md:text-4xl font-black tracking-tight", style: { color: config.color }, children: data.value }, void 0, false, {
        fileName: "/app/code/frontend/src/components/FuturisticHUD.jsx",
        lineNumber: 630,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-xs font-semibold opacity-60", children: data.unit }, void 0, false, {
        fileName: "/app/code/frontend/src/components/FuturisticHUD.jsx",
        lineNumber: 633,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/FuturisticHUD.jsx",
      lineNumber: 629,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-xs opacity-60 mb-2", children: data.detail }, void 0, false, {
      fileName: "/app/code/frontend/src/components/FuturisticHUD.jsx",
      lineNumber: 635,
      columnNumber: 7
    }, this),
    data.metric && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-xs text-white/40 mb-3", children: data.metric }, void 0, false, {
      fileName: "/app/code/frontend/src/components/FuturisticHUD.jsx",
      lineNumber: 636,
      columnNumber: 23
    }, this),
    data.trend && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-xs text-green-400/80 font-semibold", children: data.trend }, void 0, false, {
      fileName: "/app/code/frontend/src/components/FuturisticHUD.jsx",
      lineNumber: 637,
      columnNumber: 22
    }, this),
    data.status && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-xs text-cyan-300/80 font-semibold", children: data.status }, void 0, false, {
      fileName: "/app/code/frontend/src/components/FuturisticHUD.jsx",
      lineNumber: 638,
      columnNumber: 23
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between text-[10px] mt-auto pt-2 opacity-50", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "font-mono", children: "Live" }, void 0, false, {
        fileName: "/app/code/frontend/src/components/FuturisticHUD.jsx",
        lineNumber: 640,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "inline-block w-1.5 h-1.5 rounded-full animate-pulse", style: { background: config.color } }, void 0, false, {
        fileName: "/app/code/frontend/src/components/FuturisticHUD.jsx",
        lineNumber: 641,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/FuturisticHUD.jsx",
      lineNumber: 639,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/FuturisticHUD.jsx",
    lineNumber: 628,
    columnNumber: 5
  }, this);
}
function hexToRGBA(hex, a) {
  const s = hex.replace("#", "");
  const n = parseInt(s.length === 3 ? s.split("").map((ch) => ch + ch).join("") : s, 16);
  const r = n >> 16 & 255, g = n >> 8 & 255, b = n & 255;
  return `rgba(${r},${g},${b},${a})`;
}
export {
  FuturisticHUD as default
};
