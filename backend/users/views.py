from rest_framework import permissions
from rest_framework.generics import CreateAPIView, RetrieveAPIView
from .serializers import UserSerializer, RegisterUserSerializer

# Create your views here.
# Authentication is Done using JWT Authentication
# User API View to get the user
class UserAPIView(RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

# Register API View to register a new user
class RegisterUserAPIView(CreateAPIView):
    serializer_class = RegisterUserSerializer
    permission_classes = [permissions.AllowAny]