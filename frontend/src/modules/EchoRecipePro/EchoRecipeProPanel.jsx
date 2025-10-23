import React, { Suspense, lazy } from 'react';

// Lazy load the Index page
const IndexPage = lazy(() => import('./pages/Index.tsx'));

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
        <IndexPage />
      </div>
    </Suspense>
  );
}
