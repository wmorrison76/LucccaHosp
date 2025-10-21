// Configuration system that works in both browser and Node.js environments

export interface AppConfig {
  weather: {
    apiKey: string;
    baseUrl: string;
  };
  echoCRM: {
    baseUrl: string;
    apiKey: string;
    webhookSecret: string;
  } | null;
  prismm: {
    baseUrl: string;
    apiKey: string;
    organizationId: string;
  } | null;
  accounting: {
    provider: 'quickbooks' | 'xero' | 'sage';
    oauthToken: string;
    refreshToken: string;
    baseUrl: string;
    companyId?: string;
  } | null;
}

// Default configuration
const defaultConfig: AppConfig = {
  weather: {
    apiKey: 'demo_key',
    baseUrl: 'https://api.openweathermap.org/data/2.5'
  },
  echoCRM: null,
  prismm: null,
  accounting: null
};

// Browser-safe environment variable access
function getEnvVar(key: string, fallback: string = ''): string {
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key] || fallback;
  }
  
  // In browser, check for Vite environment variables
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return (import.meta.env as any)[`VITE_${key}`] || fallback;
  }
  
  return fallback;
}

// Configuration loader
export function loadConfig(): AppConfig {
  const config: AppConfig = {
    weather: {
      apiKey: getEnvVar('WEATHER_API_KEY', 'demo_key'),
      baseUrl: getEnvVar('WEATHER_BASE_URL', 'https://api.openweathermap.org/data/2.5')
    },
    echoCRM: null,
    prismm: null,
    accounting: null
  };

  // Echo CRM configuration
  const echoCRMApiKey = getEnvVar('ECHO_CRM_API_KEY');
  if (echoCRMApiKey) {
    config.echoCRM = {
      baseUrl: getEnvVar('ECHO_CRM_BASE_URL', 'https://api.echo-crm.com'),
      apiKey: echoCRMApiKey,
      webhookSecret: getEnvVar('ECHO_CRM_WEBHOOK_SECRET')
    };
  }

  // Prismm configuration
  const prismmApiKey = getEnvVar('PRISMM_API_KEY');
  if (prismmApiKey) {
    config.prismm = {
      baseUrl: getEnvVar('PRISMM_BASE_URL', 'https://api.prismm.com'),
      apiKey: prismmApiKey,
      organizationId: getEnvVar('PRISMM_ORG_ID')
    };
  }

  // Accounting configuration
  const accountingProvider = getEnvVar('ACCOUNTING_PROVIDER') as 'quickbooks' | 'xero' | 'sage';
  if (accountingProvider) {
    config.accounting = {
      provider: accountingProvider,
      oauthToken: getEnvVar('ACCOUNTING_OAUTH_TOKEN'),
      refreshToken: getEnvVar('ACCOUNTING_REFRESH_TOKEN'),
      baseUrl: getEnvVar('ACCOUNTING_BASE_URL'),
      companyId: getEnvVar('ACCOUNTING_COMPANY_ID')
    };
  }

  return config;
}

// Global configuration instance
let configInstance: AppConfig | null = null;

export function getConfig(): AppConfig {
  if (!configInstance) {
    configInstance = loadConfig();
  }
  return configInstance;
}

// Force reload configuration (useful for testing)
export function reloadConfig(): AppConfig {
  configInstance = loadConfig();
  return configInstance;
}

// Configuration validation
export function validateConfig(config: AppConfig): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Weather API is required for the application to function
  if (!config.weather.apiKey || config.weather.apiKey === 'demo_key') {
    console.warn('Using demo weather API key. Set WEATHER_API_KEY for production.');
  }

  if (!config.weather.baseUrl) {
    errors.push('Weather base URL is required');
  }

  // Optional integrations - warn if partially configured
  if (config.echoCRM) {
    if (!config.echoCRM.apiKey) {
      errors.push('Echo CRM API key is required when Echo CRM is configured');
    }
    if (!config.echoCRM.baseUrl) {
      errors.push('Echo CRM base URL is required when Echo CRM is configured');
    }
  }

  if (config.prismm) {
    if (!config.prismm.apiKey) {
      errors.push('Prismm API key is required when Prismm is configured');
    }
    if (!config.prismm.organizationId) {
      errors.push('Prismm organization ID is required when Prismm is configured');
    }
  }

  if (config.accounting) {
    if (!config.accounting.oauthToken) {
      errors.push('Accounting OAuth token is required when accounting is configured');
    }
    if (!['quickbooks', 'xero', 'sage'].includes(config.accounting.provider)) {
      errors.push('Invalid accounting provider. Must be quickbooks, xero, or sage');
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

// Development helpers
export const ConfigHelpers = {
  /**
   * Get integration status for debugging
   */
  getIntegrationStatus: (): {
    weather: boolean;
    echoCRM: boolean;
    prismm: boolean;
    accounting: boolean;
  } => {
    const config = getConfig();
    return {
      weather: !!config.weather.apiKey && config.weather.apiKey !== 'demo_key',
      echoCRM: !!config.echoCRM?.apiKey,
      prismm: !!config.prismm?.apiKey,
      accounting: !!config.accounting?.oauthToken
    };
  },

  /**
   * Print configuration summary (safe for logs)
   */
  getConfigSummary: (): string => {
    const config = getConfig();
    const status = ConfigHelpers.getIntegrationStatus();
    
    return `
EchoScope Configuration:
- Weather API: ${status.weather ? '✅ Configured' : '⚠️ Using demo key'}
- Echo CRM: ${status.echoCRM ? '✅ Connected' : '❌ Not configured'}
- Prismm: ${status.prismm ? '✅ Connected' : '❌ Not configured'}  
- Accounting: ${status.accounting ? `✅ Connected (${config.accounting?.provider})` : '❌ Not configured'}
    `.trim();
  }
};

export default getConfig;
