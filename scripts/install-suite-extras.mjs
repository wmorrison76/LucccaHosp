import fs from "fs";
import path from "path";

const ROOT = path.resolve(process.argv[2] || ".");
const changes = [];

function rel(p){ return path.relative(ROOT,p); }
function ensureDir(p){ fs.mkdirSync(p,{recursive:true}); }
function writeOnce(file, content){
  if (!fs.existsSync(file)) {
    ensureDir(path.dirname(file));
    fs.writeFileSync(file, content, "utf8");
    changes.push({type:"write", file});
  }
}
function backupWrite(file, content){
  ensureDir(path.dirname(file));
  if (fs.existsSync(file)) {
    const bak = file + ".bak_extras";
    try { fs.copyFileSync(file, bak); } catch {}
  }
  fs.writeFileSync(file, content, "utf8");
  changes.push({type:"patch", file});
}
function patchFile(file, mutator){
  if (!fs.existsSync(file)) return false;
  const before = fs.readFileSync(file,"utf8");
  const after = mutator(before);
  if (after !== before){
    const bak = file + ".bak_extras";
    try { fs.copyFileSync(file, bak);} catch{}
    fs.writeFileSync(file, after, "utf8");
    changes.push({type:"patch", file});
    return true;
  }
  return false;
}

function findSrc(root){
  const a = path.join(root,"frontend","src");
  const b = path.join(root,"src");
  if (fs.existsSync(a)) return a;
  if (fs.existsSync(b)) return b;
  throw new Error("Can't find src. Tried: " + a + " and " + b);
}

const SRC = findSrc(ROOT);

// ──────────────────────────────────────────────────────────────
// 1) Settings tabs (About & Support / General / Notifications)
// ──────────────────────────────────────────────────────────────
const SETTINGS_DIR = path.join(SRC,"settings");

writeOnce(path.join(SETTINGS_DIR,"AboutSupport.jsx"), `import React from "react";

export default function AboutSupport(){
  const ver = (import.meta?.env?.VITE_APP_VERSION) || "dev";
  const built = (import.meta?.env?.VITE_BUILD) || "";
  return (
    <div className="dw-panel p-4">
      <h2 className="text-lg mb-2">About & Support</h2>
      <div className="opacity-80 text-sm">
        <div><b>Version:</b> {ver} {built && <>• <span className="opacity-70">{built}</span></>}</div>
        <div className="mt-2">Need help? Email <a className="underline" href="mailto:support@luccca.app">support@luccca.app</a></div>
        <div className="mt-2">Docs: <a className="underline" href="https://example.com/docs" target="_blank" rel="noreferrer">User Guide</a></div>
        <div className="mt-4 text-xs opacity-70">© {new Date().getFullYear()} LUCCCA. All rights reserved.</div>
      </div>
    </div>
  );
}
`);

writeOnce(path.join(SETTINGS_DIR,"GeneralPanel.jsx"), `import React,{useEffect,useState} from "react";
const KEY="lu:general:v1";
const DEF={ language:"en-US", dateFormat:"MMM d, yyyy", timeFormat:"h:mm a", reduceMotion:false };

export default function GeneralPanel(){
  const [v,setV]=useState(()=>{ try{ return {...DEF, ...(JSON.parse(localStorage.getItem(KEY)||"{}"))}; }catch{ return DEF; }});
  useEffect(()=>{ localStorage.setItem(KEY, JSON.stringify(v)); 
    // bubble to theme engine if reduceMotion is toggled
    try{ const evt=new CustomEvent("design-commit",{detail:{reduceMotion:v.reduceMotion}}); window.dispatchEvent(evt);}catch{}
  },[v]);
  return (
    <div className="dw-panel p-4">
      <h2 className="text-lg mb-2">General</h2>
      <div className="grid gap-3" style={{gridTemplateColumns:"220px 1fr"}}>
        <label className="flex items-center gap-2"><span className="w-36 opacity-70 text-sm">Language</span>
          <input className="settings-input" value={v.language} onChange={e=>setV(s=>({...s,language:e.target.value}))}/>
        </label>
        <label className="flex items-center gap-2"><span className="w-36 opacity-70 text-sm">Date format</span>
          <input className="settings-input" value={v.dateFormat} onChange={e=>setV(s=>({...s,dateFormat:e.target.value}))}/>
        </label>
        <label className="flex items-center gap-2"><span className="w-36 opacity-70 text-sm">Time format</span>
          <input className="settings-input" value={v.timeFormat} onChange={e=>setV(s=>({...s,timeFormat:e.target.value}))}/>
        </label>
        <label className="flex items-center gap-2"><span className="w-36 opacity-70 text-sm">Reduce motion</span>
          <input type="checkbox" checked={v.reduceMotion} onChange={e=>setV(s=>({...s,reduceMotion:e.target.checked}))}/>
        </label>
      </div>
    </div>
  );
}
`);

