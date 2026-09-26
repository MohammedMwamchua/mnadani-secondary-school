from urllib.parse import parse_qs

from django.urls import reverse


def _on_awards_pages(request):
    return request.path.startswith(reverse("admin:academics_award_changelist"))


def _award_category(request):
    category = request.GET.get("category__exact")
    if category is None:
        filters = parse_qs(request.GET.get("_changelist_filters", ""))
        category = filters.get("category__exact", [None])[0]
    return category


def academic_awards_active(request):
    return _on_awards_pages(request) and _award_category(request) != "student"


def student_awards_active(request):
    return _on_awards_pages(request) and _award_category(request) == "student"
