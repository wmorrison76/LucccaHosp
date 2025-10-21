#!/usr/bin/env node
/**
 * Verify that files at a destination match the manifest by SHA-256.
 *
 * Usage:
 *   node scripts/manifest-verify.mjs --manifest manifest/manifest.json --dest ../echocoder/luccca
 */

import fs from "fs";
import fsp from "fs/promises";
import path from "path";
import crypto from "crypto";

const args = process.argv.slice(2);
const getArg = (name, def) => {
  const i = args.findIndex(a => a === `--${name}` || a.startsWith(`--${name}=`));
  if (i === -1) return def;
  const a = args[i];
  if (a.includes("=")) return a.split("=")[1];
  const next = args[i + 1];
  return next && !next.startsWith("--") ? next : true;
};

const manifestPath = path.resolve(getArg("manifest", "manifest/manifest.json"));
const destRoot = path.resolve(getArg("dest", "../echocoder/luccca"));

const sha256File = async (absPath) => {
  const hash = crypto.createHash("sha256");
  const stream = fs.createReadStream(absPath);
  return new Promise((resolve, reject) => {
    stream.on("data", (d) => hash.update(d));
    stream.on("end", () => resolve(hash.digest("hex")));
    stream.on("error", reject);
  });
};

(async () => {
  const manifest = JSON.parse(await fsp.readFile(manifestPath, "utf8"));
  const files = manifest.files;

  let ok = 0, missing = 0, mismatched = 0;

  for (const f of files) {
    const dst = path.join(destRoot, f.relative);
    try {
      const st = await fsp.stat(dst);
      if (!st.isFile()) { throw new Error("not a file"); }
      const hash = await sha256File(dst);
      if (hash === f.sha256) ok++;
      else { mismatched++; console.error("✗ hash mismatch:", f.relative); }
    } catch (e) {
      missing++; console.error("✗ missing:", f.relative);
    }
  }

  console.log(`\nVerification summary for ${destRoot}`);
  console.log(`  ✓ OK:         ${ok}`);
  console.log(`  ✗ Missing:    ${missing}`);
  console.log(`  ✗ Mismatched: ${mismatched}\n`);

  process.exit(missing || mismatched ? 2 : 0);
})().catch(e => {
  console.error(e);
  process.exit(1);
});
