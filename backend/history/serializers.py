from rest_framework import serializers

from .models import CampusPhoto, Headteacher, HistoryEvent, NotableTeacher


class CampusPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CampusPhoto
        fields = ["id", "image", "caption", "order"]


class HistoryEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistoryEvent
        fields = ["id", "year", "title", "description", "photo", "order"]


class HeadteacherSerializer(serializers.ModelSerializer):
    period_label = serializers.ReadOnlyField()

    class Meta:
        model = Headteacher
        fields = ["id", "name", "initials", "period_label", "story", "photo", "order"]


class NotableTeacherSerializer(serializers.ModelSerializer):
    meta_label = serializers.ReadOnlyField()

    class Meta:
        model = NotableTeacher
        fields = ["id", "name", "subject", "years", "meta_label", "story", "photo", "order"]
