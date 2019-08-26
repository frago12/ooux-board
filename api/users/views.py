from django.contrib.auth import authenticate, login
from django.views.decorators.http import require_POST
from http import HTTPStatus

from users.forms import UserForm
from utils.response import SuccessResponse, ErrorResponse


@require_POST
def signup(request):
    form = UserForm(request.POST)
    if form.is_valid():
        cd = form.cleaned_data
        new_user = form.save(commit=False)
        new_user.set_password(cd.get("password"))
        new_user.save()
        user = authenticate(username=cd.get("email"), password=cd.get("password"))
        if user is not None:
            response = {"username": new_user.username, "email": new_user.email}
            return SuccessResponse(response, status=HTTPStatus.CREATED)
        else:
            return ErrorResponse(status=HTTPStatus.UNAUTHORIZED)
    else:
        return ErrorResponse(
            errors=form.errors.as_json(), status=HTTPStatus.BAD_REQUEST
        )


@require_POST
def signin(request):
    username = request.POST.get("username", None)
    password = request.POST.get("password", None)
    user = authenticate(username=username, password=password)
    if user is not None:
        login(request, user)
        response = {"username": user.username, "email": user.email}
        return SuccessResponse(response, status=HTTPStatus.OK)
    else:
        return ErrorResponse(status=HTTPStatus.UNAUTHORIZED)
