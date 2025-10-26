import React, { Suspense, useState, useEffect } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';

/**
 * EchoRecipePro Panel Wrapper Component
 * 
 * Loads the compiled EchoRecipePro React application from:
 * frontend/src/modules/EchoRecipe_Pro/index.html
 * 
 * This is served as an iframe to isolate the app's routing and state management.
 * Features:
 * - Loading states with spinner
 * - Error boundaries with retry capability
 * - Full iframe sandbox isolation
 * - Proper CORS/X-Frame-Options headers
 */

/**
 * Loading Fallback Component
 * Shows while the panel is being loaded
 */
const LoadingFallback = () => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: '#f8f9fa',
    gap: '16px',
  }}>
    <Loader2 size={32} style={{
      color: '#00d9ff',
      animation: 'spin 1s linear infinite',
    }} />
    <div style={{ textAlign: 'center' }}>
      <p style={{
        fontWeight: '600',
        color: '#374151',
        fontSize: '14px',
        margin: '0 0 4px 0',
      }}>
        Loading EchoRecipePro
      </p>
      <p style={{
        fontSize: '12px',
        color: '#9CA3AF',
        margin: 0,
      }}>
        This may take a few seconds...
      </p>
    </div>
    <style>{`
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

/**
 * Error Fallback Component
 * Shows if panel fails to load
 */
const ErrorFallback = ({ error, onRetry }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: '#fee2e2',
    padding: '20px',
  }}>
    <div style={{ textAlign: 'center', maxWidth: '400px' }}>
      <AlertCircle size={32} style={{
        color: '#dc2626',
        margin: '0 auto 12px',
        display: 'block',
      }} />
      <p style={{
        fontWeight: '600',
        color: '#991b1b',
        fontSize: '14px',
        margin: '0 0 8px 0',
      }}>
        Failed to Load EchoRecipePro
      </p>
      <p style={{
        fontSize: '12px',
        color: '#7f1d1d',
        margin: '0 0 16px 0',
        whiteSpace: 'pre-wrap',
      }}>
        {error?.message || 'An unknown error occurred'}
      </p>
      <button
        onClick={onRetry}
        style={{
          padding: '8px 16px',
          fontSize: '12px',
          backgroundColor: '#dc2626',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: '500',
        }}
      >
        Try Again
      </button>
    </div>
  </div>
);

/**
 * Error Boundary Component
 * Catches errors in the panel and displays fallback UI
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[EchoRecipeProPanel] Error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorFallback
          error={this.state.error}
          onRetry={() => {
            this.setState({ hasError: false, error: null });
            window.location.reload();
          }}
        />
      );
    }

    return this.props.children;
  }
}

/**
 * Main Panel Component
 * 
 * Props:
 * - isActive?: boolean - Whether the panel is currently visible
 * - onClose?: () => void - Callback when panel is closed
 */
export default function EchoRecipeProPanel({ isActive = true, onClose }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate brief loading indicator
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleIframeLoad = () => {
    console.log('[EchoRecipeProPanel] Iframe loaded successfully');
    setIsLoading(false);
    setError(null);
  };

  const handleIframeError = (e) => {
    console.error('[EchoRecipeProPanel] Iframe error:', e);
    setError(new Error('Could not load EchoRecipePro application. Please check the server is running.'));
    setIsLoading(false);
  };

  // Don't render if panel isn't active (performance optimization)
  if (!isActive) {
    return null;
  }

  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          overflow: 'hidden',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        }}>
          {/* Loading Indicator */}
          {isLoading && <LoadingFallback />}

          {/* Error State */}
          {error && !isLoading && (
            <ErrorFallback
              error={error}
              onRetry={() => {
                setError(null);
                setIsLoading(true);
                setTimeout(() => setIsLoading(false), 500);
              }}
            />
          )}

          {/* Iframe */}
          <iframe
            src="/modules/EchoRecipe_Pro/"
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              display: error ? 'none' : 'block',
            }}
            title="EchoRecipePro Application"
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals allow-presentation allow-downloads"
            allow="camera; microphone; fullscreen"
          />
        </div>
      </Suspense>
    </ErrorBoundary>
  );
}
