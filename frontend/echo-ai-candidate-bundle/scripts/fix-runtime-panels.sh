#!/usr/bin/env bash
set -euo pipefail

ROOT="$(pwd)"

echo "🧹 Scrubbing stray here-doc tokens (EOF, number, string, boolean)…"
# Remove lines that are *just* EOF/number/string/boolean (common paste artifacts)
# Safe for TS/JS/CSS because it only removes standalone tokens.
find src -type f \( -name '*.ts' -o -name '*.tsx' -o -name '*.js' -o -name '*.jsx' -o -name '*.css' \) -print0 \
| xargs -0 perl -i -pe 's/^\s*(EOF|number|string|boolean)\s*;?\s*$//g'

echo "🔧 Replacing minimal, safe dialog + table stubs…"
mkdir -p src/components/ui

# dialog.tsx — minimal stub with proper asChild behavior on DialogTrigger
cat > src/components/ui/dialog.tsx <<'TSX'
import * as React from "react";

export function Dialog(props: React.HTMLAttributes<HTMLDivElement> & {open?: boolean; onOpenChange?: (v:boolean)=>void}) {
  return <>{props.children}</>;
}

export function DialogContent({ children, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return <div role="dialog" {...rest}>{children}</div>;
}

export function DialogHeader({ children, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...rest}>{children}</div>;
}

export function DialogTitle({ children, ...rest }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 {...rest}>{children}</h3>;
}

type TriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean; children: React.ReactNode };
export function DialogTrigger({ asChild, children, ...rest }: TriggerProps) {
  if (asChild && React.isValidElement(children)) {
    // Radix-style asChild: don't add extra DOM; pass props into child
    return React.cloneElement(children as React.ReactElement, { ...rest, ...(children as any).props });
  }
  return <button type="button" {...rest}>{children}</button>;
}

export const DialogDescription = (props: React.HTMLAttributes<HTMLParagraphElement>) => <p {...props} />;
export const DialogFooter = (props: React.HTMLAttributes<HTMLDivElement>) => <div {...props} />;
TSX

# table.tsx — tiny table primitives so imports resolve
cat > src/components/ui/table.tsx <<'TSX'
import * as React from "react";

export const Table = (p: React.TableHTMLAttributes<HTMLTableElement>) => <table {...p} />;
export const TableHeader = (p: React.HTMLAttributes<HTMLTableSectionElement>) => <thead {...p} />;
export const TableBody = (p: React.HTMLAttributes<HTMLTableSectionElement>) => <tbody {...p} />;
export const TableFooter = (p: React.HTMLAttributes<HTMLTableSectionElement>) => <tfoot {...p} />;
export const TableRow = (p: React.HTMLAttributes<HTMLTableRowElement>) => <tr {...p} />;
export const TableHead = (p: React.ThHTMLAttributes<HTMLTableHeaderCellElement>) => <th {...p} />;
export const TableCell = (p: React.TdHTMLAttributes<HTMLTableCellElement>) => <td {...p} />;
export const TableCaption = (p: React.HTMLAttributes<HTMLTableCaptionElement>) => <caption {...p} />;
TSX

echo "🔗 Normalizing 'sonner' barrel so it exports { Toaster } once (no duplicates)…"
cat > src/components/ui/sonner.tsx <<'TSX'
export { default as Toaster } from "./toaster";
// re-export toast bits if you need them elsewhere
export { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "./toast";
TSX

# If someone imported from a capitalized path, normalize it
grep -RIl 'from "@/components/ui/Sonner"' src 2>/dev/null | xargs -I{} sed -i '' 's#@/components/ui/Sonner#@/components/ui/sonner#g' {} || true

echo "🧪 Checking for any remaining standalone tokens…"
if grep -RIn '^\s*\(EOF\|number\|string\|boolean\)\s*;*\s*$' src >/dev/null 2>&1; then
  echo "⚠️  Some standalone tokens still exist. Listing a few:"
  grep -RIn '^\s*\(EOF\|number\|string\|boolean\)\s*;*\s*$' src | head -20
else
  echo "✅ No stray standalone tokens detected."
fi

echo "🧼 Clearing Vite cache…"
rm -rf node_modules/.vite 2>/dev/null || true

echo "🚀 Starting dev server (force)…"
npm run dev -- --force
