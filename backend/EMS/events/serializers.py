from rest_framework import serializers
from .models import Event, Registration
from accounts.models import AppUser


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppUser
        fields = ["id", "name", "email", "role"]


class EventSerializer(serializers.ModelSerializer):
    organiser = UserSerializer(read_only=True)

    class Meta:
        model = Event
        fields = [
            "id", "title", "description", "location", 
            "start_date", "end_date", "registration_deadline", "organiser"
        ]
        read_only_fields = ["organiser"]


class RegistrationSerializer(serializers.ModelSerializer):
    participant = UserSerializer(read_only=True)
    event = EventSerializer(read_only=True)
    event_id = serializers.PrimaryKeyRelatedField(
        queryset=Event.objects.all(), source='event', write_only=True
    )

    class Meta:
        model = Registration
        fields = ["id", "event", "event_id", "participant", "created_at"]
        read_only_fields = ["participant", "created_at"]
        ref_name = "EventsRegistrationSerializer"
