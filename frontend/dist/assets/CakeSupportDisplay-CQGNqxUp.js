import { j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
function CakeSupportDisplay({ designData = {} }) {
  const diameter = Number(designData.diameter ?? 8);
  const height = Number(designData.height ?? 4);
  const { internalRods, baseBoards } = calculateCakeSupports({ diameter, height });
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-4 bg-white dark:bg-zinc-800 rounded-lg shadow", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "font-bold", children: "Structural Supports" }, void 0, false, {
      fileName: "/app/code/frontend/src/components/CakeSupportDisplay.jsx",
      lineNumber: 11,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { children: [
      "Internal Rods Required: ",
      internalRods
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/CakeSupportDisplay.jsx",
      lineNumber: 12,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { children: [
      "Base Boards Required: ",
      baseBoards
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/CakeSupportDisplay.jsx",
      lineNumber: 13,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/CakeSupportDisplay.jsx",
    lineNumber: 10,
    columnNumber: 5
  }, this);
}
function calculateCakeSupports({ diameter, height }) {
  let internalRods = 0;
  let baseBoards = 1;
  if (diameter >= 10) internalRods = Math.floor(diameter / 4);
  if (height >= 6) baseBoards = 2;
  return { internalRods, baseBoards };
}
export {
  CakeSupportDisplay as default
};
