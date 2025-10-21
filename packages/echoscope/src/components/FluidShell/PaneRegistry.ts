
/**
 * LUCCCA | SEG-A-WB-07
 * Simple pane registry for dynamic imports
 */
export type PaneMeta = {
  id: string;
  title: string;
  component: () => Promise<{ default: React.ComponentType<any> }> | React.ComponentType<any>;
};

class Registry {
  private panes = new Map<string, PaneMeta>();
  register(pane: PaneMeta) {
    this.panes.set(pane.id, pane);
  }
  get(id: string) {
    return this.panes.get(id);
  }
  all() {
    return Array.from(this.panes.values());
  }
}

export const PaneRegistry = new Registry();
