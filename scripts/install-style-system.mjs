// scripts/install-style-system.mjs
// Usage:
//   node scripts/install-style-system.mjs                       # install (no UI injection)
//   node scripts/install-style-system.mjs --appearance frontend/src/modules/Settings/Appearance.jsx
//
// Revert afterwards:
//   node scripts/revert-style-system.mjs
//
// What it does:
// - Adds CSS tokens (tabs, .dw-panel, text sizes)
// - Adds theme engine with Preview/Apply/Cancel
// - Adds AvatarPicker (Echo F/M/B/R + Upload)
// - Patches App.jsx to import tokens/utilities and init theme
// - Optionally inserts <StyleControlPanel/> into your Appearance route
// - Creates backups and a revert script

import fs from "fs";
import path from "path";

function findRoot(start){
  let p=start;
  for (let i=0;i<7;i++){
    if (fs.existsSync(path.join(p,"frontend","src"))) return p;
    const up=path.dirname(p); if (up===p) break; p=up;
  }
  throw new Error("Run from the project root (folder that contains frontend/src) or pass --root");
}
const ARGS = Object.fromEntries(process.argv.slice(2).map((a,i,arr)=>{
  if(!a.startsWith("--")) return [`_${i}`, a];
  if(a.includes("=")){ const [k,v]=a.slice(2).split("=",2); return [k,v]; }
  const k=a.slice(2); const v=(arr[i+1]&&!arr[i+1].startsWith("--"))?arr[i+1]:true; return [k,v];
}));

const ROOT = ARGS.root ? path.resolve(ARGS.root) : findRoot(process.cwd());
const FRONT = path.join(ROOT,"frontend","src");
const LIB   = path.join(FRONT,"lib");
const CMP   = path.join(FRONT,"components");
const STY   = path.join(FRONT,"styles");

const BACKUP_DIR = path.join(ROOT, "scripts", ".style-system-backups");
const LOG_FILE   = path.join(ROOT, "scripts", ".style-system-log.json");
fs.mkdirSync(BACKUP_DIR, { recursive:true });

const changes = [];

