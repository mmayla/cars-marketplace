FROM node:16.13
LABEL MAINTAINER Mohamed Mayla <mohamed.mayla@gmail.com>

RUN yarn global add pm2@latest --silent

WORKDIR /app
COPY package*.json ./

COPY . .

RUN yarn install
RUN yarn build

EXPOSE 8080

CMD ["pm2-runtime", "./config/pm2.json"]
