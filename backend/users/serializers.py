from django.contrib.auth.models import User
from rest_framework import serializers

# Creating a User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'username']

#Creating a Register User Serializer
class RegisterUserSerializer(serializers.ModelSerializer):
    # Using create_user method to hash the password for us
    def create(self, validated_data):
        user = User.objects.create_user(
            email = validated_data['email'],
            username = validated_data['username'],
            password = validated_data['password']
        )
        return user

    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'password']