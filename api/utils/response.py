from django.http import JsonResponse
from http import HTTPStatus


def SuccessResponse(data={}, status=HTTPStatus.OK):
    response = {"data": data, "error": False}
    return JsonResponse(response, status=status)


def ErrorResponse(status=HTTPStatus.BAD_REQUEST, **kwargs):
    response = {"data": {}, "error": True}
    response.update(kwargs)
    return JsonResponse(response, status=status)
