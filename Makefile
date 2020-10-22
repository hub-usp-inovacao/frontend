DEVFILE = dev-compose.yaml
PRODFILE = prod-compose.yaml

DC = docker-compose

BUILD_SUBCMD = build
RUN_SUBCMD = up
STOP_SUBCMD = down


.PHONY: build_dev build_prod dev prod stop_dev stop_prod


## DEVELOPMENT TARGETS

build_dev:
	$(DC) -f $(DEVFILE) $(BUILD_SUBCMD)

dev: build_dev
	$(DC) -f $(DEVFILE) $(RUN_SUBCMD)

stop_dev:
	$(DC) -f $(DEVFILE) $(STOP_SUBCMD)


## PRODUCTION TARGETS

build_prod:
	$(DC) -f $(PRODFILE) $(BUILD_SUBCMD)

prod: build_prod
	$(DC) -f $(PRODFILE) $(RUN_SUBCMD)

stop_prod:
	$(DC) -f $(PRODFILE) $(STOP_SUBCMD)
