FROM node:16.15.1-alpine as build

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build --prod

#Segunda etapa

FROM nginx:1.17.1-alpine AS prod-stage

COPY --from=build /app/dist/tienda-cosmeticos /usr/share/nginx/html

EXPOSE 80

CMD [ "nginx","-g","daemon off;" ]
