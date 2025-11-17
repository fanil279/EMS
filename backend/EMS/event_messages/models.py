from django.db import models
from accounts.models import AppUser
from events.models import Event

class Comment(models.Model):
    event = models.ForeignKey(
        Event,
        on_delete=models.CASCADE,
        related_name="event_comments"
    )
    user = models.ForeignKey(
        AppUser,
        on_delete=models.CASCADE,
        related_name="user_comments"
    )
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.name}: {self.content[:20]}..."
