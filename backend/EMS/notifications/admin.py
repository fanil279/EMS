from django.contrib import admin
from .models import Notification


@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'event', 'is_read', 'message_short', 'created_at')
    list_filter = ('is_read', 'user')
    search_fields = ('user__username', 'message')
    ordering = ('-id',)

    def message_short(self, obj):
        return obj.message[:50] + ('...' if len(obj.message) > 50 else '')
    message_short.short_description = "Message"
