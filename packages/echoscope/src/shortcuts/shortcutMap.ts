
/**
 * LUCCCA | SEG-A-WB-08
 * Define global / per-pane shortcuts. Collision detection provided by test.
 */
export type Shortcut = {
  combo: string; // e.g. 'ctrl+k'
  scope: 'global' | string; // pane id, etc.
  action: string; // command id
};

export const shortcutMap: Shortcut[] = [
  { combo: 'ctrl+k', scope: 'global', action: 'command.palette' },
  { combo: 'ctrl+shift+s', scope: 'global', action: 'pane.spawn.schedule' },
];
