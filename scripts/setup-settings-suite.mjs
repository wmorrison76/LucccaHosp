import fs from "fs";
import path from "path";

// -------- helpers ----------
const ROOT = path.resolve(process.argv[2] || ".");
function die(m){ console.error("✗", m); process.exit(1); }
function ok(...m){ console.log("•", ...m); }
function rel(p){ return path.relative(ROOT, p); }

function findSrc(root) {
  const a = path.join(root, "frontend", "src");
  const b = path.join(root, "src");
  if (fs.existsSync(a)) return a;
  if (fs.existsSync(b)) return b;
  die(`Can't find src folder. Tried ${a} and ${b}`);
}
const SRC = findSrc(ROOT);
const CMP = path.join(SRC, "components");
const LIB = path.join(SRC, "lib");
const STY = path.join(SRC, "styles");
const SET = path.join(SRC, "settings");

const changed = [];
function ensure(dir){ fs.mkdirSync(dir, { recursive: true }); }
function writeFileSafe(file, content) {
  ensure(path.dirname(file));
  if (fs.existsSync(file)) {
    const bk = file + ".bak_setup";
    try { fs.copyFileSync(file, bk); changed.push(["backup", bk]); } catch {}
  }
  fs.writeFileSync(file, content, "utf8");
  changed.push(["write", file]);
  ok("wrote", rel(file));
}
function patchFile(file, mutate) {
  if (!fs.existsSync(file)) return false;
  const before = fs.readFileSync(file, "utf8");
  const after = mutate(before);
  if (before !== after) {
    const bk = file + ".bak_setup";
    try { fs.copyFileSync(file, bk); changed.push(["backup", bk]); } catch {}
    fs.writeFileSync(file, after, "utf8");
    changed.push(["patch", file]);
    ok("patched", rel(file));
    return true;
  } else {
    console.log("=", rel(file), "(no changes)");
    return false;
  }
}

// -------- 1) lib: tokens / utilities / themeEngine ----------
ensure(LIB);
ensure(STY);

const TOKENS = `:root{
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
`;
const UTIL = `.no-scrollbar{scrollbar-width:none}.no-scrollbar::-webkit-scrollbar{display:none}
.dw-input{display:block;width:100%;border-radius:10px;border:1px solid rgba(255,255,255,.22);background:rgba(255,255,255,.06);color:var(--text-strong);padding:.5rem .65rem}
.dw-btn{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.18);color:var(--text-strong)}
.dw-btn--primary{background:var(--accent);border-color:transparent;color:#041318}
`;

const THEME = `const KEY="lu:design:theme:v2";
const DEFAULTS={"--font-xs":"11px","--font-sm":"13px","--font-md":"15px","--font-lg":"18px","--font-xl":"24px","--accent":"#16E0FF",mode:"auto"};
function html(){return typeof document!=="undefined"?document.documentElement:null;}
function setVar(k,v){const r=html(); if(r) r.style.setProperty(k,String(v));}
function applyVars(vars){try{Object.entries(vars).forEach(([k,v])=>k&&k.startsWith("--")&&setVar(k,v));}catch(e){console.warn("[theme] applyVars skipped:",e);}}
function readVars(){try{return JSON.parse(localStorage.getItem(KEY)||"{}")||{}}catch{return{}}}
function writeVars(next){try{localStorage.setItem(KEY,JSON.stringify(next));}catch(e){console.warn("[theme] persist skipped:",e);}}
function setModeAttr(m){const r=html(); if(r) r.dataset.mode=m||"auto";}
export function initTheme(){const run=()=>{const saved=readVars();const merged={...DEFAULTS,...saved};setModeAttr(merged.mode);applyVars(merged);return merged;}; if(!html()){if(typeof window!=="undefined"){window.requestAnimationFrame(run);} return DEFAULTS;} return run();}
export function previewTheme(next={}){if(!next||typeof next!=="object")return; if(next.mode) setModeAttr(next.mode); applyVars(next);}
export function commitTheme(next={}){const merged={...readVars(),...next}; writeVars(merged); previewTheme(merged);}
export function resetTheme(){try{localStorage.removeItem(KEY);}catch{} previewTheme(DEFAULTS);}
`;

writeFileSafe(path.join(LIB, "themeTokens.css"), TOKENS);
writeFileSafe(path.join(STY, "utilities.css"), UTIL);
writeFileSafe(path.join(LIB, "themeEngine.js"), THEME);

// -------- 2) AvatarPicker ----------
ensure(CMP);
const AVATAR = `import React,{useMemo,useState,useEffect} from "react";
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
`;
writeFileSafe(path.join(CMP, "AvatarPicker.jsx"), AVATAR);

