############
# BASE IMAGE
############

FROM node:alpine3.10 as base

ENV PATH_TO_APP=/usr/src/app

COPY package.json yarn.lock ./

RUN apk add --update python3 build-base


###################
# DEVELOPMENT IMAGE
###################

FROM base as development

ENV NODE_ENV=development \
    PORT=3000 \
    HOST=0.0.0.0

RUN yarn install

COPY . ./

EXPOSE ${PORT}

CMD yarn dev
