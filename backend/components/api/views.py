from rest_framework.views import APIView
from rest_framework import status, generics, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from accounts.models import UserProfile
from accounts.api.permissions import IsUser
from knox.models import AuthToken
from rest_framework.authtoken.serializers import AuthTokenSerializer
from .views_function import *


class ComponentView(APIView):
    '''
    An endpoint to view the component
    '''

    def get(self, requests, *args, **kwargs):
        return get_component(requests)

class FilterComponentView(APIView):
    '''
    An endpoint to filter components for search request
    '''
    def get(self, requests, *args, **kwargs):
        if "general" in requests.query_params:
            return general_filter_component(requests)
        else:
            return key_filter_component(requests)

class AuthComponentView(APIView):
    '''
    An endpoint to view the component
    '''
    permission_classes = [
        permissions.IsAuthenticated,
        IsUser,
    ]

    def get(self, requests, *args, **kwargs):
        return get_component(requests)

    def post(self, requests, *args, **kwargs):
        return post_component(requests)

    def patch(self, requests, *args, **kwargs):
        return update_component(requests)

    def delete(self, requests, *args, **kwargs):
        return delete_component(requests)

class AuthCommentView(APIView):
    '''
    An endpoint to post comment
    '''
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    def post(self, requests, *args, **kwargs):
        return post_comment(requests)



class AuthVoteView(APIView):
    '''
    An endpoint to post comment
    '''
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def patch(self, requests, *args, **kwargs):
        return update_vote(requests)
