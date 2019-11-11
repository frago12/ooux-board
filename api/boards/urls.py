from django.conf.urls import url

from utils.decorators import login_required
from boards.views import BoardListView

urlpatterns = [
    url(r"", login_required(BoardListView.as_view()), name="boards")
]
