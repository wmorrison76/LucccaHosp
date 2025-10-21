#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const root = process.cwd();
const SRC = path.join(root, 'src');

function read(p){ try { return fs.readFileSync(p,'utf8'); } catch { return null; } }
function write(p,s){ fs.writeFileSync(p,s); }
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

const files = listFiles(SRC);
let touched = 0;

for (const f of files){
  const s = read(f); if (!s) continue;
  const lines = s.split(/\r?\n/);
  const seen = new Set();
  let changed = false;

  const out = [];
  for (const line of lines){
    let key = line.replace(/\s+/g,' ')
      .replace(/\s*;\s*$/,';')
      .trim();

    if (/^export\s*{\s*default\s+as\s+[A-Za-z_$][\w$]*\s*}\s*from\s*['"][^'"]+['"]\s*;?$/.test(key) ||
        /^export\s*{\s*[A-Za-z_$][\w$]*\s*}\s*from\s*['"][^'"]+['"]\s*;?$/.test(key)){
      if (seen.has(key)){ changed = true; continue; }
      seen.add(key);
    }
    out.push(line);
  }

  if (changed){
    write(f, out.join('\n'));
    console.log('deduped:', path.relative(root, f));
    touched++;
  }
}

console.log(`\nDone. Modified ${touched} file(s).`);
