from django.db import models

class Institution(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name

class AppUser(models.Model):
    class Role(models.TextChoices):
        ADMIN = "admin", "Admin"
        ORGANISER = "organiser", "Organiser"
        PARTICIPANT = "participant", "Participant"

    name = models.CharField(max_length=150)
    email = models.EmailField(unique=True)
    password_hash = models.CharField(max_length=255)
    role = models.CharField(max_length=20, choices=Role.choices)
    institution = models.ForeignKey(
        Institution,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="users"
    )

    def __str__(self):
        return f"{self.name} ({self.role})"
