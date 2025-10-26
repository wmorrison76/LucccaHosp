import { j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
function StatusIndicator({ status = "offline" }) {
  const statusColors = {
    online: "#22c55e",
    offline: "#ef4444",
    idle: "#eab308"
  };
  const color = statusColors[status] || statusColors.offline;
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "div",
      {
        style: {
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          backgroundColor: color,
          boxShadow: `0 0 4px ${color}`
        }
      },
      void 0,
      false,
      {
        fileName: "/app/code/frontend/src/components/StatusIndicator.jsx",
        lineNumber: 14,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { style: { fontSize: "14px", textTransform: "capitalize" }, children: status }, void 0, false, {
      fileName: "/app/code/frontend/src/components/StatusIndicator.jsx",
      lineNumber: 23,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/StatusIndicator.jsx",
    lineNumber: 13,
    columnNumber: 5
  }, this);
}
export {
  StatusIndicator,
  StatusIndicator as default
};
