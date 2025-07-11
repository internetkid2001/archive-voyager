# Multi-stage build for optimal image size
FROM node:20-alpine AS builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies (including dev dependencies for build)
RUN npm ci --only=production --silent && npm cache clean --force

# Copy package.json again to install dev dependencies for build
COPY package*.json ./
RUN npm ci --silent

# Bundle app source
COPY . .

# Build the app
RUN npm run build

# Production stage
FROM node:20-alpine AS production

# Add a non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Set the working directory in the container
WORKDIR /app

# Install serve globally in production stage
RUN npm install -g serve@14.2.0

# Copy built application from builder stage
COPY --from=builder --chown=nextjs:nodejs /app/dist ./dist

# Switch to non-root user
USER nextjs

# Expose the port the app runs on
EXPOSE 3000

# Add health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# Serve the static files
CMD ["serve", "-s", "dist", "-l", "3000"]
