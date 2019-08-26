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
            "email": "user1@walla.io",
            "username": "user1",
            "password": "pass",
            "password2": "pass",
        }

        response = self.client.post(self.create_url, data)
        self.assertEqual(response.status_code, HTTPStatus.CREATED)
        response = response.json()
        self.assertEqual(User.objects.count(), 2)
        self.assertEqual(response["data"]["username"], data["username"])
        self.assertEqual(response["data"]["email"], data["email"])
        self.assertFalse("password" in response["data"])

    def test_create_user_with_short_password(self):
        data = {
            "email": "foobarbaz@example.com",
            "username": "foobar",
            "password": "foo",
            "password2": "foo",
        }
        response = self.client.post(self.create_url, data)
        self.assertEqual(response.status_code, HTTPStatus.BAD_REQUEST)
        self.assertEqual(User.objects.count(), 1)

    def test_create_user_with_no_username(self):
        data = {
            "username": "",
            "email": "foobarbaz@example.com",
            "password": "foobar1",
            "password2": "foobar",
        }
        response = self.client.post(self.create_url, data)
        self.assertEqual(response.status_code, HTTPStatus.BAD_REQUEST)
        self.assertEqual(User.objects.count(), 1)

    def test_create_user_with_preexisting_username(self):
        data = {
            "username": "testuser",
            "email": "user@example.com",
            "password": "testuser",
            "password2": "testuser",
        }
        response = self.client.post(self.create_url, data, format="json")
        self.assertEqual(response.status_code, HTTPStatus.BAD_REQUEST)
        self.assertEqual(User.objects.count(), 1)

    def test_create_user_with_preexisting_email(self):
        data = {
            "username": "testuser2",
            "email": "test@example.com",
            "password": "testuser",
        }
        response = self.client.post(self.create_url, data, format="json")
        self.assertEqual(response.status_code, HTTPStatus.BAD_REQUEST)
        self.assertEqual(User.objects.count(), 1)

    def test_create_user_with_invalid_email(self):
        data = {"username": "foobarbaz", "email": "testing", "passsword": "foobarbaz"}
        response = self.client.post(self.create_url, data, format="json")
        self.assertEqual(response.status_code, HTTPStatus.BAD_REQUEST)
        self.assertEqual(User.objects.count(), 1)

    def test_create_user_with_no_email(self):
        data = {"username": "foobar", "email": "", "password": "foobarbaz"}

        response = self.client.post(self.create_url, data, format="json")
        self.assertEqual(response.status_code, HTTPStatus.BAD_REQUEST)
        self.assertEqual(User.objects.count(), 1)
