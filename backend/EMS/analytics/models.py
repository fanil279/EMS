from django.db import models
from events.models import Event

class Analytics(models.Model):
    event = models.OneToOneField(Event, on_delete=models.CASCADE, related_name="analytics")
    total_registrations = models.IntegerField(default=0)
    approved_registrations = models.IntegerField(default=0)
    feedback_score = models.DecimalField(max_digits=3, decimal_places=2, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Analytics for {self.event.title}"
