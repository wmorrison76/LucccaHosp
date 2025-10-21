#!/usr/bin/env node
import fs from "fs";
import path from "path";

const ROOT = path.resolve("src");
const DRY_RUN = process.argv.includes("--dry-run");
const TARGET_DIRS = process.argv
  .filter((a) => a.startsWith("--dir="))
  .map((a) => a.replace("--dir=", ""))
  .map((d) => path.resolve(d));

const dirs = TARGET_DIRS.length ? TARGET_DIRS : [
  path.join(ROOT, "modules/pastry/cake"),
  path.join(ROOT, "modules/pastry/cake/components"),
  path.join(ROOT, "modules/pastry/cake/utils"),
  path.join(ROOT, "modules/pastry/cake/data"),
];

function listExports(dir) {
  if (!fs.existsSync(dir)) return { files: [], lines: [] };
  const lines = [];
  const files = fs.readdirSync(dir).filter(f =>
    /\.(t|j)sx?$/.test(f) && !/^index\.(t|j)s$/.test(f)
  );

  for (const f of files) {
    const base = f.replace(/\.(t|j)sx?$/, "");
    // both default and star re-exports are handy
    lines.push(`export * from './${base}';`);
    lines.push(`export { default as ${safeIdent(base)} } from './${base}';`);
  }
  return { files, lines };
}

function safeIdent(name) {
  // crude: convert kebab/snake to camel
  return name
    .replace(/\.[^/.]+$/, '')
    .split(/[-_]/g)
    .map((s, i) => (i ? s.charAt(0).toUpperCase() + s.slice(1) : s))
    .join("");
}

for (const d of dirs) {
  const { files, lines } = listExports(d);
  if (!files.length) continue;

  const barrel = path.join(d, "index.ts");
  if (DRY_RUN) {
    console.log(`[DRY] Would create/overwrite ${barrel} with ${files.length} entries.`);
  } else {
    fs.writeFileSync(barrel, lines.join("\n") + "\n", "utf8");
    console.log(`Wrote ${barrel} (${files.length} exports).`);
  }
}
π