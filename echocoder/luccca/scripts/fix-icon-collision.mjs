import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const SEARCH_DIRS = ["src", "echocrm-merged", "archive"]
  .map(d => path.join(ROOT, d))
  .filter(fs.existsSync);

const EXTS = new Set([".tsx",".ts",".jsx",".js"]);

function* walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (/node_modules|\.vite|dist|build/.test(p)) continue;
      yield* walk(p);
    } else if (EXTS.has(path.extname(e.name))) {
      yield p;
    }
  }
}

function stripFromReactIcons(code, names = ["TrendingUp", "FaTrendingUp"]) {
  // remove named bindings from react-icons imports
  code = code.replace(
    /import\s*\{([^}]+)\}\s*from\s*['"]react-icons(?:\/[^'"]*)?['"];?[ \t]*\n?/g,
    (m, group) => {
      const items = group.split(",").map(s => s.trim()).filter(Boolean);
      const keep = items.filter(n => !names.includes(n) && !/\bFaTrendingUp\s+as\s+TrendingUp\b/.test(n));
      if (keep.length === 0) return "";
      return `import { ${keep.join(", ")} } from 'react-icons/fa';\n`;
    }
  );
  // remove default import form
  code = code.replace(
    /import\s+TrendingUp\s*(,\s*\{[^}]*\}\s*)?from\s*['"]react-icons(?:\/[^'"]*)?['"];?[ \t]*\n?/g,
    (_m, rest) => (rest ? `import ${rest.trim()} from 'react-icons/fa';\n` : "")
  );
  return code;
}

function ensureLucide(code, sym = "TrendingUp") {
  const rx = /import\s*\{([^}]+)\}\s*from\s*['"]lucide-react['"];?/;
  if (rx.test(code)) {
    return code.replace(rx, (m, group) => {
      const names = group.split(",").map(s => s.trim()).filter(Boolean);
      if (!names.includes(sym)) names.push(sym);
      const dedup = [...new Set(names)];
      return `import { ${dedup.join(", ")} } from 'lucide-react';`;
    });
  }
  return `import { ${sym} } from 'lucide-react';\n` + code;
}

let changed = 0;
for (const dir of SEARCH_DIRS) {
  for (const file of walk(dir)) {
    let src = fs.readFileSync(file, "utf8");
    if (!/TrendingUp|FaTrendingUp/.test(src)) continue;
    let out = ensureLucide(stripFromReactIcons(src), "TrendingUp");
    if (out !== src) {
      fs.writeFileSync(file, out);
      console.log("🛠  Patched", path.relative(ROOT, file));
      changed++;
    }
  }
}
console.log(changed ? `✅ Updated ${changed} file(s).` : "ℹ️  No files needed changes.");
