import { j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
function AdminModuleToggle({ moduleName, defaultEnabled, icon }) {
  const [enabled, setEnabled] = useState(defaultEnabled);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow mb-2", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-3", children: [
      icon && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-xl text-gray-600", children: icon }, void 0, false, {
        fileName: "/app/code/frontend/src/components/AdminModuleToggle.jsx",
        lineNumber: 8,
        columnNumber: 18
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "font-bold", children: moduleName }, void 0, false, {
        fileName: "/app/code/frontend/src/components/AdminModuleToggle.jsx",
        lineNumber: 9,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/AdminModuleToggle.jsx",
      lineNumber: 7,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "button",
      {
        onClick: () => setEnabled(!enabled),
        className: `px-4 py-2 rounded ${enabled ? "bg-green-500" : "bg-red-500"} text-white`,
        children: enabled ? "Enabled" : "Disabled"
      },
      void 0,
      false,
      {
        fileName: "/app/code/frontend/src/components/AdminModuleToggle.jsx",
        lineNumber: 11,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/AdminModuleToggle.jsx",
    lineNumber: 6,
    columnNumber: 5
  }, this);
}
export {
  AdminModuleToggle
};
