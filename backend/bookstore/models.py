from django.db import models

# Using very simple model as it's just a demo project
class Books(models.Model):
    name = models.CharField(max_length=100)