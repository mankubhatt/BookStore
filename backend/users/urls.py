from django.urls import path
from users import views as user_views

urlpatterns = [
    path('', user_views.UserAPIView.as_view(), name='user'),
    path('register/', user_views.RegisterUserAPIView.as_view(), name='register'),
    ]
