from django.conf.urls import url

from users.views import signup, signin, signout, me

urlpatterns = [
    url(r"^register/", signup, name="users.signup"),
    url(r"^login/", signin, name="users.signin"),
    url(r"^logout/", signout, name="users.signout"),
    url(r"^me/", me, name="users.me"),
]
