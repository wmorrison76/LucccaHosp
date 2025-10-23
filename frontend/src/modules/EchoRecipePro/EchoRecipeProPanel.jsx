import React, { Suspense, lazy } from 'react';

const EchoRecipeApp = lazy(() => 
  import('./pages/Index').then(module => ({ 
    default: module.default || module.Index 
  })).catch(err => {
    console.error('Failed to load EchoRecipePro app:', err);
    return import('./App').catch(() => ({
      default: () => <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>Loading EchoRecipePro...</p>
      </div>
    }));
  })
);

export default function EchoRecipeProPanel() {
  return (
    <Suspense fallback={
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '16px',
        color: '#666'
      }}>
        🍳 Loading EchoRecipePro...
      </div>
    }>
      <EchoRecipeApp />
    </Suspense>
  );
}
