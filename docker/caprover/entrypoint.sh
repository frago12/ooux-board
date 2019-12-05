#!/bin/bash

python manage.py migrate
gunicorn -w 4 api.wsgi -b 0.0.0.0:80
