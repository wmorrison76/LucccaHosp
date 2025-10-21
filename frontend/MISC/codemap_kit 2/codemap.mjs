#!/usr/bin/env node
import { promises as fs } from 'fs';
import path from 'path';
import fg from 'fast-glob';
import * as babelParser from '@babel/parser';
import traverse from '@babel/traverse';

const projectRoot = path.resolve(process.argv[2] || process.cwd());
const srcRootGuess = path.join(projectRoot, 'src');
const outDir = path.join(projectRoot, 'codemap');

const JS_EXTS = ['.js', '.jsx', '.ts', '.tsx'];
const INDEX_BASENAMES = ['index', 'main'];
const EXCLUDE_DIRS = ['node_modules', 'dist', 'build', '.next', '.turbo', '.vite', '.git', 'coverage'];
const babelPlugins = ['jsx', 'typescript', 'classProperties', 'dynamicImport', 'decorators-legacy', 'importMeta'];

function looksLikeComponentName(name){ return !!name && /^[A-Z]/.test(name); }
function normalize(p){ return p.replace(/\\/g, '/'); }
function stripQueryAndHash(spec){ return spec.split('?')[0].split('#')[0]; }

async function ensureOutDir(){ await fs.mkdir(outDir, { recursive: true }); }
const readFileSafe = (p)=> fs.readFile(p, 'utf8').catch(()=>'');
const statSafe = async (p)=> { try { return await fs.stat(p); } catch { return null; } };

function resolveAlias(spec){
  if (spec.startsWith('@/')) return path.join(srcRootGuess, spec.slice(2));
  return null;
}

async function resolveLocalImport(fromFile, spec){
  const cleaned = stripQueryAndHash(spec);
  let candidate = null;
  if (cleaned.startsWith('./') || cleaned.startsWith('../')) {
    candidate = path.resolve(path.dirname(fromFile), cleaned);
  } else if (cleaned.startsWith('@/')) {
    candidate = resolveAlias(cleaned);
  } else {
    return null;
  }
  for (const ext of ['', ...JS_EXTS, '/index.js', '/index.jsx', '/index.ts', '/index.tsx']) {
    const filePath = candidate + ext;
    const st = await statSafe(filePath);
    if (st && st.isFile()) return filePath;
  }
  return null;
}

async function parseFile(file){
  const code = await readFileSafe(file);
  const info = {
    file: normalize(path.relative(projectRoot, file)),
    absPath: file, size: 0, lines: 0,
    imports: [], dynamicImports: [], exports: [],
    hasDefaultExport: false, defaultExportName: null,
    reactComponents: [], hooksUsed: [], routes: [],
    cssImports: [], assetImports: [], hasZustandStore: false,
    parseError: null,
  };
  info.size = Buffer.byteLength(code, 'utf8');
  info.lines = (code.match(/\\n/g) || []).length + (code.length ? 1 : 0);
  if (code.includes("from 'zustand'") || code.includes('from "zustand"') || code.includes("require('zustand')")) info.hasZustandStore = true;

  let ast;
  try{
    ast = babelParser.parse(code, { sourceType: 'module', plugins: babelPlugins });
  }catch(err){
    info.parseError = String(err && err.message || err);
    return info;
  }

  const hooks = new Set(); const comps = new Set(); const routes = new Set(); const rawImports = [];

  traverse.default(ast, {
    ImportDeclaration(p){
      const src = p.node.source && p.node.source.value;
      if (!src) return;
      rawImports.push(src);
      if (/(\\.css|\\.scss|\\.sass)$/.test(src)) info.cssImports.push(src);
      if (/\\.(png|jpe?g|svg|webp|gif|bmp)$/i.test(src)) info.assetImports.push(src);
    },
    CallExpression(p){
      const callee = p.node.callee;
      if (callee && callee.type === 'Import'){
        const [arg] = p.node.arguments;
        if (arg && arg.type === 'StringLiteral') info.dynamicImports.push(arg.value);
      }
      const name = (callee && callee.name) || (callee && callee.property && callee.property.name);
      if (name && /^use[A-Z0-9_]/.test(name)) hooks.add(name);
    },
    ExportNamedDeclaration(p){
      const { declaration, specifiers } = p.node;
      if (declaration){
        if (declaration.type === 'FunctionDeclaration' && declaration.id?.name){
          info.exports.push(declaration.id.name);
          if (looksLikeComponentName(declaration.id.name)) comps.add(declaration.id.name);
        } else if (declaration.type === 'VariableDeclaration'){
          for (const d of declaration.declarations){
            if (d.id?.name){
              info.exports.push(d.id.name);
              if (looksLikeComponentName(d.id.name)) comps.add(d.id.name);
            }
          }
        } else if (declaration.type === 'ClassDeclaration' && declaration.id?.name){
          info.exports.push(declaration.id.name);
          if (looksLikeComponentName(declaration.id.name)) comps.add(declaration.id.name);
        }
      }
      for (const s of specifiers){
        if (s.exported?.name) info.exports.push(s.exported.name);
      }
    },
    ExportDefaultDeclaration(p){
      info.hasDefaultExport = true;
      const d = p.node.declaration;
      if (d?.type === 'FunctionDeclaration' && d.id?.name){
        info.defaultExportName = d.id.name;
        if (looksLikeComponentName(d.id.name)) comps.add(d.id.name);
      } else if (d?.type === 'Identifier'){
        info.defaultExportName = d.name;
        if (looksLikeComponentName(d.name)) comps.add(d.name);
      }
    },
    JSXElement(p){
      const nameNode = p.node.openingElement.name;
      if (nameNode?.type === 'JSXIdentifier' && nameNode.name === 'Route'){
        const attrs = p.node.openingElement.attributes || [];
        const pathAttr = attrs.find(a => a.type === 'JSXAttribute' && a.name?.name === 'path');
        if (pathAttr?.value){
          if (pathAttr.value.type === 'StringLiteral') routes.add(pathAttr.value.value);
          else if (pathAttr.value.type === 'JSXExpressionContainer' && pathAttr.value.expression.type === 'StringLiteral') routes.add(pathAttr.value.expression.value);
        }
      }
    },
    ObjectProperty(p){
      if (p.node.key?.name === 'path'){
        const v = p.node.value;
        if (v?.type === 'StringLiteral') routes.add(v.value);
      }
    },
  });

  info.imports = await Promise.all(rawImports.map(async (src) => {
    const resolved = await resolveLocalImport(file, src);
    return { source: src, resolvedFile: resolved ? normalize(path.relative(projectRoot, resolved)) : null };
  }));

  info.hooksUsed = Array.from(hooks).sort();
  info.reactComponents = Array.from(comps).sort();
  info.routes = Array.from(routes).sort();
  return info;
}

