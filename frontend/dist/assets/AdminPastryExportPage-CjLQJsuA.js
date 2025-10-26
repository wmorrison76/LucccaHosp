import { j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
function AdminPastryExportPage() {
  const handleExportTestLog = () => {
    fetch("/api/admin/pastry-test-log-export").then((res) => res.json()).then((data) => {
      alert("Test log export completed: " + data.path);
    });
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-6", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { className: "text-2xl font-bold mb-4", children: "Pastry Module Admin Tools" }, void 0, false, {
      fileName: "/app/code/frontend/src/pages/AdminPastryExportPage.jsx",
      lineNumber: 14,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "button",
      {
        onClick: handleExportTestLog,
        className: "p-3 bg-blue-600 text-white rounded",
        children: "Export Pastry Test Log"
      },
      void 0,
      false,
      {
        fileName: "/app/code/frontend/src/pages/AdminPastryExportPage.jsx",
        lineNumber: 15,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/pages/AdminPastryExportPage.jsx",
    lineNumber: 13,
    columnNumber: 5
  }, this);
}
export {
  AdminPastryExportPage as default
};
