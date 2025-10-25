// src/settings/SettingsSuite.jsx
import React, { useEffect, useMemo, useState } from "react";

// central theme engine (relative path confirmed)
import {
  registerTheme,
  listThemes,
  selectTheme,
  setTweaks,
  getTweaks,
  getSelectedThemeId,
  applyTheme,
} from "../lib/theme";

// Avatar presets (your working paths)
import EchoF from "../assets/Echo_F.png";
import EchoB from "../assets/Echo_B.png";
import EchoM from "../assets/Echo_M.png";
import EchoR from "../assets/Echo_R.png";

/* ----------------------------------------------------------------------------
   Register extra pro themes with full chrome variables
----------------------------------------------------------------------------- */
const EXTRA_THEMES = {
  aurora: {
    mode: "dark",
    "--bg":"#0b0f17",
    "--panel":"linear-gradient(180deg, rgba(25,35,55,.85), rgba(15,22,38,.92))",
    "--text":"rgba(235,245,255,.96)",
    "--muted":"rgba(215,230,255,.72)",
    "--accent":"#8be9fd",
    "--ring":"rgba(139,233,253,.45)",
    "--shadow":"0 40px 120px rgba(0,0,0,.55)",
    "--panel-border-color":"rgba(255,255,255,.15)",
    "--panel-border-width":"1px",
    "--base-size":"14px",
    "--title-size":"18px",
    "--sidebar-bg":"rgba(14,20,32,.96)",
    "--sidebar-text":"rgba(235,245,255,.94)",
    "--header-bg":"rgba(12,18,28,.96)",
    "--header-text":"rgba(240,246,255,.96)",
  },
  obsidian: {
    mode: "dark",
    "--bg":"#121212",
    "--panel":"rgba(28,28,28,.95)",
    "--text":"rgba(245,245,245,.95)",
    "--muted":"rgba(200,200,200,.70)",
    "--accent":"#bb86fc",
    "--ring":"rgba(187,134,252,.40)",
    "--shadow":"0 32px 100px rgba(0,0,0,.70)",
    "--panel-border-color":"rgba(255,255,255,.16)",
    "--panel-border-width":"1px",
    "--base-size":"14px",
    "--title-size":"18px",
    "--sidebar-bg":"rgba(20,20,20,.96)",
    "--sidebar-text":"rgba(245,245,245,.94)",
    "--header-bg":"rgba(20,20,20,.96)",
    "--header-text":"rgba(250,250,250,.96)",
  },
  horizon: {
    mode: "dark",
    "--bg":"#1c1e26",
    "--panel":"linear-gradient(180deg, rgba(35,39,55,.88), rgba(28,32,48,.95))",
    "--text":"#f5f5f5",
    "--muted":"rgba(240,240,240,.70)",
    "--accent":"#ff6e6e",
    "--ring":"rgba(255,110,110,.40)",
    "--shadow":"0 36px 110px rgba(0,0,0,.60)",
    "--panel-border-color":"rgba(255,255,255,.18)",
    "--panel-border-width":"1px",
    "--base-size":"14px",
    "--title-size":"18px",
    "--sidebar-bg":"rgba(22,25,36,.96)",
    "--sidebar-text":"rgba(245,245,245,.94)",
    "--header-bg":"rgba(22,25,36,.96)",
    "--header-text":"#f5f5f5",
  },
  glacier: {
    mode: "dark",
    "--bg":"#0e141b",
    "--panel":"linear-gradient(160deg, rgba(24,34,48,.92), rgba(16,24,36,.96))",
    "--text":"rgba(235,245,255,.96)",
    "--muted":"rgba(200,220,240,.70)",
    "--accent":"#4fd1c5",
    "--ring":"rgba(79,209,197,.40)",
    "--shadow":"0 30px 90px rgba(0,0,0,.55)",
    "--panel-border-color":"rgba(255,255,255,.16)",
    "--panel-border-width":"1px",
    "--base-size":"14px",
    "--title-size":"18px",
    "--sidebar-bg":"rgba(14,20,30,.96)",
    "--sidebar-text":"rgba(235,245,255,.94)",
    "--header-bg":"rgba(14,20,30,.96)",
    "--header-text":"rgba(240,246,255,.96)",
  },
  midnightGold: {
    mode: "dark",
    "--bg":"#101010",
    "--panel":"rgba(22,22,22,.94)",
    "--text":"rgba(250,250,250,.94)",
    "--muted":"rgba(230,230,230,.70)",
    "--accent":"#fcbf49",
    "--ring":"rgba(252,191,73,.42)",
    "--shadow":"0 40px 120px rgba(0,0,0,.70)",
    "--panel-border-color":"rgba(252,191,73,.34)",
    "--panel-border-width":"2px",
    "--base-size":"14px",
    "--title-size":"18px",
    "--sidebar-bg":"rgba(16,16,16,.96)",
    "--sidebar-text":"rgba(250,250,250,.94)",
    "--header-bg":"rgba(16,16,16,.96)",
    "--header-text":"rgba(255,255,255,.96)",
  },
};
Object.entries(EXTRA_THEMES).forEach(([id, vars]) => registerTheme(id, vars));

