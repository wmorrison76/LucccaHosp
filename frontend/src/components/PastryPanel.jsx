import React, { useEffect, useRef, useState, Suspense } from 'react';
import { ChefHat, Image, Cube, Paintbrush } from 'lucide-react';

// Gallery Tab Component
const GalleryTab = () => {
  const [images, setImages] = useState([
    { id: 1, src: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=300&fit=crop', alt: 'Chocolate Cake' },
    { id: 2, src: 'https://images.unsplash.com/photo-1578519603510-7cb86628853d?w=300&h=300&fit=crop', alt: 'Vanilla Cake' },
    { id: 3, src: 'https://images.unsplash.com/photo-1578527314433-a4995f42ec8f?w=300&h=300&fit=crop', alt: 'Berry Pastry' },
    { id: 4, src: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=300&fit=crop', alt: 'Wedding Cake' },
    { id: 5, src: 'https://images.unsplash.com/photo-1578519603510-7cb86628853d?w=300&h=300&fit=crop', alt: 'Layered Cake' },
    { id: 6, src: 'https://images.unsplash.com/photo-1578527314433-a4995f42ec8f?w=300&h=300&fit=crop', alt: 'Artisan Pastry' },
  ]);

  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '100%' }}>
      {/* Main Display */}
      <div style={{
        flex: 1,
        backgroundColor: 'rgba(15, 23, 42, 0.3)',
        borderRadius: '12px',
        border: '1px solid rgba(0, 217, 255, 0.2)',
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        minHeight: '300px',
      }}>
        <img
          src={selectedImage.src}
          alt={selectedImage.alt}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'cover',
            borderRadius: '8px',
            boxShadow: '0 8px 24px rgba(0, 217, 255, 0.2)',
          }}
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/300?text=Cake+Image';
          }}
        />
      </div>

      {/* Gallery Thumbnails */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
        gap: '8px',
        padding: '12px 0',
        borderTop: '1px solid rgba(0, 217, 255, 0.15)',
        maxHeight: '120px',
        overflowY: 'auto',
      }}>
        {images.map((img) => (
          <button
            key={img.id}
            onClick={() => setSelectedImage(img)}
            style={{
              padding: '4px',
              border: selectedImage.id === img.id ? '2px solid #00d9ff' : '1px solid rgba(0, 217, 255, 0.3)',
              borderRadius: '8px',
              backgroundColor: 'rgba(15, 23, 42, 0.4)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              overflow: 'hidden',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(30, 58, 138, 0.5)';
              e.currentTarget.style.borderColor = 'rgba(0, 217, 255, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.4)';
              e.currentTarget.style.borderColor = selectedImage.id === img.id ? '2px solid #00d9ff' : '1px solid rgba(0, 217, 255, 0.3)';
            }}
          >
            <img
              src={img.src}
              alt={img.alt}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/80?text=IMG';
              }}
            />
          </button>
        ))}
      </div>

      {/* Image Info */}
      <div style={{
        padding: '12px',
        backgroundColor: 'rgba(30, 41, 59, 0.4)',
        borderRadius: '8px',
        fontSize: '12px',
        color: '#cbd5e1',
        textAlign: 'center',
      }}>
        {selectedImage.alt}
      </div>
    </div>
  );
};

// 3D Cake Renderer Component
const Cake3DTab = () => {
  const containerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cakeRotation, setCakeRotation] = useState(0);
  const [cakeScale, setCakeScale] = useState(1);

  useEffect(() => {
    // Simulate loading Three.js
    setIsLoading(false);
  }, []);

  const rotateCake = () => {
    setCakeRotation((prev) => (prev + 45) % 360);
  };

  const scaleCake = (direction) => {
    setCakeScale((prev) => {
      const newScale = direction === 'up' ? prev + 0.2 : prev - 0.2;
      return Math.max(0.5, Math.min(2, newScale));
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', height: '100%' }}>
      {/* 3D Viewer */}
      <div
        ref={containerRef}
        style={{
          flex: 1,
          backgroundColor: 'rgba(15, 23, 42, 0.5)',
          borderRadius: '12px',
          border: '1px solid rgba(0, 217, 255, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          position: 'relative',
          minHeight: '300px',
        }}
      >
        {/* Placeholder 3D Cake Representation */}
        <div
          style={{
            width: '120px',
            height: '160px',
            backgroundColor: '#d4661e',
            borderRadius: '50% 50% 40% 40%',
            position: 'relative',
            boxShadow: `0 20px 40px rgba(212, 102, 30, 0.5)`,
            transform: `rotateY(${cakeRotation}deg) scale(${cakeScale})`,
            transition: 'transform 0.6s ease',
          }}
        >
          {/* Frosting layers */}
          <div style={{
            position: 'absolute',
            top: '20px',
            left: '10px',
            right: '10px',
            height: '30px',
            backgroundColor: '#f59e0b',
            borderRadius: '50%',
            opacity: 0.8,
          }} />
          <div style={{
            position: 'absolute',
            top: '50px',
            left: '5px',
            right: '5px',
            height: '35px',
            backgroundColor: '#d97706',
            borderRadius: '50%',
            opacity: 0.7,
          }} />
          <div style={{
            position: 'absolute',
            top: '85px',
            left: '0',
            right: '0',
            height: '40px',
            backgroundColor: '#b45309',
            borderRadius: '40% 40% 50% 50%',
            opacity: 0.6,
          }} />
        </div>
      </div>

      {/* Controls */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '8px',
        padding: '12px',
        backgroundColor: 'rgba(30, 41, 59, 0.4)',
        borderRadius: '8px',
      }}>
        <button
          onClick={rotateCake}
          style={{
            padding: '10px 12px',
            backgroundColor: 'rgba(0, 217, 255, 0.15)',
            border: '1px solid rgba(0, 217, 255, 0.3)',
            borderRadius: '8px',
            color: '#7ff3ff',
            fontSize: '12px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(0, 217, 255, 0.25)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 217, 255, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(0, 217, 255, 0.15)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          🔄 Rotate
        </button>

        <div style={{ display: 'flex', gap: '4px' }}>
          <button
            onClick={() => scaleCake('down')}
            style={{
              flex: 1,
              padding: '10px 8px',
              backgroundColor: 'rgba(0, 217, 255, 0.15)',
              border: '1px solid rgba(0, 217, 255, 0.3)',
              borderRadius: '8px',
              color: '#7ff3ff',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0, 217, 255, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0, 217, 255, 0.15)';
            }}
          >
            -
          </button>
          <button
            onClick={() => scaleCake('up')}
            style={{
              flex: 1,
              padding: '10px 8px',
              backgroundColor: 'rgba(0, 217, 255, 0.15)',
              border: '1px solid rgba(0, 217, 255, 0.3)',
              borderRadius: '8px',
              color: '#7ff3ff',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0, 217, 255, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0, 217, 255, 0.15)';
            }}
          >
            +
          </button>
        </div>
      </div>

      {/* Scale Display */}
      <div style={{
        padding: '8px 12px',
        backgroundColor: 'rgba(15, 23, 42, 0.3)',
        borderRadius: '8px',
        fontSize: '12px',
        color: '#cbd5e1',
        textAlign: 'center',
      }}>
        Scale: {cakeScale.toFixed(1)}x
      </div>
    </div>
  );
};

