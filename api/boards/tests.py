from django.urls import reverse
from django.contrib.auth.models import User
from http import HTTPStatus

from boards.models import Board
from utils.test_base import TestBase


class Boards(TestBase):
    def setUp(self):
        self.user1 = User.objects.create_user("testuser", "test@example.com", "pass")
        self.user2 = User.objects.create_user("testuser2", "test2@example.com", "pass")

        self.board1 = Board.objects.create(
            title="board 1",
            data={"id": "1", "name": "Test", "elements": [], "ctas": []},
            user=self.user1,
        )
        Board.objects.create(title="board 2", data={}, user=self.user1)
        Board.objects.create(title="board 1", data={}, user=self.user2)

        self.boards_url = reverse("boards")

    def board_url(self, uuid):
        return reverse("board", kwargs={"board_id": uuid})

    #####
    # Create
    #####

    def test_user_can_create_board(self):
        data = {"title": "test board"}
        self.login(self.user1)
        response = self.fetch(self.boards_url, method="post", data=data)
        self.assertEqual(response.status_code, HTTPStatus.OK)
        response_data = response.json()
        self.assertEqual(response_data["data"]["title"], data["title"])

    def test_user_cannot_create_board_with_empty_title(self):
        data = {"title": ""}
        self.login(self.user1)
        response = self.fetch(self.boards_url, method="post", data=data)
        self.assertEqual(response.status_code, HTTPStatus.BAD_REQUEST)

    def test_user_cannot_create_board_without_title(self):
        data = {}
        self.login(self.user1)
        response = self.fetch(self.boards_url, method="post", data=data)
        self.assertEqual(response.status_code, HTTPStatus.BAD_REQUEST)

    def test_unsigned_user_cannot_create_board(self):
        response = self.fetch(self.boards_url)
        self.assertEqual(response.status_code, HTTPStatus.UNAUTHORIZED)

    #####
    # Get all
    #####

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

    #####
    # Get
    #####

    def test_user_can_retrieve_an_existing_board(self):
        url = self.board_url(self.board1.uuid)
        self.login(self.user1)
        response = self.fetch(url)
        self.assertEqual(response.status_code, HTTPStatus.OK)
        response_data = response.json()["data"]
        self.assertEqual(response_data["id"], str(self.board1.uuid))
        self.assertEqual(response_data["title"], self.board1.title)
        self.assertEqual(response_data["data"], self.board1.data)

    def test_user_cannot_retrieve_unexisting_board(self):
        url = self.board_url("abc")
        self.login(self.user1)
        response = self.fetch(url)
        self.assertEqual(response.status_code, HTTPStatus.NOT_FOUND)
        response_data = response.json()
        self.assertEqual(response_data["error"], True)

    def test_unsignned_user_cannot_retrieve_board(self):
        url = self.board_url(self.board1.id)
        response = self.fetch(url)
        self.assertEqual(response.status_code, HTTPStatus.UNAUTHORIZED)
        response_data = response.json()
        self.assertEqual(response_data["error"], True)

    #####
    # Update
    #####

    def test_user_can_update_board_title(self):
        data = {"title": "the new title", "data": []}
        url = self.board_url(self.board1.uuid)
        self.login(self.user1)
        response = self.fetch(url, method="put", data=data)
        self.assertEqual(response.status_code, HTTPStatus.OK)
        self.board1.refresh_from_db()
        self.assertEqual(data["title"], self.board1.title)

    def test_board_cannot_be_updated_if_title_is_empty(self):
        data = {"title": "", "data": []}
        url = self.board_url(self.board1.uuid)
        self.login(self.user1)
        response = self.fetch(url, method="put", data=data)
        self.assertEqual(response.status_code, HTTPStatus.BAD_REQUEST)
        response_data = response.json()
        self.assertEqual(response_data["error"], True)

    def test_user_can_update_board_data(self):
        data = {
            "title": "title",
            "data": [{"id": "abc123", "name": "Test", "elements": [], "ctas": []}],
        }
        url = self.board_url(self.board1.uuid)
        self.login(self.user1)
        response = self.fetch(url, method="put", data=data)
        self.assertEqual(response.status_code, HTTPStatus.OK)
        self.board1.refresh_from_db()
        self.assertEqual(data["data"], self.board1.data)

    def test_board_data_elements_can_contain_only_allowed_types(self):
        data = {
            "title": "title",
            "data": [
                {
                    "id": "abc123",
                    "name": "Test",
                    "elements": [
                        {"id": "1", "type": "object", "name": "my object"},
                        {"id": "2", "type": "coredata", "name": "my coredata"},
                        {"id": "3", "type": "metadata", "name": "my metadata"},
                    ],
                    "ctas": [],
                }
            ],
        }
        url = self.board_url(self.board1.uuid)
        self.login(self.user1)
        response = self.fetch(url, method="put", data=data)
        self.assertEqual(response.status_code, HTTPStatus.OK)
        self.board1.refresh_from_db()
        self.assertEqual(data["data"], self.board1.data)

    def test_board_data_elements_cannot_contain_not_allowed_types(self):
        data = {
            "title": "title",
            "data": [
                {
                    "id": "abc123",
                    "name": "Test",
                    "elements": [
                        {"id": "1", "type": "object", "name": "my object"},
                        {"id": "2", "type": "coredata", "name": "my coredata"},
                        {"id": "3", "type": "metadata", "name": "my metadata"},
                        {"id": "4", "type": "badtype", "name": "my bad type"},
                    ],
                    "ctas": [],
                }
            ],
        }
        url = self.board_url(self.board1.uuid)
        self.login(self.user1)
        response = self.fetch(url, method="put", data=data)
        self.assertEqual(response.status_code, HTTPStatus.BAD_REQUEST)
        response_data = response.json()
        self.assertEqual(response_data["error"], True)

    def test_board_data_ctas_can_be_updated(self):
        data = {
            "title": "title",
            "data": [
                {
                    "id": "abc123",
                    "name": "Test",
                    "elements": [],
                    "ctas": [{"id": "1", "type": "cta", "name": "my cta"}],
                }
            ],
        }
        url = self.board_url(self.board1.uuid)
        self.login(self.user1)
        response = self.fetch(url, method="put", data=data)
        self.assertEqual(response.status_code, HTTPStatus.OK)
        self.board1.refresh_from_db()
        self.assertEqual(data["data"], self.board1.data)

    def test_board_data_ctas_cannot_be_updated_if_type_is_incorrect(self):
        data = {
            "title": "title",
            "data": [
                {
                    "id": "abc123",
                    "name": "Test",
                    "elements": [],
                    "ctas": [{"id": "1", "type": "badcta", "name": "my cta"}],
                }
            ],
        }
        url = self.board_url(self.board1.uuid)
        self.login(self.user1)
        response = self.fetch(url, method="put", data=data)
        self.assertEqual(response.status_code, HTTPStatus.BAD_REQUEST)
        response_data = response.json()
        self.assertEqual(response_data["error"], True)

    def test_if_board_data_is_not_sent_return_current_value(self):
        data = {"title": "title"}
        url = self.board_url(self.board1.uuid)
        self.login(self.user1)
        response = self.fetch(url, method="put", data=data)
        self.assertEqual(response.status_code, HTTPStatus.OK)
        previous_data = self.board1.data
        self.board1.refresh_from_db()
        self.assertEqual(previous_data, self.board1.data)

    def test_board_data_cannot_be_none(self):
        data = {"title": "title", "data": None}
        url = self.board_url(self.board1.uuid)
        self.login(self.user1)
        response = self.fetch(url, method="put", data=data)
        self.assertEqual(response.status_code, HTTPStatus.BAD_REQUEST)
        response_data = response.json()
        self.assertEqual(response_data["error"], True)

    def test_cannot_update_non_extisting_board(self):
        data = {"title": "title", "data": []}
        url = self.board_url("123")
        self.login(self.user1)
        response = self.fetch(url, method="put", data=data)
        self.assertEqual(response.status_code, HTTPStatus.NOT_FOUND)
        response_data = response.json()
        self.assertEqual(response_data["error"], True)

    def test_unsigned_user_cannot_update_board(self):
        data = {"title": "title", "data": []}
        url = self.board_url(self.board1.uuid)
        response = self.fetch(url, method="put", data=data)
        self.assertEqual(response.status_code, HTTPStatus.UNAUTHORIZED)
        response_data = response.json()
        self.assertEqual(response_data["error"], True)
