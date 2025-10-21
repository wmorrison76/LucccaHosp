import fs from "fs";
import path from "path";

const ROOT = path.resolve(process.argv[2] || ".");
function die(m){ console.error("✗", m); process.exit(1); }
function ok(...m){ console.log("•", ...m); }

function findSrc(root){
  const A = path.join(root, "frontend", "src");
  const B = path.join(root, "src");
  if (fs.existsSync(A)) return A;
  if (fs.existsSync(B)) return B;
  die(`Can't find src folder. Tried: ${A} and ${B}`);
}
const SRC = findSrc(ROOT);
const CMP = path.join(SRC, "components");
const LIB = path.join(SRC, "lib");
const STY = path.join(SRC, "styles");
const SET = path.join(SRC, "settings");

function backupWrite(file, content){
  const dir = path.dirname(file);
  fs.mkdirSync(dir, { recursive: true });
  if (fs.existsSync(file)) {
    const bk = file + ".bak_bg_a11y";
    try { fs.copyFileSync(file, bk); } catch {}
    ok("backup", path.relative(ROOT,bk));
  }
  fs.writeFileSync(file, content, "utf8");
  ok("write", path.relative(ROOT,file));
}
function patch(file, mutate){
  if (!fs.existsSync(file)) return false;
  const before = fs.readFileSync(file, "utf8");
  const after = mutate(before);
  if (before !== after) {
    const bk = file + ".bak_bg_a11y";
    try { fs.copyFileSync(file, bk); } catch {}
    fs.writeFileSync(file, after, "utf8");
    ok("patch", path.relative(ROOT,file));
    return true;
  }
  return false;
}

/* 1) Extend tokens with backboard BG + a11y switches */
const tokens = path.join(LIB, "themeTokens.css");
if (!fs.existsSync(tokens)) die("themeTokens.css not found. Run the settings suite installer first.");
patch(tokens, (s)=>{
  let t = s;
  if (!t.includes("--backboard-image")) {
    t += `

/* Backboard background controls */
:root{
  --backboard-image: "";
  --backboard-opacity: 0.20;   /* 0..1 */
  --backboard-blur: 2px;
  --backboard-fit: cover;      /* cover|contain */
  --backboard-pos: center;     /* center|top|... */
}

/* A11y toggles */
:root{
  --a11y-contrast: normal;     /* normal|high */
  --a11y-outline: 2px solid #00AEEF; /* focus ring */
}

/* High contrast surface tweak */
:root[data-a11y-contrast="high"]{
  --bg-panel: #0c0f14;
  --bg-panel-subtle: #1b2330;
  --text-strong: #ffffff;
  --text-muted: #c7d3db;
  --tab-border: 1px solid rgba(255,255,255,.4);
  --tab-bg-active: rgba(255,255,255,.18);
}
`;
  }
  return t;
});

/* 2) Safe theme engine tweaks: add data-a11y-contrast attr support */
const engine = path.join(LIB, "themeEngine.js");
patch(engine, (s)=>{
  let t = s;
  if (!t.includes("data-a11y-contrast")) {
    t = t.replace(/function setModeAttr\(m\)\{[^}]+\}/, (m)=>{
      // preserve original, append a11y setter later
      return m + "\n";
    });
    // append helpers at end if not present
    t += `

/* A11y attribute helpers */
function setA11yContrast(mode){ try{ const r=document.documentElement; if(r){ r.setAttribute("data-a11y-contrast", mode||"normal"); } }catch{} }
export function setHighContrast(on=true){ setA11yContrast(on?"high":"normal"); }
`;
  }
  return t;
});

