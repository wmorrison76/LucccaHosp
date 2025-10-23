import React, { useState } from 'react';

export default function EchoRecipeProPanel() {
  const [activeTab, setActiveTab] = useState('recipes');
  const [recipes, setRecipes] = useState([
    { id: 1, name: 'Margherita Pizza', category: 'Italian', servings: 4, prep: '15 min', cook: '20 min' },
    { id: 2, name: 'Beef Wellington', category: 'British', servings: 6, prep: '30 min', cook: '45 min' },
    { id: 3, name: 'Coq au Vin', category: 'French', servings: 4, prep: '20 min', cook: '60 min' },
  ]);

  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRecipe, setNewRecipe] = useState({ name: '', category: '', servings: 4, prep: '', cook: '' });

  const handleAddRecipe = () => {
    if (newRecipe.name.trim()) {
      setRecipes([...recipes, { ...newRecipe, id: Date.now() }]);
      setNewRecipe({ name: '', category: '', servings: 4, prep: '', cook: '' });
      setShowAddForm(false);
      setActiveTab('recipes');
    }
  };

  const handleDeleteRecipe = (id) => {
    setRecipes(recipes.filter(r => r.id !== id));
    setSelectedRecipe(null);
  };

  const menuItems = [
    { id: 'recipes', label: '📖 Recipes', icon: '📖' },
    { id: 'add', label: '➕ Add Recipe', icon: '➕' },
    { id: 'photos', label: '📸 Photos', icon: '📸' },
    { id: 'production', label: '🍳 Production', icon: '🍳' },
    { id: 'techniques', label: '👨‍🍳 Techniques', icon: '👨‍🍳' },
    { id: 'search', label: '🔎 Search', icon: '🔎' },
  ];

  return (
    <div style={{ display: 'flex', height: '100%', backgroundColor: '#f8fafc' }}>
      {/* Sidebar Navigation */}
      <div style={{ width: '200px', backgroundColor: '#fff', borderRight: '1px solid #e5e7eb', overflowY: 'auto' }}>
        <div style={{ padding: '20px', borderBottom: '1px solid #e5e7eb' }}>
          <h2 style={{ margin: 0, fontSize: '16px', fontWeight: '700' }}>🍳 EchoRecipePro</h2>
        </div>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: 'none',
              backgroundColor: activeTab === item.id ? '#eff6ff' : 'transparent',
              borderLeft: activeTab === item.id ? '4px solid #3b82f6' : 'none',
              cursor: 'pointer',
              textAlign: 'left',
              fontSize: '13px',
              fontWeight: activeTab === item.id ? '600' : '500',
              color: '#333',
              transition: 'all 0.2s'
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
        {activeTab === 'recipes' && (
          <div>
            <h1 style={{ margin: '0 0 24px 0', fontSize: '28px', fontWeight: '700' }}>📖 Recipes</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
              {recipes.map((recipe) => (
                <div
                  key={recipe.id}
                  onClick={() => setSelectedRecipe(recipe)}
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    border: selectedRecipe?.id === recipe.id ? '2px solid #3b82f6' : '1px solid #e5e7eb',
                    padding: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: selectedRecipe?.id === recipe.id ? '0 4px 12px rgba(59, 130, 246, 0.1)' : 'none'
                  }}
                >
                  <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#333' }}>{recipe.name}</h3>
                  <p style={{ margin: '4px 0 12px 0', fontSize: '13px', color: '#999' }}>{recipe.category}</p>
                  <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: '#666' }}>
                    <span>👥 {recipe.servings} servings</span>
                    <span>⏱️ {recipe.prep} prep</span>
                  </div>
                </div>
              ))}
            </div>

            {selectedRecipe && (
              <div style={{ marginTop: '32px', backgroundColor: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '700' }}>{selectedRecipe.name}</h2>
                  <button
                    onClick={() => handleDeleteRecipe(selectedRecipe.id)}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#ef4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      fontSize: '13px'
                    }}
                  >
                    🗑 Delete
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
                  <div style={{ backgroundColor: '#f0f9ff', padding: '12px', borderRadius: '6px' }}>
                    <p style={{ margin: '0 0 8px 0', fontSize: '11px', color: '#666', fontWeight: '600', textTransform: 'uppercase' }}>Category</p>
                    <p style={{ margin: 0, fontSize: '16px', fontWeight: '700' }}>{selectedRecipe.category}</p>
                  </div>
                  <div style={{ backgroundColor: '#f0f9ff', padding: '12px', borderRadius: '6px' }}>
                    <p style={{ margin: '0 0 8px 0', fontSize: '11px', color: '#666', fontWeight: '600', textTransform: 'uppercase' }}>Servings</p>
                    <p style={{ margin: 0, fontSize: '16px', fontWeight: '700' }}>{selectedRecipe.servings}</p>
                  </div>
                  <div style={{ backgroundColor: '#f0f9ff', padding: '12px', borderRadius: '6px' }}>
                    <p style={{ margin: '0 0 8px 0', fontSize: '11px', color: '#666', fontWeight: '600', textTransform: 'uppercase' }}>Prep</p>
                    <p style={{ margin: 0, fontSize: '16px', fontWeight: '700' }}>{selectedRecipe.prep}</p>
                  </div>
                  <div style={{ backgroundColor: '#f0f9ff', padding: '12px', borderRadius: '6px' }}>
                    <p style={{ margin: '0 0 8px 0', fontSize: '11px', color: '#666', fontWeight: '600', textTransform: 'uppercase' }}>Cook</p>
                    <p style={{ margin: 0, fontSize: '16px', fontWeight: '700' }}>{selectedRecipe.cook}</p>
                  </div>
                </div>

                <div style={{ padding: '16px', backgroundColor: '#f8fafc', borderRadius: '6px', borderLeft: '4px solid #3b82f6' }}>
                  <p style={{ margin: 0, color: '#666', fontSize: '13px' }}>📝 Recipe details, ingredients, and instructions coming soon...</p>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'add' && (
          <div style={{ maxWidth: '600px' }}>
            <h1 style={{ margin: '0 0 24px 0', fontSize: '28px', fontWeight: '700' }}>➕ Add New Recipe</h1>
            <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
              <input
                type="text"
                placeholder="Recipe Name"
                value={newRecipe.name}
                onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })}
                style={{ width: '100%', marginBottom: '12px', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box', fontSize: '13px' }}
              />
              <input
                type="text"
                placeholder="Category (e.g., Italian, French)"
                value={newRecipe.category}
                onChange={(e) => setNewRecipe({ ...newRecipe, category: e.target.value })}
                style={{ width: '100%', marginBottom: '12px', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box', fontSize: '13px' }}
              />
              <input
                type="text"
                placeholder="Prep Time (e.g., 15 min)"
                value={newRecipe.prep}
                onChange={(e) => setNewRecipe({ ...newRecipe, prep: e.target.value })}
                style={{ width: '100%', marginBottom: '12px', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box', fontSize: '13px' }}
              />
              <input
                type="text"
                placeholder="Cook Time (e.g., 20 min)"
                value={newRecipe.cook}
                onChange={(e) => setNewRecipe({ ...newRecipe, cook: e.target.value })}
                style={{ width: '100%', marginBottom: '16px', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box', fontSize: '13px' }}
              />
              <button
                onClick={handleAddRecipe}
                style={{
                  width: '100%',
                  padding: '10px',
                  backgroundColor: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '13px'
                }}
              >
                Save Recipe
              </button>
            </div>
          </div>
        )}

        {activeTab === 'photos' && (
          <div style={{ textAlign: 'center', paddingTop: '60px', color: '#999' }}>
            <p style={{ fontSize: '20px', fontWeight: '600' }}>📸 Photos Section</p>
            <p style={{ fontSize: '14px' }}>Upload and manage recipe photos here</p>
          </div>
        )}

        {activeTab === 'production' && (
          <div style={{ textAlign: 'center', paddingTop: '60px', color: '#999' }}>
            <p style={{ fontSize: '20px', fontWeight: '600' }}>🍳 Production Planning</p>
            <p style={{ fontSize: '14px' }}>Manage production schedules and batch planning</p>
          </div>
        )}

        {activeTab === 'techniques' && (
          <div style={{ textAlign: 'center', paddingTop: '60px', color: '#999' }}>
            <p style={{ fontSize: '20px', fontWeight: '600' }}>👨‍🍳 Cooking Techniques</p>
            <p style={{ fontSize: '14px' }}>Learn and reference cooking techniques</p>
          </div>
        )}

        {activeTab === 'search' && (
          <div>
            <h1 style={{ margin: '0 0 24px 0', fontSize: '28px', fontWeight: '700' }}>🔎 Recipe Search</h1>
            <input
              type="text"
              placeholder="Search recipes by name or ingredient..."
              style={{
                width: '100%',
                maxWidth: '400px',
                padding: '12px',
                borderRadius: '6px',
                border: '1px solid #d1d5db',
                fontSize: '13px',
                marginBottom: '20px',
                boxSizing: 'border-box'
              }}
            />
            <p style={{ color: '#999', fontSize: '14px' }}>Search functionality coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
}
