import { j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
function ProposalActions({ onDownloadPDF, onGenerateQR }) {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-6 flex gap-4", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "button",
      {
        onClick: onDownloadPDF,
        className: "bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700",
        children: "Download PDF"
      },
      void 0,
      false,
      {
        fileName: "/app/code/frontend/src/pages/ProposalActions.jsx",
        lineNumber: 6,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "button",
      {
        onClick: onGenerateQR,
        className: "bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700",
        children: "Generate QR Code"
      },
      void 0,
      false,
      {
        fileName: "/app/code/frontend/src/pages/ProposalActions.jsx",
        lineNumber: 12,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/pages/ProposalActions.jsx",
    lineNumber: 5,
    columnNumber: 5
  }, this);
}
export {
  ProposalActions as default
};
