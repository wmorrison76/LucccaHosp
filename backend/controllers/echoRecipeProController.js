import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const recipesPath = path.resolve(path.join(__dirname, '../data/echo_recipes.json'));
const categoriesPath = path.resolve(path.join(__dirname, '../data/recipe_categories.json'));
const nutritionPath = path.resolve(path.join(__dirname, '../data/nutrition_data.json'));

// Initialize data files if they don't exist
const initializeDataFiles = () => {
  if (!fs.existsSync(recipesPath)) {
    fs.writeFileSync(recipesPath, JSON.stringify([], null, 2));
  }
  if (!fs.existsSync(categoriesPath)) {
    fs.writeFileSync(categoriesPath, JSON.stringify([], null, 2));
  }
  if (!fs.existsSync(nutritionPath)) {
    fs.writeFileSync(nutritionPath, JSON.stringify({}, null, 2));
  }
};

initializeDataFiles();

export function getAllRecipes(req, res) {
  try {
    const data = fs.readFileSync(recipesPath, 'utf-8');
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve recipes', details: error.message });
  }
}

export function getRecipeById(req, res) {
  try {
    const { id } = req.params;
    const data = JSON.parse(fs.readFileSync(recipesPath, 'utf-8'));
    const recipe = data.find(r => r.id === id);
    if (recipe) {
      res.json(recipe);
    } else {
      res.status(404).json({ error: 'Recipe not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve recipe', details: error.message });
  }
}

export function saveRecipe(req, res) {
  try {
    const newRecipe = req.body;
    const data = JSON.parse(fs.readFileSync(recipesPath, 'utf-8'));
    newRecipe.id = newRecipe.id || `recipe_${Date.now()}`;
    data.push(newRecipe);
    fs.writeFileSync(recipesPath, JSON.stringify(data, null, 2));
    res.json({ message: 'Recipe saved successfully', id: newRecipe.id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save recipe', details: error.message });
  }
}

export function updateRecipe(req, res) {
  try {
    const { id } = req.params;
    const updatedRecipe = req.body;
    const data = JSON.parse(fs.readFileSync(recipesPath, 'utf-8'));
    const index = data.findIndex(r => r.id === id);
    if (index !== -1) {
      data[index] = { ...data[index], ...updatedRecipe, id };
      fs.writeFileSync(recipesPath, JSON.stringify(data, null, 2));
      res.json({ message: 'Recipe updated successfully' });
    } else {
      res.status(404).json({ error: 'Recipe not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update recipe', details: error.message });
  }
}

export function deleteRecipe(req, res) {
  try {
    const { id } = req.params;
    const data = JSON.parse(fs.readFileSync(recipesPath, 'utf-8'));
    const filteredData = data.filter(r => r.id !== id);
    if (filteredData.length < data.length) {
      fs.writeFileSync(recipesPath, JSON.stringify(filteredData, null, 2));
      res.json({ message: 'Recipe deleted successfully' });
    } else {
      res.status(404).json({ error: 'Recipe not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete recipe', details: error.message });
  }
}

export function searchRecipes(req, res) {
  try {
    const { query } = req.params;
    const data = JSON.parse(fs.readFileSync(recipesPath, 'utf-8'));
    const results = data.filter(r =>
      r.name?.toLowerCase().includes(query.toLowerCase()) ||
      r.description?.toLowerCase().includes(query.toLowerCase()) ||
      r.ingredients?.some(ing => ing.toLowerCase().includes(query.toLowerCase()))
    );
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Search failed', details: error.message });
  }
}

export function getRecipeCategories(req, res) {
  try {
    const data = fs.readFileSync(categoriesPath, 'utf-8');
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve categories', details: error.message });
  }
}

export function getNutritionInfo(req, res) {
  try {
    const { recipeId } = req.params;
    const data = JSON.parse(fs.readFileSync(nutritionPath, 'utf-8'));
    const nutrition = data[recipeId];
    if (nutrition) {
      res.json(nutrition);
    } else {
      res.status(404).json({ error: 'Nutrition data not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve nutrition data', details: error.message });
  }
}
