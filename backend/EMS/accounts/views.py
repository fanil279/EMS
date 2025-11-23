from rest_framework import generics, status, serializers
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from .models import AppUser
from .serializers import RegistrationSerializer
from django.contrib.auth import authenticate


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

        return Response({
            "user": {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "institutionName": user.institution.name if user.institution else None,
                "institutionAddress": user.institution.address if user.institution else None,
                "token": str(refresh.access_token),
            },
            "refresh": str(refresh)
        }, status=status.HTTP_201_CREATED)


class LogoutView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_description="Logout user (requires authentication)",
        security=[{"Bearer": []}],
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=["refresh"],
            properties={
                "refresh": openapi.Schema(type=openapi.TYPE_STRING, description="Refresh token")
            }
        ),
        responses={205: "User logged out successfully", 400: "Invalid token"}
    )
    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": "User logged out successfully"}, status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)

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
        return {
            "user": {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "institutionName": user.institution.name if user.institution else None,
                "institutionAddress": user.institution.address if user.institution else None,
                "token": str(refresh.access_token),
            },
            "refresh": str(refresh)
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
        return super().post(request, *args, **kwargs)
