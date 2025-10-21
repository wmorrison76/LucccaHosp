#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = process.argv[2] ? path.resolve(process.argv[2]) : process.cwd();
const SRC = path.join(ROOT, "src");

function ensureDir(p){ fs.mkdirSync(path.dirname(p), { recursive: true }); }
function writeFile(p, s){ ensureDir(p); fs.writeFileSync(p, s); console.log("✓ wrote", p.replace(ROOT+"/","")); }
function read(p){ return fs.existsSync(p) ? fs.readFileSync(p, "utf8") : ""; }
function write(p, s){ fs.writeFileSync(p, s); console.log("✓ patched", p.replace(ROOT+"/","")); }

console.log("==> Root:", ROOT);

const shimPath = path.join(SRC, "components/settings/settingsBus.js");
writeFile(shimPath, `// A tiny compatibility layer so legacy Settings section files keep working.
export function setPreset(id){
  try{
    localStorage.setItem("lu:theme", id);
    document.documentElement.setAttribute("data-theme", id);
    window.dispatchEvent(new CustomEvent("lu:settings:apply", {
      detail: { vars: {}, flags: { dark: document.documentElement.classList.contains("dark") } }
    }));
    return id;
  }catch(e){ console.warn("[settingsBus] setPreset failed:", e); }
}
export function applyThemeVars(vars = {}){
  try{
    const root = document.documentElement;
    for(const [k,v] of Object.entries(vars)){
      if(v === "" || v == null) root.style.removeProperty(k);
      else root.style.setProperty(k, v);
    }
    localStorage.setItem("lu:vars", JSON.stringify(vars));
    window.dispatchEvent(new CustomEvent("lu:settings:apply", { detail: { vars } }));
  }catch(e){ console.warn("[settingsBus] applyThemeVars failed:", e); }
}
`);

const sectionsDir = path.join(SRC, "components/settings/sections");
if (fs.existsSync(sectionsDir)) {
  const files = fs.readdirSync(sectionsDir).filter(f => f.endsWith(".jsx"));
  for (const f of files) {
    const p = path.join(sectionsDir, f);
    let s = read(p);
    if (!s) continue;

    if (/setPreset|applyThemeVars/.test(s)) {
      // Drop any previous named import lines that referenced the old helpers
      s = s.replace(/import\s*\{[^}]*\}\s*from\s*["'][^"']*["'];?\s*\n/g, (m) => {
        // keep other imports; we’ll add our own below
        return m.includes("setPreset") || m.includes("applyThemeVars") ? "" : m;
      });
      if (!/from\s+["']\.\.\/settingsBus\.js["']/.test(s)) {
        // Add our shim import after the first import
        s = s.replace(/import\s+[^;]+;\s*\n/, (m) => m + `import { setPreset, applyThemeVars } from "../settingsBus.js";\n`);
      }
      write(p, s);
    }
  }
} else {
  console.log("  (no sections dir found, skipping import repoint)");
}

const boardPath = path.join(SRC, "board/Board.jsx");
if (fs.existsSync(boardPath)) {
  let s = read(boardPath);
  s = s.replace(/\.\.\/components\/settings\/SettingsSuite(?:\.jsx)?/g, "../components/settings/SettingsSuite.jsx");
  write(boardPath, s);
}

const appPath = path.join(SRC, "App.jsx");
if (fs.existsSync(appPath)) {
  let s = read(appPath);
  s = s.replace(/\.\/components\/PastryLibrary\/PastryLibrary\.jsx(?:\.bak_[^"'/]+)?(?:\/index\.js)?/g,
                "./components/PastryLibrary/PastryLibrary.jsx");
  write(appPath, s);
}

console.log("==> Done. Restart your dev server (pnpm dev | npm run dev | yarn dev).");

