export type Json = null | boolean | number | string | Json[] | { [k: string]: Json };

export interface AppEvent<T = any> {
  type: string;
  payload?: T;
  // if true, event should be 'sticky' and replayed to late listeners until cleared
  sticky?: boolean;
}

export type Disposer = () => void;

export interface Command {
  id: string;
  title: string;
  shortcut?: string; // e.g. "mod+K"
  run: () => void | Promise<void>;
  keywords?: string[];
  group?: string;
}
