import React, { useState, useEffect } from 'react';

export default function EchoRecipeProPanel() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/echo-recipe-pro/recipes');
      if (!response.ok) throw new Error('Failed to load recipes');
      const data = await response.json();
      setRecipes(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full p-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-auto">
      <h2 className="text-3xl font-bold mb-6">EchoRecipePro</h2>

      {loading && (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 mb-6">
          <p className="text-red-200">Error: {error}</p>
        </div>
      )}

      {!loading && recipes.length === 0 && (
        <div className="bg-blue-500/20 border border-blue-500 rounded-lg p-6 text-center">
          <p className="text-blue-200 mb-4">No recipes found</p>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition">
            Create Recipe
          </button>
        </div>
      )}

      {!loading && recipes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-slate-700/50 border border-slate-600 rounded-lg p-4 hover:border-blue-500 transition cursor-pointer"
            >
              <h3 className="text-lg font-semibold mb-2">{recipe.name}</h3>
              <p className="text-sm text-gray-300 mb-3">{recipe.description}</p>
              <div className="flex gap-2">
                <button className="flex-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm transition">
                  Edit
                </button>
                <button className="flex-1 px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm transition">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
