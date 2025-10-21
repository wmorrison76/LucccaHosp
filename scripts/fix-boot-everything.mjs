import fs from "fs"; import path from "path";
const ARGS = process.argv.slice(2);
const rootArg = ARGS[0] && !ARGS[0].startsWith("-") ? ARGS[0] : ".";
const ROOT = path.resolve(rootArg);
function p(...seg){ return path.join(ROOT, ...seg); }
function exists(...seg){ return fs.existsSync(p(...seg)); }
function read(...seg){ return fs.readFileSync(p(...seg), "utf8"); }
function writeFileWithBackup(abs, txt, suf=".bak_bootall"){
  try{ if(fs.existsSync(abs)) fs.copyFileSync(abs, abs+suf); }catch{}
  fs.mkdirSync(path.dirname(abs), {recursive:true});
  fs.writeFileSync(abs, txt, "utf8");
  console.log("• wrote", path.relative(ROOT, abs), `(backup → ${path.basename(abs+suf)})`);
}
function patch(abs, mut, suf=".bak_bootall"){
  if (!fs.existsSync(abs)) return false;
  const before = fs.readFileSync(abs,"utf8");
  const after = mut(before);
  if (after !== before){
    writeFileWithBackup(abs, after, suf);
    return true;
  }
  console.log("= ok", path.relative(ROOT, abs));
  return false;
}

const FRONT = exists("frontend") ? "frontend" : "";
const SRC = exists("frontend","src") ? p("frontend","src") : (exists("src") ? p("src") : null);
if (!SRC) { console.error("✗ Can't find src (expected frontend/src or src) under", ROOT); process.exit(1); }
console.log("ROOT:", ROOT);
console.log("SRC :", SRC);

// 1) index.html under frontend/
const IDX = FRONT ? p(FRONT,"index.html") : p("index.html");
let wantEntry = "/src/main.tsx";
const hasTsx = fs.existsSync(path.join(SRC, "main.tsx"));
const hasJsx = fs.existsSync(path.join(SRC, "main.jsx"));
if (!hasTsx && hasJsx) wantEntry = "/src/main.jsx";

if (!fs.existsSync(IDX)) {
  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>LUCCCA</title>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="${wantEntry}"></script>
</body>
</html>
`;
  writeFileWithBackup(IDX, html);
} else {
  patch(IDX, s => s
    .replace(/\/src\/main\.tsx/g, wantEntry)
    .replace(/\/src\/main\.jsx/g, wantEntry)
  );
}

// 2) Entry file (create if missing)
const MAIN_TSX = path.join(SRC, "main.tsx");
const MAIN_JSX = path.join(SRC, "main.jsx");
if (!hasTsx && !hasJsx) {
  const entry = `import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

try { import("./index.css"); } catch {}
try { import("./components/EchoCore/EchoCoreGlobalStyles.css"); } catch {}

const el = document.getElementById("root");
if (!el) throw new Error("#root not found");
createRoot(el).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
`;
  // default to JSX entry to avoid TS config needs
  writeFileWithBackup(MAIN_JSX, entry);
}

// 3) App.jsx must default-export App
const APP = fs.existsSync(path.join(SRC,"App.jsx")) ? path.join(SRC,"App.jsx")
         : fs.existsSync(path.join(SRC,"App.tsx")) ? path.join(SRC,"App.tsx")
         : null;
if (APP) {
  patch(APP, s=>{
    // Remove any accidental `export default initTheme();`
    s = s.replace(/^\s*export\s+default\s+initTheme\s*\(\s*\)\s*;?\s*$/m, "");
    // Ensure default export of App
    const hasExportDefaultApp = /export\s+default\s+App\s*;/.test(s) || /export\s+default\s+function\s+App\b/.test(s);
    const hasAppFunc = /function\s+App\s*\(/.test(s) || /const\s+App\s*=\s*\(/.test(s);
    if (!hasExportDefaultApp && hasAppFunc) s = s.replace(/\s*$/m, `\nexport default App;\n`);
    return s;
  });
} else {
  // Create minimal App.jsx if completely missing
  const minimal = `import React from "react";
export default function App(){ return <div style={{padding:16}}>Hello from App</div>; }
`;
  writeFileWithBackup(path.join(SRC,"App.jsx"), minimal);
}

// 4) Ensure components/GlowyDesk.jsx exists and default-exports GlowyDesk
const GLOW_DIR = path.join(SRC,"components");
fs.mkdirSync(GLOW_DIR, {recursive:true});
const GD1 = path.join(GLOW_DIR,"GlowyDesk.jsx");
const GD2 = path.join(GLOW_DIR,"Glowydesk.jsx");
let glowPath = fs.existsSync(GD1) ? GD1 : (fs.existsSync(GD2) ? GD2 : GD1);
if (!fs.existsSync(glowPath)) {
  const stub = `import React from "react";
export default function GlowyDesk(){
  return <div style={{padding:16}}>GlowyDesk ready.</div>;
}
`;
  writeFileWithBackup(glowPath, stub);
} else {
  patch(glowPath, s => s
    .replace(/export\s+default\s+function\s+\w+\s*\(/, "export default function GlowyDesk(")
  );
  if (glowPath === GD2 && !fs.existsSync(GD1)) {
    fs.copyFileSync(GD2, GD1);
    console.log("• copied components/Glowydesk.jsx → components/GlowyDesk.jsx");
  }
}

console.log("\n✓ Boot files verified/fixed.");
console.log("Next:");
console.log(FRONT
  ? "  cd \""+path.join(ROOT,'frontend')+"\" && rm -rf node_modules/.vite && pnpm dev"
  : "  rm -rf node_modules/.vite && pnpm dev"
);
