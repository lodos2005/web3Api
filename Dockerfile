FROM node:16
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install
RUN npm install --location=global nodemon
RUN npm install axios
# If you are building your code for production
# RUN npm ci --only=production
COPY . .
EXPOSE 7777
CMD [ "nodemon", "server/index.js" ]
