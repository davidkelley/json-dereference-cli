FROM node:18-alpine

COPY . /src
WORKDIR /src
RUN npm install
WORKDIR /work

ENTRYPOINT [ "node", "/src/dereference.js" ]
