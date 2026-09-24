from rest_framework.routers import DefaultRouter

from .views import ClubActivityViewSet

router = DefaultRouter()
router.register("club-activities", ClubActivityViewSet, basename="club-activity")

urlpatterns = router.urls
