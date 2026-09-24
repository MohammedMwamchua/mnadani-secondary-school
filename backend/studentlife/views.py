from rest_framework import viewsets

from .models import ClubActivity
from .serializers import ClubActivitySerializer


class ClubActivityViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ClubActivity.objects.all()
    serializer_class = ClubActivitySerializer
