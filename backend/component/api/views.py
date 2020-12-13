from rest_framework import generics
from component.models import *
from .serializers import *
from django.shortcuts import render

class ComponentListView(generics.ListCreateAPIView):
    queryset = Component.objects.all()
    serializer_class = ComponentSerializer

class ComponentView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ComponentSerializer
    queryset = Component.objects.all()

class CommentListView(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class CommentView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()

class SpecificationListView(generics.ListCreateAPIView):
    queryset = Specification.objects.all()
    serializer_class = SpecificationSerializer

class SpecificationView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = SpecificationSerializer
    queryset = Specification.objects.all()
