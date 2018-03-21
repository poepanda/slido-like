#!/bin/bash

#start development server on :8000

source bin/env.sh

dcdev build
echo "installing server dependencies"
bash ./bin/npm_server.sh i -q
echo "installing client dependencies"
bash ./bin/npm_client.sh i -q
echo "starting"
dcdev up