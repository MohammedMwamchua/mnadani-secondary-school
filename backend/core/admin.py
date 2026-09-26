from django.contrib import admin
from unfold.admin import ModelAdmin

from .admin_mixins import PhotoPreviewMixin, missing_photo_filter
from .models import ContactMessage, HomeBannerSlide, QuickLinkCard, SiteInfo

@admin.register(SiteInfo)
class SiteInfoAdmin(PhotoPreviewMixin, ModelAdmin):
    photo_field_name = "entrance_signboard_photo"
    fieldsets = (
        ("Identity", {"fields": ("school_name", "necta_centre_number", "founded_year", "school_type")}),
        ("Vision, motto & mission", {"fields": ("vision", "motto", "mission", "introduction", "headteacher_message")}),
        ("Contact & location", {"fields": ("address", "po_box", "email", "phone", "office_hours", "administered_by", "map_coordinates", "entrance_signboard_photo")}),
    )

    def has_add_permission(self, request):
        return not SiteInfo.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False

    def changelist_view(self, request, extra_context=None):
        from django.shortcuts import redirect
        from django.urls import reverse
        obj = SiteInfo.load()
        return redirect(reverse("admin:core_siteinfo_change", args=[obj.pk]))

@admin.register(HomeBannerSlide)
class HomeBannerSlideAdmin(PhotoPreviewMixin, ModelAdmin):
    list_display = ("photo_preview", "title", "active", "order")
    list_display_links = ("title",)
    list_editable = ("order",)
    list_filter = ("active",)
    search_fields = ("title", "text")

@admin.register(QuickLinkCard)
class QuickLinkCardAdmin(PhotoPreviewMixin, ModelAdmin):
    list_display = ("photo_preview", "title", "link_path", "active", "order")
    list_display_links = ("title",)
    list_editable = ("order",)
    list_filter = ("active", missing_photo_filter("photo"))
    search_fields = ("title", "text")

@admin.register(ContactMessage)
class ContactMessageAdmin(ModelAdmin):
    list_display = ("name", "email", "phone", "created_at", "is_read", "is_replied")
    list_filter = ("is_read", "is_replied", "created_at")
    search_fields = ("name", "email", "phone", "message")
    readonly_fields = ("name", "email", "phone", "message", "created_at")
    list_editable = ("is_read", "is_replied")

    def has_add_permission(self, request):
        return False
