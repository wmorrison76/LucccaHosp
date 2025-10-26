const THEME_KEY = "lu:theme:selected:v1";
const TWEAKS_KEY = "lu:theme:tweaks:v1";
const THEMES = {
  nightfall: {
    mode: "dark",
    "--bg": "#0d1117",
    "--panel": "linear-gradient(180deg, rgba(18,26,40,.92), rgba(12,18,28,.96))",
    "--text": "rgba(231,241,255,.94)",
    "--muted": "rgba(190,210,230,.70)",
    "--accent": "#46e6ff",
    "--ring": "rgba(22,224,255,.45)",
    "--shadow": "0 30px 90px rgba(0,0,0,.65)",
    "--panel-border-color": "rgba(255,255,255,.14)",
    "--panel-border-width": "1px",
    "--base-size": "14px",
    "--title-size": "18px",
    "--sidebar-bg": "rgba(15,20,30,.96)",
    "--sidebar-text": "rgba(230,240,250,.92)",
    "--header-bg": "rgba(12,18,28,.96)",
    "--header-text": "rgba(240,245,255,.96)"
  },
  glasslight: {
    mode: "light",
    "--bg": "#eef2f8",
    "--panel": "rgba(255,255,255,.86)",
    "--text": "#0a1320",
    "--muted": "rgba(0,0,0,.60)",
    "--accent": "#0ea5e9",
    "--ring": "rgba(14,165,233,.35)",
    "--shadow": "0 24px 80px rgba(0,0,0,.12)",
    "--panel-border-color": "rgba(0,0,0,.10)",
    "--panel-border-width": "1px",
    "--base-size": "14px",
    "--title-size": "18px",
    "--sidebar-bg": "rgba(255,255,255,.82)",
    "--sidebar-text": "rgba(10,19,32,.92)",
    "--header-bg": "rgba(255,255,255,.86)",
    "--header-text": "#0a1320"
  },
  neonwave: {
    mode: "dark",
    "--bg": "#0a0f18",
    "--panel": "radial-gradient(1200px 300px at 10% -10%, rgba(0,255,200,.08), transparent 60%), rgba(16,22,34,.94)",
    "--text": "rgba(230,244,255,.96)",
    "--muted": "rgba(210,240,255,.70)",
    "--accent": "#00ffd1",
    "--ring": "rgba(0,255,209,.40)",
    "--shadow": "0 36px 110px rgba(0,0,0,.55)",
    "--panel-border-color": "rgba(0,255,209,.22)",
    "--panel-border-width": "1px",
    "--base-size": "14px",
    "--title-size": "18px",
    "--sidebar-bg": "rgba(10,14,24,.96)",
    "--sidebar-text": "rgba(230,244,255,.93)",
    "--header-bg": "rgba(12,16,26,.96)",
    "--header-text": "rgba(235,245,255,.96)"
  },
  highContrast: {
    mode: "dark",
    "--bg": "#0a0a0a",
    "--panel": "rgba(18,18,18,.96)",
    "--text": "#ffffff",
    "--muted": "rgba(255,255,255,.78)",
    "--accent": "#ffd12a",
    "--ring": "rgba(255,209,42,.55)",
    "--shadow": "0 40px 120px rgba(0,0,0,.75)",
    "--panel-border-color": "rgba(255,255,255,.36)",
    "--panel-border-width": "2px",
    "--base-size": "14px",
    "--title-size": "18px",
    "--sidebar-bg": "rgba(12,12,12,.98)",
    "--sidebar-text": "rgba(255,255,255,.92)",
    "--header-bg": "rgba(12,12,12,.98)",
    "--header-text": "#ffffff"
  },
  colorblindSafe: {
    mode: "dark",
    "--bg": "#0c121b",
    "--panel": "rgba(18,24,36,.94)",
    "--text": "rgba(235,243,255,.96)",
    "--muted": "rgba(235,243,255,.72)",
    "--accent": "#ff9d3b",
    "--ring": "rgba(255,157,59,.42)",
    "--shadow": "0 36px 110px rgba(0,0,0,.55)",
    "--panel-border-color": "rgba(255,255,255,.18)",
    "--panel-border-width": "1px",
    "--base-size": "14px",
    "--title-size": "18px",
    "--sidebar-bg": "rgba(15,21,32,.96)",
    "--sidebar-text": "rgba(235,243,255,.94)",
    "--header-bg": "rgba(14,20,31,.96)",
    "--header-text": "rgba(240,246,255,.96)"
  }
};
function getSelectedThemeId() {
  try {
    return localStorage.getItem(THEME_KEY) || "nightfall";
  } catch {
  }
  return "nightfall";
}
function getTweaks() {
  try {
    return JSON.parse(localStorage.getItem(TWEAKS_KEY) || "{}");
  } catch {
    return {};
  }
}
function registerTheme(id, vars) {
  THEMES[id] = { ...THEMES[id] || {}, ...vars || {} };
}
function listThemes() {
  return Object.keys(THEMES);
}
function selectTheme(id) {
  try {
    localStorage.setItem(THEME_KEY, id);
  } catch {
  }
  applyTheme(id);
}
function setTweaks(partial) {
  const merged = { ...getTweaks(), ...partial || {} };
  try {
    localStorage.setItem(TWEAKS_KEY, JSON.stringify(merged));
  } catch {
  }
  applyTheme(getSelectedThemeId());
}
function applyTheme(themeOrId) {
  const id = typeof themeOrId === "string" ? themeOrId : getSelectedThemeId();
  const themeVars = typeof themeOrId === "string" ? THEMES[id] || THEMES.nightfall : themeOrId;
  const tweaks = getTweaks();
  const root = document.documentElement;
  const finalVars = { ...themeVars, ...tweaks };
  const isLight = finalVars.mode === "light";
  root.classList.toggle("dark", !isLight);
  root.classList.toggle("light", isLight);
  root.dataset.theme = id;
  root.style.setProperty("color-scheme", isLight ? "light" : "dark");
  Object.entries(finalVars).forEach(([k, v]) => {
    if (k.startsWith("--")) root.style.setProperty(k, String(v));
  });
  document.body.style.background = "var(--bg)";
  document.body.style.color = "var(--text)";
  document.body.style.setProperty("--sidebar-bg", finalVars["--sidebar-bg"] || (isLight ? "rgba(255,255,255,.86)" : "rgba(15,20,30,.96)"));
  document.body.style.setProperty("--sidebar-text", finalVars["--sidebar-text"] || (isLight ? "#0a1320" : "rgba(235,245,255,.94)"));
  document.body.style.setProperty("--header-bg", finalVars["--header-bg"] || (isLight ? "rgba(255,255,255,.86)" : "rgba(12,18,28,.96)"));
  document.body.style.setProperty("--header-text", finalVars["--header-text"] || (isLight ? "#0a1320" : "rgba(240,245,255,.96)"));
  root.style.setProperty("--panel-border", `var(--panel-border-width) var(--panel-border-color)`);
  window.dispatchEvent(new CustomEvent("theme-applied", { detail: { id, vars: finalVars } }));
}
function setupThemeBoot() {
  applyTheme(getSelectedThemeId());
}
export {
  getTweaks as a,
  setTweaks as b,
  applyTheme as c,
  setupThemeBoot as d,
  getSelectedThemeId as g,
  listThemes as l,
  registerTheme as r,
  selectTheme as s
};
