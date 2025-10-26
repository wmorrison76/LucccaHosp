import { r as reactExports, j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
const KEY = "lu:design:vars";
const DEFAULTS = {
  "--panel-radius": "16px",
  "--panel-ring": "0 0 0 1px rgba(255,255,255,.06)",
  "--panel-shadow": "0 22px 80px rgba(0,0,0,.45), 0 0 22px rgba(22,224,255,.16)",
  "--panel-bg": "rgba(15,19,28,0.9)",
  "--panel-bg-subtle": "rgba(255,255,255,0.05)",
  "--accent": "#16E0FF",
  "--tab-height": "36px",
  "--tab-radius": "10px",
  "--tab-active-bg": "rgba(255,255,255,0.10)",
  "--tab-border": "1px solid rgba(255,255,255,0.12)",
  "--mode": "dark"
  // dark | light | auto
};
function StyleControllerWidget() {
  const [vars, setVars] = reactExports.useState(() => {
    try {
      return { ...DEFAULTS, ...JSON.parse(localStorage.getItem(KEY) || "{}") };
    } catch {
      return DEFAULTS;
    }
  });
  reactExports.useEffect(() => {
    const root = document.documentElement;
    Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));
  }, [vars]);
  const save = () => {
    localStorage.setItem(KEY, JSON.stringify(vars));
    window.dispatchEvent(new CustomEvent("lu:design:updated", { detail: vars }));
  };
  const set = (k) => (e) => setVars((v) => ({ ...v, [k]: e.target.value }));
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "rounded-2xl p-3 border border-white/12 bg-white/5", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "font-semibold mb-2", children: "Style Controller" }, void 0, false, {
      fileName: "/app/code/frontend/src/components/widgets/StyleControllerWidget.jsx",
      lineNumber: 52,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid gap-3", style: { gridTemplateColumns: "1fr 1fr" }, children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "flex flex-col gap-1", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-xs opacity-80", children: "Accent" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/widgets/StyleControllerWidget.jsx",
          lineNumber: 56,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("input", { type: "text", className: "settings-input", value: vars["--accent"], onChange: set("--accent") }, void 0, false, {
          fileName: "/app/code/frontend/src/components/widgets/StyleControllerWidget.jsx",
          lineNumber: 57,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/widgets/StyleControllerWidget.jsx",
        lineNumber: 55,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "flex flex-col gap-1", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-xs opacity-80", children: "Panel radius" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/widgets/StyleControllerWidget.jsx",
          lineNumber: 60,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("input", { type: "text", className: "settings-input", value: vars["--panel-radius"], onChange: set("--panel-radius") }, void 0, false, {
          fileName: "/app/code/frontend/src/components/widgets/StyleControllerWidget.jsx",
          lineNumber: 61,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/widgets/StyleControllerWidget.jsx",
        lineNumber: 59,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "flex flex-col gap-1", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-xs opacity-80", children: "Tab height" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/widgets/StyleControllerWidget.jsx",
          lineNumber: 64,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("input", { type: "text", className: "settings-input", value: vars["--tab-height"], onChange: set("--tab-height") }, void 0, false, {
          fileName: "/app/code/frontend/src/components/widgets/StyleControllerWidget.jsx",
          lineNumber: 65,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/widgets/StyleControllerWidget.jsx",
        lineNumber: 63,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "flex flex-col gap-1", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-xs opacity-80", children: "Tab active bg" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/widgets/StyleControllerWidget.jsx",
          lineNumber: 68,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("input", { type: "text", className: "settings-input", value: vars["--tab-active-bg"], onChange: set("--tab-active-bg") }, void 0, false, {
          fileName: "/app/code/frontend/src/components/widgets/StyleControllerWidget.jsx",
          lineNumber: 69,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/widgets/StyleControllerWidget.jsx",
        lineNumber: 67,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/widgets/StyleControllerWidget.jsx",
      lineNumber: 54,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid gap-3 mt-3", style: { gridTemplateColumns: "1fr 1fr" }, children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "flex flex-col gap-1", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-xs opacity-80", children: "Mode" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/widgets/StyleControllerWidget.jsx",
          lineNumber: 75,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("select", { className: "settings-input", value: vars["--mode"], onChange: set("--mode"), children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "dark", children: "Dark" }, void 0, false, {
            fileName: "/app/code/frontend/src/components/widgets/StyleControllerWidget.jsx",
            lineNumber: 77,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "light", children: "Light" }, void 0, false, {
            fileName: "/app/code/frontend/src/components/widgets/StyleControllerWidget.jsx",
            lineNumber: 78,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "auto", children: "Auto" }, void 0, false, {
            fileName: "/app/code/frontend/src/components/widgets/StyleControllerWidget.jsx",
            lineNumber: 79,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/components/widgets/StyleControllerWidget.jsx",
          lineNumber: 76,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/widgets/StyleControllerWidget.jsx",
        lineNumber: 74,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "flex flex-col gap-1", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-xs opacity-80", children: "Panel bg" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/widgets/StyleControllerWidget.jsx",
          lineNumber: 83,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("input", { type: "text", className: "settings-input", value: vars["--panel-bg"], onChange: set("--panel-bg") }, void 0, false, {
          fileName: "/app/code/frontend/src/components/widgets/StyleControllerWidget.jsx",
          lineNumber: 84,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/widgets/StyleControllerWidget.jsx",
        lineNumber: 82,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/widgets/StyleControllerWidget.jsx",
      lineNumber: 73,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex gap-2 mt-3", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { className: "dw-btn dw-btn--primary px-3 py-1 rounded", onClick: save, children: "Apply" }, void 0, false, {
        fileName: "/app/code/frontend/src/components/widgets/StyleControllerWidget.jsx",
        lineNumber: 89,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { className: "dw-btn px-3 py-1 rounded", onClick: () => setVars(DEFAULTS), children: "Reset" }, void 0, false, {
        fileName: "/app/code/frontend/src/components/widgets/StyleControllerWidget.jsx",
        lineNumber: 90,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/widgets/StyleControllerWidget.jsx",
      lineNumber: 88,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/widgets/StyleControllerWidget.jsx",
    lineNumber: 51,
    columnNumber: 5
  }, this);
}
export {
  StyleControllerWidget as default
};
