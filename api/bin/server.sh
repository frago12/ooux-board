#!/bin/bash
set -e

bin/wait-for-it.sh db:5432
exec gunicorn -w 4 api.wsgi -b 0.0.0.0:8000
