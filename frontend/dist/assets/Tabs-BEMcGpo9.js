import { r as reactExports, j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
function Tabs({ tabs }) {
  const [activeIndex, setActiveIndex] = reactExports.useState(0);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-full", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex border-b border-gray-600", children: tabs.map((tab, index) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "button",
      {
        onClick: () => setActiveIndex(index),
        className: `px-4 py-2 font-medium transition-colors ${activeIndex === index ? "border-b-2 border-cyan-400 text-cyan-400" : "text-gray-400 hover:text-gray-200"}`,
        children: tab.label
      },
      index,
      false,
      {
        fileName: "/app/code/frontend/src/components/Tabs.tsx",
        lineNumber: 19,
        columnNumber: 11
      },
      this
    )) }, void 0, false, {
      fileName: "/app/code/frontend/src/components/Tabs.tsx",
      lineNumber: 17,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-4", children: tabs[activeIndex]?.content }, void 0, false, {
      fileName: "/app/code/frontend/src/components/Tabs.tsx",
      lineNumber: 32,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/Tabs.tsx",
    lineNumber: 16,
    columnNumber: 5
  }, this);
}
export {
  Tabs as T
};
