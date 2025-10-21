// Minimal time management types + defaults
export interface Task { id: string; title: string; status: 'todo'|'doing'|'done'; priority?: 'low'|'medium'|'high'; }
export interface TimeEntry { id: string; taskId?: string; minutes: number; date: string; note?: string; }
export const defaultTasks: Task[] = [
  { id: 't-1', title: 'Call leads', status: 'todo', priority: 'high' },
  { id: 't-2', title: 'Prepare proposal', status: 'doing' },
];
export const defaultTimeEntries: TimeEntry[] = [];
