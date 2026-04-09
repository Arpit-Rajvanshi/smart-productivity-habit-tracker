# Use the official Node.js 20 slim image as base
FROM node:20-slim

# Create and set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install dependencies (production only)
RUN npm install --omit=dev

# Copy the rest of the application code
COPY . .

# Expose the API port (5000 as configured in src/server.js)
EXPOSE 5000

# Set environment variables (production defaults)
ENV NODE_ENV=production

# Start the application
CMD ["node", "src/server.js"]
