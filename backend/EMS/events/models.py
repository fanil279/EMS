from django.db import models
from accounts.models import AppUser
from django.utils import timezone

class Event(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    location = models.CharField(max_length=255)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    registration_deadline = models.DateTimeField(
        null=True, blank=True,
        help_text="Deadline for participants to register for the event"
    )
    organiser = models.ForeignKey(
        AppUser,
        on_delete=models.CASCADE,
        related_name="organised_events"
    )

    def __str__(self):
        return self.title

    def is_registration_open(self):
        if self.registration_deadline:
            return timezone.now() <= self.registration_deadline
        return True


class Registration(models.Model):
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
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.participant.name} -> {self.event.title}"

    def save(self, *args, **kwargs):
        if self.event.registration_deadline and timezone.now() > self.event.registration_deadline:
            raise ValueError("Cannot register: registration deadline has passed.")
        super().save(*args, **kwargs)
