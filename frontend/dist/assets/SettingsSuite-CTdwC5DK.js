import { r as reactExports, j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
import { g as getSelectedThemeId, a as getTweaks, l as listThemes, s as selectTheme, b as setTweaks, c as applyTheme, r as registerTheme } from "./theme-BuykcvzJ.js";
import { _ as __vite_glob_0_5, a as __vite_glob_0_3, b as __vite_glob_0_6, c as __vite_glob_0_7 } from "./Echo_R-DJeORrcm.js";
const EXTRA_THEMES = {
  aurora: {
    mode: "dark",
    "--bg": "#0b0f17",
    "--panel": "linear-gradient(180deg, rgba(25,35,55,.85), rgba(15,22,38,.92))",
    "--text": "rgba(235,245,255,.96)",
    "--muted": "rgba(215,230,255,.72)",
    "--accent": "#8be9fd",
    "--ring": "rgba(139,233,253,.45)",
    "--shadow": "0 40px 120px rgba(0,0,0,.55)",
    "--panel-border-color": "rgba(255,255,255,.15)",
    "--panel-border-width": "1px",
    "--base-size": "14px",
    "--title-size": "18px",
    "--sidebar-bg": "rgba(14,20,32,.96)",
    "--sidebar-text": "rgba(235,245,255,.94)",
    "--header-bg": "rgba(12,18,28,.96)",
    "--header-text": "rgba(240,246,255,.96)"
  },
  obsidian: {
    mode: "dark",
    "--bg": "#121212",
    "--panel": "rgba(28,28,28,.95)",
    "--text": "rgba(245,245,245,.95)",
    "--muted": "rgba(200,200,200,.70)",
    "--accent": "#bb86fc",
    "--ring": "rgba(187,134,252,.40)",
    "--shadow": "0 32px 100px rgba(0,0,0,.70)",
    "--panel-border-color": "rgba(255,255,255,.16)",
    "--panel-border-width": "1px",
    "--base-size": "14px",
    "--title-size": "18px",
    "--sidebar-bg": "rgba(20,20,20,.96)",
    "--sidebar-text": "rgba(245,245,245,.94)",
    "--header-bg": "rgba(20,20,20,.96)",
    "--header-text": "rgba(250,250,250,.96)"
  },
  horizon: {
    mode: "dark",
    "--bg": "#1c1e26",
    "--panel": "linear-gradient(180deg, rgba(35,39,55,.88), rgba(28,32,48,.95))",
    "--text": "#f5f5f5",
    "--muted": "rgba(240,240,240,.70)",
    "--accent": "#ff6e6e",
    "--ring": "rgba(255,110,110,.40)",
    "--shadow": "0 36px 110px rgba(0,0,0,.60)",
    "--panel-border-color": "rgba(255,255,255,.18)",
    "--panel-border-width": "1px",
    "--base-size": "14px",
    "--title-size": "18px",
    "--sidebar-bg": "rgba(22,25,36,.96)",
    "--sidebar-text": "rgba(245,245,245,.94)",
    "--header-bg": "rgba(22,25,36,.96)",
    "--header-text": "#f5f5f5"
  },
  glacier: {
    mode: "dark",
    "--bg": "#0e141b",
    "--panel": "linear-gradient(160deg, rgba(24,34,48,.92), rgba(16,24,36,.96))",
    "--text": "rgba(235,245,255,.96)",
    "--muted": "rgba(200,220,240,.70)",
    "--accent": "#4fd1c5",
    "--ring": "rgba(79,209,197,.40)",
    "--shadow": "0 30px 90px rgba(0,0,0,.55)",
    "--panel-border-color": "rgba(255,255,255,.16)",
    "--panel-border-width": "1px",
    "--base-size": "14px",
    "--title-size": "18px",
    "--sidebar-bg": "rgba(14,20,30,.96)",
    "--sidebar-text": "rgba(235,245,255,.94)",
    "--header-bg": "rgba(14,20,30,.96)",
    "--header-text": "rgba(240,246,255,.96)"
  },
  midnightGold: {
    mode: "dark",
    "--bg": "#101010",
    "--panel": "rgba(22,22,22,.94)",
    "--text": "rgba(250,250,250,.94)",
    "--muted": "rgba(230,230,230,.70)",
    "--accent": "#fcbf49",
    "--ring": "rgba(252,191,73,.42)",
    "--shadow": "0 40px 120px rgba(0,0,0,.70)",
    "--panel-border-color": "rgba(252,191,73,.34)",
    "--panel-border-width": "2px",
    "--base-size": "14px",
    "--title-size": "18px",
    "--sidebar-bg": "rgba(16,16,16,.96)",
    "--sidebar-text": "rgba(250,250,250,.94)",
    "--header-bg": "rgba(16,16,16,.96)",
    "--header-text": "rgba(255,255,255,.96)"
  }
};
Object.entries(EXTRA_THEMES).forEach(([id, vars]) => registerTheme(id, vars));
const SECTIONS = [
  { id: "general", icon: "⚙️", label: "General" },
  { id: "appearance", icon: "🎨", label: "Appearance" },
  { id: "notifications", icon: "🔔", label: "Notifications" },
  { id: "accounts", icon: "👤", label: "Accounts" },
  { id: "advanced", icon: "🧪", label: "Advanced" },
  { id: "zaro", icon: "🛡️", label: "Super Admin (ZARO)" }
];
const PRESET_AVATARS = [
  { id: "echo-f", url: __vite_glob_0_5 },
  { id: "echo-b", url: __vite_glob_0_3 },
  { id: "echo-m", url: __vite_glob_0_6 },
  { id: "echo-r", url: __vite_glob_0_7 }
];
const labelFromId = (id) => ({
  nightfall: "Nightfall",
  glasslight: "Glasslight",
  neonwave: "Neonwave",
  highContrast: "High contrast",
  colorblindSafe: "Colorblind safe",
  aurora: "Aurora",
  obsidian: "Obsidian",
  horizon: "Horizon",
  glacier: "Glacier",
  midnightGold: "Midnight Gold"
})[id] || id.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
function SectionCard({ title, children }) {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "mb-6", children: [
    title && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-xs font-semibold uppercase tracking-wider opacity-60 px-4 py-2 mb-2", children: title }, void 0, false, {
      fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
      lineNumber: 154,
      columnNumber: 17
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "rounded-xl overflow-hidden bg-white/[0.05] border border-white/10 divide-y divide-white/10", children }, void 0, false, {
      fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
      lineNumber: 155,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
    lineNumber: 153,
    columnNumber: 5
  }, this);
}
function SettingRow({ label, description, children, divider = true }) {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: `px-4 py-3 flex items-center justify-between gap-4 ${!divider ? "border-b border-white/10" : ""}`, children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex-1", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-sm font-medium", children: label }, void 0, false, {
        fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
        lineNumber: 166,
        columnNumber: 9
      }, this),
      description && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-xs opacity-60 mt-0.5", children: description }, void 0, false, {
        fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
        lineNumber: 167,
        columnNumber: 25
      }, this)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
      lineNumber: 165,
      columnNumber: 7
    }, this),
    children && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex-shrink-0", children }, void 0, false, {
      fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
      lineNumber: 169,
      columnNumber: 20
    }, this)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
    lineNumber: 164,
    columnNumber: 5
  }, this);
}
function Toggle({ checked, onChange }) {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "button",
    {
      onClick: () => onChange(!checked),
      className: `w-12 h-7 rounded-full transition-colors ${checked ? "bg-green-500" : "bg-white/20"}`,
      style: {
        position: "relative"
      },
      children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "div",
        {
          className: `w-6 h-6 rounded-full bg-white shadow-md transition-transform absolute top-0.5 ${checked ? "translate-x-6" : "translate-x-0.5"}`
        },
        void 0,
        false,
        {
          fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
          lineNumber: 185,
          columnNumber: 7
        },
        this
      )
    },
    void 0,
    false,
    {
      fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
      lineNumber: 176,
      columnNumber: 5
    },
    this
  );
}
function LabeledInput({ label, value, onChange, placeholder }) {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "text-sm grid gap-2", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "opacity-80 font-medium", children: label }, void 0, false, {
      fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
      lineNumber: 197,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "input",
      {
        className: "h-10 px-3 rounded-lg bg-white/5 border border-white/12 focus:outline-none focus:border-cyan-300/60 text-sm",
        value,
        onChange: (e) => onChange(e.target.value),
        placeholder
      },
      void 0,
      false,
      {
        fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
        lineNumber: 198,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
    lineNumber: 196,
    columnNumber: 5
  }, this);
}
function SettingsSuite() {
  const [section, setSection] = reactExports.useState("appearance");
  const [themeId, setThemeId] = reactExports.useState(() => getSelectedThemeId?.() || "nightfall");
  const [tweaks, setTweaksState] = reactExports.useState(() => getTweaks() || {});
  const [avatar, setAvatar] = reactExports.useState(() => {
    try {
      return JSON.parse(localStorage.getItem("lu:avatar") || "null") || PRESET_AVATARS[0];
    } catch {
      return PRESET_AVATARS[0];
    }
  });
  const [avatarPickerOpen, setAvatarPickerOpen] = reactExports.useState(false);
  const [zaroUrl, setZaroUrl] = reactExports.useState(() => localStorage.getItem("lu:zaro:url") || "/admin/zaro");
  const themeIds = reactExports.useMemo(() => listThemes(), []);
  reactExports.useEffect(() => {
    selectTheme(themeId);
  }, [themeId]);
  reactExports.useEffect(() => {
    setTweaks(tweaks);
  }, [tweaks]);
  reactExports.useEffect(() => {
    window.dispatchEvent(new CustomEvent("lu:settings:apply", { detail: { vars: tweaks, avatar } }));
  }, [tweaks, avatar]);
  const onUpload = (file) => {
    if (!file) return;
    const r = new FileReader();
    r.onload = () => {
      const custom = { id: "custom", url: r.result };
      setAvatar(custom);
      localStorage.setItem("lu:avatar", JSON.stringify(custom));
      setAvatarPickerOpen(false);
    };
    r.readAsDataURL(file);
  };
  const usePresetAvatar = (a) => {
    setAvatar(a);
    localStorage.setItem("lu:avatar", JSON.stringify(a));
    setAvatarPickerOpen(false);
  };
  const setTweakVar = (name, value) => setTweaksState((prev) => ({ ...prev, [name]: value }));
  const saveZaroUrl = () => localStorage.setItem("lu:zaro:url", zaroUrl || "/admin/zaro");
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "h-full w-full flex flex-col bg-gradient-to-b from-white/[0.03] to-white/0", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "border-b border-white/10 px-6 py-4", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-2xl font-semibold", children: "Settings" }, void 0, false, {
        fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
        lineNumber: 254,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-sm opacity-60 mt-1", children: "Customize your experience" }, void 0, false, {
        fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
        lineNumber: 255,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
      lineNumber: 253,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("nav", { className: "border-b border-white/10 px-6 flex gap-8 overflow-x-auto scrollbar-hide", children: SECTIONS.map((s) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "button",
      {
        onClick: () => setSection(s.id),
        className: `py-4 text-sm font-medium whitespace-nowrap transition-colors ${section === s.id ? "text-white border-b-2 border-cyan-400" : "opacity-60 hover:opacity-80 border-b-2 border-transparent"}`,
        children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "mr-2", children: s.icon }, void 0, false, {
            fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
            lineNumber: 270,
            columnNumber: 13
          }, this),
          s.label
        ]
      },
      s.id,
      true,
      {
        fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
        lineNumber: 261,
        columnNumber: 11
      },
      this
    )) }, void 0, false, {
      fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
      lineNumber: 259,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("main", { className: "flex-1 overflow-y-auto p-6 max-w-4xl mx-auto w-full", children: [
      section === "general" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SectionCard, { title: "Profile", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SettingRow, { label: "Avatar", description: "Choose or upload your profile picture", divider: false, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("img", { src: avatar?.url, alt: "", className: "h-12 w-12 rounded-full object-cover ring-1 ring-white/20" }, void 0, false, {
          fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
          lineNumber: 283,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "button",
          {
            className: "px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-sm font-medium transition-colors",
            onClick: () => setAvatarPickerOpen(true),
            children: "Change"
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
            lineNumber: 284,
            columnNumber: 19
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
        lineNumber: 282,
        columnNumber: 17
      }, this) }, void 0, false, {
        fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
        lineNumber: 281,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
        lineNumber: 280,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
        lineNumber: 279,
        columnNumber: 11
      }, this),
      section === "appearance" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SectionCard, { title: "Theme", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-4", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-3 gap-3", children: themeIds.map((id) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "button",
            {
              onClick: () => setThemeId(id),
              className: `p-3 rounded-xl transition-all text-center text-sm font-medium ${themeId === id ? "bg-cyan-500/20 ring-2 ring-cyan-400/60" : "bg-white/5 hover:bg-white/10 border border-white/10"}`,
              children: labelFromId(id)
            },
            id,
            false,
            {
              fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
              lineNumber: 300,
              columnNumber: 21
            },
            this
          )) }, void 0, false, {
            fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
            lineNumber: 298,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs opacity-60 mt-4", children: "Themes are starting points; customize below for fine-tuning." }, void 0, false, {
            fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
            lineNumber: 313,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
          lineNumber: 297,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
          lineNumber: 296,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SectionCard, { title: "Customization", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-4 grid gap-4", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(LabeledInput, { label: "Base font size", value: tweaks["--base-size"] ?? "", onChange: (v) => setTweakVar("--base-size", v), placeholder: "14px" }, void 0, false, {
            fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
            lineNumber: 321,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(LabeledInput, { label: "Title font size", value: tweaks["--title-size"] ?? "", onChange: (v) => setTweakVar("--title-size", v), placeholder: "18px" }, void 0, false, {
            fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
            lineNumber: 322,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(LabeledInput, { label: "Panel border width", value: tweaks["--panel-border-width"] ?? "", onChange: (v) => setTweakVar("--panel-border-width", v), placeholder: "1px" }, void 0, false, {
            fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
            lineNumber: 323,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(LabeledInput, { label: "Panel border color", value: tweaks["--panel-border-color"] ?? "", onChange: (v) => setTweakVar("--panel-border-color", v), placeholder: "rgba(...)" }, void 0, false, {
            fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
            lineNumber: 324,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(LabeledInput, { label: "Shadow depth", value: tweaks["--shadow"] ?? "", onChange: (v) => setTweakVar("--shadow", v), placeholder: "0 0 24px rgba(...)" }, void 0, false, {
            fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
            lineNumber: 325,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "button",
            {
              className: "mt-4 w-full px-4 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm font-medium transition-colors",
              onClick: () => {
                setTweaksState({});
                setTweaks({});
                applyTheme(themeId);
              },
              children: "Reset all customizations"
            },
            void 0,
            false,
            {
              fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
              lineNumber: 326,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
          lineNumber: 320,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
          lineNumber: 319,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
        lineNumber: 295,
        columnNumber: 11
      }, this),
      section === "notifications" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SectionCard, { title: "Notification Settings", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SettingRow, { label: "Enable Notifications", description: "Receive alerts for important events", divider: false, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Toggle, { checked: true, onChange: () => {
        } }, void 0, false, {
          fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
          lineNumber: 339,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
          lineNumber: 338,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
          lineNumber: 337,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SectionCard, { title: "Sound", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SettingRow, { label: "Toast Sounds", description: "Play sound for notifications", divider: true, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Toggle, { checked: true, onChange: () => {
          } }, void 0, false, {
            fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
            lineNumber: 344,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
            lineNumber: 343,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SettingRow, { label: "Do Not Disturb", description: "Mute all notifications", divider: false, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Toggle, { checked: false, onChange: () => {
          } }, void 0, false, {
            fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
            lineNumber: 347,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
            lineNumber: 346,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
          lineNumber: 342,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-xs opacity-60 px-4 py-2", children: "Message previews and DND schedule coming soon." }, void 0, false, {
          fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
          lineNumber: 350,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
        lineNumber: 336,
        columnNumber: 11
      }, this),
      section === "accounts" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SectionCard, { title: "Sign-In Methods", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-4 text-sm opacity-80", children: "Connected services and authentication methods will appear here." }, void 0, false, {
        fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
        lineNumber: 359,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
        lineNumber: 358,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
        lineNumber: 357,
        columnNumber: 11
      }, this),
      section === "advanced" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SectionCard, { title: "Developer Options", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SettingRow, { label: "Developer Mode", description: "Enable advanced debugging tools", divider: true, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Toggle, { checked: false, onChange: () => {
          } }, void 0, false, {
            fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
            lineNumber: 370,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
            lineNumber: 369,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SettingRow, { label: "Beta Features", description: "Try experimental features", divider: true, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Toggle, { checked: false, onChange: () => {
          } }, void 0, false, {
            fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
            lineNumber: 373,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
            lineNumber: 372,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SettingRow, { label: "Debug Logging", description: "Log internal events to console", divider: false, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Toggle, { checked: false, onChange: () => {
          } }, void 0, false, {
            fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
            lineNumber: 376,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
            lineNumber: 375,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
          lineNumber: 368,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SectionCard, { title: "Performance", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SettingRow, { label: "Analytics", description: "Help improve the app", divider: false, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Toggle, { checked: true, onChange: () => {
        } }, void 0, false, {
          fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
          lineNumber: 381,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
          lineNumber: 380,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
          lineNumber: 379,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
        lineNumber: 367,
        columnNumber: 11
      }, this),
      section === "zaro" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SectionCard, { title: "Super Admin Portal", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-4 grid gap-4", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm opacity-80 mb-3", children: "Access the ZARO console to manage organization-wide settings and elevated administrative tasks." }, void 0, false, {
          fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
          lineNumber: 392,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
          lineNumber: 391,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          LabeledInput,
          {
            label: "ZARO Portal URL",
            value: zaroUrl,
            onChange: setZaroUrl,
            placeholder: "/admin/zaro or https://admin.example.com/zaro"
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
            lineNumber: 396,
            columnNumber: 17
          },
          this
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { className: "flex-1 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-sm font-medium transition-colors", onClick: saveZaroUrl, children: "Save URL" }, void 0, false, {
            fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
            lineNumber: 403,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: zaroUrl || "/admin/zaro", className: "flex-1 px-4 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-sm font-medium transition-colors text-center", children: "Open Portal" }, void 0, false, {
            fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
            lineNumber: 406,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
          lineNumber: 402,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
        lineNumber: 390,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
        lineNumber: 389,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
        lineNumber: 388,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
      lineNumber: 277,
      columnNumber: 7
    }, this),
    avatarPickerOpen && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "fixed inset-0 bg-black/40 backdrop-blur-md grid place-items-center z-50", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-[520px] max-w-[92vw] rounded-2xl border border-white/15 bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-6 shadow-2xl", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-6", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-xl font-semibold mb-1", children: "Choose Avatar" }, void 0, false, {
          fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
          lineNumber: 421,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-sm opacity-60", children: "Select a profile picture or upload your own" }, void 0, false, {
          fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
          lineNumber: 422,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
        lineNumber: 420,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-4 gap-4 mb-6", children: [
        PRESET_AVATARS.map((a) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "button",
          {
            onClick: () => usePresetAvatar(a),
            className: `relative rounded-2xl overflow-hidden ring-2 transition-all ${avatar?.url === a.url ? "ring-cyan-400/80 scale-105" : "ring-white/20 hover:ring-white/40 hover:scale-103"}`,
            children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("img", { src: a.url, alt: "", className: "h-24 w-full object-cover" }, void 0, false, {
              fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
              lineNumber: 436,
              columnNumber: 19
            }, this)
          },
          a.id,
          false,
          {
            fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
            lineNumber: 427,
            columnNumber: 17
          },
          this
        )),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "relative rounded-2xl border-2 border-dashed border-white/30 hover:border-white/50 grid place-items-center cursor-pointer transition-colors bg-white/5 hover:bg-white/10", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-2xl mb-1", children: "+" }, void 0, false, {
              fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
              lineNumber: 441,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-xs font-medium", children: "Upload" }, void 0, false, {
              fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
              lineNumber: 442,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
            lineNumber: 440,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("input", { type: "file", accept: "image/*", className: "hidden", onChange: (e) => onUpload(e.target.files?.[0]) }, void 0, false, {
            fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
            lineNumber: 444,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
          lineNumber: 439,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
        lineNumber: 425,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "button",
          {
            className: "flex-1 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-sm font-medium transition-colors",
            onClick: () => setAvatarPickerOpen(false),
            children: "Cancel"
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
            lineNumber: 449,
            columnNumber: 15
          },
          this
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "button",
          {
            className: "flex-1 px-4 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-sm font-medium transition-colors",
            onClick: () => setAvatarPickerOpen(false),
            children: "Done"
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
            lineNumber: 453,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
        lineNumber: 448,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
      lineNumber: 419,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
      lineNumber: 418,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/settings/SettingsSuite.jsx",
    lineNumber: 251,
    columnNumber: 5
  }, this);
}
export {
  SettingsSuite as default
};
