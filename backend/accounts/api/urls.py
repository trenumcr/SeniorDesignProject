from django.urls import path
from .views import AccountListView, AccountDetailView

urlpatterns = [
    path('/', AccountListView.as_view()),
    path('/<pk>', AccountDetailView.as_view()),
]
