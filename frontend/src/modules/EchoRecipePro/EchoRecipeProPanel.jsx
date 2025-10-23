import React, { Suspense, lazy } from 'react';
import { AppDataProvider } from '@/context/AppDataContext';

const IndexPage = lazy(() => import('./pages/Index.tsx'));

export default function EchoRecipeProPanel() {
  return (
    <AppDataProvider>
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
    </AppDataProvider>
  );
}
