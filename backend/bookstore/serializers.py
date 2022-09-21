from .models import Books
from rest_framework import serializers

# Simple Book Serializer to take care of the model to python native data type conversion and vice-versa
class BooksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Books
        fields = '__all__'