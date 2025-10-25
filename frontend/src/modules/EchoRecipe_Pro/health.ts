// Health Check Endpoint for Production Monitoring
// Used by uptime monitors and load balancers to verify service health

import type { Request, Response } from 'express';

export interface HealthCheckResponse {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: number;
  uptime: number;
  version: string;
  checks: {
    database: {
      status: 'up' | 'down';
      latency?: number;
      error?: string;
    };
    cache: {
      status: 'up' | 'down';
      latency?: number;
      error?: string;
    };
    external_apis: {
      status: 'up' | 'down';
      errors?: Record<string, string>;
    };
  };
  environment: {
    node_version: string;
    environment: string;
    memory_usage: {
      heap_used: number;
      heap_total: number;
      external: number;
      rss: number;
    };
  };
}

const startTime = Date.now();

/**
 * Health check endpoint
 * GET /api/health
 */
export async function healthCheck(req: Request, res: Response) {
  const checks: HealthCheckResponse['checks'] = {
    database: { status: 'up' },
    cache: { status: 'up' },
    external_apis: { status: 'up', errors: {} },
  };

  let overallStatus: 'healthy' | 'degraded' | 'unhealthy' = 'healthy';

  // Check Database
  try {
    const dbStart = Date.now();
    // Add your database health check logic here
    const dbLatency = Date.now() - dbStart;

    if (dbLatency > 5000) {
      checks.database.status = 'down';
      checks.database.error = 'Database query timeout';
      overallStatus = 'degraded';
    } else {
      checks.database.latency = dbLatency;
    }
  } catch (error) {
    checks.database.status = 'down';
    checks.database.error = String(error);
    overallStatus = 'unhealthy';
  }

  // Check Cache
  try {
    const cacheStart = Date.now();
    // Add your cache health check logic here
    const cacheLatency = Date.now() - cacheStart;

    if (cacheLatency > 1000) {
      checks.cache.status = 'down';
      checks.cache.error = 'Cache response timeout';
      overallStatus = overallStatus === 'unhealthy' ? 'unhealthy' : 'degraded';
    } else {
      checks.cache.latency = cacheLatency;
    }
  } catch (error) {
    // Cache is optional, don't mark as unhealthy
    checks.cache.status = 'down';
    checks.cache.error = String(error);
  }

  // Check External APIs
  const apiChecks = await Promise.allSettled([
    checkExternalAPI('USDA', 'https://fdc.nal.usda.gov/api/foods/search?query=apple&api_key=test'),
    checkExternalAPI('Supabase', process.env.VITE_SUPABASE_URL || ''),
  ]);

  for (const result of apiChecks) {
    if (result.status === 'rejected') {
      const { api, error } = result.reason;
      checks.external_apis.errors![api] = error;
      if (!checks.external_apis.errors![api].includes('optional')) {
        overallStatus = 'degraded';
      }
    }
  }

  // Memory usage
  const memUsage = process.memoryUsage();
  const heapUsagePercent = (memUsage.heapUsed / memUsage.heapTotal) * 100;

  if (heapUsagePercent > 90) {
    overallStatus = overallStatus === 'healthy' ? 'degraded' : overallStatus;
  }

  const response: HealthCheckResponse = {
    status: overallStatus,
    timestamp: Date.now(),
    uptime: Date.now() - startTime,
    version: process.env.VITE_APP_VERSION || '1.0.0',
    checks,
    environment: {
      node_version: process.version,
      environment: process.env.NODE_ENV || 'production',
      memory_usage: {
        heap_used: Math.round(memUsage.heapUsed / 1024 / 1024),
        heap_total: Math.round(memUsage.heapTotal / 1024 / 1024),
        external: Math.round(memUsage.external / 1024 / 1024),
        rss: Math.round(memUsage.rss / 1024 / 1024),
      },
    },
  };

  const statusCode = overallStatus === 'healthy' ? 200 : overallStatus === 'degraded' ? 503 : 500;

  res.status(statusCode).json(response);
}

/**
 * Liveness probe
 * GET /api/health/live
 * Fast check - just confirms the process is running
 */
export async function liveness(req: Request, res: Response) {
  res.status(200).json({
    status: 'alive',
    timestamp: Date.now(),
  });
}

/**
 * Readiness probe
 * GET /api/health/ready
 * Checks if the service is ready to handle requests
 */
export async function readiness(req: Request, res: Response) {
  try {
    // Quick database check
    const isReady = true; // Add your readiness check logic

    if (isReady) {
      res.status(200).json({
        status: 'ready',
        timestamp: Date.now(),
      });
    } else {
      res.status(503).json({
        status: 'not_ready',
        timestamp: Date.now(),
      });
    }
  } catch (error) {
    res.status(503).json({
      status: 'not_ready',
      error: String(error),
      timestamp: Date.now(),
    });
  }
}

/**
 * Check external API availability
 */
async function checkExternalAPI(
  apiName: string,
  endpoint: string,
  timeout = 5000
): Promise<{ api: string; latency: number }> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject({
        api: apiName,
        error: `${apiName} API timeout (${timeout}ms)`,
      });
    }, timeout);

    const start = Date.now();

    fetch(endpoint, { method: 'HEAD', signal: AbortSignal.timeout(timeout) })
      .then(() => {
        clearTimeout(timer);
        resolve({
          api: apiName,
          latency: Date.now() - start,
        });
      })
      .catch(() => {
        clearTimeout(timer);
        reject({
          api: apiName,
          error: `${apiName} API unavailable`,
        });
      });
  });
}

/**
 * Metrics endpoint for Prometheus/monitoring tools
 * GET /api/health/metrics
 */
export async function metrics(req: Request, res: Response) {
  const memUsage = process.memoryUsage();

  const metricsOutput = `
# HELP nodejs_process_uptime_seconds Time the process has been running
# TYPE nodejs_process_uptime_seconds gauge
nodejs_process_uptime_seconds ${(Date.now() - startTime) / 1000}

# HELP nodejs_heap_size_used_bytes Current heap usage in bytes
# TYPE nodejs_heap_size_used_bytes gauge
nodejs_heap_size_used_bytes ${memUsage.heapUsed}

# HELP nodejs_heap_size_total_bytes Total heap size
# TYPE nodejs_heap_size_total_bytes gauge
nodejs_heap_size_total_bytes ${memUsage.heapTotal}

# HELP nodejs_external_memory_bytes External memory usage
# TYPE nodejs_external_memory_bytes gauge
nodejs_external_memory_bytes ${memUsage.external}

# HELP nodejs_rss_bytes Resident set size
# TYPE nodejs_rss_bytes gauge
nodejs_rss_bytes ${memUsage.rss}
  `.trim();

  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.status(200).send(metricsOutput);
}
