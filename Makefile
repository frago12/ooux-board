build:
	docker-compose -f docker-compose.intermediate.yaml build
	docker-compose -f docker-compose.production.yaml build

shell:
	docker-compose -f docker-compose.production.yaml run --rm api-server /bin/bash

up:
	docker-compose -f docker-compose.production.yaml up

down:
	docker-compose -f docker-compose.production.yaml down

remove-images:
	docker rmi $(docker images -f 'dangling=true' --no-trunc --quiet)
