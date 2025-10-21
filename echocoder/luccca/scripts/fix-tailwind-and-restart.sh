#!/usr/bin/env bash
set -euo pipefail

echo "▶️ Tailwind/shadcn quick-fix starting..."

# --- sanity: must be at project root ---
if [ ! -f package.json ]; then
  echo "❌ package.json not found. cd into your project root (frontend) and run again."
  exit 1
fi

# --- install dev deps (idempotent) ---
echo "📦 installing tailwindcss + plugins (dev deps)..."
npm i -D tailwindcss postcss autoprefixer tailwindcss-animate >/dev/null 2>&1 || true

# --- write tailwind.config.ts ---
cat > tailwind.config.ts <<'TS'
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}",
    "./src/modules/**/*.{ts,tsx,js,jsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" }
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
TS
echo "✅ wrote tailwind.config.ts"

# --- write postcss.config.js ---
cat > postcss.config.js <<'JS'
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
JS
echo "✅ wrote postcss.config.js"

# --- stub backboard.skin.css so imports don't explode ---
mkdir -p src
if [ ! -f src/backboard.skin.css ]; then
  echo "/* empty stub for legacy import; safe to delete if unused */" > src/backboard.skin.css
  echo "✅ stubbed src/backboard.skin.css"
fi

# --- ensure index.css exists with tokens and single @tailwind layer ---
mkdir -p src
if [ ! -f src/index.css ]; then
  NEW_CONTENT=1
else
  NEW_CONTENT=0
  cp src/index.css src/index.css.bak 2>/dev/null || true
fi

node - <<'NODE'
const fs = require('fs');
const path = require('path');

const idx = path.join('src', 'index.css');
let prev = fs.existsSync(idx) ? fs.readFileSync(idx, 'utf8') : '';

/** drop any import of backboard.skin.css */
prev = prev.replace(/@import\s+["']\.\/backboard\.skin\.css["'];?\s*/g, '');

/** drop duplicate tailwind layer lines from previous */
prev = prev
  .replace(/@tailwind\s+base;\s*/g, '')
  .replace(/@tailwind\s+components;\s*/g, '')
  .replace(/@tailwind\s+utilities;\s*/g, '');

const base = `@tailwind base;
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

/* Keep any previous custom styles below */
`;

fs.writeFileSync(idx, base + '\n/* --- previous index.css (sanitized) --- */\n' + prev);
console.log('✅ wrote src/index.css');
NODE

# --- strip @tailwind lines from other scattered css files (avoid multiple bases) ---
echo "🧹 cleaning duplicate @tailwind directives in module css..."
node - <<'NODE'
const fs = require('fs');
const path = require('path');

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(d => {
    const p = path.join(dir, d.name);
    return d.isDirectory() ? walk(p) : [p];
  });
}

const allCss = [];
if (fs.existsSync('src')) allCss.push(...walk('src').filter(f => f.endsWith('.css')));
for (const file of allCss) {
  if (file === 'src/index.css' || file.endsWith('backboard.skin.css')) continue;
  let s = fs.readFileSync(file, 'utf8');
  const before = s;
  s = s.replace(/@tailwind\s+base;\s*/g, '')
       .replace(/@tailwind\s+components;\s*/g, '')
       .replace(/@tailwind\s+utilities;\s*/g, '');
  if (s !== before) {
    fs.writeFileSync(file, s);
    console.log('  • cleaned', file);
  }
}
NODE

# --- make sure main entry imports index.css ---
echo "🔗 ensuring main entry imports src/index.css..."
for ENTRY in src/main.tsx src/main.jsx; do
  if [ -f "$ENTRY" ]; then
    if ! grep -q "import './index.css'" "$ENTRY"; then
      # put the import at the top
      tmp="$ENTRY.tmp.$$"
      echo "import './index.css';" > "$tmp"
      cat "$ENTRY" >> "$tmp"
      mv "$tmp" "$ENTRY"
      echo "  • added import to $ENTRY"
    fi
  fi
done

# --- clear vite cache and restart ---
if [ -d node_modules/.vite ]; then
  echo "🧽 clearing Vite cache..."
  rm -rf node_modules/.vite
fi

echo "🚀 starting dev server..."
npm run dev -- --force
