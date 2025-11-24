from rest_framework import generics, status, serializers
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.contrib.auth import authenticate

from .models import AppUser
from .serializers import RegistrationSerializer

import os
IS_DEV = os.getenv("DJANGO_ENV", "development") == "development"


# Registration
class RegistrationView(generics.CreateAPIView):
    serializer_class = RegistrationSerializer
    permission_classes = [AllowAny]

    @swagger_auto_schema(
        operation_description="Register a new user (public endpoint)",
        security=[],
        responses={201: openapi.Response('User created successfully')}
    )
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        refresh_token = str(refresh)

        response = Response({
            "user": {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "institutionName": user.institution.name if user.institution else None,
                "institutionAddress": user.institution.address if user.institution else None,
            },
            "token": access_token,
            "refresh": refresh_token
        }, status=status.HTTP_201_CREATED)

        response.set_cookie(
            key='access_token',
            value=access_token,
            httponly=True,
            secure=not IS_DEV,
            samesite="Lax" if IS_DEV else "None",
            max_age=3600,
            path='/'
        )
        response.set_cookie(
            key='refresh_token',
            value=refresh_token,
            httponly=True,
            secure=not IS_DEV,
            samesite="Lax" if IS_DEV else "None",
            max_age=86400*3,
            path='/'
        )

        return response


# Logout
class LogoutView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.COOKIES.get('refresh_token')
            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()

            response = Response(
                {"message": "User logged out successfully"},
                status=status.HTTP_205_RESET_CONTENT
            )

            # Delete cookies
            response.delete_cookie(
                'access_token',
                path='/',
                secure=not IS_DEV,
                samesite="Lax" if IS_DEV else "None"
            )
            response.delete_cookie(
                'refresh_token',
                path='/',
                secure=not IS_DEV,
                samesite="Lax" if IS_DEV else "None"
            )

            return response
        except Exception:
            return Response(
                {"error": "Logout failed"},
                status=status.HTTP_400_BAD_REQUEST
            )


# Login
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = "email"

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        user = authenticate(email=email, password=password)
        if not user:
            raise serializers.ValidationError("Invalid email or password")

        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        refresh_token = str(refresh)

        return {
            "user": {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "institutionName": user.institution.name if user.institution else None,
                "institutionAddress": user.institution.address if user.institution else None,
            },
            "token": access_token,
            "refresh": refresh_token
        }


class EmailTokenObtainPairView(TokenObtainPairView):
    serializer_class = EmailTokenObtainPairSerializer

    @swagger_auto_schema(
        operation_description="Login and obtain JWT token (public endpoint)",
        security=[],
        request_body=EmailTokenObtainPairSerializer,
        responses={200: "JWT tokens with user info"}
    )
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        if response.status_code == 200:
            access_token = response.data['token']
            refresh_token = response.data['refresh']

            response.set_cookie(
                key='access_token',
                value=access_token,
                httponly=True,
                secure=not IS_DEV,
                samesite="Lax" if IS_DEV else "None",
                max_age=3600,
                path='/'
            )
            response.set_cookie(
                key='refresh_token',
                value=refresh_token,
                httponly=True,
                secure=not IS_DEV,
                samesite="Lax" if IS_DEV else "None",
                max_age=86400*3,
                path='/'
            )

        return response
