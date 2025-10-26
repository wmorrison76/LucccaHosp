const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Studio-Lm3PAQHr.js","assets/index-DfBvRGLH.js","assets/EchoCanvas-DUPsvzKu.js"])))=>i.map(i=>d[i]);
import { j as jsxDevRuntimeExports, r as reactExports, R as React, _ as __vitePreload } from "./index-DfBvRGLH.js";
const StudioComponent = reactExports.lazy(
  () => __vitePreload(() => import("./Studio-Lm3PAQHr.js"), true ? __vite__mapDeps([0,1]) : void 0).then((m) => ({ default: m.default || m.Studio })).catch(() => {
    console.warn("[EchoCanvasStudio] CustomCakeStudio/pages/Studio not found, trying fallback");
    return __vitePreload(() => import("./EchoCanvas-DUPsvzKu.js"), true ? __vite__mapDeps([2,1]) : void 0);
  })
);
class EchoCanvasErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error("[EchoCanvasErrorBoundary] Error:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
        padding: "20px",
        backgroundColor: "#0f1c2e",
        color: "#f87171",
        borderRadius: "8px",
        fontSize: "13px",
        fontFamily: "monospace",
        whiteSpace: "pre-wrap",
        overflowY: "auto",
        maxHeight: "300px"
      }, children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { fontWeight: "bold", marginBottom: "8px" }, children: "EchoCanvas Studio Error" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/EchoCanvasStudio.jsx",
          lineNumber: 40,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: String(this.state.error?.message || this.state.error) }, void 0, false, {
          fileName: "/app/code/frontend/src/components/EchoCanvasStudio.jsx",
          lineNumber: 43,
          columnNumber: 11
        }, this),
        this.state.error?.stack && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { marginTop: "8px", fontSize: "11px", opacity: 0.7 }, children: this.state.error.stack }, void 0, false, {
          fileName: "/app/code/frontend/src/components/EchoCanvasStudio.jsx",
          lineNumber: 45,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/EchoCanvasStudio.jsx",
        lineNumber: 29,
        columnNumber: 9
      }, this);
    }
    return this.props.children;
  }
}
function EchoCanvasStudio() {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#0a1420",
    overflow: "hidden"
  }, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(EchoCanvasErrorBoundary, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    color: "#7ff3ff",
    fontSize: "14px",
    backgroundColor: "#0a1420"
  }, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { textAlign: "center", marginBottom: "12px" }, children: "Loading EchoCanvas Studio..." }, void 0, false, {
      fileName: "/app/code/frontend/src/components/EchoCanvasStudio.jsx",
      lineNumber: 80,
      columnNumber: 15
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
      width: "40px",
      height: "40px",
      border: "2px solid rgba(127, 243, 255, 0.2)",
      borderTop: "2px solid #7ff3ff",
      borderRadius: "50%",
      animation: "spin 0.8s linear infinite",
      margin: "0 auto"
    } }, void 0, false, {
      fileName: "/app/code/frontend/src/components/EchoCanvasStudio.jsx",
      lineNumber: 83,
      columnNumber: 15
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("style", { children: `
                @keyframes spin {
                  to { transform: rotate(360deg); }
                }
              ` }, void 0, false, {
      fileName: "/app/code/frontend/src/components/EchoCanvasStudio.jsx",
      lineNumber: 92,
      columnNumber: 15
    }, this)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/EchoCanvasStudio.jsx",
    lineNumber: 79,
    columnNumber: 13
  }, this) }, void 0, false, {
    fileName: "/app/code/frontend/src/components/EchoCanvasStudio.jsx",
    lineNumber: 69,
    columnNumber: 11
  }, this), children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(StudioComponent, {}, void 0, false, {
    fileName: "/app/code/frontend/src/components/EchoCanvasStudio.jsx",
    lineNumber: 100,
    columnNumber: 11
  }, this) }, void 0, false, {
    fileName: "/app/code/frontend/src/components/EchoCanvasStudio.jsx",
    lineNumber: 68,
    columnNumber: 9
  }, this) }, void 0, false, {
    fileName: "/app/code/frontend/src/components/EchoCanvasStudio.jsx",
    lineNumber: 67,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/app/code/frontend/src/components/EchoCanvasStudio.jsx",
    lineNumber: 59,
    columnNumber: 5
  }, this);
}
export {
  EchoCanvasStudio as default
};
