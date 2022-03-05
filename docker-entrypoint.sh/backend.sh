#!/bin/sh
set -ea
cd $ROOT;
if [ ! -f $ROOT/.adminbuilt ]; then
    echo "Building Strapi admin UI..."
    cp VERSION.json public/version.json
    yarn install --production=false
    yarn build
    touch .adminbuilt
fi
echo "🚀 Running 'yarn strapi $@'"
yarn strapi $@