// -------- 3) Settings Suite (self-contained overlay) ----------
ensure(SET);
const SUITE = `import React,{useState} from "react";
import StyleControlPanel from "@/components/StyleControlPanel";
import AvatarPicker from "@/components/AvatarPicker";
export default function SettingsSuite(){
  const [tab,setTab]=useState("appearance");
  return (
    <div style={{position:"fixed",inset:0,zIndex:60,display:"grid",placeItems:"center",background:"rgba(0,0,0,.45)",backdropFilter:"blur(6px)"}}>
      <div className="dw-panel" style={{width:960,maxWidth:"92vw",maxHeight:"88vh",overflow:"hidden"}}>
        <div style={{display:"grid",gridTemplateColumns:"220px 1fr"}}>
          <aside style={{padding:14,borderRight:"1px solid rgba(255,255,255,.12)"}}>
            <div className="text-lg font-semibold mb-2">Settings</div>
            <nav className="dw-tabs" style={{flexDirection:"column",gap:6}}>
              {[
                ["appearance","Appearance"],
                ["typography","Typography"],
                ["tabs","Tabs"],
                ["profile","Profile"],
                ["about","About & Support"],
              ].map(([id,label])=>(
                <button key={id} className="dw-tab" aria-selected={tab===id} onClick={()=>setTab(id)}>{label}</button>
              ))}
              <button className="dw-tab" onClick={()=>closeOverlay()}>Close</button>
            </nav>
          </aside>
          <main style={{padding:18,overflow:"auto"}}>
            {tab==="appearance" && <div className="dw-panel p-4"><StyleControlPanel/></div>}
            {tab==="typography" && <TypographyPanel/>}
            {tab==="tabs" && <TabsStylePanel/>}
            {tab==="profile" && <ProfilePanel/>}
            {tab==="about" && <AboutPanel/>}
          </main>
        </div>
      </div>
    </div>
  );
}
export function closeOverlay(){ window.dispatchEvent(new CustomEvent("settings-suite:close")); }
function Row({label,children}){return(<label className="flex flex-col gap-1"><span className="text-sm opacity-80">{label}</span>{children}</label>);}

function TypographyPanel(){
  const keys=["--font-xs","--font-sm","--font-md","--font-lg","--font-xl"];
  const [vals,setVals]=React.useState(()=>Object.fromEntries(keys.map(k=>[k,getComputedStyle(document.documentElement).getPropertyValue(k).trim()||""])));
  const set=(k)=>(e)=>{const v=e.target.value;document.documentElement.style.setProperty(k,v);setVals(s=>({...s,[k]:v}));};
  return(<div className="dw-panel p-4">
    <div className="text-lg font-semibold mb-2">Typography</div>
    <div className="grid" style={{gridTemplateColumns:"repeat(5,minmax(0,1fr))",gap:12}}>
      {keys.map(k=><Row key={k} label={k.replace("--","")}><input className="dw-input" value={vals[k]} onChange={set(k)}/></Row>)}
    </div>
    <div className="text-xs opacity-70 mt-2">Panels should use font-size: var(--font-md) etc.</div>
  </div>);
}
function TabsStylePanel(){
  const keys={"--tab-height":"36px","--tab-radius":"10px","--tab-active-bg":"rgba(255,255,255,.10)","--tab-border":"1px solid rgba(255,255,255,.16)"};
  const [vals,setVals]=React.useState(()=>Object.fromEntries(Object.keys(keys).map(k=>[k,getComputedStyle(document.documentElement).getPropertyValue(k).trim()||keys[k]])));
  const set=(k)=>(e)=>{const v=e.target.value;document.documentElement.style.setProperty(k,v);setVals(s=>({...s,[k]:v}));};
  return(<div className="dw-panel p-4">
    <div className="text-lg font-semibold mb-2">Tabs</div>
    <div className="grid" style={{gridTemplateColumns:"repeat(4,minmax(0,1fr))",gap:12}}>
      {Object.keys(keys).map(k=><Row key={k} label={k.replace("--","")}><input className="dw-input" value={vals[k]} onChange={set(k)}/></Row>)}
    </div>
  </div>);
}
function ProfilePanel(){
  return(<div className="dw-panel p-4">
    <div className="text-lg font-semibold mb-2">Profile</div>
    <div className="text-sm opacity-80 mb-2">Echo avatar (F/M/B/R) or upload your own:</div>
    <AvatarPicker/>
  </div>);
}
function AboutPanel(){
  return(<div className="dw-panel p-4">
    <div className="text-xl font-semibold mb-2">About & Support</div>
    <div className="opacity-80 text-sm space-y-1">
      <div>Version: <strong>0.1.0</strong></div>
      <div>Build: <strong>{import.meta?.env?.MODE ?? "dev"}</strong></div>
      <div>Support: <a className="underline" href="mailto:support@example.com">support@example.com</a></div>
    </div>
  </div>);
}
`;

const STYLE_PANEL = `import React,{useEffect,useState} from "react";
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
  </div>);}
`;

writeFileSafe(path.join(CMP, "StyleControlPanel.jsx"), STYLE_PANEL);
writeFileSafe(path.join(SET, "SettingsSuite.jsx"), SUITE);