// Echo Canvas Studio Component
const CanvasStudioTab = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#00d9ff');
  const [brushSize, setBrushSize] = useState(5);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');

    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', height: '100%' }}>
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        width={400}
        height={300}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        style={{
          flex: 1,
          backgroundColor: '#0f172a',
          borderRadius: '12px',
          border: '1px solid rgba(0, 217, 255, 0.2)',
          cursor: 'crosshair',
          maxHeight: '350px',
        }}
      />

      {/* Controls */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '8px',
        padding: '12px',
        backgroundColor: 'rgba(30, 41, 59, 0.4)',
        borderRadius: '8px',
      }}>
        <div>
          <label style={{ fontSize: '11px', color: '#7ff3ff', display: 'block', marginBottom: '4px' }}>
            Color
          </label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            style={{
              width: '100%',
              height: '32px',
              borderRadius: '6px',
              border: '1px solid rgba(0, 217, 255, 0.3)',
              cursor: 'pointer',
            }}
          />
        </div>

        <div>
          <label style={{ fontSize: '11px', color: '#7ff3ff', display: 'block', marginBottom: '4px' }}>
            Brush: {brushSize}px
          </label>
          <input
            type="range"
            min="1"
            max="20"
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            style={{
              width: '100%',
              cursor: 'pointer',
            }}
          />
        </div>

        <button
          onClick={clearCanvas}
          style={{
            padding: '10px',
            backgroundColor: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '6px',
            color: '#fca5a5',
            fontSize: '11px',
            fontWeight: '600',
            cursor: 'pointer',
            alignSelf: 'flex-end',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.25)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.15)';
          }}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

// Main Pastry Panel with Tabs
export default function PastryPanel() {
  const [activeTab, setActiveTab] = useState('gallery');

  const tabs = [
    { id: 'gallery', label: 'Gallery', icon: Image },
    { id: 'cake3d', label: '3D Cake', icon: Cube },
    { id: 'canvas', label: 'Canvas Studio', icon: Paintbrush },
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        backgroundColor: '#0f172a',
        color: '#e2e8f0',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      {/* Header */}
      <div style={{
        padding: '20px 24px',
        borderBottom: '1px solid rgba(0, 217, 255, 0.15)',
        backgroundColor: 'rgba(10, 20, 35, 0.6)',
      }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 12px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ChefHat size={28} style={{ color: '#00d9ff' }} />
          Baking & Pastry
        </h2>
        <p style={{ margin: 0, fontSize: '12px', color: '#cbd5e1', opacity: 0.7 }}>
          Explore recipes, 3D designs, and create custom decorations
        </p>
      </div>

      {/* Tab Navigation */}
      <div style={{
        display: 'flex',
        gap: '4px',
        padding: '12px 16px',
        backgroundColor: 'rgba(10, 20, 35, 0.4)',
        borderBottom: '1px solid rgba(0, 217, 255, 0.1)',
        overflowX: 'auto',
      }}>
        {tabs.map((tab) => {
          const TabIcon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '8px',
                border: activeTab === tab.id ? '1px solid rgba(0, 217, 255, 0.5)' : '1px solid rgba(0, 217, 255, 0.15)',
                backgroundColor: activeTab === tab.id ? 'rgba(0, 217, 255, 0.15)' : 'transparent',
                color: activeTab === tab.id ? '#00ffff' : '#b0e0ff',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
                textTransform: 'uppercase',
              }}
              onMouseEnter={(e) => {
                if (activeTab !== tab.id) {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 217, 255, 0.08)';
                  e.currentTarget.style.borderColor = 'rgba(0, 217, 255, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab.id) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderColor = 'rgba(0, 217, 255, 0.15)';
                }
              }}
            >
              <TabIcon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div style={{
        flex: 1,
        padding: '20px 24px',
        overflowY: 'auto',
        overflowX: 'hidden',
      }}>
        {activeTab === 'gallery' && <GalleryTab />}
        {activeTab === 'cake3d' && <Cake3DTab />}
        {activeTab === 'canvas' && <CanvasStudioTab />}
      </div>
    </div>
  );
}
