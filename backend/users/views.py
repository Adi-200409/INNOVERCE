from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import Registration
from .serializers import RegistrationSerializer


class RegistrationCreateView(generics.CreateAPIView):
    queryset = Registration.objects.all()
    serializer_class = RegistrationSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        registration = serializer.save()
        headers = self.get_success_headers(serializer.data)
        return Response(
            {
                "success": True,
                "message": f"Team '{registration.team_name}' successfully registered for INNOVERSE 3.0!",
                "confirmationId": registration.confirmation_id,
                "data": serializer.data,
            },
            status=status.HTTP_201_CREATED,
            headers=headers
        )


class RegistrationDetailView(generics.RetrieveAPIView):
    queryset = Registration.objects.all()
    serializer_class = RegistrationSerializer
    permission_classes = [AllowAny]
    lookup_field = 'confirmation_id'


class RegistrationListView(generics.ListAPIView):
    queryset = Registration.objects.all()
    serializer_class = RegistrationSerializer
    permission_classes = [AllowAny]


class TeamLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        email = (request.data.get('leaderEmail') or request.data.get('leader_email') or request.data.get('email') or '').strip()
        confirmation_id = (request.data.get('confirmationId') or request.data.get('confirmation_id') or '').strip()

        if not email or not confirmation_id:
            return Response(
                {"success": False, "message": "Leader email and confirmation ID are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        registration = Registration.objects.filter(
            leader_email__iexact=email,
            confirmation_id__iexact=confirmation_id,
        ).first()

        if not registration:
            return Response(
                {"success": False, "message": "No squad found matching that leader email and confirmation ID."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        serializer = RegistrationSerializer(registration)
        return Response(
            {
                "success": True,
                "message": f"Welcome back, {registration.team_name}!",
                "confirmationId": registration.confirmation_id,
                "data": serializer.data,
            },
            status=status.HTTP_200_OK,
        )


class UserSignupView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        name = (request.data.get('name') or '').strip()
        email = (request.data.get('email') or '').strip().lower()
        password = request.data.get('password') or ''

        if not name or not email or not password:
            return Response(
                {"success": False, "message": "Name, email, and password are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            validate_email(email)
        except ValidationError:
            return Response(
                {"success": False, "message": "Please enter a valid email address."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if len(password) < 6:
            return Response(
                {"success": False, "message": "Password must be at least 6 characters."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if User.objects.filter(email__iexact=email).exists() or User.objects.filter(username__iexact=email).exists():
            return Response(
                {"success": False, "message": "An account with this email already exists. Please log in."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = User.objects.create_user(
            username=email,
            email=email,
            password=password,
            first_name=name[:150],
        )

        return Response(
            {
                "success": True,
                "message": "Account created successfully.",
                "user": {
                    "id": user.id,
                    "name": user.first_name or user.email,
                    "email": user.email,
                },
            },
            status=status.HTTP_201_CREATED,
        )


class UserLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        email = (request.data.get('email') or '').strip().lower()
        password = request.data.get('password') or ''

        if not email or not password:
            return Response(
                {"success": False, "message": "Email and password are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        matched_user = User.objects.filter(email__iexact=email).first()
        username = matched_user.username if matched_user else email
        user = authenticate(request, username=username, password=password)

        if not user:
            return Response(
                {"success": False, "message": "Invalid email or password."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        return Response(
            {
                "success": True,
                "message": "Signed in successfully.",
                "user": {
                    "id": user.id,
                    "name": user.first_name or user.email,
                    "email": user.email,
                },
            },
            status=status.HTTP_200_OK,
        )
