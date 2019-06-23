FROM node:12.2.0

RUN npm install -g pm2@^3.5.1

RUN groupadd -r docker \
    && usermod -a -G docker node

ENTRYPOINT ["tail", "-f", "/dev/null"]
