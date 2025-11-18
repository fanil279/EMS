from rest_framework.permissions import BasePermission


class IsOrganiserOrAdmin(BasePermission):
    """
    Allows access only to:
    - the organiser of the event
    - or a superuser (admin)
    """

    def has_object_permission(self, request, view, obj):
        if request.user.is_superuser:
            return True

        if hasattr(obj, "organiser"):
            return obj.organiser == request.user

        if hasattr(obj, "event"):
            return obj.event.organiser == request.user

        return False
