#!/usr/bin/env node
/**
 * fix_cake_imports.mjs
 * 
 * Run from your LUCCCA "frontend" root:
 *   node fix_cake_imports.mjs
 * 
 * What it does:
 * - Finds src/components/CakeBuilder.jsx (or .tsx)
 * - Backs it up (CakeBuilder.jsx.bak)
 * - Rewrites problematic imports to match your actual file layout:
 *      "@/modules/pastry/cake/CakeCanvasBuilder"      -> "@/modules/pastry/cake/CanvasBuilder"
 *      "@/modules/pastry/cake/WorkOrderBuilder"       -> "@/modules/pastry/cake/componets/WorkOrderBuilder"
 *      "@/modules/pastry/cake/Cake360Viewer"          -> "@/modules/pastry/cake/componets/Cake360Viewer"
 *      "@/modules/pastry/cake/WraparoundDecorationTool" -> "@/modules/pastry/cake/componets/WraparoundDecorationTool"
 * - Verifies target files exist (warns if any are missing).
 */

import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const SRC = path.join(projectRoot, "src");
const builderCandidates = [
  path.join(SRC, "components", "CakeBuilder.jsx"),
  path.join(SRC, "components", "CakeBuilder.tsx"),
];

const mapping = new Map([
  ['@/modules/pastry/cake/CakeCanvasBuilder', '@/modules/pastry/cake/CanvasBuilder'],
  ['@/modules/pastry/cake/WorkOrderBuilder', '@/modules/pastry/cake/componets/WorkOrderBuilder'],
  ['@/modules/pastry/cake/Cake360Viewer', '@/modules/pastry/cake/componets/Cake360Viewer'],
  ['@/modules/pastry/cake/WraparoundDecorationTool', '@/modules/pastry/cake/componets/WraparoundDecorationTool'],
]);

function resolveFromSrc(spec) {
  if (!spec.startsWith('@/')) return null;
  const rel = spec.slice(2); // drop "@/"
  // try with extensions
  const base = path.join(SRC, rel);
  const tryFiles = [
    base,
    base + ".js",
    base + ".jsx",
    base + ".ts",
    base + ".tsx",
    path.join(base, "index.js"),
    path.join(base, "index.jsx"),
    path.join(base, "index.ts"),
    path.join(base, "index.tsx"),
  ];
  for (const f of tryFiles) {
    if (fs.existsSync(f)) return f;
  }
  return null;
}

function patchFile(filePath) {
  const src = fs.readFileSync(filePath, "utf8");
  let changed = false;
  let out = src;

  for (const [fromSpec, toSpec] of mapping.entries()) {
    const rx = new RegExp(String.raw`from\s+["']${fromSpec}["']`, "g");
    if (rx.test(out)) {
      out = out.replace(rx, `from "${toSpec}"`);
      changed = true;
      // Check target existence
      const target = resolveFromSrc(toSpec);
      if (!target) {
        console.warn(`[warn] Target not found for ${toSpec} (please check spelling like "componets" vs "components").`);
      } else {
        console.log(`[ok] Verified: ${toSpec} -> ${path.relative(projectRoot, target)}`);
      }
    }
  }

  if (!changed) {
    console.log("[info] No matching imports found to patch. File may already be fixed.");
    return false;
  }

  // backup
  const bak = filePath + ".bak";
  fs.writeFileSync(bak, src, "utf8");
  fs.writeFileSync(filePath, out, "utf8");
  console.log(`[done] Patched imports in ${path.relative(projectRoot, filePath)} (backup: ${path.basename(bak)})`);
  return true;
}

let targetFile = null;
for (const cand of builderCandidates) {
  if (fs.existsSync(cand)) { targetFile = cand; break; }
}

if (!targetFile) {
  console.error("❌ Could not find CakeBuilder.jsx/tsx in src/components/. Are you in the correct project root?");
  process.exit(1);
}

patchFile(targetFile);
