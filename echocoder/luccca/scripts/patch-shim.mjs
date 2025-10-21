#!/usr/bin/env node
import fs from "fs";
import path from "path";

const SRC = path.join(process.cwd(), "src");

const shimPath = path.join(SRC, "components/WhiteboardPanel.jsx");
if (!fs.existsSync(shimPath)) {
  fs.writeFileSync(
    shimPath,
    `export { WhiteboardPanel as default } from "./whiteboard/WhiteboardPanel.js";\n`
  );
  console.log("✓ wrote shim WhiteboardPanel.jsx");
}

const boardPath = path.join(SRC, "board/Board.jsx");
if (fs.existsSync(boardPath)) {
  let s = fs.readFileSync(boardPath, "utf8");
  if (!s.includes("lazyPick")) {
    s = s.replace(
      /import React.*from "react";/,
      `import React from "react";\n\nconst lazyPick = (loader, key = "default") => React.lazy(() => loader().then(m => ({ default: m[key] ?? m.default ?? m })));`
    );
    fs.writeFileSync(boardPath, s);
    console.log("✓ patched Board.jsx with lazyPick");
  }
}

console.log("==> Done. Restart your dev server.");

