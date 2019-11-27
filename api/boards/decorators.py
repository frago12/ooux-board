from http import HTTPStatus
from utils.response import ErrorResponse

from boards.models import Board


def validate_existing_board(fn):
    def wrapper(self, request, *args, **kwargs):
        try:
            request.board = Board.objects.get(uuid=kwargs.get("board_id", None))
            return fn(self, request, *args, **kwargs)
        except Board.DoesNotExist:
            return ErrorResponse(status=HTTPStatus.NOT_FOUND)
        except Board.MultipleObjectsReturned:
            return ErrorResponse(status=HTTPStatus.BAD_GATEWAY)

    return wrapper
