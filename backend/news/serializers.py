from rest_framework import serializers

from .models import NewsPhoto, NewsPost


class NewsPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsPhoto
        fields = ["id", "image", "caption", "order"]


class NewsPostListSerializer(serializers.ModelSerializer):
    category_display = serializers.CharField(source="get_category_display", read_only=True)

    class Meta:
        model = NewsPost
        fields = ["id", "title", "date", "category", "category_display", "summary", "cover_photo"]


class NewsPostDetailSerializer(serializers.ModelSerializer):
    photos = NewsPhotoSerializer(many=True, read_only=True)
    category_display = serializers.CharField(source="get_category_display", read_only=True)

    class Meta:
        model = NewsPost
        fields = ["id", "title", "date", "category", "category_display", "summary", "body", "cover_photo", "photos"]
