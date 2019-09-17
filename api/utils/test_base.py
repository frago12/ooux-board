from django.test import TestCase


class TestBase(TestCase):
    def login(self, user):
        pass
        # self.client.force_login(User.objects.get_or_create(username="testuser")[0])

    def fetch(self, url, method='get', data=None):
        request = getattr(self.client, method.lower())
        return request(url, data, content_type='application/json')
