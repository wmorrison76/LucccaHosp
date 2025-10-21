import fs from "fs";
import path from "path";

const ROOT = path.resolve(process.argv[2] || ".");
function die(m){ console.error("✗", m); process.exit(1); }
function ok(...m){ console.log("•", ...m); }
function ensure(p){ fs.mkdirSync(p,{recursive:true}); }
function pickSrc(root){
  const A = path.join(root,"frontend","src");
  const B = path.join(root,"src");
  if (fs.existsSync(A)) return A;
  if (fs.existsSync(B)) return B;
  die("Can't find src (tried frontend/src and src).");
}
function patch(file, mutate){
  if (!fs.existsSync(file)) return false;
  const before = fs.readFileSync(file,"utf8");
  const after = mutate(before);
  if (after !== before){
    try { fs.copyFileSync(file, file + ".bak_polish"); } catch {}
    fs.writeFileSync(file, after, "utf8");
    ok("patched", path.relative(ROOT,file));
    return true;
  } else {
    console.log("= ok", path.relative(ROOT,file));
    return false;
  }
}
function writeOnce(file, content){
  if (!fs.existsSync(file)){
    ensure(path.dirname(file));
    fs.writeFileSync(file, content, "utf8");
    ok("created", path.relative(ROOT,file));
  } else {
    console.log("= exists", path.relative(ROOT,file));
  }
}

const SRC = pickSrc(ROOT);
const CMP = path.join(SRC,"components");
const LIB = path.join(SRC,"lib");
const STY = path.join(SRC,"styles");

/* ─────────────────────────────────────────────────────────────
  1) Toast bus + host
────────────────────────────────────────────────────────────── */
writeOnce(path.join(LIB,"toastBus.js"), `export function toast(message, opts={}){
  const detail = { message, type: opts.type||"info", timeout: opts.timeout ?? 3500 };
  window.dispatchEvent(new CustomEvent("toast:push", { detail }));
}`);

writeOnce(path.join(CMP,"ToastHost.jsx"), `import React from "react";
export default function ToastHost(){
  const [toasts, setToasts] = React.useState([]);
  React.useEffect(()=>{
    const onPush = (e)=>{
      const t = { id: Math.random().toString(36).slice(2,8), ...e.detail };
      setToasts(a => a.concat(t));
      if (t.timeout>0) setTimeout(()=>dismiss(t.id), t.timeout);
    };
    const dismiss = (id)=>setToasts(a=>a.filter(x=>x.id!==id));
    window.addEventListener("toast:push", onPush);
    return ()=>window.removeEventListener("toast:push", onPush);
  },[]);
  return (
    <div style={{position:"fixed", right:16, bottom:16, display:"grid", gap:8, zIndex: 4000}}>
      {toasts.map(t=>(
        <div key={t.id} className="dw-panel" style={{
          padding:"10px 12px",
          borderRadius:"12px",
          background:"var(--bg-panel, rgba(12,16,24,.92))",
          color:"var(--text-strong,#eaf7fb)",
          border:"1px solid rgba(255,255,255,.14)",
          minWidth: 240
        }}>
          <div style={{fontSize:"var(--font-sm)"}}>{t.message}</div>
        </div>
      ))}
    </div>
  );
}
`);

patch(path.join(STY,"utilities.css"), (s)=> s.includes(".dw-toast") ? s : s + `
/* (reserved) toast themes */
.dw-toast--success{ border-color:#1ad598 }
.dw-toast--warn{ border-color:#e6b800 }
.dw-toast--error{ border-color:#e64545 }
`);

/* ─────────────────────────────────────────────────────────────
  2) Dock host (minimize/restore panels)
────────────────────────────────────────────────────────────── */
writeOnce(path.join(LIB,"dockBus.js"), `export function dockPanel({id,title,icon}) {
  window.dispatchEvent(new CustomEvent("dock:add",{detail:{id,title,icon}}));
}
export function undockPanel(id){
  window.dispatchEvent(new CustomEvent("dock:remove",{detail:{id}}));
}
export function openDocked(id){
  window.dispatchEvent(new CustomEvent("dock:open",{detail:{id}}));
}`);

