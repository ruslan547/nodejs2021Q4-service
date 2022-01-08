FROM node:16.13.1

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . ./

EXPOSE ${PORT}

RUN mkdir logs && touch logs/log.txt && touch logs/error-log.txt

CMD [ "npm", "start" ]
