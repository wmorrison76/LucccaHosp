import { r as reactExports, j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
const KEY = "lu:design:theme:v2";
const DEFAULTS = { "--font-xs": "11px", "--font-sm": "13px", "--font-md": "15px", "--font-lg": "18px", "--font-xl": "24px", "--accent": "#16E0FF", mode: "auto", "textScale": 1, "highContrast": false };
function html() {
  return typeof document !== "undefined" ? document.documentElement : null;
}
function setVar(k, v) {
  const r = html();
  if (r) r.style.setProperty(k, String(v));
}
function applyVars(vars) {
  try {
    Object.entries(vars).forEach(([k, v]) => k && k.startsWith("--") && setVar(k, v));
  } catch (e) {
    console.warn("[theme] applyVars skipped:", e);
  }
}
function readVars() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}") || {};
  } catch {
    return {};
  }
}
function writeVars(next) {
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch (e) {
    console.warn("[theme] persist skipped:", e);
  }
}
function setModeAttr(m) {
  const r = html();
  if (r) r.dataset.mode = m || "auto";
}
function initTheme() {
  const run = () => {
    const saved = readVars();
    const merged = { ...DEFAULTS, ...saved };
    setModeAttr(merged.mode);
    applyVars(merged);
    if (merged.highContrast) {
      document.documentElement.setAttribute("data-high-contrast", "on");
    } else {
      document.documentElement.removeAttribute("data-high-contrast");
    }
    if (merged.textScale) {
      document.documentElement.style.setProperty("--text-scale", String(merged.textScale));
    }
    return merged;
  };
  if (!html()) {
    if (typeof window !== "undefined") {
      window.requestAnimationFrame(run);
    }
    return DEFAULTS;
  }
  return run();
}
function previewTheme(next = {}) {
  if (!next || typeof next !== "object") return;
  if (next.mode) setModeAttr(next.mode);
  applyVars(next);
}
function commitTheme(next = {}) {
  const merged = { ...readVars(), ...next };
  writeVars(merged);
  previewTheme(merged);
}
function resetTheme() {
  try {
    localStorage.removeItem(KEY);
  } catch {
  }
  previewTheme(DEFAULTS);
}
try {
  window.addEventListener("design-commit", (e) => {
    const d = e && e.detail || {};
    const cur = (function() {
      try {
        return JSON.parse(localStorage.getItem(KEY) || "{}");
      } catch {
        return {};
      }
    })();
    const merged = { ...DEFAULTS, ...cur, ...d };
    localStorage.setItem(KEY, JSON.stringify(merged));
    if (typeof d.highContrast === "boolean") {
      if (d.highContrast) document.documentElement.setAttribute("data-high-contrast", "on");
      else document.documentElement.removeAttribute("data-high-contrast");
    }
    if (d.textScale) document.documentElement.style.setProperty("--text-scale", String(d.textScale));
    applyVars(d);
  });
} catch {
}
function StyleControlPanel({ extraControls = false }) {
  const [draft, setDraft] = reactExports.useState(() => initTheme());
  const [preview, setPreview] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (preview) previewTheme(draft);
  }, [draft, preview]);
  const F = [["mode", "Mode", "select", ["auto", "dark", "light"]], ["--accent", "Accent", "text"], ["--font-xs", "XS", "text"], ["--font-sm", "SM", "text"], ["--font-md", "MD", "text"], ["--font-lg", "LG", "text"], ["--font-xl", "XL", "text"]];
  const on = (k) => (e) => setDraft((d) => ({ ...d, [k]: e.target.value }));
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ThemePacks, { draft, setDraft }, void 0, false, {
      fileName: "/app/code/frontend/src/components/StyleControlPanel.jsx",
      lineNumber: 10,
      columnNumber: 5
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ExportImport, { draft, setDraft }, void 0, false, {
      fileName: "/app/code/frontend/src/components/StyleControlPanel.jsx",
      lineNumber: 11,
      columnNumber: 5
    }, this),
    extraControls && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(A11yBlock, {}, void 0, false, {
      fileName: "/app/code/frontend/src/components/StyleControlPanel.jsx",
      lineNumber: 13,
      columnNumber: 23
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-lg font-semibold", children: "Appearance" }, void 0, false, {
      fileName: "/app/code/frontend/src/components/StyleControlPanel.jsx",
      lineNumber: 15,
      columnNumber: 5
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid gap-3", style: { gridTemplateColumns: "repeat(4,minmax(0,1fr))" }, children: F.map(([k, l, t, opts]) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "flex flex-col gap-1", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-sm opacity-80", children: l }, void 0, false, {
        fileName: "/app/code/frontend/src/components/StyleControlPanel.jsx",
        lineNumber: 17,
        columnNumber: 78
      }, this),
      t === "select" ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("select", { className: "dw-input", value: draft[k], onChange: on(k), children: opts.map((o) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { children: o }, o, false, {
        fileName: "/app/code/frontend/src/components/StyleControlPanel.jsx",
        lineNumber: 18,
        columnNumber: 99
      }, this)) }, void 0, false, {
        fileName: "/app/code/frontend/src/components/StyleControlPanel.jsx",
        lineNumber: 18,
        columnNumber: 23
      }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("input", { className: "dw-input", value: draft[k], onChange: on(k) }, void 0, false, {
        fileName: "/app/code/frontend/src/components/StyleControlPanel.jsx",
        lineNumber: 18,
        columnNumber: 139
      }, this)
    ] }, k, true, {
      fileName: "/app/code/frontend/src/components/StyleControlPanel.jsx",
      lineNumber: 17,
      columnNumber: 31
    }, this)) }, void 0, false, {
      fileName: "/app/code/frontend/src/components/StyleControlPanel.jsx",
      lineNumber: 16,
      columnNumber: 5
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex gap-2", children: [
      !preview && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { className: "dw-btn dw-btn--primary px-3 py-1 rounded", onClick: () => {
        setPreview(true);
        previewTheme(draft);
      }, children: "Preview" }, void 0, false, {
        fileName: "/app/code/frontend/src/components/StyleControlPanel.jsx",
        lineNumber: 22,
        columnNumber: 20
      }, this),
      preview && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { className: "dw-btn dw-btn--primary px-3 py-1 rounded", onClick: () => {
          commitTheme(draft);
          setPreview(false);
        }, children: "Apply" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/StyleControlPanel.jsx",
          lineNumber: 24,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { className: "dw-btn px-3 py-1 rounded", onClick: () => {
          initTheme();
          setPreview(false);
        }, children: "Cancel" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/StyleControlPanel.jsx",
          lineNumber: 25,
          columnNumber: 9
        }, this)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/StyleControlPanel.jsx",
        lineNumber: 23,
        columnNumber: 19
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { className: "dw-btn px-3 py-1 rounded", onClick: () => {
        resetTheme();
        setDraft(initTheme());
      }, children: "Reset" }, void 0, false, {
        fileName: "/app/code/frontend/src/components/StyleControlPanel.jsx",
        lineNumber: 27,
        columnNumber: 7
      }, this)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/StyleControlPanel.jsx",
      lineNumber: 21,
      columnNumber: 5
    }, this)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/StyleControlPanel.jsx",
    lineNumber: 9,
    columnNumber: 10
  }, this);
}
function A11yBlock() {
  const doc = document.documentElement;
  const setContrast = (on) => {
    doc.setAttribute("data-a11y-contrast", on ? "high" : "normal");
  };
  const applyPalette = (p) => {
    for (const [k, v] of Object.entries(p)) doc.style.setProperty(k, v);
  };
  const presets = {
    Deuteranopia: { "--accent": "#0072B2", "--text-strong": "#ffffff", "--bg-panel": "#0f141a" },
    Protanopia: { "--accent": "#009E73", "--text-strong": "#ffffff", "--bg-panel": "#0f141a" },
    Tritanopia: { "--accent": "#D55E00", "--text-strong": "#ffffff", "--bg-panel": "#0f141a" }
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "dw-panel p-3 space-y-2", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-md font-semibold", children: "Accessibility" }, void 0, false, {
      fileName: "/app/code/frontend/src/components/StyleControlPanel.jsx",
      lineNumber: 45,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex gap-2 items-center", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { className: "dw-btn px-3 py-1 rounded", onClick: () => setContrast(true), children: "High Contrast On" }, void 0, false, {
        fileName: "/app/code/frontend/src/components/StyleControlPanel.jsx",
        lineNumber: 47,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { className: "dw-btn px-3 py-1 rounded", onClick: () => setContrast(false), children: "High Contrast Off" }, void 0, false, {
        fileName: "/app/code/frontend/src/components/StyleControlPanel.jsx",
        lineNumber: 48,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/StyleControlPanel.jsx",
      lineNumber: 46,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex gap-2 items-center", children: Object.keys(presets).map((k) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { className: "dw-btn px-3 py-1 rounded", onClick: () => applyPalette(presets[k]), children: [
      k,
      " palette"
    ] }, k, true, {
      fileName: "/app/code/frontend/src/components/StyleControlPanel.jsx",
      lineNumber: 52,
      columnNumber: 11
    }, this)) }, void 0, false, {
      fileName: "/app/code/frontend/src/components/StyleControlPanel.jsx",
      lineNumber: 50,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/StyleControlPanel.jsx",
    lineNumber: 44,
    columnNumber: 5
  }, this);
}
function ThemePacks({ draft, setDraft }) {
  const packs = {
    Night: { "mode": "dark", "--accent": "#16E0FF", "--bg-panel": "rgba(10,14,20,.92)", "--text-strong": "#EAF7FB" },
    Daylight: { "mode": "light", "--accent": "#0F73FF", "--bg-panel": "rgba(246,248,250,.92)", "--text-strong": "#0b2230" },
    Champagne: { "mode": "light", "--accent": "#C5A572", "--bg-panel": "rgba(250,247,240,.92)", "--text-strong": "#2a251d" }
  };
  const apply = (k) => setDraft((d) => ({ ...d, ...packs[k] }));
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "dw-panel p-3 space-y-2", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-md font-semibold", children: "Theme Packs" }, void 0, false, {
      fileName: "/app/code/frontend/src/components/StyleControlPanel.jsx",
      lineNumber: 71,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex gap-2 flex-wrap", children: Object.keys(packs).map((k) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { className: "dw-btn px-3 py-1 rounded", onClick: () => apply(k), children: k }, k, false, {
      fileName: "/app/code/frontend/src/components/StyleControlPanel.jsx",
      lineNumber: 74,
      columnNumber: 11
    }, this)) }, void 0, false, {
      fileName: "/app/code/frontend/src/components/StyleControlPanel.jsx",
      lineNumber: 72,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/StyleControlPanel.jsx",
    lineNumber: 70,
    columnNumber: 5
  }, this);
}
function ExportImport({ draft, setDraft }) {
  const exportJson = () => {
    const blob = new Blob([JSON.stringify(draft, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "luccca-theme.json";
    a.click();
    URL.revokeObjectURL(a.href);
  };
  const importJson = (file) => {
    const r = new FileReader();
    r.onload = () => {
      try {
        const obj = JSON.parse(r.result);
        setDraft((d) => ({ ...d, ...obj }));
      } catch (e) {
        alert("Invalid theme JSON");
      }
    };
    r.readAsText(file);
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "dw-panel p-3 space-y-2", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-md font-semibold", children: "Export / Import" }, void 0, false, {
      fileName: "/app/code/frontend/src/components/StyleControlPanel.jsx",
      lineNumber: 97,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { className: "dw-btn px-3 py-1 rounded", onClick: exportJson, children: "Export JSON" }, void 0, false, {
        fileName: "/app/code/frontend/src/components/StyleControlPanel.jsx",
        lineNumber: 99,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "dw-btn px-3 py-1 rounded cursor-pointer", children: [
        "Import…",
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("input", { type: "file", accept: "application/json", className: "hidden", onChange: (e) => e.target.files?.[0] && importJson(e.target.files[0]) }, void 0, false, {
          fileName: "/app/code/frontend/src/components/StyleControlPanel.jsx",
          lineNumber: 101,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/StyleControlPanel.jsx",
        lineNumber: 100,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/StyleControlPanel.jsx",
      lineNumber: 98,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/StyleControlPanel.jsx",
    lineNumber: 96,
    columnNumber: 5
  }, this);
}
export {
  StyleControlPanel as default
};
