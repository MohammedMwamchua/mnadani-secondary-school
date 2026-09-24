from rest_framework import serializers

from .models import GalleryAlbum, GalleryPhoto, GalleryVideo


class GalleryPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = GalleryPhoto
        fields = ["id", "image", "caption", "order"]


class GalleryVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = GalleryVideo
        fields = ["id", "video", "caption", "order"]


class GalleryAlbumSerializer(serializers.ModelSerializer):
    category_display = serializers.CharField(source="get_category_display", read_only=True)
    photos = GalleryPhotoSerializer(many=True, read_only=True)
    videos = GalleryVideoSerializer(many=True, read_only=True)
    photo_count = serializers.IntegerField(source="photos.count", read_only=True)
    video_count = serializers.IntegerField(source="videos.count", read_only=True)

    class Meta:
        model = GalleryAlbum
        fields = [
            "id", "name", "category", "category_display", "cover_photo",
            "photo_count", "video_count", "photos", "videos", "order",
        ]
