import fs from "fs";
import path from "path";

/**
 * Checks aliased imports (from tsconfig "paths") and reports any that don't resolve.
 * Usage: npm run check:imports
 */

const ROOT = process.cwd();

// --- Build alias map from tsconfig.json ---
const tsconfigPath = path.join(ROOT, "tsconfig.json");
if (!fs.existsSync(tsconfigPath)) {
  console.error("❌ tsconfig.json not found at project root.");
  process.exit(1);
}
const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, "utf8"));
const baseUrl = tsconfig?.compilerOptions?.baseUrl || ".";
const paths = tsconfig?.compilerOptions?.paths || {};

const aliasMap = {};
for (const [aliasGlob, valueArr] of Object.entries(paths)) {
  if (!Array.isArray(valueArr) || valueArr.length === 0) continue;
  const alias = aliasGlob.replace(//*$/, ""); // "@/*" -> "@"
  const first = valueArr[0];                    // "src/*"
  const target = first.replace(//*$/, "");    // "src"
  aliasMap[alias] = path.resolve(ROOT, baseUrl, target);
}

// Fallbacks if not defined in tsconfig
if (!aliasMap["@"]) aliasMap["@"] = path.resolve(ROOT, "src");

const exts = [".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs"];

function walk(dir) {
  const out = [];
  try {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, ent.name);
      if (ent.isDirectory()) out.push(...walk(p));
      else if (/.(ts|tsx|js|jsx|mjs|cjs)$/.test(ent.name)) out.push(p);
    }
  } catch {}
  return out;
}

function resolveAliased(spec) {
  const hit = Object.keys(aliasMap).find(a => spec === a || spec.startsWith(a + "/"));
  if (!hit) return "__SKIP__";
  const rel = spec.slice(hit.length);
  const base = aliasMap[hit];
  const joined = path.join(base, rel);

  const candidates = [
    joined,
    ...exts.map(e => joined + e),
    ...exts.map(e => path.join(joined, "index" + e)),
  ];
  return candidates.find(fs.existsSync) || null;
}

const srcDir = aliasMap["@"] || path.join(ROOT, "src");
const files = walk(srcDir);
const missing = [];

for (const file of files) {
  const text = fs.readFileSync(file, "utf8");
  const specs = [
    ...text.matchAll(/from\s+['"]([^'"]+)['"]/g),
    ...text.matchAll(/import\(\s*['"]([^'"]+)['"]\s*\)/g),
  ].map(m => m[1]);

  for (const s of specs) {
    if (!s.startsWith("@")) continue; // only aliased imports
    const ok = resolveAliased(s);
    if (!ok) missing.push({ file: path.relative(ROOT, file), import: s });
  }
}

if (missing.length) {
  console.log("❌ Unresolved aliased imports:");
  for (const m of missing) console.log(`- ${m.import}  <-  ${m.file}`);
  console.log(`\nTotal unresolved: ${missing.length}`);
  process.exit(1);
} else {
  console.log("✅ All aliased imports resolved");
}
