// scripts/install-hud-additions.mjs
// Usage: node scripts/install-hud-additions.mjs
// Installs HUD add-widget bridge, text-size tokens, and ensures widget templates.
// Safe to re-run.

import fs from "fs";
import path from "path";
import url from "url";

const CWD = process.cwd();

// --- find repo root whether you run from root or /frontend
function findRoot(start){
  let p = start;
  for (let i=0;i<5;i++){
    if (fs.existsSync(path.join(p, "frontend", "src"))) return p;
    const up = path.dirname(p);
    if (up === p) break;
    p = up;
  }
  throw new Error("Cannot locate repo root (looking for frontend/src)");
}
const root = findRoot(CWD);
const FRONT = path.join(root, "frontend", "src");
const libDir = path.join(FRONT, "lib");
const widgetsDir = path.join(FRONT, "components", "widgets");
const regFile = path.join(widgetsDir, "registry.js");

function ensureDir(p){ fs.mkdirSync(p, { recursive: true }); }
function rel(p){ return path.relative(root, p); }
function log(x){ console.log(x); }
function write(file, content){ fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, content, "utf8"); log(`+ ${rel(file)}`); }
function writeIfMissing(file, content){ if (!fs.existsSync(file)) write(file, content); else log(`= ${rel(file)} (exists)`); }
function patch(file, fn){ if (!fs.existsSync(file)) return false; const a=fs.readFileSync(file,"utf8"); const b=fn(a); if(a!==b){ fs.writeFileSync(file,b,"utf8"); log(`~ ${rel(file)}`); return true;} log(`= ${rel(file)} (no changes)`); return false; }

ensureDir(libDir);
ensureDir(widgetsDir);

/* 1) HUD bus + hook */
writeIfMissing(path.join(libDir, "hudBus.js"), `
// frontend/src/lib/hudBus.js
import { useEffect } from "react";
if (!window.__registerHudSetter) {
  window.__registerHudSetter = function(setter){
    window.__luccca_hud_setter = setter;
    const q = window.__luccca_hud_queue || [];
    q.splice(0).forEach(ev => tryAdd(ev));
  };
}
function shape(detail){
  const w = detail || {};
  return { id: w.id || ("widget-" + Math.random().toString(36).slice(2,8)), title: w.title || "New Widget", type: w.type || w.id || "custom", x:0,y:0,w:4,h:3, payload:w };
}
function tryAdd(detail){
  if (typeof window.__luccca_hud_setter === "function"){
    const setter = window.__luccca_hud_setter;
    setter(arr => arr.concat(shape(detail)));
  } else {
    (window.__luccca_hud_queue ||= []).push(detail);
  }
}
(function(){
  if (window.__luccca_hud_listener_installed) return;
  window.__luccca_hud_listener_installed = true;
  window.addEventListener("hud-internal-add-widget", (e) => tryAdd(e.detail));
  window.addEventListener("hud-add-widget", (e) => {
    window.dispatchEvent(new CustomEvent("hud-internal-add-widget", { detail: e.detail }));
  });
})();
export function useHudAddListener(setHudWidgets){
  useEffect(() => { window.__registerHudSetter?.(setHudWidgets); }, [setHudWidgets]);
}
`);

/* 2) global text-size + tokens */
writeIfMissing(path.join(libDir, "textVars.css"), `/* frontend/src/lib/textVars.css */
:root{
  --panel-radius:16px;
  --panel-ring:0 0 0 1px rgba(255,255,255,.06);
  --panel-shadow:0 22px 80px rgba(0,0,0,.45), 0 0 22px rgba(22,224,255,.16);
  --panel-bg:rgba(15,19,28,0.9);
  --panel-bg-subtle:rgba(255,255,255,0.05);
  --accent:#16E0FF;
  --tab-height:36px;
  --tab-radius:10px;
  --tab-active-bg:rgba(255,255,255,0.10);
  --tab-border:1px solid rgba(255,255,255,0.12);
  --mode:dark;
  --text-xs:11px; --text-sm:13px; --text-md:15px; --text-lg:18px; --text-xl:24px;
}
.text-var-xs{font-size:var(--text-xs)} .text-var-sm{font-size:var(--text-sm)}
.text-var-md{font-size:var(--text-md)} .text-var-lg{font-size:var(--text-lg)}
.text-var-xl{font-size:var(--text-xl)}
`);

