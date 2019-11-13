from http import HTTPStatus

from utils.response import ErrorResponse


def login_required(fn):
    def wrapper(request, *args, **kwargs):
        if not request.user.is_authenticated:
            return ErrorResponse(status=HTTPStatus.UNAUTHORIZED)
        else:
            return fn(request, *args, **kwargs)

    return wrapper