// -------- 4) Launcher: auto-mounted overlay via event ----------
const BOOT = `import React from "react";
import { createRoot } from "react-dom/client";
import SettingsSuite, { closeOverlay } from "./SettingsSuite.jsx";

let root=null, host=null;
function open(){ 
  if (!host){ host=document.createElement("div"); host.id="settings-suite-root"; document.body.appendChild(host); }
  if (!root){ root=createRoot(host); }
  root.render(<SettingsSuite/>);
}
function close(){
  if (root){ root.unmount(); root=null; }
  if (host){ host.remove(); host=null; }
}

export function registerSettingsOverlay(){
  window.addEventListener("open-panel", (e)=>{
    const id = e?.detail?.id;
    if (id==="settings-suite") open();
  });
  window.addEventListener("settings-suite:close", close);
}
`;
writeFileSafe(path.join(SET, "bootSettingsSuite.jsx"), BOOT);

// -------- 5) main.tsx patch: imports + init + register overlay ----------
const MAIN_TSX = ["main.tsx","main.jsx"].map(n=>path.join(SRC,n)).find(fs.existsSync);
if (!MAIN_TSX) {
  console.warn("! Could not find src/main.tsx or src/main.jsx; skipping main patch.");
} else {
  patchFile(MAIN_TSX, (s)=>{
    if (!s.includes('lib/themeTokens.css')) s = s.replace(/import\s+["']\.\/index\.css["'];?\s*/,'$&import "./lib/themeTokens.css";\n');
    if (!s.includes('styles/utilities.css')) s = s.replace(/import\s+["']\.\/index\.css["'];?\s*/,'$&import "./styles/utilities.css";\n');
    if (!s.includes('initTheme')) s = s.replace(/from\s+"\.\/echo\/echoClient\.js";?/, 'from "./echo/echoClient.js";\nimport { initTheme } from "./lib/themeEngine.js";');
    if (!s.includes('registerSettingsOverlay')) s = s.replace(/from\s+"\.\/echo\/echoClient\.js";?/, 'from "./echo/echoClient.js";\nimport { registerSettingsOverlay } from "./settings/bootSettingsSuite.jsx";');
    // call initTheme before render
    if (!/initTheme\(\)/.test(s)) {
      s = s.replace(/console\.log\(\[?["']main["'].*?\);\s*/s, '$&\n  try { initTheme(); } catch(e) { console.warn("[theme] init skipped:", e?.message||e); }\n');
    }
    // call register overlay once (after DOMContentLoaded path or inside boot)
    if (/function\s+boot\s*\(/.test(s) && !s.includes('registerSettingsOverlay()')) {
      s = s.replace(/installEchoHook.*?\}\);?\s*\}\s*catch[\s\S]*?\}\s*/s, (m)=> m + '\n  try { registerSettingsOverlay(); } catch(_) {}\n');
    } else if (!s.includes('registerSettingsOverlay()')) {
      s = s.replace(/createRoot\(.*?\)\.render\(/s, 'registerSettingsOverlay();\n$&');
    }
    return s;
  });
}

// -------- 6) index.html: main.tsx entry ----------
const IDX = [path.join(ROOT,"frontend","index.html"), path.join(ROOT,"index.html")].find(fs.existsSync);
if (IDX) {
  patchFile(IDX, (s)=> s.replace(/\/src\/main\.jsx/g, "/src/main.tsx"));
} else {
  console.warn("! Could not find index.html to patch entry path.");
}

// -------- 7) Rename "About" label where id='about' ----------
function renameAboutInDir(dir){
  const exts = new Set([".jsx",".tsx",".js",".ts"]);
  for (const name of fs.readdirSync(dir)){
    const f = path.join(dir, name);
    const st = fs.statSync(f);
    if (st.isDirectory()) { renameAboutInDir(f); continue; }
    if (!exts.has(path.extname(f))) continue;
    patchFile(f, (text)=>{
      let next = text.replace(
        /<NavItem([^>]*?)label\s*=\s*["']About["']([^>]*?)id\s*=\s*["']about["']([^>]*)\/?>/g,
        (_m,a,b,c)=>`<NavItem${a}label="About & Support"${b}id="about"${c}/>`
      );
      next = next.replace(
        /<NavItem([^>]*?)id\s*=\s*["']about["']([^>]*?)label\s*=\s*["']About["']([^>]*)\/?>/g,
        (_m,a,b,c)=>`<NavItem${a}id="about"${b}label="About & Support"${c}/>`
      );
      next = next.replace(
        /(\bid\s*:\s*['"]about['"][^}]*?\blabel\s*:\s*['"])About(['"])/g,
        (_m,pre,suf)=>`${pre}About & Support${suf}`
      ).replace(
        /(\blabel\s*:\s*['"])About(['"][^}]*?\bid\s*:\s*['"]about['"])/g,
        (_m,pre,suf)=>`${pre}About & Support${suf}`
      );
      return next;
    });
  }
}
renameAboutInDir(SRC);

console.log("\n✓ Settings Suite installed.");
console.log("Open it from anywhere in the app with:");
console.log('  window.dispatchEvent(new CustomEvent("open-panel",{ detail:{ id:"settings-suite" }}))');
