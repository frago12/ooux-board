from django.views import View
from schema import Schema, Optional, And

from boards.models import Board, serializeBoard
from utils.response import SuccessResponse
from utils.decorators import schema_validation


board_schema = Schema(
    {
        "title": And(str, len),
        Optional("data"): [
            {
                "id": str,
                "systemObject": str,
                "elements": [{"id": str, "type": str, "name": str}],
                "ctas": [{"id": str, "type": str, "name": str}],
            }
        ],
    }
)


class BoardListView(View):
    @schema_validation(board_schema)
    def post(self, request, *args, **kwargs):
        board_data = request.json_data
        data = {} if "data" not in board_data else board_data["data"]
        board = Board.objects.create(
            title=board_data.get("title", None), user=request.user, data=data
        )
        return SuccessResponse(data=board.serialize())

    def get(self, request, *args, **kwargs):
        boards = Board.objects.filter(user__id=request.user.id).values("uuid", "title")
        data = [serializeBoard(i["uuid"], i["title"]) for i in boards]
        return SuccessResponse(data=data)
