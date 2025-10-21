#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const root = process.cwd();
const SRC = path.join(root, 'src');

function read(p){ try { return fs.readFileSync(p,'utf8'); } catch { return null; } }
function exists(p){ try { fs.accessSync(p); return true; } catch { return false; } }

function listFiles(dir){
  const out = [];
  const stack = [dir];
  while (stack.length){
    const d = stack.pop();
    for (const ent of fs.readdirSync(d, { withFileTypes:true })){
      const p = path.join(d, ent.name);
      if (ent.isDirectory()) stack.push(p);
      else if (ent.isFile() && /\.(t|j)sx?$/.test(ent.name)) out.push(p);
    }
  }
  return out;
}
function hasDefaultExport(file){
  const s = read(file); if (!s) return false;
  if (/\bexport\s+default\b/.test(s)) return true;
  if (/export\s*{\s*[A-Za-z_$][\w$]*\s+as\s+default\s*}/.test(s)) return true;
  return false;
}
function barrelHasAlias(barrel, target){
  const s = read(barrel) || '';
  const bn = path.basename(target).replace(/\.(t|j)sx?$/, '');
  const re = new RegExp(`export\\s*{\\s*default\\s+as\\s+[A-Za-z_$][\\w$]*\\s*}\\s*from\\s*['"]\\.\\/${bn}['"]\\s*;?`);
  return re.test(s);
}

const all = listFiles(SRC);
const offenders = [];
for (const file of all){
  const s = read(file);
  if (!s) continue;
  const re = /export\s*\*\s*from\s*['"](\.\/[^'"]+)['"]/g;
  let m;
  while ((m = re.exec(s))){
    const spec = m[1];
    const base = path.resolve(path.dirname(file), spec);
    const candidates = [
      `${base}.ts`, `${base}.tsx`, `${base}.js`, `${base}.jsx`,
      path.join(base, 'index.ts'), path.join(base, 'index.tsx'),
      path.join(base, 'index.js'), path.join(base, 'index.jsx'),
    ];
    const target = candidates.find(exists);
    if (!target) continue;
    if (hasDefaultExport(target) && !barrelHasAlias(file, target)){
      offenders.push({ barrel:file, starFrom:spec, target });
    }
  }
}

if (offenders.length === 0){
  console.log('✅ No missing default re-exports found behind star-exports.');
  process.exit(0);
}

console.log('❌ Barrels with star-exports that should forward a default as well:\n');
for (const o of offenders){
  const relBarrel = path.relative(root, o.barrel);
  const relTarget = path.relative(root, o.target);
  const nameGuess = path.basename(o.target).replace(/\.(t|j)sx?$/,'')
    .replace(/(^|[-_]\s*)([a-z])/gi, (_, __, c)=>c.toUpperCase()).replace(/[-_]/g,'');
  console.log(`- ${relBarrel}
    ↳ "export * from '${o.starFrom}'" hits ${relTarget} which HAS a default.
    FIX: add this line in the barrel:
        export { default as ${nameGuess} } from '${o.starFrom}';`);
}
process.exit(1);
