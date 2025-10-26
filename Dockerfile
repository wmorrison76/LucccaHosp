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

# Copy package files first for better layer caching
COPY package.json package-lock.json ./
COPY backend/package.json backend/package-lock.json ./backend/

# Copy the entire project structure
COPY --from=builder /app/frontend/dist ./frontend/dist
COPY --from=builder /app/backend ./backend
COPY --from=builder /app/frontend/src/modules ./frontend/src/modules

# Install backend dependencies
RUN cd /app/backend && npm install --legacy-peer-deps --production

# Set working directory to backend
WORKDIR /app/backend

# Expose port 3000
EXPOSE 3000

# Set environment
ENV NODE_ENV=production
ENV PORT=3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Start the backend server with detailed logging
CMD ["node", "--trace-warnings", "server.js"]
