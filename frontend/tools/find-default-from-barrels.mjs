#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const SRC = path.join(root, 'src');
const exts = ['.ts', '.tsx', '.js', '.jsx'];

function read(p){ return fs.readFileSync(p, 'utf8'); }
function isFile(p){ try { return fs.statSync(p).isFile(); } catch { return false; } }
function isDir(p){ try { return fs.statSync(p).isDirectory(); } catch { return false; } }

// collect all barrels (files that contain `export * from`)
function walk(dir, acc=[]){
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (e.isFile() && exts.includes(path.extname(p))) {
      const s = read(p);
      if (/^\s*export\s+\*\s+from\s+['"][^'"]+['"]\s*;?/m.test(s)) acc.push(p);
    }
  }
  return acc;
}

// resolve an import specifier to a file path (best-effort)
function resolveImport(fromFile, spec){
  let base;
  if (spec.startsWith('.'))  base = path.resolve(path.dirname(fromFile), spec);
  else if (spec.startsWith('/')) base = path.join(root, spec.replace(/^\/+/,''));
  else if (spec.startsWith('src/')) base = path.join(root, spec);
  else return null; // library import; ignore

  // order: file, file+exts, dir/index.exts
  if (isFile(base)) return base;
  for (const ext of exts){ if (isFile(base+ext)) return base+ext; }
  if (isDir(base)){
    for (const ext of exts){ const idx = path.join(base, 'index'+ext); if (isFile(idx)) return idx; }
  }
  return null;
}

// Parse default imports: import Foo from '...';  or  import Foo, { ... } from '...';
const DEFAULT_IMPORT_RE = /\bimport\s+([A-Za-z_$][\w$]*)\s*(?:,|\s)from\s+['"]([^'"]+)['"]/g;

const barrels = walk(SRC);
if (barrels.length === 0){ console.log('✅ No barrels (export * from) under src.'); process.exit(0); }

const offenders = [];
function scanFile(f){
  const s = read(f);
  let m;
  while ((m = DEFAULT_IMPORT_RE.exec(s))){
    const defName = m[1], spec = m[2];
    const target = resolveImport(f, spec);
    if (!target) continue;
    if (barrels.includes(target)){
      offenders.push({ file: f, name: defName, spec, target });
    }
  }
}

function walkAll(dir){
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walkAll(p);
    else if (e.isFile() && exts.includes(path.extname(p))) scanFile(p);
  }
}

walkAll(SRC);

if (offenders.length === 0){
  console.log('✅ No default imports from barrel files. The error is likely fixed or coming from a specific lazy import that hits a barrel via an alias.');
  process.exit(0);
}

console.log('\n❌ Default imports from barrel files found:\n');
for (const o of offenders){
  console.log(`- ${path.relative(root,o.file)}  imports default (${o.name}) from  '${o.spec}'
  ↳ barrel: ${path.relative(root,o.target)}`);
}
console.log(`
Fix options (pick one per offending import):
  A) Change the import to the concrete module that actually exports default.
     e.g.  import MyComp from './layout/RightPanels'   (NOT from './components')
  B) Add an explicit default re-export in the barrel:
     e.g.  export { default as RightPanels } from './layout/RightPanels';
`);
process.exit(1);
