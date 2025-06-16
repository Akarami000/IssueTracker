FROM node:20-alpine

WORKDIR /app

# Copy schema.prisma first so that postinstall can find it (if defined)
COPY prisma ./prisma/
# COPY .env ./

# Copy package files
COPY package*.json ./

# Install deps (can trigger prisma generate if you use postinstall)
RUN npm install

# Optional: run generate manually in case postinstall didn't catch it
RUN npx prisma generate

# Copy all source code AFTER deps (to use layer cache)
COPY . .

EXPOSE 3000
CMD ["node", "src/index.js"]