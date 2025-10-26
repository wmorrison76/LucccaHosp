FROM node:18-alpine

WORKDIR /app

# Copy everything
COPY . .

# Install all dependencies
RUN npm install --legacy-peer-deps

# Build the frontend
WORKDIR /app/frontend
RUN npm run build

# Install backend dependencies
WORKDIR /app/backend
RUN npm install --legacy-peer-deps --production

# Set environment
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# Start the backend server from /app/backend
CMD ["node", "server.js"]
