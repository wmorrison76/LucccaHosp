import fs from 'fs';
import path from 'path';

const root = process.cwd();

const exts = new Set(['.ts', '.tsx', '.js', '.jsx']);
function* walk(dir) {
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, name.name);
    if (name.isDirectory()) {
      if (name.name === 'node_modules' || name.name.startsWith('.')) continue;
      yield* walk(p);
    } else if (name.isFile()) {
      const ext = path.extname(name.name);
      if (exts.has(ext)) yield p;
    }
  }
}

// Simple import parser (line-based, good enough for this audit)
const importRE = /^\s*import\s+(.+?)\s+from\s+['"]([^'"]+)['"]\s*;?\s*$/;

function isDefaultImport(spec) {
  // no leading "{", so "import X from '...'"
  return !spec.trim().startsWith('{');
}

function isBarrelSpec(spec) {
  // 1) .../CustomCakeStudio/components
  if (spec.includes('CustomCakeStudio/components')) return true;
  // 2) top-level .../CustomCakeStudio (not followed by a slash)
  if (/CustomCakeStudio$/.test(spec)) return true;
  // 3) any .../CustomCakeStudio/.../index
  if (/CustomCakeStudio\/.+\/index$/.test(spec)) return true;
  return false;
}

function isNamedDefault(lineSpec) {
  return /^\{\s*default\s+as\s+[\w$]+\s*\}$/.test(lineSpec.trim());
}

const offenders = [];

for (const file of walk(path.join(root, 'src'))) {
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  lines.forEach((line, i) => {
    const m = line.match(importRE);
    if (!m) return;
    const imported = m[1]; // the bindings part
    const spec = m[2];     // the path

    if (isNamedDefault(imported)) {
      offenders.push({
        kind: 'named-default',
        file, line: i + 1, code: line, spec,
        suggest: `Replace with a concrete default import from the real file, or change to a named import if the barrel provides one.`
      });
      return;
    }

    if (isDefaultImport(imported) && isBarrelSpec(spec)) {
      // try to guess a concrete path suggestion
      let hint = '';
      if (spec.endsWith('/components')) {
        hint = `Import from the concrete component file, e.g. '${spec}/layout/RightPanels' and use a named re-export in the barrel if needed.`;
      } else if (/CustomCakeStudio\/.+\/index$/.test(spec)) {
        hint = `Import from the specific module file instead of its index, e.g. replace '${spec}' with the actual file path that exports default.`;
      } else if (/CustomCakeStudio$/.test(spec)) {
        hint = `Import from the subpath that actually defines the default, or switch to a named import from the barrel.`;
      }
      offenders.push({
        kind: 'default-from-barrel',
        file, line: i + 1, code: line, spec,
        suggest: hint || 'Import from the concrete module that exports default, or use a named import.'
      });
    }
  });
}

if (offenders.length === 0) {
  console.log('✅ No default imports from barrels and no "named default" imports found.');
  process.exit(0);
}

console.log('❌ Offending imports found:\n');
for (const o of offenders) {
  console.log(`- ${path.relative(root, o.file)}:${o.line}
  ${o.code}
  ↳ issue: ${o.kind}
  ↳ spec : '${o.spec}'
  ↳ fix  : ${o.suggest}
`);
}
process.exit(1);
