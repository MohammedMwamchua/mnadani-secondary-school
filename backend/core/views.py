from rest_framework import generics, mixins, viewsets
from rest_framework.permissions import AllowAny

from .models import ContactMessage, HomeBannerSlide, QuickLinkCard, SiteInfo
from .serializers import (
    ContactMessageSerializer,
    HomeBannerSlideSerializer,
    QuickLinkCardSerializer,
    SiteInfoSerializer,
)

class SiteInfoView(generics.RetrieveAPIView):
    serializer_class = SiteInfoSerializer

    def get_object(self):
        return SiteInfo.load()

class HomeBannerSlideViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = HomeBannerSlideSerializer

    def get_queryset(self):
        return HomeBannerSlide.objects.filter(active=True)

class QuickLinkCardViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = QuickLinkCardSerializer

    def get_queryset(self):
        return QuickLinkCard.objects.filter(active=True)

class ContactMessageViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    serializer_class = ContactMessageSerializer
    permission_classes = [AllowAny]
    queryset = ContactMessage.objects.none()