function rel(p){ return path.relative(ROOT,p); }
function ensure(d){ fs.mkdirSync(d,{recursive:true}); }
function backup(file){
  if(!fs.existsSync(file)) return null;
  const stamp=new Date().toISOString().replace(/[:.]/g,"-");
  const dest=path.join(BACKUP_DIR, rel(file).replace(/\//g,"__")+"__"+stamp+".bak");
  ensure(path.dirname(dest));
  fs.copyFileSync(file, dest);
  return dest;
}
function writeFileSafe(file, content){
  ensure(path.dirname(file));
  const b = backup(file); if (b) changes.push({file, backup:b});
  fs.writeFileSync(file, content, "utf8");
  console.log("+", rel(file));
}
function patchFile(file, mutate){
  if(!fs.existsSync(file)) return false;
  const before = fs.readFileSync(file,"utf8");
  const after  = mutate(before);
  if (before !== after){
    const b = backup(file); if (b) changes.push({file, backup:b});
    fs.writeFileSync(file, after, "utf8");
    console.log("~", rel(file));
    return true;
  } else {
    console.log("=", rel(file), "(no changes)");
    return false;
  }
}

// ---------- 1) token CSS (.dw-panel, tabs, text helpers)
ensure(LIB);
writeFileSafe(path.join(LIB,"themeTokens.css"), `:root{
  --font-xs:11px; --font-sm:13px; --font-md:15px; --font-lg:18px; --font-xl:24px;
  --radius-panel:16px; --radius-tab:10px;
  --shadow-panel:0 22px 80px rgba(0,0,0,.45), 0 0 22px rgba(22,224,255,.12);
  --ring-panel:0 0 0 1px rgba(255,255,255,.06);
  --accent:#16E0FF;
  --bg-panel:rgba(18,22,30,.90); --bg-panel-subtle:rgba(255,255,255,.06);
  --text-strong:#EAF7FB; --text-muted:#A8C1CB;
  --tab-height:36px; --tab-bg:transparent; --tab-bg-active:rgba(255,255,255,.10);
  --tab-border:1px solid rgba(255,255,255,.16);
}
@media (prefers-color-scheme: light){
  :root[data-mode="auto"]{
    --bg-panel:rgba(246,248,250,.88); --bg-panel-subtle:rgba(0,0,0,.06);
    --text-strong:#0b2230; --text-muted:#3a5564;
    --ring-panel:0 0 0 1px rgba(0,0,0,.06);
    --tab-bg-active:rgba(0,0,0,.06); --tab-border:1px solid rgba(0,0,0,.10);
  }
}
:root[data-mode="dark"]{ --bg-panel:rgba(18,22,30,.90); --bg-panel-subtle:rgba(255,255,255,.06); --text-strong:#EAF7FB; --text-muted:#A8C1CB; }
:root[data-mode="light"]{ --bg-panel:rgba(246,248,250,.88); --bg-panel-subtle:rgba(0,0,0,.06); --text-strong:#0b2230; --text-muted:#3a5564; --ring-panel:0 0 0 1px rgba(0,0,0,.06); --tab-bg-active:rgba(0,0,0,.06); --tab-border:1px solid rgba(0,0,0,.10); }
.text-xs{font-size:var(--font-xs)} .text-sm{font-size:var(--font-sm)} .text-md{font-size:var(--font-md)} .text-lg{font-size:var(--font-lg)} .text-xl{font-size:var(--font-xl)}
.dw-tabs{display:flex;gap:8px;align-items:center}
.dw-tab{height:var(--tab-height);padding:0 12px;border-radius:var(--radius-tab);background:var(--tab-bg);border:var(--tab-border);color:var(--text-strong)}
.dw-tab[aria-selected="true"]{background:var(--tab-bg-active);outline:1px solid var(--accent);outline-offset:0}
.dw-panel{border-radius:var(--radius-panel);background:var(--bg-panel);box-shadow:var(--shadow-panel);border:1px solid rgba(255,255,255,.12)}
`);

// ---------- 2) utilities (inputs/buttons helpers)
ensure(STY);
writeFileSafe(path.join(STY,"utilities.css"), `.no-scrollbar{scrollbar-width:none}.no-scrollbar::-webkit-scrollbar{display:none}
.dw-input{display:block;width:100%;border-radius:10px;border:1px solid rgba(255,255,255,.22);background:rgba(255,255,255,.06);color:var(--text-strong);padding:.5rem .65rem}
.dw-btn{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.18);color:var(--text-strong)}
.dw-btn--primary{background:var(--accent);border-color:transparent;color:#041318}
`);

// ---------- 3) theme engine + Preview
writeFileSafe(path.join(LIB,"themeEngine.js"), `const KEY="lu:design:theme:v2";
const DEFAULTS={"--font-xs":"11px","--font-sm":"13px","--font-md":"15px","--font-lg":"18px","--font-xl":"24px","--accent":"#16E0FF",mode:"auto"};
function setVar(k,v){document.documentElement.style.setProperty(k,v);}
function applyVars(vars){Object.entries(vars).forEach(([k,v])=>k.startsWith("--")&&setVar(k,v));}
function readVars(){try{return JSON.parse(localStorage.getItem(KEY)||"{}")}catch{return{}}}
export function initTheme(){const saved=readVars();const merged={...DEFAULTS,...saved};document.documentElement.dataset.mode=merged.mode||"auto";applyVars(merged);return merged;}
export function previewTheme(next){if(next.mode) document.documentElement.dataset.mode=next.mode;applyVars(next);}
export function commitTheme(next){const merged={...readVars(),...next};localStorage.setItem(KEY,JSON.stringify(merged));previewTheme(merged);}
export function resetTheme(){localStorage.removeItem(KEY);previewTheme(DEFAULTS);}
`);

// ---------- 4) StyleControlPanel (UI) + AvatarPicker
ensure(CMP);
writeFileSafe(path.join(CMP,"StyleControlPanel.jsx"), `import React,{useEffect,useState} from "react";
import { initTheme, previewTheme, commitTheme, resetTheme } from "@/lib/themeEngine";
export default function StyleControlPanel(){
  const [draft,setDraft]=useState(()=>initTheme());
  const [preview,setPreview]=useState(false);
  useEffect(()=>{ if(preview) previewTheme(draft); },[draft,preview]);
  const F=[["mode","Mode","select",["auto","dark","light"]],["--accent","Accent","text"],["--font-xs","XS","text"],["--font-sm","SM","text"],["--font-md","MD","text"],["--font-lg","LG","text"],["--font-xl","XL","text"]];
  const on=(k)=>(e)=>setDraft(d=>({...d,[k]:e.target.value}));
  return(<div className="space-y-3">
    <div className="text-lg font-semibold">Appearance</div>
    <div className="grid gap-3" style={{gridTemplateColumns:"repeat(4,minmax(0,1fr))"}}>
      {F.map(([k,l,t,opts])=> <label key={k} className="flex flex-col gap-1"><span className="text-sm opacity-80">{l}</span>
        {t==="select"?<select className="dw-input" value={draft[k]} onChange={on(k)}>{opts.map(o=><option key={o}>{o}</option>)}</select>:<input className="dw-input" value={draft[k]} onChange={on(k)}/>}
      </label>)}
    </div>
    <div className="flex gap-2">
      {!preview && <button className="dw-btn dw-btn--primary px-3 py-1 rounded" onClick={()=>{setPreview(true);previewTheme(draft);}}>Preview</button>}
      {preview && <>
        <button className="dw-btn dw-btn--primary px-3 py-1 rounded" onClick={()=>{commitTheme(draft);setPreview(false);}}>Apply</button>
        <button className="dw-btn px-3 py-1 rounded" onClick={()=>{initTheme();setPreview(false);}}>Cancel</button>
      </>}
      <button className="dw-btn px-3 py-1 rounded" onClick={()=>{resetTheme();setDraft(initTheme());}}>Reset</button>
    </div>
    <div className="text-sm opacity-80">Use <code>className="dw-panel"</code> on containers; tabs use <code>.dw-tabs</code>/<code>.dw-tab</code>; text uses <code>var(--font-*)</code> or <code>.text-*</code>.</div>
  </div>);}
`);

writeFileSafe(path.join(CMP,"AvatarPicker.jsx"), `import React,{useMemo,useState,useEffect} from "react";
const AVATAR_KEY="lu:echo:avatar:v1";
export default function AvatarPicker(){
  const avatars=useMemo(()=>{const found=import.meta.glob("../assets/**/Echo_[FMBR].{png,jpg,jpeg,webp,svg}",{eager:true});
    const items=Object.entries(found).map(([p,m])=>({path:p,url:m.default}));
    const order=["Echo_F","Echo_M","Echo_B","Echo_R"];
    items.sort((a,b)=>order.findIndex(t=>a.path.includes(t))-order.findIndex(t=>b.path.includes(t)));
    const u=localStorage.getItem(AVATAR_KEY+":custom"); if(u) items.unshift({path:"custom",url:u,custom:true}); return items;},[]);
  const [current,setCurrent]=useState(()=>localStorage.getItem(AVATAR_KEY)||avatars[0]?.url||"");
  useEffect(()=>{try{localStorage.setItem(AVATAR_KEY,current)}catch{};window.dispatchEvent(new CustomEvent("echo-avatar-changed",{detail:{url:current}}));},[current]);
  const onUpload=f=>{const r=new FileReader();r.onload=()=>{localStorage.setItem(AVATAR_KEY+":custom",r.result);setCurrent(r.result)};r.readAsDataURL(f);};
  return(<div className="space-y-2">
    <div className="flex items-center gap-4">
      <img src={current} alt="" className="h-20 w-20 rounded-2xl object-cover ring-1 ring-white/20 shadow"/>
      <label className="dw-btn px-3 py-1 rounded cursor-pointer">Upload…<input type="file" accept="image/*" className="hidden" onChange={e=>e.target.files?.[0]&&onUpload(e.target.files[0])}/></label>
    </div>
    <div className="flex gap-3 overflow-x-auto no-scrollbar py-1">
      {avatars.map(a=>(<button key={a.path} className={"rounded-xl overflow-hidden ring-1 "+(current===a.url?"ring-cyan-400/60":"ring-white/15 hover:ring-white/30")} onClick={()=>setCurrent(a.url)} title={a.custom?"Custom upload":a.path.split("/").pop()}><img src={a.url} alt="" className="h-14 w-14 object-cover"/></button>))}
    </div>
  </div>);}
`);

// ---------- 5) Patch App.jsx (import tokens/utilities + initTheme)
const app = path.join(FRONT,"App.jsx");
if (!fs.existsSync(app)) console.warn("! Could not find App.jsx (skip auto-patch).");
else patchFile(app, (s)=>{
  if(!s.includes('themeTokens.css')) s = `import "@/lib/themeTokens.css";\n`+s;
  if(!s.includes('styles/utilities.css')) s = `import "@/styles/utilities.css";\n`+s;
  if(!s.includes('initTheme')) s = s.replace(/import .*?;\n/s, m=> m+`import { initTheme } from "@/lib/themeEngine";\n`);
  if(!s.includes('initTheme();')) s = s.replace(/function\s+App\s*\(/, m=>`initTheme();\n`+m);
  return s;
});

// ---------- 6) Patch WidgetSettingsPanel.jsx to use AvatarPicker + dw-panel
const wsp = path.join(CMP,"WidgetSettingsPanel.jsx");
if (fs.existsSync(wsp)) {
  patchFile(wsp,(s)=>{
    if(!s.includes("AvatarPicker")) s = s.replace(/from\s+"lucide-react";?/, (m)=>`${m}\nimport AvatarPicker from "./AvatarPicker";`);
    s = s.replace(/className="h-full w-full overflow-auto p-4"/, 'className="h-full w-full overflow-auto p-4 backdrop-blur-md" style={{background:"rgba(10,14,20,.72)"}}');
    s = s.replace(/<div className="rounded-2xl[^>]*>[\s\S]*?<img[^>]*>[\s\S]*?avatars\.map[\s\S]*?<\/div>/, `<div className="dw-panel p-4"><div className="text-sm opacity-80 mb-2">Choose your Echo avatar</div><AvatarPicker/></div>`);
    return s;
  });
}

// ---------- 7) Optionally inject StyleControlPanel into Appearance
const APPEAR = ARGS.appearance ? path.join(ROOT, ARGS.appearance) : null;
if (APPEAR){
  if (!fs.existsSync(APPEAR)) {
    console.warn("! Appearance file not found:", rel(APPEAR));
  } else {
    patchFile(APPEAR, (s)=>{
      if(!s.includes('StyleControlPanel')) s = s.replace(/import .*?;\n/s, m=> m+`import StyleControlPanel from "@/components/StyleControlPanel";\n`);
      if(!s.includes("<StyleControlPanel")) {
        // naïve: insert once after first return(
        s = s.replace(/return\s*\(\s*([\s\S]*?)\)/, (m,inner)=>{
          const panel = `\n  <div className="dw-panel p-4">\n    <StyleControlPanel />\n  </div>\n`;
          return `return (\n${panel}${inner}\n)`;
        });
      }
      return s;
    });
  }
}

// ---------- 8) write revert script & log
fs.writeFileSync(LOG_FILE, JSON.stringify({ when: new Date().toISOString(), changes }, null, 2), "utf8");
fs.writeFileSync(path.join(ROOT,"scripts","revert-style-system.mjs"), `import fs from "fs";
const log = JSON.parse(fs.readFileSync("${LOG_FILE.replace(/\\/g,"/")}", "utf8"));
for (const c of log.changes) {
  if (c.backup && fs.existsSync(c.backup)) {
    fs.copyFileSync(c.backup, c.file);
    console.log("reverted", c.file);
  }
}
console.log("Done. You can delete ${LOG_FILE.replace(/\\/g,"/")} and the backups if you like.");
`, "utf8");

console.log("\\n✓ Style system installed.");
if (APPEAR) console.log("• StyleControlPanel injected into", rel(APPEAR));
console.log("• Revert anytime:  node scripts/revert-style-system.mjs");
