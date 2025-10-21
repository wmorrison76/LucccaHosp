import React, { useState } from 'react';
import { Wine, Plus, Trash2 } from 'lucide-react';

export default function MixologyFallback() {
  const [cocktails, setCocktails] = useState([
    { id: 1, name: 'Mojito', category: 'Classic', abv: '12%' },
    { id: 2, name: 'Margarita', category: 'Classic', abv: '18%' },
    { id: 3, name: 'Cosmopolitan', category: 'Contemporary', abv: '20%' },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', category: '', abv: '' });

  const handleAdd = (e) => {
    e.preventDefault();
    if (formData.name && formData.category && formData.abv) {
      setCocktails([...cocktails, { id: Date.now(), ...formData }]);
      setFormData({ name: '', category: '', abv: '' });
      setShowForm(false);
    }
  };

  const handleDelete = (id) => {
    setCocktails(cocktails.filter(c => c.id !== id));
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      backgroundColor: '#0f172a',
      color: '#e2e8f0',
      fontFamily: 'system-ui, sans-serif',
    }}>
      {/* Header */}
      <div style={{
        padding: '20px 24px',
        borderBottom: '1px solid rgba(0, 217, 255, 0.15)',
        backgroundColor: 'rgba(10, 20, 35, 0.6)',
      }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 12px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Wine size={28} style={{ color: '#00d9ff' }} />
          Mixology
        </h2>
        <p style={{ margin: 0, fontSize: '12px', color: '#cbd5e1', opacity: 0.7 }}>
          Cocktail recipes and bar management
        </p>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'auto', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            padding: '12px',
            backgroundColor: 'rgba(0, 217, 255, 0.15)',
            border: '1px solid rgba(0, 217, 255, 0.3)',
            borderRadius: '8px',
            color: '#7ff3ff',
            fontSize: '12px',
            fontWeight: '600',
            cursor: 'pointer',
            textTransform: 'uppercase',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(0, 217, 255, 0.25)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(0, 217, 255, 0.15)';
          }}
        >
          <Plus size={16} />
          New Cocktail
        </button>

        {showForm && (
          <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '16px', backgroundColor: 'rgba(30, 41, 59, 0.3)', borderRadius: '8px', border: '1px solid rgba(0, 217, 255, 0.15)' }}>
            <input
              type="text"
              placeholder="Cocktail name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={{
                padding: '8px 12px',
                backgroundColor: 'rgba(15, 23, 42, 0.5)',
                border: '1px solid rgba(0, 217, 255, 0.2)',
                borderRadius: '6px',
                color: '#e2e8f0',
                fontSize: '12px',
              }}
            />
            <input
              type="text"
              placeholder="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              style={{
                padding: '8px 12px',
                backgroundColor: 'rgba(15, 23, 42, 0.5)',
                border: '1px solid rgba(0, 217, 255, 0.2)',
                borderRadius: '6px',
                color: '#e2e8f0',
                fontSize: '12px',
              }}
            />
            <input
              type="text"
              placeholder="ABV %"
              value={formData.abv}
              onChange={(e) => setFormData({ ...formData, abv: e.target.value })}
              style={{
                padding: '8px 12px',
                backgroundColor: 'rgba(15, 23, 42, 0.5)',
                border: '1px solid rgba(0, 217, 255, 0.2)',
                borderRadius: '6px',
                color: '#e2e8f0',
                fontSize: '12px',
              }}
            />
            <button
              type="submit"
              style={{
                padding: '10px',
                backgroundColor: 'rgba(0, 217, 255, 0.2)',
                border: '1px solid rgba(0, 217, 255, 0.4)',
                borderRadius: '6px',
                color: '#00ffff',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                textTransform: 'uppercase',
              }}
            >
              Add Cocktail
            </button>
          </form>
        )}

        {/* Cocktail List */}
        <div style={{ display: 'grid', gap: '8px' }}>
          {cocktails.map((cocktail) => (
            <div
              key={cocktail.id}
              style={{
                padding: '12px',
                backgroundColor: 'rgba(15, 23, 42, 0.4)',
                border: '1px solid rgba(0, 217, 255, 0.15)',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <div style={{ fontSize: '12px', fontWeight: '600', color: '#00ffff' }}>{cocktail.name}</div>
                <div style={{ fontSize: '11px', opacity: 0.7 }}>{cocktail.category} • {cocktail.abv} ABV</div>
              </div>
              <button
                onClick={() => handleDelete(cocktail.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#f87171',
                  cursor: 'pointer',
                  padding: '4px',
                }}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
