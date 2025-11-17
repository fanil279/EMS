from django.db import models
from accounts.models import AppUser

class Event(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    location = models.CharField(max_length=255)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    organiser = models.ForeignKey(
        AppUser,
        on_delete=models.CASCADE,
        related_name="organised_events"
    )

    def __str__(self):
        return self.title

class Registration(models.Model):
    class Status(models.TextChoices):
        PENDING = "pending", "Pending"
        APPROVED = "approved", "Approved"
        REJECTED = "rejected", "Rejected"

    event = models.ForeignKey(
        Event,
        on_delete=models.CASCADE,
        related_name="registrations"
    )
    participant = models.ForeignKey(
        AppUser,
        on_delete=models.CASCADE,
        related_name="event_registrations"
    )
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDING)

    def __str__(self):
        return f"{self.participant.name} -> {self.event.title} [{self.status}]"
