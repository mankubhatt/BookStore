from rest_framework import viewsets, permissions
from .models import Books
from .serializers import BooksSerializer

# Create your views here.
# Using the viewset because our case is pretty straightforward here
# Can Use Individual APIView but we don't need here as the question asked was very straight
class BookViewset(viewsets.ModelViewSet):
    queryset = Books.objects.all()
    serializer_class = BooksSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]