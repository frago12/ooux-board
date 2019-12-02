from django.contrib.auth.models import User
from django.contrib.postgres.fields import JSONField
from django.db import models

from utils.models import BaseModel


def serializeBoard(uuid, title, data=None):
    board = dict(id=uuid, title=title,)

    if data is not None:
        board.update({"data": data})

    return board


class Board(BaseModel):
    title = models.CharField(max_length=500)
    data = JSONField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user")

    class Meta:
        ordering = ("-created",)

    def __str__(self):
        return self.title
