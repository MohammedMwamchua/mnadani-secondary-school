from django.contrib import admin
from unfold.admin import ModelAdmin, TabularInline

from core.admin_mixins import PhotoPreviewMixin, missing_photo_filter

from .models import NewsPhoto, NewsPost


class NewsPhotoInline(TabularInline):
    model = NewsPhoto
    extra = 1
    fields = ("image", "caption", "order")


@admin.register(NewsPost)
class NewsPostAdmin(PhotoPreviewMixin, ModelAdmin):
    photo_field_name = "cover_photo"
    list_display = ("photo_preview", "title", "category", "date", "status", "updated_at")
    list_filter = ("status", "category", "date", missing_photo_filter("cover_photo"))
    search_fields = ("title", "summary", "body")
    date_hierarchy = "date"
    inlines = [NewsPhotoInline]
    fieldsets = (
        (None, {"fields": ("title", "date", "category", "status")}),
        ("Content", {"fields": ("summary", "body")}),
        ("Cover photo", {"fields": ("cover_photo",)}),
    )