function buildGraph(manifest){
  const files = manifest.map(m => m.file);
  const fileSet = new Set(files);
  const edges = []; const moduleEdges = [];
  for (const m of manifest){
    for (const im of m.imports){
      if (im.resolvedFile && fileSet.has(im.resolvedFile)) edges.push([m.file, im.resolvedFile]);
      else moduleEdges.push([m.file, im.source]);
    }
    for (const d of m.dynamicImports){ moduleEdges.push([m.file, `dyn:${d}`]); }
  }
  const entries = files.filter(f => {
    const bn = path.basename(f, path.extname(f));
    return INDEX_BASENAMES.includes(bn) && f.includes('/src/');
  });
  const chosen = entries.length ? entries : files.filter(f => /src\\/.*\\.(jsx?|tsx?)$/.test(f)).slice(0,1);
  const adj = new Map();
  for (const [a,b] of edges){ if (!adj.has(a)) adj.set(a, []); adj.get(a).push(b); }
  const reachable = new Set(); const stack = [...chosen];
  while (stack.length){
    const cur = stack.pop();
    if (reachable.has(cur)) continue;
    reachable.add(cur);
    const nexts = adj.get(cur) || [];
    nexts.forEach(n => { if (!reachable.has(n)) stack.push(n); });
  }
  const orphans = files.filter(f => !reachable.has(f));
  return { edges, moduleEdges, entries: chosen, reachable: Array.from(reachable).sort(), orphans };
}

function toDot(graph){
  const lines = ['digraph G {','  rankdir=LR;','  node [shape=box, style=rounded];'];
  for (const [a,b] of graph.edges){ lines.push(`  "${a}" -> "${b}";`); }
  lines.push('}'); return lines.join('\\n');
}

async function main(){
  await ensureOutDir();
  const ignore = EXCLUDE_DIRS.map(d => `**/${d}/**`);
  const files = await fg(['**/*.js','**/*.jsx','**/*.ts','**/*.tsx'], { cwd: projectRoot, ignore, dot: true, absolute: true });
  const targets = files.filter(f => !/\\.d\\.ts$/.test(f));

  const manifest = [];
  for (const f of targets){
    const info = await parseFile(f);
    const st = await statSafe(f);
    info.size = st ? st.size : info.size;
    manifest.push(info);
  }

  const graph = buildGraph(manifest);
  const bySize = [...manifest].sort((a,b) => b.size - a.size).slice(0,20);
  const byImports = [...manifest].sort((a,b) => b.imports.length - a.imports.length).slice(0,20);
  const routes = manifest.flatMap(m => m.routes.map(r => ({ file: m.file, path: r }))).sort((a,b) => a.path.localeCompare(b.path));

  await fs.writeFile(path.join(outDir,'manifest.json'), JSON.stringify(manifest,null,2));
  await fs.writeFile(path.join(outDir,'graph.json'), JSON.stringify(graph,null,2));
  await fs.writeFile(path.join(outDir,'graph.dot'), toDot(graph));

  const md = [];
  md.push('# Code Map Summary');
  md.push(`- Project root: \\`${projectRoot}\\``);
  md.push(`- Files scanned: ${manifest.length}`);
  md.push(`- Entry candidates: ${graph.entries.length ? graph.entries.map(e=>'`'+e+'`').join(', ') : 'None'}`);
  md.push(`- Reachable files: ${graph.reachable.length}`);
  md.push(`- Orphan files: ${graph.orphans.length}`);
  md.push('\\n## Top 20 Largest Files');
  for (const f of bySize) md.push(`- ${f.file} — ${f.size} bytes, ${f.lines} lines`);
  md.push('\\n## Top 20 Import Hubs');
  for (const f of byImports) md.push(`- ${f.file} — ${f.imports.length} imports`);
  md.push('\\n## Routes Found');
  if (!routes.length) md.push('_No routes detected._');
  for (const r of routes) md.push(`- \\`${r.path}\\`  ←  ${r.file}`);
  md.push('\\n## Orphans (not reachable from entries)');
  if (!graph.orphans.length) md.push('_None_');
  for (const o of graph.orphans) md.push(`- ${o}`);
  await fs.writeFile(path.join(outDir,'summary.md'), md.join('\\n'));

  console.log(`[codemap] Wrote outputs to ${outDir}`);
}

main().catch(err => { console.error(err); process.exit(1); });
