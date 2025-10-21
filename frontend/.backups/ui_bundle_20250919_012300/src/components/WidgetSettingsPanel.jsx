import React, { useEffect, useMemo, useRef, useState, Suspense } from "react";
import { Cog, Monitor, Bell, User, Info, Boxes, Paintbrush, ChevronDown } from "lucide-react";

const AVATAR_KEY = "lu:echo:avatar:v1";
const SECTION_KEY = "lu:settings:section:v1";

/** small inline SVG fallback */
function svgAvatar(bg, label) {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
    <defs><radialGradient id="g" cx="50%" cy="35%" r="60%">
      <stop offset="0%" stop-color="${bg}" stop-opacity="1"/>
      <stop offset="100%" stop-color="#0c121c" stop-opacity="1"/>
    </radialGradient></defs>
    <rect x="0" y="0" width="96" height="96" rx="18" fill="url(#g)"/>
    <circle cx="48" cy="36" r="16" fill="rgba(255,255,255,0.15)"/>
    <rect x="22" y="56" width="52" height="20" rx="10" fill="rgba(255,255,255,0.12)"/>
    <text x="48" y="92" text-anchor="middle" font-family="ui-sans-serif, system-ui" font-size="12" fill="#eaf6ff" opacity=".85">Echo ${label}</text>
  </svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

/** avatar discovery — whitelist Echo_(F|M|B|R|A).png and Echo.png under src/assets */
function useAvatars() {
  return useMemo(() => {
    const gAny = import.meta.glob("../assets/**/[Ee]cho*.{png,jpg,jpeg,webp,svg}", { eager: true });
    const allowName = (name) =>
      /^[Ee]cho(_[FMBRA])?\.(png|jpe?g|webp|svg)$/i.test(name); // blocks Echo_Canvas.png, LUCCCA_ECHO.png, etc.

    let items = Object.entries(gAny)
      .filter(([p]) => allowName(p.split("/").pop() || ""))
      .map(([path, mod]) => ({ path, url: mod.default }));

    if (items.length === 0) {
      items = [
        { path: "builtin:echo_f", url: svgAvatar("#2a91d1", "F") },
        { path: "builtin:echo_m", url: svgAvatar("#00a97b", "M") },
        { path: "builtin:echo_b", url: svgAvatar("#7e57c2", "B") },
        { path: "builtin:echo_r", url: svgAvatar("#c37d0e", "R") },
      ];
    }

    const pref = ["echo_f", "echo_m", "echo_b", "echo_r", "echo_a", "echo.png"];
    items.sort((a, b) => {
      const A = (a.path.split("/").pop() || "").toLowerCase();
      const B = (b.path.split("/").pop() || "").toLowerCase();
      const ia = pref.findIndex(x => A.includes(x));
      const ib = pref.findIndex(x => B.includes(x));
      return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
    });

    return items;
  }, []);
}

// Sections (lazy)
const SECTION_MODULES = import.meta.glob("./settings/sections/*.jsx");
const SECTIONS = {
  general:       { label:"General",       icon: Cog,        loader: SECTION_MODULES["./settings/sections/General.jsx"] },
  appearance:    { label:"Appearance",    icon: Paintbrush, loader: SECTION_MODULES["./settings/sections/Appearance.jsx"] },
  whiteboard:    { label:"Whiteboard",    icon: Monitor,    loader: SECTION_MODULES["./settings/sections/Whiteboard.jsx"] },
  widgets:       { label:"Widgets",       icon: Boxes,      loader: SECTION_MODULES["./settings/sections/Widgets.jsx"] },
  notifications: { label:"Notifications", icon: Bell,       loader: SECTION_MODULES["./settings/sections/Notifications.jsx"] },
  av:            { label:"Audio & Video", icon: Monitor,    loader: SECTION_MODULES["./settings/sections/AV.jsx"] },
  accounts:      { label:"Accounts",      icon: User,       loader: SECTION_MODULES["./settings/sections/Accounts.jsx"] },
  about:         { label:"About",         icon: Info,       loader: SECTION_MODULES["./settings/sections/About.jsx"] },
};
const Lazy = Object.fromEntries(
  Object.entries(SECTIONS).map(([k,v])=>[
    k,
    React.lazy(v.loader ?? (async()=>({default:()=> <div className="text-sm opacity-70">Coming soon…</div>})))
  ])
);

// Discover widgets (for Settings → Widgets list)
const WIDGET_MODULES = import.meta.glob("./widgets/**/*.{jsx,tsx,js,ts}", { import: "default" });

export default function WidgetSettingsPanel(){
  const avatars = useAvatars();
  const [avatar, setAvatar] = useState(()=>localStorage.getItem(AVATAR_KEY) || avatars[0]?.url || "");
  const [section, setSection] = useState(()=>localStorage.getItem(SECTION_KEY) || "appearance");

  useEffect(()=>{
    try{ localStorage.setItem(AVATAR_KEY, avatar); }catch{}
    window.dispatchEvent(new CustomEvent("echo-avatar-changed", { detail:{ url: avatar }}));
  },[avatar]);
  useEffect(()=>{ try{ localStorage.setItem(SECTION_KEY, section);}catch{}; },[section]);

  const widgets = useMemo(()=> Object.keys(WIDGET_MODULES)
    .map(p=>({ id:p, name:p.split("/").pop().replace(/\.(jsx?|tsx?)$/,"") }))
    .sort((a,b)=>a.name.localeCompare(b.name)), []);

  return (
    <div
      className="h-full w-full overflow-hidden rounded-2xl border border-white/10 relative"
      style={{
        background: "linear-gradient(180deg, rgba(10,14,22,0.88), rgba(10,14,22,0.92))",
        boxShadow: "0 30px 100px rgba(0,0,0,.55), inset 0 0 0 1px rgba(255,255,255,.045)"
      }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{backdropFilter:"blur(6px)"}}/>
      <div className="relative grid h-full" style={{gridTemplateColumns:"280px 1fr"}}>
        {/* LEFT NAV */}
        <aside className="h-full overflow-auto border-r border-white/10 p-3">
          <AvatarHeader avatars={avatars} value={avatar} onChange={setAvatar}/>
          <Nav section={section} setSection={setSection}/>
        </aside>

        {/* RIGHT PANE */}
        <main className="h-full overflow-auto p-6">
          <Suspense fallback={<div className="text-sm opacity-70">Loading…</div>}>
            {section==="general"        && <Lazy.general/>}
            {section==="appearance"     && <Lazy.appearance/>}
            {section==="whiteboard"     && <Lazy.whiteboard/>}
            {section==="widgets"        && <Lazy.widgets widgets={widgets}/>}
            {section==="notifications"  && <Lazy.notifications/>}
            {section==="av"             && <Lazy.av/>}
            {section==="accounts"       && <Lazy.accounts/>}
            {section==="about"          && <Lazy.about/>}
          </Suspense>
        </main>
      </div>
    </div>
  );
}

/* ---------- parts ---------- */

function AvatarHeader({ avatars, value, onChange }){
  const [open, setOpen] = useState(false);
  const pop = useRef(null);

  useEffect(()=>{
    const onDoc = (e)=>{ if(open && pop.current && !pop.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return ()=>document.removeEventListener("mousedown", onDoc);
  },[open]);

  return (
    <div className="rounded-2xl p-3 mb-3 border border-white/10 bg-gradient-to-b from-white/6 to-transparent">
      <div className="flex items-center gap-3 relative">
        <button
          className="relative h-14 w-14 rounded-2xl ring-1 ring-white/20 overflow-hidden shadow"
          onClick={()=>setOpen(v=>!v)}
          title="Change avatar"
        >
          <img src={value} alt="Avatar" className="h-full w-full object-cover"/>
          <span className="absolute -bottom-2 right-1 h-6 w-6 rounded-full grid place-items-center
                           bg-black/60 ring-1 ring-white/30">
            <ChevronDown size={14}/>
          </span>
        </button>
        <div>
          <div className="font-semibold leading-tight">Echo</div>
          <div className="text-xs opacity-70">Choose your profile avatar</div>
        </div>

        {open && (
          <div ref={pop}
            className="absolute z-50 top-16 left-0 rounded-xl border border-white/12 p-2"
            style={{
              background:"rgba(15,20,28,.96)",
              boxShadow:"0 18px 60px rgba(0,0,0,.5), inset 0 0 0 1px rgba(255,255,255,.04)"
            }}
          >
            <div className="grid gap-2" style={{gridTemplateColumns:"repeat(2,64px)", maxHeight:140, overflowY:"auto"}}>
              {avatars.map(a=>(
                <button key={a.path}
                  className={`rounded-lg ring-1 overflow-hidden ${value===a.url ? "ring-cyan-300/60" : "ring-white/12 hover:ring-white/30"}`}
                  onClick={()=>{ onChange(a.url); setOpen(false); }}
                  title={a.path.split("/").pop()}
                >
                  <img src={a.url} alt="" className="h-16 w-16 object-cover"/>
                </button>
              ))}
            </div>
            <style>{`.grid::-webkit-scrollbar{display:none}`}</style>
          </div>
        )}
      </div>
    </div>
  );
}

function Nav({ section, setSection }){
  const list = [
    ["appearance",    SECTIONS.appearance.icon,    SECTIONS.appearance.label],
    ["whiteboard",    SECTIONS.whiteboard.icon,    SECTIONS.whiteboard.label],
    ["widgets",       SECTIONS.widgets.icon,       SECTIONS.widgets.label],
    ["notifications", SECTIONS.notifications.icon, SECTIONS.notifications.label],
    ["av",            SECTIONS.av.icon,            "Audio & Video"],
    ["accounts",      SECTIONS.accounts.icon,      SECTIONS.accounts.label],
    ["general",       SECTIONS.general.icon,       SECTIONS.general.label],
    ["about",         SECTIONS.about.icon,         SECTIONS.about.label],
  ];
  return (
    <ul className="space-y-1">
      {list.map(([id,Icon,label])=>(
        <li key={id}>
          <button onClick={()=>setSection(id)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left
                        ${section===id ? "bg-white/10 ring-1 ring-white/15" : "hover:bg-white/5"}`}>
            <span className="h-7 w-7 grid place-items-center rounded-lg bg-white/8 ring-1 ring-white/10">
              <Icon size={16}/>
            </span>
            <span className="text-[15px]">{label}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
