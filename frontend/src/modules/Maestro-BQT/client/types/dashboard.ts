/**
 * Maestro Banquets - Dashboard & Notification Types
 * 
 * Types for the main dashboard, Nova Lab integration, real-time notifications,
 * and moveable panel system for the Chef interface.
 */

// === Nova Lab Integration Types ===

export interface NovaLabEvent {
  id: string;
  clientId: string;
  eventName: string;
  eventDate: string;
  guestCount: number;
  venue: string;
  eventType: 'wedding' | 'corporate' | 'social' | 'fundraiser' | 'other';
  status: 'planning' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  salesManager: string;
  createdAt: string;
  updatedAt: string;
}

export interface BEONotification {
  id: string;
  type: 'new_beo' | 'beo_updated' | 'beo_confirmed' | 'beo_status_change';
  eventId: string;
  beoId: string;
  beoName: string;
  beoNumber: string;
  title: string;
  message: string;
  timestamp: string;
  viewed: boolean;
  viewedAt?: string;
  viewedBy?: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  source: 'nova_lab' | 'echo_event_studio' | 'global_calendar';
  changes?: BEOChangeHighlight[];
}

export interface BEOChangeHighlight {
  section: string;
  field: string;
  oldValue: any;
  newValue: any;
  changeType: 'added' | 'modified' | 'removed';
  timestamp: string;
  changedBy: string;
}

export interface GlobalCalendarNotification {
  id: string;
  type: 'new_event' | 'event_updated' | 'deadline_approaching' | 'schedule_conflict';
  eventId: string;
  title: string;
  message: string;
  timestamp: string;
  actionRequired: boolean;
  actionUrl?: string;
  deadline?: string;
  viewed: boolean;
  acknowledgmentRequired: boolean;
  acknowledgedAt?: string;
  acknowledgedBy?: string;
}

// === Dashboard Panel Types ===

export interface DashboardPanel {
  id: string;
  type: DashboardPanelType;
  title: string;
  position: PanelPosition;
  size: PanelSize;
  visible: boolean;
  minimized: boolean;
  locked: boolean;
  config: PanelConfig;
  lastUpdated: string;
}

export type DashboardPanelType = 
  | 'upcoming_beos'
  | 'current_orders'
  | 'inventory_status'
  | 'staff_schedule'
  | 'notifications'
  | 'global_calendar'
  | 'sticky_notes'
  | 'quick_actions'
  | 'performance_metrics'
  | 'ai_recommendations';

export interface PanelPosition {
  x: number;
  y: number;
  zIndex: number;
}

export interface PanelSize {
  width: number;
  height: number;
  minWidth: number;
  minHeight: number;
  maxWidth?: number;
  maxHeight?: number;
}

export interface PanelConfig {
  refreshInterval?: number; // seconds
  autoRefresh: boolean;
  filters?: Record<string, any>;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  displayMode?: 'list' | 'grid' | 'chart';
  [key: string]: any; // Panel-specific config
}

// === Upcoming BEOs Panel ===

export interface UpcomingBEO {
  id: string;
  beoNumber: string;
  beoName: string;
  eventName: string;
  eventDate: string;
  deliveryDate: string;
  guestCount: number;
  orderAmount: number;
  currency: string;
  status: BEODocumentStatus;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignedChef: string;
  hasUnviewedChanges: boolean;
  lastViewedAt?: string;
  estimatedPrepTime: number; // hours
  nextDeadline?: {
    type: 'menu_confirmation' | 'final_count' | 'prep_start' | 'event_delivery';
    datetime: string;
    description: string;
  };
}

export type BEODocumentStatus = 
  | 'draft'
  | 'in_process'
  | 'pending_chef_review'
  | 'chef_approved'
  | 'confirmed'
  | 'updating'
  | 'updated'
  | 'locked'
  | 'cancelled';

// === Current Orders Panel ===

export interface CurrentOrder {
  id: string;
  orderNumber: string;
  beoId: string;
  beoName: string;
  eventName: string;
  deliveryDate: string;
  orderStatus: OrderStatus;
  totalAmount: number;
  currency: string;
  prepStatus: PrepStatus;
  assignedTeam: string[];
  items: OrderItem[];
  estimatedCompletionTime: string;
  actualStartTime?: string;
  notes?: string;
}

