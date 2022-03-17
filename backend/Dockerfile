FROM node:16.14.0-alpine3.14

ARG VERSION

# TODO Set this in Strapi config as default (except $ROOT)
ENV VERSION=${VERSION:-dev} \
    NODE_ENV=production \
    DATABASE_HOST=pg \
    DATABASE_PORT=5432 \
    DATABASE_NAME=strapi \
    DATABASE_USERNAME=strapi \
    DATABASE_PASSWORD=unsecure-pwd \
    DATABASE_SCHEMA=public \
    DATABASE_SSL_SELF=false\
    HOST=0.0.0.0 \
    PORT=1337 \
    DOCKER_EXPOSED_PORT=1337\
    HOME_PATH=/srv/app\
    ROOT=/srv/app/backend\
    STRAPI_LOG_LEVEL=debug\
    SMTP_HOST="smtp.gmail.com"\
    SMTP_PORT="465"\
    SMTP_USERNAME=""\
    SMTP_PASSWORD=""\
    SMTP_DEFAULT_FROM="noreply@voca.city"\
    SMTP_DEFAULT_REPLYTO="hello@voca.city"\
    JELASTIC_HOST=""\
    JELASTIC_TOKEN=""

WORKDIR $ROOT

RUN apk add --upgrade --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash
RUN echo " {\"version\":\"$VERSION\"}" > $ROOT/VERSION.json

VOLUME $ROOT/node_modules
VOLUME $ROOT/build

COPY ./docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
COPY . $ROOT

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["start"]
