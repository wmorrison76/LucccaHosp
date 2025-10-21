#!/usr/bin/env node
import { execSync } from "node:child_process";
import fs from "node:fs";

const out = { ts: {}, imports: {}, vite: {} };

function run(cmd) {
  try { return execSync(cmd, { stdio: "pipe" }).toString(); }
  catch (e) { return e.stdout?.toString() || e.message; }
}

out.ts.typecheck = run("pnpm tsc --noEmit");
out.imports.depcruise = run("pnpm depcruise src --include-only '^src' --ts-config --output-type json");
out.vite.build = run("pnpm vite build --mode analyze || true");

fs.mkdirSync("reports", { recursive: true });
fs.writeFileSync("reports/echo-scan.json", JSON.stringify(out, null, 2));
console.log("Wrote reports/echo-scan.json");
