import { r as reactExports, j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
const THEME_VARS_KEY = "lu:theme:vars:v1";
const THEME_FLAGS_KEY = "lu:theme:flags:v1";
const THEME_PRESET_KEY = "lu:theme:preset:v1";
function emitApply({ vars = {}, flags = {}, preset } = {}) {
  window.dispatchEvent(new CustomEvent("lu:settings:apply", { detail: { vars, flags, preset } }));
}
function save(vars, flags, preset) {
  try {
    if (vars) localStorage.setItem(THEME_VARS_KEY, JSON.stringify(vars));
    if (flags) localStorage.setItem(THEME_FLAGS_KEY, JSON.stringify(flags));
    if (preset) localStorage.setItem(THEME_PRESET_KEY, preset);
  } catch {
  }
}
function applyThemeVars(vars = {}) {
  const root = document.documentElement;
  for (const [k, v] of Object.entries(vars)) {
    if (k.startsWith("--")) root.style.setProperty(k, String(v));
  }
}
function applyThemeFlags(flags = {}) {
  const root = document.documentElement;
  if ("dark" in flags) root.classList.toggle("dark", !!flags.dark);
  if ("highContrast" in flags) root.classList.toggle("hc", !!flags.highContrast);
  if ("colorblindSafe" in flags) root.classList.toggle("cb-safe", !!flags.colorblindSafe);
}
const PRESETS = {
  light: {
    vars: {
      "--bg": "hsl(0 0% 100%)",
      "--text": "hsl(222 47% 11%)",
      "--panel": "hsl(0 0% 100% / 0.9)",
      "--panel-border-color": "hsl(214 32% 91%)",
      "--shadow": "0 30px 90px rgba(0,0,0,.18)"
    },
    flags: { dark: false }
  },
  nightfall: {
    vars: {
      "--bg": "hsl(222 47% 6%)",
      "--text": "hsl(210 40% 98%)",
      "--panel": "hsl(222 47% 8% / 0.9)",
      "--panel-border-color": "rgba(255,255,255,.12)",
      "--shadow": "0 30px 90px rgba(0,0,0,.55)"
    },
    flags: { dark: true }
  }
};
function setPreset(name) {
  const def = PRESETS[name];
  if (!def) return;
  applyThemeVars(def.vars);
  applyThemeFlags(def.flags);
  save(def.vars, def.flags, name);
  emitApply({ vars: def.vars, flags: def.flags, preset: name });
}
function Field({ label, value, onChange, placeholder, className }) {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: `block ${className || ""}`, children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-sm opacity-75 mb-1", children: label }, void 0, false, {
      fileName: "/app/code/frontend/src/components/settings/sections/Appearance.jsx",
      lineNumber: 8,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "input",
      {
        className: "settings-input",
        placeholder,
        value,
        onChange: (e) => onChange(e.target.value)
      },
      void 0,
      false,
      {
        fileName: "/app/code/frontend/src/components/settings/sections/Appearance.jsx",
        lineNumber: 9,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/settings/sections/Appearance.jsx",
    lineNumber: 7,
    columnNumber: 5
  }, this);
}
function Appearance() {
  const [t, setT] = reactExports.useState(() => getTweaks());
  reactExports.useEffect(() => saveTweaks(t), [t]);
  const presets = reactExports.useMemo(() => [
    { id: "nightfall", label: "Nightfall" },
    { id: "glasslight", label: "Glasslight" },
    { id: "neonwave", label: "Neonwave" },
    { id: "colorblindSafe", label: "Colorblind safe" }
  ], []);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "rounded-xl p-5 border border-white/10 bg-[var(--panel-bg)] shadow-[var(--panel-glow)]", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-xl font-semibold mb-3", children: "Theme presets" }, void 0, false, {
        fileName: "/app/code/frontend/src/components/settings/sections/Appearance.jsx",
        lineNumber: 36,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-wrap gap-2", children: presets.map((p) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "button",
        {
          onClick: () => {
            setPreset(p.id);
            setT(getTweaks());
          },
          className: `px-3 h-9 rounded-lg border ${t.preset === p.id ? "border-[var(--ring)] bg-[color-mix(in_srgb,var(--ring) 10%,transparent)]" : "border-white/15 hover:bg-white/5"}`,
          children: p.label
        },
        p.id,
        false,
        {
          fileName: "/app/code/frontend/src/components/settings/sections/Appearance.jsx",
          lineNumber: 39,
          columnNumber: 13
        },
        this
      )) }, void 0, false, {
        fileName: "/app/code/frontend/src/components/settings/sections/Appearance.jsx",
        lineNumber: 37,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm opacity-70 mt-3", children: "Presets are starting points; you can still tweak details below. “Colorblind safe” uses blue/orange accents and higher luminance contrast." }, void 0, false, {
        fileName: "/app/code/frontend/src/components/settings/sections/Appearance.jsx",
        lineNumber: 48,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/settings/sections/Appearance.jsx",
      lineNumber: 35,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "rounded-xl p-5 border border-white/10 bg-[var(--panel-bg)] shadow-[var(--panel-glow)]", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-xl font-semibold mb-4", children: "Panel chrome" }, void 0, false, {
        fileName: "/app/code/frontend/src/components/settings/sections/Appearance.jsx",
        lineNumber: 55,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid md:grid-cols-4 gap-4", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          Field,
          {
            label: "Border width",
            placeholder: "e.g. 1px or 2px",
            value: t.borderWidth,
            onChange: (v) => setT({ ...t, borderWidth: v })
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/settings/sections/Appearance.jsx",
            lineNumber: 57,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          Field,
          {
            label: "Border color",
            placeholder: "rgba(...)",
            value: t.borderColor,
            onChange: (v) => setT({ ...t, borderColor: v })
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/settings/sections/Appearance.jsx",
            lineNumber: 59,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          Field,
          {
            label: "Glow (shadow px)",
            placeholder: "24",
            value: t.glowPx,
            onChange: (v) => setT({ ...t, glowPx: v })
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/settings/sections/Appearance.jsx",
            lineNumber: 61,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          Field,
          {
            label: "Header height",
            placeholder: "44px",
            value: t.headerHeight,
            onChange: (v) => setT({ ...t, headerHeight: v })
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/settings/sections/Appearance.jsx",
            lineNumber: 63,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/settings/sections/Appearance.jsx",
        lineNumber: 56,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/settings/sections/Appearance.jsx",
      lineNumber: 54,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "rounded-xl p-5 border border-white/10 bg-[var(--panel-bg)] shadow-[var(--panel-glow)]", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-xl font-semibold mb-4", children: "Typography" }, void 0, false, {
        fileName: "/app/code/frontend/src/components/settings/sections/Appearance.jsx",
        lineNumber: 70,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid md:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          Field,
          {
            label: "Base size",
            placeholder: "14px",
            value: t.baseSize,
            onChange: (v) => setT({ ...t, baseSize: v })
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/settings/sections/Appearance.jsx",
            lineNumber: 72,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          Field,
          {
            label: "Title size",
            placeholder: "18px",
            value: t.titleSize,
            onChange: (v) => setT({ ...t, titleSize: v })
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/settings/sections/Appearance.jsx",
            lineNumber: 74,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          Field,
          {
            label: "Accent color",
            placeholder: "#46e6ff",
            value: t.accent,
            onChange: (v) => setT({ ...t, accent: v })
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/settings/sections/Appearance.jsx",
            lineNumber: 76,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/settings/sections/Appearance.jsx",
        lineNumber: 71,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/settings/sections/Appearance.jsx",
      lineNumber: 69,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/settings/sections/Appearance.jsx",
    lineNumber: 33,
    columnNumber: 5
  }, this);
}
export {
  Appearance as default
};
