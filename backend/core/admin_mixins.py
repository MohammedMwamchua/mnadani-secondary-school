from django.contrib import admin
from django.db.models import Q, ImageField
from django.utils.html import format_html

from .admin_widgets import NicePhotoWidget

class PhotoPreviewMixin:

    photo_field_name = "photo"
    photo_widget = NicePhotoWidget

    @admin.display(description="Photo")
    def photo_preview(self, obj):
        f = getattr(obj, self.photo_field_name, None)
        if f:
            return format_html('<img src="{}" class="mn-thumb" />', f.url)
        return format_html('<span class="mn-thumb-empty">{}</span>', "No photo")

    def formfield_for_dbfield(self, db_field, request, **kwargs):
        if db_field.name == self.photo_field_name and isinstance(db_field, ImageField):
            kwargs["widget"] = self.photo_widget
        return super().formfield_for_dbfield(db_field, request, **kwargs)

class MissingPhotoFilter(admin.SimpleListFilter):

    title = "photo"
    parameter_name = "has_photo"
    field_name = "photo"

    def lookups(self, request, model_admin):
        return (("no", "Missing photo"), ("yes", "Has photo"))

    def queryset(self, request, queryset):
        empty = Q(**{self.field_name: ""}) | Q(**{f"{self.field_name}__isnull": True})
        if self.value() == "no":
            return queryset.filter(empty)
        if self.value() == "yes":
            return queryset.exclude(empty)
        return queryset

def missing_photo_filter(field_name="photo"):
    return type(
        f"MissingPhotoFilter_{field_name}",
        (MissingPhotoFilter,),
        {"field_name": field_name},
    )
