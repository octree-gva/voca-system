#!/bin/sh
set -ea

if [ ! -f $ROOT/frontend/.appbuilt ]; then
    echo "Building NextJS app..."
    cp $ROOT/VERSION.json public/version.json
    yarn
    yarn build
    touch .appbuilt
fi

echo "🚀 Running `next $@`"
exec "next $@;"
