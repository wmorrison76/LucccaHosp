import { j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
function Widgets({ widgets }) {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "text-xl font-semibold", children: "Widgets" }, void 0, false, {
      fileName: "/app/code/frontend/src/components/settings/sections/Widgets.jsx",
      lineNumber: 6,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm opacity-80", children: "Browse installed widgets and launch the Widget Studio to add new ones." }, void 0, false, {
      fileName: "/app/code/frontend/src/components/settings/sections/Widgets.jsx",
      lineNumber: 7,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid", style: { gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 12 }, children: [
      widgets.length === 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "opacity-70 text-sm", children: "No widgets found yet." }, void 0, false, {
        fileName: "/app/code/frontend/src/components/settings/sections/Widgets.jsx",
        lineNumber: 10,
        columnNumber: 34
      }, this),
      widgets.map((w) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "rounded-xl border border-white/12 p-3 bg-white/3", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "font-medium", children: w.name }, void 0, false, {
          fileName: "/app/code/frontend/src/components/settings/sections/Widgets.jsx",
          lineNumber: 13,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex gap-2 mt-2", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "button",
            {
              className: "dw-btn px-2 py-1 rounded",
              onClick: () => window.dispatchEvent(new CustomEvent("open-panel", { detail: { id: "widgets", allowDuplicate: true, title: "Widget Studio" } })),
              children: "Edit in Studio"
            },
            void 0,
            false,
            {
              fileName: "/app/code/frontend/src/components/settings/sections/Widgets.jsx",
              lineNumber: 15,
              columnNumber: 15
            },
            this
          ),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "button",
            {
              className: "dw-btn dw-btn--primary px-2 py-1 rounded",
              onClick: () => window.dispatchEvent(new CustomEvent("hud-add-widget", { detail: { id: "from-settings", title: w.name } })),
              children: "Add to Dashboard"
            },
            void 0,
            false,
            {
              fileName: "/app/code/frontend/src/components/settings/sections/Widgets.jsx",
              lineNumber: 19,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/components/settings/sections/Widgets.jsx",
          lineNumber: 14,
          columnNumber: 13
        }, this)
      ] }, w.id, true, {
        fileName: "/app/code/frontend/src/components/settings/sections/Widgets.jsx",
        lineNumber: 12,
        columnNumber: 11
      }, this))
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/settings/sections/Widgets.jsx",
      lineNumber: 9,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-2", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "button",
      {
        className: "inline-flex items-center gap-2 h-9 px-3 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10",
        onClick: () => window.dispatchEvent(new CustomEvent("open-panel", { detail: { id: "widgets", allowDuplicate: true, title: "Widget Studio" } })),
        title: "Open Widget Studio",
        children: "Open Widget Studio"
      },
      void 0,
      false,
      {
        fileName: "/app/code/frontend/src/components/settings/sections/Widgets.jsx",
        lineNumber: 29,
        columnNumber: 9
      },
      this
    ) }, void 0, false, {
      fileName: "/app/code/frontend/src/components/settings/sections/Widgets.jsx",
      lineNumber: 28,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/settings/sections/Widgets.jsx",
    lineNumber: 5,
    columnNumber: 5
  }, this);
}
export {
  Widgets as default
};
