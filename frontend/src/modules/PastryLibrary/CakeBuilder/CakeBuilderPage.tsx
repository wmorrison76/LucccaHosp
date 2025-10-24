/**
 * LUCCCA | CakeBuilder Main Page
 * Orchestrates the complete cake design workflow
 */

import React, { useState, useEffect, Suspense, lazy } from 'react';
import { CakeIntakeData, CakeDesign, ProductionTask } from './types';
import { saveCakeDesign, saveProductionTasks, getAllCakeDesigns, getAllProductionTasks } from './CakeDesignStorage';

// Lazy load heavy components to avoid import issues
const IntakeForm = lazy(() => import('./IntakeForm').then(m => ({ default: m.IntakeForm })));
const CakeBuilder = lazy(() => import('./CakeBuilder').then(m => ({ default: m.CakeBuilder })));
const ProductionScheduler = lazy(() => import('./ProductionScheduler').then(m => ({ default: m.ProductionScheduler })));
const CakeGallery = lazy(() => import('./CakeGallery').then(m => ({ default: m.CakeGallery })));

type WorkflowStep = 'home' | 'intake' | 'design' | 'schedule' | 'gallery';

interface CakeBuilderPageState {
  currentStep: WorkflowStep;
  cakeData?: CakeIntakeData;
  cakeDesign?: CakeDesign;
  productionTasks?: ProductionTask[];
}

/**
 * Main CakeBuilder Page Component
 */
export const CakeBuilderPage: React.FC = () => {
  const [state, setState] = useState<CakeBuilderPageState>({
    currentStep: 'home',
  });

  // Initialize page
  useEffect(() => {
    console.log('[CakeBuilder] Page loaded');
  }, []);

  // Handle intake form submission
  const handleIntakeSubmit = (cakeData: CakeIntakeData) => {
    console.log('[CakeBuilder] Intake data received:', cakeData);
    setState({
      currentStep: 'design',
      cakeData,
    });
  };

  // Handle design export
  const handleDesignExport = (design: CakeDesign) => {
    console.log('[CakeBuilder] Design exported:', design.id);
    setState({
      currentStep: 'schedule',
      cakeData: state.cakeData,
      cakeDesign: design,
    });
  };

  // Handle production scheduler task generation
  const handleTasksGenerated = (tasks: ProductionTask[]) => {
    if (!state.cakeDesign) {
      console.error('[CakeBuilder] No design available for tasks');
      return;
    }

    console.log('[CakeBuilder] Tasks generated:', tasks.length);

    // Save to storage
    saveCakeDesign(state.cakeDesign);
    saveProductionTasks(tasks);

    setState({
      ...state,
      productionTasks: tasks,
      currentStep: 'home',
    });

    // Show success message
    alert(`✅ Cake design saved!\n\n${state.cakeDesign.name}\n${tasks.length} production tasks created`);
  };

  // Navigation handlers
  const handleBackClick = () => {
    setState((prev) => ({
      ...prev,
      currentStep: prev.currentStep === 'design' ? 'intake' : 'home',
    }));
  };

  const handleGalleryClick = () => {
    setState({
      ...state,
      currentStep: 'gallery',
    });
  };

  const handleBackToHome = () => {
    setState({
      currentStep: 'home',
      cakeData: undefined,
      cakeDesign: undefined,
      productionTasks: undefined,
    });
  };

  // Render different steps
  const renderContent = () => {
    const LoadingFallback = () => (
      <div style={{ padding: '2rem', textAlign: 'center', color: '#999' }}>
        <p>Loading...</p>
      </div>
    );

    switch (state.currentStep) {
      case 'intake':
        return (
          <Suspense fallback={<LoadingFallback />}>
            <IntakeForm
              onSubmit={handleIntakeSubmit}
              onCancel={handleBackToHome}
            />
          </Suspense>
        );

      case 'design':
        if (!state.cakeData) return null;
        return (
          <Suspense fallback={<LoadingFallback />}>
            <CakeBuilder
              cakeData={state.cakeData}
              onExport={handleDesignExport}
              onClose={handleBackClick}
            />
          </Suspense>
        );

      case 'schedule':
        if (!state.cakeDesign) return null;
        return (
          <Suspense fallback={<LoadingFallback />}>
            <ProductionScheduler
              design={state.cakeDesign}
              onTasksGenerated={handleTasksGenerated}
              onClose={handleBackToHome}
            />
          </Suspense>
        );

      case 'gallery':
        return (
          <Suspense fallback={<LoadingFallback />}>
            <CakeGallery
              onClose={handleBackToHome}
            />
          </Suspense>
        );

      case 'home':
      default:
        return <HomePage onIntakeClick={() => setState({ ...state, currentStep: 'intake' })} onGalleryClick={handleGalleryClick} />;
    }
  };

  return (
    <div style={styles.pageContainer}>
      <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>Loading CakeBuilder...</div>}>
        {renderContent()}
      </Suspense>
    </div>
  );
};

