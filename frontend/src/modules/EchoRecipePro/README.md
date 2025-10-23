# EchoRecipePro Module

A modular, enterprise-grade recipe management system designed for resort hospitality environments.

## Structure

```
EchoRecipePro/
├── components/        # Reusable UI components
├── pages/            # Page-level components
├── hooks/            # Custom React hooks
├── context/          # React Context providers
├── stores/           # State management (Zustand, Redux, etc.)
├── data/             # Data files, JSON schemas, fixtures
├── utils/            # Utility functions
├── services/         # API client services
├── styles/           # CSS modules and stylesheets
├── types/            # TypeScript type definitions
├── index.js          # Module entry point
├── EchoRecipeProPanel.jsx  # Main panel component
└── README.md         # This file
```

## Features

- Recipe creation and management
- Ingredient tracking
- Nutrition information
- Recipe categorization
- Full-text search
- Multi-outlet support
- User role-based access control

## API Endpoints

All endpoints are prefixed with `/api/echo-recipe-pro`

### Recipes
- `GET /recipes` - Get all recipes
- `GET /recipes/:id` - Get recipe by ID
- `POST /recipes` - Create new recipe
- `PUT /recipes/:id` - Update recipe
- `DELETE /recipes/:id` - Delete recipe
- `GET /recipes/search/:query` - Search recipes

### Categories
- `GET /categories` - Get all recipe categories

### Nutrition
- `GET /nutrition/:recipeId` - Get nutrition data for recipe

## Data Files

Backend data is stored in JSON files:
- `backend/data/echo_recipes.json` - Recipe storage
- `backend/data/recipe_categories.json` - Category definitions
- `backend/data/nutrition_data.json` - Nutrition information

## Integration

The EchoRecipePro module integrates with:
- **Board.jsx** - Panel registry (culinary and recipepro keys)
- **Sidebar.jsx** - Navigation and access control
- **Authentication** - Role-based access (authMiddleware)
- **Other modules** - Commissary system, Maestro BQT, Storeroom

## Future Enhancements

- [ ] Database migration from JSON to PostgreSQL
- [ ] Advanced recipe versioning
- [ ] Recipe collaboration features
- [ ] Batch import/export tools
- [ ] Recipe analytics and insights
- [ ] Integration with kitchen equipment APIs
- [ ] Real-time inventory sync
- [ ] Multi-language support
- [ ] Baker role-specific customizations

## Modular Design

This module is designed as a **plug-and-play** component that can be:
1. Extended with new features
2. Replaced with alternative implementations
3. Deployed independently
4. Reused across multiple outlets
5. Integrated with the security and damage control system

## Development

To add new components:
1. Create in appropriate subdirectory (components/, pages/, hooks/, etc.)
2. Export from `index.js`
3. Update this README with changes
4. Maintain modular structure for future scalability
