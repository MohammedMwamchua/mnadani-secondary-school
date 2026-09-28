from rest_framework import viewsets

from .models import CampusPhoto, Headteacher, HistoryEvent, NotableTeacher
from .serializers import (
    CampusPhotoSerializer,
    HeadteacherSerializer,
    HistoryEventSerializer,
    NotableTeacherSerializer,
)


class CampusPhotoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CampusPhoto.objects.all()
    serializer_class = CampusPhotoSerializer


class HistoryEventViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = HistoryEvent.objects.all()
    serializer_class = HistoryEventSerializer


class HeadteacherViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Headteacher.objects.all()
    serializer_class = HeadteacherSerializer


class NotableTeacherViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = NotableTeacher.objects.all()
    serializer_class = NotableTeacherSerializer
