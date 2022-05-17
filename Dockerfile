FROM node:16-alpine

WORKDIR /app

RUN apk --update --no-cache add sqlite

RUN npm i -g @nestjs/cli

