import fs from "node:fs";

const files = [
  "src/components/settings/sections/ZAROAdminPanel.jsx",
  "src/settings/ZAROAdminPanel.jsx",
];

for (const f of files) {
  if (!fs.existsSync(f)) continue;
  const before = fs.readFileSync(f, "utf8");
  const after = before
    .replace(/\\`/g, "`")       // unescape backticks
    .replace(/\\\$\{/g, "${");  // unescape ${ ... }
  if (after !== before) {
    fs.writeFileSync(f, after, "utf8");
    console.log("✔ fixed", f);
  } else {
    console.log("• no change", f);
  }
}
