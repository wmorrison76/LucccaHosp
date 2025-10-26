import { r as reactExports, j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
import { R as Rnd$1, a as RND_NS, X } from "./Board-6RvNRUqx.js";
import { Z as Zap } from "./zap-D7rSfwrr.js";
import { G as Grid3x3, L as List } from "./list-Dw93bOqv.js";
import { C as ChartColumn } from "./chart-column-B8MI0WA5.js";
import { S as Settings } from "./settings-CL5KYzJi.js";
import { P as Plus } from "./plus-BoqphXwa.js";
const Rnd = Rnd$1 ?? void 0 ?? RND_NS;
const LS_ADVANCED_HUD = "luccca:advanced:hud:v2";
const OUTLETS = Array.from({ length: 20 }, (_, i) => ({
  id: `outlet-${i + 1}`,
  name: `Outlet ${i + 1}`,
  location: `Location ${String.fromCharCode(65 + i % 26)}${Math.floor(i / 26) + 1}`,
  covers: Math.floor(800 + Math.random() * 600),
  revenue: Math.floor(35e3 + Math.random() * 2e4),
  laborPercent: Math.floor(20 + Math.random() * 12),
  foodPercent: Math.floor(24 + Math.random() * 8),
  staffCount: Math.floor(12 + Math.random() * 10),
  efficiency: Math.floor(75 + Math.random() * 20),
  alerts: Math.floor(Math.random() * 4)
}));
function AdvancedHUD() {
  const containerRef = reactExports.useRef(null);
  const [viewMode, setViewMode] = reactExports.useState("dashboard");
  const [displayFormat, setDisplayFormat] = reactExports.useState("grid");
  const [selectedOutlets, setSelectedOutlets] = reactExports.useState([]);
  const [floatingWidgets, setFloatingWidgets] = reactExports.useState([]);
  const [widgetPositions, setWidgetPositions] = reactExports.useState({});
  const [showSettings, setShowSettings] = reactExports.useState(false);
  const [detailedModal, setDetailedModal] = reactExports.useState(null);
  reactExports.useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(LS_ADVANCED_HUD));
      if (saved) {
        setFloatingWidgets(saved.widgets || []);
        setWidgetPositions(saved.positions || {});
        setDisplayFormat(saved.format || "grid");
      }
    } catch (e) {
      console.error("Failed to load saved state:", e);
    }
  }, []);
  reactExports.useEffect(() => {
    localStorage.setItem(LS_ADVANCED_HUD, JSON.stringify({
      widgets: floatingWidgets,
      positions: widgetPositions,
      format: displayFormat
    }));
  }, [floatingWidgets, widgetPositions, displayFormat]);
  const addFloatingWidget = (widgetId) => {
    if (!floatingWidgets.includes(widgetId)) {
      const newWidget = {
        id: `${widgetId}-${Date.now()}`,
        type: widgetId,
        x: Math.random() * 300,
        y: Math.random() * 200,
        w: 500,
        h: 400
      };
      setFloatingWidgets((w) => [...w, newWidget]);
    }
  };
  const removeFloatingWidget = (id) => {
    setFloatingWidgets((w) => w.filter((widget) => widget.id !== id));
  };
  const openDetailedModal = (type, outlet) => {
    setDetailedModal({ type, outlet });
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "div",
    {
      ref: containerRef,
      className: "relative w-full h-full flex flex-col overflow-hidden",
      style: {
        background: "radial-gradient(1800px 900px at 50% 0%, rgba(0, 217, 255, 0.15), transparent 60%), radial-gradient(1000px 800px at 80% 100%, rgba(255, 77, 125, 0.1), transparent 70%), linear-gradient(180deg, #0a1628 0%, #0f1f34 50%, #0a1628 100%)"
      },
      children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "div",
          {
            style: {
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              opacity: 0.03,
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 217, 255, 0.5) 2px, rgba(0, 217, 255, 0.5) 4px)",
              zIndex: 9999
            }
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
            lineNumber: 101,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          HUDHeader,
          {
            viewMode,
            onViewChange: setViewMode,
            displayFormat,
            onFormatChange: setDisplayFormat,
            onSettings: () => setShowSettings(!showSettings),
            floatingWidgetCount: floatingWidgets.length
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
            lineNumber: 116,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex-1 relative overflow-auto", children: [
          viewMode === "dashboard" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            DashboardView,
            {
              outlets: OUTLETS,
              onOpenDetail: openDetailedModal,
              onAddWidget: addFloatingWidget
            },
            void 0,
            false,
            {
              fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
              lineNumber: 128,
              columnNumber: 11
            },
            this
          ),
          viewMode === "outlets" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            OutletsGridView,
            {
              outlets: OUTLETS,
              format: displayFormat,
              selectedOutlets,
              onSelectOutlet: (id) => setSelectedOutlets(
                (prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
              ),
              onOpenDetail: openDetailedModal
            },
            void 0,
            false,
            {
              fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
              lineNumber: 136,
              columnNumber: 11
            },
            this
          ),
          viewMode === "comparison" && selectedOutlets.length > 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            ComparisonView,
            {
              outlets: OUTLETS.filter((o) => selectedOutlets.includes(o.id)),
              onOpenDetail: openDetailedModal
            },
            void 0,
            false,
            {
              fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
              lineNumber: 148,
              columnNumber: 11
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
          lineNumber: 126,
          columnNumber: 7
        }, this),
        floatingWidgets.map((widget) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          FloatingWidget,
          {
            widget,
            pos: widgetPositions[widget.id] || { x: widget.x, y: widget.y, w: widget.w, h: widget.h },
            onPositionChange: (newPos) => {
              setWidgetPositions((p) => ({ ...p, [widget.id]: newPos }));
            },
            onRemove: () => removeFloatingWidget(widget.id),
            onOpenDetail: openDetailedModal
          },
          widget.id,
          false,
          {
            fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
            lineNumber: 157,
            columnNumber: 9
          },
          this
        )),
        detailedModal && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          DetailedModalView,
          {
            type: detailedModal.type,
            outlet: detailedModal.outlet,
            onClose: () => setDetailedModal(null)
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
            lineNumber: 171,
            columnNumber: 9
          },
          this
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("style", { children: `
        /* JARVIS GLOW EFFECT */
        @keyframes jarvisGlow {
          0%, 100% { text-shadow: 0 0 5px rgba(0, 217, 255, 0.5); }
          50% { text-shadow: 0 0 20px rgba(0, 217, 255, 0.8); }
        }
        .jarvis-glow { animation: jarvisGlow 2s ease-in-out infinite; }

        /* GLITCH EFFECT */
        @keyframes glitch {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
        }
        .glitch-effect { animation: glitch 0.3s ease-in-out; }

        /* PARTICLE EFFECT */
        @keyframes float {
          0%, 100% { transform: translateY(0px); opacity: 0.3; }
          50% { transform: translateY(-20px); opacity: 0.8; }
        }

        /* 3D DEPTH */
        .depth-1 { transform: perspective(1000px) rotateX(0.5deg) rotateY(-0.5deg); }
        .depth-2 { transform: perspective(1000px) rotateX(1deg) rotateY(-1deg); }
        .depth-3 { transform: perspective(1000px) rotateX(1.5deg) rotateY(-1.5deg); }
      ` }, void 0, false, {
          fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
          lineNumber: 178,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
      lineNumber: 91,
      columnNumber: 5
    },
    this
  );
}
function HUDHeader({ viewMode, onViewChange, displayFormat, onFormatChange, onSettings, floatingWidgetCount }) {
  const now = /* @__PURE__ */ new Date();
  const timeStr = now.toLocaleTimeString();
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "div",
    {
      className: "flex-shrink-0 border-b border-cyan-400/30 px-6 py-4 flex items-center justify-between",
      style: {
        background: "linear-gradient(90deg, rgba(0, 217, 255, 0.05), rgba(0, 217, 255, 0.02))",
        backdropFilter: "blur(20px)",
        boxShadow: "0 0 30px rgba(0, 217, 255, 0.1), inset 0 1px 0 rgba(0, 217, 255, 0.3)"
      },
      children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-6", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-2xl animate-pulse", children: "🎯" }, void 0, false, {
              fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
              lineNumber: 230,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { className: "text-2xl font-black jarvis-glow bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent", children: "OPERATIONS NEXUS" }, void 0, false, {
              fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
              lineNumber: 231,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
            lineNumber: 229,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-xs font-mono text-cyan-400/60 border border-cyan-400/30 px-3 py-1.5 rounded flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" }, void 0, false, {
              fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
              lineNumber: 237,
              columnNumber: 11
            }, this),
            timeStr
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
            lineNumber: 236,
            columnNumber: 9
          }, this)
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
          lineNumber: 228,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex gap-1 bg-black/30 rounded-lg p-1 border border-cyan-400/20", children: [
            { id: "dashboard", label: "Dashboard", icon: Zap },
            { id: "outlets", label: "20 Outlets", icon: Grid3x3 },
            { id: "comparison", label: "Compare", icon: ChartColumn }
          ].map(({ id, label, icon: Icon }) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "button",
            {
              onClick: () => onViewChange(id),
              className: `px-3 py-1.5 text-xs font-semibold rounded flex items-center gap-1.5 transition-all ${viewMode === id ? "bg-cyan-400/30 text-cyan-100 border border-cyan-400/60" : "text-cyan-400/60 hover:text-cyan-300"}`,
              children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Icon, { size: 14 }, void 0, false, {
                  fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
                  lineNumber: 259,
                  columnNumber: 15
                }, this),
                label
              ]
            },
            id,
            true,
            {
              fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
              lineNumber: 250,
              columnNumber: 13
            },
            this
          )) }, void 0, false, {
            fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
            lineNumber: 244,
            columnNumber: 9
          }, this),
          viewMode === "outlets" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex gap-1 bg-black/30 rounded-lg p-1 border border-cyan-400/20", children: [
            { id: "grid", icon: Grid3x3 },
            { id: "list", icon: List }
          ].map(({ id, icon: Icon }) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "button",
            {
              onClick: () => onFormatChange(id),
              className: `p-1.5 rounded transition-all ${displayFormat === id ? "bg-cyan-400/30 text-cyan-100" : "text-cyan-400/60 hover:text-cyan-300"}`,
              children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Icon, { size: 14 }, void 0, false, {
                fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
                lineNumber: 281,
                columnNumber: 17
              }, this)
            },
            id,
            false,
            {
              fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
              lineNumber: 272,
              columnNumber: 15
            },
            this
          )) }, void 0, false, {
            fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
            lineNumber: 267,
            columnNumber: 11
          }, this),
          floatingWidgetCount > 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-xs font-mono text-purple-400 bg-purple-400/10 border border-purple-400/30 px-2 py-1.5 rounded", children: [
            floatingWidgetCount,
            " floating"
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
            lineNumber: 289,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "button",
            {
              onClick: onSettings,
              className: "p-2 hover:bg-white/10 rounded transition-all text-cyan-300 hover:text-cyan-100",
              children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Settings, { size: 16 }, void 0, false, {
                fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
                lineNumber: 299,
                columnNumber: 11
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
              lineNumber: 295,
              columnNumber: 9
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
          lineNumber: 242,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
      lineNumber: 220,
      columnNumber: 5
    },
    this
  );
}
function DashboardView({ outlets, onOpenDetail, onAddWidget }) {
  const totalCovers = outlets.reduce((sum, o) => sum + o.covers, 0);
  const totalRevenue = outlets.reduce((sum, o) => sum + o.revenue, 0);
  const avgLabor = Math.round(outlets.reduce((sum, o) => sum + o.laborPercent, 0) / outlets.length);
  const avgFood = Math.round(outlets.reduce((sum, o) => sum + o.foodPercent, 0) / outlets.length);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-6 space-y-6", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        KPICard,
        {
          title: "Total Covers",
          value: totalCovers.toLocaleString(),
          detail: "Across 20 outlets",
          color: "#00d9ff",
          onClick: () => onOpenDetail("covers")
        },
        void 0,
        false,
        {
          fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
          lineNumber: 320,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        KPICard,
        {
          title: "Total Revenue",
          value: "$" + (totalRevenue / 1e3).toFixed(1) + "K",
          detail: "Daily average",
          color: "#4dff9e",
          onClick: () => onOpenDetail("revenue")
        },
        void 0,
        false,
        {
          fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
          lineNumber: 327,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        KPICard,
        {
          title: "Avg Labor Cost",
          value: avgLabor + "%",
          detail: "All outlets",
          color: "#ff6b4d",
          onClick: () => onOpenDetail("labor")
        },
        void 0,
        false,
        {
          fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
          lineNumber: 334,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        KPICard,
        {
          title: "Avg Food Cost",
          value: avgFood + "%",
          detail: "All outlets",
          color: "#ffc844",
          onClick: () => onOpenDetail("food")
        },
        void 0,
        false,
        {
          fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
          lineNumber: 341,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
      lineNumber: 319,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex gap-3", children: ["labor", "revenue", "coverage", "alerts"].map((widget) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "button",
      {
        onClick: () => onAddWidget(widget),
        className: "px-4 py-2 bg-cyan-400/10 border border-cyan-400/30 rounded text-cyan-300 text-sm font-semibold hover:bg-cyan-400/20 transition-all flex items-center gap-2",
        children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Plus, { size: 14 }, void 0, false, {
            fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
            lineNumber: 358,
            columnNumber: 13
          }, this),
          widget.charAt(0).toUpperCase() + widget.slice(1)
        ]
      },
      widget,
      true,
      {
        fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
        lineNumber: 353,
        columnNumber: 11
      },
      this
    )) }, void 0, false, {
      fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
      lineNumber: 351,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AlertSection, { outlets, onOpenDetail }, void 0, false, {
      fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
      lineNumber: 365,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
    lineNumber: 317,
    columnNumber: 5
  }, this);
}
function OutletsGridView({ outlets, format, selectedOutlets, onSelectOutlet, onOpenDetail }) {
  if (format === "list") {
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-6", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("thead", { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("tr", { className: "border-b border-cyan-400/20", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("th", { className: "text-left py-3 text-cyan-300 font-semibold", children: "Outlet" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
          lineNumber: 381,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("th", { className: "text-right py-3 text-cyan-300 font-semibold", children: "Covers" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
          lineNumber: 382,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("th", { className: "text-right py-3 text-cyan-300 font-semibold", children: "Revenue" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
          lineNumber: 383,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("th", { className: "text-right py-3 text-cyan-300 font-semibold", children: "Labor %" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
          lineNumber: 384,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("th", { className: "text-right py-3 text-cyan-300 font-semibold", children: "Food %" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
          lineNumber: 385,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("th", { className: "text-center py-3 text-cyan-300 font-semibold", children: "Staff" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
          lineNumber: 386,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("th", { className: "text-center py-3 text-cyan-300 font-semibold", children: "Action" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
          lineNumber: 387,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
        lineNumber: 380,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
        lineNumber: 379,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("tbody", { children: outlets.map((outlet, idx) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "tr",
        {
          className: `border-b border-cyan-400/10 hover:bg-cyan-400/5 transition-all cursor-pointer ${selectedOutlets.includes(outlet.id) ? "bg-cyan-400/10" : ""}`,
          onClick: () => onSelectOutlet(outlet.id),
          children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("td", { className: "py-3 font-semibold text-cyan-300", children: outlet.name }, void 0, false, {
              fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
              lineNumber: 399,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("td", { className: "text-right py-3 text-white/70", children: outlet.covers }, void 0, false, {
              fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
              lineNumber: 400,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("td", { className: "text-right py-3 text-green-400", children: [
              "$",
              outlet.revenue.toLocaleString()
            ] }, void 0, true, {
              fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
              lineNumber: 401,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("td", { className: `text-right py-3 ${outlet.laborPercent > 26 ? "text-red-400 font-bold" : "text-white/70"}`, children: [
              outlet.laborPercent,
              "%"
            ] }, void 0, true, {
              fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
              lineNumber: 402,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("td", { className: `text-right py-3 ${outlet.foodPercent > 28 ? "text-red-400 font-bold" : "text-white/70"}`, children: [
              outlet.foodPercent,
              "%"
            ] }, void 0, true, {
              fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
              lineNumber: 405,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("td", { className: "text-center py-3 text-cyan-300", children: outlet.staffCount }, void 0, false, {
              fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
              lineNumber: 408,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("td", { className: "text-center py-3", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "button",
              {
                onClick: (e) => {
                  e.stopPropagation();
                  onOpenDetail("outlet", outlet);
                },
                className: "px-2 py-1 bg-cyan-400/20 rounded text-cyan-300 hover:bg-cyan-400/30 text-xs",
                children: "Details"
              },
              void 0,
              false,
              {
                fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
                lineNumber: 410,
                columnNumber: 19
              },
              this
            ) }, void 0, false, {
              fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
              lineNumber: 409,
              columnNumber: 17
            }, this)
          ]
        },
        outlet.id,
        true,
        {
          fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
          lineNumber: 392,
          columnNumber: 15
        },
        this
      )) }, void 0, false, {
        fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
        lineNumber: 390,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
      lineNumber: 378,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
      lineNumber: 377,
      columnNumber: 7
    }, this);
  }
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-6 grid grid-cols-5 gap-4", children: outlets.map((outlet) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    OutletCard,
    {
      outlet,
      selected: selectedOutlets.includes(outlet.id),
      onSelect: () => onSelectOutlet(outlet.id),
      onOpenDetail: () => onOpenDetail("outlet", outlet)
    },
    outlet.id,
    false,
    {
      fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
      lineNumber: 428,
      columnNumber: 9
    },
    this
  )) }, void 0, false, {
    fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
    lineNumber: 426,
    columnNumber: 5
  }, this);
}
function OutletCard({ outlet, selected, onSelect, onOpenDetail }) {
  const laborStatus = outlet.laborPercent > 26 ? "high" : "normal";
  const foodStatus = outlet.foodPercent > 28 ? "high" : "normal";
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "div",
    {
      onClick: onSelect,
      className: `p-4 rounded-lg border cursor-pointer transition-all ${selected ? "border-cyan-400/60 bg-cyan-400/15 shadow-lg shadow-cyan-400/20" : "border-cyan-400/20 bg-black/20 hover:border-cyan-400/40 hover:bg-cyan-400/5"}`,
      style: {
        backdropFilter: "blur(8px)"
      },
      children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-start justify-between mb-3", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "font-bold text-cyan-300 text-sm", children: outlet.name }, void 0, false, {
              fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
              lineNumber: 462,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs text-white/40", children: outlet.location }, void 0, false, {
              fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
              lineNumber: 463,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
            lineNumber: 461,
            columnNumber: 9
          }, this),
          outlet.alerts > 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-xs font-bold text-red-400 bg-red-400/20 px-2 py-1 rounded", children: [
            outlet.alerts,
            " ⚠️"
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
            lineNumber: 466,
            columnNumber: 11
          }, this)
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
          lineNumber: 460,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-2 mb-3 text-xs", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-white/60", children: "Covers" }, void 0, false, {
              fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
              lineNumber: 474,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-cyan-300 font-semibold", children: outlet.covers }, void 0, false, {
              fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
              lineNumber: 475,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
            lineNumber: 473,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-white/60", children: "Revenue" }, void 0, false, {
              fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
              lineNumber: 478,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-green-400 font-semibold", children: [
              "$",
              outlet.revenue.toLocaleString()
            ] }, void 0, true, {
              fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
              lineNumber: 479,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
            lineNumber: 477,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-white/60", children: "Labor" }, void 0, false, {
              fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
              lineNumber: 482,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: laborStatus === "high" ? "text-red-400 font-bold" : "text-white/70", children: [
              outlet.laborPercent,
              "%"
            ] }, void 0, true, {
              fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
              lineNumber: 483,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
            lineNumber: 481,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-white/60", children: "Food" }, void 0, false, {
              fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
              lineNumber: 488,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: foodStatus === "high" ? "text-red-400 font-bold" : "text-white/70", children: [
              outlet.foodPercent,
              "%"
            ] }, void 0, true, {
              fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
              lineNumber: 489,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
            lineNumber: 487,
            columnNumber: 9
          }, this)
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
          lineNumber: 472,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "button",
          {
            onClick: (e) => {
              e.stopPropagation();
              onOpenDetail();
            },
            className: "w-full py-1.5 bg-cyan-400/20 border border-cyan-400/30 rounded text-cyan-300 hover:bg-cyan-400/30 text-xs font-semibold transition-all",
            children: "View Details"
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
            lineNumber: 495,
            columnNumber: 7
          },
          this
        )
      ]
    },
    void 0,
    true,
    {
      fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
      lineNumber: 449,
      columnNumber: 5
    },
    this
  );
}
function ComparisonView({ outlets, onOpenDetail }) {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-6", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "text-2xl font-bold text-cyan-300 mb-6", children: "Outlet Comparison" }, void 0, false, {
      fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
      lineNumber: 512,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "div",
        {
          className: "p-6 rounded-lg border border-cyan-400/30 bg-black/30",
          style: { backdropFilter: "blur(8px)" },
          children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-lg font-bold text-cyan-300 mb-4", children: "Labor Cost Comparison" }, void 0, false, {
              fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
              lineNumber: 519,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-3", children: outlets.sort((a, b) => b.laborPercent - a.laborPercent).map((outlet) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-white/70", children: outlet.name }, void 0, false, {
                fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
                lineNumber: 525,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-32 bg-black/50 rounded-full h-2", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "div",
                  {
                    className: `h-2 rounded-full ${outlet.laborPercent > 26 ? "bg-red-500" : "bg-green-500"}`,
                    style: { width: `${outlet.laborPercent / 40 * 100}%` }
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
                    lineNumber: 528,
                    columnNumber: 23
                  },
                  this
                ) }, void 0, false, {
                  fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
                  lineNumber: 527,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: `font-semibold w-10 text-right ${outlet.laborPercent > 26 ? "text-red-400" : "text-green-400"}`, children: [
                  outlet.laborPercent,
                  "%"
                ] }, void 0, true, {
                  fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
                  lineNumber: 533,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
                lineNumber: 526,
                columnNumber: 19
              }, this)
            ] }, outlet.id, true, {
              fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
              lineNumber: 524,
              columnNumber: 17
            }, this)) }, void 0, false, {
              fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
              lineNumber: 520,
              columnNumber: 11
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
          lineNumber: 515,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "div",
        {
          className: "p-6 rounded-lg border border-purple-400/30 bg-black/30",
          style: { backdropFilter: "blur(8px)" },
          children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-lg font-bold text-purple-300 mb-4", children: "🤖 AI Staff Optimization" }, void 0, false, {
              fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
              lineNumber: 547,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-3 text-sm", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-3 bg-yellow-400/10 border border-yellow-400/30 rounded", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-yellow-300 font-semibold mb-1", children: "⚠️ High Labor Outlets" }, void 0, false, {
                  fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
                  lineNumber: 550,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-white/70", children: [
                  outlets.filter((o) => o.laborPercent > 26).length,
                  " outlets over 26% labor cost"
                ] }, void 0, true, {
                  fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
                  lineNumber: 551,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
                lineNumber: 549,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-3 bg-green-400/10 border border-green-400/30 rounded", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-green-300 font-semibold mb-1", children: "✓ Optimization Suggestion" }, void 0, false, {
                  fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
                  lineNumber: 554,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-white/70", children: "Move 2 servers from Outlet 3 (30% labor) to Outlet 17 (22% labor)" }, void 0, false, {
                  fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
                  lineNumber: 555,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
                lineNumber: 553,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-3 bg-blue-400/10 border border-blue-400/30 rounded", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-blue-300 font-semibold mb-1", children: "💰 Potential Savings" }, void 0, false, {
                  fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
                  lineNumber: 558,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-white/70", children: "$2,400/month by rebalancing staff across outlets" }, void 0, false, {
                  fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
                  lineNumber: 559,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
                lineNumber: 557,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
              lineNumber: 548,
              columnNumber: 11
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
          lineNumber: 543,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
      lineNumber: 513,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
    lineNumber: 511,
    columnNumber: 5
  }, this);
}
function KPICard({ title, value, detail, color, onClick }) {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "div",
    {
      onClick,
      className: "p-4 rounded-lg border border-cyan-400/30 bg-black/40 hover:bg-cyan-400/5 cursor-pointer transition-all group",
      style: {
        backdropFilter: "blur(8px)",
        boxShadow: `0 0 20px ${hexToRGBA(color, 0.1)}`
      },
      children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs text-white/60 mb-1", children: title }, void 0, false, {
          fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
          lineNumber: 582,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-2xl font-black mb-1", style: { color }, children: value }, void 0, false, {
          fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
          lineNumber: 583,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs text-white/40 group-hover:text-white/60 transition-all", children: detail }, void 0, false, {
          fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
          lineNumber: 584,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
      lineNumber: 574,
      columnNumber: 5
    },
    this
  );
}
function AlertSection({ outlets, onOpenDetail }) {
  const highLaborOutlets = outlets.filter((o) => o.laborPercent > 26);
  const highFoodOutlets = outlets.filter((o) => o.foodPercent > 28);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "div",
    {
      className: "p-6 rounded-lg border border-red-400/30 bg-red-400/5",
      style: { backdropFilter: "blur(8px)" },
      children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-lg font-bold text-red-400 mb-4", children: "🚨 Alerts & Recommendations" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
          lineNumber: 602,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-3 gap-4 text-sm", children: [
          highLaborOutlets.length > 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-4 bg-red-400/10 rounded border border-red-400/20", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-red-400 font-semibold mb-1", children: [
              highLaborOutlets.length,
              " High Labor Outlets"
            ] }, void 0, true, {
              fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
              lineNumber: 606,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-white/70 text-xs mb-2", children: highLaborOutlets.map((o) => o.name).join(", ") }, void 0, false, {
              fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
              lineNumber: 607,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "button",
              {
                onClick: () => onOpenDetail("labor"),
                className: "text-red-400 hover:text-red-300 text-xs font-semibold",
                children: "View Details →"
              },
              void 0,
              false,
              {
                fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
                lineNumber: 608,
                columnNumber: 13
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
            lineNumber: 605,
            columnNumber: 11
          }, this),
          highFoodOutlets.length > 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-4 bg-orange-400/10 rounded border border-orange-400/20", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-orange-400 font-semibold mb-1", children: [
              highFoodOutlets.length,
              " High Food Cost"
            ] }, void 0, true, {
              fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
              lineNumber: 618,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-white/70 text-xs mb-2", children: highFoodOutlets.map((o) => o.name).join(", ") }, void 0, false, {
              fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
              lineNumber: 619,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "button",
              {
                onClick: () => onOpenDetail("food"),
                className: "text-orange-400 hover:text-orange-300 text-xs font-semibold",
                children: "View Details →"
              },
              void 0,
              false,
              {
                fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
                lineNumber: 620,
                columnNumber: 13
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
            lineNumber: 617,
            columnNumber: 11
          }, this)
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
          lineNumber: 603,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
      lineNumber: 598,
      columnNumber: 5
    },
    this
  );
}
function FloatingWidget({ widget, pos, onPositionChange, onRemove, onOpenDetail }) {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    Rnd,
    {
      position: { x: pos.x, y: pos.y },
      size: { width: pos.w, height: pos.h },
      minWidth: 300,
      minHeight: 250,
      bounds: false,
      onDragStop: (_, d) => onPositionChange({ ...pos, x: d.x, y: d.y }),
      onResizeStop: (_, __, ref, ___, p) => {
        onPositionChange({
          ...pos,
          x: p.x,
          y: p.y,
          w: ref.offsetWidth,
          h: ref.offsetHeight
        });
      },
      style: { zIndex: 1e3 },
      dragHandleClassName: "widget-drag-handle",
      children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "div",
        {
          className: "w-full h-full rounded-lg flex flex-col",
          style: {
            background: "linear-gradient(135deg, rgba(0, 217, 255, 0.1), rgba(0, 217, 255, 0.05))",
            border: "2px solid rgba(0, 217, 255, 0.4)",
            backdropFilter: "blur(15px)",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(0, 217, 255, 0.25)"
          },
          children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "widget-drag-handle flex items-center justify-between p-4 border-b border-cyan-400/20 bg-cyan-400/5 cursor-move", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "font-bold text-cyan-300 text-sm uppercase", children: widget.type }, void 0, false, {
                fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
                lineNumber: 668,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "button",
                {
                  onClick: onRemove,
                  className: "text-white/50 hover:text-red-400 transition-all",
                  children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(X, { size: 16 }, void 0, false, {
                    fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
                    lineNumber: 673,
                    columnNumber: 13
                  }, this)
                },
                void 0,
                false,
                {
                  fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
                  lineNumber: 669,
                  columnNumber: 11
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
              lineNumber: 667,
              columnNumber: 9
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex-1 p-4 overflow-auto", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-white/60 text-sm", children: [
              "Widget content for: ",
              widget.type
            ] }, void 0, true, {
              fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
              lineNumber: 677,
              columnNumber: 11
            }, this) }, void 0, false, {
              fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
              lineNumber: 676,
              columnNumber: 9
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
          lineNumber: 658,
          columnNumber: 7
        },
        this
      )
    },
    void 0,
    false,
    {
      fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
      lineNumber: 639,
      columnNumber: 5
    },
    this
  );
}
function DetailedModalView({ type, outlet, onClose }) {
  const [format, setFormat] = reactExports.useState("overview");
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "div",
    {
      className: "fixed inset-0 flex items-center justify-center z-[2000] p-4",
      style: { backgroundColor: "rgba(0, 0, 0, 0.7)", backdropFilter: "blur(5px)" },
      onClick: onClose,
      children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "div",
        {
          className: "bg-slate-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto border border-cyan-400/40 shadow-2xl",
          style: {
            boxShadow: "0 0 60px rgba(0, 217, 255, 0.3), inset 0 1px 0 rgba(0, 217, 255, 0.2)",
            backdropFilter: "blur(20px)"
          },
          onClick: (e) => e.stopPropagation(),
          children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "sticky top-0 flex items-center justify-between p-6 border-b border-cyan-400/20 bg-gradient-to-r from-slate-900 to-slate-800", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "text-2xl font-bold text-cyan-300", children: outlet ? outlet.name : "Details" }, void 0, false, {
                  fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
                  lineNumber: 708,
                  columnNumber: 13
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-white/60", children: outlet ? outlet.location : type }, void 0, false, {
                  fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
                  lineNumber: 709,
                  columnNumber: 13
                }, this)
              ] }, void 0, true, {
                fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
                lineNumber: 707,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex gap-1 bg-black/50 rounded p-1 border border-cyan-400/20", children: [
                  { id: "overview", label: "Overview" },
                  { id: "detail", label: "Detailed" },
                  { id: "ai", label: "AI Analysis" }
                ].map(({ id, label }) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "button",
                  {
                    onClick: () => setFormat(id),
                    className: `px-3 py-1 text-xs rounded font-semibold transition-all ${format === id ? "bg-cyan-400/30 text-cyan-100" : "text-white/60 hover:text-white/80"}`,
                    children: label
                  },
                  id,
                  false,
                  {
                    fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
                    lineNumber: 719,
                    columnNumber: 17
                  },
                  this
                )) }, void 0, false, {
                  fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
                  lineNumber: 713,
                  columnNumber: 13
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "button",
                  {
                    onClick: onClose,
                    className: "p-2 hover:bg-white/10 rounded text-white/60 hover:text-white",
                    children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(X, { size: 20 }, void 0, false, {
                      fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
                      lineNumber: 736,
                      columnNumber: 15
                    }, this)
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
                    lineNumber: 732,
                    columnNumber: 13
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
                lineNumber: 711,
                columnNumber: 11
              }, this)
            ] }, void 0, true, {
              fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
              lineNumber: 706,
              columnNumber: 9
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-6", children: [
              format === "overview" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(OverviewFormat, { outlet }, void 0, false, {
                fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
                lineNumber: 744,
                columnNumber: 13
              }, this),
              format === "detail" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(DetailFormat, { outlet }, void 0, false, {
                fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
                lineNumber: 747,
                columnNumber: 13
              }, this),
              format === "ai" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AIAnalysisFormat, { outlet }, void 0, false, {
                fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
                lineNumber: 750,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
              lineNumber: 742,
              columnNumber: 9
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
          lineNumber: 697,
          columnNumber: 7
        },
        this
      )
    },
    void 0,
    false,
    {
      fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
      lineNumber: 692,
      columnNumber: 5
    },
    this
  );
}
function OverviewFormat({ outlet }) {
  if (!outlet) return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-white/60", children: "No outlet selected" }, void 0, false, {
    fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
    lineNumber: 763,
    columnNumber: 23
  }, this);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-4", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-4 gap-4", children: [
    { label: "Covers", value: outlet.covers, color: "#00d9ff" },
    { label: "Revenue", value: "$" + outlet.revenue.toLocaleString(), color: "#4dff9e" },
    { label: "Labor %", value: outlet.laborPercent + "%", color: outlet.laborPercent > 26 ? "#ff6b4d" : "#00ff88" },
    { label: "Food %", value: outlet.foodPercent + "%", color: outlet.foodPercent > 28 ? "#ff6b4d" : "#ffc844" }
  ].map((item, i) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-4 rounded-lg border border-cyan-400/20 bg-black/30", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-white/60 text-xs mb-2", children: item.label }, void 0, false, {
      fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
      lineNumber: 775,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-2xl font-bold", style: { color: item.color }, children: item.value }, void 0, false, {
      fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
      lineNumber: 776,
      columnNumber: 13
    }, this)
  ] }, i, true, {
    fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
    lineNumber: 774,
    columnNumber: 11
  }, this)) }, void 0, false, {
    fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
    lineNumber: 767,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
    lineNumber: 766,
    columnNumber: 5
  }, this);
}
function DetailFormat({ outlet }) {
  if (!outlet) return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-white/60", children: "No outlet selected" }, void 0, false, {
    fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
    lineNumber: 785,
    columnNumber: 23
  }, this);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-lg font-bold text-cyan-300 mb-4", children: "Labor Breakdown (FOH/BOH)" }, void 0, false, {
        fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
        lineNumber: 790,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-4 rounded-lg border border-cyan-400/20 bg-black/30", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "font-semibold text-cyan-300 mb-3", children: "Front of House" }, void 0, false, {
            fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
            lineNumber: 794,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-2 text-sm", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-white/60", children: "Servers" }, void 0, false, {
                fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
                lineNumber: 796,
                columnNumber: 53
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-cyan-300 font-semibold", children: "6" }, void 0, false, {
                fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
                lineNumber: 796,
                columnNumber: 99
              }, this)
            ] }, void 0, true, {
              fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
              lineNumber: 796,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-white/60", children: "Hosts" }, void 0, false, {
                fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
                lineNumber: 797,
                columnNumber: 53
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-cyan-300 font-semibold", children: "2" }, void 0, false, {
                fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
                lineNumber: 797,
                columnNumber: 97
              }, this)
            ] }, void 0, true, {
              fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
              lineNumber: 797,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-white/60", children: "Bartenders" }, void 0, false, {
                fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
                lineNumber: 798,
                columnNumber: 53
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-cyan-300 font-semibold", children: "3" }, void 0, false, {
                fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
                lineNumber: 798,
                columnNumber: 102
              }, this)
            ] }, void 0, true, {
              fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
              lineNumber: 798,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-between border-t border-cyan-400/10 pt-2", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-white/80 font-semibold", children: "Total FOH" }, void 0, false, {
                fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
                lineNumber: 799,
                columnNumber: 86
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-cyan-300 font-bold", children: "11" }, void 0, false, {
                fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
                lineNumber: 799,
                columnNumber: 148
              }, this)
            ] }, void 0, true, {
              fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
              lineNumber: 799,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
            lineNumber: 795,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
          lineNumber: 793,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-4 rounded-lg border border-purple-400/20 bg-black/30", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "font-semibold text-purple-300 mb-3", children: "Back of House" }, void 0, false, {
            fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
            lineNumber: 805,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-2 text-sm", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-white/60", children: "Line Cooks" }, void 0, false, {
                fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
                lineNumber: 807,
                columnNumber: 53
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-purple-300 font-semibold", children: "4" }, void 0, false, {
                fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
                lineNumber: 807,
                columnNumber: 102
              }, this)
            ] }, void 0, true, {
              fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
              lineNumber: 807,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-white/60", children: "Prep Cooks" }, void 0, false, {
                fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
                lineNumber: 808,
                columnNumber: 53
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-purple-300 font-semibold", children: "2" }, void 0, false, {
                fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
                lineNumber: 808,
                columnNumber: 102
              }, this)
            ] }, void 0, true, {
              fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
              lineNumber: 808,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-white/60", children: "Expeditor" }, void 0, false, {
                fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
                lineNumber: 809,
                columnNumber: 53
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-purple-300 font-semibold", children: "1" }, void 0, false, {
                fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
                lineNumber: 809,
                columnNumber: 101
              }, this)
            ] }, void 0, true, {
              fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
              lineNumber: 809,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-between border-t border-purple-400/10 pt-2", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-white/80 font-semibold", children: "Total BOH" }, void 0, false, {
                fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
                lineNumber: 810,
                columnNumber: 88
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-purple-300 font-bold", children: "7" }, void 0, false, {
                fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
                lineNumber: 810,
                columnNumber: 150
              }, this)
            ] }, void 0, true, {
              fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
              lineNumber: 810,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
            lineNumber: 806,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
          lineNumber: 804,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
        lineNumber: 791,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
      lineNumber: 789,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-lg font-bold text-cyan-300 mb-4", children: "Shift Schedule" }, void 0, false, {
        fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
        lineNumber: 817,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-3 gap-4 text-sm", children: ["Breakfast", "Lunch", "Dinner"].map((shift) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-3 rounded border border-cyan-400/20 bg-black/30", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-cyan-300 font-semibold mb-2", children: shift }, void 0, false, {
          fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
          lineNumber: 821,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-1 text-white/70", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { children: "Staff: 8-12" }, void 0, false, {
            fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
            lineNumber: 823,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { children: [
            "Hours: ",
            shift === "Breakfast" ? "6-11" : shift === "Lunch" ? "11-2" : "5-11"
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
            lineNumber: 824,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
          lineNumber: 822,
          columnNumber: 15
        }, this)
      ] }, shift, true, {
        fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
        lineNumber: 820,
        columnNumber: 13
      }, this)) }, void 0, false, {
        fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
        lineNumber: 818,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
      lineNumber: 816,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
    lineNumber: 788,
    columnNumber: 5
  }, this);
}
function AIAnalysisFormat({ outlet }) {
  if (!outlet) return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-white/60", children: "No outlet selected" }, void 0, false, {
    fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
    lineNumber: 835,
    columnNumber: 23
  }, this);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-4 rounded-lg border border-yellow-400/30 bg-yellow-400/5", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "font-semibold text-yellow-300 mb-2", children: "⚠️ Issue Identified" }, void 0, false, {
        fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
        lineNumber: 840,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-white/80 text-sm mb-3", children: [
        "Labor cost at ",
        outlet.laborPercent,
        "% - ",
        outlet.laborPercent > 26 ? "ABOVE" : "BELOW",
        " 26% target"
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
        lineNumber: 841,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-white/60 text-sm", children: [
        "Current labor spend suggests ",
        outlet.laborPercent > 26 ? "over-staffing" : "optimal staffing",
        " for revenue level."
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
        lineNumber: 842,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
      lineNumber: 839,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-4 rounded-lg border border-green-400/30 bg-green-400/5", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "font-semibold text-green-300 mb-2", children: "✓ AI Recommendations" }, void 0, false, {
        fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
        lineNumber: 846,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("ul", { className: "space-y-2 text-sm text-white/70", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: "• Reduce server count during off-peak hours (11 AM - 4 PM)" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
          lineNumber: 848,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: "• Cross-train staff to handle multiple roles (increase efficiency)" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
          lineNumber: 849,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: "• Implement tighter scheduling based on historical cover patterns" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
          lineNumber: 850,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: "• Consider combining FOH/BOH prep during slower periods" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
          lineNumber: 851,
          columnNumber: 11
        }, this),
        outlet.laborPercent > 26 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: "• Move 1-2 servers to outlet with lower labor %" }, void 0, false, {
            fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
            lineNumber: 854,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: "• Potential monthly savings: $1,200 - $1,800" }, void 0, false, {
            fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
            lineNumber: 855,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
          lineNumber: 853,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
        lineNumber: 847,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
      lineNumber: 845,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-4 rounded-lg border border-blue-400/30 bg-blue-400/5", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "font-semibold text-blue-300 mb-2", children: "📊 Historical Comparison" }, void 0, false, {
        fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
        lineNumber: 862,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-white/70 text-sm", children: [
        "30-day average: ",
        Math.round(outlet.laborPercent - 1),
        "% | 7-day trend: ↑ ",
        Math.round(Math.random() * 2),
        "%"
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
        lineNumber: 863,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
      lineNumber: 861,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/AdvancedHUD.jsx",
    lineNumber: 838,
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
  AdvancedHUD as default
};
