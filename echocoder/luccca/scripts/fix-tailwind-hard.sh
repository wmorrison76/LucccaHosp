#!/usr/bin/env bash
set -euo pipefail

echo "▶️ Tailwind hard fix…"

# 0) Sanity
[ -f package.json ] || { echo "❌ Run from your project root (has package.json)"; exit 1; }

# 1) Deps
echo "📦 ensuring tailwind deps…"
npm i -D tailwindcss postcss autoprefixer tailwindcss-animate >/dev/null 2>&1 || true

# 2) Force JS tailwind config with shadcn tokens + safelist
cat > tailwind.config.js <<'JS'
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}",
    "./src/modules/**/*.{ts,tsx,js,jsx}",
  ],
  safelist: [
    "border-border",
    "bg-background",
    "text-foreground",
    { pattern: /(bg|text|border)-(background|foreground|muted|muted-foreground|popover|popover-foreground|card|card-foreground|primary|primary-foreground|secondary|secondary-foreground|accent|accent-foreground|destructive|destructive-foreground)/ }
  ],
  theme: {
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
JS
echo "✅ tailwind.config.js written"

# (Optional) park any TS config so Tailwind doesn’t ignore the JS one
[ -f tailwind.config.ts ] && mv -f tailwind.config.ts tailwind.config.ts.bak && echo "🗂  moved tailwind.config.ts -> .bak"

# 3) PostCSS config
cat > postcss.config.js <<'JS'
module.exports = { plugins: { tailwindcss: {}, autoprefixer: {} } };
JS
echo "✅ postcss.config.js written"

# 4) Stub legacy import so Vite stops yelling
mkdir -p src
[ -f src/backboard.skin.css ] || echo "/* stub */" > src/backboard.skin.css

# 5) Fix index.css and centralize tokens
cp -f src/index.css src/index.css.pre-tailwind-bak 2>/dev/null || true
cat > src/index.css <<'CSS'
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;

    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;

    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;

    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;

    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 215 20.2% 65.1%;

    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;

    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;

    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;

    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;

    --radius: 0.5rem;
  }
  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;

    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;

    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;

    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;

    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 215 20.2% 65.1%;

    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;

    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;

    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;

    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
  }

  * { @apply border-border; }
  body { @apply bg-background text-foreground; }
}
CSS
echo "✅ src/index.css written"

# 6) Strip stray @tailwind lines elsewhere to avoid layer order mess
echo "🧹 cleaning duplicate @tailwind directives…"
node - <<'NODE'
const fs = require('fs'), path = require('path');
function walk(d){return fs.readdirSync(d,{withFileTypes:true}).flatMap(x=>{const p=path.join(d,x.name);return x.isDirectory()?walk(p):[p];});}
if (fs.existsSync('src')) {
  for (const f of walk('src').filter(f=>f.endsWith('.css') && f!=='src/index.css' && !f.endsWith('backboard.skin.css'))) {
    let s = fs.readFileSync(f,'utf8'), t = s;
    t = t.replace(/@tailwind\s+base;?/g,'').replace(/@tailwind\s+components;?/g,'').replace(/@tailwind\s+utilities;?/g,'');
    if (t!==s){ fs.writeFileSync(f,t); console.log('  • cleaned', f); }
  }
}
NODE

# 7) Ensure main entry imports index.css
for ENTRY in src/main.tsx src/main.jsx; do
  if [ -f "$ENTRY" ] && ! grep -q "import './index.css'" "$ENTRY"; then
    sed -i.bak '1s;^;import "./index.css";\n;' "$ENTRY" || {
      # macOS BSD sed fallback
      tmp="$ENTRY.tmp.$$"; echo 'import "./index.css";' > "$tmp"; cat "$ENTRY" >> "$tmp"; mv "$tmp" "$ENTRY";
    }
    echo "🔗 added import to $ENTRY"
  fi
done

# 8) Clear Vite cache & start dev
rm -rf node_modules/.vite 2>/dev/null || true
echo "🚀 starting dev…"
npm run dev -- --force
