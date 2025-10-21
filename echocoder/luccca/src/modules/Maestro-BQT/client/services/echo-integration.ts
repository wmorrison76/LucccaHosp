/**
 * Echo CRM Events Integration Service
 * Handles bidirectional synchronization between Maestro Banquets and Echo CRM Events
 */

import type { 
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
} from '../types/echo-integration';
import type { BEODocument } from '../types/beo';
import type { CalendarEvent } from '../stores/beoStore';

class EchoIntegrationService {
  private syncConfig: SyncConfiguration | null = null;
  private webhookListeners: Map<string, Function[]> = new Map();
  private syncInterval: NodeJS.Timeout | null = null;
  private eventSource: EventSource | null = null;

  /**
   * Initialize the integration service with configuration
   */
  async initialize(config: SyncConfiguration): Promise<void> {
    this.syncConfig = config;
    
    // Set up real-time sync if enabled
    if (config.autoSync) {
      this.startAutoSync();
    }
    
    // Set up real-time webhooks listening
    this.setupRealtimeListening();
    
    console.log('Echo Integration Service initialized', { 
      organizationId: config.organizationId,
      syncDirection: config.syncDirection,
      autoSync: config.autoSync 
    });
  }

  /**
   * Convert Echo CRM Event to Maestro Calendar Event
   */
  private echoCrmEventToCalendarEvent(echoEvent: EchoCRMEvent): CalendarEvent {
    return {
      id: `echo-${echoEvent.crmEventId}`,
      title: echoEvent.eventName,
      date: echoEvent.eventDate,
      time: echoEvent.eventTime,
      room: echoEvent.room,
      guestCount: echoEvent.guestCount.guaranteed,
      status: this.mapContractStatusToEventStatus(echoEvent.contractStatus),
      type: echoEvent.eventType as CalendarEvent['type'],
      priority: this.calculateEventPriority(echoEvent),
      beoId: echoEvent.maestroBEOId,
      acknowledged: false,
      revenue: echoEvent.budget.totalBudget,
      notes: echoEvent.specialRequests.join('; '),
      
      // Integration metadata
      echoCrmEventId: echoEvent.crmEventId,
      lastSyncedAt: new Date().toISOString(),
      syncStatus: 'synced'
    } as CalendarEvent & {
      echoCrmEventId: string;
      lastSyncedAt: string;
      syncStatus: string;
    };
  }

  /**
   * Convert Maestro BEO to Echo CRM Event updates
   */
  private beoDocumentToEchoCrmUpdates(beo: BEODocument, originalEchoEvent: EchoCRMEvent): Partial<EchoCRMEvent> {
    return {
      eventName: beo.header.eventName || originalEchoEvent.eventName,
      eventDate: beo.event.date || originalEchoEvent.eventDate,
      eventTime: beo.event.time || originalEchoEvent.eventTime,
      room: beo.event.room || originalEchoEvent.room,
      guestCount: {
        ...originalEchoEvent.guestCount,
        guaranteed: beo.event.guaranteed,
        expected: beo.event.expected
      },
      
      // Map special requirements from BEO
      specialRequests: [
        ...originalEchoEvent.specialRequests,
        ...(beo.menu.specialInstructions || []),
        ...(beo.setup.specialRequests || [])
      ].filter((req, index, arr) => arr.indexOf(req) === index), // Remove duplicates
      
      // Update sync information
      maestroBEOId: beo.id,
      lastModifiedAt: beo.updatedAt,
      syncStatus: 'synced'
    };
  }

