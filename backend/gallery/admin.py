from django.contrib import admin
from unfold.admin import ModelAdmin, TabularInline

from core.admin_mixins import PhotoPreviewMixin, missing_photo_filter

from .models import GalleryAlbum, GalleryPhoto, GalleryVideo


class GalleryPhotoInline(TabularInline):
    model = GalleryPhoto
    extra = 3
    fields = ("image", "caption", "order")


class GalleryVideoInline(TabularInline):
    model = GalleryVideo
    extra = 1
    fields = ("video", "caption", "order")


@admin.register(GalleryAlbum)
class GalleryAlbumAdmin(PhotoPreviewMixin, ModelAdmin):
    photo_field_name = "cover_photo"
    list_display = ("photo_preview", "name", "category", "photo_count", "video_count", "order")
    list_display_links = ("name",)
    list_editable = ("order",)
    list_filter = ("category", missing_photo_filter("cover_photo"))
    search_fields = ("name",)
    inlines = [GalleryPhotoInline, GalleryVideoInline]

    @admin.display(description="Photos")
    def photo_count(self, obj):
        return obj.photos.count()

    @admin.display(description="Videos")
    def video_count(self, obj):
        return obj.videos.count()
