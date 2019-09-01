#!/bin/bash
set -e

bin/wait-for-it.sh db:5432
exec python manage.py runserver 0.0.0.0:8000
