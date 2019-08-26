from django.urls import reverse
from django.contrib.auth.models import User
from http import HTTPStatus

from utils.test_base import TestBase


class UserLogin(TestBase):
    def setUp(self):
        User.objects.create_user("testuser", "test@example.com", "pass")
        self.login_url = reverse("users.signin")

    def test_user_can_login_with_email(self):
        data = {"username": "test@example.com", "password": "pass"}
        response = self.client.post(self.login_url, data)
        self.assertEqual(response.status_code, HTTPStatus.OK)

    def test_user_can_login_with_username(self):
        data = {"username": "testuser", "password": "pass"}
        response = self.client.post(self.login_url, data)
        self.assertEqual(response.status_code, HTTPStatus.OK)

    def test_user_cannot_login_with_incorrect_password(self):
        data = {"username": "testuser", "password": "incorrect"}
        response = self.client.post(self.login_url, data)
        self.assertEqual(response.status_code, HTTPStatus.UNAUTHORIZED)
