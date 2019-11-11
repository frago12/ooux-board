import json

from django.views.generic import View

from utils.response import SuccessResponse


class BoardListView(View):
    def get(self, request):
        return SuccessResponse({ 'passed': True })
