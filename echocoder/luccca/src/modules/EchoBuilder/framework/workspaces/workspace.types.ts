export interface Workspace {
  id: string;
  name: string;
  // serialized layout payload (panels, positions, app-specific)
  layout: unknown;
  createdAt: number;
  updatedAt: number;
}

export interface WorkspacesApi {
  list: () => Workspace[];
  save: (ws: Omit<Workspace, "id" | "createdAt" | "updatedAt"> & { id?: string }) => Workspace;
  remove: (id: string) => void;
  load: (id: string) => Workspace | undefined;
  currentId: string | null;
  setCurrent: (id: string | null) => void;
}
