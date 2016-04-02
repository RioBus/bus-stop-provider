FROM node:5.7.0
ADD . /app
WORKDIR /app
ENTRYPOINT npm start