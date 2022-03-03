#!/bin/sh
set -ea
if [ ! -f $ROOT/frontend/.appbuilt ]; then
    echo "Building NextJS app..."
    cd $ROOT/frontend/
    cp $ROOT/VERSION.json public/version.json
    yarn
    yarn build
    touch .appbuilt
fi
cd $ROOT/backend/
if [ ! -f $ROOT/backend/.adminbuilt ]; then
    echo "Building Strapi admin UI..."
    cp $ROOT/VERSION.json public/version.json
    yarn
    yarn build
    touch .adminbuilt
fi
echo "🚀 Running `pm2 start $@`"
exec "pm2 start $@;"
