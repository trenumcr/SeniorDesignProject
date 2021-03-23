from django.urls import path, include
from .views import UserProfileListView, UserProfileView, RegisterAPI, LoginAPI, UserAPI, ChangePasswordView, OtherUserProfileView, FilterUserProfileView, ContactUserView
from knox import views as knox_views

urlpatterns = [
    path('', UserProfileListView.as_view()),
    path('search/', FilterUserProfileView.as_view()),
    path('email/', ContactUserView.as_view()),
    path('auth/register/', RegisterAPI.as_view(), name='register'),
    path('auth/login/', LoginAPI.as_view(), name='login'),
    path('auth/logout/', knox_views.LogoutView.as_view(), name='logout'),
    path('auth/change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('auth/password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
    path('auth/user/', UserAPI.as_view(), name='user'),
    path('auth/user/profile/<str:user__username>/',UserProfileView.as_view(), name="profile"),
    path('auth/view/profile/<str:user__username>/',OtherUserProfileView.as_view(), name="profile"),
]
