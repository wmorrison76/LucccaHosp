#!/usr/bin/env bash
set -euo pipefail

# 0) Make sure we're in the project root
cd "$(pwd)"

# 1) Ensure folders exist
mkdir -p src/components/ui src/hooks

# 2) Write a clean toaster.tsx (named + default export, no duplicates)
cat > src/components/ui/toaster.tsx <<'TSX'
import * as React from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, ...props }) => (
        <Toast key={id} {...props}>
          <div className="grid gap-1">
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
          </div>
          {action}
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}

export default Toaster;
TSX

# 3) Re-export shim so imports from "@/components/ui/sonner" keep working
cat > src/components/ui/sonner.tsx <<'TSX'
export { default, Toaster } from "./toaster";
TSX

# 4) Minimal hook shim (only if missing) so UI can render
if [ ! -f src/hooks/use-toast.ts ]; then
  cat > src/hooks/use-toast.ts <<'TS'
import * as React from "react";

export type ToastItem = {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
} & Record<string, any>;

const Ctx = React.createContext<{ toasts: ToastItem[] }>({ toasts: [] });
export function useToast() {
  return React.useContext(Ctx);
}
TS
fi

# 5) Minimal toast primitives (only if missing)
if [ ! -f src/components/ui/toast.tsx ]; then
  cat > src/components/ui/toast.tsx <<'TSX'
import * as React from "react";
export const Toast = (p: React.HTMLAttributes<HTMLDivElement>) => <div {...p} />;
export const ToastTitle = (p: React.HTMLAttributes<HTMLDivElement>) => <div {...p} />;
export const ToastDescription = (p: React.HTMLAttributes<HTMLDivElement>) => <div {...p} />;
export const ToastClose = (p: React.ButtonHTMLAttributes<HTMLButtonElement>) => <button {...p} />;
export const ToastViewport = (p: React.HTMLAttributes<HTMLDivElement>) => <div {...p} />;
export const ToastProvider = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export default {};
TSX
fi

# 6) Normalize any capitalized Toaster import paths
grep -RIl 'from "@/components/ui/Toaster"' src 2>/dev/null | xargs -I{} sed -i '' 's#@/components/ui/Toaster#@/components/ui/toaster#g' {} || true

# 7) Clear Vite cache & restart dev
rm -rf node_modules/.vite 2>/dev/null || true
echo "🚀 restarting dev (force)…"
npm run dev -- --force
