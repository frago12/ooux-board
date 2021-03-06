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

dev-build:
	docker-compose build api

dev-up:
	docker-compose up api

dev-interactive:
	docker-compose run --rm --service-ports --name api api

dev-shell:
	docker-compose run --rm --no-deps api /bin/bash

django-shell:
	docker-compose run --rm api python manage.py shell

format:
	docker-compose run --rm --no-deps api black --exclude "/migrations/" .

lint:
	docker-compose run --rm --no-deps api flake8 .

test:
	docker-compose run --rm api python manage.py test
