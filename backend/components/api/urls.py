from django.urls import path, include
from .views import ComponentView, AuthComponentView, AuthCommentView, AuthVoteView, FilterComponentView, FileView, CategoryListView

urlpatterns = [
    path('', ComponentView.as_view()),
    path('categories/', CategoryListView.as_view()),
    path('file/', FileView.as_view()),
    path('filter/', FilterComponentView.as_view()),
    path('auth/', AuthComponentView.as_view()),
    path('auth/comment/', AuthCommentView.as_view()),
    path('auth/comment/vote/', AuthVoteView.as_view()),
]
