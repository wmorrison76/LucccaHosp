# Echo CRM Events Integration with Maestro Banquets

This document outlines the comprehensive integration between **Echo CRM Events** (Event Sales team) and **Maestro Banquets** (Operations team) for seamless BEO (Banquet Event Order) management and data synchronization.

## Overview

The integration enables real-time bidirectional synchronization between the two systems, ensuring that event information created by the sales team in Echo CRM Events is automatically available to the Maestro Banquets operations team for BEO creation and management.

## Architecture

### Components

1. **Echo CRM Events** - Event sales and client management system
2. **Maestro Banquets** - Operations, BEO management, and kitchen coordination system
3. **Integration Service** - Handles real-time synchronization between both systems
4. **Webhook System** - Enables real-time event notifications
5. **Conflict Resolution** - Manages data conflicts between systems

### Data Flow

```
Echo CRM Events (Sales) ←→ Integration Service ←→ Maestro Banquets (Operations)
                                    ↕
                           Webhook Notifications
                                    ↕
                            Conflict Resolution
```

## Key Features

### 1. Bidirectional Synchronization
- **Echo CRM → Maestro**: Event data flows from sales to operations automatically
- **Maestro → Echo CRM**: BEO updates and operational details sync back to sales
- **Real-time Updates**: Changes in either system trigger immediate sync

### 2. Data Mapping

#### Echo CRM Event → Maestro Calendar Event
```typescript
{
  eventName → title
  eventDate → date
  eventTime → time
  venue/room → room
  guestCount.guaranteed → guestCount
  contractStatus → status (mapped)
  budget.totalBudget → revenue
  clientName → clientName
  salesRepName → salesRepName
  specialRequests → notes
}
```

#### Maestro BEO → Echo CRM Updates
```typescript
{
  header.eventName → eventName
  event.date → eventDate
  event.time → eventTime
  event.room → room
  event.guaranteed → guestCount.guaranteed
  menu.specialInstructions → specialRequests
  setup.specialRequests → specialRequests
}
```

### 3. Conflict Resolution
When the same data is modified in both systems simultaneously:
- **Automatic Resolution**: Based on configured rules (newest wins, Echo wins, Maestro wins)
- **Manual Resolution**: Dashboard interface for complex conflicts
- **Audit Trail**: Complete history of all changes and resolutions

### 4. Real-time Status Monitoring
- Connection health monitoring
- Sync operation tracking
- Error reporting and alerting
- Performance metrics

## Implementation

### Client-Side Components

#### 1. Enhanced BEO Store (`client/stores/beoStore.ts`)
```typescript
interface BEOStore {
  // Existing BEO functionality...
  
  // Echo Integration State
  echoIntegrationConfig: SyncConfiguration | null;
  syncStatus: SyncStatus | null;
  pendingConflicts: DataConflict[];
  isIntegrationEnabled: boolean;
  echoCrmEvents: EchoCRMEvent[];
  
  // Integration Actions
  initializeEchoIntegration(config: SyncConfiguration): Promise<void>;
  syncWithEchoCrm(): Promise<void>;
  createBEOFromEchoCrmEvent(echoCrmEventId: string): Promise<BEODocument>;
  resolveConflict(conflictId: string, resolution: string): Promise<void>;
}
```

#### 2. Integration Panel (`client/components/panels/EchoIntegrationPanel.tsx`)
- Real-time sync status dashboard
- Conflict resolution interface
- Echo CRM Events browser
- Integration configuration

#### 3. Enhanced Global Calendar (`client/components/panels/GlobalCalendar.tsx`)
- Echo CRM event indicators
- Enhanced search (includes Echo data)
- Sync status monitoring
- Direct BEO creation from Echo events

### Server-Side Components

#### 1. Integration Service (`client/services/echo-integration.ts`)
```typescript
class EchoIntegrationService {
  // Core sync operations
  async syncEchoCrmToMaestro(): Promise<BatchSyncResponse>;
  async syncMaestroToEchoCrm(beoId: string): Promise<SyncOperation>;
  
  // Webhook handling
  async handleEchoCrmWebhook(payload: EchoCRMWebhookPayload): Promise<void>;
  async handleMaestroWebhook(payload: MaestroBanquetsWebhookPayload): Promise<void>;
  
  // Conflict management
  async resolveConflict(conflictId: string, resolution: string): Promise<void>;
  
  // Status monitoring
  async getSyncStatus(): Promise<SyncStatus>;
}
```

#### 2. Server Routes (`server/routes/echo-integration.ts`)
- `/api/echo-integration/initialize` - Setup integration
- `/api/echo-integration/status` - Get sync status
- `/api/echo-integration/webhooks/echo-crm` - Handle Echo CRM webhooks
- `/api/echo-integration/webhooks/maestro` - Send Maestro webhooks
- `/api/echo-integration/sync` - Manual sync trigger
- `/api/echo-integration/conflicts/:id/resolve` - Resolve conflicts

## Setup and Configuration

### 1. Initialize Integration

