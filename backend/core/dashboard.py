from django.urls import reverse

def dashboard_callback(request, context):
    from academics.models import Award, Subject
    from alumni.models import Alumnus
    from core.models import ContactMessage
    from core.reports import missing_photos_summary
    from gallery.models import GalleryAlbum
    from history.models import HistoryEvent
    from news.models import NewsPost

    _, missing_total = missing_photos_summary()
    pending_alumni = Alumnus.objects.filter(approval_status=Alumnus.ApprovalStatus.PENDING).count()
    unread_messages = ContactMessage.objects.filter(is_read=False).count()

    context["kpis"] = [
        {
            "title": "Published news posts",
            "value": NewsPost.objects.filter(status=NewsPost.Status.PUBLISHED).count(),
            "icon": "newspaper",
            "url": reverse("admin:news_newspost_changelist"),
        },
        {
            "title": "Visible alumni profiles",
            "value": Alumnus.objects.filter(
                show_on_website=True, approval_status=Alumnus.ApprovalStatus.APPROVED
            ).count(),
            "icon": "school",
            "url": reverse("admin:alumni_alumnus_changelist"),
        },
        {
            "title": "Alumni awaiting review",
            "value": pending_alumni,
            "icon": "pending_actions",
            "url": reverse("admin:alumni_alumnus_changelist") + "?approval_status__exact=pending",
            "alert": pending_alumni > 0,
        },
        {
            "title": "Unread contact messages",
            "value": unread_messages,
            "icon": "mail",
            "url": reverse("admin:core_contactmessage_changelist") + "?is_read__exact=0",
            "alert": unread_messages > 0,
        },
        {
            "title": "Items missing a photo",
            "value": missing_total,
            "icon": "image_search",
            "url": reverse("missing_photos_report"),
            "alert": missing_total > 0,
        },
        {
            "title": "Gallery albums",
            "value": GalleryAlbum.objects.count(),
            "icon": "photo_library",
            "url": reverse("admin:gallery_galleryalbum_changelist"),
        },
        {
            "title": "History timeline events",
            "value": HistoryEvent.objects.count(),
            "icon": "history_edu",
            "url": reverse("admin:history_historyevent_changelist"),
        },
        {
            "title": "Subjects & awards",
            "value": Subject.objects.count() + Award.objects.count(),
            "icon": "military_tech",
            "url": reverse("admin:academics_subject_changelist"),
        },
    ]

    return context