export type OrderStatus = 
  | 'pending_prep'
  | 'prep_in_progress'
  | 'prep_completed'
  | 'quality_check'
  | 'packaging'
  | 'ready_for_delivery'
  | 'in_transit'
  | 'delivered'
  | 'completed';

export type PrepStatus = 
  | 'not_started'
  | 'ingredients_ordered'
  | 'ingredients_received'
  | 'prep_started'
  | 'cooking_in_progress'
  | 'plating'
  | 'quality_approved'
  | 'ready';

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  prepTime: number; // minutes
  status: PrepStatus;
  assignedChef?: string;
  notes?: string;
}

// === Inventory Status Panel ===

export interface InventoryLocation {
  id: string;
  name: string;
  type: 'cooler' | 'freezer' | 'dry_storage' | 'prep_area';
  temperature?: number;
  humidity?: number;
  capacity: InventoryCapacity;
  currentUsage: InventoryCapacity;
  items: InventoryItem[];
  lastChecked: string;
  alerts?: InventoryAlert[];
}

export interface InventoryCapacity {
  volume: number; // cubic feet
  weight: number; // pounds
  itemCount: number;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  expirationDate?: string;
  receivedDate: string;
  location: string;
  vendor?: string;
  cost: number;
  currency: string;
  status: 'fresh' | 'expiring_soon' | 'expired' | 'reserved' | 'allocated';
}

export interface InventoryAlert {
  id: string;
  type: 'low_stock' | 'expiring_soon' | 'expired' | 'temperature_warning' | 'overstock';
  severity: 'info' | 'warning' | 'critical';
  message: string;
  itemId?: string;
  timestamp: string;
  acknowledged: boolean;
}

// === Staff Schedule Panel ===

export interface StaffSchedule {
  id: string;
  date: string;
  shifts: StaffShift[];
  totalStaffCount: number;
  totalHours: number;
  coverage: ScheduleCoverage;
  alerts?: ScheduleAlert[];
}

export interface StaffShift {
  id: string;
  staffId: string;
  staffName: string;
  role: StaffRole;
  clockInTime: string;
  clockOutTime: string;
  actualClockIn?: string;
  actualClockOut?: string;
  status: ShiftStatus;
  assignedTasks?: string[];
  breaks: BreakPeriod[];
  overtime: boolean;
  notes?: string;
}

export type StaffRole = 
  | 'executive_chef'
  | 'sous_chef'
  | 'line_cook'
  | 'prep_cook'
  | 'pastry_chef'
  | 'server'
  | 'bartender'
  | 'dishwasher'
  | 'food_runner'
  | 'captain'
  | 'manager';

export type ShiftStatus = 
  | 'scheduled'
  | 'confirmed'
  | 'clocked_in'
  | 'on_break'
  | 'clocked_out'
  | 'no_show'
  | 'called_in_sick'
  | 'late'
  | 'overtime';

export interface BreakPeriod {
  id: string;
  type: 'meal_break' | 'rest_break' | 'smoke_break';
  startTime: string;
  endTime: string;
  duration: number; // minutes
  taken: boolean;
}

export interface ScheduleCoverage {
  requiredStaff: number;
  scheduledStaff: number;
  actualStaff: number;
  coveragePercentage: number;
  gaps: CoverageGap[];
}

export interface CoverageGap {
  role: StaffRole;
  timeSlot: string;
  requiredCount: number;
  actualCount: number;
  severity: 'minor' | 'moderate' | 'critical';
}

export interface ScheduleAlert {
  id: string;
  type: 'understaffed' | 'overstaffed' | 'late_arrival' | 'no_show' | 'overtime_warning';
  severity: 'info' | 'warning' | 'critical';
  message: string;
  staffId?: string;
  timeSlot?: string;
  timestamp: string;
}

// === Sticky Notes Panel ===

export interface StickyNote {
  id: string;
  title?: string;
  content: string;
  color: StickyNoteColor;
  position: PanelPosition;
  size: PanelSize;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  targetUser?: string; // If note is for specific person
  type: 'personal' | 'team' | 'urgent' | 'reminder';
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  completed: boolean;
  completedAt?: string;
  completedBy?: string;
  attachments?: NoteAttachment[];
}

