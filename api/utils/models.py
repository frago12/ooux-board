import uuid
from django.db import models


class BaseModel(models.Model):
    uuid = models.UUIDField(db_index=True, default=uuid.uuid4, editable=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True
