# Use Node.js 18 as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Copy environment variables from .env file
COPY .env* ./

# Set environment variables to disable caching
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_CACHE=false
ENV NEXT_PUBLIC_DISABLE_CACHE=true
ENV NEXT_PUBLIC_TIMESTAMP=$(date +%s)

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the application with cache headers disabled
CMD ["npm", "start"]