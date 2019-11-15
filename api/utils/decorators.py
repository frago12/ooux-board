import json

from http import HTTPStatus

from utils.response import ErrorResponse


def login_required(fn):
    def wrapper(request, *args, **kwargs):
        if not request.user.is_authenticated:
            return ErrorResponse(status=HTTPStatus.UNAUTHORIZED)
        else:
            return fn(request, *args, **kwargs)

    return wrapper


def schema_validation(schema):
    def decorator(view_func):
        def wrap(self, request, *args, **kwargs):
            data = json.loads(request.body)
            is_valid = schema.is_valid(data)
            if is_valid is False:
                return ErrorResponse(status=HTTPStatus.BAD_REQUEST)
            request.json_data = data
            return view_func(self, request, *args, **kwargs)

        return wrap

    return decorator
