from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from drf_yasg.utils import swagger_auto_schema
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

from .models import Event, Registration
from .serializers import EventSerializer, RegistrationSerializer
from .permissions import IsOrganiserOrAdmin


class EventListCreateAPIView(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def get_permissions(self):
        if self.request.method == "POST":
            return [IsAuthenticated()]
        return [AllowAny()]

    def get_queryset(self):
        return Event.objects.order_by('-created_at')

    @swagger_auto_schema(
        operation_description="List all events (public)",
        security=[],
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="Create a new event (authenticated)",
        security=[{"Bearer": []}],
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)

    def perform_create(self, serializer):
        try:
            serializer.save(organiser=self.request.user)
        except ValueError as e:
            raise ValidationError({"detail": str(e)})


class LatestSixEventsAPIView(generics.ListAPIView):
    serializer_class = EventSerializer
    permission_classes = [AllowAny]

    @swagger_auto_schema(
        operation_description="Get the latest 6 events (public)",
        security=[],
    )
    def get(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    def get_queryset(self):
        return Event.objects.order_by("-created_at")[:6]


class EventRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsOrganiserOrAdmin]

    @swagger_auto_schema(
        operation_description="Update an event (organiser or admin only)",
        security=[{"Bearer": []}],
    )
    def put(self, request, *args, **kwargs):
        return super().put(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="Partial update an event (organiser or admin only)",
        security=[{"Bearer": []}],
    )
    def patch(self, request, *args, **kwargs):
        return super().patch(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="Delete an event (organiser or admin only)",
        security=[{"Bearer": []}],
    )
    def delete(self, request, *args, **kwargs):
        return super().delete(request, *args, **kwargs)


class RegistrationListCreateAPIView(generics.ListCreateAPIView):
    queryset = Registration.objects.all()
    serializer_class = RegistrationSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["participant"] = self.request.user
        return context

    def perform_create(self, serializer):
        registration = serializer.save()

        channel_layer = get_channel_layer()

        def notify_user(user_id, message):
            async_to_sync(channel_layer.group_send)(
                f"notifications_{user_id}",
                {
                    "type": "send_notification",
                    "message": message,
                }
            )

        notify_user(self.request.user.id,
                    f"You registered for {registration.event.title}!")
        notify_user(registration.event.organiser.id,
                    f"{self.request.user.name} registered for your event: {registration.event.title}")


class RegistrationRetrieveAPIView(generics.RetrieveAPIView):
    queryset = Registration.objects.all()
    serializer_class = RegistrationSerializer
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_description="Retrieve a registration (authenticated)",
        security=[{"Bearer": []}],
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)
