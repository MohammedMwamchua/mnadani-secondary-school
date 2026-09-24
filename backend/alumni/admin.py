from django.contrib import admin, messages
from unfold.admin import ModelAdmin

from core.admin_mixins import PhotoPreviewMixin, missing_photo_filter
from core.admin_widgets import NiceAvatarWidget

from .models import Alumnus


@admin.register(Alumnus)
class AlumnusAdmin(PhotoPreviewMixin, ModelAdmin):
    photo_widget = NiceAvatarWidget
    list_display = (
        "photo_preview", "full_name", "visible_on_site", "order", "year_finished", "level",
        "current_role", "city", "featured", "highlighted", "show_on_website", "permission_received", "approval_status",
    )
    list_filter = ("approval_status", "source", "featured", "highlighted", "show_on_website", "permission_received", "level", missing_photo_filter("photo"))
    search_fields = ("full_name", "current_role", "organisation", "city", "phone")
    list_display_links = ("full_name",)
    list_editable = ("order", "featured", "highlighted", "show_on_website", "permission_received")
    actions = ["approve_selected", "reject_selected"]

    @admin.display(description="Visible on site", boolean=True)
    def visible_on_site(self, obj):
        return obj.is_visible

    fieldsets = (
        ("Identity", {"fields": ("full_name", "year_finished", "level", "photo")}),
        ("Now", {"fields": ("current_role", "organisation", "city", "country", "phone")}),
        ("Story", {"fields": ("history_at_school", "achievements_after", "message_to_students")}),
        ("Visibility", {"fields": ("order", "featured", "highlighted", "show_on_website", "permission_received")}),
        ("Submission", {"fields": ("source", "approval_status")}),
    )

    @admin.action(description="Approve selected alumni stories")
    def approve_selected(self, request, queryset):
        updated = queryset.update(approval_status=Alumnus.ApprovalStatus.APPROVED)
        self.message_user(request, f"{updated} alumnus/alumni approved.", messages.SUCCESS)

    @admin.action(description="Reject selected alumni stories")
    def reject_selected(self, request, queryset):
        updated = queryset.update(approval_status=Alumnus.ApprovalStatus.REJECTED)
        self.message_user(request, f"{updated} alumnus/alumni rejected.", messages.SUCCESS)

    def save_model(self, request, obj, form, change):
        duplicate = (
            Alumnus.objects.filter(full_name__iexact=obj.full_name, year_finished=obj.year_finished)
            .exclude(pk=obj.pk)
            .exists()
        )
        super().save_model(request, obj, form, change)
        if duplicate:
            self.message_user(
                request,
                f'Heads up: another alumnus named "{obj.full_name}" from {obj.year_finished} already exists. '
                "Check this isn't a duplicate entry.",
                messages.WARNING,
            )
