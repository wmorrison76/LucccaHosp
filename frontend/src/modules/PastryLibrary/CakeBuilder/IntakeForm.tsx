/**
 * LUCCCA | Cake Intake Form
 * Client data collection for custom cake orders
 */

import React, { useState } from 'react';
import { CakeIntakeData, CakeShape, CakeFlavor, CakeTheme, IcingType } from './types';
import { calculateCakeSpecs } from './CakeSizeCalculator';

interface IntakeFormProps {
  onSubmit: (data: CakeIntakeData) => void;
  onCancel?: () => void;
  initialData?: Partial<CakeIntakeData>;
}

const CAKE_FLAVORS: CakeFlavor[] = [
  'butter',
  'vanilla',
  'chocolate',
  'pound_vanilla',
  'pound_orange',
  'pound_chocolate',
  'pound_lemon',
  'pound_marble',
  'strawberry',
  'confetti',
  'raspberry',
];

const CAKE_SHAPES: CakeShape[] = ['round', 'square', 'quarter_sheet', 'half_sheet', 'full_sheet'];
const CAKE_THEMES: CakeTheme[] = ['mad_hatter', 'bear', 'hare', 'yule', 'custom'];
const ICING_TYPES: IcingType[] = ['frosting', 'fondant', 'buttercream'];

