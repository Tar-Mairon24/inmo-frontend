FROM node:24-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci 

COPY . .

ARG VITE_API_URL=http://localhost/

ENV VITE_API_URL=$VITE_API_URL

RUN npm run build


FROM nginx:1.29.1-alpine AS deployment

RUN apk update && apk upgrade

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]