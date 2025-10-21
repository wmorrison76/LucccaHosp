const fs = require("fs");
const path = require("path");
const ROOT = process.cwd();
const TARGET = process.argv[2] || "src/modules";
function fixFile(file){
  const orig = fs.readFileSync(file,"utf8");
  let s = orig.replace(/\r\n/g,"\n");
  if (!/export\s+default\s+/.test(s)) {
    const m = s.match(/export\s+(?:const|function)\s+([A-Za-z0-9_]+)\s*(?:[:=(])/);
    if (m) s += `\nexport default ${m[1]};\n`;
  }
  if (s !== orig) fs.writeFileSync(file,s,"utf8");
}
function walk(dir){
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir,f);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p);
    else if (/\.(tsx?|jsx?)$/.test(p)) fixFile(p);
  }
}
walk(path.join(ROOT, TARGET));
console.log(`Sanitized ${TARGET}`);
