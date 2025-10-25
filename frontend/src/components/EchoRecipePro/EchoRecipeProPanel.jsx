import React, { useState, useCallback, useMemo } from 'react';
import {
  Search, Plus, BookOpen, Utensils, Clock, ChefHat, Download, Share2,
  Star, Eye, Edit, Trash2, X, Filter, Grid, List, TrendingUp, Settings
} from 'lucide-react';

/**
 * EchoRecipePro Panel - Complete Culinary Recipe Management
 * Features: Recipe search, management, techniques, ingredients, production
 * Integration: Works as sidebar panel in Board.jsx
 */
export default function EchoRecipeProPanel() {
  const [viewMode, setViewMode] = useState('recipes'); // recipes, techniques, ingredients, production
  const [displayFormat, setDisplayFormat] = useState('grid'); // grid or list
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipes, setRecipes] = useState([
    {
      id: 1,
      name: 'Classic Beef Wellington',
      category: 'Main Course',
      prep: 120,
      cook: 45,
      servings: 4,
      difficulty: 'Advanced',
      featured: true,
      image: '🥩',
      rating: 4.8,
      steps: ['Sear beef', 'Prepare duxelles', 'Wrap in pastry', 'Bake'],
    },
    {
      id: 2,
      name: 'Coq au Vin',
      category: 'Main Course',
      prep: 30,
      cook: 90,
      servings: 6,
      difficulty: 'Intermediate',
      featured: true,
      image: '🍗',
      rating: 4.6,
      steps: ['Brown chicken', 'Sauté vegetables', 'Add wine', 'Braise'],
    },
    {
      id: 3,
      name: 'French Onion Soup',
      category: 'Soup',
      prep: 20,
      cook: 60,
      servings: 4,
      difficulty: 'Easy',
      featured: false,
      image: '🍲',
      rating: 4.5,
      steps: ['Slice onions', 'Caramelize', 'Add stock', 'Top with cheese'],
    },
    {
      id: 4,
      name: 'Hollandaise Sauce',
      category: 'Sauce',
      prep: 5,
      cook: 10,
      servings: 8,
      difficulty: 'Intermediate',
      featured: true,
      image: '🍯',
      rating: 4.7,
      steps: ['Whisk yolks', 'Add butter slowly', 'Season to taste'],
    },
  ]);

  const [techniques, setTechniques] = useState([
    { id: 1, name: 'Sous Vide', description: 'Precise temperature cooking in sealed bags', difficulty: 'Advanced' },
    { id: 2, name: 'Mise en Place', description: 'Organization of ingredients before cooking', difficulty: 'Beginner' },
    { id: 3, name: 'Brunoise', description: '1/8 inch cube knife cut', difficulty: 'Intermediate' },
    { id: 4, name: 'Chiffonade', description: 'Thin ribbon cuts of herbs/vegetables', difficulty: 'Intermediate' },
  ]);

  const [ingredients, setIngredients] = useState([
    { id: 1, name: 'Beef Tenderloin', unit: 'lbs', cost: 25, quantity: 1 },
    { id: 2, name: 'Puff Pastry', unit: 'sheets', cost: 8, quantity: 1 },
    { id: 3, name: 'Shallots', unit: 'lbs', cost: 3, quantity: 0.5 },
    { id: 4, name: 'Mushrooms', unit: 'lbs', cost: 4, quantity: 1 },
  ]);

  const [productions, setProductions] = useState([
    { id: 1, recipeName: 'Beef Wellington', date: '2024-08-15', status: 'Completed', yield: 4, notes: 'Perfect crust' },
    { id: 2, recipeName: 'Coq au Vin', date: '2024-08-14', status: 'In Progress', yield: 6, notes: 'Good depth of flavor' },
  ]);

  // Search and filter
  const filteredRecipes = useMemo(() => {
    return recipes.filter(r =>
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [recipes, searchQuery]);

  const filteredTechniques = useMemo(() => {
    return techniques.filter(t =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [techniques, searchQuery]);

  const handleAddRecipe = useCallback(() => {
    const newRecipe = {
      id: Math.max(...recipes.map(r => r.id), 0) + 1,
      name: 'New Recipe',
      category: 'Main Course',
      prep: 30,
      cook: 45,
      servings: 4,
      difficulty: 'Intermediate',
      featured: false,
      image: '���️',
      rating: 0,
      steps: [],
    };
    setRecipes([...recipes, newRecipe]);
  }, [recipes]);

  const handleDeleteRecipe = useCallback((id) => {
    setRecipes(recipes.filter(r => r.id !== id));
    if (selectedRecipe?.id === id) setSelectedRecipe(null);
  }, [recipes, selectedRecipe]);

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'var(--bg-secondary, #f5f5f5)',
      overflow: 'hidden',
      fontFamily: 'system-ui, sans-serif',
    }}>
      {/* HEADER */}
      <div style={{
        padding: '16px',
        borderBottom: '1px solid var(--border-color, #e0e0e0)',
        backgroundColor: 'var(--bg-primary, #fff)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ChefHat size={24} style={{ color: '#c41e3a' }} />
          <h1 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#333' }}>
            EchoRecipePro
          </h1>
        </div>
        <button
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            color: '#666',
          }}
          title="Settings"
        >
          <Settings size={20} />
        </button>
      </div>

      {/* SEARCH BAR */}
      <div style={{
        padding: '12px 16px',
        borderBottom: '1px solid var(--border-color, #e0e0e0)',
        display: 'flex',
        gap: '8px',
      }}>
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: 'rgba(0,0,0,0.05)',
          borderRadius: '6px',
          padding: '0 12px',
        }}>
          <Search size={16} style={{ color: '#999' }} />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search recipes..."
            style={{
              flex: 1,
              border: 'none',
              background: 'none',
              padding: '8px 0',
              fontSize: '13px',
              outline: 'none',
            }}
          />
        </div>
        <button
          onClick={handleAddRecipe}
          style={{
            padding: '8px 12px',
            backgroundColor: '#c41e3a',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '12px',
            fontWeight: '500',
          }}
        >
          <Plus size={16} /> Add
        </button>
      </div>

      {/* VIEW MODE TABS */}
      <div style={{
        padding: '8px 16px',
        borderBottom: '1px solid var(--border-color, #e0e0e0)',
        display: 'flex',
        gap: '4px',
        overflowX: 'auto',
      }}>
        {[
          { id: 'recipes', label: '📖 Recipes', icon: BookOpen },
          { id: 'techniques', label: '🎓 Techniques', icon: Utensils },
          { id: 'ingredients', label: '🥕 Ingredients', icon: Utensils },
          { id: 'production', label: '⏱️ Production', icon: Clock },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setViewMode(tab.id)}
            style={{
              padding: '6px 12px',
              backgroundColor: viewMode === tab.id ? '#c41e3a' : 'transparent',
              color: viewMode === tab.id ? 'white' : '#666',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: '500',
              whiteSpace: 'nowrap',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* CONTENT AREA */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '16px',
      }}>
        {viewMode === 'recipes' && (
          <div>
            {/* Format toggle */}
            <div style={{ marginBottom: '16px', display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setDisplayFormat('grid')}
                style={{
                  padding: '6px 12px',
                  backgroundColor: displayFormat === 'grid' ? '#f0f0f0' : 'transparent',
                  border: '1px solid var(--border-color, #e0e0e0)',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                <Grid size={16} />
              </button>
              <button
                onClick={() => setDisplayFormat('list')}
                style={{
                  padding: '6px 12px',
                  backgroundColor: displayFormat === 'list' ? '#f0f0f0' : 'transparent',
                  border: '1px solid var(--border-color, #e0e0e0)',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                <List size={16} />
              </button>
            </div>

            {/* Recipes display */}
            {displayFormat === 'grid' ? (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                gap: '12px',
              }}>
                {filteredRecipes.map(recipe => (
                  <div
                    key={recipe.id}
                    onClick={() => setSelectedRecipe(recipe)}
                    style={{
                      border: '1px solid var(--border-color, #e0e0e0)',
                      borderRadius: '8px',
                      padding: '12px',
                      cursor: 'pointer',
                      backgroundColor: selectedRecipe?.id === recipe.id ? '#f5f5f5' : 'white',
                      transition: 'all 0.2s',
                    }}
                  >
                    <div style={{ fontSize: '32px', marginBottom: '8px', textAlign: 'center' }}>
                      {recipe.image}
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: '#333', marginBottom: '4px' }}>
                      {recipe.name}
                    </div>
                    <div style={{ fontSize: '11px', color: '#999', marginBottom: '8px' }}>
                      {recipe.category}
                    </div>
                    <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
                      ⏱️ {recipe.prep}+{recipe.cook}min
                    </div>
                    {recipe.featured && (
                      <div style={{ color: '#c41e3a' }}>
                        <Star size={14} style={{ fill: '#c41e3a' }} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {filteredRecipes.map(recipe => (
                  <div
                    key={recipe.id}
                    onClick={() => setSelectedRecipe(recipe)}
                    style={{
                      padding: '12px',
                      border: '1px solid var(--border-color, #e0e0e0)',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      backgroundColor: selectedRecipe?.id === recipe.id ? '#f5f5f5' : 'white',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                    }}
                  >
                    <div style={{ fontSize: '24px' }}>{recipe.image}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '600', color: '#333' }}>{recipe.name}</div>
                      <div style={{ fontSize: '12px', color: '#999' }}>
                        {recipe.category} • {recipe.difficulty} • {recipe.servings} servings
                      </div>
                    </div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      {recipe.prep + recipe.cook}min
                    </div>
                    {recipe.featured && <Star size={16} style={{ color: '#c41e3a', fill: '#c41e3a' }} />}
                  </div>
                ))}
              </div>
            )}

            {/* Recipe detail panel */}
            {selectedRecipe && (
              <div style={{
                marginTop: '16px',
                padding: '16px',
                border: '2px solid #c41e3a',
                borderRadius: '8px',
                backgroundColor: '#fff9f9',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                  <div>
                    <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '700' }}>
                      {selectedRecipe.name}
                    </h3>
                    <div style={{ fontSize: '12px', color: '#666', marginBottom: '12px' }}>
                      {selectedRecipe.category} • {selectedRecipe.difficulty}
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedRecipe(null)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    <X size={20} />
                  </button>
                </div>

                <div style={{ fontSize: '12px', color: '#666', marginBottom: '12px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                  <div>
                    <div style={{ fontWeight: '600' }}>Prep</div>
                    <div>{selectedRecipe.prep} min</div>
                  </div>
                  <div>
                    <div style={{ fontWeight: '600' }}>Cook</div>
                    <div>{selectedRecipe.cook} min</div>
                  </div>
                  <div>
                    <div style={{ fontWeight: '600' }}>Servings</div>
                    <div>{selectedRecipe.servings}</div>
                  </div>
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <div style={{ fontWeight: '600', marginBottom: '8px', fontSize: '12px' }}>Steps:</div>
                  <ol style={{ margin: 0, paddingLeft: '20px', fontSize: '12px', color: '#666' }}>
                    {selectedRecipe.steps?.map((step, idx) => (
                      <li key={idx} style={{ marginBottom: '4px' }}>{step}</li>
                    ))}
                  </ol>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button style={{
                    flex: 1, padding: '8px', backgroundColor: '#c41e3a', color: 'white',
                    border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: '500'
                  }}>
                    <Edit size={14} style={{ marginRight: '4px' }} /> Edit
                  </button>
                  <button style={{
                    flex: 1, padding: '8px', backgroundColor: '#f0f0f0', color: '#333',
                    border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: '500'
                  }}>
                    <Download size={14} style={{ marginRight: '4px' }} /> Export
                  </button>
                  <button
                    onClick={() => handleDeleteRecipe(selectedRecipe.id)}
                    style={{
                      flex: 1, padding: '8px', backgroundColor: '#ffe0e0', color: '#c41e3a',
                      border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: '500'
                    }}>
                    <Trash2 size={14} style={{ marginRight: '4px' }} /> Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {viewMode === 'techniques' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '12px' }}>
            {filteredTechniques.map(technique => (
              <div
                key={technique.id}
                style={{
                  padding: '12px',
                  border: '1px solid var(--border-color, #e0e0e0)',
                  borderRadius: '6px',
                  backgroundColor: 'white',
                }}
              >
                <div style={{ fontWeight: '600', marginBottom: '8px', color: '#333' }}>{technique.name}</div>
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>{technique.description}</div>
                <div style={{
                  display: 'inline-block',
                  padding: '4px 8px',
                  backgroundColor: '#f0f0f0',
                  borderRadius: '3px',
                  fontSize: '11px',
                  fontWeight: '500',
                  color: '#666',
                }}>
                  {technique.difficulty}
                </div>
              </div>
            ))}
          </div>
        )}

        {viewMode === 'ingredients' && (
          <div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-color, #e0e0e0)' }}>
                  <th style={{ textAlign: 'left', padding: '8px', fontWeight: '600', fontSize: '12px' }}>Ingredient</th>
                  <th style={{ textAlign: 'right', padding: '8px', fontWeight: '600', fontSize: '12px' }}>Qty/Unit</th>
                  <th style={{ textAlign: 'right', padding: '8px', fontWeight: '600', fontSize: '12px' }}>Cost</th>
                </tr>
              </thead>
              <tbody>
                {ingredients.map(ing => (
                  <tr key={ing.id} style={{ borderBottom: '1px solid var(--border-color, #e0e0e0)' }}>
                    <td style={{ padding: '8px', fontSize: '12px' }}>{ing.name}</td>
                    <td style={{ textAlign: 'right', padding: '8px', fontSize: '12px' }}>{ing.quantity} {ing.unit}</td>
                    <td style={{ textAlign: 'right', padding: '8px', fontSize: '12px' }}>${ing.cost.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {viewMode === 'production' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {productions.map(prod => (
              <div
                key={prod.id}
                style={{
                  padding: '12px',
                  border: '1px solid var(--border-color, #e0e0e0)',
                  borderRadius: '6px',
                  backgroundColor: 'white',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div style={{ fontWeight: '600', color: '#333' }}>{prod.recipeName}</div>
                  <span style={{
                    padding: '2px 8px',
                    borderRadius: '3px',
                    fontSize: '11px',
                    fontWeight: '500',
                    backgroundColor: prod.status === 'Completed' ? '#e8f5e9' : '#fff3cd',
                    color: prod.status === 'Completed' ? '#27ae60' : '#f39c12',
                  }}>
                    {prod.status}
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
                  {prod.date} • Yield: {prod.yield}
                </div>
                <div style={{ fontSize: '12px', color: '#999', fontStyle: 'italic' }}>
                  {prod.notes}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
