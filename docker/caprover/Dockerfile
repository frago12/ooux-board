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

COPY ./docker/caprover/entrypoint.sh ./
CMD sh entrypoint.sh

