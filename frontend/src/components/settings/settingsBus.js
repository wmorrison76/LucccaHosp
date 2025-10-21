// Simple theme bus + helpers used by Appearance.jsx

const THEME_VARS_KEY  = "lu:theme:vars:v1";
const THEME_FLAGS_KEY = "lu:theme:flags:v1";
const THEME_PRESET_KEY = "lu:theme:preset:v1";

// lightweight emitter via window events
function emitApply({ vars = {}, flags = {}, preset } = {}) {
  window.dispatchEvent(new CustomEvent("lu:settings:apply", { detail: { vars, flags, preset } }));
}

// ---- storage helpers
function save(vars, flags, preset) {
  try {
    if (vars)  localStorage.setItem(THEME_VARS_KEY,  JSON.stringify(vars));
    if (flags) localStorage.setItem(THEME_FLAGS_KEY, JSON.stringify(flags));
    if (preset) localStorage.setItem(THEME_PRESET_KEY, preset);
  } catch {}
}

export function loadTheme() {
  try {
    const vars   = JSON.parse(localStorage.getItem(THEME_VARS_KEY)  || "{}");
    const flags  = JSON.parse(localStorage.getItem(THEME_FLAGS_KEY) || "{}");
    const preset = localStorage.getItem(THEME_PRESET_KEY) || null;
    return { vars, flags, preset };
  } catch {
    return { vars: {}, flags: {}, preset: null };
  }
}

// ---- DOM appliers
export function applyThemeVars(vars = {}) {
  const root = document.documentElement;
  for (const [k, v] of Object.entries(vars)) {
    if (k.startsWith("--")) root.style.setProperty(k, String(v));
  }
}
export function applyThemeFlags(flags = {}) {
  const root = document.documentElement;
  if ("dark" in flags) root.classList.toggle("dark", !!flags.dark);
  if ("highContrast" in flags) root.classList.toggle("hc", !!flags.highContrast);
  if ("colorblindSafe" in flags) root.classList.toggle("cb-safe", !!flags.colorblindSafe);
}

// ---- presets
const PRESETS = {
  light: {
    vars: {
      "--bg": "hsl(0 0% 100%)",
      "--text": "hsl(222 47% 11%)",
      "--panel": "hsl(0 0% 100% / 0.9)",
      "--panel-border-color": "hsl(214 32% 91%)",
      "--shadow": "0 30px 90px rgba(0,0,0,.18)",
    },
    flags: { dark: false }
  },
  nightfall: {
    vars: {
      "--bg": "hsl(222 47% 6%)",
      "--text": "hsl(210 40% 98%)",
      "--panel": "hsl(222 47% 8% / 0.9)",
      "--panel-border-color": "rgba(255,255,255,.12)",
      "--shadow": "0 30px 90px rgba(0,0,0,.55)",
    },
    flags: { dark: true }
  },
};

// called by Appearance.jsx
export function setPreset(name) {
  const def = PRESETS[name];
  if (!def) return;

  applyThemeVars(def.vars);
  applyThemeFlags(def.flags);
  save(def.vars, def.flags, name);

  emitApply({ vars: def.vars, flags: def.flags, preset: name });
}

// allow granular updates (sliders, color pickers)
export function setTheme(vars = {}, flags = {}) {
  if (vars && Object.keys(vars).length) applyThemeVars(vars);
  if (flags && Object.keys(flags).length) applyThemeFlags(flags);
  save(vars, flags, loadTheme().preset);
  emitApply({ vars, flags });
}
