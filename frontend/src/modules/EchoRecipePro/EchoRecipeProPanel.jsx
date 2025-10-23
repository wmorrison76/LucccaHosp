import React, { useState } from 'react';

export default function EchoRecipeProPanel() {
  const [recipes, setRecipes] = useState([
    { id: 1, name: 'Margherita Pizza', category: 'Italian', servings: 4, difficulty: 'Easy' },
    { id: 2, name: 'Beef Wellington', category: 'British', servings: 6, difficulty: 'Hard' },
    { id: 3, name: 'Coq au Vin', category: 'French', servings: 4, difficulty: 'Medium' },
  ]);
  
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newRecipe, setNewRecipe] = useState({ name: '', category: '', servings: 4, difficulty: 'Easy' });

  const handleAddRecipe = () => {
    if (newRecipe.name.trim()) {
      setRecipes([...recipes, { ...newRecipe, id: Date.now() }]);
      setNewRecipe({ name: '', category: '', servings: 4, difficulty: 'Easy' });
      setShowForm(false);
    }
  };

  const handleDeleteRecipe = (id) => {
    setRecipes(recipes.filter(r => r.id !== id));
    setSelectedRecipe(null);
  };

  return (
    <div style={{ display: 'flex', height: '100%', backgroundColor: '#f8fafc', color: '#1f2937' }}>
      {/* Sidebar - Recipe List */}
      <div style={{ width: '300px', borderRight: '1px solid #e5e7eb', overflowY: 'auto', backgroundColor: '#fff' }}>
        <div style={{ padding: '20px', borderBottom: '1px solid #e5e7eb' }}>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>🍳 Recipes</h2>
          <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#999' }}>{recipes.length} recipes</p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            width: 'calc(100% - 20px)',
            margin: '10px 10px',
            padding: '12px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '14px'
          }}
        >
          {showForm ? '✖ Cancel' : '+ Add Recipe'}
        </button>

        {showForm && (
          <div style={{ padding: '15px', borderBottom: '1px solid #e5e7eb', backgroundColor: '#f0f9ff' }}>
            <input
              type="text"
              placeholder="Recipe name"
              value={newRecipe.name}
              onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })}
              style={{ width: '100%', marginBottom: '8px', padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db', fontSize: '12px' }}
            />
            <input
              type="text"
              placeholder="Category"
              value={newRecipe.category}
              onChange={(e) => setNewRecipe({ ...newRecipe, category: e.target.value })}
              style={{ width: '100%', marginBottom: '8px', padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db', fontSize: '12px' }}
            />
            <button
              onClick={handleAddRecipe}
              style={{
                width: '100%',
                padding: '8px',
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: '600'
              }}
            >
              Save Recipe
            </button>
          </div>
        )}

        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            onClick={() => setSelectedRecipe(recipe)}
            style={{
              padding: '15px',
              borderBottom: '1px solid #e5e7eb',
              cursor: 'pointer',
              backgroundColor: selectedRecipe?.id === recipe.id ? '#eff6ff' : '#fff',
              borderLeft: selectedRecipe?.id === recipe.id ? '4px solid #3b82f6' : 'none'
            }}
          >
            <p style={{ margin: 0, fontWeight: '600', fontSize: '14px' }}>{recipe.name}</p>
            <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#999' }}>{recipe.category}</p>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        {selectedRecipe ? (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <div>
                <h1 style={{ margin: 0, fontSize: '32px', fontWeight: '700' }}>{selectedRecipe.name}</h1>
                <p style={{ margin: '5px 0 0 0', color: '#666', fontSize: '14px' }}>Category: {selectedRecipe.category}</p>
              </div>
              <button
                onClick={() => {
                  handleDeleteRecipe(selectedRecipe.id);
                }}
                style={{
                  padding: '10px 16px',
                  backgroundColor: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600'
                }}
              >
                🗑 Delete
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '30px' }}>
              <div style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                <p style={{ margin: 0, color: '#666', fontSize: '12px', textTransform: 'uppercase', fontWeight: '600' }}>Servings</p>
                <p style={{ margin: '8px 0 0 0', fontSize: '24px', fontWeight: '700' }}>{selectedRecipe.servings}</p>
              </div>
              <div style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                <p style={{ margin: 0, color: '#666', fontSize: '12px', textTransform: 'uppercase', fontWeight: '600' }}>Difficulty</p>
                <p style={{ margin: '8px 0 0 0', fontSize: '24px', fontWeight: '700', color: selectedRecipe.difficulty === 'Easy' ? '#10b981' : selectedRecipe.difficulty === 'Medium' ? '#f59e0b' : '#ef4444' }}>{selectedRecipe.difficulty}</p>
              </div>
              <div style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                <p style={{ margin: 0, color: '#666', fontSize: '12px', textTransform: 'uppercase', fontWeight: '600' }}>Status</p>
                <p style={{ margin: '8px 0 0 0', fontSize: '20px' }}>✅ Active</p>
              </div>
            </div>

            <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
              <h3 style={{ margin: 0, marginBottom: '15px', fontSize: '18px', fontWeight: '600' }}>Recipe Details</h3>
              <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}>
                This is a template for the {selectedRecipe.name} recipe. Add ingredients, instructions, and nutritional information here.
              </p>
              <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#f3f4f6', borderRadius: '4px', fontSize: '12px', color: '#666' }}>
                📝 Full recipe editor coming soon...
              </div>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', color: '#999' }}>
            <p style={{ fontSize: '16px' }}>👈 Select a recipe to view details</p>
          </div>
        )}
      </div>
    </div>
  );
}
