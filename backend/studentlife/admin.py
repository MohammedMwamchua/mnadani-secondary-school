from django.contrib import admin
from unfold.admin import ModelAdmin, TabularInline

from core.admin_mixins import PhotoPreviewMixin, missing_photo_filter

from .models import ClubActivity, ClubActivityPhoto


class ClubActivityPhotoInline(TabularInline):
    model = ClubActivityPhoto
    extra = 1
    fields = ("image", "caption", "order")


@admin.register(ClubActivity)
class ClubActivityAdmin(PhotoPreviewMixin, ModelAdmin):
    photo_field_name = "cover_photo"
    list_display = ("photo_preview", "title", "tag", "order")
    list_display_links = ("title",)
    list_editable = ("order",)
    list_filter = ("tag", missing_photo_filter("cover_photo"))
    search_fields = ("title", "description", "achievements")
    inlines = [ClubActivityPhotoInline]
