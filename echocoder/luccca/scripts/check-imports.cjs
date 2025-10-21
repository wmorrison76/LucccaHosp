// scripts/check-imports.cjs (CommonJS)
const fs = require('fs');
const path = require('path');

/** Scan aliased imports from tsconfig "paths" and report ones that don't resolve. */
const ROOT = process.cwd();
const tsconfigPath = path.join(ROOT, 'tsconfig.json');
if (!fs.existsSync(tsconfigPath)) {
  console.error('❌ tsconfig.json not found at project root.');
  process.exit(1);
}
const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'));
const baseUrl = (tsconfig.compilerOptions && tsconfig.compilerOptions.baseUrl) || '.';
const paths = (tsconfig.compilerOptions && tsconfig.compilerOptions.paths) || {};

const aliasMap = {};
for (const key of Object.keys(paths)) {
  const values = paths[key];
  if (!Array.isArray(values) || values.length === 0) continue;
  const alias = key.replace(/\/\*$/, '');        // "@/*" -> "@"
  const target = values[0].replace(/\/\*$/, ''); // "src/*" -> "src"
  aliasMap[alias] = path.resolve(ROOT, baseUrl, target);
}
if (!aliasMap['@']) aliasMap['@'] = path.resolve(ROOT, 'src');

const exts = ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs'];

function walk(dir) {
  const out = [];
  try {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, ent.name);
      if (ent.isDirectory()) {
        if (ent.name === 'node_modules' || ent.name === 'dist' || ent.name === '.git') continue;
        out.push(...walk(p));
      } else if (/\.(ts|tsx|js|jsx|mjs|cjs)$/.test(ent.name)) {
        out.push(p);
      }
    }
  } catch {}
  return out;
}

function resolveAliased(spec) {
  const hit = Object.keys(aliasMap).find(a => spec === a || spec.startsWith(a + '/'));
  if (!hit) return '__SKIP__';
  let rel = spec.slice(hit.length);
  if (rel.startsWith('/')) rel = rel.slice(1);
  const base = aliasMap[hit];
  const joined = path.join(base, rel);
  const candidates = [
    joined,
    ...exts.map(e => joined + e),
    ...exts.map(e => path.join(joined, 'index' + e)),
  ];
  return candidates.find(p => fs.existsSync(p)) || null;
}

const srcRoot = aliasMap['@'] || path.join(ROOT, 'src');
const files = walk(srcRoot);
const missing = [];

for (const file of files) {
  const text = fs.readFileSync(file, 'utf8');
  const specs = [
    ...text.matchAll(/from\s+['"]([^'"]+)['"]/g),
    ...text.matchAll(/import\(\s*['"]([^'"]+)['"]\s*\)/g),
  ].map(m => m[1]);

  for (const s of specs) {
    if (!s.startsWith('@')) continue;
    if (!resolveAliased(s)) missing.push({ file: path.relative(ROOT, file), import: s });
  }
}

if (missing.length) {
  console.log('❌ Unresolved aliased imports:');
  for (const m of missing) console.log(`- ${m.import}  <-  ${m.file}`);
  console.log(`\nTotal unresolved: ${missing.length}`);
  process.exit(1);
} else {
  console.log('✅ All aliased imports resolved');
}
