from rest_framework import viewsets

from .models import Award, Subject
from .serializers import AwardSerializer, SubjectSerializer


class SubjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer


class AwardViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Award.objects.all()
    serializer_class = AwardSerializer
    filterset_fields = ["category"]
