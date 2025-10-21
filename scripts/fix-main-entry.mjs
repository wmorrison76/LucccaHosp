import fs from "fs";
import path from "path";

const ROOT = path.resolve(process.argv[2] || ".");
const SRC_A = path.join(ROOT, "frontend", "src");
const SRC_B = path.join(ROOT, "src");
const SRC = fs.existsSync(SRC_A) ? SRC_A : SRC_B;

if (!fs.existsSync(SRC)) {
  console.error("✗ Couldn't find src. Tried:", SRC_A, "and", SRC_B);
  process.exit(1);
}

const idxHtmlA = path.join(ROOT, "frontend", "index.html");
const idxHtmlB = path.join(ROOT, "index.html");
const IDX = fs.existsSync(idxHtmlA) ? idxHtmlA : idxHtmlB;

function patch(file, mut) {
  if (!fs.existsSync(file)) return false;
  const before = fs.readFileSync(file, "utf8");
  const after = mut(before);
  if (after !== before) {
    try { fs.copyFileSync(file, file + ".bak_mainfix"); } catch {}
    fs.writeFileSync(file, after, "utf8");
    console.log("✓ patched", path.relative(ROOT, file));
    return true;
  }
  console.log("= ok", path.relative(ROOT, file));
  return false;
}

// 1) Ensure index.html points at /src/main.tsx
if (fs.existsSync(IDX)) {
  patch(IDX, (s) => s.replace(/\/src\/main\.jsx/g, "/src/main.tsx"));
}

// 2) Make main.jsx a shim (or strip TS if you want to keep content)
const MAIN_JSX = path.join(SRC, "main.jsx");
const MAIN_TSX = path.join(SRC, "main.tsx");

if (fs.existsSync(MAIN_JSX)) {
  const text = fs.readFileSync(MAIN_JSX, "utf8");
  const looksLikeTSinJSX = /:\s*any\b/.test(text) || /import\s+type\s+/.test(text);

  if (looksLikeTSinJSX && fs.existsSync(MAIN_TSX)) {
    // Prefer clean shim to the TS-in-JSX
    fs.copyFileSync(MAIN_JSX, MAIN_JSX + ".bak_mainfix");
    fs.writeFileSync(MAIN_JSX, `// shim for tools that request /src/main.jsx\nimport "./main.tsx";\n`, "utf8");
    console.log("✓ wrote shim main.jsx → imports ./main.tsx");
  } else if (looksLikeTSinJSX) {
    // Strip the obvious TS annotations as a fallback
    patch(MAIN_JSX, (s) =>
      s
        .replace(/catch\s*\(\s*([^)]+)\s*:\s*any\s*\)/g, "catch($1)")
        .replace(/<([A-Za-z]+)\s+([^>]*)as\s*=\s*{[^}]+}([^>]*)>/g, "<$1 $2 $3>")
    );
  } else {
    console.log("= main.jsx looks fine");
  }
} else {
  console.log("= no main.jsx present (that’s fine)");
}

// 3) Sanity: ensure main.tsx exists
if (!fs.existsSync(MAIN_TSX)) {
  console.warn("! main.tsx not found. If your entry is different, update index.html accordingly.");
}

console.log("\nDone. If Vite was running, restart it:");
console.log("  cd frontend && rm -rf node_modules/.vite && pnpm dev");
