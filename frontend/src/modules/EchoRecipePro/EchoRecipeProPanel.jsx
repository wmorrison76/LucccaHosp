import React, { useState } from 'react';

export default function EchoRecipeProPanel() {
  const [activeTab, setActiveTab] = useState('search');
  const [recipes, setRecipes] = useState([
    { id: 1, name: 'Margherita Pizza', category: 'Italian', prep: '15 min', cook: '20 min' },
    { id: 2, name: 'Beef Wellington', category: 'British', prep: '30 min', cook: '45 min' },
    { id: 3, name: 'Coq au Vin', category: 'French', prep: '20 min', cook: '60 min' },
  ]);

  const tabs = [
    { id: 'search', label: '🔎 Recipe Search' },
    { id: 'photos', label: '📸 Photos' },
    { id: 'add', label: '➕ Add Recipe' },
    { id: 'production', label: '🍳 Production' },
    { id: 'techniques', label: '👨‍🍳 Techniques' },
    { id: 'ingredients', label: '🥘 Ingredients' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#f8fafc' }}>
      {/* Tabs Header */}
      <div style={{ display: 'flex', gap: '8px', padding: '16px', borderBottom: '1px solid #e5e7eb', overflowX: 'auto', backgroundColor: '#fff' }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: activeTab === tab.id ? '#3b82f6' : '#f3f4f6',
              color: activeTab === tab.id ? 'white' : '#666',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '13px',
              whiteSpace: 'nowrap'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        {activeTab === 'search' && (
          <div>
            <h2 style={{ margin: '0 0 20px 0', fontSize: '24px', fontWeight: '700' }}>🔎 Recipe Search</h2>
            <input
              type="text"
              placeholder="Search recipes by name or ingredient..."
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                fontSize: '14px',
                marginBottom: '20px',
                boxSizing: 'border-box'
              }}
            />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
              {recipes.map((recipe) => (
                <div
                  key={recipe.id}
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb',
                    padding: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600' }}>{recipe.name}</h3>
                  <p style={{ margin: '0 0 12px 0', fontSize: '13px', color: '#999' }}>{recipe.category}</p>
                  <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: '#666' }}>
                    <span>⏱️ Prep: {recipe.prep}</span>
                    <span>🍳 Cook: {recipe.cook}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'photos' && (
          <div style={{ textAlign: 'center', color: '#999', paddingTop: '40px' }}>
            <p style={{ fontSize: '18px' }}>📸 Photos Section</p>
            <p style={{ fontSize: '14px' }}>Upload and manage recipe photos here</p>
          </div>
        )}

        {activeTab === 'add' && (
          <div style={{ maxWidth: '600px' }}>
            <h2 style={{ margin: '0 0 20px 0', fontSize: '24px', fontWeight: '700' }}>➕ Add New Recipe</h2>
            <input type="text" placeholder="Recipe Name" style={{ width: '100%', marginBottom: '12px', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box' }} />
            <input type="text" placeholder="Category" style={{ width: '100%', marginBottom: '12px', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box' }} />
            <textarea placeholder="Ingredients (one per line)" rows={6} style={{ width: '100%', marginBottom: '12px', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box', fontFamily: 'monospace', fontSize: '12px' }} />
            <button style={{ padding: '10px 24px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>Save Recipe</button>
          </div>
        )}

        {activeTab === 'production' && (
          <div style={{ textAlign: 'center', color: '#999', paddingTop: '40px' }}>
            <p style={{ fontSize: '18px' }}>🍳 Production Planning</p>
            <p style={{ fontSize: '14px' }}>Manage production schedules and batch planning</p>
          </div>
        )}

        {activeTab === 'techniques' && (
          <div style={{ textAlign: 'center', color: '#999', paddingTop: '40px' }}>
            <p style={{ fontSize: '18px' }}>👨‍🍳 Cooking Techniques</p>
            <p style={{ fontSize: '14px' }}>Learn and reference cooking techniques</p>
          </div>
        )}

        {activeTab === 'ingredients' && (
          <div style={{ textAlign: 'center', color: '#999', paddingTop: '40px' }}>
            <p style={{ fontSize: '18px' }}>🥘 Ingredients Database</p>
            <p style={{ fontSize: '14px' }}>Browse nutritional information and ingredients</p>
          </div>
        )}
      </div>
    </div>
  );
}
