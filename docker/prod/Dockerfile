# base
FROM python:3.7 as base
ENV PYTHONUNBUFFERED 1

WORKDIR /app
RUN pip install pipenv
COPY api/Pipfile* ./
RUN pipenv install --system --deploy --keep-outdated
COPY ./api ./
RUN python manage.py collectstatic --noinput
