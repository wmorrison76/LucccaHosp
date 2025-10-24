/**
 * LUCCCA | EchoCanvas Configuration
 * Manages API keys and settings for image generation
 */

const STORAGE_KEY = 'luccca_echocampas_config';

export interface EchoCanvasConfig {
  apiKey: string;
  apiProvider: 'stability-ai' | 'openai' | 'none';
  lastUpdated: string;
}

/**
 * Get current EchoCanvas configuration
 */
export function getEchoCanvasConfig(): EchoCanvasConfig {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.warn('[EchoCanvasConfig] Error reading config:', error);
  }

  return {
    apiKey: '',
    apiProvider: 'none',
    lastUpdated: new Date().toISOString(),
  };
}

/**
 * Save EchoCanvas configuration
 */
export function saveEchoCanvasConfig(config: Partial<EchoCanvasConfig>): EchoCanvasConfig {
  const current = getEchoCanvasConfig();
  const updated: EchoCanvasConfig = {
    ...current,
    ...config,
    lastUpdated: new Date().toISOString(),
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    console.log('[EchoCanvasConfig] Configuration saved');
  } catch (error) {
    console.error('[EchoCanvasConfig] Error saving config:', error);
  }

  return updated;
}

/**
 * Set Stability AI API key
 */
export function setStabilityAIKey(apiKey: string): boolean {
  try {
    if (!apiKey || apiKey.trim().length === 0) {
      console.warn('[EchoCanvasConfig] API key is empty');
      return false;
    }

    saveEchoCanvasConfig({
      apiKey: apiKey.trim(),
      apiProvider: 'stability-ai',
    });

    console.log('[EchoCanvasConfig] Stability AI key set successfully');
    return true;
  } catch (error) {
    console.error('[EchoCanvasConfig] Error setting API key:', error);
    return false;
  }
}

/**
 * Get current API key (masked for display)
 */
export function getAPIKeyDisplay(): string {
  const config = getEchoCanvasConfig();

  if (!config.apiKey || config.apiKey.length === 0) {
    return 'No API key configured';
  }

  const masked = config.apiKey.substring(0, 10) + '...' + config.apiKey.substring(config.apiKey.length - 4);
  return `${config.apiProvider.toUpperCase()}: ${masked}`;
}

/**
 * Check if API is configured
 */
export function isAPIConfigured(): boolean {
  const config = getEchoCanvasConfig();
  return config.apiKey.length > 0 && config.apiProvider !== 'none';
}

/**
 * Clear API configuration
 */
export function clearAPIKey(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    console.log('[EchoCanvasConfig] API configuration cleared');
  } catch (error) {
    console.error('[EchoCanvasConfig] Error clearing config:', error);
  }
}

/**
 * Test API connectivity
 */
export async function testAPIConnectivity(): Promise<{ success: boolean; message: string }> {
  const config = getEchoCanvasConfig();

  if (!config.apiKey) {
    return {
      success: false,
      message: 'No API key configured',
    };
  }

  if (config.apiProvider === 'stability-ai') {
    try {
      const response = await fetch('https://api.stability.ai/v1/user/account', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${config.apiKey}`,
        },
      });

      if (response.ok) {
        return {
          success: true,
          message: 'Stability AI connection successful',
        };
      }

      if (response.status === 401) {
        return {
          success: false,
          message: 'Invalid Stability AI API key',
        };
      }

      return {
        success: false,
        message: `API error: ${response.statusText}`,
      };
    } catch (error) {
      return {
        success: false,
        message: `Connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      };
    }
  }

  return {
    success: false,
    message: 'Unknown API provider',
  };
}

/**
 * Get API documentation URL
 */
export function getAPIDocumentationURL(): string {
  return 'https://platform.stability.ai/docs/api-reference#tag/v1_generation';
}

/**
 * Get API key signup URL
 */
export function getAPISignupURL(): string {
  return 'https://platform.stability.ai/sign-up';
}

/**
 * Validate API key format
 */
export function validateAPIKeyFormat(apiKey: string): { valid: boolean; message: string } {
  if (!apiKey || apiKey.trim().length === 0) {
    return {
      valid: false,
      message: 'API key cannot be empty',
    };
  }

  // Stability AI keys typically start with "sk-"
  if (apiKey.trim().startsWith('sk-')) {
    return {
      valid: true,
      message: 'API key format looks correct',
    };
  }

  return {
    valid: true, // Allow other formats, but warn
    message: 'API key format may not match Stability AI (usually starts with "sk-")',
  };
}

/**
 * Get configuration status report
 */
export function getConfigurationStatus(): {
  configured: boolean;
  provider: string;
  keyLength: number;
  lastUpdated: string;
} {
  const config = getEchoCanvasConfig();

  return {
    configured: isAPIConfigured(),
    provider: config.apiProvider,
    keyLength: config.apiKey.length,
    lastUpdated: config.lastUpdated,
  };
}
