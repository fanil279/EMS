from rest_framework import serializers
from .models import AppUser, Institution


class InstitutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Institution
        fields = "__all__"


class RegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    institution_name = serializers.CharField(required=False, allow_blank=True)
    institution_address = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = AppUser
        fields = ["id", "name", "email", "password", "institution_name", "institution_address"]

    def create(self, validated_data):
        password = validated_data.pop("password")
        institution_name = validated_data.pop("institution_name", None)
        institution_address = validated_data.pop("institution_address", None)
        institution = None

        if institution_name:
            institution_name = institution_name.strip()
            if institution_name:
                institution, created = Institution.objects.get_or_create(name=institution_name)
                if institution_address:
                    institution.address = institution_address
                    institution.save()

        validated_data["institution"] = institution

        user = AppUser(**validated_data)
        user.role = AppUser.Role.USER
        user.set_password(password)
        user.save()
        return user
