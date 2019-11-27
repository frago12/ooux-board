from django.urls import path

from utils.decorators import login_required
from boards.views import BoardListView, BoardView

urlpatterns = [
    path("", login_required(BoardListView.as_view()), name="boards"),
    path("<str:board_id>", login_required(BoardView.as_view()), name="board"),
]
