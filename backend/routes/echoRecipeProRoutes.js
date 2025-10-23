import express from 'express';
import {
  getAllRecipes,
  getRecipeById,
  saveRecipe,
  updateRecipe,
  deleteRecipe,
  searchRecipes,
  getRecipeCategories,
  getNutritionInfo,
} from '../controllers/echoRecipeProController.js';

const router = express.Router();

// Recipe endpoints
router.get('/recipes', getAllRecipes);
router.get('/recipes/:id', getRecipeById);
router.post('/recipes', saveRecipe);
router.put('/recipes/:id', updateRecipe);
router.delete('/recipes/:id', deleteRecipe);
router.get('/recipes/search/:query', searchRecipes);

// Category endpoints
router.get('/categories', getRecipeCategories);

// Nutrition endpoints
router.get('/nutrition/:recipeId', getNutritionInfo);

export default router;