/* ----------------------------------------------------------------------------
   UI chrome
----------------------------------------------------------------------------- */
const SECTIONS = [
  { id: "general",      icon: "⚙️", label: "General" },
  { id: "appearance",   icon: "🎨", label: "Appearance" },
  { id: "notifications",icon: "🔔", label: "Notifications" },
  { id: "accounts",     icon: "👤", label: "Accounts" },
  { id: "advanced",     icon: "🧪", label: "Advanced" },
  { id: "zaro",         icon: "🛡️", label: "Super Admin (ZARO)" },
];

const PRESET_AVATARS = [
  { id: "echo-f", url: EchoF },
  { id: "echo-b", url: EchoB },
  { id: "echo-m", url: EchoM },
  { id: "echo-r", url: EchoR },
];

const labelFromId = (id) =>
  ({
    nightfall: "Nightfall",
    glasslight: "Glasslight",
    neonwave: "Neonwave",
    highContrast: "High contrast",
    colorblindSafe: "Colorblind safe",
    aurora: "Aurora",
    obsidian: "Obsidian",
    horizon: "Horizon",
    glacier: "Glacier",
    midnightGold: "Midnight Gold",
  }[id] || id.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()));

function SectionCard({ title, children }) {
  return (
    <section className="mb-6">
      {title && <div className="text-xs font-semibold uppercase tracking-wider opacity-60 px-4 py-2 mb-2">{title}</div>}
      <div className="rounded-xl overflow-hidden bg-white/[0.05] border border-white/10 divide-y divide-white/10">
        {children}
      </div>
    </section>
  );
}

function SettingRow({ label, description, children, divider = true }) {
  return (
    <div className={`px-4 py-3 flex items-center justify-between gap-4 ${!divider ? 'border-b border-white/10' : ''}`}>
      <div className="flex-1">
        <div className="text-sm font-medium">{label}</div>
        {description && <div className="text-xs opacity-60 mt-0.5">{description}</div>}
      </div>
      {children && <div className="flex-shrink-0">{children}</div>}
    </div>
  );
}

function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`w-12 h-7 rounded-full transition-colors ${
        checked ? 'bg-green-500' : 'bg-white/20'
      }`}
      style={{
        position: 'relative',
      }}
    >
      <div
        className={`w-6 h-6 rounded-full bg-white shadow-md transition-transform absolute top-0.5 ${
          checked ? 'translate-x-6' : 'translate-x-0.5'
        }`}
      />
    </button>
  );
}

function LabeledInput({ label, value, onChange, placeholder }) {
  return (
    <label className="text-sm grid gap-2">
      <span className="opacity-80 font-medium">{label}</span>
      <input
        className="h-10 px-3 rounded-lg bg-white/5 border border-white/12 focus:outline-none focus:border-cyan-300/60 text-sm"
        value={value}
        onChange={(e)=>onChange(e.target.value)}
        placeholder={placeholder}
      />
    </label>
  );
}

