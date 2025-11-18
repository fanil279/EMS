from django.contrib import admin
from .models import Event, Registration


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "location", "start_date", "end_date", "organiser")
    list_filter = ("start_date", "organiser")
    search_fields = ("title", "location", "organiser__username")


@admin.register(Registration)
class RegistrationAdmin(admin.ModelAdmin):
    list_display = ("id", "event", "participant", "created_at")
    list_filter = ("event",)
    search_fields = ("event__title", "participant__username")
