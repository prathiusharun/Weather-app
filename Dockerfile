# 1. Use a lightweight version of Node
FROM node:20-alpine AS base

# 2. Set the working directory
WORKDIR /app

# 3. Copy only the "Recipe" first to save time
COPY package.json package-lock.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy the "Ingredients" (your code)
COPY . .

# 6. Build the Next.js app for production
RUN npm run build

# 7. Start the server
EXPOSE 3000
CMD ["npm", "start"]