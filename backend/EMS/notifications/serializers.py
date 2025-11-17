from rest_framework import serializers
from .models import Notification
from accounts.serializers import AppUserSerializer
from events.serializers import EventSerializer

class NotificationSerializer(serializers.ModelSerializer):
    user = AppUserSerializer(read_only=True)
    event = EventSerializer(read_only=True)

    user_id = serializers.PrimaryKeyRelatedField(
        queryset=AppUser.objects.all(), source='user', write_only=True
    )
    event_id = serializers.PrimaryKeyRelatedField(
        queryset=Event.objects.all(), source='event', write_only=True, allow_null=True, required=False
    )

    class Meta:
        model = Notification
        fields = ["id", "user", "event", "message", "is_read", "user_id", "event_id"]
