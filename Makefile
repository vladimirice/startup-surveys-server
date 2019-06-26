DOCKER_SERVER_APP_USER=node
DOCKER_SERVER_APP_NAME=server

DOCKER_SERVER_EXEC=docker-compose exec -T --user=${DOCKER_SERVER_APP_USER} ${DOCKER_SERVER_APP_NAME}

UPDATE_HOSTS_COMMAND=sudo /bin/bash ./docker/utils/etc-hosts.sh update
LINUX_HOSTS_FILENAME=/etc/hosts

init-project-linux ip:
	make docker-rebuild
	make docker-npm-ci
	make docker-npm-build
	make docker-pm2-reload-ecosystem
	make docker-pm2-list

docker-rebuild:
	make docker-compose-symlink-linux
	docker-compose down --remove-orphans
	make docker-up-build-force

docker-up-build-force df:
	docker-compose up -d --build --force-recreate

docker-npm-ci:
	${DOCKER_SERVER_EXEC} npm ci

docker-typescript-watch:
	${DOCKER_SERVER_EXEC} npm run tsc-watch

docker-typescript:
	${DOCKER_SERVER_EXEC} npm run tsc

docker-npm-build:
	${DOCKER_SERVER_EXEC} npm run build

docker-pm2-reload-ecosystem:
	${DOCKER_SERVER_EXEC} pm2 reload ecosystem-test.config.js --update-env

docker-pm2-list:
	${DOCKER_SERVER_EXEC} pm2 list

docker-compose-symlink-linux:
	rm docker-compose.yml
	ln -s docker/docker-compose-linux.yml ./docker-compose.yml

sudo-set-hosts-linux:
	${UPDATE_HOSTS_COMMAND} startup-surveys-server 173.18.215.10 ${LINUX_HOSTS_FILENAME}

docker-backend-bash:
	docker-compose exec --user=${DOCKER_SERVER_APP_USER} ${DOCKER_SERVER_APP_NAME} /bin/bash

docker-check-project:
	${DOCKER_SERVER_EXEC} npm run eslint
	make docker-npm-build
	make check-project-not-committed-changes

check-project-not-committed-changes:
	/bin/bash ./ci-scripts/check-project-not-committed-changes.sh

push-to-master:
	make docker-check-project
	git push master

deploy-heroku:
	make docker-check-project
	git push heroku master