export default function SettingsSuite() {
  const [section, setSection] = useState("appearance");

  const [themeId, setThemeId] = useState(() => getSelectedThemeId?.() || "nightfall");
  const [tweaks, setTweaksState] = useState(() => getTweaks() || {});
  const [avatar, setAvatar] = useState(() => {
    try { return JSON.parse(localStorage.getItem("lu:avatar") || "null") || PRESET_AVATARS[0]; }
    catch { return PRESET_AVATARS[0]; }
  });
  const [avatarPickerOpen, setAvatarPickerOpen] = useState(false);
  const [zaroUrl, setZaroUrl] = useState(() => localStorage.getItem("lu:zaro:url") || "/admin/zaro");

  const themeIds = useMemo(() => listThemes(), []);

  useEffect(() => { selectTheme(themeId); }, [themeId]);
  useEffect(() => { setTweaks(tweaks); }, [tweaks]);
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("lu:settings:apply", { detail: { vars: tweaks, avatar } }));
  }, [tweaks, avatar]);

  // avatar ops
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

  const setTweakVar = (name, value) => setTweaksState(prev => ({ ...prev, [name]: value }));

  const saveZaroUrl = () => localStorage.setItem("lu:zaro:url", zaroUrl || "/admin/zaro");

  return (
    <div className="h-full w-full flex flex-col bg-gradient-to-b from-white/[0.03] to-white/0">
      {/* Top Navigation */}
      <div className="border-b border-white/10 px-6 py-4">
        <div className="text-2xl font-semibold">Settings</div>
        <div className="text-sm opacity-60 mt-1">Customize your experience</div>
      </div>

      {/* Section Tabs */}
      <nav className="border-b border-white/10 px-6 flex gap-8 overflow-x-auto scrollbar-hide">
        {SECTIONS.map(s => (
          <button
            key={s.id}
            onClick={() => setSection(s.id)}
            className={`py-4 text-sm font-medium whitespace-nowrap transition-colors ${
              section===s.id
                ? "text-white border-b-2 border-cyan-400"
                : "opacity-60 hover:opacity-80 border-b-2 border-transparent"
            }`}
          >
            <span className="mr-2">{s.icon}</span>
            {s.label}
          </button>
        ))}
      </nav>

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-6 max-w-4xl mx-auto w-full">
        {section === "general" && (
          <>
            <SectionCard title="Profile">
              <SettingRow label="Avatar" description="Choose or upload your profile picture" divider={false}>
                <div className="flex items-center gap-3">
                  <img src={avatar?.url} alt="" className="h-12 w-12 rounded-full object-cover ring-1 ring-white/20"/>
                  <button className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-sm font-medium transition-colors"
                          onClick={() => setAvatarPickerOpen(true)}>
                    Change
                  </button>
                </div>
              </SettingRow>
            </SectionCard>
          </>
        )}

        {section === "appearance" && (
          <>
            <SectionCard title="Theme">
              <div className="p-4">
                <div className="grid grid-cols-3 gap-3">
                  {themeIds.map(id => (
                    <button
                      key={id}
                      onClick={() => setThemeId(id)}
                      className={`p-3 rounded-xl transition-all text-center text-sm font-medium ${
                        themeId===id
                          ? "bg-cyan-500/20 ring-2 ring-cyan-400/60"
                          : "bg-white/5 hover:bg-white/10 border border-white/10"
                      }`}
                    >
                      {labelFromId(id)}
                    </button>
                  ))}
                </div>
                <p className="text-xs opacity-60 mt-4">
                  Themes are starting points; customize below for fine-tuning.
                </p>
              </div>
            </SectionCard>

            <SectionCard title="Customization">
              <div className="p-4 grid gap-4">
                <LabeledInput label="Base font size" value={tweaks["--base-size"] ?? ""} onChange={v=>setTweakVar("--base-size", v)} placeholder="14px"/>
                <LabeledInput label="Title font size" value={tweaks["--title-size"] ?? ""} onChange={v=>setTweakVar("--title-size", v)} placeholder="18px"/>
                <LabeledInput label="Panel border width" value={tweaks["--panel-border-width"] ?? ""} onChange={v=>setTweakVar("--panel-border-width", v)} placeholder="1px"/>
                <LabeledInput label="Panel border color" value={tweaks["--panel-border-color"] ?? ""} onChange={v=>setTweakVar("--panel-border-color", v)} placeholder="rgba(...)"/>
                <LabeledInput label="Shadow depth" value={tweaks["--shadow"] ?? ""} onChange={v=>setTweakVar("--shadow", v)} placeholder="0 0 24px rgba(...)"/>
                <button className="mt-4 w-full px-4 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm font-medium transition-colors"
                        onClick={() => { setTweaksState({}); setTweaks({}); applyTheme(themeId); }}>
                  Reset all customizations
                </button>
              </div>
            </SectionCard>
          </>
        )}

        {section === "notifications" && (
          <>
            <SectionCard title="Notification Settings">
              <SettingRow label="Enable Notifications" description="Receive alerts for important events" divider={false}>
                <Toggle checked={true} onChange={() => {}} />
              </SettingRow>
            </SectionCard>
            <SectionCard title="Sound">
              <SettingRow label="Toast Sounds" description="Play sound for notifications" divider={true}>
                <Toggle checked={true} onChange={() => {}} />
              </SettingRow>
              <SettingRow label="Do Not Disturb" description="Mute all notifications" divider={false}>
                <Toggle checked={false} onChange={() => {}} />
              </SettingRow>
            </SectionCard>
            <div className="text-xs opacity-60 px-4 py-2">
              Message previews and DND schedule coming soon.
            </div>
          </>
        )}

        {section === "accounts" && (
          <>
            <SectionCard title="Sign-In Methods">
              <div className="p-4 text-sm opacity-80">
                Connected services and authentication methods will appear here.
              </div>
            </SectionCard>
          </>
        )}

        {section === "advanced" && (
          <>
            <SectionCard title="Developer Options">
              <SettingRow label="Developer Mode" description="Enable advanced debugging tools" divider={true}>
                <Toggle checked={false} onChange={() => {}} />
              </SettingRow>
              <SettingRow label="Beta Features" description="Try experimental features" divider={true}>
                <Toggle checked={false} onChange={() => {}} />
              </SettingRow>
              <SettingRow label="Debug Logging" description="Log internal events to console" divider={false}>
                <Toggle checked={false} onChange={() => {}} />
              </SettingRow>
            </SectionCard>
            <SectionCard title="Performance">
              <SettingRow label="Analytics" description="Help improve the app" divider={false}>
                <Toggle checked={true} onChange={() => {}} />
              </SettingRow>
            </SectionCard>
          </>
        )}

        {section === "zaro" && (
          <>
            <SectionCard title="Super Admin Portal">
              <div className="p-4 grid gap-4">
                <div>
                  <p className="text-sm opacity-80 mb-3">
                    Access the ZARO console to manage organization-wide settings and elevated administrative tasks.
                  </p>
                </div>
                <LabeledInput
                  label="ZARO Portal URL"
                  value={zaroUrl}
                  onChange={setZaroUrl}
                  placeholder="/admin/zaro or https://admin.example.com/zaro"
                />
                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-sm font-medium transition-colors" onClick={saveZaroUrl}>
                    Save URL
                  </button>
                  <a href={zaroUrl || "/admin/zaro"} className="flex-1 px-4 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-sm font-medium transition-colors text-center">
                    Open Portal
                  </a>
                </div>
              </div>
            </SectionCard>
          </>
        )}
      </main>

      {/* Avatar picker modal */}
      {avatarPickerOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md grid place-items-center z-50">
          <div className="w-[520px] max-w-[92vw] rounded-2xl border border-white/15 bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-6 shadow-2xl">
            <div className="mb-6">
              <div className="text-xl font-semibold mb-1">Choose Avatar</div>
              <div className="text-sm opacity-60">Select a profile picture or upload your own</div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-6">
              {PRESET_AVATARS.map(a => (
                <button
                  key={a.id}
                  onClick={() => usePresetAvatar(a)}
                  className={`relative rounded-2xl overflow-hidden ring-2 transition-all ${
                    avatar?.url===a.url
                      ? "ring-cyan-400/80 scale-105"
                      : "ring-white/20 hover:ring-white/40 hover:scale-103"
                  }`}
                >
                  <img src={a.url} alt="" className="h-24 w-full object-cover"/>
                </button>
              ))}
              <label className="relative rounded-2xl border-2 border-dashed border-white/30 hover:border-white/50 grid place-items-center cursor-pointer transition-colors bg-white/5 hover:bg-white/10">
                <div className="text-center">
                  <div className="text-2xl mb-1">+</div>
                  <div className="text-xs font-medium">Upload</div>
                </div>
                <input type="file" accept="image/*" className="hidden" onChange={(e)=>onUpload(e.target.files?.[0])}/>
              </label>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-sm font-medium transition-colors"
                      onClick={()=>setAvatarPickerOpen(false)}>
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-sm font-medium transition-colors"
                      onClick={()=>setAvatarPickerOpen(false)}>
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
