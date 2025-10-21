#!/usr/bin/env node
/**
 * Copy files listed in manifest/manifest.json to a destination directory,
 * preserving relative paths.
 *
 * Usage:
 *   node scripts/manifest-copy.mjs --manifest manifest/manifest.json --dest ../echocoder/luccca
 *   # optional filters:
 *   node scripts/manifest-copy.mjs --manifest manifest/manifest.json --dest ../echocoder/luccca --kinds code,style,asset
 */

import fs from "fs";
import fsp from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const args = process.argv.slice(2);
const getArg = (name, def) => {
  const i = args.findIndex(a => a === `--${name}` || a.startsWith(`--${name}=`));
  if (i === -1) return def;
  const a = args[i];
  if (a.includes("=")) return a.split("=")[1];
  const next = args[i + 1];
  return next && !next.startsWith("--") ? next : true;
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const manifestPath = path.resolve(getArg("manifest", "manifest/manifest.json"));
const destRoot = path.resolve(getArg("dest", "../echocoder/luccca"));
const kindsArg = String(getArg("kinds", "") || "").trim();
const allowKinds = kindsArg ? new Set(kindsArg.split(",").map(s => s.trim())) : null;

const copyOne = async (srcAbs, rel) => {
  const dst = path.join(destRoot, rel);
  await fsp.mkdir(path.dirname(dst), { recursive: true });
  await fsp.copyFile(srcAbs, dst);
};

(async () => {
  const manifest = JSON.parse(await fsp.readFile(manifestPath, "utf8"));
  const root = manifest.root;
  const files = manifest.files;

  let copied = 0;
  for (const f of files) {
    if (allowKinds && !allowKinds.has(f.kind)) continue;
    const abs = f.absolute ?? path.join(root, f.relative);
    try {
      await copyOne(abs, f.relative);
      copied++;
    } catch (e) {
      console.error("Copy failed:", f.relative, e.message);
    }
  }

  // Always include critical config roots if present
  const maybeCopy = async (p) => {
    const abs = path.join(root, p);
    try { const st = await fsp.stat(abs); if (st.isFile()) await copyOne(abs, p); } catch {}
  };
  await maybeCopy("package.json");
  await maybeCopy("pnpm-lock.yaml");
  await maybeCopy("vite.config.ts");
  await maybeCopy("vite.config.js");
  await maybeCopy("tailwind.config.js");
  await maybeCopy("postcss.config.js");
  await maybeCopy("index.html");

  console.log(`\n✅ Copied ${copied} file(s) to ${destRoot}`);
  console.log("   (plus configs if present)\n");
})().catch(e => {
  console.error(e);
  process.exit(1);
});
