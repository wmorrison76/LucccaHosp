// scripts/wire-css-tokens.mjs
import fs from "fs";
import path from "path";

function findRoot(start){
  let p=start; for(let i=0;i<5;i++){ if(fs.existsSync(path.join(p,"frontend","src"))) return p; const up=path.dirname(p); if(up===p) break; p=up; }
  throw new Error("Cannot find repo root (looking for frontend/src)");
}
const root = findRoot(process.cwd());
const FRONT = path.join(root,"frontend","src");

const candidates = [
  path.join(FRONT,"App.jsx"),
  path.join(FRONT,"main.jsx"),
  path.join(FRONT,"index.jsx"),
];

const hit = candidates.find(fs.existsSync);
if (!hit) { console.log("! Could not find App.jsx/main.jsx/index.jsx"); process.exit(1); }

const src = fs.readFileSync(hit,"utf8");
if (src.includes("lib/textVars.css")) {
  console.log("= CSS tokens already imported in", path.relative(root, hit));
} else {
  fs.writeFileSync(hit, `import "@/lib/textVars.css";\n` + src, "utf8");
  console.log("~ Added CSS tokens import to", path.relative(root, hit));
}
