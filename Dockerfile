# Use an official Node.js runtime as the base image
FROM node:18.15.0

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the entire application to the working directory
COPY . .

# Expose the port on which your application runs (if applicable)
EXPOSE 3000

# Set the command to run your application
CMD [ "npm", "start" ]
