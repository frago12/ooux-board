from django.test import TestCase
from django.contrib.auth.models import User


class TestBase(TestCase):
    def login(self, user):
        self.client.force_login(User.objects.get_or_create(username=user.email)[0])

    def fetch(self, url, method='get', data=None):
        request = getattr(self.client, method.lower())
        return request(url, data, content_type='application/json')
