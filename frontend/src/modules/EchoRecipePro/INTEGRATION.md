# EchoRecipePro Integration Guide

## Overview

EchoRecipePro is a comprehensive recipe management system for enterprise hospitality environments. It has been integrated into the LUCCCA platform as a modular, plug-and-play system.

## Module Structure

```
frontend/src/modules/EchoRecipePro/
├── components/          # Reusable UI components
│   ├── CornerBrand.tsx
│   ├── Dropzone.tsx
│   ├── FlipBook.tsx
│   ├── GalleryLightbox.tsx
│   ├── SubtleBottomGlow.tsx
│   ├── TaxonomyPicker.tsx
│   └── panels/          # Specialized panels
├── pages/              # Page-level components
│   ├── Index.tsx       # Main recipe interface
│   ├── NotFound.tsx
│   ├── RecipeEditor.tsx
│   ├── RecipeTemplate.tsx
│   └── sections/       # Page sections
├── hooks/              # Custom React hooks
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── stores/             # State management (Zustand)
│   ├── recipe.ts       # Recipe store
│   ├── recipeImage.ts  # Image management
│   └── beoStore.ts     # BEO (Banquet Event Order) store
├── context/            # React Context providers
├── services/           # API clients
├── utils/              # Utility functions
├── data/               # Data files and schemas
├── styles/             # CSS modules
├── types/              # TypeScript definitions
├── EchoRecipeProPanel.jsx  # Main panel component
└── index.js            # Module exports
```

## API Integration

### Backend Endpoints

All endpoints are prefixed with `/api/echo-recipe-pro`

**Routes Location**: `backend/routes/echoRecipeProRoutes.js`

Implemented routes:
- Recipe CRUD operations
- Search and filtering
- Category management
- Nutrition information

## Panel Registration

The EchoRecipePro panel is registered in `frontend/src/board/Board.jsx`:

```javascript
// Line 70
const EchoRecipeProPanel = safeImport(
  () => import("../components/EchoRecipePro/EchoRecipeProPanel.jsx"), 
  "EchoRecipeProPanel"
);

// Line 153 (in PANEL_REGISTRY)
if (EchoRecipeProPanel) PANEL_REGISTRY.culinary = { 
  title: "Culinary", 
  Component: EchoRecipeProPanel, 
  icon: kitchenIcon 
};

// Line 155 (alternate registry key)
if (EchoRecipeProPanel) PANEL_REGISTRY.recipepro = { 
  title: "Recipes", 
  Component: EchoRecipeProPanel, 
  icon: null 
};
```

## State Management

### Recipe Store (stores/recipe.ts)

Manages:
- Recipe list and cache
- Current recipe being edited
- Filter and search state
- Recipe creation/update/delete operations

### Recipe Image Store (stores/recipeImage.ts)

Manages:
- Recipe images
- Image upload status
- Gallery state

### BEO Store (stores/beoStore.ts)

Manages:
- Banquet Event Order data
- BEO-specific recipe selections

## Development Workflow

### Adding a New Feature

1. Create component in `components/`
2. Add hooks if needed in `hooks/`
3. Update stores in `stores/` if adding state
4. Add API integration in `services/`
5. Import and use in `pages/`

### API Communication

The module communicates with the backend via `/api/echo-recipe-pro` endpoint. All requests should include:
- Authentication headers (if required)
- Content-Type: application/json

Example:
```javascript
const response = await fetch('/api/echo-recipe-pro/recipes', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
});
```

## Integration with Other Modules

### Ordering System

EchoRecipePro integrates with:
- **Maestro BQT** - Production scheduling
- **Purchasing/Storeroom** - Ingredient inventory
- **Commissary** - Multi-outlet ordering

### Role-Based Access

(Future enhancement) The sidebar will be updated to show/hide EchoRecipePro based on user credentials:
- **Culinary staff**: Full access to EchoRecipePro
- **Pastry staff**: Access to EchoRecipePro + CakeBuilder + EchoCanvas
- **Other roles**: Visibility based on permissions

## Performance Considerations

- Components are lazy-loaded via React.lazy() for code splitting
- Store subscriptions are optimized to prevent unnecessary re-renders
- Image loading is optimized via Dropzone component

## Troubleshooting

### Panel not showing
1. Check browser console for import errors
2. Verify `frontend/src/board/Board.jsx` has EchoRecipeProPanel import
3. Confirm PANEL_REGISTRY has culinary or recipepro entry

### API calls failing
1. Check backend server is running (`npm run dev` in root)
2. Verify `/api/echo-recipe-pro` endpoint is registered in `backend/server.js`
3. Check network tab for actual error messages

### State not persisting
1. Verify Zustand store is properly exported
2. Check that components are using the store hook correctly
3. Look for console errors in browser dev tools

## Future Enhancements

- [ ] Database migration from JSON to PostgreSQL
- [ ] Advanced recipe versioning and history
- [ ] Real-time recipe collaboration
- [ ] Batch import/export tools
- [ ] Recipe analytics and insights
- [ ] Equipment API integrations
- [ ] Real-time inventory sync
- [ ] Multi-language support
- [ ] Advanced role-based customizations for Pastry module

## Files Modified

- `frontend/src/components/EchoRecipePro/EchoRecipeProPanel.jsx` - Wrapper component
- `frontend/src/modules/EchoRecipePro/EchoRecipeProPanel.jsx` - Main component
- `frontend/src/board/Board.jsx` - Panel registration (lines 70, 153, 155)
- `backend/server.js` - Route registration (lines 12, 25)
- `backend/routes/echoRecipeProRoutes.js` - Created
- `backend/controllers/echoRecipeProController.js` - Created

## Questions or Issues?

Refer to the individual component/store documentation or review memories in the project history.
