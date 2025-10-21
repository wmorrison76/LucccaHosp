// scripts/upgrade-settings-panel.mjs
// Usage: node scripts/upgrade-settings-panel.mjs
// Idempotent file patcher + scaffolder for the Apple-style Settings work.

import fs from "fs";
import path from "path";
import url from "url";

const root = process.cwd();
const FRONT = path.join(root, "frontend", "src");
const components = p => path.join(FRONT, "components", p);
const settingsDir = path.join(FRONT, "components", "settings", "sections");
const widgetsDir  = path.join(FRONT, "components", "widgets");
const scriptsDir  = path.join(root, "scripts");

ensureDir(settingsDir);
ensureDir(widgetsDir);
ensureDir(scriptsDir);

// ---------- helpers
function ensureDir(p){ fs.mkdirSync(p, { recursive: true }); }
function writeIfMissing(file, content){
  if (!fs.existsSync(file)){
    fs.writeFileSync(file, content, "utf8");
    log(`+ ${rel(file)}`);
    return true;
  }
  return false;
}
function patchFile(file, replacer){
  if (!fs.existsSync(file)) return false;
  const before = fs.readFileSync(file, "utf8");
  const after = replacer(before);
  if (after !== before){
    fs.writeFileSync(file, after, "utf8");
    log(`~ ${rel(file)}`);
    return true;
  }
  return false;
}
function rel(p){ return path.relative(root, p); }
function log(s){ console.log(s); }

// ---------- 1) Darken panel shell (opacity + blur)
{
  const file = components("WidgetSettingsPanel.jsx");
  patchFile(file, (src) => {
    // Replace the main wrapper bg/blur once.
    return src.replace(
      /className="h-full w-full overflow-hidden rounded-2xl border border-white\/10 bg-\[rgba\(12,14,18,0\.6\)\][^"]* grid"/,
      `className="h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-[rgba(15,19,28,0.9)] backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,.04),0_40px_100px_rgba(0,0,0,.45)] grid"`
    );
  });
}

// ---------- 2) Swap in compact avatar dropdown impl
{
  const file = components("WidgetSettingsPanel.jsx");
  patchFile(file, (src) => {
    if (src.includes("function HeaderAvatar({ current, setCurrent, avatars }) {") &&
        src.includes("aria-expanded")) {
      // Looks like the dropdown is already present; skip.
      return src;
    }
    // Replace HeaderAvatar function body with dropdown variant:
    const body = `
function HeaderAvatar({ current, setCurrent, avatars }) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="rounded-2xl p-3 mb-3 border border-white/10 bg-gradient-to-b from-white/5 to-transparent">
      <div className="flex items-center gap-3">
        <img src={current} alt="Avatar" className="h-16 w-16 rounded-2xl object-cover ring-1 ring-white/20 shadow" />
        <div className="flex-1">
          <div className="font-semibold">Echo</div>
          <div className="text-xs opacity-70">Choose your profile avatar</div>
        </div>
        <button
          className="h-8 px-3 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-sm"
          onClick={() => setOpen(v => !v)}
          aria-expanded={open}
        >
          {open ? "Hide" : "Change"}
        </button>
      </div>

      {open && (
        <div
          className="mt-3 flex gap-3 overflow-x-auto no-scrollbar scroll-smooth"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {avatars.map(a => (
            <button key={a.path}
              className={\`shrink-0 rounded-xl ring-1 overflow-hidden \${current===a.url ? "ring-cyan-300/60" : "ring-white/15 hover:ring-white/30"}\`}
              title={a.path.split("/").pop()}
              onClick={()=>setCurrent(a.url)}
            >
              <img src={a.url} alt="" className="h-12 w-12 object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
`;
    // naive but robust: replace the function by name
    return src.replace(/function HeaderAvatar\([\s\S]*?\}\n\)/, body)
              .replace(
                /document\.head\.appendChild\(style\);\s*$/,
                `$&\n// hide scrollbars (keep scroll)\n(() => { const extra=document.createElement("style"); extra.innerHTML=\`.no-scrollbar::-webkit-scrollbar{display:none}.no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}\`; document.head.appendChild(extra);})();`
              );
  });
}

// ---------- 3) Ensure the four stubs exist
const stub = `import React from "react";\nexport default function Stub(){return <div className="text-sm opacity-80">Settings coming soon.</div>;}\n`;
writeIfMissing(path.join(settingsDir, "Notifications.jsx"), stub);
writeIfMissing(path.join(settingsDir, "AV.jsx"),            stub);
writeIfMissing(path.join(settingsDir, "Accounts.jsx"),      stub);
writeIfMissing(path.join(settingsDir, "About.jsx"),         stub);

