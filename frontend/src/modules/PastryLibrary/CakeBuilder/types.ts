/**
 * LUCCCA | CakeBuilder Types
 * Shared TypeScript interfaces for cake design system
 */

export type CakeShape = 'round' | 'square' | 'quarter_sheet' | 'half_sheet' | 'full_sheet';
export type CakeFlavor = 'butter' | 'vanilla' | 'chocolate' | 'pound_vanilla' | 'pound_orange' | 'pound_chocolate' | 'pound_lemon' | 'pound_marble' | 'strawberry' | 'confetti' | 'raspberry';
export type CakeTheme = 'mad_hatter' | 'bear' | 'hare' | 'yule' | 'custom';
export type IcingType = 'frosting' | 'fondant' | 'buttercream';
export type CameraView = 'front' | 'side' | '360' | 'overhead' | 'overview';

export interface CakeIntakeData {
  // Event Details
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  pickupOrDelivery: 'pickup' | 'delivery';
  
  // Guest & Cake Specs
  guestCount: number;
  cakeShape: CakeShape;
  
  // Flavors & Colors
  mainFlavor: CakeFlavor;
  fillingFlavors: CakeFlavor[];
  
  // Decoration & Finish
  icingColor: string; // hex color
  icingType: IcingType;
  theme: CakeTheme;
  decorationNotes: string;
  
  // Sheet Cake Option
  showPieceCake: boolean;
  sheetCakeProduction: boolean;
}

export interface CakeCalculation {
  cakeDiameter: number; // inches
  cakeLayers: number;
  supportColumnsNeeded: boolean;
  estimatedWeight: number; // ounces
  estimatedServings: number;
  bakingTimeMinutes: number;
  coolingTimeMinutes: number;
  preparationTimeMinutes: number;
  totalProductionTimeMinutes: number;
}

export interface CakeDesign {
  id: string;
  name: string;
  timestamp: string;
  intakeData: CakeIntakeData;
  calculations: CakeCalculation;
  textureConfig: {
    frosting: string;
    fillings: string[];
    decorations: string[];
  };
  exportFormat: 'image' | 'pdf' | 'sugar_sheet';
  designImage?: string; // base64 or URL
}

export interface TextureMetadata {
  id: string;
  name: string;
  category: 'frosting' | 'filling' | 'fondant' | 'buttercream';
  imageUrl: string;
  roughness: number;
  metallic: number;
  color: string;
}

export interface ProductionTask {
  id: string;
  cakeDesignId: string;
  taskType: 'bake' | 'cool' | 'level' | 'fill' | 'crumb_coat' | 'frost' | 'decorate';
  assignedTo?: string; // baker name or prep person name
  startTime: string;
  estimatedDurationMinutes: number;
  completedTime?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'paused';
  notes: string;
}

export interface CakeSizeReference {
  servings: number;
  roundDiameter: number; // inches
  squareDimension: number; // inches
  sheetDimension: { width: number; height: number }; // inches
  layerDepth: number; // inches
  bakedWeight: number; // ounces
}
