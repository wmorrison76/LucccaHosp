import fs from "fs";
import path from "path";

const projectRoot = process.cwd();
const scanRoots = [
  "src/modules/crm/client",
];
const outDir = path.join(projectRoot, "src/components/ui");

const exts = [".ts", ".tsx", ".js", ".jsx"];
const files = [];

// Recursively collect files
function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p);
    else if (exts.includes(path.extname(ent.name))) files.push(p);
  }
}

for (const root of scanRoots) {
  const abs = path.join(projectRoot, root);
  if (fs.existsSync(abs)) walk(abs);
}

// Collect imports: map of uiPath -> { defaultUsed?: boolean, names: Set<string> }
const uiImports = new Map();
/**
 * Matches:
 *  import X from "@/components/ui/<p>";
 *  import { A, B as C } from "@/components/ui/<p>";
 *  import X, { A, B as C } from "@/components/ui/<p>";
 */
const importRe = /import\s+([^'"]+)\s+from\s+["']@\/components\/ui\/([^"']+)["'];?/g;

for (const file of files) {
  const src = fs.readFileSync(file, "utf8");
  let m;
  while ((m = importRe.exec(src))) {
    const clause = m[1].trim();
    const uiPath = m[2].trim();

    if (!uiImports.has(uiPath)) {
      uiImports.set(uiPath, { defaultUsed: false, names: new Set() });
    }
    const entry = uiImports.get(uiPath);

    // clause examples:
    // - DefaultOnly: Button
    // - NamedOnly: { A, B as C }
    // - Both: Button, { A, B as C }
    const parts = clause.split(",").map(s => s.trim()).filter(Boolean);
    for (const part of parts) {
      if (part.startsWith("{")) {
        // Named imports
        const inside = part.slice(1, -1);
        for (const seg of inside.split(",").map(s => s.trim()).filter(Boolean)) {
          // A or B as C
          const m2 = seg.match(/^([A-Za-z0-9_]+)(\s+as\s+([A-Za-z0-9_]+))?$/);
          if (m2) {
            const name = m2[3] || m2[1];
            entry.names.add(name);
          }
        }
      } else {
        // Default import identifier
        const ident = part.split(/\s+/)[0];
        if (ident && ident !== "*") {
          entry.defaultUsed = true;
          // Some projects also immediately use default as a name; export it too
          entry.names.add(ident);
        }
      }
    }
  }
}

// Helper: generate basic component for a given name
const stubComponent = (name) => `
export const ${name} = React.forwardRef<any, any>(function ${name}(props, ref) {
  return React.createElement(props?.as || "div", { ref, ...props }, props?.children);
});
`;

// Create output files
fs.mkdirSync(outDir, { recursive: true });
for (const [uiPath, { defaultUsed, names }] of uiImports.entries()) {
  const outPath = path.join(outDir, uiPath + (path.extname(uiPath) ? "" : ".tsx"));
  const outDirname = path.dirname(outPath);
  fs.mkdirSync(outDirname, { recursive: true });

  if (fs.existsSync(outPath)) {
    console.log(`↩️  Skip (exists): ${path.relative(projectRoot, outPath)}`);
    continue;
  }

  // Minimal heuristics for a few common files
  const base = path.basename(outPath).replace(/\.(t|j)sx?$/, "");
  let extra = "";

  // Provide small specialized defaults for a few common components
  if (base === "input") {
    extra = `
export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(function Input(props, ref) {
  const cls = ["border rounded px-2 py-1", props.className].filter(Boolean).join(" ");
  return <input ref={ref} {...props} className={cls} />;
});
export default Input;
`;
  } else if (base === "button") {
    extra = `
export const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(function Button(props, ref) {
  const cls = ["px-3 py-2 rounded-md border bg-white/70 dark:bg-slate-900/60 hover:bg-black/5 dark:hover:bg-cyan-500/10", props.className].filter(Boolean).join(" ");
  return <button ref={ref} {...props} className={cls} />;
});
export default Button;
`;
  } else if (base === "card") {
    extra = `
export function Card(props: any){ return <div {...props} className={["rounded-lg border p-3 bg-white/70 dark:bg-slate-900/60", props.className].join(" ")} /> }
export function CardHeader(props: any){ return <div {...props} className={["mb-2 font-semibold", props.className].join(" ")} /> }
export function CardTitle(props: any){ return <h3 {...props} className={["text-lg font-bold", props.className].join(" ")} /> }
export function CardDescription(props: any){ return <p {...props} className={["text-sm opacity-70", props.className].join(" ")} /> }
export function CardContent(props: any){ return <div {...props} /> }
export default Card;
`;
  } else if (base === "badge") {
    extra = `
export function Badge(props: any){ return <span {...props} className={["inline-block px-2 py-0.5 text-xs rounded bg-black/10 dark:bg-cyan-500/20", props.className].join(" ")} /> }
export default Badge;
`;
  } else if (base === "scroll-area") {
    extra = `
export function ScrollArea(props: any){ return <div {...props} style={{ overflowY: "auto", maxHeight: "100%" }} /> }
export default ScrollArea;
`;
  } else if (base === "tooltip") {
    extra = `
export function TooltipProvider({ children }: any){ return <>{children}</>; }
export function Tooltip({ children }: any){ return <>{children}</>; }
export function TooltipTrigger({ children }: any){ return <>{children}</>; }
export function TooltipContent({ children }: any){ return <>{children}</>; }
`;
  } else if (base === "toaster") {
    extra = `
import { Toaster as SonnerToaster } from "sonner";
export function Toaster(props: any){ return <SonnerToaster {...props} /> }
export default Toaster;
`;
  } else if (base === "sonner") {
    extra = `
export { Toaster as Sonner } from "sonner";
`;
  } else {
    // Generic: create each named component and a default if needed
    const comps = Array.from(names);
    const bodies = comps.map(stubComponent).join("\n");
    const def = defaultUsed ? `
const DefaultShim = React.forwardRef<any, any>(function DefaultShim(props, ref) {
  return React.createElement(props?.as || "div", { ref, ...props }, props?.children);
});
export default DefaultShim;
` : "";
    extra = bodies + def;
  }

  const fileSource = `import React from "react";\n${extra}\n`;
  fs.writeFileSync(outPath, fileSource, "utf8");
  console.log(`🧩 Wrote shim: ${path.relative(projectRoot, outPath)}`);
}

console.log("✅ Done generating UI shims.");
