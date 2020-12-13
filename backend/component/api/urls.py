from django.urls import path
from component.api import views

app_name = 'component'

urlpatterns = [
    path('', views.ComponentListView.as_view(), name='components'),
    path('<pk>/', views.ComponentView.as_view(), name='component'),
    path('comments/', views.CommentListView.as_view(), name='comments'),
    path('comments/(?P<pk>\d+)/)/', views.CommentView.as_view(), name='comment'),
    path('specifications/', views.SpecificationListView.as_view(), name='specifications'),
    path('specifications/(?P<pk>\d+)/', views.SpecificationView.as_view(), name='specification'),
]
