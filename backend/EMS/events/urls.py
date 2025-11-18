from django.urls import path
from .views import (
    EventListCreateAPIView,
    EventRetrieveUpdateDestroyAPIView,
    RegistrationListCreateAPIView,
    RegistrationRetrieveAPIView,
)

urlpatterns = [
    # Events
    path("events/", EventListCreateAPIView.as_view(), name="event-list-create"),
    path("events/<int:pk>/", EventRetrieveUpdateDestroyAPIView.as_view(), name="event-detail"),

    # Registrations
    path("registrations/", RegistrationListCreateAPIView.as_view(), name="registration-list-create"),
    path("registrations/<int:pk>/", RegistrationRetrieveAPIView.as_view(), name="registration-detail"),
]
