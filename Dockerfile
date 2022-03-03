# Docker file for strapi/next
FROM strapi/base:14-alpine

ARG VERSION
ENV VERSION=${VERSION:-dev} \
    NODE_VERSION=14.17.0 \
    NVM_DIR=/usr/local/nvm \
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

RUN addgroup -S $GROUP -g 1001 && \
    adduser -S -g '' -u 1001 -G $GROUP $USER &&\
    echo "{\"version\":\"$VERSION\"" > $ROOT/VERSION.json



# @see https://github.com/strapi/strapi-docker/issues/329
RUN mkdir -p $NVM_DIR && \
    apk --update --no-cache add \
        bash curl &&\
         rm -rf /var/cache/apk/* && \
    rm -rf /usr/local/bin/nodejs /usr/local/bin/yarn* /usr/local/lib/node_modules  
RUN touch $ROOT/.profile && \
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash; \
    source $NVM_DIR/nvm.sh; \
    echo "nvm_get_arch() { nvm_echo \"x64-musl\"; }" >> $ROOT/.profile; source $ROOT/.profile;\
    nvm install $NODE_VERSION --no-progress --default && \
    npm install --global yarn && \
    yarn global add pm2
    
USER $USER
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
