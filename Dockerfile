FROM node:10-alpine

WORKDIR /usr/src/app
RUN npm install -g http-server
COPY . .
EXPOSE 8080
CMD ["http-server", "-c-1"]

