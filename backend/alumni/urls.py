from rest_framework.routers import DefaultRouter

from .views import AlumnusSubmissionViewSet, AlumnusViewSet

router = DefaultRouter()
router.register("alumni", AlumnusViewSet, basename="alumnus")
router.register("alumni-submissions", AlumnusSubmissionViewSet, basename="alumnus-submission")

urlpatterns = router.urls
