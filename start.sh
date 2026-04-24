#!/bin/sh
set -e

uvicorn backend.main:app --host 127.0.0.1 --port 8000 --log-level info &
UVICORN_PID=$!

caddy run --config /etc/caddy/Caddyfile --adapter caddyfile &
CADDY_PID=$!

while kill -0 "$UVICORN_PID" 2>/dev/null && kill -0 "$CADDY_PID" 2>/dev/null; do
  sleep 1
done

if kill -0 "$UVICORN_PID" 2>/dev/null; then
  wait "$CADDY_PID"
  EXIT_CODE=$?
else
  wait "$UVICORN_PID"
  EXIT_CODE=$?
fi

kill $UVICORN_PID $CADDY_PID 2>/dev/null || true
exit $EXIT_CODE
