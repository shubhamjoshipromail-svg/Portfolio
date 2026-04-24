#!/bin/sh
set -e

uvicorn backend.main:app --host 127.0.0.1 --port 8000 --log-level info &
UVICORN_PID=$!

caddy run --config /etc/caddy/Caddyfile --adapter caddyfile &
CADDY_PID=$!

wait -n $UVICORN_PID $CADDY_PID
EXIT_CODE=$?
kill $UVICORN_PID $CADDY_PID 2>/dev/null || true
exit $EXIT_CODE
