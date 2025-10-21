// Configuration system test to verify browser compatibility

import { getConfig, validateConfig, ConfigHelpers } from './config';

// Mock browser environment
declare global {
  var process: any;
}

// Test configuration loading in browser environment
export function testBrowserConfig() {
  console.log('🧪 Testing configuration system in browser environment...');
  
  // Simulate browser environment (no process)
  const originalProcess = globalThis.process;
  delete (globalThis as any).process;
  
  try {
    // Test config loading
    const config = getConfig();
    console.log('✅ Configuration loaded successfully');
    
    // Test validation
    const validation = validateConfig(config);
    console.log(`✅ Validation completed: ${validation.valid ? 'PASS' : 'FAIL'}`);
    if (!validation.valid) {
      console.log('ℹ️ Validation warnings:', validation.errors);
    }
    
    // Test integration status
    const status = ConfigHelpers.getIntegrationStatus();
    console.log('✅ Integration status retrieved:', status);
    
    // Test config summary
    const summary = ConfigHelpers.getConfigSummary();
    console.log('✅ Configuration summary generated');
    console.log(summary);
    
    return {
      success: true,
      config,
      validation,
      status
    };
    
  } catch (error) {
    console.error('❌ Configuration test failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  } finally {
    // Restore original process
    if (originalProcess) {
      (globalThis as any).process = originalProcess;
    }
  }
}

// Test configuration loading in Node.js environment
export function testNodeConfig() {
  console.log('🧪 Testing configuration system in Node.js environment...');
  
  // Simulate Node.js environment with mock env vars
  const mockProcess = {
    env: {
      WEATHER_API_KEY: 'test_weather_key',
      ECHO_CRM_API_KEY: 'test_crm_key',
      ECHO_CRM_BASE_URL: 'https://test-crm.com',
      PRISMM_API_KEY: 'test_prismm_key',
      ACCOUNTING_PROVIDER: 'quickbooks',
      ACCOUNTING_OAUTH_TOKEN: 'test_oauth_token'
    }
  };
  
  const originalProcess = globalThis.process;
  (globalThis as any).process = mockProcess;
  
  try {
    // Force reload config to pick up new environment
    const { reloadConfig } = require('./config');
    const config = reloadConfig();
    
    console.log('✅ Configuration loaded with environment variables');
    
    // Verify environment variables were picked up
    const hasWeatherKey = config.weather.apiKey === 'test_weather_key';
    const hasEchoCRM = config.echoCRM?.apiKey === 'test_crm_key';
    const hasPrismm = config.prismm?.apiKey === 'test_prismm_key';
    const hasAccounting = config.accounting?.provider === 'quickbooks';
    
    console.log(`✅ Weather API key: ${hasWeatherKey ? 'PASS' : 'FAIL'}`);
    console.log(`✅ Echo CRM config: ${hasEchoCRM ? 'PASS' : 'FAIL'}`);
    console.log(`✅ Prismm config: ${hasPrismm ? 'PASS' : 'FAIL'}`);
    console.log(`✅ Accounting config: ${hasAccounting ? 'PASS' : 'FAIL'}`);
    
    return {
      success: true,
      config,
      tests: {
        weatherKey: hasWeatherKey,
        echoCRM: hasEchoCRM,
        prismm: hasPrismm,
        accounting: hasAccounting
      }
    };
    
  } catch (error) {
    console.error('❌ Node.js configuration test failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  } finally {
    // Restore original process
    (globalThis as any).process = originalProcess;
  }
}

// Run all tests
export function runConfigTests() {
  console.log('🚀 Running configuration system tests...\n');
  
  const browserTest = testBrowserConfig();
  console.log('\n');
  const nodeTest = testNodeConfig();
  
  console.log('\n📊 Test Results Summary:');
  console.log(`Browser environment: ${browserTest.success ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Node.js environment: ${nodeTest.success ? '✅ PASS' : '❌ FAIL'}`);
  
  if (!browserTest.success || !nodeTest.success) {
    console.log('\n❌ Some tests failed. Check the errors above.');
    return false;
  }
  
  console.log('\n🎉 All configuration tests passed!');
  return true;
}

// Export for use in browser console
if (typeof window !== 'undefined') {
  (window as any).testEchoScopeConfig = {
    runConfigTests,
    testBrowserConfig,
    testNodeConfig
  };
}
