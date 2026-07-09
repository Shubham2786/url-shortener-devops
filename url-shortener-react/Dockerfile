# Stage 1: Build the React application
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Pass build-time environment variables for Vite compiler
ARG VITE_BACKEND_URL
ARG VITE_SUBDOMAIN_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL
ENV VITE_SUBDOMAIN_URL=$VITE_SUBDOMAIN_URL

RUN npm run build

# Stage 2: Serve using Nginx
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