writeOnce(path.join(SETTINGS_DIR,"NotificationsPanel.jsx"), `import React,{useEffect,useState} from "react";
const KEY="lu:notify:v1";
const DEF={ toasts:true, sounds:false, email:false };

export default function NotificationsPanel(){
  const [v,setV]=useState(()=>{ try{ return {...DEF, ...(JSON.parse(localStorage.getItem(KEY)||"{}"))}; }catch{ return DEF; }});
  useEffect(()=>{ localStorage.setItem(KEY, JSON.stringify(v));
    try{ window.dispatchEvent(new CustomEvent("notify-settings-changed",{detail:v})); }catch{}
  },[v]);
  const T=(p,l)=>(<label className="flex items-center gap-2"><span className="w-40 opacity-70 text-sm">{l}</span><input type="checkbox" checked={v[p]} onChange={e=>setV(s=>({...s,[p]:e.target.checked}))}/></label>);
  return (
    <div className="dw-panel p-4">
      <h2 className="text-lg mb-2">Notifications</h2>
      <div className="grid gap-3">{T("toasts","Show toasts")}{T("sounds","Play sounds")}{T("email","Email me updates")}</div>
      <div className="text-xs opacity-60 mt-3">Apps can read these via the <code>notify-settings-changed</code> event.</div>
    </div>
  );
}
`);

// ──────────────────────────────────────────────────────────────
// 2) Accessibility + tokens: high-contrast & text scale
// ──────────────────────────────────────────────────────────────
const TOK = path.join(SRC,"lib","themeTokens.css");
const TOK_ADD = `
:root{
  --text-scale: 1;
  --hc: 0; /* 0=normal,1=high-contrast */
}
:root[data-high-contrast="on"]{
  --hc: 1;
  --panel-ring: 0 0 0 2px rgba(255,255,255,.6);
  --panel-shadow: 0 24px 90px rgba(0,0,0,.6), 0 0 0 1px rgba(255,255,255,.25) inset;
}
.text-scale{ font-size: calc(var(--font-md) * var(--text-scale)); }
`;
if (fs.existsSync(TOK)) patchFile(TOK, s=> s.includes("--text-scale") ? s : (s+"\n"+TOK_ADD));

const ENG = path.join(SRC,"lib","themeEngine.js");
patchFile(ENG, (txt)=>{
  if (txt.includes("textScale")) return txt; // already patched
  return txt.replace(/const DEFAULTS\s*=\s*\{([^}]+)\}/, (m, body)=>{
    const withNew = body.trim().replace(/\s*$/, ",") + ` "textScale":1, "highContrast":false `;
    return `const DEFAULTS={${withNew}}`;
  }).replace(/initTheme\(\)\s*\{/, `initTheme(){`)
    .replace(/applyVars\(merged\);/, `applyVars(merged);
  if (merged.highContrast){ document.documentElement.setAttribute("data-high-contrast","on"); }
  else { document.documentElement.removeAttribute("data-high-contrast"); }
  if (merged.textScale){ document.documentElement.style.setProperty("--text-scale", String(merged.textScale)); }`)
    .replace(/export function previewTheme\(next\)\{([^}]+)\}/,
`export function previewTheme(next){
  if (next.mode) document.documentElement.dataset.mode = next.mode;
  if (typeof next.highContrast === "boolean"){
    if (next.highContrast) document.documentElement.setAttribute("data-high-contrast","on");
    else document.documentElement.removeAttribute("data-high-contrast");
  }
  if (next.textScale){ document.documentElement.style.setProperty("--text-scale", String(next.textScale)); }
  applyVars(next);
}`);
});

