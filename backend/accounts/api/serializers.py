from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from accounts.models import UserProfile

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'email')



class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'],
        validated_data['email'], validated_data['password'])

        return user



class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Invalid Credentials")


class ChangePasswordSerializer(serializers.Serializer):
    model = User

    """
    Serializer for password change endpoint.
    """
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)



class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    component_knowledge = serializers.ListField(
        allow_empty=True,
        child=serializers.CharField(
            max_length=200, allow_blank=True
        )
    )
    posts_made = serializers.ListField(
        allow_empty=True,
        child=serializers.CharField(
            max_length=200, allow_blank=True
        )
    )
    class Meta:
        model = UserProfile
        fields = '__all__'


    def create(self, validated_data):
        return UserProfile.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.image = validated_data.get('image', instance.image)
        instance.role = validated_data.get('role', instance.role)
        instance.school = validated_data.get('school', instance.school)
        instance.field_study = validated_data.get('field_study', instance.field_study)
        instance.about_me = validated_data.get('about_me', instance.about_me)
        instance.component_knowledge = validated_data.get('component_knowledge', instance.component_knowledge)
        instance.posts_made = validated_data.get('posts_made', instance.posts_made)
        instance.firstname = validated_data.get('firstname', instance.firstname)
        instance.lastname = validated_data.get('lastname', instance.lastname)
        
        instance.save()
        return instance
