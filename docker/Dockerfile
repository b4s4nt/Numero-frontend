FROM node:16.17.0 AS build-stage

LABEL maintainer="Luke Fordham"

WORKDIR /var/www/app

COPY /scripts/entrypoint.sh /scripts/entrypoint.sh
COPY /package.json /var/www/app
RUN chmod +x /scripts/entrypoint.sh

ADD . .

ENTRYPOINT ["/scripts/entrypoint.sh"]

CMD ["npm", "run", "dev"]
