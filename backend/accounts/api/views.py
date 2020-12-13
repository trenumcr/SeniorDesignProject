from rest_framework.generics import ListAPIView, RetrieveAPIView
from accounts.models import UserProfileInfo
from .serializers import AccountSerializer

class AccountListView(ListAPIView):
    queryset = UserProfileInfo.objects.all()
    serializer_class = AccountSerializer

class AccountDetailView(RetrieveAPIView):
    queryset = UserProfileInfo.objects.all()
    serializer_class = AccountSerializer
