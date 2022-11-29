# Step 1 Build the project
FROM node:lts-alpine AS build

WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./
ENV NODE_ENV=production
RUN npm i
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /data/conf/nginx.conf

EXPOSE 80
CMD ["nginx", "-c", "/data/conf/nginx.conf", "-g", "daemon off;"]