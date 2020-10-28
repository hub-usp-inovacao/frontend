#!/bin/bash
set -e

# run the development server in background
yarn dev &

# Then exec the container's main process (what's set as CMD in the Dockerfile).
exec "$@"
