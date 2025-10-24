/**
 * LUCCCA | CakeBuilder Tab Wrapper
 * Bridges the new CakeBuilder module into PastryLibrary tabs
 */

import React from 'react';

// Lazy load the CakeBuilder module
const CakeBuilderPage = React.lazy(() =>
  import('../../modules/PastryLibrary/CakeBuilder/CakeBuilderPage.tsx')
    .then(m => ({ default: m.CakeBuilderPage }))
    .catch(err => {
      console.error('[CakeBuilderTab] Failed to load CakeBuilder:', err);
      return { default: () => <ErrorFallback /> };
    })
);

function ErrorFallback() {
  return (
    <div style={{ padding: '2rem', color: '#f87171' }}>
      <h3>Failed to load CakeBuilder</h3>
      <p>There was an error loading the CakeBuilder module. Please refresh and try again.</p>
      <pre style={{ fontSize: '12px', marginTop: '1rem', opacity: 0.7 }}>
        Check browser console for details
      </pre>
    </div>
  );
}

export default function CakeBuilderTab() {
  return (
    <React.Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center', color: '#999' }}>Loading CakeBuilder...</div>}>
      <CakeBuilderPage />
    </React.Suspense>
  );
}
