#!/bin/sh
set -ea

cd /srv/app/backend/
echo "Installing node modules..."
yarn
yarn global add pm2

if [ ! -f /srv/app/backend/.adminbuilt ]; then
    echo "Building Strapi admin UI..."
    yarn
    yarn build
    touch .adminbuilt
fi

if [ ! -f /srv/app/frontend/.appbuilt ]; then
    echo "Building NextJS app..."
    cd /srv/app/frontend/
    yarn
    yarn build
    touch .appbuilt
fi

cd /srv/app/backend/

echo "Starting your app..."

exec "pm2 start $@; pm2 logs"
