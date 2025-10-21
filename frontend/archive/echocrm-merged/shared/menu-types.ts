export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  subcategory?: string;
  allergens?: string[];
  dietaryInfo?: ('vegetarian' | 'vegan' | 'gluten-free' | 'dairy-free' | 'nut-free')[];
  ingredients?: string[];
  servingSize?: string;
  preparationTime?: number; // in minutes
  availability?: {
    seasons?: string[];
    daysOfWeek?: number[];
    timeOfDay?: ('breakfast' | 'lunch' | 'dinner' | 'cocktail')[];
  };
  customizations?: MenuCustomization[];
}

export interface MenuCustomization {
  id: string;
  name: string;
  type: 'addon' | 'substitution' | 'size' | 'style';
  options: {
    name: string;
    priceModifier: number;
    description?: string;
  }[];
  required?: boolean;
  maxSelections?: number;
}

export interface MenuSection {
  id: string;
  name: string;
  description?: string;
  displayOrder: number;
  items: MenuItem[];
  subcategories?: string[];
}

export interface Menu {
  id: string;
  name: string;
  description?: string;
  type: 'banquet' | 'catering' | 'restaurant' | 'cocktail' | 'buffet' | 'plated';
  outlet: string;
  venue?: string;
  effectiveDate: string;
  expirationDate?: string;
  sections: MenuSection[];
  minimumGuests?: number;
  maximumGuests?: number;
  advanceNotice?: number; // hours
  setupRequirements?: string[];
  specialInstructions?: string;
  packagePricing?: MenuPackage[];
}

export interface MenuPackage {
  id: string;
  name: string;
  description: string;
  itemIds: string[];
  totalPrice: number;
  minimumGuests: number;
  includes?: string[];
  excludes?: string[];
}

export interface Outlet {
  id: string;
  name: string;
  type: 'restaurant' | 'banquet' | 'catering' | 'bar' | 'room_service' | 'external';
  location: string;
  description?: string;
  contactInfo: {
    manager: string;
    phone: string;
    email: string;
  };
  capabilities: {
    maxCapacity: number;
    simultaneousEvents: number;
    cuisineTypes: string[];
    serviceStyles: ('buffet' | 'plated' | 'family_style' | 'cocktail' | 'stations')[];
    equipment: string[];
  };
  operatingHours: {
    [day: string]: {
      open: string;
      close: string;
      breaks?: { start: string; end: string }[];
    };
  };
  menus: string[]; // Menu IDs
  pricing: {
    laborChargePerHour: number;
    serviceChargePercentage: number;
    equipmentRental: { [equipment: string]: number };
  };
}

export interface EventSpace {
  id: string;
  name: string;
  type: 'ballroom' | 'conference' | 'outdoor' | 'private_dining' | 'boardroom' | 'ceremony' | 'reception';
  location: string;
  capacity: {
    seated: number;
    standing: number;
    classroom: number;
    theater: number;
    cocktail: number;
  };
  dimensions: {
    length: number;
    width: number;
    height: number;
    squareFeet: number;
  };
  features: string[];
  amenities: string[];
  restrictions?: string[];
  pricing: {
    baseRentalFee: number;
    setupFee?: number;
    cleanupFee?: number;
    securityDeposit?: number;
    cancellationPolicy: string;
  };
  availability: {
    bookingWindow: number; // days in advance
    minimumRentalHours: number;
    setupTime: number; // hours
    breakdownTime: number; // hours
  };
  compatibleOutlets: string[]; // Outlet IDs that can service this space
  floorPlan?: string; // URL to floor plan image
  images?: string[];
}

export interface MenuParsingResult {
  success: boolean;
  menu?: Partial<Menu>;
  items?: MenuItem[];
  sections?: MenuSection[];
  errors?: string[];
  warnings?: string[];
  confidence: number; // 0-1 score of parsing confidence
}

export interface MenuUpload {
  id: string;
  originalFilename: string;
  contentType: string;
  size: number;
  uploadedAt: string;
  uploadedBy: string;
  status: 'uploading' | 'processing' | 'completed' | 'failed';
  processingStage?: 'ocr' | 'parsing' | 'validation' | 'complete';
  progress: number; // 0-100
  result?: MenuParsingResult;
  rawText?: string;
}
