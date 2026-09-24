from rest_framework import viewsets

from .models import GalleryAlbum
from .serializers import GalleryAlbumSerializer


class GalleryAlbumViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = GalleryAlbum.objects.all()
    serializer_class = GalleryAlbumSerializer
    filterset_fields = ["category"]
