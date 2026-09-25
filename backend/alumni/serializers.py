from rest_framework import serializers

from core.validators import validate_image_file

from .models import Alumnus

class AlumnusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alumnus
        fields = [
            "id", "full_name", "year_finished", "level", "photo",
            "current_role", "organisation", "city", "country", "phone",
            "history_at_school", "achievements_after", "message_to_students",
            "featured", "highlighted",
        ]

class AlumnusSubmissionSerializer(serializers.ModelSerializer):

    # Redeclaring the field drops the model's validators, so they must be repeated here.
    photo = serializers.ImageField(required=True, validators=[validate_image_file])

    class Meta:
        model = Alumnus
        fields = [
            "full_name", "year_finished", "level", "photo",
            "current_role", "organisation", "city", "country", "phone",
            "history_at_school", "achievements_after", "message_to_students",
        ]

    def create(self, validated_data):
        validated_data["source"] = Alumnus.Source.SELF_SUBMITTED
        validated_data["approval_status"] = Alumnus.ApprovalStatus.PENDING
        validated_data["permission_received"] = True
        validated_data["show_on_website"] = True
        return super().create(validated_data)
