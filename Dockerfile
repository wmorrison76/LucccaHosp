FROM node:18-alpine

WORKDIR /app

# Copy only backend files
COPY backend/ ./backend/
COPY frontend/dist/ ./frontend/dist/

# Copy root package files if they exist
COPY package*.json ./

# Install backend dependencies
WORKDIR /app/backend
RUN npm install --legacy-peer-deps

# Set environment
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# Start the backend server
CMD ["node", "server.js"]
