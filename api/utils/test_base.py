from django.test import TestCase
from django.contrib.auth.models import User


class TestBase(TestCase):
    def login(self, user):
        self.client.force_login(User.objects.get(email=user.email))

    def fetch(self, url, method="get", data=None):
        request = getattr(self.client, method.lower())
        return request(url, data, content_type="application/json")
