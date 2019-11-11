from django.urls import reverse
from django.contrib.auth.models import User
from http import HTTPStatus

from utils.test_base import TestBase


class Boards(TestBase):
    def setUp(self):
        self.user = User.objects.create_user("testuser", "test@example.com", "pass")
        self.boards_url = reverse("boards")

    def test_user_can_create_board(self):
        data = {"title": "test board"}
        self.login(self.user)
        response = self.fetch(self.boards_url, method="post", data=data)
        self.assertEqual(response.status_code, HTTPStatus.OK)
        responseData = response.json()
        self.assertEqual(responseData["data"]["title"], data["title"])

    def test_user_cannot_create_board_without_title(self):
        data = {}
        self.login(self.user)
        response = self.fetch(self.boards_url, method="post", data=data)
        self.assertEqual(response.status_code, HTTPStatus.BAD_REQUEST)
