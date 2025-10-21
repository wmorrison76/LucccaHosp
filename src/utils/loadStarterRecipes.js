// src/utils/loadStarterRecipes.js
export const loadStarterRecipes = async () => {
  const filenames = ["French_Onion_Soup.json", "Lemon_Tart.json"];
  const recipes = [];

  for (const name of filenames) {
    try {
      const response = await fetch(`/data/starter-recipes/${name}`);
      const json = await response.json();
      recipes.push(json);
    } catch (error) {
      console.error(`❌ Failed to load ${name}:`, error);
    }
  }

  return recipes;
};
