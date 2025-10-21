#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = process.cwd();
const candidates = new Set();

// Gather lazy / dynamic import targets from source
function collect(pattern) {
  const re = new RegExp(pattern, 'g');
  const exts = ['.ts', '.tsx', '.js', '.jsx'];
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(p);
      else if (exts.includes(path.extname(p))) {
        const s = fs.readFileSync(p, 'utf8');
        let m;
        while ((m = re.exec(s))) {
          candidates.add(m[1]);
        }
      }
    }
  }
  walk(path.join(root, 'src'));
}

collect(String.raw`React\.lazy\(\(\) => import\(['"]([^'"]+)['"]\)`);
collect(String.raw`import\(['"]([^'"]+)['"]\)`);

// Try resolve a module path to a file under src with common extensions
function resolveToFile(spec) {
  // spec may start with '/', './', '../' or 'src/...'
  let base = spec.startsWith('/')
    ? path.join(root, spec)
    : spec.startsWith('./') || spec.startsWith('../')
    ? path.join(root, 'src', spec)
    : spec.startsWith('src/')
    ? path.join(root, spec)
    : null;

  if (!base) return null;

  const tryPaths = [];
  const exts = ['.tsx', '.jsx', '.ts', '.js'];
  if (fs.existsSync(base) && fs.statSync(base).isFile()) return base;
  // If it's a directory, try index.*
  if (fs.existsSync(base) && fs.statSync(base).isDirectory()) {
    for (const ext of exts) tryPaths.push(path.join(base, 'index' + ext));
  }
  // Try with extensions
  for (const ext of exts) tryPaths.push(base + ext);

  for (const p of tryPaths) {
    if (fs.existsSync(p) && fs.statSync(p).isFile()) return p;
  }
  return null;
}

function hasDefaultExport(file) {
  const s = fs.readFileSync(file, 'utf8');
  // naive but effective checks
  if (/export\s+default\s+/m.test(s)) return true;
  if (/export\s+{[^}]*\bdefault\b[^}]*}/m.test(s)) return true;
  return false;
}

const missing = [];
for (const spec of candidates) {
  const file = resolveToFile(spec);
  if (!file) continue;
  if (!hasDefaultExport(file)) {
    missing.push({ spec, file });
  }
}

if (missing.length === 0) {
  console.log('✅ All lazy/dynamic-imported modules export default.');
  process.exit(0);
}

console.log('❌ Modules imported lazily that DO NOT export default:\n');
for (const m of missing) {
  console.log(`- spec: ${m.spec}\n  file: ${path.relative(root, m.file)}\n`);
}
process.exit(1);
