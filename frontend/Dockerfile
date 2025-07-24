# Build stage
FROM node:18-alpine AS builder

WORKDIR /app
COPY . .
RUN npm install && npm run build

# Serve with nginx
FROM nginx:alpine

# Copy nginx config
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy built files from build stage
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
