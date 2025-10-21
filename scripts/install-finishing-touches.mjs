import fs from "fs";
import path from "path";

const ROOT = path.resolve(process.argv[2] || ".");
function die(m){ console.error("✗",m); process.exit(1); }
function ok(...m){ console.log("•",...m); }
function ensure(p){ fs.mkdirSync(p,{recursive:true}); }
function patch(file, mut){
  if(!fs.existsSync(file)) return false;
  const before = fs.readFileSync(file,"utf8");
  const after = mut(before);
  if (after !== before){
    try{ fs.copyFileSync(file, file+".bak_finish"); }catch{}
    fs.writeFileSync(file, after, "utf8");
    ok("patched", path.relative(ROOT,file));
    return true;
  }
  console.log("= ok", path.relative(ROOT,file));
  return false;
}
function findSrc(root){
  const a=path.join(root,"frontend","src");
  const b=path.join(root,"src");
  if(fs.existsSync(a)) return a;
  if(fs.existsSync(b)) return b;
  die("Can't find src (tried frontend/src and src)");
}
const SRC = findSrc(ROOT);

// ---- 1) Cmd+, shortcut in main.tsx / main.jsx ----
const MAIN = ["main.tsx","main.jsx"].map(n=>path.join(SRC,n)).find(fs.existsSync);
if (MAIN) {
  patch(MAIN, s=>{
    if (/keydown.*settings-suite/.test(s)) return s;
    return s.replace(/initTheme\(\);\s*\n/, m=> m + `
  // Open Settings: Cmd+, / Ctrl+,
  window.addEventListener("keydown",(e)=>{
    if ((e.metaKey||e.ctrlKey) && e.key === ","){
      e.preventDefault();
      window.dispatchEvent(new CustomEvent("open-panel",{detail:{id:"settings-suite"}}));
    }
  });
`);
  });
}

// ---- 2) StyleControlPanel: theme packs + export/import ----
const STYLE = path.join(SRC,"components","StyleControlPanel.jsx");
if (fs.existsSync(STYLE)) {
  patch(STYLE, s=>{
    let t=s;
    // Add prop for showing extra buttons (if not already there we’ll keep existing)
    if(!/Theme Packs/.test(t)){
      t = t.replace(/return\(\s*<div className="space-y-3">/, m=> m + `
    <ThemePacks draft={draft} setDraft={setDraft}/>
    <ExportImport draft={draft} setDraft={setDraft}/>
`);
      t += `

function ThemePacks({draft,setDraft}){
  const packs = {
    Night: {"mode":"dark","--accent":"#16E0FF","--bg-panel":"rgba(10,14,20,.92)","--text-strong":"#EAF7FB"},
    Daylight: {"mode":"light","--accent":"#0F73FF","--bg-panel":"rgba(246,248,250,.92)","--text-strong":"#0b2230"},
    Champagne: {"mode":"light","--accent":"#C5A572","--bg-panel":"rgba(250,247,240,.92)","--text-strong":"#2a251d"}
  };
  const apply=(k)=>setDraft(d=>({...d,...packs[k]}));
  return (
    <div className="dw-panel p-3 space-y-2">
      <div className="text-md font-semibold">Theme Packs</div>
      <div className="flex gap-2 flex-wrap">
        {Object.keys(packs).map(k=>(
          <button key={k} className="dw-btn px-3 py-1 rounded" onClick={()=>apply(k)}>{k}</button>
        ))}
      </div>
    </div>
  );
}

function ExportImport({draft,setDraft}){
  const exportJson=()=>{
    const blob=new Blob([JSON.stringify(draft,null,2)],{type:"application/json"});
    const a=document.createElement("a");
    a.href=URL.createObjectURL(blob);
    a.download="luccca-theme.json";
    a.click();
    URL.revokeObjectURL(a.href);
  };
  const importJson=(file)=>{
    const r=new FileReader();
    r.onload=()=>{ try{ const obj=JSON.parse(r.result); setDraft(d=>({...d,...obj})); }catch(e){ alert("Invalid theme JSON"); } };
    r.readAsText(file);
  };
  return (
    <div className="dw-panel p-3 space-y-2">
      <div className="text-md font-semibold">Export / Import</div>
      <div className="flex items-center gap-2">
        <button className="dw-btn px-3 py-1 rounded" onClick={exportJson}>Export JSON</button>
        <label className="dw-btn px-3 py-1 rounded cursor-pointer">Import…
          <input type="file" accept="application/json" className="hidden" onChange={e=>e.target.files?.[0]&&importJson(e.target.files[0])}/>
        </label>
      </div>
    </div>
  );
}
`;
    }
    return t;
  });
}

// ---- 3) Persist Background image vars to localStorage ----
const BG = path.join(SRC,"settings","BackgroundPanel.jsx");
if (fs.existsSync(BG)) {
  patch(BG, s=>{
    if (/LOCAL_BG/.test(s)) return s;
    return s.replace(/export default function BackgroundPanel\(\)\{/, `const LOCAL_BG="lu:backboard:bg:v1";\nexport default function BackgroundPanel(){`)
    .replace(/const \[state,setState\][\s\S]*?\}\);\n/, m=> m + `
  // load persisted (if any)
  React.useEffect(()=>{
    try{
      const saved = JSON.parse(localStorage.getItem(LOCAL_BG)||"null");
      if(saved && typeof saved==="object"){
        setState(saved);
        const doc=document.documentElement;
        ["image","opacity","blur","fit","pos"].forEach(k=>{
          const v=saved[k]; if(v!=null) doc.style.setProperty("--backboard-"+k, v);
        });
      }
    }catch{}
  },[]);

  // persist on change (debounced-ish)
  React.useEffect(()=>{
    try{ localStorage.setItem(LOCAL_BG, JSON.stringify(state)); }catch{}
  },[state]);
`);
  });
}

// ---- 4) A11y tokens: focus ring + reduced motion fallback ----
const TOK = path.join(SRC,"lib","themeTokens.css");
if (fs.existsSync(TOK)) {
  patch(TOK, s=>{
    if (s.includes("--focus-ring")) return s;
    return s + `

:root{
  --focus-ring: 0 0 0 2px rgba(22,224,255,.75);
}
:focus-visible{ outline: none; box-shadow: var(--focus-ring); }
@media (prefers-reduced-motion: reduce){
  *{ animation: none !important; transition: none !important; }
}
`;
  });
}

console.log("\\n✓ Finishing touches installed.");
console.log("If dev is running, restart Vite: cd frontend && rm -rf node_modules/.vite && pnpm dev");