/**
 * Home Page Component
 */
const HomePage: React.FC<{ onIntakeClick: () => void; onGalleryClick: () => void }> = ({ onIntakeClick, onGalleryClick }) => (
  <div style={styles.homeContainer}>
    {/* Header */}
    <div style={styles.homeHeader}>
      <h1 style={styles.homeTitle}>🎂 LUCCCA CakeBuilder</h1>
      <p style={styles.homeSubtitle}>Professional Cake Design & Production Management</p>
    </div>

    {/* Main Content */}
    <div style={styles.homeContent}>
      {/* Welcome Section */}
      <div style={styles.welcomeCard}>
        <h2 style={styles.cardTitle}>Welcome to CakeBuilder!</h2>
        <p style={styles.cardText}>
          Create stunning custom cakes with our professional design studio. Collect client requirements, visualize designs in 3D,
          and generate production schedules automatically.
        </p>
      </div>

      {/* Feature Grid */}
      <div style={styles.featureGrid}>
        <div style={styles.featureCard}>
          <div style={styles.featureIcon}>📋</div>
          <h3 style={styles.featureTitle}>Client Intake</h3>
          <p style={styles.featureText}>Collect all event details, cake preferences, and guest count in one form</p>
        </div>

        <div style={styles.featureCard}>
          <div style={styles.featureIcon}>🎨</div>
          <h3 style={styles.featureTitle}>3D Design</h3>
          <p style={styles.featureText}>Visualize custom cakes with realistic textures, colors, and multi-layer designs</p>
        </div>

        <div style={styles.featureCard}>
          <div style={styles.featureIcon}>📊</div>
          <h3 style={styles.featureTitle}>Production Timeline</h3>
          <p style={styles.featureText}>Auto-generated task schedule with time estimates and staff assignments</p>
        </div>

        <div style={styles.featureCard}>
          <div style={styles.featureIcon}>📁</div>
          <h3 style={styles.featureTitle}>Design Gallery</h3>
          <p style={styles.featureText}>Browse, search, and manage all your custom cake designs in one place</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={styles.actionSection}>
        <button
          onClick={() => {
            console.log('[HomePage] Create New Cake Order clicked');
            onIntakeClick();
          }}
          style={styles.buttonLarge}
        >
          ➕ Create New Cake Order
        </button>
        <button
          onClick={() => {
            console.log('[HomePage] View Cake Gallery clicked');
            onGalleryClick();
          }}
          style={styles.buttonLargeSecondary}
        >
          📁 View Cake Gallery
        </button>
      </div>

      {/* Quick Stats */}
      <QuickStats />
    </div>

    {/* Footer */}
    <div style={styles.homeFooter}>
      <p>
        Built with ❤️ for pastry chefs | 
        <a href="#" style={styles.link}> Documentation</a> | 
        <a href="#" style={styles.link}> Support</a>
      </p>
    </div>
  </div>
);

/**
 * Quick Statistics Component
 */
