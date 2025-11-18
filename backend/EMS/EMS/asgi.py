import os
from notifications.middleware import JWTAuthMiddleware
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
import notifications.urls


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "EMS.settings")

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": JWTAuthMiddleware(
        URLRouter(
            notifications.urls.websocket_urlpatterns
        )
    ),
})
