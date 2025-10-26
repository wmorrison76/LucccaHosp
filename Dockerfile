# Multi-stage build for LUCCCA app
FROM node:18-alpine AS builder

WORKDIR /app

# Copy the entire project
COPY . .

# Install root dependencies
RUN npm install --legacy-peer-deps

# Install frontend dependencies and build
WORKDIR /app/frontend
RUN npm install --legacy-peer-deps && npm run build

# Final stage - runtime
FROM node:18-alpine

WORKDIR /app

# Copy the entire project structure
COPY --from=builder /app .

# Install backend dependencies only
WORKDIR /app/backend
RUN npm install --legacy-peer-deps --production

# Set working directory to backend
WORKDIR /app/backend

# Expose port 3000
EXPOSE 3000

# Set environment
ENV NODE_ENV=production
ENV PORT=3000

# Start the backend server
CMD ["node", "server.js"]
