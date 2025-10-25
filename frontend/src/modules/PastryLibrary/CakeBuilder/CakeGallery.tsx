/**
 * LUCCCA | Cake Design Gallery
 * Browse, search, and manage saved cake designs
 */

import React, { useState, useEffect } from 'react';
import { CakeDesign, ProductionTask } from './types';
import {
  getAllCakeDesigns,
  searchCakeDesigns,
  deleteCakeDesign,
  getTasksByDesignId,
  getCakeDesignStats,
  exportDesignsAsJSON,
} from './CakeDesignStorage';

interface CakeGalleryProps {
  onClose?: () => void;
}

interface FilterState {
  searchQuery: string;
  flavor?: string;
  theme?: string;
  sortBy: 'newest' | 'oldest' | 'guests';
}

/**
 * Main Gallery Component
 */
export const CakeGallery: React.FC<CakeGalleryProps> = ({ onClose }) => {
  const [designs, setDesigns] = useState<CakeDesign[]>([]);
  const [filteredDesigns, setFilteredDesigns] = useState<CakeDesign[]>([]);
  const [selectedDesign, setSelectedDesign] = useState<CakeDesign | null>(null);
  const [stats, setStats] = useState<ReturnType<typeof getCakeDesignStats> | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    sortBy: 'newest',
  });

  // Load designs on mount
  useEffect(() => {
    loadDesigns();
  }, []);

  // Apply filters
  useEffect(() => {
    applyFilters();
  }, [designs, filters]);

  const loadDesigns = () => {
    const allDesigns = getAllCakeDesigns();
    setDesigns(allDesigns);
    setStats(getCakeDesignStats());
  };

  const applyFilters = () => {
    let result = designs;

    // Search query filter
    if (filters.searchQuery) {
      result = result.filter(
        (d) =>
          d.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
          d.intakeData.mainFlavor.toLowerCase().includes(filters.searchQuery.toLowerCase())
      );
    }

    // Flavor filter
    if (filters.flavor) {
      result = result.filter((d) => d.intakeData.mainFlavor === filters.flavor);
    }

    // Theme filter
    if (filters.theme) {
      result = result.filter((d) => d.intakeData.theme === filters.theme);
    }

    // Sort
    result.sort((a, b) => {
      switch (filters.sortBy) {
        case 'newest':
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        case 'oldest':
          return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
        case 'guests':
          return b.intakeData.guestCount - a.intakeData.guestCount;
        default:
          return 0;
      }
    });

    setFilteredDesigns(result);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this cake design? This cannot be undone.')) {
      deleteCakeDesign(id);
      loadDesigns();
      setSelectedDesign(null);
    }
  };

  const handleExport = () => {
    const jsonData = exportDesignsAsJSON();
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(jsonData));
    element.setAttribute('download', `cake-designs-backup-${new Date().toISOString().split('T')[0]}.json`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const getTotalTasks = (design: CakeDesign): ProductionTask[] => {
    return getTasksByDesignId(design.id);
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>📁 Cake Design Gallery</h1>
        <p style={styles.subtitle}>Browse and manage your custom cake designs</p>
      </div>

      {/* Stats Bar */}
      {stats && (
        <div style={styles.statsBar}>
          <div style={styles.statBadge}>
            <strong>{stats.totalDesigns}</strong> designs
          </div>
          <div style={styles.statBadge}>
            <strong>{stats.totalTasks}</strong> tasks
          </div>
          <div style={styles.statBadge}>
            <strong>{stats.totalGuestsServed}</strong> guests served
          </div>
        </div>
      )}

      <div style={styles.mainContent}>
        {/* Sidebar - Filters */}
        <div style={styles.sidebar}>
          <h3 style={styles.sidebarTitle}>🔍 Filters</h3>

          {/* Search */}
          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>Search</label>
            <input
              type="text"
              placeholder="Design name or flavor..."
              value={filters.searchQuery}
              onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
              style={styles.filterInput}
            />
          </div>

          {/* Flavor Filter */}
          {stats && Object.keys(stats.byFlavor).length > 0 && (
            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Flavor</label>
              <select
                value={filters.flavor || ''}
                onChange={(e) => setFilters({ ...filters, flavor: e.target.value || undefined })}
                style={styles.filterSelect}
              >
                <option value="">All Flavors</option>
                {Object.entries(stats.byFlavor).map(([flavor, count]) => (
                  <option key={flavor} value={flavor}>
                    {flavor.replace(/_/g, ' ')} ({count})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Theme Filter */}
          {stats && Object.keys(stats.byTheme).length > 0 && (
            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Theme</label>
              <select
                value={filters.theme || ''}
                onChange={(e) => setFilters({ ...filters, theme: e.target.value || undefined })}
                style={styles.filterSelect}
              >
                <option value="">All Themes</option>
                {Object.entries(stats.byTheme).map(([theme, count]) => (
                  <option key={theme} value={theme}>
                    {theme.replace(/_/g, ' ')} ({count})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Sort */}
          <div style={styles.filterGroup}>
            <label style={styles.filterLabel}>Sort By</label>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as FilterState['sortBy'] })}
              style={styles.filterSelect}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="guests">Most Guests</option>
            </select>
          </div>

          {/* Actions */}
          <div style={styles.filterGroup}>
            <button onClick={handleExport} style={styles.buttonSecondary}>
              📥 Export Backup
            </button>
            {onClose && (
              <button onClick={onClose} style={styles.buttonCancel}>
                ← Back
              </button>
            )}
          </div>
        </div>

        {/* Main Content - Design List and Details */}
        <div style={styles.content}>
          {/* Design Grid */}
          <div style={styles.gridSection}>
            <h3 style={styles.sectionTitle}>
              Your Designs ({filteredDesigns.length})
            </h3>

            {filteredDesigns.length === 0 ? (
              <div style={styles.emptyState}>
                <p style={styles.emptyText}>No designs found. Create your first cake design!</p>
              </div>
            ) : (
              <div style={styles.designGrid}>
                {filteredDesigns.map((design) => (
                  <div
                    key={design.id}
                    style={{
                      ...styles.designCard,
                      backgroundColor: selectedDesign?.id === design.id ? '#E8F0FF' : '#fff',
                      borderColor: selectedDesign?.id === design.id ? '#0066cc' : '#ddd',
                    }}
                    onClick={() => setSelectedDesign(design)}
                  >
                    {/* Design Preview Image */}
                    {design.designImage && (
                      <img src={design.designImage} alt={design.name} style={styles.designPreview} />
                    )}
                    {!design.designImage && (
                      <div style={styles.designPlaceholder}>
                        🎂 {design.intakeData.cakeShape.replace(/_/g, ' ')}
                      </div>
                    )}

                    {/* Design Info */}
                    <h4 style={styles.designName}>{design.name}</h4>
                    <p style={styles.designMeta}>
                      👥 {design.intakeData.guestCount} guests | 📅{' '}
                      {new Date(design.intakeData.eventDate).toLocaleDateString()}
                    </p>
                    <p style={styles.designFlavor}>{design.intakeData.mainFlavor.replace(/_/g, ' ')}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Design Details Panel */}
          {selectedDesign && (
            <div style={styles.detailsPanel}>
              <div style={styles.detailsHeader}>
                <h2 style={styles.detailsTitle}>{selectedDesign.name}</h2>
                <button
                  onClick={() => handleDelete(selectedDesign.id)}
                  style={styles.buttonDelete}
                >
                  🗑️ Delete
                </button>
              </div>

              <div style={styles.detailsContent}>
                {/* Cake Specifications */}
                <div style={styles.detailSection}>
                  <h4 style={styles.detailSectionTitle}>Cake Specifications</h4>
                  <ul style={styles.detailList}>
                    <li>
                      <strong>Flavor:</strong> {selectedDesign.intakeData.mainFlavor.replace(/_/g, ' ')}
                    </li>
                    <li>
                      <strong>Shape:</strong> {selectedDesign.intakeData.cakeShape.replace(/_/g, ' ')}
                    </li>
                    <li>
                      <strong>Guests:</strong> {selectedDesign.intakeData.guestCount}
                    </li>
                    <li>
                      <strong>Diameter:</strong> {selectedDesign.calculations.cakeDiameter}"
                    </li>
                    <li>
                      <strong>Layers:</strong> {selectedDesign.calculations.cakeLayers}
                    </li>
                  </ul>
                </div>

                {/* Design Details */}
                <div style={styles.detailSection}>
                  <h4 style={styles.detailSectionTitle}>Design Details</h4>
                  <ul style={styles.detailList}>
                    <li>
                      <strong>Icing:</strong> {selectedDesign.intakeData.icingType}
                    </li>
                    <li>
                      <strong>Color:</strong>{' '}
                      <span
                        style={{
                          display: 'inline-block',
                          width: '20px',
                          height: '20px',
                          backgroundColor: selectedDesign.intakeData.icingColor,
                          border: '1px solid #ccc',
                          borderRadius: '3px',
                          verticalAlign: 'middle',
                        }}
                      />
                    </li>
                    <li>
                      <strong>Theme:</strong> {selectedDesign.intakeData.theme.replace(/_/g, ' ')}
                    </li>
                  </ul>
                </div>

                {/* Timeline */}
                <div style={styles.detailSection}>
                  <h4 style={styles.detailSectionTitle}>Production Timeline</h4>
                  <ul style={styles.detailList}>
                    <li>
                      <strong>Baking:</strong> {selectedDesign.calculations.bakingTimeMinutes} min/layer
                    </li>
                    <li>
                      <strong>Cooling:</strong> {selectedDesign.calculations.coolingTimeMinutes} min
                    </li>
                    <li>
                      <strong>Assembly:</strong> {selectedDesign.calculations.preparationTimeMinutes} min
                    </li>
                    <li>
                      <strong>Total:</strong> {Math.floor(selectedDesign.calculations.totalProductionTimeMinutes / 60)}h{' '}
                      {selectedDesign.calculations.totalProductionTimeMinutes % 60}m
                    </li>
                  </ul>
                </div>

                {/* Tasks */}
                <div style={styles.detailSection}>
                  <h4 style={styles.detailSectionTitle}>
                    Production Tasks ({getTotalTasks(selectedDesign).length})
                  </h4>
                  <ul style={styles.detailList}>
                    {getTotalTasks(selectedDesign).map((task, i) => (
                      <li key={task.id}>
                        {i + 1}. {task.taskType.replace(/_/g, ' ')} ({task.estimatedDurationMinutes} min)
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Event Info */}
                <div style={styles.detailSection}>
                  <h4 style={styles.detailSectionTitle}>Event Information</h4>
                  <ul style={styles.detailList}>
                    <li>
                      <strong>Date:</strong> {new Date(selectedDesign.intakeData.eventDate).toLocaleDateString()}
                    </li>
                    <li>
                      <strong>Time:</strong> {selectedDesign.intakeData.eventTime}
                    </li>
                    <li>
                      <strong>Location:</strong> {selectedDesign.intakeData.eventLocation}
                    </li>
                    <li>
                      <strong>Delivery:</strong> {selectedDesign.intakeData.pickupOrDelivery === 'pickup' ? '🚗 Pickup' : '🚚 Delivery'}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  header: {
    padding: '2rem',
    backgroundColor: '#fff',
    borderBottom: '2px solid #ddd',
  },
  title: {
    margin: '0 0 0.5rem 0',
    fontSize: '2rem',
    color: '#000',
  },
  subtitle: {
    margin: '0',
    fontSize: '0.95rem',
    color: '#666',
  },
  statsBar: {
    display: 'flex',
    gap: '1rem',
    padding: '1rem 2rem',
    backgroundColor: '#f9f9f9',
    borderBottom: '1px solid #ddd',
    flexWrap: 'wrap',
  },
  statBadge: {
    padding: '0.5rem 1rem',
    backgroundColor: '#fff',
    borderRadius: '20px',
    border: '1px solid #ddd',
    fontSize: '0.9rem',
  },
  mainContent: {
    display: 'grid',
    gridTemplateColumns: '250px 1fr',
    gap: '1rem',
    padding: '1.5rem',
    flex: 1,
    minHeight: 0,
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    padding: '1.5rem',
    backgroundColor: '#fff',
    borderRadius: '8px',
    height: 'fit-content',
  },
  sidebarTitle: {
    margin: '0',
    fontSize: '1.1rem',
    fontWeight: '600',
  },
  filterGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  filterLabel: {
    fontSize: '0.85rem',
    fontWeight: '600',
  },
  filterInput: {
    padding: '0.5rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '0.9rem',
  },
  filterSelect: {
    padding: '0.5rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '0.9rem',
    backgroundColor: '#fff',
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '1fr 350px',
    gap: '1rem',
    minHeight: 0,
  },
  gridSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    minHeight: 0,
  },
  sectionTitle: {
    margin: '0 0 1rem 0',
    fontSize: '1.1rem',
    fontWeight: '600',
  },
  designGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: '1rem',
    flex: 1,
    overflowY: 'auto',
  },
  designCard: {
    padding: '1rem',
    backgroundColor: '#fff',
    borderRadius: '8px',
    border: '2px solid #ddd',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  designPreview: {
    width: '100%',
    height: '120px',
    objectFit: 'cover',
    borderRadius: '4px',
    marginBottom: '0.5rem',
  },
  designPlaceholder: {
    width: '100%',
    height: '120px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: '4px',
    marginBottom: '0.5rem',
    fontSize: '2rem',
  },
  designName: {
    margin: '0.5rem 0 0 0',
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#000',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  designMeta: {
    margin: '0.25rem 0',
    fontSize: '0.75rem',
    color: '#666',
  },
  designFlavor: {
    margin: '0.25rem 0 0 0',
    fontSize: '0.8rem',
    color: '#0066cc',
    fontWeight: '500',
  },
  emptyState: {
    padding: '3rem 2rem',
    textAlign: 'center',
    backgroundColor: '#fff',
    borderRadius: '8px',
  },
  emptyText: {
    margin: '0',
    fontSize: '1rem',
    color: '#666',
  },
  detailsPanel: {
    padding: '1.5rem',
    backgroundColor: '#fff',
    borderRadius: '8px',
    border: '2px solid #0066cc',
    overflowY: 'auto',
  },
  detailsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
    borderBottom: '2px solid #ddd',
    paddingBottom: '1rem',
  },
  detailsTitle: {
    margin: '0',
    fontSize: '1.3rem',
    color: '#000',
  },
  detailsContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  detailSection: {
    paddingBottom: '1rem',
    borderBottom: '1px solid #eee',
  },
  detailSectionTitle: {
    margin: '0 0 0.75rem 0',
    fontSize: '0.95rem',
    fontWeight: '600',
    color: '#000',
  },
  detailList: {
    margin: '0',
    padding: '0 0 0 1.25rem',
    fontSize: '0.85rem',
    color: '#333',
  },
  buttonSecondary: {
    padding: '0.6rem 1rem',
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#0066cc',
    backgroundColor: '#fff',
    border: '2px solid #0066cc',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%',
  },
  buttonCancel: {
    padding: '0.6rem 1rem',
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#666',
    backgroundColor: '#fff',
    border: '2px solid #999',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%',
  },
  buttonDelete: {
    padding: '0.5rem 1rem',
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#fff',
    backgroundColor: '#ff6b6b',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};
