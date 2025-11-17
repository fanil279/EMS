from rest_framework import serializers
from .models import Analytics
from events.serializers import EventSerializer

class AnalyticsSerializer(serializers.ModelSerializer):
    event = EventSerializer(read_only=True)

    event_id = serializers.PrimaryKeyRelatedField(
        queryset=Event.objects.all(), source='event', write_only=True
    )

    class Meta:
        model = Analytics
        fields = ["id", "event", "total_registrations", "approved_registrations", "feedback_score", "created_at", "event_id"]
