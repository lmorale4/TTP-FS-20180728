FROM node:8

WORKDIR /app

ADD . /app

COPY package*.json ./

RUN npm install

Expose 5432


CMD ["npm", "run", "start"]
