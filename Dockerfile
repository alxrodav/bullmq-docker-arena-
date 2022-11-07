#######################################
################# BASE ################
#######################################

FROM node:lts-alpine AS base

# https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md#handling-kernel-signals
RUN apk --no-cache upgrade && apk add --no-cache tini


#######################################
################ BUILD ################
#######################################

FROM base as build

RUN mkdir /arena
WORKDIR /arena

COPY package*.json .
RUN npm ci --ignore-scripts

COPY tsconfig*.json .
COPY src ./src/

RUN npm run build


########################################
################ RUNNER ################
########################################

FROM base

COPY --from=build /arena/package*.json /arena/
COPY --from=build /arena/build /arena/build/

WORKDIR /arena

RUN npm ci --production --ignore-scripts

EXPOSE 4567

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["npm", "run", "start"]
