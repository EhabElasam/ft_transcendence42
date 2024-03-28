# Use official Node.js image as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the React app into the container
COPY . .

# Expose the port on which React runs
EXPOSE 3000

# Command to run the React app
CMD ["npm", "start"]
