const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Studio-Lm3PAQHr.js","assets/index-DfBvRGLH.js"])))=>i.map(i=>d[i]);
import { j as jsxDevRuntimeExports, R as React, r as reactExports, _ as __vitePreload } from "./index-DfBvRGLH.js";
import { T as Tabs } from "./Tabs-BEMcGpo9.js";
const LazyStudio = reactExports.lazy(
  () => __vitePreload(() => import("./Studio-Lm3PAQHr.js"), true ? __vite__mapDeps([0,1]) : void 0).then((m) => ({ default: m.default ?? m.Studio })).catch(() => ({
    default: () => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-4 text-amber-600", children: "EchoCanvas module not available" }, void 0, false, {
      fileName: "/app/code/frontend/src/pages/PastryLibrary.tsx",
      lineNumber: 9,
      columnNumber: 22
    }, void 0)
  }))
);
class EchoBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(err) {
    return { hasError: true, err };
  }
  componentDidCatch(err, info) {
    console.error("[EchoCanvas Boundary]", err, info);
  }
  render() {
    if (this.state.hasError) {
      return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-4 text-sm bg-red-900/30 border border-red-700 rounded", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "font-semibold mb-1", children: "EchoCanvas failed to load" }, void 0, false, {
          fileName: "/app/code/frontend/src/pages/PastryLibrary.tsx",
          lineNumber: 21,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("pre", { className: "text-xs whitespace-pre-wrap", children: String(this.state.err) }, void 0, false, {
          fileName: "/app/code/frontend/src/pages/PastryLibrary.tsx",
          lineNumber: 22,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { className: "mt-2 px-2 py-1 bg-red-800 rounded", onClick: () => this.setState({ hasError: false, err: void 0 }), children: "Retry" }, void 0, false, {
          fileName: "/app/code/frontend/src/pages/PastryLibrary.tsx",
          lineNumber: 23,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/pages/PastryLibrary.tsx",
        lineNumber: 20,
        columnNumber: 9
      }, this);
    }
    return this.props.children;
  }
}
function EchoCanvasHost() {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "border rounded bg-gray-950", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-3 text-xs opacity-70", children: "Loading EchoCanvas…" }, void 0, false, {
    fileName: "/app/code/frontend/src/pages/PastryLibrary.tsx",
    lineNumber: 36,
    columnNumber: 27
  }, this), children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(LazyStudio, {}, void 0, false, {
    fileName: "/app/code/frontend/src/pages/PastryLibrary.tsx",
    lineNumber: 37,
    columnNumber: 9
  }, this) }, void 0, false, {
    fileName: "/app/code/frontend/src/pages/PastryLibrary.tsx",
    lineNumber: 36,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/app/code/frontend/src/pages/PastryLibrary.tsx",
    lineNumber: 35,
    columnNumber: 5
  }, this);
}
function PastryLibrary() {
  const tabs = [
    { label: "Base Recipes", content: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { children: "Core Pastry Recipes" }, void 0, false, {
      fileName: "/app/code/frontend/src/pages/PastryLibrary.tsx",
      lineNumber: 45,
      columnNumber: 39
    }, this) },
    { label: "Flavor Variations", content: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { children: "Linked Variations" }, void 0, false, {
      fileName: "/app/code/frontend/src/pages/PastryLibrary.tsx",
      lineNumber: 46,
      columnNumber: 44
    }, this) },
    { label: "Inventory Links", content: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { children: "Connect Recipes to Inventory" }, void 0, false, {
      fileName: "/app/code/frontend/src/pages/PastryLibrary.tsx",
      lineNumber: 47,
      columnNumber: 42
    }, this) },
    {
      label: "EchoCanvas",
      content: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(EchoBoundary, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(EchoCanvasHost, {}, void 0, false, {
        fileName: "/app/code/frontend/src/pages/PastryLibrary.tsx",
        lineNumber: 50,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "/app/code/frontend/src/pages/PastryLibrary.tsx",
        lineNumber: 49,
        columnNumber: 9
      }, this)
    }
  ];
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "pastry-library-page", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { className: "text-2xl font-bold mb-4", children: "Pastry Recipe Library" }, void 0, false, {
      fileName: "/app/code/frontend/src/pages/PastryLibrary.tsx",
      lineNumber: 57,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Tabs, { tabs }, void 0, false, {
      fileName: "/app/code/frontend/src/pages/PastryLibrary.tsx",
      lineNumber: 58,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/pages/PastryLibrary.tsx",
    lineNumber: 56,
    columnNumber: 5
  }, this);
}
export {
  PastryLibrary as default
};