// global hotkey (Alt+Shift+A) to toggle high-contrast
const MAIN = path.join(SRC,"main.tsx");
patchFile(MAIN, (s)=>{
  if (!/initTheme\(\);/.test(s)) return s; // assume our theme engine present
  if (/addEventListener\(['"]keydown['"].*high-contrast/.test(s)) return s;
  return s.replace(/initTheme\(\);\n/, `initTheme();
  window.addEventListener("keydown", (e)=>{ if (e.altKey && e.shiftKey && e.key.toLowerCase()==="a"){
    try{
      const cur = document.documentElement.getAttribute("data-high-contrast")==="on";
      const evt = new CustomEvent("design-commit",{detail:{highContrast:!cur}});
      window.dispatchEvent(evt);
    }catch{}
  }});\n`);
});

// design-commit listener into theme engine (if not already)
patchFile(ENG, (s)=>{
  if (s.includes("window.addEventListener(\"design-commit\"")) return s;
  return s + `

try{
  window.addEventListener("design-commit",(e)=>{
    const d = (e && e.detail) || {};
    // merge and commit
    const cur = (function(){ try{ return JSON.parse(localStorage.getItem(KEY)||"{}"); }catch{return{}} })();
    const merged = {...DEFAULTS, ...cur, ...d};
    localStorage.setItem(KEY, JSON.stringify(merged));
    // apply immediately
    if (typeof d.highContrast==="boolean"){
      if (d.highContrast) document.documentElement.setAttribute("data-high-contrast","on");
      else document.documentElement.removeAttribute("data-high-contrast");
    }
    if (d.textScale) document.documentElement.style.setProperty("--text-scale", String(d.textScale));
    applyVars(d);
  });
}catch{}
`;
});

// ──────────────────────────────────────────────────────────────
// 3) RescueShell (error boundary) and wrap in main.tsx
// ──────────────────────────────────────────────────────────────
const RESCUE = path.join(SRC,"components","RescueShell.jsx");
writeOnce(RESCUE, `import React from "react";

export default class RescueShell extends React.Component{
  constructor(p){ super(p); this.state={err:null, info:null}; }
  static getDerivedStateFromError(err){ return {err}; }
  componentDidCatch(err,info){ console.error("[RescueShell]", err, info); this.setState({info}); }
  render(){
    const {err,info} = this.state;
    if (!err) return this.props.children;
    return (
      <div style={{position:"fixed",inset:0,background:"rgba(5,8,14,.90)",backdropFilter:"blur(6px)",color:"#fff",display:"grid",placeItems:"center",zIndex:99999}}>
        <div className="dw-panel p-6" style={{maxWidth:680}}>
          <h2 className="text-lg mb-2">Something went wrong</h2>
          <div className="text-sm opacity-80">The UI recovered so you can keep working.</div>
          <pre className="mt-3 p-3 rounded bg-[rgba(255,255,255,.06)] text-xs overflow-auto" style={{maxHeight:240}}>
{String(err)}
{info?.componentStack||""}
          </pre>
          <div className="mt-3 flex gap-2">
            <button className="dw-btn dw-btn--primary px-3 py-1 rounded" onClick={()=>location.reload()}>Reload</button>
            <button className="dw-btn px-3 py-1 rounded" onClick={()=>this.setState({err:null,info:null})}>Dismiss</button>
          </div>
        </div>
      </div>
    );
  }
}
`);

patchFile(MAIN, (s)=>{
  if (!s.includes("RescueShell")) {
    s = s.replace(/import\s+App\s+from\s+["'][^"']+["'];?/, (m)=> m + `\nimport RescueShell from "./components/RescueShell.jsx";`);
  }
  if (/<App\s*\/>/.test(s) && !/RescueShell/.test(s.match(/render\([\s\S]*$/)[0])){
    s = s.replace(/<App\s*\/>/, `<RescueShell>\n        <App />\n      </RescueShell>`);
  }
  return s;
});

// ──────────────────────────────────────────────────────────────
// 4) SettingsSuite wiring (register new tabs if file exists)
// ──────────────────────────────────────────────────────────────
const SUITE = path.join(SRC,"settings","SettingsSuite.jsx");
if (fs.existsSync(SUITE)) {
  patchFile(SUITE, (s)=>{
    let t=s;
    if (!t.includes("AboutSupport")) t = t.replace(/from\s+"\.\/StyleControlPanel";?/, m=> `${m}\nimport AboutSupport from "./AboutSupport";`);
    if (!t.includes("GeneralPanel")) t = t.replace(/import AboutSupport.*\n?/, (m)=> m + `import GeneralPanel from "./GeneralPanel";\n`);
    if (!t.includes("NotificationsPanel")) t = t.replace(/import GeneralPanel.*\n?/, (m)=> m + `import NotificationsPanel from "./NotificationsPanel";\n`);
    // naive menu injection
    if (!/label:\s*["']About & Support["']/.test(t)){
      t = t.replace(/(const\s+TABS\s*=\s*\[)/, `$1\n  { id:"about", label:"About & Support", node: <AboutSupport/> },\n  { id:"general", label:"General", node:<GeneralPanel/> },\n  { id:"notifications", label:"Notifications", node:<NotificationsPanel/> },`);
    }
    return t;
  });
}

// ──────────────────────────────────────────────────────────────
// 5) Small CSS size tweak for HUD card titles/subtitles
// ──────────────────────────────────────────────────────────────
const UTIL = path.join(SRC,"styles","utilities.css");
const UTIL_ADD = `
.hud-card .title{ font-size: var(--font-md); }
.hud-card .subtitle{ font-size: var(--font-sm); color: rgba(255,255,255,.75); }
.settings-input{ background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.18); padding:.4rem .55rem; border-radius:10px; }
`;
if (fs.existsSync(UTIL)) patchFile(UTIL, s=> s.includes(".hud-card .title") ? s : (s+"\n"+UTIL_ADD));

// ──────────────────────────────────────────────────────────────
// 6) Revert writer
// ──────────────────────────────────────────────────────────────
const REVERT = path.join(ROOT,"scripts","revert-suite-extras.mjs");
writeOnce(REVERT, `import fs from "fs"; import path from "path";
const ROOT = path.resolve(process.argv[2] || ".");
function walk(dir){ for(const n of fs.readdirSync(dir)){ const p=path.join(dir,n);
  const s=fs.statSync(p); if(s.isDirectory()) walk(p); else if(p.endsWith(".bak_extras")){
    const target=p.replace(/\\.bak_extras$/,""); try{ fs.copyFileSync(p,target); console.log("reverted", target); }catch{}
  }}}
walk(ROOT);
console.log("Done.");
`);

// ──────────────────────────────────────────────────────────────
console.log("✓ Extras installed.");
for (const c of changes) console.log(" •", c.type, rel(c.file));
console.log("\nNext steps:");
console.log("  cd \""+path.join(ROOT,'frontend')+"\" && rm -rf node_modules/.vite");
console.log("  pnpm dev    # or npm run dev / yarn dev");
console.log("\nTips:");
console.log("  • Toggle high-contrast anytime: Alt+Shift+A");
console.log("  • Open the Settings Suite from code: window.dispatchEvent(new CustomEvent('open-panel',{detail:{id:'settings-suite'}}))");
