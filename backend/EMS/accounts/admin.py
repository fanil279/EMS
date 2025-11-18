from django.contrib import admin
from .models import AppUser, Institution


@admin.register(AppUser)
class AppUserAdmin(admin.ModelAdmin):
    list_display = ("id", "email", "name", "role", "institution", "is_active", "is_staff")
    search_fields = ("email", "name")
    list_filter = ("role", "is_active", "is_staff")
    readonly_fields = ("id",)

    fieldsets = (
        (None, {
            "fields": ("email", "password")
        }),
        ("Personal info", {
            "fields": ("name", "role", "institution")
        }),
        ("Permissions", {
            "fields": ("is_active", "is_staff", "is_superuser", "groups", "user_permissions")
        }),
        ("Important dates", {
            "fields": ("last_login",)
        }),
    )

@admin.register(Institution)
class InstitutionAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "address")
    search_fields = ("name",)
