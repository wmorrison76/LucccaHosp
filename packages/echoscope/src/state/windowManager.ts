
/**
 * LUCCCA | SEG-A-WB-01 (Patch precision 0.00001)
 * Zustand-like minimal store (no external dep) for panes.
 */
export type PaneState = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
};

type Listener = (state: State) => void;
type State = { panes: PaneState[] };

let state: State = { panes: [] };
const listeners: Listener[] = [];

export const windowManager = {
  getState: () => state,
  setState: (partial: Partial<State>) => {
    state = { ...state, ...partial };
    listeners.forEach((l) => l(state));
  },
  subscribe: (listener: Listener) => {
    listeners.push(listener);
    return () => {
      const i = listeners.indexOf(listener);
      if (i > -1) listeners.splice(i, 1);
    };
  },
  createPane: (pane: PaneState) => {
    windowManager.setState({ panes: [...state.panes, pane] });
  },
  movePane: (id: string, x: number, y: number) => {
    windowManager.setState({
      panes: state.panes.map((p) => (p.id === id ? { ...p, x, y } : p)),
    });
  },
};
