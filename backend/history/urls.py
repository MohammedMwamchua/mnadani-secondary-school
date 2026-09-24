from rest_framework.routers import DefaultRouter

from .views import HeadteacherViewSet, HistoryEventViewSet, NotableTeacherViewSet

router = DefaultRouter()
router.register("history-events", HistoryEventViewSet, basename="history-event")
router.register("headteachers", HeadteacherViewSet, basename="headteacher")
router.register("notable-teachers", NotableTeacherViewSet, basename="notable-teacher")

urlpatterns = router.urls