const QuickStats: React.FC = () => {
  const [stats, setStats] = useState({ designs: 0, tasks: 0, guests: 0 });

  useEffect(() => {
    // Load from storage on component mount
    const designs = getAllCakeDesigns();
    const tasks = getAllProductionTasks();
    const guests = designs.reduce((sum: number, d: any) => sum + (d.intakeData?.guestCount || 0), 0);

    setStats({
      designs: designs.length,
      tasks: tasks.length,
      guests,
    });
  }, []);

  return (
    <div style={styles.statsCard}>
      <h3 style={styles.statsTitle}>📈 Your Stats</h3>
      <div style={styles.statsGrid}>
        <div style={styles.statItem}>
          <div style={styles.statNumber}>{stats.designs}</div>
          <div style={styles.statLabel}>Designs Created</div>
        </div>
        <div style={styles.statItem}>
          <div style={styles.statNumber}>{stats.tasks}</div>
          <div style={styles.statLabel}>Production Tasks</div>
        </div>
        <div style={styles.statItem}>
          <div style={styles.statNumber}>{stats.guests}</div>
          <div style={styles.statLabel}>Guests Served</div>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  pageContainer: {
    width: '100%',
    height: '100%',
    overflow: 'auto',
    backgroundColor: '#f5f5f5',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  homeContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
    width: '100%',
    backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  homeHeader: {
    padding: '3rem 2rem',
    textAlign: 'center',
    color: '#fff',
    background: 'rgba(0,0,0,0.3)',
  },
  homeTitle: {
    margin: '0 0 0.5rem 0',
    fontSize: '2.5rem',
    fontWeight: 'bold',
  },
  homeSubtitle: {
    margin: '0',
    fontSize: '1.1rem',
    opacity: 0.9,
  },
  homeContent: {
    flex: 1,
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
    padding: '2rem',
  },
  welcomeCard: {
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '8px',
    marginBottom: '2rem',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  cardTitle: {
    margin: '0 0 1rem 0',
    fontSize: '1.8rem',
    color: '#000',
  },
  cardText: {
    margin: '0',
    fontSize: '1rem',
    color: '#666',
    lineHeight: '1.6',
  },
  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem',
  },
  featureCard: {
    padding: '1.5rem',
    backgroundColor: '#fff',
    borderRadius: '8px',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  featureIcon: {
    fontSize: '2.5rem',
    marginBottom: '0.5rem',
  },
  featureTitle: {
    margin: '0 0 0.5rem 0',
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#000',
  },
  featureText: {
    margin: '0',
    fontSize: '0.9rem',
    color: '#666',
  },
  actionSection: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    marginBottom: '2rem',
    flexWrap: 'wrap',
  },
  buttonLarge: {
    padding: '1rem 2.5rem',
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#fff',
    backgroundColor: '#0066cc',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(0,102,204,0.3)',
    transition: 'all 0.3s ease',
    position: 'relative' as const,
    zIndex: 10,
    pointerEvents: 'auto' as const,
    outline: 'none',
  } as React.CSSProperties,
  buttonLargeSecondary: {
    padding: '1rem 2.5rem',
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#0066cc',
    backgroundColor: '#fff',
    border: '2px solid #0066cc',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    position: 'relative' as const,
    zIndex: 10,
    pointerEvents: 'auto' as const,
    outline: 'none',
  } as React.CSSProperties,
  statsCard: {
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  statsTitle: {
    margin: '0 0 1.5rem 0',
    fontSize: '1.3rem',
    fontWeight: '600',
    color: '#000',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '1rem',
  },
  statItem: {
    textAlign: 'center',
    padding: '1rem',
    backgroundColor: '#f9f9f9',
    borderRadius: '4px',
  },
  statNumber: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#0066cc',
  },
  statLabel: {
    fontSize: '0.9rem',
    color: '#666',
    marginTop: '0.5rem',
  },
  homeFooter: {
    padding: '2rem',
    textAlign: 'center',
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0.3)',
    fontSize: '0.9rem',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    marginLeft: '0.5rem',
  },
};

// Export default for dynamic imports
export default CakeBuilderPage;
