import { r as reactExports, j as jsxDevRuntimeExports, R as React } from "./index-DfBvRGLH.js";
function LegacyDesignStudio() {
  const [ready] = reactExports.useState(true);
  reactExports.useRef(null);
  reactExports.useEffect(() => {
    return () => {
    };
  }, []);
  reactExports.useEffect(() => {
    const onResize = () => {
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-full h-full bg-black/40 text-xs", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-2 opacity-70", children: "Legacy shell mounted. Replace internals incrementally." }, void 0, false, {
    fileName: "/app/code/frontend/src/modules/CustomCakeStudio/legacy/LegacyDesignStudio.tsx",
    lineNumber: 27,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/app/code/frontend/src/modules/CustomCakeStudio/legacy/LegacyDesignStudio.tsx",
    lineNumber: 26,
    columnNumber: 5
  }, this);
}
class ErrorBoundary extends React.Component {
  constructor() {
    super(...arguments);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error("[Legacy ErrorBoundary]", error, info);
  }
  render() {
    if (this.state.hasError) {
      return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-4 text-sm bg-red-900/30 border border-red-700 rounded", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "font-semibold mb-1", children: "Legacy module crashed" }, void 0, false, {
          fileName: "/app/code/frontend/src/modules/CustomCakeStudio/legacy/ErrorBoundary.tsx",
          lineNumber: 14,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("pre", { className: "text-xs whitespace-pre-wrap", children: String(this.state.error) }, void 0, false, {
          fileName: "/app/code/frontend/src/modules/CustomCakeStudio/legacy/ErrorBoundary.tsx",
          lineNumber: 15,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { className: "mt-2 px-2 py-1 bg-red-800 rounded", onClick: () => this.setState({ hasError: false, error: void 0 }), children: "Reset" }, void 0, false, {
          fileName: "/app/code/frontend/src/modules/CustomCakeStudio/legacy/ErrorBoundary.tsx",
          lineNumber: 16,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/modules/CustomCakeStudio/legacy/ErrorBoundary.tsx",
        lineNumber: 13,
        columnNumber: 9
      }, this);
    }
    return this.props.children;
  }
}
function LegacyHost() {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ErrorBoundary, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-4 text-xs opacity-70", children: "Loading legacy studio…" }, void 0, false, {
    fileName: "/app/code/frontend/src/modules/CustomCakeStudio/pages/LegacyHost.tsx",
    lineNumber: 13,
    columnNumber: 27
  }, this), children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(LegacyDesignStudio, {}, void 0, false, {
    fileName: "/app/code/frontend/src/modules/CustomCakeStudio/pages/LegacyHost.tsx",
    lineNumber: 14,
    columnNumber: 9
  }, this) }, void 0, false, {
    fileName: "/app/code/frontend/src/modules/CustomCakeStudio/pages/LegacyHost.tsx",
    lineNumber: 13,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/app/code/frontend/src/modules/CustomCakeStudio/pages/LegacyHost.tsx",
    lineNumber: 12,
    columnNumber: 5
  }, this);
}
export {
  LegacyHost as default
};
