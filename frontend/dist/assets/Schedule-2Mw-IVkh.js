import { r as reactExports, j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
function Schedule() {
  const containerRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    console.log("[Schedule] Builder.io integration disabled - waiting for API availability");
  }, []);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "div",
    {
      ref: containerRef,
      className: "w-full h-full overflow-auto bg-gradient-to-br from-gray-900 to-gray-950",
      style: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#0f172a",
        color: "#e2e8f0",
        fontFamily: "system-ui, sans-serif"
      },
      children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
        flex: 1,
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "16px"
      }, children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { style: { fontSize: "24px", fontWeight: "bold", margin: 0 }, children: "Schedule Module" }, void 0, false, {
          fileName: "/app/code/frontend/src/modules/scheduling/Schedule.jsx",
          lineNumber: 54,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
          flex: 1,
          padding: "16px",
          backgroundColor: "rgba(30, 41, 59, 0.5)",
          borderRadius: "8px",
          border: "1px solid rgba(148, 163, 184, 0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "300px"
        }, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { textAlign: "center", opacity: 0.7 }, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { style: { margin: "0 0 8px 0" }, children: "Loading Schedule from Builder.io..." }, void 0, false, {
            fileName: "/app/code/frontend/src/modules/scheduling/Schedule.jsx",
            lineNumber: 70,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { style: { margin: 0, fontSize: "12px", opacity: 0.6 }, children: "Project: 921d22c0b8f047f9a4bb08666e66aaac" }, void 0, false, {
            fileName: "/app/code/frontend/src/modules/scheduling/Schedule.jsx",
            lineNumber: 71,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/modules/scheduling/Schedule.jsx",
          lineNumber: 69,
          columnNumber: 11
        }, this) }, void 0, false, {
          fileName: "/app/code/frontend/src/modules/scheduling/Schedule.jsx",
          lineNumber: 58,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { id: "builder-schedule-container", style: { flex: 1 } }, void 0, false, {
          fileName: "/app/code/frontend/src/modules/scheduling/Schedule.jsx",
          lineNumber: 78,
          columnNumber: 9
        }, this)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/modules/scheduling/Schedule.jsx",
        lineNumber: 47,
        columnNumber: 7
      }, this)
    },
    void 0,
    false,
    {
      fileName: "/app/code/frontend/src/modules/scheduling/Schedule.jsx",
      lineNumber: 35,
      columnNumber: 5
    },
    this
  );
}
export {
  Schedule as default
};
