FROM node:10-alpine

RUN yarn global add parcel-bundler
RUN yarn global add mocha

WORKDIR "/app"

RUN yarn add --dev @babel/preset-env

EXPOSE 1234