export type StickyNoteColor = 
  | 'yellow'
  | 'blue'
  | 'green'
  | 'red'
  | 'orange'
  | 'purple'
  | 'pink'
  | 'gray';

export interface NoteAttachment {
  id: string;
  name: string;
  type: 'image' | 'document' | 'link';
  url: string;
  size?: number;
  uploadedAt: string;
}

// === AI Recommendations Panel ===

export interface AIRecommendation {
  id: string;
  type: 'schedule_optimization' | 'inventory_management' | 'cost_reduction' | 'quality_improvement' | 'efficiency_boost';
  title: string;
  description: string;
  impact: {
    category: 'time_savings' | 'cost_savings' | 'quality_improvement' | 'efficiency_gain';
    estimatedValue: number;
    unit: string;
    confidence: number; // 0-1
  };
  priority: 'low' | 'medium' | 'high' | 'critical';
  effort: 'low' | 'medium' | 'high';
  implementation: {
    steps: string[];
    estimatedTime: number; // minutes
    resourcesRequired: string[];
  };
  relatedItems: {
    type: 'beo' | 'order' | 'staff' | 'inventory';
    id: string;
    name: string;
  }[];
  createdAt: string;
  status: 'new' | 'reviewed' | 'accepted' | 'rejected' | 'implemented';
  feedback?: {
    rating: number; // 1-5
    comment: string;
    submittedBy: string;
    submittedAt: string;
  };
}

// === Real-time BEO Document Viewer ===

export interface LiveBEODocument {
  id: string;
  beoId: string;
  content: any; // The actual BEO content
  version: number;
  status: BEODocumentStatus;
  lastModified: string;
  lastModifiedBy: string;
  activeEditors: ActiveEditor[];
  changeLog: DocumentChange[];
  viewerState: ViewerState;
}

export interface ActiveEditor {
  userId: string;
  userName: string;
  role: 'event_planner' | 'chef' | 'manager' | 'client';
  lastActivity: string;
  currentSection?: string;
  cursorPosition?: number;
}

export interface DocumentChange {
  id: string;
  type: 'text_change' | 'section_add' | 'section_remove' | 'status_change' | 'approval';
  section: string;
  field?: string;
  oldValue: any;
  newValue: any;
  changedBy: string;
  timestamp: string;
  highlighted: boolean;
  acknowledged: boolean;
}

export interface ViewerState {
  lastViewedAt: string;
  lastViewedBy: string;
  lastViewedVersion: number;
  unviewedChanges: DocumentChange[];
  scrollPosition: number;
  selectedSection?: string;
}

// === Dashboard Layout ===

export interface DashboardLayout {
  id: string;
  name: string;
  userId: string;
  isDefault: boolean;
  panels: DashboardPanel[];
  gridSettings: {
    columns: number;
    rowHeight: number;
    margin: [number, number];
    padding: [number, number];
  };
  createdAt: string;
  updatedAt: string;
}

export interface DashboardState {
  currentLayout: DashboardLayout;
  availableLayouts: DashboardLayout[];
  notifications: BEONotification[];
  globalCalendarNotifications: GlobalCalendarNotification[];
  aiRecommendations: AIRecommendation[];
  stickyNotes: StickyNote[];
  isEditMode: boolean;
  selectedPanel?: string;
  draggedPanel?: string;
  websocketConnected: boolean;
  lastSyncAt: string;
}

// === WebSocket Events ===

export interface WebSocketEvent {
  type: 'beo_updated' | 'new_notification' | 'staff_status_change' | 'inventory_alert' | 'ai_recommendation';
  payload: any;
  timestamp: string;
  source: string;
}

export interface BEOUpdateEvent extends WebSocketEvent {
  type: 'beo_updated';
  payload: {
    beoId: string;
    changes: DocumentChange[];
    newStatus?: BEODocumentStatus;
    updatedBy: string;
  };
}

export interface NotificationEvent extends WebSocketEvent {
  type: 'new_notification';
  payload: BEONotification | GlobalCalendarNotification;
}
