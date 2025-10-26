const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Studio-Lm3PAQHr.js","assets/index-DfBvRGLH.js"])))=>i.map(i=>d[i]);
import { j as jsxDevRuntimeExports, r as reactExports, R as React, _ as __vitePreload } from "./index-DfBvRGLH.js";
const CustomCakeStudio = React.lazy(
  () => __vitePreload(() => import("./Studio-Lm3PAQHr.js"), true ? __vite__mapDeps([0,1]) : void 0).then((m) => ({
    default: m.default || m.Studio || (() => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-3 text-white/80", children: "Could not load CustomCakeStudio/pages/Studio." }, void 0, false, {
      fileName: "/app/code/frontend/src/components/EchoCanvas.jsx",
      lineNumber: 7,
      columnNumber: 7
    }, void 0))
  }))
);
class EchoBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(err) {
    return { hasError: true, error: err };
  }
  componentDidCatch(err, info) {
    console.error("[EchoCanvas boundary]", err, info);
  }
  render() {
    if (this.state.hasError) {
      return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-3 text-sm bg-red-900/30 border border-red-700 rounded", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "font-semibold mb-1", children: "EchoCanvas crashed" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/EchoCanvas.jsx",
          lineNumber: 22,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("pre", { className: "text-xs whitespace-pre-wrap", children: String(this.state.error) }, void 0, false, {
          fileName: "/app/code/frontend/src/components/EchoCanvas.jsx",
          lineNumber: 23,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/EchoCanvas.jsx",
        lineNumber: 21,
        columnNumber: 9
      }, this);
    }
    return this.props.children;
  }
}
function EchoCanvas() {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "div",
    {
      className: "rounded-xl overflow-hidden",
      style: {
        // panel-friendly height; adjust if your panel header/footer differ
        height: "calc(100vh - 220px)",
        border: "1px solid rgba(34,211,238,.28)",
        background: "linear-gradient(180deg, rgba(4,10,22,.96), rgba(4,10,22,.92))",
        boxShadow: "0 40px 120px rgba(0,0,0,.55)"
      },
      children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(EchoBoundary, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-3 text-white/80", children: "Loading EchoCanvas…" }, void 0, false, {
        fileName: "/app/code/frontend/src/components/EchoCanvas.jsx",
        lineNumber: 46,
        columnNumber: 29
      }, this), children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CustomCakeStudio, {}, void 0, false, {
        fileName: "/app/code/frontend/src/components/EchoCanvas.jsx",
        lineNumber: 47,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "/app/code/frontend/src/components/EchoCanvas.jsx",
        lineNumber: 46,
        columnNumber: 9
      }, this) }, void 0, false, {
        fileName: "/app/code/frontend/src/components/EchoCanvas.jsx",
        lineNumber: 45,
        columnNumber: 7
      }, this)
    },
    void 0,
    false,
    {
      fileName: "/app/code/frontend/src/components/EchoCanvas.jsx",
      lineNumber: 35,
      columnNumber: 5
    },
    this
  );
}
export {
  EchoCanvas as default
};
