import { j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
function CRMPipelineBoard({ pipeline }) {
  if (!pipeline || pipeline.length === 0) return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { children: "No pipeline data." }, void 0, false, {
    fileName: "/app/code/frontend/src/pages/CRMPipelineBoard.jsx",
    lineNumber: 4,
    columnNumber: 50
  }, this);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-3 gap-6 mt-6", children: pipeline.map((stage, index) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-white p-4 shadow rounded", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-xl font-bold mb-3", children: stage.stage }, void 0, false, {
      fileName: "/app/code/frontend/src/pages/CRMPipelineBoard.jsx",
      lineNumber: 10,
      columnNumber: 11
    }, this),
    stage.events.length > 0 ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("ul", { className: "list-disc ml-5", children: stage.events.map((event, idx) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: [
      event.name,
      " – ",
      event.date
    ] }, idx, true, {
      fileName: "/app/code/frontend/src/pages/CRMPipelineBoard.jsx",
      lineNumber: 14,
      columnNumber: 17
    }, this)) }, void 0, false, {
      fileName: "/app/code/frontend/src/pages/CRMPipelineBoard.jsx",
      lineNumber: 12,
      columnNumber: 13
    }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-gray-500", children: "No events yet." }, void 0, false, {
      fileName: "/app/code/frontend/src/pages/CRMPipelineBoard.jsx",
      lineNumber: 18,
      columnNumber: 13
    }, this)
  ] }, index, true, {
    fileName: "/app/code/frontend/src/pages/CRMPipelineBoard.jsx",
    lineNumber: 9,
    columnNumber: 9
  }, this)) }, void 0, false, {
    fileName: "/app/code/frontend/src/pages/CRMPipelineBoard.jsx",
    lineNumber: 7,
    columnNumber: 5
  }, this);
}
export {
  CRMPipelineBoard as default
};
