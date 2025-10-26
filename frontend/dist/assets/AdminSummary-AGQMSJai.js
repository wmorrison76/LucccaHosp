import { j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
import { PageSection } from "./PageSection-B9hzN5Zm.js";
import { StatGroup } from "./StatGroup-CY5RpTI1.js";
function AdminSummary() {
  const summaryStats = [
    { label: "Total Users", value: "12" },
    { label: "Active Sessions", value: "4" },
    { label: "System Alerts", value: "0" },
    { label: "Last Backup", value: "Today 04:00 AM" }
  ];
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "admin-summary-page", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { className: "text-2xl font-bold mb-4", children: "Admin Summary" }, void 0, false, {
      fileName: "/app/code/frontend/src/pages/AdminSummary.jsx",
      lineNumber: 15,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(PageSection, { title: "Quick Stats", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(StatGroup, { stats: summaryStats }, void 0, false, {
      fileName: "/app/code/frontend/src/pages/AdminSummary.jsx",
      lineNumber: 17,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/app/code/frontend/src/pages/AdminSummary.jsx",
      lineNumber: 16,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/pages/AdminSummary.jsx",
    lineNumber: 14,
    columnNumber: 5
  }, this);
}
export {
  AdminSummary as default
};
