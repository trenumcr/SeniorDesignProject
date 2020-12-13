from rest_framework import serializers
from accounts.models import UserProfileInfo

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfileInfo
        fields = '__all__'
