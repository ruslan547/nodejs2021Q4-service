FROM node:16.13.1-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . ./

EXPOSE ${PORT}

RUN mkdir logs && touch logs/log.txt && touch logs/error-log.txt

CMD [ "npm", "run", "start:dev" ]
# CMD [ "npm", "start" ]