```typescript
const config: SyncConfiguration = {
  organizationId: "your-org-id",
  echoCrmApiUrl: "https://api.echocrm.com/v1",
  echoCrmApiKey: "your-echo-api-key",
  maestroApiUrl: "https://api.maestrobanquets.com/v1",
  maestroApiKey: "your-maestro-api-key",
  webhookSecret: "shared-webhook-secret",
  syncDirection: "bidirectional",
  autoSync: true,
  syncInterval: 15, // minutes
  conflictResolution: "newest_wins"
};

await useBEOStore.getState().initializeEchoIntegration(config);
```

### 2. Webhook Configuration

#### Echo CRM Events Webhook Endpoint
```
POST https://your-maestro-domain.com/api/echo-integration/webhooks/echo-crm
```

#### Maestro Banquets Webhook Endpoint
```
POST https://your-echo-crm-domain.com/api/echo-integration/webhooks/maestro
```

## Event Types and Triggers

### Echo CRM Events → Maestro Banquets

1. **event.created** - New event created in Echo CRM
   - Creates new calendar event in Maestro
   - Available for BEO creation

2. **event.updated** - Event details modified
   - Updates corresponding Maestro calendar event
   - Checks for conflicts with existing BEO

3. **contract.signed** - Contract finalized
   - Triggers automatic BEO creation
   - Notifies Maestro operations team

4. **event.deleted** - Event cancelled
   - Marks event as cancelled in Maestro
   - Preserves BEO history for reporting

### Maestro Banquets → Echo CRM Events

1. **beo.created** - BEO created for Echo event
   - Links BEO to Echo CRM event
   - Updates event status in Echo CRM

2. **beo.updated** - BEO details modified
   - Syncs relevant changes back to Echo CRM
   - Updates guest count, timing, special requests

3. **beo.approved** - BEO finalized by chef
   - Confirms event readiness in Echo CRM
   - Triggers sales team notification

## UI Integration

### Global Calendar Enhancements

1. **Echo CRM Indicators**
   - Blue lightning bolt icon for Echo-sourced events
   - Sales rep and client information display
   - Contract status badges

2. **Enhanced Search**
   - Search across Echo CRM metadata
   - Client names, sales rep names, Echo event IDs

3. **Integration Controls**
   - Real-time sync status indicator
   - Quick access to integration management
   - Conflict alerts and resolution

### Echo Integration Panel

1. **Status Dashboard**
   - Connection health monitoring
   - Sync statistics and metrics
   - Recent operation history

2. **Conflict Resolution**
   - Visual conflict comparison
   - One-click resolution options
   - Custom resolution capabilities

3. **Echo Events Browser**
   - Browse recent Echo CRM events
   - Direct BEO creation
   - Event details and metadata

## Data Security and Compliance

### Authentication
- API key authentication for both systems
- Webhook signature verification
- Role-based access control

### Data Protection
- Encrypted data transmission (HTTPS)
- Webhook payload validation
- Audit logging for all operations

### Privacy Considerations
- Only necessary data is synchronized
- Client PII handling per regulations
- Data retention policies respected

## Monitoring and Alerting

### Health Checks
- API endpoint availability monitoring
- Database connection health
- Webhook delivery success rates

### Performance Metrics
- Sync operation response times
- Data throughput tracking
- Error rate monitoring

### Alerting Rules
- Failed sync operations
- High conflict rates
- API connectivity issues
- Data consistency problems

## Troubleshooting

### Common Issues

1. **Sync Failures**
   - Check API connectivity
   - Verify authentication credentials
   - Review webhook signatures

2. **Data Conflicts**
   - Review conflict resolution rules
   - Check timestamp synchronization
   - Validate data mapping logic

3. **Performance Issues**
   - Monitor sync frequency
   - Check database performance
   - Review webhook delivery rates

### Diagnostic Tools

1. **Integration Panel**
   - Real-time status monitoring
   - Operation history review
   - Error message display

2. **API Endpoints**
   - `/api/echo-integration/status` - System health
   - `/api/echo-integration/history` - Operation logs

3. **Server Logs**
   - Webhook processing logs
   - Sync operation traces
   - Error stack traces

## Future Enhancements

### Planned Features
1. **Advanced Conflict Resolution** - AI-powered suggestions
2. **Batch Operations** - Bulk sync capabilities
3. **Enhanced Monitoring** - Custom dashboard widgets
4. **Mobile Notifications** - Real-time alerts on mobile devices

### API Extensions
1. **Custom Field Mapping** - User-configurable field mappings
2. **Workflow Automation** - Custom sync triggers and actions
3. **Advanced Filtering** - Selective sync based on criteria

## Best Practices

### Configuration
- Use environment variables for sensitive data
- Implement proper error handling
- Set appropriate sync intervals

### Data Management
- Regular backup of sync configuration
- Monitor data consistency
- Implement graceful degradation

### Team Coordination
- Clear ownership of integration management
- Regular sync status reviews
- Established conflict resolution procedures

## Support and Maintenance

### Regular Tasks
- Monitor sync status daily
- Review and resolve conflicts promptly
- Update API credentials as needed
- Performance monitoring and optimization

### Updates and Upgrades
- Test integration changes in staging
- Coordinate updates between teams
- Maintain backward compatibility
- Document configuration changes

---

This integration ensures seamless collaboration between the Event Sales team using Echo CRM Events and the Operations team using Maestro Banquets, eliminating data silos and improving operational efficiency.
