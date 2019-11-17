FROM node:10-alpine
RUN apk update && apk add --no-cache python3
RUN apk update && apk add --virtual build-dependencies build-base gcc wget git
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
USER node
RUN npm install && npm install tsc forever
COPY --chown=node:node . . 
EXPOSE 3003
RUN npm run build
CMD ["node", "build/index.js"]