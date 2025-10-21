export interface WidgetMeta {
  id: string;
  title: string;
  version?: string;
  tags?: string[];
}

export type WidgetRender = (el: HTMLElement, props?: any) => void | (() => void);

export interface DataAdapter {
  id: string;
  get: (key: string) => Promise<any>;
  set: (key: string, value: any) => Promise<void>;
}

const widgets = new Map<string, { meta: WidgetMeta; render: WidgetRender }>();
const adapters = new Map<string, DataAdapter>();

export function registerWidget(meta: WidgetMeta, render: WidgetRender) {
  widgets.set(meta.id, { meta, render });
}

export function useWidget(id: string) {
  return widgets.get(id);
}

export function registerAdapter(adapter: DataAdapter){ adapters.set(adapter.id, adapter); }
export function getAdapter(id: string){ return adapters.get(id); }

export default registerWidget;
