#!/bin/sh
set -ea

cd $ROOT/backend/
echo "Installing node modules..."
yarn
yarn global add pm2

if [ ! -f $ROOT/backend/.adminbuilt ]; then
    echo "Building Strapi admin UI..."
    cp $ROOT/VERSION.json public/version.json
    yarn
    yarn build
    touch .adminbuilt
fi

if [ ! -f $ROOT/frontend/.appbuilt ]; then
    echo "Building NextJS app..."
    cd $ROOT/frontend/
    cp $ROOT/VERSION.json public/version.json
    yarn
    yarn build
    touch .appbuilt
fi

cd $ROOT/backend/

echo "Starting your app..."

exec "pm2 start $@; pm2 logs"
