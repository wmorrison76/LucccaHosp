import { r as reactExports, j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
import { AdminPanelNav } from "./AdminPanelNav-B36nUHyd.js";
import { AdminPanelGrid } from "./AdminPanelGrid-kOeeeD83.js";
import { AdminModuleToggle } from "./AdminModuleToggle-BnvzL8s7.js";
import UserRoleManager from "./UserRoleManager-C4h8YFd8.js";
import OverrideUnlock from "./OverrideVault-D2BW2IjA.js";
import { D as DownloadOverridePDF } from "./DownloadOverridePDF-C9R0K010.js";
import { R as Routes, a as Route } from "./chunk-S5YDGZLY-BNXTuE-C.js";
const LOCAL_KEY = "luccca-module-toggles";
function useModuleToggleSync() {
  const [moduleStates, setModuleStates] = reactExports.useState(() => {
    const stored = localStorage.getItem(LOCAL_KEY);
    return stored ? JSON.parse(stored) : {};
  });
  const toggleModule = (moduleName) => {
    setModuleStates((prev) => {
      const updated = { ...prev, [moduleName]: !prev[moduleName] };
      localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));
      return updated;
    });
  };
  reactExports.useEffect(() => {
  }, []);
  return { moduleStates, toggleModule };
}
const roles = {
  superAdmin: [
    "Recipes",
    "Scheduling",
    "CRM & Client Tracker",
    "Echo AI",
    "Argus Monitor",
    "Zelda Master",
    "Red Phoenix",
    "Odin's Spear",
    "Cake Builder Admin",
    "Offline Mode Control",
    "Standalone Module License Entry",
    "User Role Manager",
    "OverrideVault"
  ],
  admin: [
    "Recipes",
    "Scheduling",
    "CRM & Client Tracker",
    "Echo AI",
    "Argus Monitor",
    "Offline Mode Control"
  ],
  standaloneUser: [
    "Recipes",
    "Cake Builder Admin",
    "Standalone Module License Entry"
  ],
  viewer: ["Recipes", "Scheduling"]
};
const currentUserRole = "superAdmin";
function AdminPanel() {
  const visibleModules = roles[currentUserRole] || [];
  const { moduleStates, toggleModule } = useModuleToggleSync();
  const groupedModules = {
    "Core Modules": ["Recipes", "Scheduling", "CRM & Client Tracker"],
    "AI Suite": ["Echo AI", "Argus Monitor", "Zelda Master", "Red Phoenix", "Odin's Spear"],
    "Standalone Features": ["Cake Builder Admin", "Offline Mode Control", "Standalone Module License Entry"],
    "Admin Tools": ["User Role Manager", "OverrideVault"]
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-white min-h-screen font-sans shadow-md rounded-lg border border-gray-200 overflow-hidden", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AdminPanelNav, {}, void 0, false, {
      fileName: "/app/code/frontend/src/components/AdminPanel.jsx",
      lineNumber: 46,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-6", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { className: "text-3xl font-semibold mb-6 text-gray-900 tracking-tight", children: "LUCCCA Admin Panel" }, void 0, false, {
        fileName: "/app/code/frontend/src/components/AdminPanel.jsx",
        lineNumber: 48,
        columnNumber: 9
      }, this),
      Object.entries(groupedModules).map(([category, modules]) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-10", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "text-2xl font-bold text-gray-800 mb-3 border-b border-gray-200 pb-2", children: category }, void 0, false, {
          fileName: "/app/code/frontend/src/components/AdminPanel.jsx",
          lineNumber: 52,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AdminPanelGrid, { children: modules.map((moduleName) => visibleModules.includes(moduleName) && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          AdminModuleToggle,
          {
            moduleName,
            defaultEnabled: moduleStates[moduleName] ?? true,
            onToggle: () => toggleModule(moduleName)
          },
          moduleName,
          false,
          {
            fileName: "/app/code/frontend/src/components/AdminPanel.jsx",
            lineNumber: 56,
            columnNumber: 19
          },
          this
        )) }, void 0, false, {
          fileName: "/app/code/frontend/src/components/AdminPanel.jsx",
          lineNumber: 53,
          columnNumber: 13
        }, this)
      ] }, category, true, {
        fileName: "/app/code/frontend/src/components/AdminPanel.jsx",
        lineNumber: 51,
        columnNumber: 11
      }, this))
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/AdminPanel.jsx",
      lineNumber: 47,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Routes, { children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Route, { path: "/admin", element: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AdminPanel, {}, void 0, false, {
        fileName: "/app/code/frontend/src/components/AdminPanel.jsx",
        lineNumber: 70,
        columnNumber: 39
      }, this) }, void 0, false, {
        fileName: "/app/code/frontend/src/components/AdminPanel.jsx",
        lineNumber: 70,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Route, { path: "/admin/roles", element: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(UserRoleManager, {}, void 0, false, {
        fileName: "/app/code/frontend/src/components/AdminPanel.jsx",
        lineNumber: 71,
        columnNumber: 45
      }, this) }, void 0, false, {
        fileName: "/app/code/frontend/src/components/AdminPanel.jsx",
        lineNumber: 71,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Route, { path: "/admin/override", element: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(OverrideUnlock, {}, void 0, false, {
        fileName: "/app/code/frontend/src/components/AdminPanel.jsx",
        lineNumber: 72,
        columnNumber: 48
      }, this) }, void 0, false, {
        fileName: "/app/code/frontend/src/components/AdminPanel.jsx",
        lineNumber: 72,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Route, { path: "/admin/instructions", element: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(DownloadOverridePDF, {}, void 0, false, {
        fileName: "/app/code/frontend/src/components/AdminPanel.jsx",
        lineNumber: 73,
        columnNumber: 52
      }, this) }, void 0, false, {
        fileName: "/app/code/frontend/src/components/AdminPanel.jsx",
        lineNumber: 73,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/AdminPanel.jsx",
      lineNumber: 69,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/AdminPanel.jsx",
    lineNumber: 45,
    columnNumber: 5
  }, this);
}
export {
  AdminPanel as default
};
