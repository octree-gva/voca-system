# Docker file for strapi/next
FROM git.octree.ch:4567/o/infra/templates/base/strapi:nextjs

ARG VERSION
ENV VERSION ${VERSION:-dev} \
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
    HOME_PATH=/srv\
    STRAPI_LOG_LEVEL=debug

COPY . /srv/
RUN echo "{\"version\":\"$VERSION\"" > /srv/api/public/version.json