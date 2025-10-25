const STORAGE_KEY = "menu-studio:designs";
const AUTO_SAVE_INTERVAL = 30000; // 30 seconds

export type MenuDesignData = {
  id: string;
  name: string;
  elements: any[];
  pageSize: { width: number; height: number };
  canvasSettings: any;
  pagePreset: string;
  printPreset: any;
  updatedAt: number;
  version: 1;
};

export function getSavedDesigns(): MenuDesignData[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data) as MenuDesignData[];
  } catch (error) {
    console.error("Failed to load designs from storage:", error);
    return [];
  }
}

export function saveDesign(design: MenuDesignData): void {
  try {
    const designs = getSavedDesigns();
    const existingIndex = designs.findIndex((d) => d.id === design.id);
    if (existingIndex >= 0) {
      designs[existingIndex] = design;
    } else {
      designs.push(design);
    }
    // Keep only 20 most recent designs
    if (designs.length > 20) {
      designs.sort((a, b) => b.updatedAt - a.updatedAt);
      designs.splice(20);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(designs));
  } catch (error) {
    console.error("Failed to save design to storage:", error);
  }
}

export function deleteDesign(designId: string): void {
  try {
    const designs = getSavedDesigns();
    const filtered = designs.filter((d) => d.id !== designId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error("Failed to delete design from storage:", error);
  }
}

export function getLastAutoSaveDesign(): MenuDesignData | null {
  try {
    const designs = getSavedDesigns();
    if (designs.length === 0) return null;
    designs.sort((a, b) => b.updatedAt - a.updatedAt);
    return designs[0] ?? null;
  } catch (error) {
    console.error("Failed to get last auto-save:", error);
    return null;
  }
}
