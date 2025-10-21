import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const SEARCH_DIRS = ["src", "echocrm-merged", "archive"]
  .map(d => path.join(ROOT, d))
  .filter(fs.existsSync);
const exts = new Set([".tsx",".ts",".jsx",".js"]);

function* walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (/node_modules|\.vite|dist|build/.test(p)) continue;
      yield* walk(p);
    } else if (exts.has(path.extname(e.name))) {
      yield p;
    }
  }
}

function stripSpecifier(code, mod, name) {
  return code.replace(
    new RegExp(`import\\s*\\{([^}]+)\\}\\s*from\\s*['"]${mod}['"];?`, "g"),
    (m, group) => {
      const names = group.split(",").map(s => s.trim()).filter(Boolean);
      const filtered = names.filter(n => n !== name);
      if (filtered.length === 0) return "";
      return `import { ${filtered.join(", ")} } from '${mod}';`;
    }
  );
}

function ensureLucideImport(code, symbol) {
  const rx = /import\s*\{([^}]+)\}\s*from\s*['"]lucide-react['"];?/;
  if (rx.test(code)) {
    return code.replace(rx, (m, group) => {
      const names = group.split(",").map(s => s.trim()).filter(Boolean);
      if (!names.includes(symbol)) names.push(symbol);
      const dedup = [...new Set(names)];
      return `import { ${dedup.join(", ")} } from 'lucide-react';`;
    });
  }
  return `import { ${symbol} } from 'lucide-react';\n` + code;
}

// map any future fixes here
const REPLACEMENTS = {
  FaTrendingUp: "TrendingUp",
};

let changed = 0;

for (const dir of SEARCH_DIRS) {
  for (const file of walk(dir)) {
    let src = fs.readFileSync(file, "utf8");
    let out = src;

    for (const [from, to] of Object.entries(REPLACEMENTS)) {
      if (!out.includes(from)) continue;
      out = out.replace(new RegExp(`\\b${from}\\b`, "g"), to);
      out = stripSpecifier(out, "react-icons/fa", from);
      out = stripSpecifier(out, "react-icons/all", from);
      out = ensureLucideImport(out, to);
    }

    if (out !== src) {
      fs.writeFileSync(file, out);
      console.log("🛠  Patched", path.relative(ROOT, file));
      changed++;
    }
  }
}

console.log(changed ? `✅ Updated ${changed} file(s).` : "ℹ️  No files needed changes (FaTrendingUp not found).");
