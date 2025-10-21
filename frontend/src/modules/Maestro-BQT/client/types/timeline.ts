/**
 * Timeline Management Types for LUCCCA Chef Workflow
 * 
 * Comprehensive timeline system for prep day before, execution day,
 * and role breakdown coordination with Nova Lab Event Planner
 */

// Core Timeline Types
export interface EventTimeline {
  id: string;
  eventId: string; // Nova Lab event ID
  menuCollectionId: string;
  guestCount: number;
  
  // Timeline phases
  prepDay: TimelineDay;
  executionDay: TimelineDay;
  
  // Overall timeline metadata
  createdAt: string;
  lastModified: string;
  createdBy: string;
  status: 'draft' | 'review' | 'approved' | 'active' | 'completed';
  version: number;
  
  // Integration with Nova Lab
  syncedWithEventPlanner: boolean;
  lastSyncAt?: string;
  eventPlannerChanges?: EventPlannerChange[];
  
  // Critical path analysis
  criticalPath: string[]; // task IDs in dependency order
  totalDuration: number; // minutes
  bufferTime: number; // minutes of buffer built in
  
  // Staff and resource summary
  totalStaffHours: number;
  peakStaffing: number;
  equipmentRequirements: EquipmentTimeSlot[];
  
  // Risk and contingency
  riskFactors: RiskFactor[];
  contingencyPlans: ContingencyPlan[];
}

export interface TimelineDay {
  date: string; // ISO date
  label: string; // "Prep Day", "Event Day"
  startTime: string; // ISO datetime
  endTime: string; // ISO datetime
  
  // Tasks organized by timeline
  tasks: TimelineTask[];
  milestones: Milestone[];
  
  // Staff breakdown
  roleAssignments: RoleAssignment[];
  shiftSchedule: StaffShift[];
  
  // Resource requirements
  equipmentSchedule: EquipmentSchedule[];
  spaceRequirements: SpaceRequirement[];
  
  // Day-specific metrics
  totalTasks: number;
  completedTasks: number;
  criticaltasks: number;
  estimatedHours: number;
  actualHours?: number;
}

export interface TimelineTask {
  id: string;
  name: string;
  description: string;
  category: TaskCategory;
  
  // Timing
  scheduledStart: string; // ISO datetime
  scheduledDuration: number; // minutes
  scheduledEnd: string; // ISO datetime
  actualStart?: string;
  actualDuration?: number;
  actualEnd?: string;
  
  // Dependencies
  dependencies: string[]; // task IDs that must complete first
  dependents: string[]; // task IDs that depend on this
  criticalPath: boolean;
  
  // Resource requirements
  assignedRoles: TaskRoleAssignment[];
  equipmentNeeded: string[];
  locationRequired: string;
  
  // Recipe and menu integration
  linkedRecipeId?: string;
  linkedMenuItemId?: string;
  portionCount?: number;
  
  // Status and progress
  status: TaskStatus;
  progress: number; // 0-100 percentage
  quality: QualityCheck;
  
  // HACCP and food safety
  haccp: boolean;
  temperaturePoints: TemperatureCheck[];
  foodSafetyNotes?: string;
  
  // Instructions and notes
  instructions: string[];
  chefNotes?: string;
  specialRequirements?: string[];
  
  // Timing flexibility
  canStartEarly: boolean;
  canStartLate: boolean;
  maxDelay: number; // minutes
  
  // Integration
  createdFrom: 'manual' | 'recipe' | 'beo' | 'ai_generated';
  lastModified: string;
}

export interface TaskRoleAssignment {
  roleId: string;
  roleName: string;
  staffCount: number;
  requiredSkills: string[];
  preferredStaff?: string[]; // staff member IDs
  assignedStaff?: string[]; // actual assigned staff IDs
  estimatedHours: number;
}

export type TaskCategory = 
  | 'prep' | 'cooking' | 'baking' | 'garde_manger' | 'sauce' | 'protein' 
  | 'vegetable' | 'garnish' | 'plating' | 'service' | 'cleanup' | 'setup'
  | 'inventory' | 'receiving' | 'breakdown' | 'admin';

export type TaskStatus = 
  | 'not_started' | 'in_progress' | 'paused' | 'completed' | 'cancelled' 
  | 'delayed' | 'blocked' | 'quality_issue';

export interface QualityCheck {
  required: boolean;
  completed: boolean;
  inspector?: string;
  score?: number; // 1-10
  notes?: string;
  issues?: string[];
}

export interface TemperatureCheck {
  time: string; // ISO datetime
  location: string; // "walk-in", "oven", "service line"
  requiredTemp: number;
  actualTemp?: number;
  passed?: boolean;
  recordedBy?: string;
  notes?: string;
}

// Milestone and Progress Tracking
export interface Milestone {
  id: string;
  name: string;
  description: string;
  scheduledTime: string; // ISO datetime
  actualTime?: string;
  
  // Milestone criteria
  requiredTasks: string[]; // task IDs that must be complete
  qualityGates: QualityGate[];
  approvalRequired: boolean;
  approvedBy?: string;
  
