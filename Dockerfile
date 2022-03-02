# Docker file for strapi/next
FROM git.octree.ch:4567/o/infra/templates/base/strapi:nextjs

ARG VERSION
ENV VERSION ${VERSION:-dev}

COPY . /srv/
RUN echo "{\"version\":\"$VERSION\"" > /srv/api/public/version.json