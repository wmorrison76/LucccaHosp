/**
 * LUCCCA | CakeBuilder
 * 3D cake visualization and design system
 * Integrates CakeDesigner_Patch_CD01_CD10 with professional pastry specifications
 */

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { CakeIntakeData, CakeDesign, CakeCalculation } from './types';
import { calculateCakeSpecs } from './CakeSizeCalculator';

// Import from extracted CakeDesigner components (same directory level)
import { OrbitControls } from '../../../CakeDesigner_Patch_CD01_CD10/src/useOrbitControls';
import { CameraRig } from '../../../CakeDesigner_Patch_CD01_CD10/src/CameraRig';
import { AutoRotateController } from '../../../CakeDesigner_Patch_CD01_CD10/src/AutoRotateController';

interface CakeBuilderProps {
  cakeData: CakeIntakeData;
  onExport?: (design: CakeDesign) => void;
  onClose?: () => void;
}

/**
 * Main cake mesh with layers, texture, and rotation
 */
const CakeMesh: React.FC<{
  autoRotate: boolean;
  cakeData: CakeIntakeData;
  calculations: CakeCalculation;
  onExport?: (imageData: string) => void;
}> = ({ autoRotate, cakeData, calculations, onExport }) => {
  const meshRef = useRef<THREE.Group>(null!);
  const controllerRef = useRef(new AutoRotateController(null, 0.01));

  useFrame(() => {
    controllerRef.current.tick();
  });

  useEffect(() => {
    if (meshRef.current) {
      controllerRef.current.setTarget(meshRef.current);
      controllerRef.current.toggle(autoRotate);
    }
  }, [autoRotate]);

  // Calculate cake layer dimensions
  const cakeDiameter = calculations.cakeDiameter;
  const layerHeight = 2; // inches, standard baked layer
  const layerCount = calculations.cakeLayers;
  const totalHeight = layerHeight * layerCount;

  // Convert icing color from hex to THREE.Color
  const icingColor = new THREE.Color(cakeData.icingColor);
  const icingColorString = cakeData.icingColor;

  // Create cake layers (stacked cylinders)
  const layers = Array.from({ length: layerCount }, (_, i) => {
    const yPosition = (i - (layerCount - 1) / 2) * layerHeight;
    return (
      <group key={`layer-${i}`} position={[0, yPosition, 0]}>
        {/* Main cake layer */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[cakeDiameter / 2, cakeDiameter / 2, layerHeight * 0.9, 64]} />
          <meshStandardMaterial
            color={icingColor}
            roughness={0.4}
            metallic={0}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Filling layer (slightly darker) */}
        {i < layerCount - 1 && (
          <mesh position={[0, layerHeight * 0.45, 0]}>
            <cylinderGeometry args={[cakeDiameter / 2, cakeDiameter / 2, 0.1, 64]} />
            <meshStandardMaterial
              color={new THREE.Color(cakeData.mainFlavor === 'chocolate' ? '#8B4513' : '#D4A574')}
              roughness={0.8}
              metallic={0}
            />
          </mesh>
        )}
      </group>
    );
  });

  return (
    <group ref={meshRef}>
      {/* Cake layers */}
      {layers}

      {/* Cake board/base */}
      <mesh position={[0, -(totalHeight / 2 + 0.2), 0]} receiveShadow>
        <cylinderGeometry args={[cakeDiameter / 2 + 0.5, cakeDiameter / 2 + 0.5, 0.2, 64]} />
        <meshStandardMaterial color="#D3D3D3" roughness={0.5} />
      </mesh>

      {/* Piping/decoration rings (if using frosting) */}
      {cakeData.icingType === 'frosting' &&
        Array.from({ length: layerCount }).map((_, i) => (
          <group key={`piping-${i}`} position={[0, (i - (layerCount - 1) / 2) * layerHeight + layerHeight * 0.45, 0]}>
            {/* Top border piping */}
            <mesh>
              <torusGeometry args={[cakeDiameter / 2 + 0.1, 0.15, 16, 64]} />
              <meshStandardMaterial color={icingColor} roughness={0.3} />
            </mesh>
          </group>
        ))}

      {/* Fondant cover (if selected) */}
      {cakeData.icingType === 'fondant' && (
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[cakeDiameter / 2 + 0.1, cakeDiameter / 2 + 0.1, totalHeight + 0.1, 64]} />
          <meshStandardMaterial
            color={icingColor}
            roughness={0.1}
            metallic={0.1}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  );
};

