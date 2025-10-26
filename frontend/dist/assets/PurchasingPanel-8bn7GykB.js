import { r as reactExports, j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
function PurchasingPanel() {
  const containerRef = reactExports.useRef(null);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const [loadError, setLoadError] = reactExports.useState(null);
  reactExports.useEffect(() => {
    console.log("[Purchasing] Component mounted");
    console.log("[Purchasing] Builder.io integration disabled - waiting for API availability");
    setIsLoading(false);
    setLoadError("Builder.io integration temporarily disabled for stability");
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
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { style: { fontSize: "24px", fontWeight: "bold", margin: 0 }, children: "Purchasing" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/Purchasing/PurchasingPanel.jsx",
          lineNumber: 71,
          columnNumber: 9
        }, this),
        loadError && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
          padding: "16px",
          backgroundColor: "rgba(239, 68, 68, 0.1)",
          borderRadius: "8px",
          border: "1px solid rgba(239, 68, 68, 0.5)",
          color: "#fca5a5"
        }, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { fontWeight: "bold", marginBottom: "8px" }, children: "Error loading Purchasing" }, void 0, false, {
            fileName: "/app/code/frontend/src/components/Purchasing/PurchasingPanel.jsx",
            lineNumber: 83,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { fontSize: "12px" }, children: loadError }, void 0, false, {
            fileName: "/app/code/frontend/src/components/Purchasing/PurchasingPanel.jsx",
            lineNumber: 84,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/components/Purchasing/PurchasingPanel.jsx",
          lineNumber: 76,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
          flex: 1,
          padding: "24px",
          backgroundColor: "rgba(30, 41, 59, 0.5)",
          borderRadius: "12px",
          border: "1px solid rgba(148, 163, 184, 0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "400px"
        }, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { textAlign: "center", opacity: 0.7 }, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "16px",
            width: "100%",
            maxWidth: "600px"
          }, children: [
            { icon: "📦", label: "Orders" },
            { icon: "🔄", label: "Receiving" },
            { icon: "🏪", label: "Vendors" },
            { icon: "📊", label: "Analytics" }
          ].map((feature, idx) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "div",
            {
              style: {
                padding: "16px",
                backgroundColor: "rgba(15, 23, 42, 0.5)",
                borderRadius: "8px",
                border: "1px solid rgba(148, 163, 184, 0.15)",
                cursor: "pointer",
                transition: "all 0.2s ease"
              },
              onMouseEnter: (e) => {
                e.currentTarget.style.backgroundColor = "rgba(30, 58, 138, 0.3)";
                e.currentTarget.style.borderColor = "rgba(148, 163, 184, 0.3)";
              },
              onMouseLeave: (e) => {
                e.currentTarget.style.backgroundColor = "rgba(15, 23, 42, 0.5)";
                e.currentTarget.style.borderColor = "rgba(148, 163, 184, 0.15)";
              },
              children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { fontSize: "28px", marginBottom: "8px" }, children: feature.icon }, void 0, false, {
                  fileName: "/app/code/frontend/src/components/Purchasing/PurchasingPanel.jsx",
                  lineNumber: 133,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { fontSize: "12px", color: "#cbd5e1" }, children: feature.label }, void 0, false, {
                  fileName: "/app/code/frontend/src/components/Purchasing/PurchasingPanel.jsx",
                  lineNumber: 134,
                  columnNumber: 19
                }, this)
              ]
            },
            idx,
            true,
            {
              fileName: "/app/code/frontend/src/components/Purchasing/PurchasingPanel.jsx",
              lineNumber: 114,
              columnNumber: 17
            },
            this
          )) }, void 0, false, {
            fileName: "/app/code/frontend/src/components/Purchasing/PurchasingPanel.jsx",
            lineNumber: 101,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { style: { margin: "24px 0 8px 0", fontSize: "14px" }, children: isLoading ? "Loading Purchasing module from Builder.io..." : "Purchasing module ready" }, void 0, false, {
            fileName: "/app/code/frontend/src/components/Purchasing/PurchasingPanel.jsx",
            lineNumber: 139,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { style: { margin: 0, fontSize: "11px", opacity: 0.6 }, children: "Project: b7fb23f08dac4694b1ae40ac60e1f16a" }, void 0, false, {
            fileName: "/app/code/frontend/src/components/Purchasing/PurchasingPanel.jsx",
            lineNumber: 142,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/components/Purchasing/PurchasingPanel.jsx",
          lineNumber: 99,
          columnNumber: 11
        }, this) }, void 0, false, {
          fileName: "/app/code/frontend/src/components/Purchasing/PurchasingPanel.jsx",
          lineNumber: 88,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { id: "builder-purchasing-container", style: { flex: 1 } }, void 0, false, {
          fileName: "/app/code/frontend/src/components/Purchasing/PurchasingPanel.jsx",
          lineNumber: 149,
          columnNumber: 9
        }, this)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/Purchasing/PurchasingPanel.jsx",
        lineNumber: 64,
        columnNumber: 7
      }, this)
    },
    void 0,
    false,
    {
      fileName: "/app/code/frontend/src/components/Purchasing/PurchasingPanel.jsx",
      lineNumber: 52,
      columnNumber: 5
    },
    this
  );
}
export {
  PurchasingPanel as default
};
