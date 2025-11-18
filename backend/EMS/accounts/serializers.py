from rest_framework import serializers
from .models import AppUser, Institution


class InstitutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Institution
        fields = "__all__"

class RegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = AppUser
        fields = ["id", "name", "email", "password", "institution"]

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = AppUser(**validated_data)
        user.role = AppUser.Role.USER
        user.set_password(password)
        user.save()
        return user
