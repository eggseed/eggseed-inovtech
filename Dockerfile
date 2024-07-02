# Container image that runs your code
FROM node:20-slim as builder

WORKDIR /usr/src/app


COPY ./package*.json ./
COPY .npmrc ./

RUN npm install

COPY .env ./
COPY . ./

RUN npm run build

EXPOSE 9990

# Run the web service on container startup.
CMD ["node", "./build/src/index.js"]

