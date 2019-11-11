from django.urls import reverse
from django.contrib.auth.models import User
from http import HTTPStatus

from boards.models import Board
from utils.test_base import TestBase


class Boards(TestBase):
    def setUp(self):
        self.user1 = User.objects.create_user("testuser", "test@example.com", "pass")
        self.user2 = User.objects.create_user("testuser2", "test2@example.com", "pass")

        Board.objects.create(title="board 1", data={}, user=self.user1)
        Board.objects.create(title="board 2", data={}, user=self.user1)
        Board.objects.create(title="board 1", data={}, user=self.user2)

        self.boards_url = reverse("boards")

    def test_user_can_create_board(self):
        data = {"title": "test board"}
        self.login(self.user1)
        response = self.fetch(self.boards_url, method="post", data=data)
        self.assertEqual(response.status_code, HTTPStatus.OK)
        response_data = response.json()
        self.assertEqual(response_data["data"]["title"], data["title"])

    def test_user_cannot_create_board_without_title(self):
        data = {}
        self.login(self.user1)
        response = self.fetch(self.boards_url, method="post", data=data)
        self.assertEqual(response.status_code, HTTPStatus.BAD_REQUEST)

    def test_unsigned_user_cannot_create_board(self):
        response = self.fetch(self.boards_url)
        self.assertEqual(response.status_code, HTTPStatus.UNAUTHORIZED)

    def test_user_can_get_a_list_of_his_boards(self):
        self.login(self.user1)
        response = self.fetch(self.boards_url)
        self.assertEqual(response.status_code, HTTPStatus.OK)
        response_data = response.json()
        self.assertEqual(len(response_data["data"]), 2)

    def test_boards_list_should_not_return_board_data(self):
        self.login(self.user2)
        response = self.fetch(self.boards_url)
        self.assertEqual(response.status_code, HTTPStatus.OK)
        response_data = response.json()
        self.assertEqual(len(response_data["data"]), 1)
        board = response_data["data"][0]
        self.assertIsNotNone(board["id"])
        self.assertIsNotNone(board["title"])
        self.assertIsNone(board.get("data", None))

    def test_unsigned_user_cannot_retrive_boards(self):
        response = self.fetch(self.boards_url)
        self.assertEqual(response.status_code, HTTPStatus.UNAUTHORIZED)