/* 3) Create Background panel */
const BG_PANEL = path.join(SET, "BackgroundPanel.jsx");
backupWrite(BG_PANEL, `import React from "react";

export default function BackgroundPanel(){
  const doc = document.documentElement;
  const get = (k, fallback="") => getComputedStyle(doc).getPropertyValue(k).trim() || fallback;
  const [state,setState] = React.useState(()=>({
    image: get("--backboard-image",""),
    opacity: get("--backboard-opacity","0.20"),
    blur: get("--backboard-blur","2px"),
    fit: get("--backboard-fit","cover"),
    pos: get("--backboard-pos","center"),
  }));

  const set = (k) => (e) => {
    const v = e.target.value;
    setState(s => ({...s,[k]:v}));
    doc.style.setProperty(\`--backboard-\${k}\`, v);
  };

  const onUpload = (f) => {
    const r = new FileReader();
    r.onload = () => {
      const data = \`url('\${r.result}')\`;
      setState(s=>({...s,image:data}));
      doc.style.setProperty("--backboard-image", data);
    };
    r.readAsDataURL(f);
  };

  const reset = () => {
    const def = { image:"", opacity:"0.20", blur:"2px", fit:"cover", pos:"center" };
    Object.entries(def).forEach(([k,v])=>doc.style.setProperty(\`--backboard-\${k}\`, v));
    setState(def);
  };

  return (
    <div className="dw-panel p-4 space-y-3">
      <div className="text-lg font-semibold">Backboard Background</div>
      <div className="text-sm opacity-80">Upload an image and tune how it shows. Echo can still replace the background at runtime; this is the default.</div>

      <div className="flex items-center gap-3">
        <label className="dw-btn px-3 py-1 rounded cursor-pointer">
          Upload…
          <input type="file" accept="image/*" className="hidden"
            onChange={e=>e.target.files?.[0] && onUpload(e.target.files[0])}/>
        </label>
        <button className="dw-btn px-3 py-1 rounded" onClick={reset}>Reset</button>
      </div>

      <div className="grid" style={{gridTemplateColumns:"repeat(5,minmax(0,1fr))", gap:12}}>
        <L label="Opacity (0..1)"><input className="dw-input" value={state.opacity} onChange={set("opacity")}/></L>
        <L label="Blur (px)"><input className="dw-input" value={state.blur} onChange={set("blur")}/></L>
        <L label="Fit"><select className="dw-input" value={state.fit} onChange={set("fit")}><option>cover</option><option>contain</option></select></L>
        <L label="Position"><input className="dw-input" value={state.pos} onChange={set("pos")}/></L>
        <L label="Image CSS value" ><input className="dw-input" value={state.image} onChange={set("image")}/></L>
      </div>

      <div className="text-xs opacity-70">CSS vars used: --backboard-image, --backboard-opacity, --backboard-blur, --backboard-fit, --backboard-pos</div>
    </div>
  );
}

function L({label, children}){ return(
  <label className="flex flex-col gap-1">
    <span className="text-sm opacity-80">{label}</span>
    {children}
  </label>
); }
`);

/* 4) Patch SettingsSuite to include Background tab + High Contrast toggle + Colorblind palettes */
const SUITE = path.join(SET, "SettingsSuite.jsx");
patch(SUITE, (s)=>{
  let t = s;
  if (!t.includes('Background')) {
    t = t.replace(/import StyleControlPanel[^;]+;/, (m)=> m + `\nimport BackgroundPanel from "./BackgroundPanel.jsx";`);
    t = t.replace(/\[\s*\["appearance"[^]+\]\s*\)/, (m)=>{
      return m.replace(/(\s*\]\s*\)\s*)$/, "");
    });
    t = t.replace(
      /(\[\s*\["appearance","Appearance"\],)/,
      '$1 ["background","Background"],'
    );
    // add case render
    t = t.replace(/(\{tab==="appearance".+?\})/s, (m)=>{
      return m + `\n            {tab==="background" && <BackgroundPanel/>}`;
    });
  }
  // Add High Contrast + Colorblind presets in StyleControlPanel (if present)
  if (t.includes("StyleControlPanel") && !t.includes("Colorblind")) {
    t = t.replace(/<StyleControlPanel\/>/, `<StyleControlPanel extraControls />`);
  }
  return t;
});

