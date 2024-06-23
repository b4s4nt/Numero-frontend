#!/bin/sh

docker compose build

docker run --rm --volumes-from app_frontend  -w /var/www/app -it app-frontend-dev npm i

docker compose up
