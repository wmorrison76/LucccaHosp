import React, { useEffect, useState } from 'react';

export default function CulinaryPanel() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    console.log('[Culinary] Component mounted');
    
    // Try to fetch from Builder.io API instead of loading external script
    const fetchCulinaryContent = async () => {
      try {
        const apiKey = import.meta.env.VITE_BUILDER_API_KEY || 'bwncv6np70e4e8ey0yj';
        
        console.log('[Culinary] Fetching content from Builder.io API...');
        const response = await fetch(
          `https://cdn.builder.io/api/v1/content/Culinary?limit=10&apiKey=${apiKey}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error(`API returned ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('[Culinary] Content fetched:', data);

        if (data.results && Array.isArray(data.results)) {
          setRecipes(data.results);
        }
        setIsLoading(false);
      } catch (err) {
        console.error('[Culinary] Failed to fetch content:', err.message);
        setLoadError(err.message);
        setIsLoading(false);
        
        // Load placeholder content
        setRecipes([
          { name: 'Loading failed - using sample recipes' },
        ]);
      }
    };

    fetchCulinaryContent();
  }, []);

  if (loadError && recipes.length === 0) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#0f172a',
        color: '#e2e8f0',
        fontFamily: 'system-ui, sans-serif',
        height: '100%',
        padding: '24px',
      }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 16px 0' }}>
          Culinary Library
        </h2>
        
        <div style={{
          padding: '16px',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          borderRadius: '8px',
          border: '1px solid rgba(239, 68, 68, 0.5)',
          color: '#fca5a5',
        }}>
          <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Unable to load from Builder.io</div>
          <div style={{ fontSize: '12px', marginBottom: '12px', whiteSpace: 'pre-wrap' }}>
            {loadError}
          </div>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '8px 16px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px',
            }}
          >
            Try Again
          </button>
        </div>

        {/* Fallback Content */}
        <div style={{
          marginTop: '24px',
          flex: 1,
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '16px',
        }}>
          {[
            { icon: '🍽️', title: 'Recipes', desc: 'Browse recipes' },
            { icon: '👨‍🍳', title: 'Techniques', desc: 'Cooking methods' },
            { icon: '🌶️', title: 'Ingredients', desc: 'Ingredient library' },
            { icon: '📋', title: 'Menu Planning', desc: 'Create menus' },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                padding: '16px',
                backgroundColor: 'rgba(30, 58, 138, 0.2)',
                borderRadius: '8px',
                border: '1px solid rgba(148, 163, 184, 0.15)',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{item.icon}</div>
              <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>{item.title}</div>
              <div style={{ fontSize: '10px', opacity: 0.7 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#0f172a',
      color: '#e2e8f0',
      fontFamily: 'system-ui, sans-serif',
      height: '100%',
      padding: '24px',
      overflow: 'auto',
    }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 16px 0' }}>
        Culinary Library
      </h2>

      {isLoading ? (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '400px',
          opacity: 0.7,
        }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '14px', margin: '0 0 16px 0' }}>Loading Culinary Content...</p>
            <div style={{
              width: '40px',
              height: '40px',
              border: '3px solid rgba(0, 217, 255, 0.2)',
              borderTop: '3px solid rgba(0, 217, 255, 0.8)',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto',
            }}>
              <style>{`
                @keyframes spin {
                  to { transform: rotate(360deg); }
                }
              `}</style>
            </div>
          </div>
        </div>
      ) : (
        <>
          {recipes.length > 0 ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '16px',
            }}>
              {recipes.map((recipe, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '16px',
                    backgroundColor: 'rgba(30, 41, 59, 0.5)',
                    borderRadius: '8px',
                    border: '1px solid rgba(148, 163, 184, 0.2)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(30, 58, 138, 0.3)';
                    e.currentTarget.style.borderColor = 'rgba(0, 217, 255, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(30, 41, 59, 0.5)';
                    e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.2)';
                  }}
                >
                  <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '8px' }}>
                    {recipe.name || `Recipe ${idx + 1}`}
                  </div>
                  <div style={{ fontSize: '11px', opacity: 0.7, lineHeight: '1.4' }}>
                    {recipe.data?.description || 'Culinary recipe'}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{
              padding: '24px',
              textAlign: 'center',
              opacity: 0.7,
              minHeight: '400px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div>
                <p style={{ fontSize: '14px', margin: '0 0 16px 0' }}>No recipes found</p>
                <p style={{ fontSize: '12px', opacity: 0.6 }}>Try adding recipes in Builder.io</p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
