from rest_framework.routers import DefaultRouter

from .views import AwardViewSet, SubjectViewSet

router = DefaultRouter()
router.register("subjects", SubjectViewSet, basename="subject")
router.register("awards", AwardViewSet, basename="award")

urlpatterns = router.urls
