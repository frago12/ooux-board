from django.http import JsonResponse


def SuccessResponse(data={}, status=200):
    response = {"data": data, "error": False}
    return JsonResponse(response, status=status)


def ErrorResponse(msg="", status=400, **kwargs):
    response = {"data": {}, "error": True, "errorMsg": msg}
    response.update(kwargs)
    return JsonResponse(response, status=status)
