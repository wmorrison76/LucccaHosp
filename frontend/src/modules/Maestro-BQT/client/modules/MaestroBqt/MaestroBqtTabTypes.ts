export type UUID = string;
export type MaestroBqtTabKind = 'LINK' | 'PANEL' | 'ROUTE';
export interface MaestroBqtTab { id: UUID; title: string; icon?: string; kind: MaestroBqtTabKind; payload?: any; color?: string; pinned?: boolean; hidden?: boolean; }
export interface MaestroBqtTabRow { id: UUID; name: string; tabs: MaestroBqtTab[]; }
export interface MaestroBqtTabState { rows: MaestroBqtTabRow[]; active?: { rowId: UUID; tabId: UUID } | null; }
