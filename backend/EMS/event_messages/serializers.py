from rest_framework import serializers
from .models import Comment
from accounts.serializers import AppUserSerializer
from events.serializers import EventSerializer

class CommentSerializer(serializers.ModelSerializer):
    event = EventSerializer(read_only=True)
    user = AppUserSerializer(read_only=True)

    event_id = serializers.PrimaryKeyRelatedField(
        queryset=Event.objects.all(), source='event', write_only=True
    )
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=AppUser.objects.all(), source='user', write_only=True
    )

    class Meta:
        model = Comment
        fields = ["id", "event", "user", "content", "created_at", "event_id", "user_id"]
