from django.urls import reverse
from django.contrib.auth.models import User
from http import HTTPStatus

from utils.test_base import TestBase


class UserLogin(TestBase):
    def setUp(self):
        User.objects.create_user("testuser", "test@example.com", "pass")
        self.login_url = reverse("users.signin")

    def test_user_can_login_with_email(self):
        data = {"email": "test@example.com", "password": "pass"}
        response = self.fetch(self.login_url, 'post', data)
        self.assertEqual(response.status_code, HTTPStatus.OK)

    def test_user_can_login_with_username(self):
        data = {"email": "testuser", "password": "pass"}
        response = self.fetch(self.login_url, 'post', data)
        self.assertEqual(response.status_code, HTTPStatus.OK)

    def test_user_cannot_login_with_incorrect_password(self):
        data = {"email": "testuser@example.com", "password": "incorrect"}
        response = self.fetch(self.login_url, 'post', data)
        self.assertEqual(response.status_code, HTTPStatus.UNAUTHORIZED)
