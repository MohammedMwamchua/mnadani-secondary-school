from rest_framework import viewsets

from .models import NewsPost
from .serializers import NewsPostDetailSerializer, NewsPostListSerializer

class NewsPostViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = NewsPost.objects.filter(status=NewsPost.Status.PUBLISHED)
    filterset_fields = ["category"]

    def get_serializer_class(self):
        return NewsPostDetailSerializer if self.action == "retrieve" else NewsPostListSerializer