/* 3) ensure templates in registry */
if (!fs.existsSync(regFile)){
  write(regFile,
`export const WIDGET_TEMPLATES = [
  { id:"globalCalendar", title:"Global Calendar", category:"Scheduling", template:"valuePlusSpark", help:"Upcoming BEO/REO events with status, covers, time.", unit:"", sim:{base:1} },
  { id:"styleController", title:"Style Controller", category:"Design", template:"bigNumber", help:"Global shadows, radii, tabs, accent & themes + text sizes.", unit:"", sim:{base:1} },
];
export const DEFAULT_WIDGETS = [];
`);
} else {
  patch(regFile, (src)=>{
    let s = src;
    if (!s.includes(`id:"globalCalendar"`)){
      s = s.replace(/WIDGET_TEMPLATES\s*=\s*\[/,
        `WIDGET_TEMPLATES = [\n  { id:"globalCalendar", title:"Global Calendar", category:"Scheduling", template:"valuePlusSpark", help:"Upcoming BEO/REO events with status, covers, time.", unit:"", sim:{base:1} },`);
    }
    if (!s.includes(`id:"styleController"`)){
      s = s.replace(/WIDGET_TEMPLATES\s*=\s*\[/,
        `WIDGET_TEMPLATES = [\n  { id:"styleController", title:"Style Controller", category:"Design", template:"bigNumber", help:"Global shadows, radii, tabs, accent & themes + text sizes.", unit:"", sim:{base:1} },`);
    }
    return s;
  });
}

/* 4) create widgets if missing (compact versions) */
const calFile = path.join(widgetsDir, "GlobalCalendarWidget.jsx");
const styleFile = path.join(widgetsDir, "StyleControllerWidget.jsx");

function writeIfMissingCompact(file, content){ if (!fs.existsSync(file)) write(file, content); else log(`= ${rel(file)} (exists)`); }

writeIfMissingCompact(calFile, `import React,{useEffect,useMemo,useState}from"react";
const C={PROPOSAL:"bg-cyan-500/30 text-cyan-200 ring-cyan-400/40",CONTRACT:"bg-emerald-500/30 text-emerald-200 ring-emerald-400/40",UPDATE:"bg-amber-500/30 text-amber-100 ring-amber-400/40",POPUP:"bg-fuchsia-500/30 text-fuchsia-100 ring-fuchsia-400/40",CHANGE:"bg-rose-500/30 text-rose-100 ring-rose-400/40"};
export default function GlobalCalendarWidget({max=6}){const[events,setEvents]=useState([]);useEffect(()=>{const r=localStorage.getItem("lu:events");if(!r){const d=[{id:"e1",type:"BEO",number:"BEO-2025-104",status:"CONTRACT",covers:120,startISO:new Date(Date.now()+3600e3).toISOString(),title:"Corporate Mixer"}];localStorage.setItem("lu:events",JSON.stringify(d));setEvents(d);}else{try{setEvents(JSON.parse(r));}catch{}}const up=e=>{if(!e?.detail)return;setEvents(cur=>{const i=cur.findIndex(x=>x.id===e.detail.id);const n=i>=0?(cur.map((x,ix)=>ix===i?{...x,...e.detail}:x)):([...cur,e.detail]);localStorage.setItem("lu:events",JSON.stringify(n));return n;});};window.addEventListener("echo-events-upsert",up);return()=>window.removeEventListener("echo-events-upsert",up);},[]);const list=useMemo(()=>[...events].sort((a,b)=>new Date(a.startISO)-new Date(b.startISO)).slice(0,max),[events,max]);return(<div className="rounded-2xl p-3 border border-white/12 bg-white/5 shadow-[0_10px_40px_rgba(0,0,0,.35),inset_0_0_0_1px_rgba(255,255,255,.04)]"><div className="flex items-center justify-between mb-2"><div className="font-semibold">Global Calendar</div><button className="text-xs px-2 h-7 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10" onClick={()=>window.dispatchEvent(new CustomEvent("open-panel",{detail:{id:"calendar",title:"Global Calendar"}}))}>Open</button></div><ul className="space-y-2">{list.map(ev=>(<li key={ev.id} className="group p-2 rounded-xl border border-white/10 hover:bg-white/7 flex items-center gap-3 cursor-pointer" onClick={()=>window.dispatchEvent(new CustomEvent("open-panel",{detail:{id:"beo",number:ev.number,title:ev.title}}))}><span className={\`text-[11px] px-2 py-0.5 rounded-full ring-1 \${C[ev.status]||"bg-white/10 text-white/80 ring-white/20"}\`}>{ev.status}</span><div className="flex-1 min-w-0"><div className="text-sm truncate">{ev.title||\`\${ev.type} \${ev.number}\`}</div><div className="text-[11px] opacity-75">{new Date(ev.startISO).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"})} • {ev.type} {ev.number} • {ev.covers} covers</div></div><span className="text-[11px] opacity-70">{new Date(ev.startISO).toLocaleDateString([],{month:"short",day:"numeric"})}</span></li>))}{list.length===0&&<li className="text-sm opacity-70">No upcoming events.</li>}</ul></div>);}` );

writeIfMissingCompact(styleFile, `import React,{useEffect,useState}from"react";const KEY="lu:design:vars";const DEF={"--panel-radius":"16px","--panel-ring":"0 0 0 1px rgba(255,255,255,.06)","--panel-shadow":"0 22px 80px rgba(0,0,0,.45), 0 0 22px rgba(22,224,255,.16)","--panel-bg":"rgba(15,19,28,0.9)","--panel-bg-subtle":"rgba(255,255,255,0.05)","--accent":"#16E0FF","--tab-height":"36px","--tab-radius":"10px","--tab-active-bg":"rgba(255,255,255,0.10)","--tab-border":"1px solid rgba(255,255,255,0.12)","--mode":"dark","--text-xs":"11px","--text-sm":"13px","--text-md":"15px","--text-lg":"18px","--text-xl":"24px"};export default function StyleControllerWidget(){const[v,setV]=useState(()=>{try{return{...DEF,...JSON.parse(localStorage.getItem(KEY)||"{}")}}catch{return DEF}});useEffect(()=>{const r=document.documentElement;Object.entries(v).forEach(([k,val])=>r.style.setProperty(k,val));},[v]);const save=()=>{localStorage.setItem(KEY,JSON.stringify(v));window.dispatchEvent(new CustomEvent("lu:design:updated",{detail:v}));};const set=k=>e=>setV(x=>({...x,[k]:e.target.value}));return(<div className="rounded-2xl p-3 border border-white/12 bg-white/5"><div className="font-semibold mb-2">Style Controller</div><div className="grid gap-3" style={{gridTemplateColumns:"1fr 1fr"}}><L label="Accent"><input className="settings-input" value={v["--accent"]} onChange={set("--accent")}/></L><L label="Panel radius"><input className="settings-input" value={v["--panel-radius"]} onChange={set("--panel-radius")}/></L><L label="Tab height"><input className="settings-input" value={v["--tab-height"]} onChange={set("--tab-height")}/></L><L label="Tab active bg"><input className="settings-input" value={v["--tab-active-bg"]} onChange={set("--tab-active-bg")}/></L><L label="Mode"><select className="settings-input" value={v["--mode"]} onChange={set("--mode")}><option>dark</option><option>light</option><option>auto</option></select></L><L label="Panel bg"><input className="settings-input" value={v["--panel-bg"]} onChange={set("--panel-bg")}/></L></div><div className="mt-3 font-medium">Text sizes</div><div className="grid gap-3" style={{gridTemplateColumns:"repeat(5,1fr)"}}>{["--text-xs","--text-sm","--text-md","--text-lg","--text-xl"].map(k=>(<L key={k} label={k.replace("--text-","text-")}><input className="settings-input" value={v[k]} onChange={set(k)}/></L>))}</div><div className="flex gap-2 mt-3"><button className="dw-btn dw-btn--primary px-3 py-1 rounded" onClick={save}>Apply</button><button className="dw-btn px-3 py-1 rounded" onClick={()=>setV(DEF)}>Reset</button></div><div className="mt-2 text-xs opacity-70">Use font-size: var(--text-md) etc across panels.</div></div>);}function L({label,children}){return(<label className="flex flex-col gap-1"><span className="text-xs opacity-80">{label}</span>{children}</label>);}` );

console.log("\\n✓ Install complete.");
console.log("Run from anywhere:");
console.log("  node scripts/install-hud-additions.mjs\\n");
console.log("Then:");
console.log("  1) In HUD state file:  import { useHudAddListener } from \\"@/lib/hudBus\\"; useHudAddListener(setHudWidgets);");
console.log("  2) Import tokens once: import \\"@/lib/textVars.css\\";\\n");