/**
 * Camera initialization
 */
const RigInit: React.FC = () => {
  const { camera } = useThree();
  useEffect(() => {
    const rig = new CameraRig(camera as THREE.PerspectiveCamera);
    rig.goTo('iso', 10);
  }, [camera]);
  return null;
};

/**
 * Main CakeBuilder Component
 */
export const CakeBuilder: React.FC<CakeBuilderProps> = ({ cakeData, onExport, onClose }) => {
  const [autoRotate, setAutoRotate] = useState(true);
  const [showOverhead, setShowOverhead] = useState(false);
  const [cameraView, setCameraView] = useState<'iso' | 'front' | 'overhead'>('iso');
  const canvasRef = useRef<HTMLDivElement>(null);

  const calculations = calculateCakeSpecs(cakeData.guestCount, cakeData.cakeShape, cakeData.decorationNotes.length > 20);

  const handleExport = async () => {
    if (!canvasRef.current) return;

    // Get canvas element and export as image
    const canvasElement = canvasRef.current.querySelector('canvas') as HTMLCanvasElement;
    if (canvasElement) {
      const imageData = canvasElement.toDataURL('image/png');

      // Create design object
      const design: CakeDesign = {
        id: `cake-${Date.now()}`,
        name: `${cakeData.mainFlavor} Cake - ${new Date().toLocaleDateString()}`,
        timestamp: new Date().toISOString(),
        intakeData: cakeData,
        calculations,
        textureConfig: {
          frosting: cakeData.icingType,
          fillings: cakeData.fillingFlavors,
          decorations: cakeData.decorationNotes.split(',').map((d) => d.trim()),
        },
        exportFormat: 'image',
        designImage: imageData,
      };

      onExport?.(design);

      // Also trigger download
      const link = document.createElement('a');
      link.href = imageData;
      link.download = `cake-design-${Date.now()}.png`;
      link.click();
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>🎂 CakeBuilder - 3D Visualization</h1>
        <p style={styles.subtitle}>
          {cakeData.guestCount} guests | {cakeData.cakeShape} | {cakeData.mainFlavor} cake
        </p>
      </div>

      {/* Main Canvas */}
      <div style={styles.canvasWrapper} ref={canvasRef}>
        <Canvas
          camera={{ position: [5, 5, 5], fov: 50 }}
          style={styles.canvas}
          dpr={[1, 2]}
          shadows
        >
          {/* Lighting */}
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1} castShadow shadowMapSize={1024} />
          <directionalLight position={[-10, -5, 5]} intensity={0.4} />

          {/* Scene setup */}
          <RigInit />
          <OrbitControls />

          {/* Main cake */}
          <CakeMesh
            autoRotate={autoRotate}
            cakeData={cakeData}
            calculations={calculations}
            onExport={handleExport}
          />

          {/* Grid and helpers */}
          <gridHelper args={[20, 20]} position={[0, -5, 0]} />
        </Canvas>

        {/* Canvas controls overlay */}
        <div style={styles.canvasControls}>
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            style={{
              ...styles.controlButton,
              backgroundColor: autoRotate ? '#0066cc' : '#999',
            }}
          >
            {autoRotate ? '⏹ Stop Rotate' : '▶ Auto Rotate'}
          </button>
          <button
            onClick={() => {
              setCameraView('iso');
            }}
            style={styles.controlButton}
          >
            📐 Isometric
          </button>
          <button
            onClick={() => {
              setCameraView('overhead');
              setShowOverhead(!showOverhead);
            }}
            style={styles.controlButton}
          >
            ⬆️ Overhead
          </button>
        </div>
      </div>

      {/* Details and Actions */}
      <div style={styles.detailsSection}>
        <div style={styles.detailsGrid}>
          {/* Cake Specs */}
          <div style={styles.detailBox}>
            <h3 style={styles.detailTitle}>Cake Specifications</h3>
            <ul style={styles.detailList}>
              <li>
                <strong>Diameter:</strong> {calculations.cakeDiameter}"
              </li>
              <li>
                <strong>Layers:</strong> {calculations.cakeLayers}
              </li>
              <li>
                <strong>Servings:</strong> {calculations.estimatedServings}
              </li>
              <li>
                <strong>Weight:</strong> ~{Math.round(calculations.estimatedWeight)} oz
              </li>
              {calculations.supportColumnsNeeded && (
                <li style={styles.warning}>
                  <strong>⚠️ Structural Supports Required</strong>
                </li>
              )}
            </ul>
          </div>

          {/* Production Timeline */}
          <div style={styles.detailBox}>
            <h3 style={styles.detailTitle}>Production Timeline</h3>
            <ul style={styles.detailList}>
              <li>
                <strong>Baking:</strong> {calculations.bakingTimeMinutes} min/layer
              </li>
              <li>
                <strong>Cooling:</strong> {calculations.coolingTimeMinutes} min
              </li>
              <li>
                <strong>Assembly:</strong> {calculations.preparationTimeMinutes} min
              </li>
              <li>
                <strong>Total:</strong> {Math.floor(calculations.totalProductionTimeMinutes / 60)}h{' '}
                {calculations.totalProductionTimeMinutes % 60}m
              </li>
            </ul>
          </div>

          {/* Design Details */}
          <div style={styles.detailBox}>
            <h3 style={styles.detailTitle}>Design Details</h3>
            <ul style={styles.detailList}>
              <li>
                <strong>Flavor:</strong> {cakeData.mainFlavor.replace(/_/g, ' ')}
              </li>
              <li>
                <strong>Icing:</strong> {cakeData.icingType}
              </li>
              <li>
                <strong>Color:</strong>{' '}
                <span
                  style={{
                    display: 'inline-block',
                    width: '16px',
                    height: '16px',
                    backgroundColor: cakeData.icingColor,
                    border: '1px solid #ccc',
                    borderRadius: '2px',
                    verticalAlign: 'middle',
                    marginLeft: '0.5rem',
                  }}
                />
              </li>
              <li>
                <strong>Theme:</strong> {cakeData.theme.replace(/_/g, ' ')}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={styles.actionButtons}>
        <button onClick={handleExport} style={styles.buttonPrimary}>
          💾 Export Design
        </button>
        <button
          onClick={onClose}
          style={{
            ...styles.buttonSecondary,
            display: onClose ? 'block' : 'none',
          }}
        >
          ← Back to Form
        </button>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#f5f5f5',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  header: {
    padding: '1.5rem 2rem',
    backgroundColor: '#fff',
    borderBottom: '1px solid #ddd',
  },
  title: {
    margin: '0 0 0.5rem 0',
    fontSize: '1.8rem',
    color: '#000',
  },
  subtitle: {
    margin: '0',
    fontSize: '0.95rem',
    color: '#666',
  },
  canvasWrapper: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#e8e8e8',
    borderRadius: '4px',
    margin: '1rem',
    overflow: 'hidden',
  },
  canvas: {
    width: '100%',
    height: '100%',
  },
  canvasControls: {
    position: 'absolute',
    bottom: '1rem',
    left: '1rem',
    display: 'flex',
    gap: '0.5rem',
    zIndex: 10,
  },
  controlButton: {
    padding: '0.5rem 1rem',
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#fff',
    backgroundColor: '#0066cc',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  detailsSection: {
    padding: '1.5rem 2rem',
    backgroundColor: '#fff',
    borderTop: '1px solid #ddd',
  },
  detailsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
  },
  detailBox: {
    padding: '1rem',
    backgroundColor: '#f9f9f9',
    borderRadius: '4px',
    border: '1px solid #eee',
  },
  detailTitle: {
    margin: '0 0 0.75rem 0',
    fontSize: '1rem',
    fontWeight: '600',
    color: '#000',
  },
  detailList: {
    margin: '0',
    padding: '0 0 0 1.5rem',
    fontSize: '0.9rem',
  },
  warning: {
    color: '#ff6600',
    fontWeight: 'bold',
  },
  actionButtons: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    padding: '1.5rem 2rem',
    backgroundColor: '#fff',
    borderTop: '1px solid #ddd',
  },
  buttonPrimary: {
    padding: '0.75rem 2rem',
    fontSize: '1rem',
    fontWeight: '600',
    color: '#fff',
    backgroundColor: '#0066cc',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  buttonSecondary: {
    padding: '0.75rem 2rem',
    fontSize: '1rem',
    fontWeight: '600',
    color: '#0066cc',
    backgroundColor: '#fff',
    border: '2px solid #0066cc',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};
