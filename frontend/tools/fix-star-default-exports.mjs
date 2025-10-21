#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const DRY = !process.argv.includes("--write");

const exts = [".ts", ".tsx", ".js", ".jsx"];
const indexNames = exts.map(e => "index" + e);

function log(...a){ console.log("[fix-star-default-exports]", ...a); }
function read(p){ return fs.readFileSync(p, "utf8"); }
function save(p,s){ fs.writeFileSync(p, s); }
function exists(p){ try{ fs.accessSync(p); return true; } catch{ return false; } }

// Turn `./layout/right-panels` -> "RightPanels"
function toPascal(basename){
  return basename
    .replace(/\.[^.]+$/,'')
    .replace(/[^A-Za-z0-9]+/g,' ')
    .trim()
    .split(/\s+/)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");
}

function resolveTarget(fromFile, rel){
  const base = rel.replace(/['"]/g,"");
  const absBase = path.resolve(path.dirname(fromFile), base);

  // 1) direct file with ext
  for (const e of exts){
    const p = absBase + e;
    if (exists(p)) return p;
  }
  // 2) index under folder
  for (const n of indexNames){
    const p = path.join(absBase, n);
    if (exists(p)) return p;
  }
  return null;
}

function hasDefaultExport(src){
  // quick check first
  if (!/\bexport\s+default\b/.test(src)) return {has:false, name:null};

  // try to capture a declared name if present
  // export default function Name ... | export default class Name ...
  const m = src.match(/\bexport\s+default\s+(?:async\s+)?(?:function|class)\s+([A-Za-z_][A-Za-z0-9_]*)/);
  if (m) return {has:true, name:m[1]};
  return {has:true, name:null};
}

function alreadyHasDefaultLine(fileSource, rel){
  const rx = new RegExp(
    String.raw`export\s*\{\s*default\s+as\s+[A-Za-z_][A-Za-z0-9_]*\s*\}\s*from\s*['"]${rel}['"]\s*;?`
  );
  return rx.test(fileSource);
}

function processFile(file){
  const before = read(file);
  if (!/export\s*\*\s*from\s*['"][^'"]+['"]/.test(before)) return false; // nothing to do

  let changed = false;
  const lines = before.split(/\r?\n/);
  let out = [];

  for (let i=0;i<lines.length;i++){
    const line = lines[i];
    out.push(line);

    const star = line.match(/^\s*export\s*\*\s*from\s*(['"])([^'"]+)\1\s*;?\s*$/);
    if (!star) continue;

    const rel = star[2];

    // Avoid duplicate additions
    if (alreadyHasDefaultLine(before, rel)) continue;

    const target = resolveTarget(file, rel);
    if (!target) continue;

    const src = read(target);
    const def = hasDefaultExport(src);
    if (!def.has) continue;

    // pick a good name
    let name = def.name;
    if (!name){
      // use target basename or folder name
      const guessBase = path.basename(target).startsWith("index.")
        ? path.basename(path.dirname(target))
        : path.basename(target);
      name = toPascal(guessBase);
      if (!name) name = "DefaultExport";
    }

    out.push(`export { default as ${name} } from '${rel}';`);
    changed = true;
  }

  if (changed){
    if (DRY){
      log("would change:", file);
    } else {
      save(file, out.join("\n"));
      log("change:", file);
    }
  }
  return changed;
}

function walk(dir, acc=[]){
  for (const e of fs.readdirSync(dir, { withFileTypes: true })){
    const p = path.join(dir, e.name);
    if (e.isDirectory()){
      if (["node_modules",".git","dist",".next",".vite",".parcel-cache",".turbo"].includes(e.name)) continue;
      walk(p, acc);
    } else if (e.isFile()){
      if (!/\.(ts|tsx)$/.test(e.name)) continue;
      acc.push(p);
    }
  }
  return acc;
}

const files = walk(path.join(root,"src"));
let touched = 0;
for (const f of files){
  if (processFile(f)) touched++;
}

log(DRY ? `dry-run complete. ${touched} file(s) would be modified. add --write to apply.` 
         : `done. modified ${touched} file(s).`);
