FROM node:alpine

WORKDIR /app

RUN apk update

RUN apk add bash

COPY package.json ./

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]