  /**
   * Fetch events from Echo CRM Events
   */
  async fetchEchoCrmEvents(filters?: {
    dateRange?: { start: string; end: string };
    status?: string[];
    salesRepId?: string;
  }): Promise<SyncApiResponse<EchoCRMEvent[]>> {
    try {
      if (!this.syncConfig) {
        throw new Error('Integration not initialized');
      }

      const queryParams = new URLSearchParams();
      if (filters?.dateRange) {
        queryParams.append('startDate', filters.dateRange.start);
        queryParams.append('endDate', filters.dateRange.end);
      }
      if (filters?.status) {
        queryParams.append('status', filters.status.join(','));
      }
      if (filters?.salesRepId) {
        queryParams.append('salesRepId', filters.salesRepId);
      }

      const response = await fetch(`${this.syncConfig.echoCrmApiUrl}/events?${queryParams}`, {
        headers: {
          'Authorization': `Bearer ${this.syncConfig.echoCrmApiKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Echo CRM API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      return {
        success: true,
        data: data.events,
        metadata: {
          requestId: data.requestId,
          timestamp: new Date().toISOString(),
          version: '1.0'
        }
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'FETCH_ERROR',
          message: error instanceof Error ? error.message : 'Unknown error',
          details: error
        },
        metadata: {
          requestId: `error-${Date.now()}`,
          timestamp: new Date().toISOString(),
          version: '1.0'
        }
      };
    }
  }

  /**
   * Sync Echo CRM events to Maestro Calendar
   */
  async syncEchoCrmToMaestro(): Promise<BatchSyncResponse> {
    const operations: SyncOperation[] = [];
    let stats = { created: 0, updated: 0, deleted: 0, conflicted: 0 };

    try {
      // Fetch events from Echo CRM
      const echoResponse = await this.fetchEchoCrmEvents();
      if (!echoResponse.success || !echoResponse.data) {
        throw new Error('Failed to fetch Echo CRM events');
      }

      // Fetch existing Maestro events
      const maestroEvents = await this.fetchMaestroEvents();

      // Process each Echo CRM event
      for (const echoEvent of echoResponse.data) {
        const existingMaestroEvent = maestroEvents.find(
          event => (event as any).echoCrmEventId === echoEvent.crmEventId
        );

        const operation: SyncOperation = {
          id: `sync-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          operationType: existingMaestroEvent ? 'update' : 'create',
          direction: 'echo_to_maestro',
          sourceSystem: 'echo_crm',
          sourceRecordId: echoEvent.crmEventId,
          sourceRecordType: 'event',
          targetSystem: 'maestro_banquets',
          targetRecordId: existingMaestroEvent?.id,
          targetRecordType: 'event',
          status: 'pending',
          startedAt: new Date().toISOString(),
          changes: [],
          triggeredBy: 'system',
          syncConfigId: this.syncConfig!.id,
          retryCount: 0,
          maxRetries: 3
        };

        try {
          if (existingMaestroEvent) {
            // Check for conflicts
            const conflicts = this.detectConflicts(echoEvent, existingMaestroEvent);
            if (conflicts.length > 0) {
              operation.status = 'conflicted';
              stats.conflicted++;
              // Handle conflict resolution based on configuration
              await this.handleConflicts(operation, conflicts);
            } else {
              // Update existing event
              const updatedEvent = this.echoCrmEventToCalendarEvent(echoEvent);
              await this.updateMaestroEvent(updatedEvent);
              operation.status = 'completed';
              operation.completedAt = new Date().toISOString();
              stats.updated++;
            }
          } else {
            // Create new event
            const newEvent = this.echoCrmEventToCalendarEvent(echoEvent);
            await this.createMaestroEvent(newEvent);
            operation.status = 'completed';
            operation.completedAt = new Date().toISOString();
            stats.created++;
          }
        } catch (error) {
          operation.status = 'failed';
          operation.errorMessage = error instanceof Error ? error.message : 'Unknown error';
        }

        operations.push(operation);
      }

      return {
        totalOperations: operations.length,
        successfulOperations: operations.filter(op => op.status === 'completed').length,
        failedOperations: operations.filter(op => op.status === 'failed').length,
        operations,
        summary: stats
      };

    } catch (error) {
      console.error('Sync failed:', error);
      throw error;
    }
  }

  /**
   * Sync Maestro BEO updates back to Echo CRM
   */
  async syncMaestroToEchoCrm(beoId: string): Promise<SyncOperation> {
    const operation: SyncOperation = {
      id: `sync-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      operationType: 'update',
      direction: 'maestro_to_echo',
      sourceSystem: 'maestro_banquets',
      sourceRecordId: beoId,
      sourceRecordType: 'beo',
      targetSystem: 'echo_crm',
      targetRecordType: 'event',
      status: 'pending',
      startedAt: new Date().toISOString(),
      changes: [],
      triggeredBy: 'system',
      syncConfigId: this.syncConfig!.id,
      retryCount: 0,
      maxRetries: 3
    };

    try {
      // Fetch BEO from Maestro
      const beo = await this.fetchMaestroBEO(beoId);
      if (!beo) {
        throw new Error('BEO not found');
      }

      // Find corresponding Echo CRM event
      const echoEventId = (beo as any).echoCrmEventId;
      if (!echoEventId) {
        throw new Error('No Echo CRM Event ID associated with this BEO');
      }

      const echoEvent = await this.fetchEchoCrmEvent(echoEventId);
      if (!echoEvent) {
        throw new Error('Echo CRM Event not found');
      }

      // Create update payload
      const updatePayload = this.beoDocumentToEchoCrmUpdates(beo, echoEvent);
      
      // Send update to Echo CRM
      await this.updateEchoCrmEvent(echoEventId, updatePayload);
      
      operation.status = 'completed';
      operation.completedAt = new Date().toISOString();
      operation.targetRecordId = echoEventId;

    } catch (error) {
      operation.status = 'failed';
      operation.errorMessage = error instanceof Error ? error.message : 'Unknown error';
    }

    return operation;
  }

  /**
   * Handle incoming webhooks from Echo CRM Events
   */
  async handleEchoCrmWebhook(payload: EchoCRMWebhookPayload): Promise<void> {
    console.log('Received Echo CRM webhook:', payload.eventType, payload.data.event.crmEventId);

    try {
      switch (payload.eventType) {
        case 'event.created':
          await this.handleEchoCrmEventCreated(payload.data.event);
          break;
        case 'event.updated':
          await this.handleEchoCrmEventUpdated(payload.data.event, payload.data.changes);
          break;
        case 'event.deleted':
          await this.handleEchoCrmEventDeleted(payload.data.event);
          break;
        case 'contract.signed':
          await this.handleEchoCrmContractSigned(payload.data.event);
          break;
      }

      // Emit event for real-time updates
      this.emitWebhookEvent('echo_crm_webhook', payload);

    } catch (error) {
      console.error('Error handling Echo CRM webhook:', error);
      throw error;
    }
  }

  /**
   * Handle incoming webhooks from Maestro Banquets
   */
  async handleMaestroWebhook(payload: MaestroBanquetsWebhookPayload): Promise<void> {
    console.log('Received Maestro webhook:', payload.eventType, payload.data.beo.id);

    try {
      switch (payload.eventType) {
        case 'beo.created':
          await this.handleMaestroBEOCreated(payload.data.beo);
          break;
        case 'beo.updated':
          await this.handleMaestroBEOUpdated(payload.data.beo, payload.data.changes);
          break;
        case 'beo.approved':
          await this.handleMaestroBEOApproved(payload.data.beo);
          break;
        case 'beo.deleted':
          await this.handleMaestroBEODeleted(payload.data.beo);
          break;
      }

      // Emit event for real-time updates
      this.emitWebhookEvent('maestro_webhook', payload);

    } catch (error) {
      console.error('Error handling Maestro webhook:', error);
      throw error;
    }
  }

  /**
   * Get current sync status
   */
  async getSyncStatus(): Promise<SyncStatus> {
    const pendingOperations = await this.getPendingOperations();
    const failedOperations = await this.getFailedOperations();
    const conflicts = await this.getUnresolvedConflicts();

    return {
      isConnected: this.eventSource?.readyState === EventSource.OPEN,
      lastSyncAt: await this.getLastSyncTime(),
      nextSyncAt: this.syncConfig?.autoSync ? this.getNextSyncTime() : undefined,
      
      echoCrmConnection: {
        status: await this.checkEchoCrmConnection(),
        lastPing: new Date().toISOString()
      },
      
      maestroConnection: {
        status: 'connected', // Assuming local connection
        lastPing: new Date().toISOString()
      },
      
      stats: {
        totalSynced: await this.getTotalSyncedCount(),
        pendingOperations: pendingOperations.length,
        failedOperations: failedOperations.length,
        conflictsToResolve: conflicts.length
      },
      
      currentOperations: pendingOperations
    };
  }

  /**
   * Manual sync trigger
   */
  async triggerManualSync(): Promise<BatchSyncResponse> {
    if (!this.syncConfig) {
      throw new Error('Integration not initialized');
    }

    console.log('Triggering manual sync...');
    return await this.syncEchoCrmToMaestro();
  }

  /**
   * Resolve data conflicts
   */
  async resolveConflict(
    conflictId: string, 
    resolution: 'echo_wins' | 'maestro_wins' | 'custom',
    customData?: Record<string, any>
  ): Promise<void> {
    const conflict = await this.getConflictById(conflictId);
    if (!conflict) {
      throw new Error('Conflict not found');
    }

    try {
      switch (resolution) {
        case 'echo_wins':
          await this.applyEchoResolution(conflict);
          break;
        case 'maestro_wins':
          await this.applyMaestroResolution(conflict);
          break;
        case 'custom':
          if (customData) {
            await this.applyCustomResolution(conflict, customData);
          }
          break;
      }

      // Mark conflict as resolved
      await this.markConflictResolved(conflictId, resolution);

    } catch (error) {
      console.error('Error resolving conflict:', error);
      throw error;
    }
  }

  // Private helper methods

  private mapContractStatusToEventStatus(contractStatus: string): CalendarEvent['status'] {
    const statusMap: Record<string, CalendarEvent['status']> = {
      'inquiry': 'lead',
      'proposal_sent': 'proposal',
      'negotiating': 'pending',
      'signed': 'confirmed',
      'cancelled': 'closed'
    };
    return statusMap[contractStatus] || 'pending';
  }

  private calculateEventPriority(echoEvent: EchoCRMEvent): CalendarEvent['priority'] {
    const daysUntilEvent = Math.floor(
      (new Date(echoEvent.eventDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );
    
    if (daysUntilEvent <= 7) return 'urgent';
    if (daysUntilEvent <= 30) return 'high';
    if (daysUntilEvent <= 90) return 'medium';
    return 'low';
  }

  private async startAutoSync(): Promise<void> {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
    }

    const intervalMs = (this.syncConfig?.syncInterval || 15) * 60 * 1000; // Convert to milliseconds
    
    this.syncInterval = setInterval(async () => {
      try {
        await this.syncEchoCrmToMaestro();
        console.log('Auto-sync completed successfully');
      } catch (error) {
        console.error('Auto-sync failed:', error);
      }
    }, intervalMs);

    console.log(`Auto-sync started with interval: ${this.syncConfig?.syncInterval} minutes`);
  }

  private setupRealtimeListening(): void {
    if (!this.syncConfig) return;

    const eventSourceUrl = `${this.syncConfig.maestroApiUrl}/events/stream`;
    this.eventSource = new EventSource(eventSourceUrl);

    this.eventSource.onopen = () => {
      console.log('Real-time sync connection established');
    };

    this.eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.handleRealtimeEvent(data);
      } catch (error) {
        console.error('Error parsing real-time event:', error);
      }
    };

    this.eventSource.onerror = (error) => {
      console.error('Real-time sync connection error:', error);
    };
  }

  private detectConflicts(echoEvent: EchoCRMEvent, maestroEvent: CalendarEvent): DataConflict[] {
    const conflicts: DataConflict[] = [];
    
    // Compare key fields for conflicts
    const fieldsToCompare = [
      { field: 'eventName', echoValue: echoEvent.eventName, maestroValue: maestroEvent.title },
      { field: 'eventDate', echoValue: echoEvent.eventDate, maestroValue: maestroEvent.date },
      { field: 'guestCount', echoValue: echoEvent.guestCount.guaranteed, maestroValue: maestroEvent.guestCount }
    ];

    fieldsToCompare.forEach(comparison => {
      if (comparison.echoValue !== comparison.maestroValue) {
        // This is a simplified conflict detection - in reality, you'd want more sophisticated logic
        conflicts.push({
          id: `conflict-${Date.now()}-${comparison.field}`,
          conflictType: 'field_mismatch',
          echoRecord: { [comparison.field]: comparison.echoValue } as Partial<EchoCRMEvent>,
          maestroRecord: { [comparison.field]: comparison.maestroValue } as Partial<BEODocument>,
          conflicts: [{
            field: comparison.field,
            echoValue: comparison.echoValue,
            maestroValue: comparison.maestroValue,
            lastModifiedEcho: echoEvent.lastModifiedAt,
            lastModifiedMaestro: (maestroEvent as any).updatedAt || new Date().toISOString()
          }],
          status: 'pending',
          detectedAt: new Date().toISOString(),
          priority: 'medium',
          impactAssessment: `Field ${comparison.field} has different values between systems`
        });
      }
    });

    return conflicts;
  }

  private emitWebhookEvent(eventType: string, data: any): void {
    const listeners = this.webhookListeners.get(eventType) || [];
    listeners.forEach(listener => {
      try {
        listener(data);
      } catch (error) {
        console.error('Error in webhook listener:', error);
      }
    });
  }

  // Placeholder methods for external API calls
  private async fetchMaestroEvents(): Promise<CalendarEvent[]> {
    // This would call your Maestro Banquets API
    return [];
  }

  private async createMaestroEvent(event: CalendarEvent): Promise<void> {
    // This would call your Maestro Banquets API to create an event
  }

  private async updateMaestroEvent(event: CalendarEvent): Promise<void> {
    // This would call your Maestro Banquets API to update an event
  }

  private async fetchMaestroBEO(beoId: string): Promise<BEODocument | null> {
    // This would call your Maestro Banquets API to fetch a BEO
    return null;
  }

  private async fetchEchoCrmEvent(eventId: string): Promise<EchoCRMEvent | null> {
    // This would call Echo CRM Events API to fetch an event
    return null;
  }

  private async updateEchoCrmEvent(eventId: string, updates: Partial<EchoCRMEvent>): Promise<void> {
    // This would call Echo CRM Events API to update an event
  }

  // Additional placeholder methods for webhook handlers and utility functions
  private async handleEchoCrmEventCreated(event: EchoCRMEvent): Promise<void> {
    const maestroEvent = this.echoCrmEventToCalendarEvent(event);
    await this.createMaestroEvent(maestroEvent);
  }

  private async handleEchoCrmEventUpdated(event: EchoCRMEvent, changes?: any[]): Promise<void> {
    const maestroEvent = this.echoCrmEventToCalendarEvent(event);
    await this.updateMaestroEvent(maestroEvent);
  }

  private async handleEchoCrmEventDeleted(event: EchoCRMEvent): Promise<void> {
    // Handle event deletion
  }

  private async handleEchoCrmContractSigned(event: EchoCRMEvent): Promise<void> {
    // Handle contract signing - might trigger BEO creation
  }

  private async handleMaestroBEOCreated(beo: BEODocument): Promise<void> {
    // Handle BEO creation
  }

  private async handleMaestroBEOUpdated(beo: BEODocument, changes?: any[]): Promise<void> {
    // Handle BEO updates
    if ((beo as any).echoCrmEventId) {
      await this.syncMaestroToEchoCrm(beo.id);
    }
  }

  private async handleMaestroBEOApproved(beo: BEODocument): Promise<void> {
    // Handle BEO approval
  }

  private async handleMaestroBEODeleted(beo: BEODocument): Promise<void> {
    // Handle BEO deletion
  }

  private async handleRealtimeEvent(data: any): Promise<void> {
    // Handle real-time events
  }

  private async handleConflicts(operation: SyncOperation, conflicts: DataConflict[]): Promise<void> {
    // Handle conflicts based on configuration
  }

  private async getPendingOperations(): Promise<SyncOperation[]> {
    return [];
  }

  private async getFailedOperations(): Promise<SyncOperation[]> {
    return [];
  }

  private async getUnresolvedConflicts(): Promise<DataConflict[]> {
    return [];
  }

  private async getLastSyncTime(): Promise<string | undefined> {
    return undefined;
  }

  private getNextSyncTime(): string | undefined {
    return undefined;
  }

  private async checkEchoCrmConnection(): Promise<'connected' | 'disconnected' | 'error'> {
    return 'connected';
  }

  private async getTotalSyncedCount(): Promise<number> {
    return 0;
  }

  private async getConflictById(conflictId: string): Promise<DataConflict | null> {
    return null;
  }

  private async applyEchoResolution(conflict: DataConflict): Promise<void> {
    // Apply Echo CRM's version
  }

  private async applyMaestroResolution(conflict: DataConflict): Promise<void> {
    // Apply Maestro's version
  }

  private async applyCustomResolution(conflict: DataConflict, customData: Record<string, any>): Promise<void> {
    // Apply custom resolution
  }

  private async markConflictResolved(conflictId: string, resolution: string): Promise<void> {
    // Mark conflict as resolved
  }

  /**
   * Cleanup resources
   */
  destroy(): void {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
    }

    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }

    this.webhookListeners.clear();
    console.log('Echo Integration Service destroyed');
  }
}

// Singleton instance
export const echoIntegrationService = new EchoIntegrationService();
export default echoIntegrationService;
