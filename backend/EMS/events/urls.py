from django.urls import path
from .views import (
    EventListCreateAPIView,
    EventRetrieveUpdateDestroyAPIView,
    RegistrationListCreateAPIView,
    EventRegistrationsAPIView,
    LatestSixEventsAPIView,
)

urlpatterns = [
    # Events
    path("events/", EventListCreateAPIView.as_view(), name="event-list-create"),
    path("events/latest/", LatestSixEventsAPIView.as_view(), name="event-latest"),
    path("events/<int:pk>/", EventRetrieveUpdateDestroyAPIView.as_view(), name="event-detail"),

    # Registrations
    path("registrations/", RegistrationListCreateAPIView.as_view(), name="registration-list-create"),
    path("<int:event_id>/registrations/", EventRegistrationsAPIView.as_view(), name="event-registrations"),
]
