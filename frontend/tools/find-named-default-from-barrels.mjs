#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const SRC = path.join(root, 'src');
const exts = ['.ts','.tsx','.js','.jsx'];

const read = p => fs.readFileSync(p,'utf8');
const isFile = p => { try { return fs.statSync(p).isFile(); } catch { return false; } };
const isDir  = p => { try { return fs.statSync(p).isDirectory(); } catch { return false; } };

function walk(dir, acc=[]){
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (e.isFile() && exts.includes(path.extname(p))) acc.push(p);
  }
  return acc;
}

function fileContainsStarExport(p){
  const s = read(p);
  return /^\s*export\s+\*\s+from\s+['"][^'"]+['"]\s*;?/m.test(s);
}

function resolveImport(fromFile, spec){
  let base;
  if (spec.startsWith('.')) base = path.resolve(path.dirname(fromFile), spec);
  else if (spec.startsWith('/')) base = path.join(root, spec.replace(/^\/+/,''));
  else if (spec.startsWith('src/')) base = path.join(root, spec);
  else return null; // library import

  if (isFile(base)) return base;
  for (const ext of exts) if (isFile(base+ext)) return base+ext;
  if (isDir(base)) {
    for (const ext of exts) {
      const idx = path.join(base, 'index'+ext);
      if (isFile(idx)) return idx;
    }
  }
  return null;
}

const files = walk(SRC);
const barrels = new Set(files.filter(fileContainsStarExport));

const offenders = [];
const NAMED_DEFAULT_RE = /\bimport\s*\{\s*default\s+as\s+([A-Za-z_$][\w$]*)\s*\}\s*from\s*['"]([^'"]+)['"]/g;

for (const f of files){
  const s = read(f);
  let m;
  while ((m = NAMED_DEFAULT_RE.exec(s))){
    const name = m[1], spec = m[2];
    const target = resolveImport(f, spec);
    if (target && barrels.has(target)){
      offenders.push({ file: f, name, spec, barrel: target });
    }
  }
}

if (offenders.length === 0){
  console.log('✅ No named-default imports from barrel files.');
  process.exit(0);
}

console.log('\n❌ Named-default imports from barrel files found:\n');
for (const o of offenders){
  console.log(`- ${path.relative(root,o.file)}  imports { default as ${o.name} } from '${o.spec}'
  ↳ barrel: ${path.relative(root,o.barrel)}`);
}
console.log(`
Fix options:
  A) Import from the real file that has the default export (preferred).
  B) Or add an explicit default re-export in the barrel, e.g.:
     export { default as ${/* name placeholder */'SomeName'} } from './concrete/Module';
`);
process.exit(1);