writeOnce(path.join(CMP,"DockHost.jsx"), `import React from "react";
export default function DockHost(){
  const [items, setItems] = React.useState([]);
  React.useEffect(()=>{
    const add = (e)=>setItems(a=>{
      const d=e.detail||{}; if(a.find(x=>x.id===d.id)) return a; return a.concat(d);
    });
    const rem = (e)=>setItems(a=>a.filter(x=>x.id!==(e.detail||{}).id));
    const open= (e)=>{ const id=e.detail?.id; if(!id) return;
      window.dispatchEvent(new CustomEvent("open-panel",{detail:{id}}));
    };
    window.addEventListener("dock:add", add);
    window.addEventListener("dock:remove", rem);
    window.addEventListener("dock:open", open);
    return ()=>{ window.removeEventListener("dock:add",add); window.removeEventListener("dock:remove",rem); window.removeEventListener("dock:open",open); };
  },[]);
  if(!items.length) return null;
  return (
    <div className="dw-dock" style={{position:"fixed", left:"50%", transform:"translateX(-50%)", bottom:10, zIndex:3000, display:"flex", gap:8, background:"rgba(4,10,16,.55)", backdropFilter:"blur(8px)", border:"1px solid rgba(255,255,255,.14)", borderRadius:14, padding:"6px 8px"}}>
      {items.map(it=>(
        <button key={it.id} title={it.title||it.id} onClick={()=>window.dispatchEvent(new CustomEvent("dock:open",{detail:{id:it.id}}))}
          style={{width:36,height:36, display:"grid", placeItems:"center", borderRadius:10, background:"var(--tab-bg)", border:"var(--tab-border)"}}>
          {it.icon ? <img alt="" src={it.icon} style={{width:18,height:18}}/> : <span style={{fontSize:12}}>{(it.title||"?").slice(0,2)}</span>}
        </button>
      ))}
    </div>
  );
}
`);

/* ─────────────────────────────────────────────────────────────
  3) Wire ToastHost + DockHost into main.tsx/.jsx (once)
────────────────────────────────────────────────────────────── */
const MAIN = ["main.tsx","main.jsx"].map(n=>path.join(SRC,n)).find(fs.existsSync);
if (MAIN){
  patch(MAIN, (s)=>{
    if (!s.includes('ToastHost')) {
      s = s.replace(/import\s+App\s+from\s+["'][^"']+["'];?/, (m)=> m + `\nimport ToastHost from "./components/ToastHost.jsx";`);
    }
    if (!s.includes('DockHost')) {
      s = s.replace(/import\s+App\s+from\s+["'][^"']+["'];?/, (m)=> m + `\nimport DockHost from "./components/DockHost.jsx";`);
    }
    // mount under App tree
    if (/<App\s*\/>/.test(s) && !/ToastHost/.test(s)) {
      s = s.replace(/<App\s*\/>/, `<App />\n        <ToastHost />\n        <DockHost />`);
    }
    return s;
  });
}

/* ─────────────────────────────────────────────────────────────
  4) Storybook scaffold (minimal, safe)
────────────────────────────────────────────────────────────── */
const SB = path.join(ROOT, ".storybook");
writeOnce(path.join(SB,"main.js"), `module.exports = {
  stories: ['../**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  framework: { name: '@storybook/react-vite', options: {} },
};`);
writeOnce(path.join(SB,"preview.js"), `export const parameters = { layout: 'centered' };`);
writeOnce(path.join(SRC,"components","StyleControlPanel.stories.jsx"), `import React from 'react';
import StyleControlPanel from './StyleControlPanel.jsx';
export default { title: 'Settings/StyleControlPanel', component: StyleControlPanel };
export const Default = () => <div style={{width:960}}><StyleControlPanel /></div>;
`);

const PKG_A = path.join(ROOT,"frontend","package.json");
const PKG_B = path.join(ROOT,"package.json");
const PKG = fs.existsSync(PKG_A) ? PKG_A : (fs.existsSync(PKG_B) ? PKG_B : null);
if (PKG){
  patch(PKG, (txt)=>{
    try{
      const j = JSON.parse(txt);
      j.scripts = j.scripts || {};
      if (!j.scripts.storybook) j.scripts.storybook = "storybook dev -p 6006";
      if (!j.scripts["build-storybook"]) j.scripts["build-storybook"] = "storybook build";
      return JSON.stringify(j,null,2);
    }catch{ return txt; }
  });
} else {
  console.warn("! package.json not found for Storybook scripts (skipping).");
}

console.log("\\n✓ Polish bundle installed.");
console.log("Next:");
console.log("  1) Restart dev:  cd frontend && rm -rf node_modules/.vite && pnpm dev");
console.log("  2) (Optional) Storybook dev:  pnpm storybook   # after installing @storybook/react-vite");
console.log("\\nDock API:");
console.log("  import { dockPanel, undockPanel } from '@/lib/dockBus'");
console.log("  dockPanel({ id:'settings-suite', title:'Settings', icon:'/src/assets/settings.png' })");
console.log("Toast API:");
console.log("  import { toast } from '@/lib/toastBus'");
console.log("  toast('Saved!', { type:'success' })");
