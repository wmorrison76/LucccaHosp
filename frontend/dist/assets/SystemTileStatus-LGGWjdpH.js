import { j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
function SystemTileStatus({ label, status }) {
  const colorMap = {
    online: "green",
    offline: "red",
    maintenance: "yellow",
    unknown: "gray"
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "system-tile-status flex justify-between items-center p-2 rounded bg-gray-100 dark:bg-zinc-700", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: label }, void 0, false, {
      fileName: "/app/code/frontend/src/components/SystemTileStatus.jsx",
      lineNumber: 13,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "span",
      {
        className: `px-2 py-1 rounded text-xs font-bold bg-${colorMap[status]}-500 text-white`,
        children: status.toUpperCase()
      },
      void 0,
      false,
      {
        fileName: "/app/code/frontend/src/components/SystemTileStatus.jsx",
        lineNumber: 14,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/SystemTileStatus.jsx",
    lineNumber: 12,
    columnNumber: 5
  }, this);
}
export {
  SystemTileStatus
};
