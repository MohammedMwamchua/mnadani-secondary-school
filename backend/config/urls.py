from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

from core.reports import missing_photos_report

urlpatterns = [
    path("admin/reports/missing-photos/", missing_photos_report, name="missing_photos_report"),
    path("admin/", admin.site.urls),
    path("api/", include("core.urls")),
    path("api/", include("news.urls")),
    path("api/", include("history.urls")),
    path("api/", include("academics.urls")),
    path("api/", include("studentlife.urls")),
    path("api/", include("gallery.urls")),
    path("api/", include("alumni.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
