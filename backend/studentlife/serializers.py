from rest_framework import serializers

from .models import ClubActivity, ClubActivityPhoto


class ClubActivityPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClubActivityPhoto
        fields = ["id", "image", "caption", "order"]


class ClubActivitySerializer(serializers.ModelSerializer):
    extra_photos = ClubActivityPhotoSerializer(many=True, read_only=True)

    class Meta:
        model = ClubActivity
        fields = ["id", "tag", "title", "description", "achievements", "cover_photo", "extra_photos", "order"]
