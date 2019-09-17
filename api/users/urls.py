from django.conf.urls import url

from users.views import signup, signin, logout, me

urlpatterns = [
    url(r"^register/", signup, name="users.signup"),
    url(r"^login/", signin, name="users.signin"),
    url(r"^logout/", logout, name="users.signout"),
    url(r"^me/", me, name="users.me"),
]
