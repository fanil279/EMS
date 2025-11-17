from django.db import models
from accounts.models import AppUser
from events.models import Event

class Notification(models.Model):
    user = models.ForeignKey(AppUser, on_delete=models.CASCADE, related_name="app_notifications")
    message = models.TextField()
    event = models.ForeignKey(Event, on_delete=models.CASCADE, null=True, blank=True, related_name="app_notifications")
    is_read = models.BooleanField(default=False)

    def __str__(self):
        return f"Notification for {self.user.name}"
