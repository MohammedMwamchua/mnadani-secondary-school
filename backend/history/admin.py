from django.contrib import admin
from unfold.admin import ModelAdmin

from core.admin_mixins import PhotoPreviewMixin, missing_photo_filter
from core.admin_widgets import NiceAvatarWidget

from .models import CampusPhoto, Headteacher, HistoryEvent, NotableTeacher


@admin.register(HistoryEvent)
class HistoryEventAdmin(PhotoPreviewMixin, ModelAdmin):
    list_display = ("photo_preview", "year", "title", "order")
    list_display_links = ("title",)
    list_editable = ("order",)
    list_filter = (missing_photo_filter("photo"),)
    search_fields = ("year", "title", "description")


@admin.register(Headteacher)
class HeadteacherAdmin(PhotoPreviewMixin, ModelAdmin):
    photo_widget = NiceAvatarWidget
    list_display = ("photo_preview", "name", "period_label", "order")
    list_display_links = ("name",)
    list_editable = ("order",)
    list_filter = (missing_photo_filter("photo"),)
    search_fields = ("name", "story")

    @admin.display(description="Years led")
    def period_label(self, obj):
        return obj.period_label


@admin.register(CampusPhoto)
class CampusPhotoAdmin(PhotoPreviewMixin, ModelAdmin):
    photo_field_name = "image"
    list_display = ("photo_preview", "caption", "order")
    list_display_links = ("caption",)
    list_editable = ("order",)
    search_fields = ("caption",)


@admin.register(NotableTeacher)
class NotableTeacherAdmin(PhotoPreviewMixin, ModelAdmin):
    photo_widget = NiceAvatarWidget
    list_display = ("photo_preview", "name", "subject", "years", "order")
    list_display_links = ("name",)
    list_editable = ("order",)
    list_filter = (missing_photo_filter("photo"),)
    search_fields = ("name", "subject", "story")