  // Status
  status: 'pending' | 'achieved' | 'missed' | 'cancelled';
  criticality: 'low' | 'medium' | 'high' | 'critical';
  
  // Notification and escalation
  notifyRoles: string[];
  escalationTime?: number; // minutes before escalation
  escalationContacts?: string[];
}

export interface QualityGate {
  name: string;
  criteria: string;
  inspector: string;
  passed?: boolean;
  notes?: string;
  timestamp?: string;
}

// Staff Role and Assignment Management
export interface RoleAssignment {
  roleId: string;
  roleName: string;
  description: string;
  
  // Scheduling
  shiftStart: string; // ISO datetime
  shiftEnd: string; // ISO datetime
  breakSchedule: BreakPeriod[];
  
  // Responsibilities
  primaryTasks: string[]; // task category or specific task IDs
  backupFor?: string[]; // other role IDs this can cover
  canSupervise: string[]; // role IDs this can supervise
  
  // Requirements
  requiredSkills: string[];
  requiredCertifications: string[];
  experienceLevel: 'entry' | 'junior' | 'experienced' | 'senior' | 'lead';
  
  // Staffing
  requiredCount: number;
  assignedStaff: StaffMember[];
  substitutes: StaffMember[];
  
  // Performance tracking
  productivity: number; // 0-100 expected productivity
  efficiency: number; // 0-100 historical efficiency
  qualityScore: number; // 0-100 quality track record
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  skills: string[];
  certifications: string[];
  
  // Availability
  scheduledHours: number;
  actualHours?: number;
  availability: 'available' | 'busy' | 'break' | 'unavailable';
  
  // Performance
  currentTasks: string[]; // task IDs currently assigned
  productivity: number; // 0-100 current productivity
  alerts?: string[]; // any current alerts or issues
}

export interface StaffShift {
  id: string;
  staffId: string;
  staffName: string;
  role: string;
  
  // Timing
  clockIn: string; // ISO datetime
  clockOut: string; // ISO datetime
  scheduledHours: number;
  actualHours?: number;
  
  // Assignments
  assignedTasks: string[]; // task IDs
  primaryStation: string;
  backupStations: string[];
  
  // Breaks and compliance
  breaksTaken: BreakPeriod[];
  overtimeApproved: boolean;
  notes?: string;
}

export interface BreakPeriod {
  type: 'break' | 'meal' | 'rest';
  scheduledStart: string;
  scheduledDuration: number; // minutes
  actualStart?: string;
  actualDuration?: number;
  taken: boolean;
}

// Equipment and Space Management
export interface EquipmentSchedule {
  equipmentId: string;
  equipmentName: string;
  location: string;
  
  // Usage timeline
  bookings: EquipmentBooking[];
  maintenance: MaintenanceWindow[];
  
  // Capacity and utilization
  maxCapacity: number;
  utilizationRate: number; // 0-100 percentage
  conflicts: EquipmentConflict[];
}

export interface EquipmentBooking {
  taskId: string;
  taskName: string;
  startTime: string; // ISO datetime
  endTime: string; // ISO datetime
  capacity: number; // percentage of equipment used
  priority: 'low' | 'normal' | 'high' | 'critical';
  status: 'scheduled' | 'active' | 'completed' | 'cancelled';
}

export interface EquipmentTimeSlot {
  equipmentName: string;
  startTime: string;
  endTime: string;
  usage: string; // what it's being used for
  conflict?: boolean;
}

export interface MaintenanceWindow {
  type: 'cleaning' | 'calibration' | 'repair' | 'inspection';
  startTime: string;
  duration: number; // minutes
  performedBy: string;
  notes?: string;
}

export interface EquipmentConflict {
  time: string;
  conflictingTasks: string[]; // task IDs
  severity: 'minor' | 'major' | 'blocking';
  resolution?: string;
  resolvedBy?: string;
}

export interface SpaceRequirement {
  area: string; // "prep station 1", "walk-in cooler", "service line"
  type: 'prep' | 'cooking' | 'storage' | 'service' | 'cleanup';
  
  // Usage timeline
  occupiedBy: SpaceOccupancy[];
  capacity: number; // max simultaneous tasks
  currentLoad: number; // current number of tasks
  
  // Requirements
  temperatureZone?: string;
  specialEquipment?: string[];
  accessRequirements?: string[];
}

export interface SpaceOccupancy {
  taskId: string;
  taskName: string;
  startTime: string;
  endTime: string;
  spaceUsed: number; // percentage of space
  priority: number; // 1-10 priority level
}

// Risk Management and Contingency
export interface RiskFactor {
  id: string;
  name: string;
  description: string;
  category: 'timing' | 'quality' | 'staffing' | 'equipment' | 'supply' | 'external';
  
  // Risk assessment
  probability: number; // 0-100 likelihood
  impact: number; // 0-100 severity
  riskScore: number; // calculated risk score
  
  // Mitigation
  mitigationPlan: string;
  contingencyActions: string[];
  monitoringPoints: string[];
  
