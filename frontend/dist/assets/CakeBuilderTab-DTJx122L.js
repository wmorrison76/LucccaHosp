const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/CakeBuilderPage-DCGyEV5m.js","assets/index-DfBvRGLH.js"])))=>i.map(i=>d[i]);
import { j as jsxDevRuntimeExports, R as React, _ as __vitePreload } from "./index-DfBvRGLH.js";
const CakeBuilderPage = React.lazy(
  () => __vitePreload(() => import("./CakeBuilderPage-DCGyEV5m.js").then((n) => n.C), true ? __vite__mapDeps([0,1]) : void 0).then((m) => ({ default: m.CakeBuilderPage })).catch((err) => {
    console.error("[CakeBuilderTab] Failed to load CakeBuilder:", err);
    return { default: () => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ErrorFallback, {}, void 0, false, {
      fileName: "/app/code/frontend/src/components/PastryLibrary/CakeBuilderTab.jsx",
      lineNumber: 14,
      columnNumber: 31
    }, void 0) };
  })
);
function ErrorFallback() {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { padding: "2rem", color: "#f87171" }, children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { children: "Failed to load CakeBuilder" }, void 0, false, {
      fileName: "/app/code/frontend/src/components/PastryLibrary/CakeBuilderTab.jsx",
      lineNumber: 21,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { children: "There was an error loading the CakeBuilder module. Please refresh and try again." }, void 0, false, {
      fileName: "/app/code/frontend/src/components/PastryLibrary/CakeBuilderTab.jsx",
      lineNumber: 22,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("pre", { style: { fontSize: "12px", marginTop: "1rem", opacity: 0.7 }, children: "Check browser console for details" }, void 0, false, {
      fileName: "/app/code/frontend/src/components/PastryLibrary/CakeBuilderTab.jsx",
      lineNumber: 23,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/PastryLibrary/CakeBuilderTab.jsx",
    lineNumber: 20,
    columnNumber: 5
  }, this);
}
function CakeBuilderTab() {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(React.Suspense, { fallback: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { padding: "2rem", textAlign: "center", color: "#999" }, children: "Loading CakeBuilder..." }, void 0, false, {
    fileName: "/app/code/frontend/src/components/PastryLibrary/CakeBuilderTab.jsx",
    lineNumber: 32,
    columnNumber: 31
  }, this), children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CakeBuilderPage, {}, void 0, false, {
    fileName: "/app/code/frontend/src/components/PastryLibrary/CakeBuilderTab.jsx",
    lineNumber: 33,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/app/code/frontend/src/components/PastryLibrary/CakeBuilderTab.jsx",
    lineNumber: 32,
    columnNumber: 5
  }, this);
}
export {
  CakeBuilderTab as default
};
