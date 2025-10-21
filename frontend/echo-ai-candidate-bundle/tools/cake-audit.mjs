#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as esbuild from "esbuild";
import fg from "fast-glob";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = process.cwd();
const SRC = path.join(root, "src");

// --- args ---
const args = new Map(
  process.argv.slice(2).flatMap(a => {
    const m = a.match(/^--([^=]+)=(.*)$/);
    return m ? [[m[1], m[2]]] : [];
  })
);

// default entries if present
const defaults = [
  "src/components/CakeBuilder.jsx",
  "src/modules/EchoCanvas/CakeBuilder.jsx",
  "src/pages/PastryLibrary.tsx",
].filter(p => fs.existsSync(p));

const entries =
  args.get("entries")?.split(",").map(s => s.trim()).filter(Boolean) ?? defaults;

if (entries.length === 0) {
  console.error("No entry files found. Pass --entries=comma,separated,paths");
  process.exit(1);
}

const outPrefix = args.get("out") || "cake";

const read = f => fs.readFileSync(f, "utf8");
const safeRel = p => path.relative(root, p);
const ensureDir = d => fs.mkdirSync(d, { recursive: true });

// checks
const hasStarExports        = s => /(^|\n)\s*export\s*\*\s*from\s*['"][^'"]+['"]\s*;?/.test(s);
const hasDefaultReexport   = s => /(^|\n)\s*export\s*{\s*default\s+as\s+[A-Za-z_$][\w$]*\s*}\s*from\s*['"][^'"]+['"]\s*;?/.test(s);
const hasDefaultExport     = s => /(^|\n)\s*export\s+default\b/.test(s);
function defaultImportFromIndex(code){
  const hits = [];
  const re = /(^|\n)\s*import\s+([A-Za-z_$][\w$]*)\s+from\s+['"]([^'"]+)['"]\s*;?/g;
  let m; while ((m = re.exec(code))) {
    if (/\/index(\.(t|j)sx?)?$/.test(m[3])) hits.push({ name: m[2], spec: m[3] });
  }
  return hits;
}
function dynamicImportSpecs(s){
  const out = new Set();
  let m;
  const re = /import\(\s*['"]([^'"]+)['"]\s*\)/g;
  while ((m = re.exec(s))) out.add(m[1]);
  const re2 = /React\.lazy\(\(\)\s*=>\s*import\(\s*['"]([^'"]+)['"]\s*\)\s*\)/g;
  while ((m = re2.exec(s))) out.add(m[1]);
  return [...out];
}

// read tsconfig aliases
function getTsPathAliases(){
  const ts = path.join(root, "tsconfig.json");
  try {
    const j = JSON.parse(fs.readFileSync(ts, "utf8"));
    const paths = j?.compilerOptions?.paths || {};
    const alias = [];
    for (const [k, arr] of Object.entries(paths)) {
      const g = Array.isArray(arr) ? arr[0] : arr;
      if (!g) continue;
      if (k.endsWith("/*") && g.endsWith("/*")) {
        const base = k.slice(0,-2);
        const rep  = path.join(root, g.slice(0,-2));
        alias.push({
          test: new RegExp(`^${base.replace(/[.*+?^${}()|[\\]\\\\]/g,"\\$&")}/(.*)$`),
          replace: m => path.join(rep, m[1]),
        });
      } else {
        const rep = path.join(root, g);
        alias.push({
          test: new RegExp(`^${k.replace(/[.*+?^${}()|[\\]\\\\]/g,"\\$&")}$`),
          replace: () => rep,
        });
      }
    }
    return alias;
  } catch { return []; }
}
function aliasPlugin(maps){
  return {
    name: "alias",
    setup(build){
      build.onResolve({ filter: /.*/ }, args => {
        for (const m of maps){
          const r = m.test.exec(args.path);
          if (r) return { path: m.replace(r), namespace: "file" };
        }
        return;
      });
    }
  };
}

