from rest_framework import serializers
from .models import Event, Registration
from accounts.serializers import AppUserSerializer

class EventSerializer(serializers.ModelSerializer):
    organiser = AppUserSerializer(read_only=True)

    class Meta:
        model = Event
        fields = ["id", "title", "description", "location", "start_date", "end_date", "organiser"]

class RegistrationSerializer(serializers.ModelSerializer):
    event = EventSerializer(read_only=True)
    participant = AppUserSerializer(read_only=True)

    event_id = serializers.PrimaryKeyRelatedField(
        queryset=Event.objects.all(), source='event', write_only=True
    )
    participant_id = serializers.PrimaryKeyRelatedField(
        queryset=AppUser.objects.all(), source='participant', write_only=True
    )

    class Meta:
        model = Registration
        fields = ["id", "event", "participant", "status", "event_id", "participant_id"]
