from django.urls import path, include
from rest_framework import routers
from bookstore import views as bookstore_views

router = routers.DefaultRouter()
router.register(r'books', bookstore_views.BookViewset)

urlpatterns = [
    path('', include(router.urls)),
]