/* 5) Enhance StyleControlPanel to add High Contrast + Colorblind presets (when prop extraControls is set) */
const STYLE = path.join(CMP, "StyleControlPanel.jsx");
patch(STYLE, (s)=>{
  if (!/extraControls/.test(s)) {
    return s.replace(/export default function StyleControlPanel\(\)\{/, 'export default function StyleControlPanel({ extraControls=false }){')
      .replace(/return\(\s*<div className="space-y-3">/, (m)=> m + `
    {extraControls && <A11yBlock/>}
`)
      .concat(`

function A11yBlock(){
  const doc = document.documentElement;
  const setContrast = (on)=>{ doc.setAttribute("data-a11y-contrast", on?"high":"normal"); };
  const applyPalette = (p)=>{
    for (const [k,v] of Object.entries(p)) doc.style.setProperty(k, v);
  };
  const presets = {
    Deuteranopia: { "--accent":"#0072B2", "--text-strong":"#ffffff", "--bg-panel":"#0f141a" },
    Protanopia:   { "--accent":"#009E73", "--text-strong":"#ffffff", "--bg-panel":"#0f141a" },
    Tritanopia:   { "--accent":"#D55E00", "--text-strong":"#ffffff", "--bg-panel":"#0f141a" },
  };
  return (
    <div className="dw-panel p-3 space-y-2">
      <div className="text-md font-semibold">Accessibility</div>
      <div className="flex gap-2 items-center">
        <button className="dw-btn px-3 py-1 rounded" onClick={()=>setContrast(true)}>High Contrast On</button>
        <button className="dw-btn px-3 py-1 rounded" onClick={()=>setContrast(false)}>High Contrast Off</button>
      </div>
      <div className="flex gap-2 items-center">
        {Object.keys(presets).map(k=>(
          <button key={k} className="dw-btn px-3 py-1 rounded" onClick={()=>applyPalette(presets[k])}>
            {k} palette
          </button>
        ))}
      </div>
    </div>
  );
}
`);
  }
  return s;
});

/* 6) Patch Backboard HUD to layer background (non-invasive, CSS-only) */
function findBackboard(){
  const files = [];
  function walk(dir){
    for (const n of fs.readdirSync(dir)){
      const f = path.join(dir, n);
      const st = fs.statSync(f);
      if (st.isDirectory()){ walk(f); continue; }
      if (!/\.(jsx|tsx|js|ts)$/.test(f)) continue;
      if (/BackboardHUD|Backboard/i.test(f)) files.push(f);
    }
  }
  walk(SRC);
  return files[0]; // first match
}
const BACK = findBackboard();
if (BACK) {
  patch(BACK, (s)=>{
    if (s.includes("dw-backboard-bg")) return s; // already done
    // add wrapper just after top-level container opening
    let t = s;
    t = t.replace(/return\s*\(\s*<div([^>]*)>/, (m, attrs)=> {
      return `return(<div${attrs}>
  {/* CSS-driven backboard background layer (safe: Echo can still override body) */}
  <div className="dw-backboard-bg" aria-hidden="true"></div>`;
    });
    return t;
  });

  // inject CSS into utilities.css
  const UTIL = path.join(STY, "utilities.css");
  let css = fs.existsSync(UTIL) ? fs.readFileSync(UTIL,"utf8") : "";
  if (!css.includes(".dw-backboard-bg")){
    css += `

/* Backboard background layer (non-interactive) */
.dw-backboard-bg{
  position:absolute; inset:0; pointer-events:none;
  background-image: var(--backboard-image);
  background-size: var(--backboard-fit);
  background-position: var(--backboard-pos);
  opacity: var(--backboard-opacity);
  filter: blur(var(--backboard-blur));
  z-index: 0;
}
/* Ensure your HUD grid/content sits above */
.hud-root, .backboard-content{ position:relative; z-index:1; }
`;
    backupWrite(UTIL, css);
  }
} else {
  console.warn("! Could not find Backboard HUD file to patch. If you tell me the path, I can target it directly.");
}

console.log("\\n✓ Background + Accessibility installed.");
console.log('Open Settings Suite and use the new "Background" tab.');
