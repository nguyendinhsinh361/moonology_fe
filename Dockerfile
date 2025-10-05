# Stage 1: Dependencies
FROM node:18-alpine AS deps
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install ALL dependencies (remove --production flag for build stage)
RUN npm ci

# Stage 2: Builder
FROM node:18-alpine AS builder
WORKDIR /app

# Copy dependencies
COPY --from=deps /app/node_modules ./node_modules

# Copy package files
COPY package.json package-lock.json ./

# Copy the rest of the application
COPY . .

# Copy environment variables from .env file
COPY .env* ./

# Build the application
RUN npm run build

# Stage 3: Runner
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Install only production dependencies for runtime
COPY package.json package-lock.json ./
RUN npm ci --production

# Copy necessary files from builder
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.env* ./

# Expose the port the app runs on
EXPOSE 3000

# Start the application with optimized settings
CMD ["node_modules/.bin/next", "start", "--port", "3000", "--hostname", "0.0.0.0"]