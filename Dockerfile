# Stage 1: Builder
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install ALL dependencies including dev dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Tạo thư mục public nếu chưa tồn tại
RUN mkdir -p public

# Build the application
RUN npm run build

# Stage 2: Runner
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Tạo thư mục public
RUN mkdir -p public

# Copy necessary files from builder
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json

# Chỉ copy thư mục public nếu nó tồn tại và không trống
COPY --from=builder /app/public ./public 2>/dev/null || true

# Copy các file env
COPY --from=builder /app/.env* ./ 2>/dev/null || true

# Install only production dependencies
RUN npm ci --omit=dev

# Expose the port the app runs on
EXPOSE 3000

# Start the application with optimized settings
CMD ["npm", "start"]