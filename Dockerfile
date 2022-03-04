FROM node:16.14.0-alpine3.14

ARG VERSION
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
    ROOT=/srv/app\
    STRAPI_LOG_LEVEL=debug\
    SMTP_HOST="smtp.gmail.com"\
    SMTP_PORT="465"\
    SMTP_SECURE=true\
    SMTP_USERNAME=""\
    SMTP_PASSWORD=""\
    SMTP_REJECT_UNAUTHORIZED=false\
    SMTP_REQUIRE_TLS=true\
    SMTP_TIMEOUT=1\
    SMTP_DEFAULT_FROM="noreply@voca.city"\
    SMTP_DEFAULT_REPLYTO="hello@voca.city"\
    STRAPI_TOKEN=""\
    NEXT_STRAPI_TOKEN=""\
    NEXTAUTH_URL=""

WORKDIR $ROOT

RUN apk add --upgrade --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash

RUN yarn global add pm2 && \
    echo " {\"version\":\"$VERSION\"}" > $ROOT/VERSION.json

VOLUME $ROOT/backend/node_modules
VOLUME $ROOT/backend/build
VOLUME $ROOT/backend/public
VOLUME $ROOT/frontend/node_modules
VOLUME $ROOT/frontend/.next

COPY ./ecosystem.config.js $ROOT/ecosystem.config.js
COPY ./docker-entrypoint.sh /usr/local/bin/
COPY ./frontend $ROOT/frontend
COPY ./backend $ROOT/backend

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["yarn", "--name", "strapi", "--interpreter", "bash", "--no-daemon", "--restart-delay=10000", "--" "run", "start"]
