FROM node:23-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8888
CMD ["node", "src/index.js"]
