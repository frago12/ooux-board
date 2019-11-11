import json

from django.views import View
from django.db import IntegrityError
from http import HTTPStatus

from boards.models import Board, serializeBoard
from utils.response import SuccessResponse, ErrorResponse


class BoardListView(View):
    def post(self, request, *args, **kwargs):
        try:
            boardData = json.loads(request.body)
            data = {} if "data" not in boardData else boardData["data"]
            board = Board.objects.create(title=boardData.get("title", None), user=request.user, data=data)
            return SuccessResponse(data=board.serialize())
        except IntegrityError:
            return ErrorResponse(status=HTTPStatus.BAD_REQUEST)

    def get(self, request, *args, **kwargs):
        boards = Board.objects.filter(user__id=request.user.id).values("uuid", "title")
        data = [serializeBoard(i['uuid'], i['title']) for i in boards]
        return SuccessResponse(data=data)
