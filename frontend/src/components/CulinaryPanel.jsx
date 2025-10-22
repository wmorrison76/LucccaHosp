import React, { useState } from 'react';

export default function CulinaryPanel() {
  const [activeTab, setActiveTab] = useState('recipes');

  // Sample culinary data - this would be replaced with Builder.io content if API access is enabled
  const recipes = [
    { name: 'Classic French Demi-Glace', category: 'Sauce', prep: '4 hours', difficulty: 'Advanced' },
    { name: 'Homemade Pasta Dough', category: 'Pasta', prep: '30 min', difficulty: 'Intermediate' },
    { name: 'Beef Wellington', category: 'Main Course', prep: '3 hours', difficulty: 'Advanced' },
    { name: 'Crème Brûlée', category: 'Dessert', prep: '45 min', difficulty: 'Intermediate' },
    { name: 'Coq au Vin', category: 'Main Course', prep: '2 hours', difficulty: 'Intermediate' },
    { name: 'Soufflé Grand Marnier', category: 'Dessert', prep: '1 hour', difficulty: 'Advanced' },
  ];

  const techniques = [
    { name: 'Sous Vide', description: 'Precision cooking in sealed bags' },
    { name: 'Molecular Gastronomy', description: 'Science-based cooking techniques' },
    { name: 'Charcuterie', description: 'Curing and preserving meats' },
    { name: 'Fermentation', description: 'Traditional preservation methods' },
  ];

  const ingredients = [
    { name: 'Saffron', type: 'Spice', origin: 'Iran', price: 'Premium' },
    { name: 'Truffle Oil', type: 'Oil', origin: 'Europe', price: 'Luxury' },
    { name: 'Uni (Sea Urchin)', type: 'Seafood', origin: 'Japan', price: 'Premium' },
    { name: 'Foie Gras', type: 'Protein', origin: 'France', price: 'Luxury' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'recipes':
        return (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
            {recipes.map((recipe, idx) => (
              <div
                key={idx}
                style={{
                  padding: '16px',
                  backgroundColor: 'rgba(30, 41, 59, 0.5)',
                  borderRadius: '8px',
                  border: '1px solid rgba(148, 163, 184, 0.2)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(30, 58, 138, 0.3)';
                  e.currentTarget.style.borderColor = 'rgba(0, 217, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(30, 41, 59, 0.5)';
                  e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.2)';
                }}
              >
                <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '8px', color: '#00d9ff' }}>
                  {recipe.name}
                </div>
                <div style={{ fontSize: '11px', opacity: 0.7, marginBottom: '8px' }}>
                  <div>{recipe.category}</div>
                  <div style={{ marginTop: '4px' }}>⏱️ {recipe.prep}</div>
                  <div style={{ marginTop: '2px' }}>📊 {recipe.difficulty}</div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'techniques':
        return (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
            {techniques.map((technique, idx) => (
              <div
                key={idx}
                style={{
                  padding: '16px',
                  backgroundColor: 'rgba(30, 41, 59, 0.5)',
                  borderRadius: '8px',
                  border: '1px solid rgba(148, 163, 184, 0.2)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(30, 58, 138, 0.3)';
                  e.currentTarget.style.borderColor = 'rgba(0, 217, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(30, 41, 59, 0.5)';
                  e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.2)';
                }}
              >
                <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '8px', color: '#00d9ff' }}>
                  {technique.name}
                </div>
                <div style={{ fontSize: '11px', opacity: 0.7 }}>
                  {technique.description}
                </div>
              </div>
            ))}
          </div>
        );

      case 'ingredients':
        return (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
            {ingredients.map((ingredient, idx) => (
              <div
                key={idx}
                style={{
                  padding: '16px',
                  backgroundColor: 'rgba(30, 41, 59, 0.5)',
                  borderRadius: '8px',
                  border: '1px solid rgba(148, 163, 184, 0.2)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(30, 58, 138, 0.3)';
                  e.currentTarget.style.borderColor = 'rgba(0, 217, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(30, 41, 59, 0.5)';
                  e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.2)';
                }}
              >
                <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '8px', color: '#00d9ff' }}>
                  {ingredient.name}
                </div>
                <div style={{ fontSize: '11px', opacity: 0.7 }}>
                  <div>Type: {ingredient.type}</div>
                  <div style={{ marginTop: '4px' }}>Origin: {ingredient.origin}</div>
                  <div style={{ marginTop: '2px' }}>Price: {ingredient.price}</div>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#0f172a',
      color: '#e2e8f0',
      fontFamily: 'system-ui, sans-serif',
      height: '100%',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        padding: '20px 24px',
        borderBottom: '1px solid rgba(148, 163, 184, 0.2)',
        flexShrink: 0,
      }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 0 16px 0' }}>
          Culinary Library
        </h2>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {[
            { id: 'recipes', label: '🍽️ Recipes' },
            { id: 'techniques', label: '👨‍🍳 Techniques' },
            { id: 'ingredients', label: '🌶️ Ingredients' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '8px 16px',
                backgroundColor: activeTab === tab.id ? 'rgba(0, 217, 255, 0.2)' : 'rgba(0, 217, 255, 0.08)',
                border: `1px solid ${activeTab === tab.id ? 'rgba(0, 217, 255, 0.5)' : 'rgba(0, 217, 255, 0.15)'}`,
                borderRadius: '6px',
                color: activeTab === tab.id ? '#00d9ff' : '#b0e0ff',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0, 217, 255, 0.15)';
                e.currentTarget.style.borderColor = 'rgba(0, 217, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = activeTab === tab.id ? 'rgba(0, 217, 255, 0.2)' : 'rgba(0, 217, 255, 0.08)';
                e.currentTarget.style.borderColor = activeTab === tab.id ? 'rgba(0, 217, 255, 0.5)' : 'rgba(0, 217, 255, 0.15)';
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{
        flex: 1,
        overflow: 'auto',
        padding: '24px',
      }}>
        {renderContent()}
      </div>
    </div>
  );
}
