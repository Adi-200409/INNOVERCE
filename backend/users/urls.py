from django.urls import path
from .views import (
    RegistrationCreateView,
    RegistrationDetailView,
    RegistrationListView,
    TeamLoginView,
    UserLoginView,
    UserSignupView,
)

urlpatterns = [
    path('register/', RegistrationCreateView.as_view(), name='register'),
    path('login/', TeamLoginView.as_view(), name='team-login'),
    path('auth/signup/', UserSignupView.as_view(), name='user-signup'),
    path('auth/login/', UserLoginView.as_view(), name='user-login'),
    path('registrations/', RegistrationListView.as_view(), name='registration-list'),
    path('registrations/<str:confirmation_id>/', RegistrationDetailView.as_view(), name='registration-detail'),
]

