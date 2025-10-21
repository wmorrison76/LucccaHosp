/**
 * Maestro Banquets - Type Definitions Index (safe barrel)
 * Export only stable, non-conflicting types actually used by the app.
 */

// Captain & Sections Workflow Types
export type {
  TableShape,
  FloorAddonType,
  MealChoice,
  CourseCode,
  ServiceStyle,
  PacingStatus,
  FloorAddon,
  Seat,
  CaptainTable,
  Captain,
  CoursePlan,
  DishMeta,
  CourseFire,
  PacingEvent,
  DemographicPattern,
  Section,
  EventCoordination
} from './captains';

// Chef Launch Board & Echo Event Studio Types (only unique types to avoid Recipe conflicts)
export type {
  EchoEventStudioEvent,
  PurchaseOrder,
  PurchaseOrderItem,
  Vendor,
  VendorProduct,
  PrepSchedule,
  PrepTask,
  EquipmentPullList,
  EquipmentItem,
  DeliverySchedule,
  DeliveryIssue,
  ChefPerformanceMetrics,
  CartAssignment,
  StaffAssignment
} from './chef';

// Echo CRM Events Integration Types
export type {
  EchoCRMEvent,
  SyncConfiguration,
  SyncOperation,
  DataConflict,
  SyncStatus,
  SyncApiResponse,
  BatchSyncResponse,
  IntegrationHealth,
  EchoCRMWebhookPayload,
  MaestroBanquetsWebhookPayload
} from './echo-integration';

// Communication System Types
export type {
  User as CommunicationUser,
  Message,
  Conversation,
  VideoCall,
  Notification as CommunicationNotification,
  PresenceStatus,
  CommunicationState,
  SendMessageRequest,
  StartCallRequest,
  BEOCommunicationContext,
  VideoSettings,
  CommunicationIntegration
} from './communication';

// Timeline Management Types
export type {
  EventTimeline,
  TimelineDay,
  TimelineTask,
  TaskRoleAssignment,
  TaskCategory,
  TaskStatus,
  QualityCheck,
  TemperatureCheck,
  Milestone,
  QualityGate,
  RoleAssignment,
  StaffMember,
  StaffShift,
  BreakPeriod,
  EquipmentSchedule,
  EquipmentBooking,
  EquipmentTimeSlot,
  MaintenanceWindow,
  EquipmentConflict,
  SpaceRequirement,
  SpaceOccupancy,
  RiskFactor,
  ContingencyPlan,
  CommunicationStep,
  ResourceChange,
  TaskAdjustment,
  MilestoneChange,
  EventPlannerChange,
  TimelineAnalytics,
  EchoTimelineOptimization,
  TaskReorder,
  ParallelizationSuggestion,
  StaffReallocation,
  EquipmentOptimization,
  OptimizationResults
} from './timeline';
