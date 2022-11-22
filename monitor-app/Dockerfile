# syntax=docker/dockerfile:1

#FROM node:12.18.1
FROM node:10-alpine

ENV NODE_ENV=production

WORKDIR /app

#COPY ["package.json", "package-lock.json*", "./"]
COPY . .
RUN npm install express
RUN npm install prom-client
RUN npm install request-ip

#COPY . .

CMD [ "node", "index.js" ]