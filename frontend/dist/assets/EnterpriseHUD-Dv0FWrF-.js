import { r as reactExports, j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
import { G as GripHorizontal, M as Maximize2, R as Rnd$1, a as RND_NS, X } from "./Board-6RvNRUqx.js";
import { P as Plus } from "./plus-BoqphXwa.js";
import { M as Minimize2 } from "./minimize-2-DaPLM2HR.js";
import { Z as Zap } from "./zap-D7rSfwrr.js";
import { G as Grid3x3, L as List } from "./list-Dw93bOqv.js";
import { M as Menu } from "./menu-DEUbRb1B.js";
import { A as Activity, T as TrendingUp } from "./trending-up-B8JAO1nL.js";
import { D as DollarSign } from "./dollar-sign-Dd2757Ez.js";
import { C as ChefHat } from "./chef-hat-BgZX9Th7.js";
import { T as TriangleAlert } from "./triangle-alert-BirfCPt0.js";
import "./settings-CL5KYzJi.js";
reactExports.createContext(null);
const DEFAULT_USER = {
  id: "user-1",
  name: "Chef Marco",
  role: "chef",
  // 'chef' | 'manager' | 'director' | 'owner'
  outletIds: ["outlet-1"],
  // outlets this user can see
  permissions: ["view_dashboard", "view_labor", "view_financials"]
};
function useUserRole() {
  const [user, setUser] = reactExports.useState(() => {
    try {
      const stored = localStorage.getItem("luccca:user:role:v1");
      return stored ? JSON.parse(stored) : DEFAULT_USER;
    } catch {
      return DEFAULT_USER;
    }
  });
  reactExports.useEffect(() => {
    localStorage.setItem("luccca:user:role:v1", JSON.stringify(user));
  }, [user]);
  const switchRole = (role, outletIds = ["outlet-1"]) => {
    setUser((prev) => ({
      ...prev,
      role,
      outletIds,
      name: getRoleDisplayName(role)
    }));
  };
  const canViewOutlet = (outletId) => {
    return user.outletIds.includes(outletId);
  };
  const canViewAllOutlets = () => {
    return user.role === "owner" || user.role === "director";
  };
  const hasPermission = (permission) => {
    return user.permissions.includes(permission);
  };
  return {
    user,
    switchRole,
    canViewOutlet,
    canViewAllOutlets,
    hasPermission
  };
}
function getRoleDisplayName(role) {
  const names = {
    "chef": "Chef - Single Outlet",
    "manager": "Manager - Regional",
    "director": "Director - Multi-Outlet",
    "owner": "Owner - All Outlets"
  };
  return names[role] || "User";
}
const Rnd = Rnd$1 ?? void 0 ?? RND_NS;
const LS_HUD = "luccca:enterprise:hud:v2";
const LS_PANELS = "luccca:enterprise:panels:v1";
const MOCK_OUTLETS = Array.from({ length: 20 }, (_, i) => ({
  id: `outlet-${i + 1}`,
  name: `Restaurant ${i + 1}`,
  location: `City ${String.fromCharCode(65 + i % 26)}`,
  covers: Math.floor(800 + Math.random() * 600),
  revenue: Math.floor(35e3 + Math.random() * 2e4),
  laborPercent: Math.floor(20 + Math.random() * 12),
  foodPercent: Math.floor(24 + Math.random() * 8),
  staffCount: Math.floor(12 + Math.random() * 10),
  efficiency: Math.floor(75 + Math.random() * 20),
  alerts: Math.floor(Math.random() * 4),
  fohStaff: { servers: 6, hosts: 2, bartenders: 3 },
  bohStaff: { lineCooks: 4, prepCooks: 2, expeditor: 1 }
}));
function EnterpriseHUD() {
  const containerRef = reactExports.useRef(null);
  const { user, canViewOutlet, canViewAllOutlets } = useUserRole();
  const [viewMode, setViewMode] = reactExports.useState("dashboard");
  const [format, setFormat] = reactExports.useState("grid");
  const [selectedOutlets, setSelectedOutlets] = reactExports.useState([]);
  const [detailedModal, setDetailedModal] = reactExports.useState(null);
  const [showRoleMenu, setShowRoleMenu] = reactExports.useState(false);
  const [isMaximized, setIsMaximized] = reactExports.useState(true);
  const [currentTime, setCurrentTime] = reactExports.useState(/* @__PURE__ */ new Date());
  const [panels, setPanels] = reactExports.useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(LS_PANELS) || "null");
      return saved || getDefaultPanels();
    } catch {
      return getDefaultPanels();
    }
  });
  const [zIndex, setZIndex] = reactExports.useState(10);
  const visibleOutlets = reactExports.useMemo(() => {
    return MOCK_OUTLETS.filter((o) => canViewOutlet(o.id));
  }, [user.outletIds]);
  reactExports.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(/* @__PURE__ */ new Date()), 1e3);
    return () => clearInterval(timer);
  }, []);
  reactExports.useEffect(() => {
    window.dispatchEvent(new Event("dashboard-ready"));
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event("dashboard-ready"));
    }, 10);
    return () => clearTimeout(timer);
  }, []);
  reactExports.useEffect(() => {
    localStorage.setItem(LS_HUD, JSON.stringify({
      viewMode,
      format,
      selectedOutlets
    }));
  }, [viewMode, format, selectedOutlets]);
  reactExports.useEffect(() => {
    localStorage.setItem(LS_PANELS, JSON.stringify(panels));
  }, [panels]);
  const updatePanel = reactExports.useCallback((panelId, updates) => {
    setPanels((prev) => prev.map((p) => p.id === panelId ? { ...p, ...updates } : p));
  }, []);
  const removePanel = reactExports.useCallback((panelId) => {
    setPanels((prev) => prev.filter((p) => p.id !== panelId));
  }, []);
  const bringToFront = reactExports.useCallback((panelId) => {
    setZIndex((z) => z + 1);
    updatePanel(panelId, { z: zIndex + 1 });
  }, [zIndex, updatePanel]);
  const addPanel = reactExports.useCallback(() => {
    const newPanel = {
      id: "panel-" + Math.random().toString(36).slice(2, 8),
      title: "New Panel",
      x: 100 + Math.random() * 200,
      y: 100 + Math.random() * 200,
      width: 400,
      height: 300,
      z: zIndex + 1,
      pinned: false,
      color: "#00d9ff"
    };
    setPanels((prev) => [...prev, newPanel]);
    setZIndex((z) => z + 1);
  }, [zIndex]);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "div",
    {
      ref: containerRef,
      className: "relative w-full h-full flex flex-col overflow-hidden bg-slate-900",
      style: {
        background: "radial-gradient(1800px 900px at 50% 0%, rgba(0, 217, 255, 0.12), transparent 60%), linear-gradient(180deg, #0a1628 0%, #0f1f34 100%)"
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
              opacity: 0.02,
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 217, 255, 0.5) 2px, rgba(0, 217, 255, 0.5) 4px)",
              zIndex: 9999
            }
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
            lineNumber: 127,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          WelcomeHeader,
          {
            user,
            currentTime,
            outletCount: visibleOutlets.length,
            isMaximized,
            onMaximize: () => setIsMaximized(!isMaximized)
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
            lineNumber: 142,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          HUDHeader,
          {
            user,
            viewMode,
            onViewChange: setViewMode,
            format,
            onFormatChange: setFormat,
            outletCount: visibleOutlets.length,
            showRoleMenu,
            onToggleRoleMenu: () => setShowRoleMenu(!showRoleMenu)
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
            lineNumber: 151,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex-1 overflow-auto relative", style: { position: "relative" }, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { position: "absolute", inset: 0, pointerEvents: "none" }, children: [
            viewMode === "dashboard" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              DashboardView,
              {
                outlets: visibleOutlets,
                user,
                onOpenDetail: setDetailedModal
              },
              void 0,
              false,
              {
                fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
                lineNumber: 167,
                columnNumber: 13
              },
              this
            ),
            viewMode === "outlets" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              OutletsView,
              {
                outlets: visibleOutlets,
                format,
                selectedOutlets,
                onSelectOutlet: (id) => setSelectedOutlets(
                  (prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
                ),
                onOpenDetail: setDetailedModal,
                canViewAll: canViewAllOutlets()
              },
              void 0,
              false,
              {
                fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
                lineNumber: 175,
                columnNumber: 13
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
            lineNumber: 165,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { position: "absolute", inset: 0 }, children: panels.map((panel) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            FloatingPanel,
            {
              panel,
              onUpdate: (updates) => updatePanel(panel.id, updates),
              onRemove: () => removePanel(panel.id),
              onFocus: () => bringToFront(panel.id)
            },
            panel.id,
            false,
            {
              fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
              lineNumber: 191,
              columnNumber: 13
            },
            this
          )) }, void 0, false, {
            fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
            lineNumber: 189,
            columnNumber: 9
          }, this)
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
          lineNumber: 163,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "button",
          {
            onClick: addPanel,
            className: "fixed bottom-6 right-6 p-3 bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-full shadow-lg hover:shadow-cyan-500/50 transition-all hover:scale-110",
            title: "Add floating panel",
            style: {
              boxShadow: "0 0 20px rgba(0, 217, 255, 0.5)",
              zIndex: 1e3
            },
            children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Plus, { size: 24 }, void 0, false, {
              fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
              lineNumber: 212,
              columnNumber: 9
            }, this)
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
            lineNumber: 203,
            columnNumber: 7
          },
          this
        ),
        detailedModal && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          DetailModal,
          {
            outlet: detailedModal,
            onClose: () => setDetailedModal(null)
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
            lineNumber: 217,
            columnNumber: 9
          },
          this
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("style", { children: `
        @keyframes jarvisGlow {
          0%, 100% { text-shadow: 0 0 5px rgba(0, 217, 255, 0.5); }
          50% { text-shadow: 0 0 20px rgba(0, 217, 255, 0.8); }
        }
        @keyframes hologramFlicker {
          0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; }
          20%, 24%, 55% { opacity: 0.8; }
        }
        @keyframes particleFloat {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100px) translateX(20px); opacity: 0; }
        }
        .jarvis-glow { animation: jarvisGlow 2s ease-in-out infinite; }
        .hologram-effect { animation: hologramFlicker 0.15s infinite; }
        .particle { animation: particleFloat 3s ease-out forwards; }
      ` }, void 0, false, {
          fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
          lineNumber: 223,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
      lineNumber: 118,
      columnNumber: 5
    },
    this
  );
}
function getDefaultPanels() {
  return [
    {
      id: "kpi-covers",
      title: "Today's Covers",
      x: 100,
      y: 100,
      width: 300,
      height: 250,
      z: 10,
      pinned: true,
      color: "#00d9ff"
    },
    {
      id: "kpi-revenue",
      title: "Revenue",
      x: 420,
      y: 100,
      width: 300,
      height: 250,
      z: 11,
      pinned: true,
      color: "#00ff88"
    },
    {
      id: "kpi-labor",
      title: "Labor Cost %",
      x: 740,
      y: 100,
      width: 300,
      height: 250,
      z: 12,
      pinned: true,
      color: "#ffc844"
    },
    {
      id: "kpi-food",
      title: "Food Cost %",
      x: 250,
      y: 370,
      width: 300,
      height: 250,
      z: 13,
      pinned: true,
      color: "#ff4d7d"
    }
  ];
}
function WelcomeHeader({ user, currentTime, outletCount, isMaximized, onMaximize }) {
  const hour = currentTime.getHours();
  let greeting = "";
  let emoji = "";
  if (hour >= 5 && hour < 12) {
    greeting = "Good Morning, Chef";
    emoji = "🌅";
  } else if (hour >= 12 && hour < 17) {
    greeting = "Good Afternoon, Chef";
    emoji = "🌤️";
  } else if (hour >= 17 && hour < 21) {
    greeting = "Good Evening, Chef";
    emoji = "🌙";
  } else {
    greeting = "Night Service, Chef";
    emoji = "🌃";
  }
  const timeStr = currentTime.toLocaleTimeString();
  const dateStr = currentTime.toLocaleDateString();
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "div",
    {
      className: "flex-shrink-0 border-b border-cyan-400/20 px-8 py-6",
      style: {
        background: "linear-gradient(90deg, rgba(0, 217, 255, 0.08), rgba(0, 217, 255, 0.03))",
        backdropFilter: "blur(20px)",
        boxShadow: "0 4px 20px rgba(0, 217, 255, 0.1)"
      },
      children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-start justify-between gap-6", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-baseline gap-3 mb-3", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-4xl flex-shrink-0", children: emoji }, void 0, false, {
              fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
              lineNumber: 331,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-4xl font-bold tracking-tight bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent jarvis-glow", children: greeting }, void 0, false, {
              fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
              lineNumber: 332,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
            lineNumber: 330,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-6 text-sm", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "font-mono text-cyan-400/70 border border-cyan-400/30 px-3 py-1 rounded", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "inline-block w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse mr-2" }, void 0, false, {
                fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
                lineNumber: 338,
                columnNumber: 15
              }, this),
              timeStr,
              " • ",
              dateStr
            ] }, void 0, true, {
              fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
              lineNumber: 337,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-cyan-300/70", children: [
              user.name,
              " • ",
              outletCount,
              " outlet",
              outletCount !== 1 ? "s" : ""
            ] }, void 0, true, {
              fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
              lineNumber: 341,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
            lineNumber: 336,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-xs text-cyan-400/50 mt-2 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(GripHorizontal, { size: 12 }, void 0, false, {
              fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
              lineNumber: 346,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: "Drag panels • Pin to grid • Pop out anytime" }, void 0, false, {
              fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
              lineNumber: 347,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
            lineNumber: 345,
            columnNumber: 11
          }, this)
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
          lineNumber: 329,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "button",
          {
            onClick: onMaximize,
            className: "flex-shrink-0 p-2 rounded hover:bg-cyan-400/10 transition-colors",
            title: isMaximized ? "Minimize" : "Maximize",
            children: isMaximized ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Minimize2, { size: 20, className: "text-cyan-300" }, void 0, false, {
              fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
              lineNumber: 355,
              columnNumber: 26
            }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Maximize2, { size: 20, className: "text-cyan-300" }, void 0, false, {
              fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
              lineNumber: 355,
              columnNumber: 78
            }, this)
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
            lineNumber: 350,
            columnNumber: 9
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
        lineNumber: 328,
        columnNumber: 7
      }, this)
    },
    void 0,
    false,
    {
      fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
      lineNumber: 320,
      columnNumber: 5
    },
    this
  );
}
function HUDHeader({ user, viewMode, onViewChange, format, onFormatChange, outletCount, showRoleMenu, onToggleRoleMenu }) {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "div",
    {
      className: "flex-shrink-0 border-b border-cyan-400/30 px-6 py-3 flex items-center justify-between",
      style: {
        background: "linear-gradient(90deg, rgba(0, 217, 255, 0.05), rgba(0, 217, 255, 0.02))",
        backdropFilter: "blur(20px)",
        boxShadow: "0 0 20px rgba(0, 217, 255, 0.1)"
      },
      children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-4", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { className: "text-lg font-bold jarvis-glow text-cyan-300", children: "NEXUS" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
          lineNumber: 373,
          columnNumber: 9
        }, this) }, void 0, false, {
          fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
          lineNumber: 372,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex gap-1 bg-black/40 rounded-lg p-1 border border-cyan-400/20", children: [
            { id: "dashboard", label: "Dashboard", icon: Zap },
            { id: "outlets", label: "20 Outlets", icon: Grid3x3 }
          ].map(({ id, label, icon: Icon }) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "button",
            {
              onClick: () => onViewChange(id),
              className: `px-3 py-1.5 text-xs font-semibold rounded flex items-center gap-1.5 transition-all ${viewMode === id ? "bg-cyan-400/30 text-cyan-100 border border-cyan-400/40" : "text-cyan-400/60 hover:text-cyan-300"}`,
              title: label,
              children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Icon, { size: 14 }, void 0, false, {
                  fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
                  lineNumber: 393,
                  columnNumber: 15
                }, this),
                label
              ]
            },
            id,
            true,
            {
              fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
              lineNumber: 383,
              columnNumber: 13
            },
            this
          )) }, void 0, false, {
            fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
            lineNumber: 378,
            columnNumber: 9
          }, this),
          viewMode === "outlets" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex gap-1 bg-black/40 rounded-lg p-1 border border-cyan-400/20", children: [
            { id: "grid", icon: Grid3x3 },
            { id: "list", icon: List }
          ].map(({ id, icon: Icon }) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "button",
            {
              onClick: () => onFormatChange(id),
              className: `px-2.5 py-1.5 rounded transition-all ${format === id ? "bg-cyan-400/30 text-cyan-100" : "text-cyan-400/60 hover:text-cyan-300"}`,
              title: id,
              children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Icon, { size: 14 }, void 0, false, {
                fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
                lineNumber: 416,
                columnNumber: 17
              }, this)
            },
            id,
            false,
            {
              fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
              lineNumber: 406,
              columnNumber: 15
            },
            this
          )) }, void 0, false, {
            fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
            lineNumber: 401,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "button",
            {
              onClick: onToggleRoleMenu,
              className: "p-2 rounded hover:bg-cyan-400/10 transition-colors",
              title: "Role & Settings",
              children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Menu, { size: 16, className: "text-cyan-400" }, void 0, false, {
                fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
                lineNumber: 428,
                columnNumber: 11
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
              lineNumber: 423,
              columnNumber: 9
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
          lineNumber: 376,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
      lineNumber: 364,
      columnNumber: 5
    },
    this
  );
}
function FloatingPanel({ panel, onUpdate, onRemove, onFocus }) {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    Rnd,
    {
      default: {
        x: panel.x,
        y: panel.y,
        width: panel.width,
        height: panel.height
      },
      onDragStop: (e, d) => onUpdate({ x: d.x, y: d.y }),
      onResizeStop: (e, direction, ref, delta, position) => {
        onUpdate({
          width: ref.offsetWidth,
          height: ref.offsetHeight,
          x: position.x,
          y: position.y
        });
      },
      bounds: "parent",
      onMouseDown: onFocus,
      style: {
        zIndex: panel.z
      },
      dragHandleClassName: "hud-drag-handle",
      enableResizing: {
        bottom: true,
        right: true,
        bottomRight: true
      },
      children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "div",
        {
          className: "relative w-full h-full rounded-lg border border-cyan-400/40 overflow-hidden shadow-lg",
          style: {
            background: "linear-gradient(135deg, rgba(0, 217, 255, 0.05), rgba(0, 217, 255, 0.02))",
            backdropFilter: "blur(20px)",
            boxShadow: `0 0 30px ${panel.color}40, 0 0 60px ${panel.color}20, inset 0 0 20px ${panel.color}10`
          },
          children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "div",
              {
                className: "hud-drag-handle border-b border-cyan-400/20 px-4 py-3 flex items-center justify-between cursor-grab active:cursor-grabbing select-none",
                style: {
                  background: `linear-gradient(90deg, ${panel.color}15, ${panel.color}05)`,
                  backdropFilter: "blur(10px)"
                },
                children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-3 flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(GripHorizontal, { size: 14, className: "text-cyan-400/60 flex-shrink-0" }, void 0, false, {
                      fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
                      lineNumber: 482,
                      columnNumber: 13
                    }, this),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-sm font-semibold text-cyan-200 truncate", children: panel.title }, void 0, false, {
                      fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
                      lineNumber: 483,
                      columnNumber: 13
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
                    lineNumber: 481,
                    columnNumber: 11
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-1 flex-shrink-0", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                    "button",
                    {
                      onClick: onRemove,
                      className: "p-1 rounded hover:bg-red-500/20 transition-colors",
                      title: "Close",
                      children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(X, { size: 14, className: "text-red-400" }, void 0, false, {
                        fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
                        lineNumber: 491,
                        columnNumber: 15
                      }, this)
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
                      lineNumber: 486,
                      columnNumber: 13
                    },
                    this
                  ) }, void 0, false, {
                    fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
                    lineNumber: 485,
                    columnNumber: 11
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
                lineNumber: 474,
                columnNumber: 9
              },
              this
            ),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex-1 overflow-auto p-4 text-cyan-100/70 text-sm", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: "Panel ID:" }, void 0, false, {
                  fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
                  lineNumber: 500,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "font-mono text-xs text-cyan-400", children: panel.id }, void 0, false, {
                  fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
                  lineNumber: 501,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
                lineNumber: 499,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center mt-4 text-cyan-400/50", children: "💡 Drag by header to move" }, void 0, false, {
                fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
                lineNumber: 503,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center text-cyan-400/50 text-xs", children: "Resize from bottom-right corner" }, void 0, false, {
                fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
                lineNumber: 506,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
              lineNumber: 498,
              columnNumber: 11
            }, this) }, void 0, false, {
              fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
              lineNumber: 497,
              columnNumber: 9
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
          lineNumber: 465,
          columnNumber: 7
        },
        this
      )
    },
    void 0,
    false,
    {
      fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
      lineNumber: 437,
      columnNumber: 5
    },
    this
  );
}
function DashboardView({ outlets, user, onOpenDetail }) {
  const totalCovers = outlets.reduce((sum, o) => sum + o.covers, 0);
  const totalRevenue = outlets.reduce((sum, o) => sum + o.revenue, 0);
  const avgLabor = Math.round(outlets.reduce((sum, o) => sum + o.laborPercent, 0) / outlets.length);
  const avgFood = Math.round(outlets.reduce((sum, o) => sum + o.foodPercent, 0) / outlets.length);
  const highLaborOutlets = outlets.filter((o) => o.laborPercent > 26);
  const highFoodOutlets = outlets.filter((o) => o.foodPercent > 28);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-full h-full p-8 overflow-auto", style: { pointerEvents: "auto" }, children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(KPICard, { icon: Activity, label: "Total Covers", value: totalCovers.toLocaleString(), color: "#00d9ff", target: "" }, void 0, false, {
        fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
        lineNumber: 529,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(KPICard, { icon: DollarSign, label: "Revenue", value: `$${(totalRevenue / 1e3).toFixed(1)}K`, color: "#00ff88", target: "" }, void 0, false, {
        fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
        lineNumber: 530,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(KPICard, { icon: ChefHat, label: "Labor Cost", value: `${avgLabor}%`, color: avgLabor > 26 ? "#ff6b4d" : "#00ff88", target: "Target: 26%" }, void 0, false, {
        fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
        lineNumber: 531,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(KPICard, { icon: TrendingUp, label: "Food Cost", value: `${avgFood}%`, color: avgFood > 28 ? "#ff6b4d" : "#00ff88", target: "Target: 28%" }, void 0, false, {
        fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
        lineNumber: 532,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
      lineNumber: 528,
      columnNumber: 7
    }, this),
    (highLaborOutlets.length > 0 || highFoodOutlets.length > 0) && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-6 border border-yellow-500/40 rounded-lg p-4 bg-yellow-500/5", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-2 mb-3 text-yellow-300", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TriangleAlert, { size: 18 }, void 0, false, {
          fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
          lineNumber: 539,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "font-semibold", children: "Alerts" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
          lineNumber: 540,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
        lineNumber: 538,
        columnNumber: 11
      }, this),
      highLaborOutlets.length > 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-sm text-yellow-200/70 mb-2", children: [
        "🔴 ",
        highLaborOutlets.length,
        " outlet",
        highLaborOutlets.length > 1 ? "s" : "",
        " with high labor: ",
        highLaborOutlets.map((o) => o.name).join(", ")
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
        lineNumber: 543,
        columnNumber: 13
      }, this),
      highFoodOutlets.length > 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-sm text-yellow-200/70", children: [
        "🔴 ",
        highFoodOutlets.length,
        " outlet",
        highFoodOutlets.length > 1 ? "s" : "",
        " with high food cost: ",
        highFoodOutlets.map((o) => o.name).join(", ")
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
        lineNumber: 548,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
      lineNumber: 537,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-cyan-300 font-semibold mb-3", children: "Outlet Overview (First 6)" }, void 0, false, {
      fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
      lineNumber: 556,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3", children: outlets.slice(0, 6).map((outlet) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "div",
      {
        className: "border border-cyan-400/30 rounded-lg p-3 cursor-pointer hover:border-cyan-300 hover:bg-cyan-400/5 transition-all",
        onClick: () => onOpenDetail(outlet),
        children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-sm font-semibold text-cyan-200 mb-2", children: outlet.name }, void 0, false, {
            fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
            lineNumber: 564,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-xs space-y-1 text-cyan-300/70", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: "Covers:" }, void 0, false, {
                fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
                lineNumber: 567,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "font-semibold text-cyan-300", children: outlet.covers }, void 0, false, {
                fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
                lineNumber: 568,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
              lineNumber: 566,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: "Labor:" }, void 0, false, {
                fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
                lineNumber: 571,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: outlet.laborPercent > 26 ? "text-red-400" : "text-green-400", children: [
                outlet.laborPercent,
                "%"
              ] }, void 0, true, {
                fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
                lineNumber: 572,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
              lineNumber: 570,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: "Food:" }, void 0, false, {
                fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
                lineNumber: 575,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: outlet.foodPercent > 28 ? "text-red-400" : "text-green-400", children: [
                outlet.foodPercent,
                "%"
              ] }, void 0, true, {
                fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
                lineNumber: 576,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
              lineNumber: 574,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
            lineNumber: 565,
            columnNumber: 13
          }, this)
        ]
      },
      outlet.id,
      true,
      {
        fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
        lineNumber: 559,
        columnNumber: 11
      },
      this
    )) }, void 0, false, {
      fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
      lineNumber: 557,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
    lineNumber: 526,
    columnNumber: 5
  }, this);
}
function OutletsView({ outlets, format, selectedOutlets, onSelectOutlet, onOpenDetail, canViewAll }) {
  if (format === "grid") {
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-full h-full p-8 overflow-auto", style: { pointerEvents: "auto" }, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4", children: outlets.map((outlet) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "div",
      {
        className: "border border-cyan-400/30 rounded-lg p-4 cursor-pointer hover:border-cyan-300 hover:bg-cyan-400/5 transition-all",
        onClick: () => onOpenDetail(outlet),
        children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-sm font-semibold text-cyan-200 mb-2", children: outlet.name }, void 0, false, {
            fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
            lineNumber: 597,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-xs space-y-2 text-cyan-300/70 mb-3", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: "Covers:" }, void 0, false, {
                fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
                lineNumber: 600,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "font-semibold", children: outlet.covers }, void 0, false, {
                fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
                lineNumber: 601,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
              lineNumber: 599,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: "Revenue:" }, void 0, false, {
                fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
                lineNumber: 604,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "font-semibold", children: [
                "$",
                (outlet.revenue / 1e3).toFixed(1),
                "K"
              ] }, void 0, true, {
                fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
                lineNumber: 605,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
              lineNumber: 603,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: "Labor:" }, void 0, false, {
                fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
                lineNumber: 608,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: outlet.laborPercent > 26 ? "text-red-400" : "text-green-400", children: [
                outlet.laborPercent,
                "%"
              ] }, void 0, true, {
                fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
                lineNumber: 609,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
              lineNumber: 607,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
            lineNumber: 598,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "button",
            {
              onClick: (e) => {
                e.stopPropagation();
                onOpenDetail(outlet);
              },
              className: "w-full text-xs bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-300 py-1.5 rounded transition-colors",
              children: "View Details"
            },
            void 0,
            false,
            {
              fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
              lineNumber: 612,
              columnNumber: 15
            },
            this
          )
        ]
      },
      outlet.id,
      true,
      {
        fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
        lineNumber: 592,
        columnNumber: 13
      },
      this
    )) }, void 0, false, {
      fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
      lineNumber: 590,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
      lineNumber: 589,
      columnNumber: 7
    }, this);
  }
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-full h-full p-8 overflow-auto", style: { pointerEvents: "auto" }, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("table", { className: "w-full text-sm text-cyan-100/70", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("thead", { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("tr", { className: "border-b border-cyan-400/20 text-cyan-300 font-semibold text-left", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("th", { className: "pb-2 px-3", children: "Outlet" }, void 0, false, {
        fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
        lineNumber: 633,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("th", { className: "pb-2 px-3 text-right", children: "Covers" }, void 0, false, {
        fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
        lineNumber: 634,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("th", { className: "pb-2 px-3 text-right", children: "Revenue" }, void 0, false, {
        fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
        lineNumber: 635,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("th", { className: "pb-2 px-3 text-right", children: "Labor %" }, void 0, false, {
        fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
        lineNumber: 636,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("th", { className: "pb-2 px-3 text-right", children: "Food %" }, void 0, false, {
        fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
        lineNumber: 637,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("th", { className: "pb-2 px-3 text-right", children: "Action" }, void 0, false, {
        fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
        lineNumber: 638,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
      lineNumber: 632,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
      lineNumber: 631,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("tbody", { children: outlets.map((outlet) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("tr", { className: "border-b border-cyan-400/10 hover:bg-cyan-400/5 transition-colors", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("td", { className: "py-3 px-3 text-cyan-200", children: outlet.name }, void 0, false, {
        fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
        lineNumber: 644,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("td", { className: "py-3 px-3 text-right", children: outlet.covers }, void 0, false, {
        fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
        lineNumber: 645,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("td", { className: "py-3 px-3 text-right", children: [
        "$",
        (outlet.revenue / 1e3).toFixed(1),
        "K"
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
        lineNumber: 646,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("td", { className: `py-3 px-3 text-right ${outlet.laborPercent > 26 ? "text-red-400" : "text-green-400"}`, children: [
        outlet.laborPercent,
        "%"
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
        lineNumber: 647,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("td", { className: `py-3 px-3 text-right ${outlet.foodPercent > 28 ? "text-red-400" : "text-green-400"}`, children: [
        outlet.foodPercent,
        "%"
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
        lineNumber: 648,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("td", { className: "py-3 px-3 text-right", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "button",
        {
          onClick: () => onOpenDetail(outlet),
          className: "text-xs bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-300 px-2 py-1 rounded transition-colors",
          children: "View"
        },
        void 0,
        false,
        {
          fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
          lineNumber: 650,
          columnNumber: 17
        },
        this
      ) }, void 0, false, {
        fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
        lineNumber: 649,
        columnNumber: 15
      }, this)
    ] }, outlet.id, true, {
      fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
      lineNumber: 643,
      columnNumber: 13
    }, this)) }, void 0, false, {
      fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
      lineNumber: 641,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
    lineNumber: 630,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
    lineNumber: 629,
    columnNumber: 5
  }, this);
}
function KPICard({ icon: Icon, label, value, color, target }) {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "div",
    {
      className: "rounded-lg p-4 border border-cyan-400/30 overflow-hidden",
      style: {
        background: `linear-gradient(135deg, ${color}15, ${color}05)`,
        boxShadow: `0 0 20px ${color}30, inset 0 0 10px ${color}10`,
        backdropFilter: "blur(10px)"
      },
      children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between mb-2", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-xs font-semibold text-cyan-300", children: label }, void 0, false, {
            fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
            lineNumber: 676,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Icon, { size: 14, style: { color } }, void 0, false, {
            fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
            lineNumber: 677,
            columnNumber: 9
          }, this)
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
          lineNumber: 675,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-2xl font-bold", style: { color }, children: value }, void 0, false, {
          fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
          lineNumber: 679,
          columnNumber: 7
        }, this),
        target && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-xs text-cyan-300/50 mt-1", children: target }, void 0, false, {
          fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
          lineNumber: 683,
          columnNumber: 9
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
      lineNumber: 667,
      columnNumber: 5
    },
    this
  );
}
function DetailModal({ outlet, onClose }) {
  const [format, setFormat] = reactExports.useState("overview");
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "div",
    {
      className: "fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4",
      onClick: onClose,
      children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "div",
        {
          className: "bg-slate-900 rounded-lg border border-cyan-400/40 max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col",
          onClick: (e) => e.stopPropagation(),
          style: {
            boxShadow: "0 0 40px rgba(0, 217, 255, 0.3)"
          },
          children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "border-b border-cyan-400/20 px-6 py-4 flex items-center justify-between bg-gradient-to-r from-cyan-500/10 to-blue-500/10", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "text-lg font-bold text-cyan-200", children: outlet.name }, void 0, false, {
                fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
                lineNumber: 706,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "button",
                {
                  onClick: onClose,
                  className: "p-2 hover:bg-red-500/20 rounded transition-colors",
                  children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(X, { size: 20, className: "text-red-400" }, void 0, false, {
                    fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
                    lineNumber: 711,
                    columnNumber: 13
                  }, this)
                },
                void 0,
                false,
                {
                  fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
                  lineNumber: 707,
                  columnNumber: 11
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
              lineNumber: 705,
              columnNumber: 9
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex gap-1 border-b border-cyan-400/20 px-6 pt-4 bg-black/30", children: [
              { id: "overview", label: "Overview" },
              { id: "detail", label: "Detail" },
              { id: "ai", label: "AI Analysis" }
            ].map((tab) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "button",
              {
                onClick: () => setFormat(tab.id),
                className: `px-4 py-2 text-sm font-semibold rounded-t transition-colors ${format === tab.id ? "bg-cyan-500/20 text-cyan-200 border-b-2 border-cyan-400" : "text-cyan-400/60 hover:text-cyan-300"}`,
                children: tab.label
              },
              tab.id,
              false,
              {
                fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
                lineNumber: 722,
                columnNumber: 13
              },
              this
            )) }, void 0, false, {
              fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
              lineNumber: 716,
              columnNumber: 9
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex-1 overflow-auto p-6 text-cyan-100/70 text-sm space-y-4", children: [
              format === "overview" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-cyan-500/10 rounded p-3 border border-cyan-400/20", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-xs text-cyan-400 mb-1", children: "Covers" }, void 0, false, {
                    fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
                    lineNumber: 741,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-2xl font-bold text-cyan-300", children: outlet.covers }, void 0, false, {
                    fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
                    lineNumber: 742,
                    columnNumber: 17
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
                  lineNumber: 740,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-green-500/10 rounded p-3 border border-green-400/20", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-xs text-green-400 mb-1", children: "Revenue" }, void 0, false, {
                    fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
                    lineNumber: 745,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-2xl font-bold text-green-300", children: [
                    "$",
                    (outlet.revenue / 1e3).toFixed(1),
                    "K"
                  ] }, void 0, true, {
                    fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
                    lineNumber: 746,
                    columnNumber: 17
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
                  lineNumber: 744,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: `${outlet.laborPercent > 26 ? "bg-red-500/10 border-red-400/20" : "bg-green-500/10 border-green-400/20"} rounded p-3 border`, children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: `text-xs mb-1 ${outlet.laborPercent > 26 ? "text-red-400" : "text-green-400"}`, children: "Labor %" }, void 0, false, {
                    fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
                    lineNumber: 749,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: `text-2xl font-bold ${outlet.laborPercent > 26 ? "text-red-300" : "text-green-300"}`, children: [
                    outlet.laborPercent,
                    "%"
                  ] }, void 0, true, {
                    fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
                    lineNumber: 750,
                    columnNumber: 17
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
                  lineNumber: 748,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: `${outlet.foodPercent > 28 ? "bg-red-500/10 border-red-400/20" : "bg-green-500/10 border-green-400/20"} rounded p-3 border`, children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: `text-xs mb-1 ${outlet.foodPercent > 28 ? "text-red-400" : "text-green-400"}`, children: "Food %" }, void 0, false, {
                    fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
                    lineNumber: 753,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: `text-2xl font-bold ${outlet.foodPercent > 28 ? "text-red-300" : "text-green-300"}`, children: [
                    outlet.foodPercent,
                    "%"
                  ] }, void 0, true, {
                    fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
                    lineNumber: 754,
                    columnNumber: 17
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
                  lineNumber: 752,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
                lineNumber: 739,
                columnNumber: 13
              }, this),
              format === "detail" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "border border-cyan-400/20 rounded p-3 bg-cyan-400/5", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "font-semibold text-cyan-200 mb-2", children: "FOH Staff" }, void 0, false, {
                    fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
                    lineNumber: 762,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-xs space-y-1", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                      "Servers: ",
                      outlet.fohStaff.servers
                    ] }, void 0, true, {
                      fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
                      lineNumber: 764,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                      "Hosts: ",
                      outlet.fohStaff.hosts
                    ] }, void 0, true, {
                      fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
                      lineNumber: 765,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                      "Bartenders: ",
                      outlet.fohStaff.bartenders
                    ] }, void 0, true, {
                      fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
                      lineNumber: 766,
                      columnNumber: 19
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
                    lineNumber: 763,
                    columnNumber: 17
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
                  lineNumber: 761,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "border border-cyan-400/20 rounded p-3 bg-cyan-400/5", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "font-semibold text-cyan-200 mb-2", children: "BOH Staff" }, void 0, false, {
                    fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
                    lineNumber: 770,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-xs space-y-1", children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                      "Line Cooks: ",
                      outlet.bohStaff.lineCooks
                    ] }, void 0, true, {
                      fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
                      lineNumber: 772,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                      "Prep Cooks: ",
                      outlet.bohStaff.prepCooks
                    ] }, void 0, true, {
                      fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
                      lineNumber: 773,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                      "Expeditor: ",
                      outlet.bohStaff.expeditor
                    ] }, void 0, true, {
                      fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
                      lineNumber: 774,
                      columnNumber: 19
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
                    lineNumber: 771,
                    columnNumber: 17
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
                  lineNumber: 769,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
                lineNumber: 760,
                columnNumber: 13
              }, this),
              format === "ai" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "border border-cyan-400/20 rounded p-3 bg-cyan-400/5", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "font-semibold text-cyan-200 mb-1", children: "Issues" }, void 0, false, {
                    fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
                    lineNumber: 783,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-xs text-cyan-300/70", children: [
                    outlet.laborPercent > 26 && "• High labor cost detected\n",
                    outlet.foodPercent > 28 && "• High food cost detected\n",
                    outlet.efficiency < 80 && "• Efficiency below target"
                  ] }, void 0, true, {
                    fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
                    lineNumber: 784,
                    columnNumber: 17
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
                  lineNumber: 782,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "border border-cyan-400/20 rounded p-3 bg-cyan-400/5", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "font-semibold text-cyan-200 mb-1", children: "Recommendations" }, void 0, false, {
                    fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
                    lineNumber: 791,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-xs text-cyan-300/70", children: "• Review staff scheduling\\n • Analyze portion control\\n • Conduct waste audit" }, void 0, false, {
                    fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
                    lineNumber: 792,
                    columnNumber: 17
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
                  lineNumber: 790,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
                lineNumber: 781,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
              lineNumber: 737,
              columnNumber: 9
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "border-t border-cyan-400/20 px-6 py-3 bg-black/30 flex gap-2 justify-end", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "button",
              {
                onClick: onClose,
                className: "px-4 py-1.5 text-sm bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-300 rounded transition-colors",
                children: "Close"
              },
              void 0,
              false,
              {
                fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
                lineNumber: 804,
                columnNumber: 11
              },
              this
            ) }, void 0, false, {
              fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
              lineNumber: 803,
              columnNumber: 9
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
          lineNumber: 697,
          columnNumber: 7
        },
        this
      )
    },
    void 0,
    false,
    {
      fileName: "/app/code/frontend/src/components/EnterpriseHUD.jsx",
      lineNumber: 693,
      columnNumber: 5
    },
    this
  );
}
export {
  EnterpriseHUD as default
};
