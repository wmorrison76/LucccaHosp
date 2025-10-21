#!/usr/bin/env bash
set -euo pipefail
echo "🔧 repairing alias path collisions…"

# 1) Fix "file where a directory should be"
node - <<'NODE'
const fs=require('fs'),path=require('path');
const mustBeDirs=[
  'src/components/EchoCore/utils',      // needed for utils/encryption.ts
];

for(const d of mustBeDirs){
  if(fs.existsSync(d) && !fs.lstatSync(d).isDirectory()){
    const backup=d+'.bak';
    fs.renameSync(d, backup);                 // turn the file into a backup
    fs.mkdirSync(d, {recursive:true});        // create the directory
    const index=path.join(d,'index.ts');
    try {
      const content=fs.readFileSync(backup,'utf8');
      fs.writeFileSync(index, content || 'export {};\n');
    } catch {
      fs.writeFileSync(index, 'export {};\n');
    }
    console.log('🔧 converted file->dir:', d, '(moved to', backup, 'and wrote', index,')');
  }
}
NODE

# 2) Re-run the alias stubber only (safe/idempotent)
node - <<'NODE'
const fs=require('fs'),path=require('path');
const exts=['.tsx','.ts','.jsx','.js'];
const ROOT='src';
const alias={'@':path.join(process.cwd(),'src'),'@shared':path.join(process.cwd(),'src','shared')};

function* walk(dir){
  for(const e of fs.readdirSync(dir,{withFileTypes:true})){
    const p=path.join(dir,e.name);
    if(e.isDirectory()) yield* walk(p);
    else if(/\.(t|j)sx?$/.test(p)) yield p;
  }
}
function resolveAlias(spec){
  const hit=Object.keys(alias).find(a=>spec===a||spec.startsWith(a+'/'));
  if(!hit) return null;
  const rel=spec.slice(hit.length).replace(/^\//,'');
  return path.join(alias[hit],rel);
}
function ensureFile(p,kind){
  if(fs.existsSync(p)) return false;
  fs.mkdirSync(path.dirname(p),{recursive:true});
  if(kind==='component'){
    const nm=path.basename(p,path.extname(p)).replace(/[^A-Za-z0-9_]/g,'_');
    fs.writeFileSync(p,`export default function ${nm}(){ return null }\n`);
  } else if(kind==='hook'){
    const nm=path.basename(p,'.ts').replace(/^use/,'use');
    fs.writeFileSync(p,`export default function ${nm}(){ return {} as any }\n`);
  } else if(kind==='types'){
    fs.writeFileSync(p,`export {};\n`);
  } else {
    fs.writeFileSync(p,`export {};\n`);
  }
  return true;
}
let created=0;
for(const file of walk(ROOT)){
  const text=fs.readFileSync(file,'utf8');
  const specs=[...text.matchAll(/from\s+['"]([^'"]+)['"]/g),...text.matchAll(/import\(\s*['"]([^'"]+)['"]\s*\)/g)].map(m=>m[1]);
  for(const s of specs){
    const tgt=resolveAlias(s); if(!tgt) continue;

    // already exists? (file or index.*)
    let hit=null;
    for(const e of exts){ if(fs.existsSync(tgt+e)){ hit=tgt+e; break; } }
    if(!hit){
      for(const e of exts){ if(fs.existsSync(path.join(tgt,'index'+e))){ hit=path.join(tgt,'index'+e); break; } }
    }
    if(hit) continue;

    // pick stub kind + extension
    let kind='lib';
    if(/components?\//i.test(tgt)) kind='component';
    else if(/hooks?\//i.test(tgt)) kind='hook';
    else if(/shared\/.*-types$/i.test(tgt) || /\/types$/i.test(tgt)) kind='types';

    const out = tgt + (kind==='component' ? '.tsx' : '.ts');
    try {
      if(ensureFile(out,kind)) { created++; console.log('🆕 stubbed', path.relative(process.cwd(), out)); }
    } catch(e) {
      console.log('⚠️  skipped (collision):', out, e.message);
    }
  }
}
console.log(created?`✅ created ${created} stub(s)`:'ℹ️ no new stubs needed');
NODE

# 3) Clear vite cache & start dev
rm -rf node_modules/.vite 2>/dev/null || true
echo "🚀 starting dev (force)…"
npm run dev -- --force
