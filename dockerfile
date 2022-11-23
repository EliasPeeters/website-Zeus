FROM node:18

RUN mkdir /app
WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm i
COPY . .
COPY credentials.json /root/credentials.json
RUN npm run sass2

CMD [ "npm", "start" ]