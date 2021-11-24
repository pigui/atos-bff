FROM node:16-alpine as node

RUN mkdir app

COPY package.json ./app

WORKDIR ./app

RUN npm install --force

COPY . .

RUN  npm run build

CMD ["node", "dist/main"]
