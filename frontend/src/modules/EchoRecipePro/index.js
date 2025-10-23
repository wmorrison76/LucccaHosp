// EchoRecipePro Module Exports
// Main entry point for the EchoRecipePro recipe management system

// Panel component
export { default as EchoRecipeProPanel } from './EchoRecipeProPanel.jsx';

// Page components
export { default as RecipePage } from './pages/Index.tsx';
export { default as RecipeEditor } from './pages/RecipeEditor.tsx';
export { default as RecipeTemplate } from './pages/RecipeTemplate.tsx';

// Stores (State Management)
export { useRecipeStore } from './stores/recipe.ts';
export { useRecipeImageStore } from './stores/recipeImage.ts';
export { useBEOStore } from './stores/beoStore.ts';

// Hooks
export { useToast } from './hooks/use-toast.ts';
export { useIsMobile } from './hooks/use-mobile.tsx';

// Version info
export const MODULE_INFO = {
  name: 'EchoRecipePro',
  version: '1.0.0',
  description: 'Enterprise recipe management system for hospitality',
  author: 'LUCCCA Development Team',
  lastUpdated: new Date().toISOString()
};
