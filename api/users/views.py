import json

from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST, require_GET
from http import HTTPStatus

from users.forms import UserForm
from utils.response import SuccessResponse, ErrorResponse


@require_POST
@csrf_exempt
def signup(request):
    user_info = json.loads(request.body)
    form = UserForm(user_info)
    if form.is_valid():
        user = form.cleaned_data
        new_user = form.save(commit=False)
        new_user.set_password(user.get("password"))
        new_user.save()
        user = authenticate(username=user.get("email"), password=user.get("password"))
        if user is not None:
            response = {"email": new_user.email}
            return SuccessResponse(response, status=HTTPStatus.CREATED)
        else:
            return ErrorResponse(status=HTTPStatus.BAD_REQUEST)
    else:
        return ErrorResponse(
            errors=form.errors.as_json(), status=HTTPStatus.BAD_REQUEST
        )


@require_POST
@csrf_exempt
def signin(request):
    user_info = json.loads(request.body)
    email = user_info.get("email", None)
    password = user_info.get("password", None)
    user = authenticate(username=email, password=password)
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
