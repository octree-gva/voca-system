FROM node:16.13.0-alpine3.14

ARG VERSION
ENV VERSION=${VERSION:-dev} \
    NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=3000\
    DOCKER_EXPOSED_PORT=3000\
    HOME_PATH=/srv/app/frontend\
    ROOT=/srv/app/frontend\
    STRAPI_TOKEN=""\
    ADMIN_JWT_SECRET=""\
    NEXT_STRAPI_TOKEN=""\
    NEXTAUTH_URL=""

WORKDIR $ROOT

RUN apk add --upgrade --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash
RUN echo "{\"version\":\"$VERSION\"}" > $ROOT/VERSION.json

VOLUME $ROOT/node_modules
VOLUME $ROOT/.next

COPY ./docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
COPY . $ROOT

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["start"]