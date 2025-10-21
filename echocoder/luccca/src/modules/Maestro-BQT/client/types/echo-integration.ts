/**
 * Echo CRM Events Integration Types
 * Shared data models and sync interfaces between Maestro Banquets and Echo CRM Events
 */

import type { BEODocument } from './beo';

// Echo CRM Event Structure
export interface EchoCRMEvent {
  id: string;
  crmEventId: string; // Primary ID from Echo CRM Events
  salesRepId: string;
  salesRepName: string;
  
  // Event Basic Info
  eventName: string;
  eventDate: string;
  eventTime: string;
  venue: string;
  room: string;
  
  // Client Information
  clientId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  billingAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  
  // Event Details
  eventType: 'wedding' | 'corporate' | 'social' | 'holiday' | 'private' | 'fundraiser';
  guestCount: {
    expected: number;
    guaranteed: number;
    maximum: number;
  };
  budget: {
    totalBudget: number;
    foodBudget: number;
    beverageBudget: number;
    venueRental: number;
    serviceCharges: number;
    taxes: number;
  };
  
  // Contract Status
  contractStatus: 'inquiry' | 'proposal_sent' | 'negotiating' | 'signed' | 'cancelled';
  paymentSchedule: {
    deposit: { amount: number; dueDate: string; paid: boolean };
    progress: { amount: number; dueDate: string; paid: boolean }[];
    final: { amount: number; dueDate: string; paid: boolean };
  };
  
  // Sync Information
  lastModifiedBy: string;
  lastModifiedAt: string;
  syncStatus: 'synced' | 'pending' | 'conflict' | 'error';
  maestroBEOId?: string; // Reference to BEO in Maestro Banquets
  
  // Special Requirements
  specialRequests: string[];
  dietaryRestrictions: string[];
  accessibilityNeeds: string[];
  
  // Timeline
  setupTime: string;
  eventStartTime: string;
  eventEndTime: string;
  breakdownTime: string;
}

// Sync Configuration
export interface SyncConfiguration {
  id: string;
  organizationId: string;
  echoCrmApiUrl: string;
  maestroApiUrl: string;
  
  // Authentication
  echoCrmApiKey: string;
  maestroApiKey: string;
  webhookSecret: string;
  
  // Sync Settings
  syncDirection: 'bidirectional' | 'echo_to_maestro' | 'maestro_to_echo';
  autoSync: boolean;
  syncInterval: number; // minutes
  conflictResolution: 'echo_wins' | 'maestro_wins' | 'manual' | 'newest_wins';
  
  // Field Mapping
  fieldMappings: {
    echoField: string;
    maestroField: string;
    required: boolean;
    transform?: string; // JSON path for transformation
  }[];
  
  // Notification Settings
  notifyOnSync: boolean;
  notifyOnConflict: boolean;
  notificationRecipients: string[];
}

// Sync Operations
export interface SyncOperation {
  id: string;
  operationType: 'create' | 'update' | 'delete' | 'conflict_resolution';
  direction: 'echo_to_maestro' | 'maestro_to_echo';
  
  // Source Data
  sourceSystem: 'echo_crm' | 'maestro_banquets';
  sourceRecordId: string;
  sourceRecordType: 'event' | 'beo' | 'client';
  
  // Target Data
  targetSystem: 'echo_crm' | 'maestro_banquets';
  targetRecordId?: string;
  targetRecordType: 'event' | 'beo' | 'client';
  
  // Operation Details
  status: 'pending' | 'in_progress' | 'completed' | 'failed' | 'conflicted';
  startedAt: string;
  completedAt?: string;
  errorMessage?: string;
  
  // Data Changes
  changes: {
    field: string;
    oldValue: any;
    newValue: any;
    conflictResolution?: 'accepted' | 'rejected' | 'manual';
  }[];
  
  // Metadata
  triggeredBy: string; // user ID or 'system'
  syncConfigId: string;
  retryCount: number;
  maxRetries: number;
}

// Webhook Payload Structures
export interface EchoCRMWebhookPayload {
  eventType: 'event.created' | 'event.updated' | 'event.deleted' | 'contract.signed';
  timestamp: string;
  webhookId: string;
  organizationId: string;
  
  data: {
    event: EchoCRMEvent;
    changes?: {
      field: string;
      oldValue: any;
      newValue: any;
    }[];
    metadata: {
      userId: string;
      userEmail: string;
      source: string; // 'web_app' | 'mobile_app' | 'api'
    };
  };
}

export interface MaestroBanquetsWebhookPayload {
  eventType: 'beo.created' | 'beo.updated' | 'beo.approved' | 'beo.deleted';
  timestamp: string;
  webhookId: string;
  organizationId: string;
  
  data: {
    beo: BEODocument;
    echoCrmEventId?: string;
    changes?: {
      field: string;
      oldValue: any;
      newValue: any;
    }[];
    metadata: {
      userId: string;
      userEmail: string;
      department: 'kitchen' | 'service' | 'management';
    };
  };
}

// Conflict Resolution
export interface DataConflict {
  id: string;
  conflictType: 'field_mismatch' | 'deletion_conflict' | 'timing_conflict';
  
  // Records in Conflict
  echoRecord: Partial<EchoCRMEvent>;
  maestroRecord: Partial<BEODocument>;
  
  // Conflicting Fields
  conflicts: {
    field: string;
    echoValue: any;
    maestroValue: any;
    lastModifiedEcho: string;
    lastModifiedMaestro: string;
  }[];
  
  // Resolution
  status: 'pending' | 'resolved' | 'escalated';
  resolution?: {
    resolvedBy: string;
    resolvedAt: string;
    resolutionMethod: 'echo_wins' | 'maestro_wins' | 'custom';
    customResolution?: Record<string, any>;
  };
  
  // Metadata
  detectedAt: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  impactAssessment: string;
}

// API Response Types
export interface SyncApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  metadata: {
    requestId: string;
    timestamp: string;
    version: string;
  };
}

export interface BatchSyncResponse {
  totalOperations: number;
  successfulOperations: number;
  failedOperations: number;
  operations: SyncOperation[];
  summary: {
    created: number;
    updated: number;
    deleted: number;
    conflicted: number;
  };
}

// Real-time Sync Status
export interface SyncStatus {
  isConnected: boolean;
  lastSyncAt?: string;
  nextSyncAt?: string;
  
  // Connection Health
  echoCrmConnection: {
    status: 'connected' | 'disconnected' | 'error';
    lastPing?: string;
    latency?: number;
  };
  
  maestroConnection: {
    status: 'connected' | 'disconnected' | 'error';
    lastPing?: string;
    latency?: number;
  };
  
  // Sync Statistics
  stats: {
    totalSynced: number;
    pendingOperations: number;
    failedOperations: number;
    conflictsToResolve: number;
  };
  
  // Current Operations
  currentOperations: SyncOperation[];
}

// Integration Health Monitoring
export interface IntegrationHealth {
  overall: 'healthy' | 'degraded' | 'failing';
  
  components: {
    echoCrmApi: {
      status: 'up' | 'down' | 'slow';
      responseTime?: number;
      lastCheck: string;
    };
    maestroApi: {
      status: 'up' | 'down' | 'slow';
      responseTime?: number;
      lastCheck: string;
    };
    webhooks: {
      status: 'up' | 'down' | 'partial';
      successRate: number;
      lastWebhook?: string;
    };
    database: {
      status: 'up' | 'down' | 'slow';
      connectionPool: number;
      queryTime?: number;
    };
  };
  
  alerts: {
    level: 'info' | 'warning' | 'error' | 'critical';
    message: string;
    timestamp: string;
    component: string;
  }[];
}
