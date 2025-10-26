import { j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
import Dashboard from "./Dashboard-DnBtDXWG.js";
import ModuleOverview from "./ModuleOverview-czW70RU3.js";
import Logs from "./Logs-DvKyuqE1.js";
import Settings from "./Settings-Dp1NS_dK.js";
import Login from "./Login-CvMv7Imc.js";
import UserSettings from "./UserSettings-LfbEs2oy.js";
import EchoControl from "./EchoControl-6X-s1dg6.js";
import ArgusMonitor from "./ArgusMonitor-W3yJ2tSR.js";
import { PrivateRoute } from "./PrivateRoute-D_WGQFqi.js";
import { B as BrowserRouter, R as Routes, a as Route } from "./chunk-S5YDGZLY-BNXTuE-C.js";
function MainLayout({ children }) {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-full h-full", children }, void 0, false, {
    fileName: "/app/code/frontend/src/layout/MainLayout.jsx",
    lineNumber: 4,
    columnNumber: 10
  }, this);
}
function AppRouter() {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(BrowserRouter, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Routes, { children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Route, { path: "/login", element: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Login, {}, void 0, false, {
      fileName: "/app/code/frontend/src/pages/SystemOverview.jsx",
      lineNumber: 19,
      columnNumber: 39
    }, this) }, void 0, false, {
      fileName: "/app/code/frontend/src/pages/SystemOverview.jsx",
      lineNumber: 19,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      Route,
      {
        path: "*",
        element: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(PrivateRoute, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(MainLayout, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Routes, { children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Route, { path: "/", element: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Dashboard, {}, void 0, false, {
            fileName: "/app/code/frontend/src/pages/SystemOverview.jsx",
            lineNumber: 26,
            columnNumber: 44
          }, this) }, void 0, false, {
            fileName: "/app/code/frontend/src/pages/SystemOverview.jsx",
            lineNumber: 26,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Route, { path: "/modules", element: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ModuleOverview, {}, void 0, false, {
            fileName: "/app/code/frontend/src/pages/SystemOverview.jsx",
            lineNumber: 27,
            columnNumber: 51
          }, this) }, void 0, false, {
            fileName: "/app/code/frontend/src/pages/SystemOverview.jsx",
            lineNumber: 27,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Route, { path: "/logs", element: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Logs, {}, void 0, false, {
            fileName: "/app/code/frontend/src/pages/SystemOverview.jsx",
            lineNumber: 28,
            columnNumber: 48
          }, this) }, void 0, false, {
            fileName: "/app/code/frontend/src/pages/SystemOverview.jsx",
            lineNumber: 28,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Route, { path: "/settings", element: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Settings, {}, void 0, false, {
            fileName: "/app/code/frontend/src/pages/SystemOverview.jsx",
            lineNumber: 29,
            columnNumber: 52
          }, this) }, void 0, false, {
            fileName: "/app/code/frontend/src/pages/SystemOverview.jsx",
            lineNumber: 29,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Route, { path: "/user", element: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(UserSettings, {}, void 0, false, {
            fileName: "/app/code/frontend/src/pages/SystemOverview.jsx",
            lineNumber: 30,
            columnNumber: 48
          }, this) }, void 0, false, {
            fileName: "/app/code/frontend/src/pages/SystemOverview.jsx",
            lineNumber: 30,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Route, { path: "/echo", element: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(EchoControl, {}, void 0, false, {
            fileName: "/app/code/frontend/src/pages/SystemOverview.jsx",
            lineNumber: 31,
            columnNumber: 48
          }, this) }, void 0, false, {
            fileName: "/app/code/frontend/src/pages/SystemOverview.jsx",
            lineNumber: 31,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Route, { path: "/argus", element: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ArgusMonitor, {}, void 0, false, {
            fileName: "/app/code/frontend/src/pages/SystemOverview.jsx",
            lineNumber: 32,
            columnNumber: 49
          }, this) }, void 0, false, {
            fileName: "/app/code/frontend/src/pages/SystemOverview.jsx",
            lineNumber: 32,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Route, { path: "/overview", element: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SystemOverview, {}, void 0, false, {
            fileName: "/app/code/frontend/src/pages/SystemOverview.jsx",
            lineNumber: 33,
            columnNumber: 52
          }, this) }, void 0, false, {
            fileName: "/app/code/frontend/src/pages/SystemOverview.jsx",
            lineNumber: 33,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/pages/SystemOverview.jsx",
          lineNumber: 25,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "/app/code/frontend/src/pages/SystemOverview.jsx",
          lineNumber: 24,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "/app/code/frontend/src/pages/SystemOverview.jsx",
          lineNumber: 23,
          columnNumber: 13
        }, this)
      },
      void 0,
      false,
      {
        fileName: "/app/code/frontend/src/pages/SystemOverview.jsx",
        lineNumber: 20,
        columnNumber: 9
      },
      this
    )
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/pages/SystemOverview.jsx",
    lineNumber: 18,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/app/code/frontend/src/pages/SystemOverview.jsx",
    lineNumber: 17,
    columnNumber: 5
  }, this);
}
export {
  AppRouter as default
};
