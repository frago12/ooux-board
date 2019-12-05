# base
FROM python:3.7 as base
ENV PYTHONUNBUFFERED 1

WORKDIR /app
RUN pip install pip-tools
COPY ./api/requirements.in ./
RUN pip-compile requirements.in
RUN pip-sync
COPY ./api ./

EXPOSE 80

CMD gunicorn -w 4 api.wsgi -b 0.0.0.0:80

