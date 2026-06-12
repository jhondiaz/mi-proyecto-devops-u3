# Stage 1: Build, Test, and Dependency Resolution
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Copy package definitions
COPY package*.json ./

# Install all dependencies (including devDependencies for test runner)
RUN npm ci

# Copy application source code
COPY . .

# Run test suite to guarantee build safety
RUN npm test

# Prune node_modules to keep only production dependencies
RUN npm prune --production

# Stage 2: Minimalist Production Run Environment
FROM node:20-alpine AS production

# Set production environment flags
ENV NODE_ENV=production
ENV PORT=3000

WORKDIR /usr/src/app

# Copy package definitions
COPY package*.json ./

# Copy production node_modules from builder
COPY --from=builder /usr/src/app/node_modules ./node_modules

# Copy application code
COPY src/ ./src/

# Run the container under the non-root node user (Security Hardening)
USER node

# Expose the application port
EXPOSE 3000

# Run the web server
CMD ["node", "src/index.js"]
