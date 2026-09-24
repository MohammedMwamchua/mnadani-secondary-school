from django.contrib import admin
from unfold.admin import ModelAdmin, TabularInline

from core.admin_mixins import PhotoPreviewMixin, missing_photo_filter

from .models import Award, AwardPhoto, Subject


@admin.register(Subject)
class SubjectAdmin(PhotoPreviewMixin, ModelAdmin):
    list_display = ("photo_preview", "title", "tag", "order")
    list_display_links = ("title",)
    list_editable = ("order",)
    list_filter = ("tag",)
    search_fields = ("title", "tag", "description")


class AwardPhotoInline(TabularInline):
    model = AwardPhoto
    extra = 1
    fields = ("image", "caption", "order")


@admin.register(Award)
class AwardAdmin(PhotoPreviewMixin, ModelAdmin):
    list_display = ("photo_preview", "title", "category", "meta", "order")
    list_display_links = ("title",)
    list_editable = ("order",)
    list_filter = ("category", missing_photo_filter("photo"))
    search_fields = ("title", "meta", "explanation")
    inlines = [AwardPhotoInline]
