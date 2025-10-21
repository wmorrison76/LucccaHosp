#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

AVATAR_PATH="src/components/ui/avatar.tsx"
mkdir -p "$(dirname "$AVATAR_PATH")"

# Write shadcn/ui Avatar (TSX) if missing
if [ ! -f "$AVATAR_PATH" ]; then
  cat > "$AVATAR_PATH" <<'TS'
import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cn } from "@/lib/utils"

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image ref={ref} className={cn("aspect-square h-full w-full", className)} {...props} />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn("flex h-full w-full items-center justify-center rounded-full bg-muted", className)}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }
TS
  echo "🆕 wrote $AVATAR_PATH"
else
  echo "ℹ️ $AVATAR_PATH already exists (leaving as-is)"
fi

# Ensure dependency is present
if ! npm ls @radix-ui/react-avatar >/dev/null 2>&1; then
  echo "📦 installing @radix-ui/react-avatar…"
  npm i -S @radix-ui/react-avatar
fi

# Clear vite cache and restart dev
rm -rf node_modules/.vite 2>/dev/null || true
echo "🚀 restarting dev (force)…"
npm run dev -- --force
