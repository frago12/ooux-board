import uuid


def make_uuid(*args, **kwargs):
    return str(uuid.uuid4()).replace("-", "")