// ---------- 4) Create GlobalCalendarWidget
writeIfMissing(
  path.join(widgetsDir, "GlobalCalendarWidget.jsx"),
`import React, { useEffect, useMemo, useState } from "react";
const COLORS = {
  PROPOSAL:  "bg-cyan-500/30 text-cyan-200 ring-cyan-400/40",
  CONTRACT:  "bg-emerald-500/30 text-emerald-200 ring-emerald-400/40",
  UPDATE:    "bg-amber-500/30 text-amber-100 ring-amber-400/40",
  POPUP:     "bg-fuchsia-500/30 text-fuchsia-100 ring-fuchsia-400/40",
  CHANGE:    "bg-rose-500/30 text-rose-100 ring-rose-400/40",
};
export default function GlobalCalendarWidget({ max=6 }){
  const [events,setEvents]=useState([]);
  useEffect(()=>{ const raw=localStorage.getItem("lu:events");
    if(!raw){ const demo=[{id:"e1",type:"BEO",number:"BEO-2025-104",status:"CONTRACT",covers:120,startISO:new Date(Date.now()+3600e3).toISOString(),title:"Corporate Mixer"}];
      localStorage.setItem("lu:events", JSON.stringify(demo)); setEvents(demo);
    } else { try{setEvents(JSON.parse(raw));}catch{} }
    const up=(e)=>{ if(!e?.detail) return; setEvents(cur=>{ const i=cur.findIndex(x=>x.id===e.detail.id); const nxt=i>=0?(cur.map((x,ix)=>ix===i?{...x,...e.detail}:x)):([...cur,e.detail]); localStorage.setItem("lu:events", JSON.stringify(nxt)); return nxt; });};
    window.addEventListener("echo-events-upsert", up); return ()=>window.removeEventListener("echo-events-upsert", up);
  },[]);
  const upcoming=useMemo(()=>[...events].sort((a,b)=>new Date(a.startISO)-new Date(b.startISO)).slice(0,max),[events,max]);
  return (<div className="rounded-2xl p-3 border border-white/12 bg-white/5 shadow-[0_10px_40px_rgba(0,0,0,.35),inset_0_0_0_1px_rgba(255,255,255,.04)]">
    <div className="flex items-center justify-between mb-2">
      <div className="font-semibold">Global Calendar</div>
      <button className="text-xs px-2 h-7 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10"
        onClick={()=>window.dispatchEvent(new CustomEvent("open-panel",{detail:{id:"calendar",title:"Global Calendar"}}))}>Open</button>
    </div>
    <ul className="space-y-2">
      {upcoming.map(ev=>(
        <li key={ev.id} className="group p-2 rounded-xl border border-white/10 hover:bg-white/7 flex items-center gap-3 cursor-pointer"
            onClick={()=>window.dispatchEvent(new CustomEvent("open-panel",{detail:{id:"beo", number: ev.number, title: ev.title}}))}>
          <span className={\`text-[11px] px-2 py-0.5 rounded-full ring-1 \${COLORS[ev.status]||"bg-white/10 text-white/80 ring-white/20"}\`}>{ev.status}</span>
          <div className="flex-1 min-w-0">
            <div className="text-sm truncate">{ev.title || \`\${ev.type} \${ev.number}\`}</div>
            <div className="text-[11px] opacity-75">{new Date(ev.startISO).toLocaleTimeString([], {hour:"numeric",minute:"2-digit"})} • {ev.type} {ev.number} • {ev.covers} covers</div>
          </div>
          <span className="text-[11px] opacity-70">{new Date(ev.startISO).toLocaleDateString([], {month:"short",day:"numeric"})}</span>
        </li>
      ))}
      {upcoming.length===0 && <li className="text-sm opacity-70">No upcoming events.</li>}
    </ul>
  </div>);
}
`
);

