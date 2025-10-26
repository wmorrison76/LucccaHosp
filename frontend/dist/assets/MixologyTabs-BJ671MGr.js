import { r as reactExports, j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
const TABS = [
  { id: "spirits", label: "Spirits" },
  { id: "techniques", label: "Techniques" },
  { id: "recipes", label: "Recipes" },
  { id: "garnishes", label: "Garnishes" }
];
function MixologyTabs() {
  const [tab, setTab] = reactExports.useState("spirits");
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-4 space-y-4", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-wrap gap-2", children: TABS.map((t) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "button",
      {
        onClick: () => setTab(t.id),
        className: [
          "px-3 py-1.5 rounded-full text-sm border transition",
          tab === t.id ? "bg-cyan-500/15 border-cyan-400 text-cyan-300" : "bg-white/5 border-white/10 hover:bg-white/10 text-slate-300"
        ].join(" "),
        children: t.label
      },
      t.id,
      false,
      {
        fileName: "/app/code/frontend/src/components/MixologyTabs.jsx",
        lineNumber: 17,
        columnNumber: 11
      },
      this
    )) }, void 0, false, {
      fileName: "/app/code/frontend/src/components/MixologyTabs.jsx",
      lineNumber: 15,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "rounded-xl border border-white/10 bg-black/5 dark:bg-white/5 p-4 min-h-[220px]", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-sm font-semibold mb-2", children: tab.toUpperCase() }, void 0, false, {
        fileName: "/app/code/frontend/src/components/MixologyTabs.jsx",
        lineNumber: 33,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-sm opacity-80", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { children: [
        "Mixology content for ",
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("b", { children: tab }, void 0, false, {
          fileName: "/app/code/frontend/src/components/MixologyTabs.jsx",
          lineNumber: 35,
          columnNumber: 35
        }, this),
        " goes here."
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/MixologyTabs.jsx",
        lineNumber: 35,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "/app/code/frontend/src/components/MixologyTabs.jsx",
        lineNumber: 34,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/MixologyTabs.jsx",
      lineNumber: 32,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/MixologyTabs.jsx",
    lineNumber: 14,
    columnNumber: 5
  }, this);
}
export {
  MixologyTabs as default
};
