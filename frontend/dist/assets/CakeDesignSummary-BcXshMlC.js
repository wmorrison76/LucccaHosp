import { j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
function CakeDesignSummary({ designData = {} }) {
  const {
    base = "",
    fillings = [],
    crumbCoat = false,
    coating = "",
    supports = "",
    decorations = [],
    notes = ""
  } = designData;
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-4 bg-white dark:bg-zinc-800 rounded-lg shadow", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "text-lg font-bold mb-2", children: "Cake Design Summary" }, void 0, false, {
      fileName: "/app/code/frontend/src/components/CakeDesignSummary.jsx",
      lineNumber: 16,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("ul", { className: "list-disc ml-5 space-y-1", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: [
        "Base: ",
        base || "—"
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/CakeDesignSummary.jsx",
        lineNumber: 18,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: [
        "Fillings: ",
        (fillings ?? []).join(", ") || "—"
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/CakeDesignSummary.jsx",
        lineNumber: 19,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: [
        "Crumb Coat: ",
        crumbCoat ? "Yes" : "No"
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/CakeDesignSummary.jsx",
        lineNumber: 20,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: [
        "Final Coating: ",
        coating || "—"
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/CakeDesignSummary.jsx",
        lineNumber: 21,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: [
        "Supports: ",
        supports || "—"
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/CakeDesignSummary.jsx",
        lineNumber: 22,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: [
        "Decorations: ",
        (decorations ?? []).join(", ") || "—"
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/CakeDesignSummary.jsx",
        lineNumber: 23,
        columnNumber: 9
      }, this),
      notes ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: [
        "Notes: ",
        notes
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/CakeDesignSummary.jsx",
        lineNumber: 24,
        columnNumber: 18
      }, this) : null
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/CakeDesignSummary.jsx",
      lineNumber: 17,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/CakeDesignSummary.jsx",
    lineNumber: 15,
    columnNumber: 5
  }, this);
}
export {
  CakeDesignSummary as default
};
