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
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]