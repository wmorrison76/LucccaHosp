import { j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
function ProposalSummary({ proposal }) {
  if (!proposal) return null;
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-white p-6 rounded shadow-md", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "text-2xl font-bold mb-4", children: "Proposal Summary" }, void 0, false, {
      fileName: "/app/code/frontend/src/pages/ProposalSummary.jsx",
      lineNumber: 8,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: "Guest Count:" }, void 0, false, {
        fileName: "/app/code/frontend/src/pages/ProposalSummary.jsx",
        lineNumber: 9,
        columnNumber: 10
      }, this),
      " ",
      proposal.guestCount
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/pages/ProposalSummary.jsx",
      lineNumber: 9,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: "Estimated Total:" }, void 0, false, {
        fileName: "/app/code/frontend/src/pages/ProposalSummary.jsx",
        lineNumber: 10,
        columnNumber: 10
      }, this),
      " $",
      proposal.estimatedCost
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/pages/ProposalSummary.jsx",
      lineNumber: 10,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "mt-4 font-semibold", children: "Selected Features:" }, void 0, false, {
      fileName: "/app/code/frontend/src/pages/ProposalSummary.jsx",
      lineNumber: 11,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("ul", { className: "list-disc ml-5 mt-2", children: proposal.modifiers.map((item, idx) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: [
      item.icon,
      " ",
      item.name,
      " - $",
      item.cost
    ] }, idx, true, {
      fileName: "/app/code/frontend/src/pages/ProposalSummary.jsx",
      lineNumber: 14,
      columnNumber: 11
    }, this)) }, void 0, false, {
      fileName: "/app/code/frontend/src/pages/ProposalSummary.jsx",
      lineNumber: 12,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/pages/ProposalSummary.jsx",
    lineNumber: 7,
    columnNumber: 5
  }, this);
}
export {
  ProposalSummary as default
};
