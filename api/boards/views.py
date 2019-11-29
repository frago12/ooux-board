from django.views import View
from schema import Schema, Optional, And, Or

from boards.models import Board, serializeBoard
from boards.decorators import validate_existing_board
from utils.response import SuccessResponse
from utils.decorators import schema_validation

new_board_schema = Schema({"title": And(str, len)})


class BoardListView(View):
    @schema_validation(new_board_schema)
    def post(self, request, *args, **kwargs):
        board_data = request.json_data
        board = Board.objects.create(
            title=board_data["title"], user=request.user, data={}
        )
        return SuccessResponse(data=serializeBoard(board.uuid, board.title, board.data))

    def get(self, request, *args, **kwargs):
        boards = Board.objects.filter(user__id=request.user.id).values("uuid", "title")
        data = [serializeBoard(i["uuid"], i["title"]) for i in boards]
        return SuccessResponse(data=data)


board_schema = Schema(
    {
        "title": And(str, len),
        Optional("data"): Or(
            [
                {
                    "id": str,
                    "name": str,
                    "elements": [
                        {
                            "id": str,
                            "type": Or("object", "coredata", "metadata"),
                            "name": str,
                        }
                    ],
                    "ctas": [{"id": str, "type": "cta", "name": str}],
                }
            ],
            {},
        ),
    }
)


class BoardView(View):
    @validate_existing_board
    def get(self, request, board_id):
        return SuccessResponse(
            data=serializeBoard(
                request.board.uuid, request.board.title, request.board.data
            )
        )

    @validate_existing_board
    @schema_validation(board_schema)
    def put(self, request, board_id):
        board_data = request.json_data
        board = request.board
        board.title = board_data.get("title")
        board.data = (
            board_data.get("data", {}) if "data" in board_data.keys() else board.data
        )
        board.save()

        return SuccessResponse(data=serializeBoard(board.uuid, board.title, board.data))