export const IntakeForm: React.FC<IntakeFormProps> = ({ onSubmit, onCancel, initialData }) => {
  const [formData, setFormData] = useState<CakeIntakeData>(
    initialData || {
      eventDate: '',
      eventTime: '',
      eventLocation: '',
      pickupOrDelivery: 'pickup',
      guestCount: 20,
      cakeShape: 'round',
      mainFlavor: 'vanilla',
      fillingFlavors: ['vanilla'],
      icingColor: '#FFFFFF',
      icingType: 'frosting',
      theme: 'custom',
      decorationNotes: '',
      showPieceCake: true,
      sheetCakeProduction: true,
    }
  );

  const [showPreview, setShowPreview] = useState(false);
  const [calculatedSpecs, setCalculatedSpecs] = useState(calculateCakeSpecs(formData.guestCount, formData.cakeShape));

  const handleChange = (field: keyof CakeIntakeData, value: any) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);

    // Recalculate if guest count or shape changes
    if (field === 'guestCount' || field === 'cakeShape') {
      setCalculatedSpecs(calculateCakeSpecs(updated.guestCount as number, updated.cakeShape as CakeShape));
    }
  };

  const handleFillingChange = (flavor: CakeFlavor) => {
    const fillings = formData.fillingFlavors.includes(flavor)
      ? formData.fillingFlavors.filter((f) => f !== flavor)
      : [...formData.fillingFlavors, flavor];

    handleChange('fillingFlavors', fillings);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="cake-intake-form" style={styles.container}>
      <h1 style={styles.title}>🎂 Custom Cake Order Form</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        {/* EVENT DETAILS SECTION */}
        <fieldset style={styles.fieldset}>
          <legend style={styles.legend}>📅 Event Details</legend>

          <div style={styles.formGroup}>
            <label style={styles.label}>Event Date *</label>
            <input
              type="date"
              value={formData.eventDate}
              onChange={(e) => handleChange('eventDate', e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Event Time *</label>
            <input
              type="time"
              value={formData.eventTime}
              onChange={(e) => handleChange('eventTime', e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Location *</label>
            <input
              type="text"
              placeholder="Event venue or address"
              value={formData.eventLocation}
              onChange={(e) => handleChange('eventLocation', e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Pickup or Delivery? *</label>
            <select
              value={formData.pickupOrDelivery}
              onChange={(e) => handleChange('pickupOrDelivery', e.target.value as 'pickup' | 'delivery')}
              style={styles.select}
            >
              <option value="pickup">🚗 Pickup</option>
              <option value="delivery">🚚 Delivery</option>
            </select>
          </div>
        </fieldset>

        {/* CAKE SPECS SECTION */}
        <fieldset style={styles.fieldset}>
          <legend style={styles.legend}>🎂 Cake Specifications</legend>

          <div style={styles.formGroup}>
            <label style={styles.label}>Number of Guests *</label>
            <input
              type="number"
              min="1"
              max="500"
              value={formData.guestCount}
              onChange={(e) => handleChange('guestCount', parseInt(e.target.value))}
              style={styles.input}
            />
            <small style={styles.hint}>We recommend {calculatedSpecs.cakeDiameter}" diameter, {calculatedSpecs.cakeLayers} layers</small>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Cake Shape *</label>
            <select value={formData.cakeShape} onChange={(e) => handleChange('cakeShape', e.target.value as CakeShape)} style={styles.select}>
              <option value="round">⭕ Round</option>
              <option value="square">⬜ Square</option>
              <option value="quarter_sheet">📦 Quarter Sheet</option>
              <option value="half_sheet">📦 Half Sheet</option>
              <option value="full_sheet">📦 Full Sheet</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Main Cake Flavor *</label>
            <select value={formData.mainFlavor} onChange={(e) => handleChange('mainFlavor', e.target.value as CakeFlavor)} style={styles.select}>
              {CAKE_FLAVORS.map((flavor) => (
                <option key={flavor} value={flavor}>
                  {flavor.replace(/_/g, ' ')}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Filling Flavors (select all that apply)</label>
            <div style={styles.checkboxGroup}>
              {CAKE_FLAVORS.map((flavor) => (
                <label key={flavor} style={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={formData.fillingFlavors.includes(flavor)}
                    onChange={() => handleFillingChange(flavor)}
                    style={styles.checkbox}
                  />
                  {flavor.replace(/_/g, ' ')}
                </label>
              ))}
            </div>
          </div>
        </fieldset>

        {/* DECORATION SECTION */}
        <fieldset style={styles.fieldset}>
          <legend style={styles.legend}>🎨 Decoration & Colors</legend>

          <div style={styles.formGroup}>
            <label style={styles.label}>Icing Color *</label>
            <div style={styles.colorPickerWrapper}>
              <input
                type="color"
                value={formData.icingColor}
                onChange={(e) => handleChange('icingColor', e.target.value)}
                style={styles.colorPicker}
              />
              <span style={styles.colorValue}>{formData.icingColor}</span>
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Icing Type *</label>
            <select value={formData.icingType} onChange={(e) => handleChange('icingType', e.target.value as IcingType)} style={styles.select}>
              {ICING_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Cake Theme</label>
            <select value={formData.theme} onChange={(e) => handleChange('theme', e.target.value as CakeTheme)} style={styles.select}>
              {CAKE_THEMES.map((theme) => (
                <option key={theme} value={theme}>
                  {theme.replace(/_/g, ' ')}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Decoration Notes</label>
            <textarea
              placeholder="Describe any special decorations, themes, or specific requests..."
              value={formData.decorationNotes}
              onChange={(e) => handleChange('decorationNotes', e.target.value)}
              style={styles.textarea}
            />
          </div>
        </fieldset>

        {/* PRODUCTION OPTIONS */}
        <fieldset style={styles.fieldset}>
          <legend style={styles.legend}>📋 Production Options</legend>

          <div style={styles.formGroup}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={formData.showPieceCake}
                onChange={(e) => handleChange('showPieceCake', e.target.checked)}
                style={styles.checkbox}
              />
              Include Show Piece Cake (3D display cake)
            </label>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={formData.sheetCakeProduction}
                onChange={(e) => handleChange('sheetCakeProduction', e.target.checked)}
                style={styles.checkbox}
              />
              Also Produce Sheet Cake (serves additional guests)
            </label>
          </div>
        </fieldset>

        {/* PRODUCTION TIMELINE PREVIEW */}
        {showPreview && (
          <fieldset style={styles.fieldset}>
            <legend style={styles.legend}>⏱️ Estimated Production Timeline</legend>
            <div style={styles.timelineGrid}>
              <div style={styles.timelineItem}>
                <strong>Baking Time (per layer):</strong>
                <span>{formatTime(calculatedSpecs.bakingTimeMinutes)}</span>
              </div>
              <div style={styles.timelineItem}>
                <strong>Cooling Time:</strong>
                <span>{formatTime(calculatedSpecs.coolingTimeMinutes)}</span>
              </div>
              <div style={styles.timelineItem}>
                <strong>Prep & Assembly:</strong>
                <span>{formatTime(calculatedSpecs.preparationTimeMinutes)}</span>
              </div>
              <div style={styles.timelineItem}>
                <strong>Total Production Time:</strong>
                <span style={styles.totalTime}>{formatTime(calculatedSpecs.totalProductionTimeMinutes)}</span>
              </div>
              <div style={styles.timelineItem}>
                <strong>Cake Diameter:</strong>
                <span>{calculatedSpecs.cakeDiameter}"</span>
              </div>
              <div style={styles.timelineItem}>
                <strong>Layers:</strong>
                <span>{calculatedSpecs.cakeLayers}</span>
              </div>
              {calculatedSpecs.supportColumnsNeeded && (
                <div style={styles.timelineItem}>
                  <strong>Structural Supports:</strong>
                  <span style={styles.warning}>⚠️ Required</span>
                </div>
              )}
            </div>
          </fieldset>
        )}

        {/* FORM ACTIONS */}
        <div style={styles.buttonGroup}>
          <button type="button" onClick={() => setShowPreview(!showPreview)} style={styles.buttonSecondary}>
            {showPreview ? '🔝 Hide Timeline' : '⏱️ Show Timeline'}
          </button>
          {onCancel && (
            <button type="button" onClick={onCancel} style={styles.buttonCancel}>
              Cancel
            </button>
          )}
          <button type="submit" style={styles.buttonPrimary}>
            📊 Next: Design Cake →
          </button>
        </div>
      </form>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '2rem',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    color: '#333',
  },
  title: {
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#000',
    fontSize: '2rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  fieldset: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '1.5rem',
    backgroundColor: '#f9f9f9',
  },
  legend: {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#000',
    padding: '0 0.5rem',
  },
  formGroup: {
    marginBottom: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '0.5rem',
    fontWeight: '500',
    color: '#333',
  },
  input: {
    padding: '0.75rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  select: {
    padding: '0.75rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '1rem',
    backgroundColor: '#fff',
  },
  textarea: {
    padding: '0.75rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '1rem',
    minHeight: '100px',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    resize: 'vertical',
  },
  hint: {
    fontSize: '0.85rem',
    color: '#666',
    marginTop: '0.3rem',
  },
  checkboxGroup: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: '0.75rem',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    cursor: 'pointer',
  },
  checkbox: {
    cursor: 'pointer',
    width: '18px',
    height: '18px',
  },
  colorPickerWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  colorPicker: {
    width: '80px',
    height: '60px',
    border: '2px solid #ccc',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  colorValue: {
    fontFamily: 'monospace',
    fontSize: '0.9rem',
    color: '#666',
  },
  timelineGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
  },
  timelineItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    padding: '1rem',
    backgroundColor: '#fff',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  totalTime: {
    fontWeight: 'bold',
    fontSize: '1.1rem',
    color: '#0066cc',
  },
  warning: {
    color: '#ff6600',
    fontWeight: 'bold',
  },
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    marginTop: '2rem',
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
  buttonCancel: {
    padding: '0.75rem 2rem',
    fontSize: '1rem',
    fontWeight: '600',
    color: '#666',
    backgroundColor: '#fff',
    border: '2px solid #999',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};
