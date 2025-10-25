/**
 * LUCCCA | Cake Design Storage
 * Persistent storage for cake designs using LocalStorage
 * Can be extended to use backend API or Supabase
 */

import { CakeDesign, ProductionTask } from './types';

const STORAGE_KEY = 'luccca_cake_designs';
const TASKS_KEY = 'luccca_production_tasks';

/**
 * Initialize storage (create if not exists)
 */
export function initializeStorage(): void {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  }
  if (!localStorage.getItem(TASKS_KEY)) {
    localStorage.setItem(TASKS_KEY, JSON.stringify([]));
  }
}

/**
 * Save a cake design
 */
export function saveCakeDesign(design: CakeDesign): CakeDesign {
  initializeStorage();
  const designs = getAllCakeDesigns();

  // Check if design already exists
  const existingIndex = designs.findIndex((d) => d.id === design.id);

  if (existingIndex !== -1) {
    designs[existingIndex] = design;
  } else {
    designs.push(design);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(designs));
  return design;
}

/**
 * Get all cake designs
 */
export function getAllCakeDesigns(): CakeDesign[] {
  initializeStorage();
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading cake designs:', error);
    return [];
  }
}

/**
 * Get a specific cake design by ID
 */
export function getCakeDesignById(id: string): CakeDesign | null {
  const designs = getAllCakeDesigns();
  return designs.find((d) => d.id === id) || null;
}

/**
 * Delete a cake design
 */
export function deleteCakeDesign(id: string): boolean {
  initializeStorage();
  const designs = getAllCakeDesigns();
  const filtered = designs.filter((d) => d.id !== id);

  if (filtered.length < designs.length) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    // Also delete associated tasks
    deleteTasksByDesignId(id);
    return true;
  }

  return false;
}

/**
 * Search cake designs by flavor or guest count
 */
export function searchCakeDesigns(query: {
  flavor?: string;
  guestCount?: number;
  theme?: string;
  dateRange?: { start: string; end: string };
}): CakeDesign[] {
  let designs = getAllCakeDesigns();

  if (query.flavor) {
    designs = designs.filter((d) =>
      d.intakeData.mainFlavor.toLowerCase().includes(query.flavor!.toLowerCase())
    );
  }

  if (query.guestCount) {
    designs = designs.filter((d) => d.intakeData.guestCount === query.guestCount);
  }

  if (query.theme) {
    designs = designs.filter((d) =>
      d.intakeData.theme.toLowerCase().includes(query.theme!.toLowerCase())
    );
  }

  if (query.dateRange) {
    designs = designs.filter((d) => {
      const designDate = new Date(d.intakeData.eventDate);
      const startDate = new Date(query.dateRange!.start);
      const endDate = new Date(query.dateRange!.end);
      return designDate >= startDate && designDate <= endDate;
    });
  }

  return designs;
}

/**
 * Get designs for a specific customer/date
 */
export function getCakeDesignsByEventDate(eventDate: string): CakeDesign[] {
  return getAllCakeDesigns().filter((d) => d.intakeData.eventDate === eventDate);
}

/**
 * Save production tasks
 */
export function saveProductionTasks(tasks: ProductionTask[]): void {
  initializeStorage();
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}

/**
 * Get all production tasks
 */
export function getAllProductionTasks(): ProductionTask[] {
  initializeStorage();
  try {
    const data = localStorage.getItem(TASKS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading production tasks:', error);
    return [];
  }
}

/**
 * Get tasks for a specific cake design
 */
export function getTasksByDesignId(designId: string): ProductionTask[] {
  const tasks = getAllProductionTasks();
  return tasks.filter((t) => t.cakeDesignId === designId);
}

/**
 * Update a specific task
 */
export function updateTask(taskId: string, updates: Partial<ProductionTask>): ProductionTask | null {
  const tasks = getAllProductionTasks();
  const index = tasks.findIndex((t) => t.id === taskId);

  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...updates };
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    return tasks[index];
  }

  return null;
}

/**
 * Delete tasks for a specific design
 */
export function deleteTasksByDesignId(designId: string): void {
  const tasks = getAllProductionTasks();
  const filtered = tasks.filter((t) => t.cakeDesignId !== designId);
  localStorage.setItem(TASKS_KEY, JSON.stringify(filtered));
}

/**
 * Get statistics about cake designs
 */
export function getCakeDesignStats(): {
  totalDesigns: number;
  totalTasks: number;
  byFlavor: Record<string, number>;
  byTheme: Record<string, number>;
  totalGuestsServed: number;
} {
  const designs = getAllCakeDesigns();
  const tasks = getAllProductionTasks();

  const stats = {
    totalDesigns: designs.length,
    totalTasks: tasks.length,
    byFlavor: {} as Record<string, number>,
    byTheme: {} as Record<string, number>,
    totalGuestsServed: 0,
  };

  designs.forEach((d) => {
    const flavor = d.intakeData.mainFlavor;
    const theme = d.intakeData.theme;

    stats.byFlavor[flavor] = (stats.byFlavor[flavor] || 0) + 1;
    stats.byTheme[theme] = (stats.byTheme[theme] || 0) + 1;
    stats.totalGuestsServed += d.intakeData.guestCount;
  });

  return stats;
}

/**
 * Export all designs as JSON for backup
 */
export function exportDesignsAsJSON(): string {
  const designs = getAllCakeDesigns();
  const tasks = getAllProductionTasks();

  return JSON.stringify(
    {
      version: '1.0',
      exportDate: new Date().toISOString(),
      designs,
      tasks,
    },
    null,
    2
  );
}

/**
 * Import designs from JSON backup
 */
export function importDesignsFromJSON(jsonData: string): { success: boolean; message: string; count?: number } {
  try {
    const data = JSON.parse(jsonData);

    if (data.designs && Array.isArray(data.designs)) {
      const designs = getAllCakeDesigns();
      const imported = data.designs.filter(
        (newDesign: CakeDesign) => !designs.some((d) => d.id === newDesign.id)
      );

      imported.forEach((design: CakeDesign) => {
        saveCakeDesign(design);
      });

      if (data.tasks && Array.isArray(data.tasks)) {
        const allTasks = getAllProductionTasks();
        const importedTasks = data.tasks.filter(
          (newTask: ProductionTask) => !allTasks.some((t) => t.id === newTask.id)
        );
        saveProductionTasks([...allTasks, ...importedTasks]);
      }

      return {
        success: true,
        message: `Successfully imported ${imported.length} designs`,
        count: imported.length,
      };
    }

    return {
      success: false,
      message: 'Invalid JSON format',
    };
  } catch (error) {
    return {
      success: false,
      message: `Import failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

/**
 * Clear all data (dangerous - use with caution)
 */
export function clearAllData(): void {
  if (confirm('Are you sure you want to delete ALL cake designs and tasks? This cannot be undone.')) {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(TASKS_KEY);
  }
}

/**
 * Get storage usage info
 */
export function getStorageInfo(): {
  usedMB: number;
  totalDesigns: number;
  totalTasks: number;
} {
  const designs = getAllCakeDesigns();
  const tasks = getAllProductionTasks();

  const designsSize = JSON.stringify(designs).length;
  const tasksSize = JSON.stringify(tasks).length;
  const totalSize = designsSize + tasksSize;

  return {
    usedMB: totalSize / (1024 * 1024),
    totalDesigns: designs.length,
    totalTasks: tasks.length,
  };
}
