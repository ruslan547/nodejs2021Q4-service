FROM node:16.13.1

WORKDIR ${WORKDIR}

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE ${PORT}

CMD [ "npm", "start" ]
