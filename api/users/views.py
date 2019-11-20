import json

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST, require_GET
from http import HTTPStatus
from schema import Schema, And

from utils.decorators import function_schema_validation
from utils.response import SuccessResponse, ErrorResponse


new_user_schema = Schema(
    {
        "email": And(str, lambda s: len(s) >= 3),
        "password": And(str, lambda s: len(s) >= 4),
        "password2": And(str, lambda s: len(s) >= 4),
    }
)


@function_schema_validation(new_user_schema)
@require_POST
@csrf_exempt
def signup(request):
    user_info = request.json_data

    if User.objects.filter(email=user_info["email"]).exists():
        return ErrorResponse(status=HTTPStatus.BAD_REQUEST)

    new_user = User()
    new_user.email = user_info["email"]
    new_user.username = user_info["email"]
    new_user.set_password(user_info["password"])
    new_user.save()
    user = authenticate(username=new_user.email, password=user_info["password"])
    if user is not None:
        response = {"email": new_user.email}
        return SuccessResponse(response, status=HTTPStatus.CREATED)
    else:
        return ErrorResponse(status=HTTPStatus.BAD_REQUEST)


user_schema = Schema({"email": And(str, len), "password": And(str, len)})


@function_schema_validation(user_schema)
@require_POST
@csrf_exempt
def signin(request):
    user_info = request.json_data
    user = authenticate(username=user_info["email"], password=user_info["password"])
    if user is not None:
        login(request, user)
        response = {"email": user.email}
        return SuccessResponse(response)
    else:
        return ErrorResponse(status=HTTPStatus.UNAUTHORIZED)


@require_GET
def signout(request):
    logout(request)
    return SuccessResponse()


@require_GET
def me(request):
    if request.user.is_authenticated:
        return SuccessResponse({"email": request.user.email})
    else:
        return ErrorResponse(status=HTTPStatus.UNAUTHORIZED)
