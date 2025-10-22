import React, { useEffect, useState } from 'react';

/**
 * EchoRecipePro Component
 * Loads the EchoRecipePro module from Builder.io using the data API
 * Project ID: 838ccacd172b4efca3e3a9a3f3b94aba
 * Model: EchoRecipePro
 */
export default function EchoRecipeProPanel() {
  const [content, setContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_BUILDER_API_KEY || 'bwncv6np70e4e8ey0yj';
    
    // Fetch content from Builder.io data API
    const fetchContent = async () => {
      try {
        setIsLoading(true);
        console.log('[EchoRecipePro] Fetching from Builder.io...');
        
        const response = await fetch(
          `https://cdn.builder.io/api/v1/content/EchoRecipePro?query.limit=1&apiKey=${apiKey}`,
          {
            headers: {
              'Accept': 'application/json',
            }
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('[EchoRecipePro] Content fetched:', data);

        if (data.results && data.results.length > 0) {
          setContent(data.results[0]);
        } else {
          setError('No published content found');
        }
      } catch (err) {
        console.error('[EchoRecipePro] Fetch failed:', err);
        setError(`Failed to load: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, []);

  if (isLoading) {
    return (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0f172a',
        color: '#e2e8f0',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid rgba(0, 217, 255, 0.2)',
            borderTop: '3px solid rgba(0, 217, 255, 0.8)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px',
          }}>
            <style>{`
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `}</style>
          </div>
          <p>Loading EchoRecipePro...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0f172a',
        color: '#fca5a5',
        padding: '24px',
      }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>Unable to load EchoRecipePro</p>
          <p style={{ fontSize: '12px', opacity: 0.8 }}>{error}</p>
          <p style={{ fontSize: '11px', marginTop: '16px', opacity: 0.6 }}>
            Make sure the API key has access to project 838ccacd172b4efca3e3a9a3f3b94aba
          </p>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0f172a',
        color: '#b0e0ff',
      }}>
        <p>No content available</p>
      </div>
    );
  }

  // Render content based on what Builder.io returns
  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#0f172a',
      color: '#e2e8f0',
      fontFamily: 'system-ui, sans-serif',
      overflow: 'auto',
      padding: '24px',
    }}>
      <h1 style={{ marginTop: 0 }}>{content.name || 'EchoRecipePro'}</h1>
      
      {content.data && (
        <div>
          {content.data.title && <h2>{content.data.title}</h2>}
          {content.data.description && (
            <p style={{ opacity: 0.8 }}>{content.data.description}</p>
          )}
        </div>
      )}

      <div style={{
        marginTop: '24px',
        padding: '16px',
        backgroundColor: 'rgba(0, 217, 255, 0.08)',
        borderRadius: '8px',
        border: '1px solid rgba(0, 217, 255, 0.2)',
        fontSize: '12px',
        opacity: 0.7,
      }}>
        <p style={{ margin: '0 0 8px 0', fontWeight: 'bold' }}>Content loaded from Builder.io</p>
        <p style={{ margin: 0 }}>Project: 838ccacd172b4efca3e3a9a3f3b94aba</p>
      </div>
    </div>
  );
}
