FROM node:16.13.1

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE ${PORT}

VOLUME [ "/app/logs" ]

CMD [ "npm", "start" ]