(async () => {
  const result = await esbuild.build({
    entryPoints: entries,
    bundle: false,
    write: false,
    metafile: true,
    platform: "browser",
    format: "esm",
    logLevel: "silent",
    plugins: [aliasPlugin(getTsPathAliases())],
    resolveExtensions: [".tsx",".ts",".jsx",".js",".json"],
  });

  const inputs = result.metafile?.inputs || {};
  const allFiles = Object.keys(inputs)
    .map(p => path.isAbsolute(p) ? p : path.join(root, p))
    .filter(p => p.startsWith(SRC) && !p.includes("node_modules"));

  const problems = { starBarrels: [], missingDefaultInLazy: [], defaultFromIndex: [], circular: [] };
  const infoMap = new Map();

  for (const f of allFiles){
    let code = "";
    try { code = read(f); } catch {}
    const info = {
      star: hasStarExports(code),
      defaultReexportPresent: hasDefaultReexport(code),
      hasDefault: hasDefaultExport(code),
      defaultFromIndex: defaultImportFromIndex(code),
      dynamicSpecs: dynamicImportSpecs(code),
    };
    infoMap.set(f, info);
  }

  for (const [f, info] of infoMap){
    if (info.star && !info.defaultReexportPresent) problems.starBarrels.push(f);
    if (info.defaultFromIndex.length) problems.defaultFromIndex.push({ file:f, hits: info.defaultFromIndex });
  }

  function resolveLikeEsbuild(spec, fromFile){
    if (spec.startsWith(".")){
      const base = path.resolve(path.dirname(fromFile), spec);
      const exts = ["",".tsx",".ts",".jsx",".js"];
      for (const ext of exts){
        const t1 = base + ext;
        const t2 = path.join(base, "index"+ext);
        if (fs.existsSync(t1)) return t1;
        if (fs.existsSync(t2)) return t2;
      }
    }
    try {
      const r = esbuild.buildSync({
        entryPoints: [spec],
        write: false,
        bundle: false,
        metafile: true,
        platform: "browser",
        format: "esm",
        plugins: [aliasPlugin(getTsPathAliases())],
        resolveExtensions: [".tsx",".ts",".jsx",".js",".json"],
      });
      const k = Object.keys(r.metafile.inputs)[0];
      return path.isAbsolute(k) ? k : path.join(root,k);
    } catch { return null; }
  }

  for (const [f, info] of infoMap){
    for (const spec of info.dynamicSpecs){
      const tgt = resolveLikeEsbuild(spec, f);
      if (!tgt) continue;
      const code = fs.existsSync(tgt) ? read(tgt) : "";
      if (code && !hasDefaultExport(code)) {
        problems.missingDefaultInLazy.push({ from:f, spec, file:tgt });
      }
    }
  }

  // build adjacency to find cycles
  const graph = {};
  for (const [infile, meta] of Object.entries(inputs)){
    const abs = path.isAbsolute(infile) ? infile : path.join(root, infile);
    graph[abs] = (meta.imports || []).map(i => i.path)
      .map(p => (path.isAbsolute(p) ? p : path.join(root,p)))
      .filter(p => p.startsWith(SRC));
  }

  const seen = new Set(), stack = [];
  function dfs(n){
    if (stack.includes(n)){
      const i = stack.indexOf(n);
      problems.circular.push(stack.slice(i).concat(n));
      return;
    }
    if (seen.has(n)) return;
    seen.add(n); stack.push(n);
    (graph[n] || []).forEach(dfs);
    stack.pop();
  }
  Object.keys(graph).forEach(dfs);

  // output
  ensureDir("audit");
  const snapshotPath = path.join("audit", `${outPrefix}-snapshot.txt`);
  const reportPath   = path.join("audit", `${outPrefix}-report.md`);

  const ordered = [...new Set(allFiles)].sort();
  const SNAP = ordered.map(f => `/* ===== ${safeRel(f)} ===== */\n${read(f)}\n`).join("\n");
  fs.writeFileSync(snapshotPath, SNAP, "utf8");

  const md = [];
  md.push(`# Cake Builder Audit Report`);
  md.push(`- Root: \`${root}\``);
  md.push(`- Entries:`); entries.forEach(e => md.push(`  - \`${e}\``));
  md.push(`- Files traced: **${ordered.length}**`);
  md.push(`- Snapshot: \`audit/${outPrefix}-snapshot.txt\``);

  if (problems.starBarrels.length){
    md.push(`\n## ⚠️ Star-export barrels missing explicit default re-exports`);
    problems.starBarrels.sort().forEach(f => md.push(`- \`${safeRel(f)}\``));
    md.push(`\n> Fix: replace \`export * from './X'\` with \`export { default as X } from './X'\` (plus named exports as needed).`);
  } else {
    md.push(`\n## ✅ No star-export barrels without default forwarding`);
  }

  if (problems.defaultFromIndex.length){
    md.push(`\n## ⚠️ Default imports from index barrels`);
    problems.defaultFromIndex.forEach(({file,hits})=>{
      md.push(`- In \`${safeRel(file)}\`:`); hits.forEach(h => md.push(`  - \`import ${h.name} from '${h.spec}'\``));
    });
    md.push(`\n> Fix: import from the concrete module that actually exports default (not \`.../index\`).`);
  } else {
    md.push(`\n## ✅ No default imports from index barrels`);
  }

  if (problems.missingDefaultInLazy.length){
    md.push(`\n## ⚠️ React.lazy / dynamic imports without default export`);
    problems.missingDefaultInLazy.forEach(x=>{
      md.push(`- From \`${safeRel(x.from)}\` imports \`${x.spec}\` → \`${safeRel(x.file)}\` has **no default export**`);
    });
    md.push(`\n> Fix: add \`export default ComponentName\` in those modules or change to named import and wrap accordingly.`);
  } else {
    md.push(`\n## ✅ All lazy/dynamic imported modules provide a default export`);
  }

  if (problems.circular.length){
    md.push(`\n## ⚠️ Circular dependencies (first few)`);
    problems.circular.slice(0,10).forEach(c => md.push(`- ` + c.map(safeRel).join(" → ")));
  } else {
    md.push(`\n## ✅ No circular dependencies found`);
  }

  fs.writeFileSync(reportPath, md.join("\n"), "utf8");

  console.log(`\n📄 Wrote snapshot → ${snapshotPath}`);
  console.log(`🧭 Wrote report   → ${reportPath}\n`);
  console.log(`Done.`);
})().catch(err => { console.error(err); process.exit(1); });