// ---------- 5) Create StyleControllerWidget with text sizes
writeIfMissing(
  path.join(widgetsDir, "StyleControllerWidget.jsx"),
`import React, { useEffect, useState } from "react";
const KEY="lu:design:vars";
const DEFAULTS={
  "--panel-radius":"16px",
  "--panel-ring":"0 0 0 1px rgba(255,255,255,.06)",
  "--panel-shadow":"0 22px 80px rgba(0,0,0,.45), 0 0 22px rgba(22,224,255,.16)",
  "--panel-bg":"rgba(15,19,28,0.9)",
  "--panel-bg-subtle":"rgba(255,255,255,0.05)",
  "--accent":"#16E0FF",
  "--tab-height":"36px",
  "--tab-radius":"10px",
  "--tab-active-bg":"rgba(255,255,255,0.10)",
  "--tab-border":"1px solid rgba(255,255,255,0.12)",
  "--mode":"dark",
  "--text-xs":"11px",
  "--text-sm":"13px",
  "--text-md":"15px",
  "--text-lg":"18px",
  "--text-xl":"24px"
};
export default function StyleControllerWidget(){
  const [vars,setVars]=useState(()=>{try{return{...DEFAULTS,...JSON.parse(localStorage.getItem(KEY)||"{}")}}catch{return DEFAULTS}});
  useEffect(()=>{const r=document.documentElement; Object.entries(vars).forEach(([k,v])=>r.style.setProperty(k,v));},[vars]);
  const save=()=>{localStorage.setItem(KEY, JSON.stringify(vars)); window.dispatchEvent(new CustomEvent("lu:design:updated",{detail:vars}));};
  const set=k=>e=>setVars(v=>({...v,[k]:e.target.value}));
  return (<div className="rounded-2xl p-3 border border-white/12 bg-white/5">
    <div className="font-semibold mb-2">Style Controller</div>
    <div className="grid gap-3" style={{gridTemplateColumns:"1fr 1fr"}}>
      <L label="Accent"><input className="settings-input" value={vars["--accent"]} onChange={set("--accent")}/></L>
      <L label="Panel radius"><input className="settings-input" value={vars["--panel-radius"]} onChange={set("--panel-radius")}/></L>
      <L label="Tab height"><input className="settings-input" value={vars["--tab-height"]} onChange={set("--tab-height")}/></L>
      <L label="Tab active bg"><input className="settings-input" value={vars["--tab-active-bg"]} onChange={set("--tab-active-bg")}/></L>
      <L label="Mode">
        <select className="settings-input" value={vars["--mode"]} onChange={set("--mode")}><option>dark</option><option>light</option><option>auto</option></select>
      </L>
      <L label="Panel bg"><input className="settings-input" value={vars["--panel-bg"]} onChange={set("--panel-bg")}/></L>
    </div>
    <div className="mt-3 font-medium">Text sizes</div>
    <div className="grid gap-3" style={{gridTemplateColumns:"repeat(5,1fr)"}}>
      {["--text-xs","--text-sm","--text-md","--text-lg","--text-xl"].map(k=>(
        <L key={k} label={k.replace("--text-","text-")}><input className="settings-input" value={vars[k]} onChange={set(k)}/></L>
      ))}
    </div>
    <div className="flex gap-2 mt-3">
      <button className="dw-btn dw-btn--primary px-3 py-1 rounded" onClick={save}>Apply</button>
      <button className="dw-btn px-3 py-1 rounded" onClick={()=>setVars(DEFAULTS)}>Reset</button>
    </div>
    <div className="mt-2 text-xs opacity-70">Panels should use CSS vars: font-size: var(--text-md), etc.</div>
  </div>);
}
function L({label,children}){return (<label className="flex flex-col gap-1"><span className="text-xs opacity-80">{label}</span>{children}</label>);}
`
);

// ---------- 6) Ensure widgets/registry.js includes the two templates
{
  const reg = path.join(widgetsDir, "registry.js");
  if (!fs.existsSync(reg)){
    fs.writeFileSync(reg,
`export const WIDGET_TEMPLATES = [
  { id:"globalCalendar", title:"Global Calendar", category:"Scheduling", template:"valuePlusSpark", help:"Upcoming BEO/REO events with status, covers, time.", unit:"", sim:{base:1} },
  { id:"styleController", title:"Style Controller", category:"Design", template:"bigNumber", help:"Global shadows, radii, tabs, accent & themes + text sizes.", unit:"", sim:{base:1} },
];
export const DEFAULT_WIDGETS = [];
`, "utf8");
    log(`+ ${rel(reg)}`);
  } else {
    patchFile(reg, (src)=>{
      let out = src;
      if (!out.includes(`id:"globalCalendar"`)){
        out = out.replace(/WIDGET_TEMPLATES\s*=\s*\[/, `WIDGET_TEMPLATES = [\n  { id:"globalCalendar", title:"Global Calendar", category:"Scheduling", template:"valuePlusSpark", help:"Upcoming BEO/REO events with status, covers, time.", unit:"", sim:{base:1} },`);
      }
      if (!out.includes(`id:"styleController"`)){
        out = out.replace(/WIDGET_TEMPLATES\s*=\s*\[/, `WIDGET_TEMPLATES = [\n  { id:"styleController", title:"Style Controller", category:"Design", template:"bigNumber", help:"Global shadows, radii, tabs, accent & themes + text sizes.", unit:"", sim:{base:1} },`);
      }
      return out;
    });
  }
}

// ---------- 7) Add HUD listener so “Add to dashboard” works (once)
{
  // Try to patch a Board/HUD style file that mounts dashboard widgets.
  // We’ll add a minimal global listener snippet that other code can consume.
  const guesses = [
    components("Board.jsx"),
    components("Dashboard.jsx"),
    components("EchoBackboard.jsx"),
  ].filter(fs.existsSync);

  const snippet =
`\n// === HUD add-widget bus (idempotent) ===\n(function(){\n  if (window.__luccca_hud_listener_installed) return;\n  window.__luccca_hud_listener_installed = true;\n  window.addEventListener("hud-add-widget", (e) => {\n    const detail = e.detail || {}; // { id, title, ... }\n    window.dispatchEvent(new CustomEvent("hud-internal-add-widget", { detail }));\n  });\n})();\n`;

  guesses.forEach(file => {
    patchFile(file, (src) => src.includes("__luccca_hud_listener_installed") ? src : src + snippet);
  });

  if (guesses.length === 0){
    log("! Could not find Board/Dashboard to patch HUD listener (skip). Add the snippet manually where your HUD state lives.");
  }
}

log("✓ Upgrade complete.");
