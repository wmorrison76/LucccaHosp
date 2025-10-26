import { r as reactExports, j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
import CakeCanvas from "./CakeCanvas-CpIfS9v4.js";
import CakeDesignSummary from "./CakeDesignSummary-BcXshMlC.js";
import { FormButton } from "./FormButton-Bc4k9yy7.js";
function CakeDesignerExport() {
  const [exportStatus, setExportStatus] = reactExports.useState("");
  const sampleDesign = {
    base: "8-inch Vanilla",
    fillings: ["Raspberry Jam", "Whipped Cream"],
    crumbCoat: true,
    coating: "Fondant",
    supports: "Internal Dowels",
    decorations: ["Gold Leaf", "Marble Effect"]
  };
  const handleExport = () => {
    setExportStatus("Exported successfully to Recipe Library");
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "cake-designer-export-page", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { className: "text-2xl font-bold mb-4", children: "Cake Designer Export" }, void 0, false, {
      fileName: "/app/code/frontend/src/pages/CakeDesignerExport.jsx",
      lineNumber: 25,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CakeCanvas, {}, void 0, false, {
        fileName: "/app/code/frontend/src/pages/CakeDesignerExport.jsx",
        lineNumber: 27,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CakeDesignSummary, { designData: sampleDesign }, void 0, false, {
        fileName: "/app/code/frontend/src/pages/CakeDesignerExport.jsx",
        lineNumber: 28,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/pages/CakeDesignerExport.jsx",
      lineNumber: 26,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(FormButton, { label: "Export Design to Recipe Library", onClick: handleExport }, void 0, false, {
      fileName: "/app/code/frontend/src/pages/CakeDesignerExport.jsx",
      lineNumber: 30,
      columnNumber: 7
    }, this),
    exportStatus && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mt-4", children: exportStatus }, void 0, false, {
      fileName: "/app/code/frontend/src/pages/CakeDesignerExport.jsx",
      lineNumber: 31,
      columnNumber: 24
    }, this)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/pages/CakeDesignerExport.jsx",
    lineNumber: 24,
    columnNumber: 5
  }, this);
}
export {
  CakeDesignerExport as default
};
