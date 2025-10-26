import { j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
function TabsHeader({ tabs, activeTab, setActiveTab }) {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex border-b relative z-10 justify-end space-x-0", children: tabs.map((tab, i) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "button",
    {
      onClick: () => setActiveTab(tab),
      className: `px-4 py-2 -mb-px text-sm font-semibold transition-all duration-150 ease-in-out ${activeTab === tab ? "bg-white border border-b-transparent rounded-t shadow-sm text-black" : "bg-pink-100 text-pink-600 border border-transparent hover:bg-pink-200"} ${i !== 0 ? "-ml-2" : ""} rounded-t-md`,
      style: {
        zIndex: activeTab === tab ? 20 : 10
      },
      children: tab
    },
    tab,
    false,
    {
      fileName: "/app/code/frontend/src/components/PastryLibrary/TabsHeader.jsx",
      lineNumber: 7,
      columnNumber: 9
    },
    this
  )) }, void 0, false, {
    fileName: "/app/code/frontend/src/components/PastryLibrary/TabsHeader.jsx",
    lineNumber: 5,
    columnNumber: 5
  }, this);
}
export {
  TabsHeader as default
};
