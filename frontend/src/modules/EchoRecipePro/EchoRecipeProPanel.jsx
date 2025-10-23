import React, { Suspense, lazy } from 'react';

// Dynamically import the actual EchoRecipePro App
const EchoRecipeApp = lazy(() => 
  import('./App.tsx').catch(() => {
    console.warn('Could not load App.tsx, trying alternative imports');
    return Promise.reject(new Error('App.tsx not found'));
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
      <div style={{ width: '100%', height: '100%' }}>
        <EchoRecipeApp />
      </div>
    </Suspense>
  );
}
