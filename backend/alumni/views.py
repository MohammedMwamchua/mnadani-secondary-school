from rest_framework import mixins, viewsets
from rest_framework.permissions import AllowAny
from rest_framework.throttling import ScopedRateThrottle

from .models import Alumnus
from .serializers import AlumnusSerializer, AlumnusSubmissionSerializer

class AlumnusViewSet(viewsets.ReadOnlyModelViewSet):

    serializer_class = AlumnusSerializer
    filterset_fields = ["level", "featured"]

    def get_queryset(self):
        return Alumnus.objects.filter(
            show_on_website=True,
            permission_received=True,
            approval_status=Alumnus.ApprovalStatus.APPROVED,
        )

class AlumnusSubmissionViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):

    serializer_class = AlumnusSubmissionSerializer
    permission_classes = [AllowAny]
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = "alumni_submission"
    queryset = Alumnus.objects.none()
