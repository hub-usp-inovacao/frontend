############
# BASE IMAGE
############

FROM node:alpine3.10 as base

ENV PATH_TO_APP=/usr/src/app \
    PORT=3000 \
    HOST=0.0.0.0

WORKDIR ${PATH_TO_APP}

COPY package.json yarn.lock ./

RUN apk add --update python2 python3 build-base

EXPOSE ${PORT}


###################
# DEVELOPMENT IMAGE
###################

FROM base as development

ENV NODE_ENV=development

RUN yarn install

COPY . ./

CMD yarn dev



####################
# PROD IMAGE
####################

FROM base as production

ENV NODE_ENV=production

RUN yarn install

COPY . ./

RUN yarn build

CMD yarn start
