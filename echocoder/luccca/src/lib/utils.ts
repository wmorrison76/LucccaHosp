/**
 * Utility helpers for className merging etc.
 */

// Simple Tailwind className combiner (like clsx + tw-merge lite)
export function cn(...args: Array<string | false | null | undefined>) {
  return args.filter(Boolean).join(" ");
}
