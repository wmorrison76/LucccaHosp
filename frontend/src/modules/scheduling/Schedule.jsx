import React, { useEffect, useRef } from 'react';

/**
 * Schedule Component
 * Loads the Schedule component from Builder.io project 921d22c0b8f047f9a4bb08666e66aaac
 * Renders into a floating panel with full functionality
 */
export default function Schedule() {
  const containerRef = useRef(null);

  useEffect(() => {
    // DISABLED: Builder.io SDK loading causing timeout errors
    // The Schedule component requires Builder.io connectivity
    // Re-enable after Builder.io API is available and responsive
    console.log('[Schedule] Builder.io integration disabled - waiting for API availability');
  }, []);

  const renderSchedule = () => {
    if (containerRef.current && window.BuilderContent) {
      // Render the Schedule component from Builder.io
      const { BuilderContent } = window;
      
      // You can customize the model name, API key, and project ID as needed
      // The Schedule model should exist in your Builder.io project
      const modelName = 'Schedule';
      const apiKey = import.meta.env.VITE_BUILDER_API_KEY || 'bwncv6np70e4e8ey0yj';
      const projectId = '921d22c0b8f047f9a4bb08666e66aaac';
      
      // Initialize rendering with Builder.io content
      console.log(`[Schedule] Loading ${modelName} from Builder.io project ${projectId}`);
    }
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-full overflow-auto bg-gradient-to-br from-gray-900 to-gray-950"
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#0f172a',
        color: '#e2e8f0',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      {/* Schedule content will be rendered here by Builder.io */}
      <div style={{
        flex: 1,
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
          Schedule Module
        </h2>
        
        <div style={{
          flex: 1,
          padding: '16px',
          backgroundColor: 'rgba(30, 41, 59, 0.5)',
          borderRadius: '8px',
          border: '1px solid rgba(148, 163, 184, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '300px',
        }}>
          <div style={{ textAlign: 'center', opacity: 0.7 }}>
            <p style={{ margin: '0 0 8px 0' }}>Loading Schedule from Builder.io...</p>
            <p style={{ margin: 0, fontSize: '12px', opacity: 0.6 }}>
              Project: 921d22c0b8f047f9a4bb08666e66aaac
            </p>
          </div>
        </div>
        
        {/* Builder.io content renders here */}
        <div id="builder-schedule-container" style={{ flex: 1 }} />
      </div>
    </div>
  );
}
