FROM node:18

RUN mkdir /app
WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm i
COPY . .
RUN npm run sass2

CMD [ "npm", "start" ]