import React, { Suspense } from 'react';
import EchoRecipeProContent from '../../modules/EchoRecipePro/EchoRecipeProPanel.jsx';

export default function EchoRecipeProPanel() {
  return (
    <Suspense fallback={
      <div style={{ padding: '20px', textAlign: 'center', color: '#999' }}>
        Loading EchoRecipePro...
      </div>
    }>
      <EchoRecipeProContent />
    </Suspense>
  );
}
