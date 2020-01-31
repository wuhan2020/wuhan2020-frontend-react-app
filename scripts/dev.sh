#!/bin/bash

rm -f wwwroot/dist/*
# NODE_OPTIONS=--max_old_space_size=8192 NODE_ENV=development webpack --config config/webpack.dev.conf.js
NODE_OPTIONS=--max_old_space_size=8192 NODE_ENV=development webpack-dev-server --config config/webpack.dev.conf.js --mode development
