from django.urls import path
from .views import RegistrationCreateView, RegistrationDetailView, RegistrationListView

urlpatterns = [
    path('register/', RegistrationCreateView.as_view(), name='register'),
    path('registrations/', RegistrationListView.as_view(), name='registration-list'),
    path('registrations/<str:confirmation_id>/', RegistrationDetailView.as_view(), name='registration-detail'),
]

