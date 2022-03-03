# Docker file for strapi/next
FROM strapi/base:14-alpine

ARG VERSION
ENV VERSION=${VERSION:-dev} \
    NPM_REGISTRY=https://npm-8ee.hidora.com\
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
    USER=strapi\
    GROUP=admin

WORKDIR $ROOT

RUN echo "45.66.221.1 $NPM_REGISTRY" >> /etc/hosts && \
    npm set registry $NPM_REGISTRY/ && \
    yarn global add pm2

VOLUME $ROOT/backend/node_modules
VOLUME $ROOT/backend/build
VOLUME $ROOT/backend/public
VOLUME $ROOT/backend/.env
VOLUME $ROOT/frontend/node_modules
VOLUME $ROOT/frontend/.next

RUN addgroup -S $GROUP -g 1001 && \
    adduser -S -g '' -u 1001 -G $GROUP $USER &&\
    echo "{\"version\":\"$VERSION\"" > $ROOT/VERSION.json
USER $USER

COPY ./docker-entrypoint.sh /usr/local/bin/
COPY . $ROOT

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["yarn", "--name", "strapi", "--interpreter", "bash", "--restart-delay=10000", "--" "run", "start"]
