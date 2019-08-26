from django.conf.urls import url

from users.views import signup, signin

urlpatterns = [
    url(r"^register/", signup, name="users.signup"),
    url(r"^login/", signin, name="users.signin"),
]
