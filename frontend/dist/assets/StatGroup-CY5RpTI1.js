import { j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
function StatGroup({ stats }) {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "stat-group grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: stats.map((item, index) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "div",
    {
      className: "bg-white dark:bg-zinc-800 p-4 rounded-lg shadow text-center",
      children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-sm text-gray-500", children: item.label }, void 0, false, {
          fileName: "/app/code/frontend/src/components/StatGroup.jsx",
          lineNumber: 11,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-2xl font-bold", children: item.value }, void 0, false, {
          fileName: "/app/code/frontend/src/components/StatGroup.jsx",
          lineNumber: 12,
          columnNumber: 11
        }, this)
      ]
    },
    index,
    true,
    {
      fileName: "/app/code/frontend/src/components/StatGroup.jsx",
      lineNumber: 7,
      columnNumber: 9
    },
    this
  )) }, void 0, false, {
    fileName: "/app/code/frontend/src/components/StatGroup.jsx",
    lineNumber: 5,
    columnNumber: 5
  }, this);
}
export {
  StatGroup
};
