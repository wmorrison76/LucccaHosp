#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('src');
const rxStar = /export\s*\*\s*from\s*['"](\.\/[^'"]+)['"];?/g;
// Matches: export { default as Name } from './Name'
const rxHasDefaultLine = (name) =>
  new RegExp(String.raw`export\s*\{\s*default\s+as\s+${name}\s*\}\s*from\s*['"]\.\/${name}['"];?`);

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.isFile() && /\.(t|j)sx?$/.test(e.name)) out.push(p);
  }
  return out;
}

let changed = 0;
for (const file of walk(root)) {
  const src = fs.readFileSync(file, 'utf8');
  rxStar.lastIndex = 0;

  const inserts = [];
  let m;
  while ((m = rxStar.exec(src))) {
    const rel = m[1];                 // './Something'
    const base = path.basename(rel);  // 'Something'
    const name = base.replace(/\.(t|j)sx?$/, ''); // strip extension if present
    const need = `export { default as ${name} } from '${rel}';`;

    if (!rxHasDefaultLine(name).test(src)) {
      inserts.push({ at: m.index + m[0].length, text: `\n${need}` });
    }
  }

  if (inserts.length) {
    let next = src;
    inserts.sort((a, b) => b.at - a.at).forEach(({ at, text }) => {
      next = next.slice(0, at) + text + next.slice(at);
    });
    fs.writeFileSync(file, next, 'utf8');
    console.log('[aliases] added default re-exports in', file);
    changed++;
  }
}

console.log(changed ? `\n✔ Added aliases in ${changed} file(s).` : '\nNo star-exports missing default aliases.');
