export type Json = null | boolean | number | string | Json[] | { [k: string]: Json };

export interface AppEvent<T = any> {
  type: string;
  payload?: T;
  sticky?: boolean;
}

export type Disposer = () => void;

export interface Command {
  id: string;
  title: string;
  shortcut?: string;
  run: () => void | Promise<void>;
  keywords?: string[];
  group?: string;
}
