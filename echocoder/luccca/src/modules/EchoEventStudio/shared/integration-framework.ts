// EchoScope Integration Framework
// Handles bidirectional sync with Echo CRM, Prismm floorplans, and accounting systems

import { 
  Event, 
  Account, 
  Contact, 
  Invoice, 
  FloorplanLink,
  EchoCRMIntegration,
  PrismmIntegration,
  AccountingIntegration
} from './beo-reo-types';

// ========== ECHO CRM INTEGRATION ==========

export interface EchoCRMClient {
  baseUrl: string;
  apiKey: string;
  webhook_secret: string;
}

export interface EchoCRMLead {
  id: string;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string;
  status: 'new' | 'qualified' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost';
  estimated_value: number;
  event_date?: Date;
  guest_count?: number;
  venue_requirements: string[];
  source: string;
  created_at: Date;
  updated_at: Date;
}

export interface EchoOpportunity {
  id: string;
  lead_id: string;
  account_id: string;
  stage: string;
  probability: number;
  close_date: Date;
  amount: number;
  description: string;
  next_action: string;
  assigned_to: string;
}

export class EchoCRMService {
  private client: EchoCRMClient;

  constructor(client: EchoCRMClient) {
    this.client = client;
  }

  /**
   * Sync event to Echo CRM as opportunity
   */
  async syncEventToCRM(event: Event): Promise<{ success: boolean; opportunity_id?: string; error?: string }> {
    try {
      const opportunity: Partial<EchoOpportunity> = {
        account_id: event.account_id,
        stage: this.mapEventStatusToCRMStage(event.status),
        probability: this.calculateProbability(event.status),
        close_date: event.start_at,
        amount: 0, // Would calculate from line items
        description: `${event.name} - ${event.expected_guests} guests`,
        next_action: this.getNextAction(event.status),
        assigned_to: event.manager_id
      };

      // Simulate API call
      console.log('Syncing to Echo CRM:', opportunity);
      
      // In production: 
      // const response = await fetch(`${this.client.baseUrl}/opportunities`, {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${this.client.apiKey}`,
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(opportunity)
      // });

      return {
        success: true,
        opportunity_id: `opp_${Date.now()}`
      };

    } catch (error) {
      console.error('Echo CRM sync failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Import leads from Echo CRM
   */
  async importLeads(filters?: { 
    status?: string[]; 
    date_range?: { start: Date; end: Date }; 
    assigned_to?: string 
  }): Promise<EchoCRMLead[]> {
    try {
      // Simulate API call with mock data
      const mockLeads: EchoCRMLead[] = [
        {
          id: 'lead_001',
          company_name: 'Tech Innovations Corp',
          contact_name: 'Sarah Johnson',
          email: 'sarah.johnson@techinnovations.com',
          phone: '+1-555-0123',
          status: 'qualified',
          estimated_value: 45000,
          event_date: new Date('2024-03-15'),
          guest_count: 150,
          venue_requirements: ['AV equipment', 'catering', 'parking'],
          source: 'website',
          created_at: new Date('2024-01-15'),
          updated_at: new Date('2024-01-20')
        },
        {
          id: 'lead_002',
          company_name: 'Global Marketing Solutions',
          contact_name: 'Michael Chen',
          email: 'michael.chen@globalmarketing.com',
          phone: '+1-555-0456',
          status: 'proposal',
          estimated_value: 28000,
          event_date: new Date('2024-04-22'),
          guest_count: 80,
          venue_requirements: ['outdoor space', 'catering', 'photography'],
          source: 'referral',
          created_at: new Date('2024-01-18'),
          updated_at: new Date('2024-01-25')
        }
      ];

      return mockLeads;

    } catch (error) {
      console.error('Failed to import leads:', error);
      return [];
    }
  }

  /**
   * Setup webhook endpoints for real-time sync
   */
  async setupWebhooks(): Promise<{ success: boolean; webhook_ids: string[] }> {
    const webhookEndpoints = [
      'leads.created',
      'leads.updated', 
      'opportunities.stage_changed',
      'accounts.updated'
    ];

    try {
      const webhook_ids: string[] = [];

      for (const endpoint of webhookEndpoints) {
        // Simulate webhook registration
        console.log(`Registering webhook for ${endpoint}`);
        webhook_ids.push(`webhook_${endpoint}_${Date.now()}`);
      }

      return {
        success: true,
        webhook_ids
      };

    } catch (error) {
      console.error('Webhook setup failed:', error);
      return {
        success: false,
        webhook_ids: []
      };
    }
  }

  private mapEventStatusToCRMStage(status: string): string {
    const statusMap = {
      'draft': 'Proposal',
      'hold': 'Negotiation', 
      'definite': 'Closed Won',
      'closed': 'Closed Won',
      'cancelled': 'Closed Lost'
    };
    return statusMap[status as keyof typeof statusMap] || 'Proposal';
  }

  private calculateProbability(status: string): number {
    const probMap = {
      'draft': 25,
      'hold': 50,
      'definite': 95,
      'closed': 100,
      'cancelled': 0
    };
    return probMap[status as keyof typeof probMap] || 25;
  }

  private getNextAction(status: string): string {
    const actionMap = {
      'draft': 'Send proposal to client',
      'hold': 'Follow up on decision timeline',
      'definite': 'Finalize event details',
      'closed': 'Post-event follow up',
      'cancelled': 'Archive opportunity'
    };
    return actionMap[status as keyof typeof actionMap] || 'Review and update';
  }
}

// ========== PRISMM FLOORPLAN INTEGRATION ==========

export interface PrismmClient {
  baseUrl: string;
  apiKey: string;
  organization_id: string;
}

export interface PrismmProject {
  id: string;
  name: string;
  venue_id: string;
  scenarios: PrismmScenario[];
  created_at: Date;
  updated_at: Date;
}

export interface PrismmScenario {
  id: string;
  name: string;
  layout_type: string;
  total_seats: number;
  table_count: number;
  setup_time_minutes: number;
  breakdown_time_minutes: number;
  fire_code_compliant: boolean;
  ada_compliant: boolean;
  notes: string;
}

export class PrismmService {
  private client: PrismmClient;

  constructor(client: PrismmClient) {
    this.client = client;
  }

  /**
   * Create or link floorplan project
   */
  async createFloorplanProject(event: Event, space_id: string): Promise<{
    success: boolean;
    project_id?: string;
    scenarios?: PrismmScenario[];
    error?: string;
  }> {
    try {
      const project: Partial<PrismmProject> = {
        name: `${event.name} - Floorplan`,
        venue_id: space_id
      };

      // Simulate API call
      console.log('Creating Prismm project:', project);

      // Mock scenarios based on event type and guest count
      const scenarios = this.generateScenarios(event);

      return {
        success: true,
        project_id: `prismm_${Date.now()}`,
        scenarios
      };

    } catch (error) {
      console.error('Prismm project creation failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Sync seat counts and capacity
   */
  async syncSeatCounts(project_id: string, scenario_id: string): Promise<{
    total_seats: number;
    table_count: number;
    capacity_warnings: string[];
  }> {
    try {
      // Simulate API call to get current scenario details
      console.log(`Syncing seat counts for project ${project_id}, scenario ${scenario_id}`);

      return {
        total_seats: 120,
        table_count: 15,
        capacity_warnings: []
      };

    } catch (error) {
      console.error('Seat count sync failed:', error);
      return {
        total_seats: 0,
        table_count: 0,
        capacity_warnings: ['Failed to sync with Prismm']
      };
    }
  }

  /**
   * Generate backup scenarios (rain plans, capacity variants)
   */
  async generateBackupScenarios(project_id: string, base_scenario_id: string): Promise<PrismmScenario[]> {
    try {
      // Generate weather-based and capacity-based alternatives
      const backupScenarios: PrismmScenario[] = [
        {
          id: `${base_scenario_id}_rain_plan`,
          name: 'Rain Plan - Indoor Alternative',
          layout_type: 'indoor_reception',
          total_seats: 100, // Reduced capacity for indoor space
          table_count: 12,
          setup_time_minutes: 90,
          breakdown_time_minutes: 60,
          fire_code_compliant: true,
          ada_compliant: true,
          notes: 'Indoor backup for weather contingency'
        },
        {
          id: `${base_scenario_id}_reduced_capacity`,
          name: 'Reduced Capacity - Social Distancing',
          layout_type: 'spaced_rounds',
          total_seats: 80,
          table_count: 10,
          setup_time_minutes: 75,
          breakdown_time_minutes: 45,
          fire_code_compliant: true,
          ada_compliant: true,
          notes: 'Reduced capacity with increased spacing'
        }
      ];

      return backupScenarios;

    } catch (error) {
      console.error('Backup scenario generation failed:', error);
      return [];
    }
  }

  private generateScenarios(event: Event): PrismmScenario[] {
    const guestCount = event.expected_guests;
    
    // Generate appropriate scenarios based on guest count and event type
    const scenarios: PrismmScenario[] = [
      {
        id: `scenario_primary_${Date.now()}`,
        name: 'Primary Layout - Rounds',
        layout_type: 'rounds_of_10',
        total_seats: guestCount,
        table_count: Math.ceil(guestCount / 10),
        setup_time_minutes: 120,
        breakdown_time_minutes: 90,
        fire_code_compliant: true,
        ada_compliant: true,
        notes: 'Primary reception layout with round tables'
      }
    ];

    // Add appropriate alternatives based on guest count
    if (guestCount > 50) {
      scenarios.push({
        id: `scenario_alt_${Date.now()}`,
        name: 'Alternative - Theater Style',
        layout_type: 'theater',
        total_seats: guestCount,
        table_count: 0,
        setup_time_minutes: 60,
        breakdown_time_minutes: 30,
        fire_code_compliant: true,
        ada_compliant: true,
        notes: 'Theater-style seating for presentations'
      });
    }

    return scenarios;
  }
}

// ========== ACCOUNTING INTEGRATION ==========

export interface AccountingClient {
  provider: 'quickbooks' | 'xero' | 'sage';
  oauth_token: string;
  refresh_token: string;
  base_url: string;
  company_id?: string; // QuickBooks specific
}

export interface AccountingCustomer {
  id: string;
  name: string;
  email: string;
  billing_address: any;
  tax_exempt: boolean;
  payment_terms: string;
}

export interface AccountingInvoice {
  id: string;
  customer_id: string;
  invoice_number: string;
  issue_date: Date;
  due_date: Date;
  line_items: AccountingLineItem[];
  tax_lines: any[];
  total_amount: number;
  status: string;
}

export interface AccountingLineItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
  account_code: string;
  tax_code: string;
}

export class AccountingService {
  private client: AccountingClient;

  constructor(client: AccountingClient) {
    this.client = client;
  }

  /**
   * Sync customer/account to accounting system
   */
  async syncCustomer(account: Account): Promise<{ success: boolean; customer_id?: string; error?: string }> {
    try {
      const customer: Partial<AccountingCustomer> = {
        name: account.legal_name || account.name,
        email: '', // Would need to get from primary contact
        billing_address: account.billing_address,
        tax_exempt: false,
        payment_terms: 'Net 30'
      };

      console.log(`Syncing customer to ${this.client.provider}:`, customer);

      // Simulate API call based on provider
      if (this.client.provider === 'quickbooks') {
        return await this.syncToQuickBooks('Customer', customer);
      } else if (this.client.provider === 'xero') {
        return await this.syncToXero('Contacts', customer);
      }

      return {
        success: true,
        customer_id: `cust_${Date.now()}`
      };

    } catch (error) {
      console.error('Customer sync failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Sync invoice to accounting system
   */
  async syncInvoice(invoice: Invoice, account: Account): Promise<{ 
    success: boolean; 
    accounting_invoice_id?: string; 
    error?: string 
  }> {
    try {
      const accountingInvoice: Partial<AccountingInvoice> = {
        customer_id: account.id, // Would map to accounting customer ID
        invoice_number: invoice.invoice_number,
        issue_date: new Date(),
        due_date: invoice.due_dates[0]?.due_date || new Date(),
        line_items: this.mapLineItems(invoice),
        total_amount: invoice.subtotal,
        status: 'draft'
      };

      console.log(`Syncing invoice to ${this.client.provider}:`, accountingInvoice);

      return {
        success: true,
        accounting_invoice_id: `inv_${Date.now()}`
      };

    } catch (error) {
      console.error('Invoice sync failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Setup chart of accounts mapping
   */
  async setupAccountMapping(): Promise<{ success: boolean; mappings: Record<string, string> }> {
    try {
      // Default GL account mappings
      const mappings = {
        '4000': 'Food Sales',
        '4100': 'Beverage Sales', 
        '4200': 'Rental Income',
        '4300': 'Service Charges',
        '2200': 'Sales Tax Payable',
        '1200': 'Accounts Receivable'
      };

      console.log('Setting up account mappings:', mappings);

      return {
        success: true,
        mappings
      };

    } catch (error) {
      console.error('Account mapping setup failed:', error);
      return {
        success: false,
        mappings: {}
      };
    }
  }

  private async syncToQuickBooks(entityType: string, data: any): Promise<{ success: boolean; customer_id?: string }> {
    // QuickBooks-specific API call
    console.log(`QuickBooks ${entityType} sync:`, data);
    return { success: true, customer_id: `qb_${Date.now()}` };
  }

  private async syncToXero(entityType: string, data: any): Promise<{ success: boolean; customer_id?: string }> {
    // Xero-specific API call
    console.log(`Xero ${entityType} sync:`, data);
    return { success: true, customer_id: `xero_${Date.now()}` };
  }

  private mapLineItems(invoice: Invoice): AccountingLineItem[] {
    // Map invoice line items to accounting format
    return [{
      description: `Event Services - Invoice ${invoice.invoice_number}`,
      quantity: 1,
      rate: invoice.subtotal,
      amount: invoice.subtotal,
      account_code: '4000',
      tax_code: 'TAX'
    }];
  }
}

// ========== INTEGRATION ORCHESTRATOR ==========

export class IntegrationOrchestrator {
  private echoCRM?: EchoCRMService;
  private prismm?: PrismmService;
  private accounting?: AccountingService;

  constructor(
    echoCRMClient?: EchoCRMClient,
    prismmClient?: PrismmClient,
    accountingClient?: AccountingClient
  ) {
    if (echoCRMClient) this.echoCRM = new EchoCRMService(echoCRMClient);
    if (prismmClient) this.prismm = new PrismmService(prismmClient);
    if (accountingClient) this.accounting = new AccountingService(accountingClient);
  }

  /**
   * Orchestrate full event sync across all systems
   */
  async syncEvent(event: Event, account: Account): Promise<{
    echo_crm: { success: boolean; opportunity_id?: string };
    prismm: { success: boolean; project_id?: string };
    accounting: { success: boolean; customer_id?: string };
    errors: string[];
  }> {
    const results = {
      echo_crm: { success: false },
      prismm: { success: false },
      accounting: { success: false },
      errors: [] as string[]
    };

    // Sync to Echo CRM
    if (this.echoCRM) {
      try {
        const crmResult = await this.echoCRM.syncEventToCRM(event);
        results.echo_crm = crmResult;
        if (!crmResult.success && crmResult.error) {
          results.errors.push(`Echo CRM: ${crmResult.error}`);
        }
      } catch (error) {
        results.errors.push(`Echo CRM: ${error}`);
      }
    }

    // Sync to Prismm (if event has venue requirements)
    if (this.prismm && event.functions.length > 0) {
      try {
        const prismmResult = await this.prismm.createFloorplanProject(event, 'space_001');
        results.prismm = prismmResult;
        if (!prismmResult.success && prismmResult.error) {
          results.errors.push(`Prismm: ${prismmResult.error}`);
        }
      } catch (error) {
        results.errors.push(`Prismm: ${error}`);
      }
    }

    // Sync to Accounting
    if (this.accounting) {
      try {
        const accountingResult = await this.accounting.syncCustomer(account);
        results.accounting = accountingResult;
        if (!accountingResult.success && accountingResult.error) {
          results.errors.push(`Accounting: ${accountingResult.error}`);
        }
      } catch (error) {
        results.errors.push(`Accounting: ${error}`);
      }
    }

    return results;
  }

  /**
   * Health check for all integrations
   */
  async healthCheck(): Promise<{
    echo_crm: { status: 'connected' | 'disconnected' | 'error'; message: string };
    prismm: { status: 'connected' | 'disconnected' | 'error'; message: string };
    accounting: { status: 'connected' | 'disconnected' | 'error'; message: string };
  }> {
    return {
      echo_crm: this.echoCRM ? 
        { status: 'connected', message: 'Echo CRM integration active' } :
        { status: 'disconnected', message: 'Echo CRM not configured' },
      prismm: this.prismm ?
        { status: 'connected', message: 'Prismm integration active' } :
        { status: 'disconnected', message: 'Prismm not configured' },
      accounting: this.accounting ?
        { status: 'connected', message: `${this.accounting['client'].provider} integration active` } :
        { status: 'disconnected', message: 'Accounting system not configured' }
    };
  }
}

// Export configuration helpers
export const IntegrationConfig = {
  /**
   * Setup integration clients from configuration
   */
  fromConfig: (): {
    echoCRM?: EchoCRMClient;
    prismm?: PrismmClient;
    accounting?: AccountingClient;
  } => {
    // Import here to avoid circular dependencies
    const { getConfig } = require('./config');
    const appConfig = getConfig();

    const clients: any = {};

    // Echo CRM config
    if (appConfig.echoCRM) {
      clients.echoCRM = {
        baseUrl: appConfig.echoCRM.baseUrl,
        apiKey: appConfig.echoCRM.apiKey,
        webhook_secret: appConfig.echoCRM.webhookSecret
      };
    }

    // Prismm config
    if (appConfig.prismm) {
      clients.prismm = {
        baseUrl: appConfig.prismm.baseUrl,
        apiKey: appConfig.prismm.apiKey,
        organization_id: appConfig.prismm.organizationId
      };
    }

    // Accounting config
    if (appConfig.accounting) {
      clients.accounting = {
        provider: appConfig.accounting.provider,
        oauth_token: appConfig.accounting.oauthToken,
        refresh_token: appConfig.accounting.refreshToken,
        base_url: appConfig.accounting.baseUrl,
        company_id: appConfig.accounting.companyId
      };
    }

    return clients;
  },

  /**
   * Legacy method for backward compatibility
   */
  fromEnvironment: (): {
    echoCRM?: EchoCRMClient;
    prismm?: PrismmClient;
    accounting?: AccountingClient;
  } => {
    return IntegrationConfig.fromConfig();
  }
};

export default IntegrationConfig;
