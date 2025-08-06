FROM node:lts-alpine3.22 AS build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM node:lts-alpine3.22
WORKDIR /app
COPY --from=build /app/dist ./dist
ENV PORT=80
EXPOSE 80

CMD ["node", "dist/app/server/server.mjs"]
