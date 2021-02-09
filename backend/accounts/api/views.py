from rest_framework.views import APIView
from rest_framework import status, generics, permissions
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.postgres.search import SearchVector, SearchQuery
from .serializers import UserSerializer, UserProfileSerializer, RegisterSerializer, LoginSerializer, ChangePasswordSerializer
from accounts.models import UserProfile
from knox.models import AuthToken
from .permissions import IsUser



class RegisterAPI(generics.GenericAPIView):
    """
    An endpoint for creating a new user in the database.
    """
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token =  AuthToken.objects.create(user)[1]
        return Response({
        "user": UserSerializer(user, context=self.get_serializer_context()).data,
        "token": token,
        }, status=status.HTTP_201_CREATED)



class LoginAPI(generics.GenericAPIView):
    """
    An endpoint for logging in a user and returning an assigned authentication
    token for that user.
    """
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        token =  AuthToken.objects.create(user)[1]
        return Response({
        "user": UserSerializer(user, context=self.get_serializer_context()).data,
        "token": token,
        }, status=status.HTTP_200_OK)


class UserAPI(generics.RetrieveDestroyAPIView):
    """
    An endpoint for getting the user data.
    """
    permission_classes = [
        permissions.IsAuthenticated,
        IsUser
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class ChangePasswordView(generics.UpdateAPIView):
    """
    An endpoint for changing password.
    """
    serializer_class = ChangePasswordSerializer
    model = User
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Check old password
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
            # set_password also hashes the password that the user will get
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            response = {
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': 'Password updated successfully',
                'data': []
            }

            return Response(response)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserProfileListView(APIView):
    """
    An endpoint for veiwing the full list of registered users and their
    profiles.
    """
    def get(self, request):
        accounts = UserProfile.objects.all()
        serializer = UserProfileSerializer(accounts, many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)



class UserProfileView(generics.RetrieveUpdateDestroyAPIView):
    """
    An endpoint for getting, updating, or deleting the user's profile data.
    """
    serializer_class = UserProfileSerializer
    queryset = UserProfile.objects.all()
    permission_classes = [
        permissions.IsAuthenticated,
        IsUser,
    ]
    lookup_field = "user__username"

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)


class OtherUserProfileView(generics.RetrieveAPIView):
    """
    An endpoint for getting, updating, or deleting the user's profile data.
    """
    serializer_class = UserProfileSerializer
    queryset = UserProfile.objects.all()
    # permission_classes = [
    #     permissions.IsAuthenticated,
    # ]
    lookup_field = "user__username"

    def get_queryset(self):
        return self.queryset.filter()


class FilterUserProfileView(APIView):
    """
    An endpoint for filtering through profiles
    """

    def get(self, request):
        vector = SearchVector("component_knowledge", "posts_made", "role", "school", "field_study")
        search_terms = "p"

        if "component_knowledge" in self.request.query_params:
            search_terms += " " + self.request.query_params["component_knowledge"]

        if "posts_made" in self.request.query_params:
            search_terms += " " + self.request.query_params["posts_made"]

        # if "role" in self.request.query_params:
        #     incorrect_input = False
        #     role = self.request.query_params["role"].lower()
        #
        #     if role == "student" or role == "s" or role == "students":
        #         search_role = "s"
        #     elif role == "professor" or role == "p" or role == "professors":
        #         search_role = "p"
        #     else:
        #         incorrect_input = True
        #
        #     if not incorrect_input:
        #         search_terms += search_role + " "

        if "school" in self.request.query_params:
            search_terms += " " + self.request.query_params["school"]


        if "field_study" in self.request.query_params:
            search_terms += " " + self.request.query_params["field_study"]

        query = SearchQuery(search_terms)

        accounts = UserProfile.objects.annotate(search=vector).filter(search=query)

        serializer = UserProfileSerializer(accounts, many=True)
        if not serializer.data:
            return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(serializer.data,status=status.HTTP_200_OK)
