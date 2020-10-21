build_dev:
	docker-compose -f dev-compose.yaml build

dev: build_dev
	docker-compose -f dev-compose.yaml up

build_prod:
	docker-compose -f prod-compose.yaml build

prod: build_prod
	docker-compose -f prod-compose.yaml up
