import fs from "fs"; import path from "path";
const ROOT = path.resolve(process.argv[2] || ".");
function walk(dir){ for(const n of fs.readdirSync(dir)){ const p=path.join(dir,n);
  const s=fs.statSync(p); if(s.isDirectory()) walk(p); else if(p.endsWith(".bak_extras")){
    const target=p.replace(/\.bak_extras$/,""); try{ fs.copyFileSync(p,target); console.log("reverted", target); }catch{}
  }}}
walk(ROOT);
console.log("Done.");
