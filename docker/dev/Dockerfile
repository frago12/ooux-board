FROM python:3.7
ENV PYTHONUNBUFFERED 1

WORKDIR /app/api

RUN pip install pipenv
COPY ./api/Pipfile ./api/Pipfile.lock /app/api/
RUN pipenv install --system

COPY . /app/api

EXPOSE 8000
