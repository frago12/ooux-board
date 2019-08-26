from django.test import TestCase


class TestBase(TestCase):
    def login(self, user):
        pass
        # self.client.force_login(User.objects.get_or_create(username="testuser")[0])
