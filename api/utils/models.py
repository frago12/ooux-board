from django.db import models

from utils.common import make_uuid


class BaseModel(models.Model):
    uuid = models.CharField(db_index=True, max_length=32, unique=True)
    created = models.DateTimeField(auto_now=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        if not self.uuid:
            self.uuid = make_uuid()
            while type(self).objects.filter(uuid=self.uuid).exists():
                self.uuid = make_uuid()
        return super(BaseModel, self).save(*args, **kwargs)
