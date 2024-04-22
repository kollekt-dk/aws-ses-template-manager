FROM --platform=$BUILDPLATFORM node:21-alpine3.18 as build

WORKDIR /app
COPY . .
RUN npm install


FROM node:21-alpine3.18
WORKDIR /app
COPY --from=build /app /app
EXPOSE 3000

CMD ["node", "server.js"]
