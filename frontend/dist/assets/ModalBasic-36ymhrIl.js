import { j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
function ModalBasic({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "modal-content bg-white text-black p-6 rounded shadow-lg max-w-md w-full", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "text-lg font-bold mb-4", children: title }, void 0, false, {
      fileName: "/app/code/frontend/src/components/ModalBasic.jsx",
      lineNumber: 9,
      columnNumber: 9
    }, this),
    children,
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { onClick: onClose, className: "mt-4 bg-red-600 text-white py-2 px-4 rounded", children: "Close" }, void 0, false, {
      fileName: "/app/code/frontend/src/components/ModalBasic.jsx",
      lineNumber: 11,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/ModalBasic.jsx",
    lineNumber: 8,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/app/code/frontend/src/components/ModalBasic.jsx",
    lineNumber: 7,
    columnNumber: 5
  }, this);
}
export {
  ModalBasic
};
