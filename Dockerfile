FROM node:10-alpine
ARG awsAccessKey
ARG awsSecretKey
RUN apk update && apk add --no-cache python3
RUN apk update && apk add --virtual build-dependencies build-base gcc wget git
RUN apk update && apk add python3
RUN pip3 install s3cmd
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
USER node
RUN npm install && npm install typescript forever
COPY --chown=node:node . . 
EXPOSE 3003
RUN npm run build
RUN mkdir config
RUN s3cmd --access_key=$awsAccessKey --secret_key=$awsSecretKey get --recursive s3://config.tattle.co.in/archive/ config/
CMD ["node", "build/index.js"]