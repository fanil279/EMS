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

        response = Response({
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

        response.set_cookie(
            key='access_token',
            value=str(refresh.access_token),
            httponly=True,
            secure=False,
            samesite='Lax',
            max_age=3600
        )
        response.set_cookie(
            key='refresh_token',
            value=str(refresh),
            httponly=True,
            secure=False,
            samesite='Lax',
            max_age=86400 * 3
        )
        
        return response


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
            response.delete_cookie('access_token')
            response.delete_cookie('refresh_token')
            
            return response
        except Exception as e:
            return Response(
                {"error": "Logout failed"}, 
                status=status.HTTP_400_BAD_REQUEST
            )

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
        response = super().post(request, *args, **kwargs)
        
        if response.status_code == 200:
            data = response.data
            
            response.set_cookie(
                key='access_token',
                value=data['user']['token'],
                httponly=True,
                secure=False,
                samesite='Lax',
                max_age=3600
            )
            response.set_cookie(
                key='refresh_token',
                value=data['refresh'],
                httponly=True,
                secure=False,
                samesite='Lax',
                max_age=86400 * 3
            )
        
        return response
