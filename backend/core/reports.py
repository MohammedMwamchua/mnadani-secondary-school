from django.contrib.admin.views.decorators import staff_member_required
from django.contrib.admin.sites import site as default_admin_site
from django.db.models import Q
from django.shortcuts import render
from django.urls import reverse

def _missing(model, field="photo"):
    empty = Q(**{field: ""}) | Q(**{f"{field}__isnull": True})
    return model.objects.filter(empty).count()

def missing_photos_summary():
    from academics.models import Award, Subject
    from alumni.models import Alumnus
    from gallery.models import GalleryAlbum
    from history.models import Headteacher, HistoryEvent, NotableTeacher
    from news.models import NewsPost
    from studentlife.models import ClubActivity

    rows = [
        ("History timeline events", HistoryEvent, "history_historyevent", "photo"),
        ("Former headteachers", Headteacher, "history_headteacher", "photo"),
        ("Notable teachers", NotableTeacher, "history_notableteacher", "photo"),
        ("Subjects", Subject, "academics_subject", "photo"),
        ("Awards & honours", Award, "academics_award", "photo"),
        ("Clubs & activities", ClubActivity, "studentlife_clubactivity", "cover_photo"),
        ("Gallery albums (cover)", GalleryAlbum, "gallery_galleryalbum", "cover_photo"),
        ("News posts (cover)", NewsPost, "news_newspost", "cover_photo"),
        ("Alumni", Alumnus, "alumni_alumnus", "photo"),
    ]

    report = []
    total = 0
    for label, model, url_name, field in rows:
        count = _missing(model, field)
        total += count
        report.append({
            "label": label,
            "count": count,
            "url": reverse(f"admin:{url_name}_changelist") + "?has_photo=no",
        })

    return report, total

@staff_member_required
def missing_photos_report(request):
    report, total = missing_photos_summary()

    context = {
        **default_admin_site.each_context(request),
        "title": "Missing photos",
        "report": report,
        "total": total,
    }
    return render(request, "admin/missing_photos.html", context)
