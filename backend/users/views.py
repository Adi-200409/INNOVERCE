from rest_framework import generics, status
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
