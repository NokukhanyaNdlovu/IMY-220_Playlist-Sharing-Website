FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Ignore SSL issues and clean npm cache
RUN npm config set strict-ssl false
RUN npm cache clean --force

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Set the working directory for the frontend
WORKDIR /app/frontend

# Install frontend dependencies and build
RUN npm install
RUN npm run build

# Optionally serve your app (if using serve, for example)
# RUN npm install -g serve
# CMD ["serve", "-s", "build"]
