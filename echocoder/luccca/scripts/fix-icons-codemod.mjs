import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const EXTS = new Set(['.js', '.jsx', '.ts', '.tsx']);

function walk(dir) {
  let out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out = out.concat(walk(p));
    else if (EXTS.has(path.extname(e.name))) out.push(p);
  }
  return out;
}

function ensureLucideTrendingUp(s) {
  const hasLucideTrending =
    /import\s*\{[^}]*\bTrendingUp\b[^}]*\}\s*from\s*['"]lucide-react['"]/.test(s);
  if (hasLucideTrending) return s;

  // If there is an existing lucide-react import, append TrendingUp to it.
  const lucideImportRe = /import\s*\{([^}]*)\}\s*from\s*['"]lucide-react['"]\s*;?/;
  if (lucideImportRe.test(s)) {
    s = s.replace(lucideImportRe, (full, inner) => {
      const names = inner.split(',').map(x => x.trim()).filter(Boolean);
      if (!names.includes('TrendingUp')) names.push('TrendingUp');
      return `import { ${Array.from(new Set(names)).join(', ')} } from 'lucide-react';`;
    });
    return s;
  }

  // Otherwise, insert a fresh lucide import after the first import in the file.
  const firstImport = s.match(/import[\s\S]*?from\s*['"][^'"]+['"]\s*;?/);
  if (firstImport) {
    const idx = firstImport.index + firstImport[0].length;
    return s.slice(0, idx) + `\nimport { TrendingUp } from 'lucide-react';` + s.slice(idx);
  }
  // No imports? Prepend.
  return `import { TrendingUp } from 'lucide-react';\n` + s;
}

const roots = ['src', 'archive'].map(d => path.join(ROOT, d)).filter(fs.existsSync);
const files = roots.flatMap(walk);

let changed = 0;

for (const file of files) {
  let s = fs.readFileSync(file, 'utf8');
  const before = s;

  // Handle imports that come from 'react-icons/fa'
  // and may incorrectly include Md* icons or TrendingUp.
  s = s.replace(
    /import\s*\{([^}]+)\}\s*from\s*['"]react-icons\/fa['"]\s*;?/gms,
    (full, inner) => {
      const names = inner.split(',').map(x => x.trim()).filter(Boolean);
      if (names.length === 0) return full;

      const fa = [];
      const md = [];
      let hasTrendingUpInFa = false;
      const other = [];

      for (const n of names) {
        if (/^Fa[A-Za-z0-9_]*$/.test(n)) fa.push(n);
        else if (/^Md[A-Za-z0-9_]*$/.test(n)) md.push(n);
        else if (n === 'TrendingUp') hasTrendingUpInFa = true;
        else other.push(n); // leave unknowns on FA line
      }

      // If nothing to split, leave as-is.
      if (md.length === 0 && !hasTrendingUpInFa) return full;

      const lines = [];

      // Keep FA + any "other" on the FA import if any remain
      if (fa.length || other.length) {
        lines.push(`import { ${[...fa, ...other].join(', ')} } from 'react-icons/fa';`);
      }

      // Move Md* to react-icons/md
      if (md.length) {
        lines.push(`import { ${md.join(', ')} } from 'react-icons/md';`);
      }

      // TrendingUp belongs to lucide-react
      if (hasTrendingUpInFa) {
        // We'll add lucide import later in a second pass to avoid dupes
        // Replace it here by simply omitting from FA line
        // (nothing to add on this match)
      }

      return lines.join('\n');
    }
  );

  // If the file used to import TrendingUp from FA, ensure lucide import exists
  if (/import\s*\{[^}]*\}\s*from\s*['"]react-icons\/fa['"]/.test(before)
      && /TrendingUp/.test(before)
      && !/from\s*['"]react-icons\/fa['"][^;]*TrendingUp/.test(s)) {
    s = ensureLucideTrendingUp(s);
  }

  if (s !== before) {
    fs.writeFileSync(file, s);
    console.log('🛠  Patched', path.relative(ROOT, file));
    changed++;
  }
}

console.log(changed ? `✅ Updated ${changed} file(s).` : 'ℹ️  No files needed changes.');
