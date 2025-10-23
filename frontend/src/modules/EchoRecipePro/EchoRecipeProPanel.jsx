import React, { Suspense, lazy } from 'react';

// Lazy load the main recipe panel
const RecipePanel = lazy(() => 
  import('./pages/Index.tsx').catch(err => {
    console.error('Failed to load RecipePanel:', err);
    return {
      default: () => (
        <div style={{ padding: '20px', color: '#666' }}>
          <h2>EchoRecipePro</h2>
          <p>Failed to load recipe panel</p>
        </div>
      )
    };
  })
);

export default function EchoRecipeProPanel() {
  return (
    <div style={{ width: '100%', height: '100%', overflow: 'auto' }}>
      <Suspense fallback={
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <p>Loading EchoRecipePro...</p>
        </div>
      }>
        <RecipePanel />
      </Suspense>
    </div>
  );
}
