from django.contrib.auth.models import User
from django.contrib.postgres.fields import JSONField
from django.db import models

from utils.models import BaseModel


class Board(BaseModel):
    title = models.CharField(max_length=500)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user')
    data = JSONField()

    def serialize(self):
        return dict(
            id=self.uuid,
            title=self.title,
            data=self.data
        )
