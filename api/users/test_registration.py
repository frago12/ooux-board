from django.urls import reverse
from django.contrib.auth.models import User
from http import HTTPStatus

from utils.test_base import TestBase


class UserRegistration(TestBase):
    def setUp(self):
        User.objects.create_user("testuser", "test@example.com", "pass")
        self.create_url = reverse("users.signup")

    def test_create_user(self):
        data = {
            "email": "user1@example.com",
            "password": "pass",
            "password2": "pass",
        }

        response = self.fetch(self.create_url, "post", data)
        self.assertEqual(response.status_code, HTTPStatus.CREATED)
        response = response.json()
        self.assertEqual(User.objects.count(), 2)
        self.assertEqual(response["data"]["email"], data["email"])
        self.assertFalse("password" in response["data"])

    def test_cannot_create_user_with_short_password(self):
        data = {
            "email": "foobarbaz@example.com",
            "password": "foo",
            "password2": "foo",
        }
        response = self.fetch(self.create_url, "post", data)
        self.assertEqual(response.status_code, HTTPStatus.BAD_REQUEST)
        self.assertEqual(User.objects.count(), 1)

    def test_create_user_with_preexisting_email(self):
        data = {
            "email": "test@example.com",
            "password": "testuser",
            "password2": "testuser",
        }
        response = self.fetch(self.create_url, "post", data)
        self.assertEqual(response.status_code, HTTPStatus.BAD_REQUEST)
        self.assertEqual(User.objects.count(), 1)

    def test_cannot_create_user_with_invalid_email(self):
        data = {"email": "testing", "passsword": "foobarbaz", "passsword2": "foobarbaz"}
        response = self.fetch(self.create_url, "post", data)
        self.assertEqual(response.status_code, HTTPStatus.BAD_REQUEST)
        self.assertEqual(User.objects.count(), 1)

    def test_create_user_with_no_email(self):
        data = {"email": "", "password": "foobarbaz"}

        response = self.fetch(self.create_url, "post", data)
        self.assertEqual(response.status_code, HTTPStatus.BAD_REQUEST)
        self.assertEqual(User.objects.count(), 1)
