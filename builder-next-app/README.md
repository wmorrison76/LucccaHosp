# Builder Next App

## Overview
This project is a Next.js application that integrates with Builder.io to fetch and display dynamic content. It serves as a template for building applications that leverage Builder.io's powerful content management capabilities.

## Project Structure
```
builder-next-app
├── .vscode
│   ├── extensions.json
│   └── settings.json
├── src
│   ├── pages
│   │   ├── _app.tsx
│   │   └── index.tsx
│   ├── components
│   │   └── BuilderContent.tsx
│   ├── lib
│   │   └── builder.ts
│   └── styles
│       └── globals.css
├── .env.local
├── .gitignore
├── package.json
├── next.config.js
├── tsconfig.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (version 14 or later)
- npm (Node Package Manager)

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd builder-next-app
   ```
3. Install the dependencies:
   ```
   npm install
   ```

### Environment Variables
Create a `.env.local` file in the root of the project and add your Builder.io API key and any other necessary environment variables:
```
BUILDER_API_KEY=your_api_key_here
```

### Running the Application
To start the development server, run:
```
npm run dev
```
The application will be available at `http://localhost:3000`.

### Building for Production
To build the application for production, run:
```
npm run build
```
Then, you can start the production server with:
```
npm start
```

## Usage
- The main entry point of the application is located in `src/pages/index.tsx`.
- The custom App component is defined in `src/pages/_app.tsx`, which wraps all pages and can be used to initialize global styles or state.
- The `BuilderContent` component in `src/components/BuilderContent.tsx` fetches and displays content from Builder.io.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.