import { j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
function CakeFormSection({ designData = {}, onChange }) {
  const update = (k) => (e) => onChange?.({ [k]: e.target.value });
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-4 bg-white dark:bg-zinc-800 rounded-lg shadow", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-lg font-bold mb-3", children: "Design" }, void 0, false, {
      fileName: "/app/code/frontend/src/components/CakeFormSection.jsx",
      lineNumber: 8,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid gap-3", style: { gridTemplateColumns: "1fr 1fr" }, children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "flex flex-col gap-1", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-sm opacity-80", children: "Base" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/CakeFormSection.jsx",
          lineNumber: 12,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("input", { className: "dw-input", value: designData.base || "", onChange: update("base") }, void 0, false, {
          fileName: "/app/code/frontend/src/components/CakeFormSection.jsx",
          lineNumber: 13,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/CakeFormSection.jsx",
        lineNumber: 11,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "flex flex-col gap-1", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-sm opacity-80", children: "Frosting" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/CakeFormSection.jsx",
          lineNumber: 17,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("input", { className: "dw-input", value: designData.frosting || "", onChange: update("frosting") }, void 0, false, {
          fileName: "/app/code/frontend/src/components/CakeFormSection.jsx",
          lineNumber: 18,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/CakeFormSection.jsx",
        lineNumber: 16,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "flex flex-col gap-1", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-sm opacity-80", children: "Color" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/CakeFormSection.jsx",
          lineNumber: 22,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("input", { className: "dw-input", value: designData.color || "", onChange: update("color") }, void 0, false, {
          fileName: "/app/code/frontend/src/components/CakeFormSection.jsx",
          lineNumber: 23,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/CakeFormSection.jsx",
        lineNumber: 21,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "flex flex-col gap-1", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-sm opacity-80", children: "Notes" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/CakeFormSection.jsx",
          lineNumber: 27,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("input", { className: "dw-input", value: designData.notes || "", onChange: update("notes") }, void 0, false, {
          fileName: "/app/code/frontend/src/components/CakeFormSection.jsx",
          lineNumber: 28,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/CakeFormSection.jsx",
        lineNumber: 26,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/CakeFormSection.jsx",
      lineNumber: 10,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/CakeFormSection.jsx",
    lineNumber: 7,
    columnNumber: 5
  }, this);
}
export {
  CakeFormSection as default
};
