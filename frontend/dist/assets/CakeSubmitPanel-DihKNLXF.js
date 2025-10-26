import { j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
function CakeSubmitPanel({ layers, guestCount, eventType, theme, notes }) {
  const basePrice = 30;
  const layerCost = 10;
  const estimatedCost = basePrice + layers.length * layerCost;
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-10 w-full max-w-2xl border-t pt-6 text-zinc-700", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-lg font-semibold mb-2", children: "🎉 Cake Summary" }, void 0, false, {
      fileName: "/app/code/frontend/src/components/PastryLibrary/CakeSubmitPanel.jsx",
      lineNumber: 11,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("ul", { className: "text-sm space-y-1", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: "Event:" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/PastryLibrary/CakeSubmitPanel.jsx",
          lineNumber: 13,
          columnNumber: 13
        }, this),
        " ",
        eventType || "—"
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/PastryLibrary/CakeSubmitPanel.jsx",
        lineNumber: 13,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: "Guests:" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/PastryLibrary/CakeSubmitPanel.jsx",
          lineNumber: 14,
          columnNumber: 13
        }, this),
        " ",
        guestCount || "—"
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/PastryLibrary/CakeSubmitPanel.jsx",
        lineNumber: 14,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: "Theme:" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/PastryLibrary/CakeSubmitPanel.jsx",
          lineNumber: 15,
          columnNumber: 13
        }, this),
        " ",
        theme || "—"
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/PastryLibrary/CakeSubmitPanel.jsx",
        lineNumber: 15,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: "Layers:" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/PastryLibrary/CakeSubmitPanel.jsx",
          lineNumber: 16,
          columnNumber: 13
        }, this),
        " ",
        layers.length
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/PastryLibrary/CakeSubmitPanel.jsx",
        lineNumber: 16,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: "Estimated Cost:" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/PastryLibrary/CakeSubmitPanel.jsx",
          lineNumber: 17,
          columnNumber: 13
        }, this),
        " $",
        estimatedCost.toFixed(2)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/PastryLibrary/CakeSubmitPanel.jsx",
        lineNumber: 17,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/PastryLibrary/CakeSubmitPanel.jsx",
      lineNumber: 12,
      columnNumber: 7
    }, this),
    notes && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mt-4 p-2 bg-yellow-50 border-l-4 border-yellow-400 text-sm text-yellow-700 rounded", children: [
      "Note: ",
      notes
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/PastryLibrary/CakeSubmitPanel.jsx",
      lineNumber: 20,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "button",
      {
        className: "mt-6 px-6 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700 transition",
        children: "Submit Cake Design 💌"
      },
      void 0,
      false,
      {
        fileName: "/app/code/frontend/src/components/PastryLibrary/CakeSubmitPanel.jsx",
        lineNumber: 25,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/PastryLibrary/CakeSubmitPanel.jsx",
    lineNumber: 10,
    columnNumber: 5
  }, this);
}
export {
  CakeSubmitPanel as default
};
