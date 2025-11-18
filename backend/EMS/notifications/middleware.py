from urllib.parse import parse_qs
from channels.db import database_sync_to_async
from rest_framework_simplejwt.tokens import AccessToken
from django.contrib.auth import get_user_model
from channels.middleware import BaseMiddleware

User = get_user_model()

class JWTAuthMiddleware(BaseMiddleware):
    """
    Custom middleware for authenticating WebSocket using JWT.
    """
    async def __call__(self, scope, receive, send):
        query_string = scope.get('query_string', b'').decode()
        params = parse_qs(query_string)
        token = params.get('token')
        if token:
            try:
                access_token = AccessToken(token[0])
                user_id = access_token['user_id']
                scope['user'] = await database_sync_to_async(User.objects.get)(id=user_id)
            except Exception:
                scope['user'] = None
        else:
            scope['user'] = None
        return await super().__call__(scope, receive, send)
