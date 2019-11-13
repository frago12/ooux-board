FROM python:3.7
ENV PYTHONUNBUFFERED 1

WORKDIR /app/api

RUN pip install pip-tools
COPY ./api/requirements.in /app/api/
RUN pip-compile requirements.in
RUN pip-sync

COPY . /app/api

EXPOSE 8000
