
/**
 * LUCCCA | SEG-A-WB-18
 * Track and restore focus.
 */
let lastFocused: HTMLElement | null = null;

export const FocusManager = {
  remember(el: HTMLElement) {
    lastFocused = el;
  },
  restore() {
    if (lastFocused) {
      lastFocused.focus();
    }
  },
};
