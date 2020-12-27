from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from component.models import *
from .serializers import *
from django.shortcuts import render
from .view_functions import *

class ComponentListView(APIView):
    def get(self, requests, *args, **kwargs):
        queryset = Component.objects.all()
        serializer = ComponentSerializer(queryset, many=True)
        return Response(serializer.data)


class ComponentView(APIView):
    def get(self, requests, *args, **kwargs):
        return get_component(requests)

    def post(self, requests, *args, **kwargs):
        return post_component(requests)

    def put(self, requests, *args, **kwargs):
        return update_component(requests)