  // Tracking
  status: 'identified' | 'monitoring' | 'mitigating' | 'resolved' | 'occurred';
  lastReviewed: string;
  reviewedBy: string;
}

export interface ContingencyPlan {
  id: string;
  name: string;
  trigger: string; // what condition activates this plan
  
  // Actions
  immediateActions: string[];
  communicationPlan: CommunicationStep[];
  resourceReallocation: ResourceChange[];
  
  // Timeline adjustments
  taskAdjustments: TaskAdjustment[];
  milestoneChanges: MilestoneChange[];
  
  // Approval and activation
  approvalRequired: boolean;
  approvedBy?: string;
  activated: boolean;
  activatedAt?: string;
  activatedBy?: string;
}

export interface CommunicationStep {
  to: string; // role or person
  message: string;
  urgency: 'low' | 'normal' | 'high' | 'urgent';
  method: 'app' | 'text' | 'call' | 'radio';
  timing: 'immediate' | 'within_5min' | 'within_15min';
}

export interface ResourceChange {
  type: 'staff' | 'equipment' | 'space' | 'time';
  from: string;
  to: string;
  amount: number;
  duration: number; // minutes
}

export interface TaskAdjustment {
  taskId: string;
  adjustmentType: 'reschedule' | 'reassign' | 'cancel' | 'modify' | 'expedite';
  newStartTime?: string;
  newDuration?: number;
  newAssignments?: string[];
  reason: string;
}

export interface MilestoneChange {
  milestoneId: string;
  newTime: string;
  reason: string;
  impactedTasks: string[];
}

// Integration with Nova Lab Event Planner
export interface EventPlannerChange {
  changeId: string;
  timestamp: string;
  changeType: 'guest_count' | 'menu_item' | 'timing' | 'special_request' | 'cancellation';
  
  // Change details
  field: string;
  oldValue: any;
  newValue: any;
  reason?: string;
  requestedBy: string;
  
  // Impact assessment
  affectedTasks: string[];
  timelineImpact: number; // minutes of impact
  staffingImpact: number; // additional/reduced staff hours
  costImpact: number; // additional/reduced costs
  
  // Response
  status: 'pending' | 'accepted' | 'rejected' | 'requires_approval';
  responseBy?: string;
  responseAt?: string;
  responseNotes?: string;
  
  // Workflow
  autoApply: boolean;
  requiresChefApproval: boolean;
  requiresManagerApproval: boolean;
}

// Timeline Analytics and Optimization
export interface TimelineAnalytics {
  eventTimelineId: string;
  generatedAt: string;
  
  // Performance metrics
  onTimeCompletion: number; // percentage
  averageTaskDelay: number; // minutes
  staffUtilization: number; // percentage
  equipmentUtilization: number; // percentage
  
  // Quality metrics
  qualityScore: number; // 0-100
  haccp: number; // 0-100 compliance score
  guestSatisfaction?: number; // if available from Nova Lab
  
  // Efficiency analysis
  prepDayEfficiency: number; // 0-100
  executionDayEfficiency: number; // 0-100
  criticalPathOptimization: number; // 0-100
  bufferUtilization: number; // percentage of buffer used
  
  // Recommendations
  optimizationSuggestions: string[];
  staffingRecommendations: string[];
  equipmentRecommendations: string[];
  processImprovements: string[];
  
  // Historical comparison
  comparedToAverage: number; // percentage better/worse
  trendDirection: 'improving' | 'stable' | 'declining';
  benchmarkScore: number; // compared to similar events
}

// Echo AI Timeline Optimization
export interface EchoTimelineOptimization {
  timelineId: string;
  optimizedAt: string;
  aiModel: string;
  
  // Optimization results
  timeReduction: number; // minutes saved
  staffOptimization: number; // staff hours saved
  qualityImprovement: number; // predicted quality increase
  riskReduction: number; // risk score improvement
  
  // Specific recommendations
  taskReordering: TaskReorder[];
  parallelization: ParallelizationSuggestion[];
  staffReallocation: StaffReallocation[];
  equipmentOptimization: EquipmentOptimization[];
  
  // Confidence and validation
  confidence: number; // 0-100 AI confidence
  validatedBy?: string;
  implemented: boolean;
  results?: OptimizationResults;
}

export interface TaskReorder {
  taskId: string;
  currentPosition: number;
  suggestedPosition: number;
  reason: string;
  impact: string;
}

export interface ParallelizationSuggestion {
  taskIds: string[];
  currentSequential: boolean;
  canParallelize: boolean;
  requirements: string[];
  timeSaving: number; // minutes
}

export interface StaffReallocation {
  fromRole: string;
  toRole: string;
  staffHours: number;
  timeWindow: string;
  benefit: string;
}

export interface EquipmentOptimization {
  equipmentId: string;
  currentUtilization: number;
  suggestedUtilization: number;
  changes: string[];
  efficiency: number;
}

export interface OptimizationResults {
  actualTimeSaved: number;
  actualStaffSaved: number;
  actualQualityChange: number;
  lessonsLearned: string[];
  successRate: number; // 0-100
}
