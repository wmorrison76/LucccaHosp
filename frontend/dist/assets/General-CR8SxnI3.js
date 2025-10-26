import { r as reactExports, j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
import { b as setTweaks, c as applyTheme, g as getSelectedThemeId } from "./theme-BuykcvzJ.js";
function General() {
  const [compact, setCompact] = reactExports.useState(() => localStorage.getItem("lu:ui:compact") === "1");
  const [motion, setMotion] = reactExports.useState(() => localStorage.getItem("lu:ui:reduceMotion") === "1");
  reactExports.useEffect(() => {
    document.documentElement.classList.toggle("compact", compact);
    try {
      localStorage.setItem("lu:ui:compact", compact ? "1" : "0");
    } catch {
    }
  }, [compact]);
  reactExports.useEffect(() => {
    document.documentElement.classList.toggle("reduce-motion", motion);
    try {
      localStorage.setItem("lu:ui:reduceMotion", motion ? "1" : "0");
    } catch {
    }
  }, [motion]);
  const resetTheme = () => {
    setTweaks({});
    applyTheme(getSelectedThemeId());
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-6", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "dw-panel p-4", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-xl font-semibold mb-3", children: "General" }, void 0, false, {
      fileName: "/app/code/frontend/src/components/settings/sections/General.jsx",
      lineNumber: 27,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("input", { type: "checkbox", className: "settings-switch", checked: compact, onChange: (e) => setCompact(e.target.checked) }, void 0, false, {
        fileName: "/app/code/frontend/src/components/settings/sections/General.jsx",
        lineNumber: 29,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: "Compact density" }, void 0, false, {
        fileName: "/app/code/frontend/src/components/settings/sections/General.jsx",
        lineNumber: 30,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/settings/sections/General.jsx",
      lineNumber: 28,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "flex items-center gap-3 mt-3", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("input", { type: "checkbox", className: "settings-switch", checked: motion, onChange: (e) => setMotion(e.target.checked) }, void 0, false, {
        fileName: "/app/code/frontend/src/components/settings/sections/General.jsx",
        lineNumber: 33,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: "Reduce motion" }, void 0, false, {
        fileName: "/app/code/frontend/src/components/settings/sections/General.jsx",
        lineNumber: 34,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/settings/sections/General.jsx",
      lineNumber: 32,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-6", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "button",
      {
        className: "px-3 h-9 rounded-lg border border-white/20 hover:border-white/35",
        onClick: resetTheme,
        children: "Reset theme tweaks"
      },
      void 0,
      false,
      {
        fileName: "/app/code/frontend/src/components/settings/sections/General.jsx",
        lineNumber: 38,
        columnNumber: 11
      },
      this
    ) }, void 0, false, {
      fileName: "/app/code/frontend/src/components/settings/sections/General.jsx",
      lineNumber: 37,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/settings/sections/General.jsx",
    lineNumber: 26,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/app/code/frontend/src/components/settings/sections/General.jsx",
    lineNumber: 25,
    columnNumber: 5
  }, this);
}
export {
  General as default
};
