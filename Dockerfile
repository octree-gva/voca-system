# Docker file for strapi/next
FROM strapi/base:14-alpine

ARG VERSION
ENV VERSION=${VERSION:-dev} \
    NODE_VERSION=14.17.0 \
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
    GROUP=admin\
    STRAPI_TOKEN=""\
    NEXT_STRAPI_TOKEN=""\
    NEXTAUTH_URL=""

WORKDIR $ROOT
# @see https://github.com/strapi/strapi-docker/issues/329
RUN rm -rf /usr/local/bin/nodejs  && \
    /bin/sh -c ARCH= && dpkgArch="$(dpkg --print-architecture)"   && case "${dpkgArch##*-}" in     amd64) ARCH='x64';;     ppc64el) ARCH='ppc64le';;     s390x) ARCH='s390x';;     arm64) ARCH='arm64';;     armhf) ARCH='armv7l';;     i386) ARCH='x86';;     *) echo "unsupported architecture"; exit 1 ;;   esac   && set -ex   && curl -fsSLO --compressed "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-$ARCH.tar.xz" && tar -xJf "node-v$NODE_VERSION-linux-$ARCH.tar.xz" -C /usr/local --strip-components=1 --no-same-owner  && rm "node-v$NODE_VERSION-linux-$ARCH.tar.xz"  && ln -s /usr/local/bin/node /usr/local/bin/nodejs   && node --version   && npm --version

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
COPY ./frontend $ROOT/frontend
COPY ./backend $ROOT/backend
COPY ./ecosystem.config.js $ROOT/ecosystem.config.js

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["yarn", "--name", "strapi", "--interpreter", "bash", "--no-daemon", "--restart-delay=10000", "--" "run", "start"]
