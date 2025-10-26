import { j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
function CakePreview({ layers }) {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-full max-w-md h-96 bg-[url('/bg/marble.png')] bg-cover border rounded shadow mb-8 relative overflow-hidden", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute bottom-4 w-full flex flex-col items-center justify-end transition-all duration-500", children: layers.map((layer, i) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "div",
      {
        className: "w-3/4 h-8 rounded-full mb-2",
        style: {
          background: getFrostingColor(layer.frosting),
          border: "1px solid rgba(0,0,0,0.1)",
          boxShadow: "inset 0 0 2px #999"
        }
      },
      i,
      false,
      {
        fileName: "/app/code/frontend/src/components/PastryLibrary/CakePreview.jsx",
        lineNumber: 9,
        columnNumber: 11
      },
      this
    )) }, void 0, false, {
      fileName: "/app/code/frontend/src/components/PastryLibrary/CakePreview.jsx",
      lineNumber: 7,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow text-xs font-semibold text-zinc-600", children: "Live Preview" }, void 0, false, {
      fileName: "/app/code/frontend/src/components/PastryLibrary/CakePreview.jsx",
      lineNumber: 20,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/PastryLibrary/CakePreview.jsx",
    lineNumber: 6,
    columnNumber: 5
  }, this);
}
function getFrostingColor(frosting) {
  switch (frosting) {
    case "Buttercream":
      return "#f8e1c1";
    case "Fondant":
      return "#f3f3f3";
    case "Cream Cheese":
      return "#fff7f1";
    case "Ganache":
      return "#4b2e2e";
    default:
      return "#e0e0e0";
  }
}
export {
  CakePreview as default
};
