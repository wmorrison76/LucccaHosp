#!/usr/bin/env bash
set -euo pipefail

# 1) Create/overwrite toaster.tsx with named + default export
mkdir -p src/components/ui
cat > src/components/ui/toaster.tsx <<'TSX'
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

# 2) Ensure toast.* exists and re-exports BOTH named + default Toaster
toast=""
for ext in tsx ts jsx js; do
  f="src/components/ui/toast.$ext"
  if [ -f "$f" ]; then toast="$f"; break; fi
done

if [ -z "$toast" ]; then
  toast="src/components/ui/toast.ts"
  cat > "$toast" <<'TSHIM'
// Minimal shim — replace with your real toast impl when ready.
export const Toast = (p:any) => <div {...p} />;
export const ToastClose = (p:any) => <button {...p} />;
export const ToastDescription = (p:any) => <div {...p} />;
export const ToastProvider = (p:any) => <>{p.children}</>;
export const ToastTitle = (p:any) => <div {...p} />;
export const ToastViewport = (p:any) => <div {...p} />;
TSHIM
  echo "🧩 created toast shim at $toast"
fi

# Remove any previous Toaster re-export lines and add the canonical one
tmp="$(mktemp)"
awk '{
  if ($0 ~ /export .*Toaster .*from "[.][/]toaster"/) next;
  print;
} END {
  print "export { Toaster as default, Toaster } from \"./toaster\";";
}' "$toast" > "$tmp"
mv "$tmp" "$toast"
echo "🛠  ensured \"$toast\" exports both default and named Toaster"

# 3) Normalize any capitalized import paths
grep -RIl 'from "@/components/ui/Toaster"' src 2>/dev/null | xargs -I{} sed -i '' 's#@/components/ui/Toaster#@/components/ui/toaster#g' {} || true

# 4) Clear Vite cache and restart
rm -rf node_modules/.vite 2>/dev/null || true
echo "🚀 restarting dev (force)…"
npm run dev -- --force
