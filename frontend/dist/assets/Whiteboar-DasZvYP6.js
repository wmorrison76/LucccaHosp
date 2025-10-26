import { j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
function Whiteboard() {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "text-xl font-semibold", children: "Whiteboard" }, void 0, false, {
      fileName: "/app/code/frontend/src/components/settings/sections/Whiteboar.jsx",
      lineNumber: 6,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid gap-3", style: { gridTemplateColumns: "1fr 1fr" }, children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "flex items-center justify-between gap-3 p-3 rounded-xl border border-white/10", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: "Show grid" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/settings/sections/Whiteboar.jsx",
          lineNumber: 9,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "input",
          {
            type: "checkbox",
            className: "settings-switch",
            defaultChecked: localStorage.getItem("lu:whiteboard:grid") === "true",
            onChange: (e) => localStorage.setItem("lu:whiteboard:grid", String(e.target.checked))
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/settings/sections/Whiteboar.jsx",
            lineNumber: 10,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/settings/sections/Whiteboar.jsx",
        lineNumber: 8,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "flex items-center justify-between gap-3 p-3 rounded-xl border border-white/10", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: "Sticky note default color" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/settings/sections/Whiteboar.jsx",
          lineNumber: 16,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "input",
          {
            className: "settings-input",
            placeholder: "#FFD166",
            defaultValue: localStorage.getItem("lu:whiteboard:stickyColor") || "#FFD166",
            onBlur: (e) => localStorage.setItem("lu:whiteboard:stickyColor", e.target.value)
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/settings/sections/Whiteboar.jsx",
            lineNumber: 17,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/settings/sections/Whiteboar.jsx",
        lineNumber: 15,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/settings/sections/Whiteboar.jsx",
      lineNumber: 7,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "button",
      {
        className: "inline-flex items-center gap-2 h-9 px-3 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10",
        onClick: () => window.dispatchEvent(new CustomEvent("open-panel", { detail: { id: "whiteboard", allowDuplicate: true } })),
        children: "Open Whiteboard"
      },
      void 0,
      false,
      {
        fileName: "/app/code/frontend/src/components/settings/sections/Whiteboar.jsx",
        lineNumber: 25,
        columnNumber: 9
      },
      this
    ) }, void 0, false, {
      fileName: "/app/code/frontend/src/components/settings/sections/Whiteboar.jsx",
      lineNumber: 24,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/settings/sections/Whiteboar.jsx",
    lineNumber: 5,
    columnNumber: 5
  }, this);
}
export {
  Whiteboard as default
};
