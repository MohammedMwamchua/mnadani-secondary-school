from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import ContactMessageViewSet, HomeBannerSlideViewSet, QuickLinkCardViewSet, SiteInfoView

router = DefaultRouter()
router.register("home-banner", HomeBannerSlideViewSet, basename="home-banner")
router.register("quick-links", QuickLinkCardViewSet, basename="quick-link")
router.register("contact-messages", ContactMessageViewSet, basename="contact-message")

urlpatterns = [
    path("site-info/", SiteInfoView.as_view(), name="site-info"),
] + router.urls
