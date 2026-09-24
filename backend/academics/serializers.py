from rest_framework import serializers

from .models import Award, AwardPhoto, Subject


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ["id", "tag", "title", "description", "photo", "order"]


class AwardPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = AwardPhoto
        fields = ["id", "image", "caption", "order"]


class AwardSerializer(serializers.ModelSerializer):
    extra_photos = AwardPhotoSerializer(many=True, read_only=True)

    class Meta:
        model = Award
        fields = ["id", "category", "title", "meta", "explanation", "photo", "extra_photos", "order"]
