import { j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
function AlertMessage({ type = "info", message }) {
  if (!message) return null;
  const colorMap = {
    info: "blue",
    success: "green",
    warning: "yellow",
    error: "red"
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: `alert-message bg-${colorMap[type]}-500 text-white p-3 rounded mb-4`, children: message }, void 0, false, {
    fileName: "/app/code/frontend/src/components/AlertMessage.jsx",
    lineNumber: 14,
    columnNumber: 5
  }, this);
}
export {
  AlertMessage
};
