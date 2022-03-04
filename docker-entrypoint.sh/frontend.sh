#!/bin/sh
set -ea


if [ ! -f $ROOT/.appbuilt ]; then
    echo "Building NextJS app..."
    cp $ROOT/VERSION.json public/version.json
    yarn install --production=false
    yarn build
    touch .appbuilt
fi

echo "🚀 Running `next $@`"
exec "yarn next $@;"
