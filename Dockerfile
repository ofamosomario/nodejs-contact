FROM node:14.15.0-alpine3.10

WORKDIR /opt/app

COPY . .

RUN apk add --no-cache git
RUN yarn
RUN yarn build

EXPOSE 8080

CMD ["babel-node", "src/index.js"]
