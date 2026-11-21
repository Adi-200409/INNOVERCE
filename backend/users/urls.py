from django.urls import path
from .views import (
    RegistrationCreateView,
    RegistrationDetailView,
    RegistrationListView,
    RegistrationStatsView,
    CheckTeamNameView,
    HealthCheckView,
    TeamLoginView,
    UserLoginView,
    UserSignupView,
)

urlpatterns = [
    path('register/', RegistrationCreateView.as_view(), name='register'),
    path('login/', TeamLoginView.as_view(), name='team-login'),
    path('auth/signup/', UserSignupView.as_view(), name='user-signup'),
    path('auth/login/', UserLoginView.as_view(), name='user-login'),
    path('health/', HealthCheckView.as_view(), name='api-health'),
    path('check-team-name/', CheckTeamNameView.as_view(), name='check-team-name'),
    path('stats/', RegistrationStatsView.as_view(), name='registration-stats'),
    path('registrations/', RegistrationListView.as_view(), name='registration-list'),
    path('registrations/<str:confirmation_id>/', RegistrationDetailView.as_view(), name='registration-detail'),
]

